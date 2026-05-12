'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={`
        glass rounded-2xl p-6 md:p-8
        transition-shadow duration-500
        ${hover ? 'hover:shadow-glow-cyan/20 hover:border-white/10' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
