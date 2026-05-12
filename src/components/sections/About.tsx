'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';

const highlights = [
  { label: 'AI Automations', value: '50+ Built', icon: '⚡' },
  { label: 'Projects Delivered', value: '15+', icon: '🚀' },
  { label: 'Workflows Created', value: '100+', icon: '🔗' },
  { label: 'University', value: 'Amity Kolkata', icon: '🎓' },
];

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-cyber-cyan tracking-[0.3em] uppercase"
          >
            01 — About
          </motion.span>
          <AnimatedText
            text="From Commerce to AI Automation"
            className="heading-lg mt-3 max-w-3xl"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="body-text text-base leading-[1.8]"
            >
              I&apos;m a <span className="text-white font-medium">BCom Honours student at Amity University Kolkata</span> who
              discovered that the future of business isn&apos;t just spreadsheets — it&apos;s{' '}
              <span className="text-cyber-cyan">intelligent AI automation</span>.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="body-text text-base leading-[1.8]"
            >
              I build <span className="text-cyber-purple">AI agents</span>,{' '}
              <span className="text-cyber-cyan">n8n workflows</span>,{' '}
              <span className="text-green-400">WhatsApp bots</span>, and{' '}
              <span className="text-red-400">Gmail automation systems</span> that
              transform how businesses operate. From AI calling agents to CRM automation
              — I design end-to-end intelligent systems.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="body-text text-base leading-[1.8]"
            >
              My unique background in{' '}
              <span className="text-white/80">accounting, Tally, and finance</span>{' '}
              combined with <span className="gradient-text font-medium">cutting-edge AI skills</span>{' '}
              lets me build automation that truly understands business workflows.
            </motion.p>
          </div>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <GlassCard key={h.label} delay={i * 0.1} className="text-center">
                <span className="text-2xl mb-2 block">{h.icon}</span>
                <span className="text-xl md:text-2xl font-display font-bold text-white">
                  {h.value}
                </span>
                <span className="text-xs text-white/40 mt-1 block">{h.label}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
