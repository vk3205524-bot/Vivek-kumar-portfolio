'use client';
import { useEffect } from 'react';
import { useStore } from '@/stores/useStore';

/** Detects mobile viewport and syncs to the store (< 768 px). */
export function useMobile() {
  const setIsMobile = useStore((s) => s.setIsMobile);
  const isMobile = useStore((s) => s.isMobile);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, [setIsMobile]);

  return isMobile;
}
