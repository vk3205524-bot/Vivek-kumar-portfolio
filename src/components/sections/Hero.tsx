'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile } from '@/lib/data';
import AnimatedText from '@/components/ui/AnimatedText';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  /* Cycle through role titles */
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % profile.roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center section-padding"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyber-cyan/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-white/60">Available for freelance &amp; opportunities</span>
        </motion.div>

        {/* Main heading */}
        <AnimatedText
          text={profile.name}
          className="heading-xl justify-center mb-4"
          delay={1.5}
        />

        {/* Rotating role title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="h-8 md:h-10 overflow-hidden mb-4"
        >
          <motion.p
            key={roleIndex}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-lg md:text-xl gradient-text font-medium"
          >
            {profile.roles[roleIndex]}
          </motion.p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.6 }}
          className="text-sm md:text-base text-white/30 font-light max-w-xl mx-auto mb-2"
        >
          {profile.tagline}
        </motion.p>

        {/* University badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="text-xs font-mono text-white/20 mb-10"
        >
          {profile.degree} • {profile.university}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <MagneticButton href="#projects" variant="primary">
            View My Work
          </MagneticButton>
          <MagneticButton href="#contact" variant="secondary">
            Let&apos;s Talk
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-8 bg-gradient-to-b from-cyber-cyan/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
