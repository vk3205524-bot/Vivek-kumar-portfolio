'use client';

import { motion } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

/** Splits text into words and animates each one staggered. */
export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  once = true,
}: Props) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay,
      },
    }),
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={child} className="mr-[0.3em]">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
