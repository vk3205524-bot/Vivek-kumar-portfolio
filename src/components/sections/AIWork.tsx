'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';

const aiCapabilities = [
  {
    title: 'AI Agent Development',
    description: 'Build autonomous AI agents that handle customer interactions, lead qualification, content creation, and complex business logic — running 24/7 without human intervention.',
    icon: '🤖',
    color: '#00f0ff',
  },
  {
    title: 'WhatsApp AI Automation',
    description: 'Intelligent WhatsApp bots with auto-replies, AI conversations, lead handling, appointment booking, and full business workflow automation via WhatsApp Business API.',
    icon: '💬',
    color: '#25D366',
  },
  {
    title: 'Gmail Automation Systems',
    description: 'Smart email systems that send automatic responses, handle intelligent replies, automate notifications, and connect seamlessly with AI workflow pipelines.',
    icon: '📧',
    color: '#EA4335',
  },
  {
    title: 'n8n Workflow Automation',
    description: 'Complex no-code/low-code automations connecting 200+ services. From lead capture to CRM updates to AI processing — eliminating hours of manual work.',
    icon: '⚡',
    color: '#8b5cf6',
  },
  {
    title: 'AI Calling Agents',
    description: 'Voice-based AI agents that make and receive phone calls, handle customer support, schedule appointments, and qualify leads with natural conversation.',
    icon: '📞',
    color: '#3b82f6',
  },
  {
    title: 'Business Process Automation',
    description: 'End-to-end automation architecture for CRM, invoicing, reporting, and operations — integrating Tally, APIs, and AI for fully automated business systems.',
    icon: '🏢',
    color: '#f59e0b',
  },
];

export default function AIWork() {
  return (
    <section id="ai-work" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-cyber-pink tracking-[0.3em] uppercase"
          >
            06 — AI Automation
          </motion.span>
          <AnimatedText text="What I Build & Automate" className="heading-lg mt-3" />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="body-text mt-4 max-w-2xl"
          >
            I turn manual, repetitive processes into intelligent automated systems.
            From WhatsApp bots to AI calling agents — here&apos;s what I build.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiCapabilities.map((cap, i) => (
            <GlassCard key={cap.title} delay={i * 0.1} className="group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${cap.color}15` }}
              >
                {cap.icon}
              </div>
              <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-cyber-cyan transition-colors">
                {cap.title}
              </h3>
              <p className="text-xs text-white/40 leading-relaxed">{cap.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
