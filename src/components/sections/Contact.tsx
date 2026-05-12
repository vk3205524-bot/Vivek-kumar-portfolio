'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import MagneticButton from '@/components/ui/MagneticButton';
import { profile } from '@/lib/data';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        /* Reset to idle after 5 seconds */
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClass =
    'w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyber-cyan/40 focus:bg-white/[0.05] transition-all duration-300 select-text';

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-emerald-400 tracking-[0.3em] uppercase"
          >
            08 — Contact
          </motion.span>
          <AnimatedText
            text="Let's Build Something Together"
            className="heading-lg mt-3 justify-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="body-text mt-4 max-w-lg mx-auto"
          >
            Have a project idea, need AI automation, or want to collaborate?
            Drop me a message — I&apos;ll get back to you within 24 hours.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 relative"
          >
            <div>
              <label htmlFor="contact-name" className="text-xs font-mono text-white/30 mb-1.5 block">
                Name *
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="text-xs font-mono text-white/30 mb-1.5 block">
                Email *
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="your@email.com"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="text-xs font-mono text-white/30 mb-1.5 block">
                Message *
              </label>
              <textarea
                id="contact-message"
                placeholder="Tell me about your project or idea..."
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`
                w-full py-3 px-6 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer
                ${status === 'sent'
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                  : status === 'error'
                  ? 'bg-red-500/20 border border-red-500/40 text-red-400'
                  : 'bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 border border-cyber-cyan/30 text-cyber-cyan hover:border-cyber-cyan/60 hover:shadow-glow-cyan'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {status === 'sending' && (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              )}
              {status === 'sent' && '✓ Message Sent Successfully!'}
              {status === 'error' && `✕ ${errorMsg}`}
              {status === 'idle' && 'Send Message →'}
            </button>

            {/* Success animation overlay */}
            <AnimatePresence>
              {status === 'sent' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4"
                    >
                      <span className="text-3xl">✓</span>
                    </motion.div>
                    <p className="text-emerald-400 font-medium">Message Sent!</p>
                    <p className="text-white/40 text-xs mt-1">I&apos;ll reply within 24 hours</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">
                Email
              </h3>
              <a
                href={`mailto:${profile.email}`}
                className="text-sm text-cyber-cyan hover:underline"
              >
                {profile.email}
              </a>
            </div>

            <div>
              <h3 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">
                Location
              </h3>
              <p className="text-sm text-white/60">{profile.location}</p>
            </div>

            <div>
              <h3 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">
                Education
              </h3>
              <p className="text-sm text-white/60">{profile.degree}</p>
              <p className="text-xs text-white/40">{profile.university}</p>
            </div>

            <div>
              <h3 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">
                Social
              </h3>
              <div className="flex gap-4">
                {Object.entries(profile.socials).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/40 hover:text-cyber-cyan transition-colors capitalize"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">
                Resume
              </h3>
              <MagneticButton href={profile.resumeUrl} variant="secondary">
                Download PDF ↓
              </MagneticButton>
            </div>

            {/* What I can help with */}
            <div className="glass rounded-xl p-5 mt-6">
              <h3 className="text-xs font-mono text-cyber-cyan/60 uppercase tracking-widest mb-3">
                I can help with
              </h3>
              <div className="flex flex-wrap gap-2">
                {['AI Agents', 'WhatsApp Bots', 'Gmail Automation', 'n8n Workflows', 'Web Development', 'AI Calling', 'CRM Systems'].map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded-full bg-cyber-cyan/5 text-cyber-cyan/60 border border-cyber-cyan/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
