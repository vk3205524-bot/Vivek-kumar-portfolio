'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/stores/useStore';
import { lerp } from '@/lib/utils';

/**
 * Scroll-driven + mouse-parallax camera controller.
 * Smoothly lerps camera position based on scroll progress and cursor.
 */
export default function CameraController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const scrollProgress = useStore((s) => s.scrollProgress);
  const isMobile = useStore((s) => s.isMobile);

  /* Track mouse position */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    const speed = 2 * delta;

    /* Scroll-based camera path (gentle arc) */
    const scrollY = scrollProgress;
    const targetX = Math.sin(scrollY * Math.PI * 0.5) * 2;
    const targetY = 2 + scrollY * 1.5;
    const targetZ = 8 - scrollY * 3;

    /* Mouse parallax */
    const mx = isMobile ? 0 : mouse.current.x * 0.5;
    const my = isMobile ? 0 : mouse.current.y * 0.3;

    /* Smooth lerp to target */
    camera.position.x = lerp(camera.position.x, targetX + mx, speed);
    camera.position.y = lerp(camera.position.y, targetY + my, speed);
    camera.position.z = lerp(camera.position.z, targetZ, speed);

    /* Always look toward center */
    const lookTarget = new THREE.Vector3(0, 0.5, 0);
    camera.lookAt(lookTarget);
  });

  return null;
}
