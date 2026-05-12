'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';
import { skills } from '@/lib/data';

const categories = ['All', 'AI', 'Code', 'Finance', 'Tools'];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-cyber-purple tracking-[0.3em] uppercase"
          >
            02 — Skills
          </motion.span>
          <AnimatedText
            text="Technologies & Expertise"
            className="heading-lg mt-3"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeCategory === cat
                    ? 'bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30'
                    : 'text-white/40 border border-white/5 hover:text-white/60 hover:border-white/10'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <GlassCard className="flex items-center gap-4" delay={0}>
                  {/* Icon */}
                  <span className="text-2xl flex-shrink-0">{skill.icon}</span>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{skill.name}</span>
                      <span
                        className="text-xs font-mono"
                        style={{ color: skill.color }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})` }}
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
