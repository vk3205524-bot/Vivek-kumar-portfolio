'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, lazy } from 'react';
import { Preload } from '@react-three/drei';

const Experience = lazy(() => import('./Experience'));

/**
 * Top-level R3F Canvas.
 * Renders fixed behind the scrollable content overlay.
 */
export default function Scene() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: '#000' }}
      >
        <Suspense fallback={null}>
          <Experience />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
