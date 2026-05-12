import { create } from 'zustand';

interface AppState {
  /* Loading */
  isLoaded: boolean;
  setLoaded: (v: boolean) => void;

  /* Active section for camera + nav highlight */
  activeSection: string;
  setActiveSection: (s: string) => void;

  /* Scroll progress 0–1 */
  scrollProgress: number;
  setScrollProgress: (v: number) => void;

  /* 3D scene interaction */
  hoveredHotspot: string | null;
  setHoveredHotspot: (id: string | null) => void;

  /* Mobile detection */
  isMobile: boolean;
  setIsMobile: (v: boolean) => void;

  /* Cursor */
  cursorVariant: 'default' | 'hover' | 'click';
  setCursorVariant: (v: 'default' | 'hover' | 'click') => void;
}

export const useStore = create<AppState>((set) => ({
  isLoaded: false,
  setLoaded: (v) => set({ isLoaded: v }),

  activeSection: 'hero',
  setActiveSection: (s) => set({ activeSection: s }),

  scrollProgress: 0,
  setScrollProgress: (v) => set({ scrollProgress: v }),

  hoveredHotspot: null,
  setHoveredHotspot: (id) => set({ hoveredHotspot: id }),

  isMobile: false,
  setIsMobile: (v) => set({ isMobile: v }),

  cursorVariant: 'default',
  setCursorVariant: (v) => set({ cursorVariant: v }),
}));
