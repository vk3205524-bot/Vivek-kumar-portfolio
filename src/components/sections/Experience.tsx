'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';
import { experiences } from '@/lib/data';

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-cyber-blue tracking-[0.3em] uppercase"
          >
            03 — Experience
          </motion.span>
          <AnimatedText
            text="Professional Journey"
            className="heading-lg mt-3"
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyber-cyan/30 via-cyber-purple/30 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-8 md:pl-20">
                {/* Dot on timeline */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="absolute left-0 md:left-8 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-cyber-cyan shadow-glow-cyan"
                />

                <GlassCard delay={i * 0.15}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="heading-md text-white">{exp.role}</h3>
                      <p className="text-sm text-cyber-cyan">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-white/30 bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="body-text mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-1 rounded-full bg-white/5 text-white/40 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
