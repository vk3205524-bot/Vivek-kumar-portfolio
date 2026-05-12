'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Float,
  Stars,
  Environment,
  Grid,
} from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/stores/useStore';
import CameraController from './CameraController';
import CoreStructure from './CoreStructure';
import ParticleField from './ParticleField';
import SkillNodes from './SkillNodes';

export default function Experience() {
  const groupRef = useRef<THREE.Group>(null!);
  const scrollProgress = useStore((s) => s.scrollProgress);
  const isMobile = useStore((s) => s.isMobile);

  /* Slowly rotate the entire scene based on scroll */
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.03;
    }
  });

  /* Fog for depth */
  const fog = useMemo(() => new THREE.FogExp2('#000005', 0.06), []);

  return (
    <>
      <fog attach="fog" args={['#000005', 0.06]} />

      {/* Camera responds to scroll + mouse */}
      <CameraController />

      {/* Lighting */}
      <ambientLight intensity={0.15} color="#4060ff" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.4}
        color="#00f0ff"
        castShadow={false}
      />
      <pointLight position={[-4, 3, -4]} intensity={0.6} color="#8b5cf6" distance={15} />
      <pointLight position={[4, -2, 3]} intensity={0.3} color="#ec4899" distance={12} />

      {/* Starfield background */}
      <Stars
        radius={50}
        depth={80}
        count={isMobile ? 1500 : 4000}
        factor={3}
        saturation={0.2}
        fade
        speed={0.5}
      />

      {/* Main group */}
      <group ref={groupRef}>
        {/* Central interactive structure */}
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <CoreStructure />
        </Float>

        {/* Orbiting skill nodes */}
        {!isMobile && <SkillNodes />}
      </group>

      {/* Ambient particles */}
      <ParticleField count={isMobile ? 300 : 1200} />

      {/* Subtle grid floor */}
      <Grid
        position={[0, -3, 0]}
        args={[40, 40]}
        cellSize={1}
        cellThickness={0.3}
        cellColor="#0d2847"
        sectionSize={5}
        sectionThickness={0.5}
        sectionColor="#00f0ff"
        fadeDistance={30}
        fadeStrength={2}
        infiniteGrid
      />

      {/* HDRI for reflections */}
      <Environment preset="night" />
    </>
  );
}
