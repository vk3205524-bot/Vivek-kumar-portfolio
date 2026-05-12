'use client';

import { useRef, ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/stores/useStore';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export default function MagneticButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const setCursorVariant = useStore((s) => s.setCursorVariant);

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
    setCursorVariant('default');
  };

  const baseStyles =
    'relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer select-none';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 border border-cyber-cyan/30 text-cyber-cyan hover:border-cyber-cyan/60 hover:shadow-glow-cyan',
    secondary:
      'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20',
    ghost:
      'text-white/60 hover:text-white hover:bg-white/5',
  };

  const Tag = href ? 'a' : 'button';

  return (
    <motion.div whileTap={{ scale: 0.95 }} className="inline-block">
      <Tag
        ref={ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        onMouseEnter={() => setCursorVariant('hover')}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        style={{ transition: 'transform 0.2s ease-out, box-shadow 0.3s, border-color 0.3s, background 0.3s' }}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
