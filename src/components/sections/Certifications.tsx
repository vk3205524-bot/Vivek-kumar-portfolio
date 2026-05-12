'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';
import { certifications } from '@/lib/data';

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-emerald-400 tracking-[0.3em] uppercase"
          >
            05 — Certifications
          </motion.span>
          <AnimatedText text="Credentials & Learning" className="heading-lg mt-3" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <GlassCard key={cert.title} delay={i * 0.08}>
              <div className="flex items-start gap-4">
                <span className="text-2xl">{cert.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{cert.title}</h3>
                  <p className="text-xs text-white/40">{cert.issuer}</p>
                  <span className="text-[10px] font-mono text-cyber-cyan mt-2 inline-block">
                    {cert.year}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
