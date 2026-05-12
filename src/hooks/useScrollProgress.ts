'use client';
import { useEffect, useState } from 'react';
import { useStore } from '@/stores/useStore';

/** Tracks normalized scroll progress (0–1) and updates the store. */
export function useScrollProgress() {
  const setScrollProgress = useStore((s) => s.setScrollProgress);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(p);
      setScrollProgress(p);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [setScrollProgress]);

  return progress;
}
