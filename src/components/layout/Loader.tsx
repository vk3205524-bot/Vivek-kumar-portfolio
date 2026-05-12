'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/stores/useStore';

export default function Loader() {
  const { isLoaded, setLoaded } = useStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    /* Simulated loading progress */
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoaded(true), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [setLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-8"
        >
          {/* Rotating geometric loader */}
          <div className="relative w-20 h-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 border border-cyber-cyan/40 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 border border-cyber-purple/40 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-4 bg-cyber-cyan/10 rounded-full flex items-center justify-center"
            >
              <div className="w-3 h-3 rounded-full bg-cyber-cyan shadow-glow-cyan" />
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-purple"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Loading text */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-white/30 tracking-widest uppercase">
              Initializing
            </span>
            <span className="text-xs font-mono text-cyber-cyan">
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
