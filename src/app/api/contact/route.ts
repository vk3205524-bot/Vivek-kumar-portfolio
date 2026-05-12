import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/* ── Validation schema ── */
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

/* ── In-memory rate limiter ── */
const rateLimitMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

/* ── Resend email sender ── */
async function sendViaResend(name: string, email: string, message: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.EMAIL_TO || 'vk3205524@gmail.com';

  if (!apiKey) {
    console.warn('⚠️ RESEND_API_KEY not set — logging message instead');
    console.log('📧 Contact form:', { name, email, message: message.slice(0, 100) });
    return true; // Return true so the user still gets a success response
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [toEmail],
      subject: `🚀 Portfolio Contact: ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0a0a0f, #111118); border-radius: 16px; padding: 32px; color: #fff;">
            <h2 style="margin: 0 0 24px; color: #00f0ff; font-size: 20px;">
              New Portfolio Message
            </h2>
            <div style="margin-bottom: 16px;">
              <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">From</span>
              <p style="margin: 4px 0 0; font-size: 16px; color: #fff;">${name}</p>
            </div>
            <div style="margin-bottom: 16px;">
              <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Email</span>
              <p style="margin: 4px 0 0; font-size: 16px;">
                <a href="mailto:${email}" style="color: #00f0ff; text-decoration: none;">${email}</a>
              </p>
            </div>
            <div style="margin-bottom: 16px;">
              <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Message</span>
              <div style="margin: 8px 0 0; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
                <p style="margin: 0; color: #ccc; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
            <p style="color: #555; font-size: 11px; margin: 0;">
              Sent from your 3D Portfolio website • ${new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}
            </p>
          </div>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error('Resend API error:', res.status, errorData);
    return false;
  }

  return true;
}

/* ── Nodemailer fallback sender ── */
async function sendViaNodemailer(name: string, email: string, message: string): Promise<boolean> {
  try {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.EMAIL_TO || 'vk3205524@gmail.com',
      replyTo: email,
      subject: `🚀 Portfolio Contact: ${name}`,
      html: `
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="padding: 12px; background: #f5f5f5; border-left: 4px solid #00f0ff; margin: 0;">
          ${message.replace(/\n/g, '<br>')}
        </blockquote>
      `,
    });

    return true;
  } catch (error) {
    console.error('Nodemailer error:', error);
    return false;
  }
}

/* ── POST handler ── */
export async function POST(req: NextRequest) {
  try {
    /* Rate limiting */
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute and try again.' },
        { status: 429 }
      );
    }

    /* Parse & validate */
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0] || 'Validation failed';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, message } = result.data;

    /* Sanitize inputs (basic XSS prevention) */
    const sanitize = (str: string) => str.replace(/[<>]/g, '');
    const safeName = sanitize(name);
    const safeMessage = sanitize(message);

    /* Try Resend first, fall back to Nodemailer */
    let sent = false;

    if (process.env.RESEND_API_KEY) {
      sent = await sendViaResend(safeName, email, safeMessage);
    } else if (process.env.SMTP_USER) {
      sent = await sendViaNodemailer(safeName, email, safeMessage);
    } else {
      /* No email service configured — log to console */
      console.log('📧 Contact submission (no email service configured):', {
        name: safeName,
        email,
        message: safeMessage.slice(0, 200),
        timestamp: new Date().toISOString(),
      });
      sent = true;
    }

    if (!sent) {
      return NextResponse.json(
        { error: 'Failed to send message. Please try again or email me directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent! I\'ll get back to you within 24 hours.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please email me directly at vk3205524@gmail.com' },
      { status: 500 }
    );
  }
}
