import { clsx, type ClassValue } from 'clsx';

/** Merge Tailwind classes safely (lightweight — no tailwind-merge) */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** Lerp for smooth animations */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Debounce function */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number,
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/** Format number with commas */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat().format(n);
}

/** Check if we're on the server */
export const isServer = typeof window === 'undefined';

/** Check for reduced motion preference */
export function prefersReducedMotion(): boolean {
  if (isServer) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
