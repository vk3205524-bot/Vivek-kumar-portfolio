'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, profile } from '@/lib/data';
import { useStore } from '@/stores/useStore';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useStore((s) => s.activeSection);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`
          fixed top-0 left-0 right-0 z-40 transition-all duration-500
          ${scrolled ? 'glass-strong py-3' : 'py-5 bg-transparent'}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="relative group">
            <span className="text-lg font-display font-bold gradient-text tracking-tight">
              {profile.name.split(' ')[0]}
            </span>
            <span className="text-lg font-display font-light text-white/40 ml-1">
              .dev
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyber-cyan group-hover:w-full transition-all duration-300" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`
                  px-4 py-2 text-sm rounded-full transition-all duration-300
                  ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-cyber-cyan bg-cyber-cyan/10'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {link.label}
              </a>
            ))}
            <div className="ml-4">
              <MagneticButton href={profile.resumeUrl} variant="primary">
                Resume ↗
              </MagneticButton>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[1.5px] w-5 bg-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 glass-strong flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-2xl font-display font-light text-white/70 hover:text-cyber-cyan transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <MagneticButton
              href={profile.resumeUrl}
              variant="primary"
              className="mt-4"
            >
              Download Resume
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
