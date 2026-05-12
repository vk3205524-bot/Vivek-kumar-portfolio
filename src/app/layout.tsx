import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vivek Kumar — AI Agent Developer & Automation Architect',
  description:
    'Interactive 3D portfolio of Vivek Kumar. AI Agent Developer, n8n Automation Specialist, WhatsApp & Gmail Automation Builder, Web Developer, and BCom Honours student at Amity University Kolkata.',
  keywords: [
    'Vivek Kumar',
    'AI Agent Developer',
    'n8n Automation',
    'WhatsApp Automation',
    'Gmail Automation',
    'AI Calling Agent',
    'Web Developer',
    '3D Portfolio',
    'BCom Honours',
    'Amity University Kolkata',
  ],
  authors: [{ name: 'Vivek Kumar' }],
  openGraph: {
    title: 'Vivek Kumar — AI Agent Developer & Automation Architect',
    description: 'Interactive 3D portfolio — AI Agents, WhatsApp Bots, Gmail Automation, n8n Workflows, and more.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Vivek Kumar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivek Kumar — AI Agent Developer',
    description: 'Interactive 3D portfolio — AI Agents, WhatsApp Bots, n8n Workflows, and more.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
