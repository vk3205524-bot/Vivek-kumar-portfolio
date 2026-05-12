'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Central interactive 3D structure:
 * – Wireframe icosahedron (outer shell, slowly rotating)
 * – Inner glowing sphere (emissive core)
 * – Orbiting torus rings
 */
export default function CoreStructure() {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  /* Animate */
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    /* Outer wireframe rotation */
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.08;
      outerRef.current.rotation.y = t * 0.12;
    }

    /* Inner sphere subtle pulse */
    if (innerRef.current) {
      const scale = 1 + Math.sin(t * 1.5) * 0.05;
      innerRef.current.scale.setScalar(scale);
    }

    /* Orbiting rings */
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.25;
    if (ring3Ref.current) ring3Ref.current.rotation.y = t * 0.2;
  });

  return (
    <group>
      {/* ── Outer wireframe icosahedron ── */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.25}
          emissive="#00f0ff"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* ── Inner glowing core ── */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#1a0a3e"
          emissive="#8b5cf6"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </mesh>

      {/* ── Inner glow sprite ── */}
      <sprite scale={[4, 4, 1]}>
        <spriteMaterial
          color="#00f0ff"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </sprite>

      {/* ── Orbital ring 1 ── */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.008, 16, 100]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.5}
          toneMapped={false}
        />
      </mesh>

      {/* ── Orbital ring 2 ── */}
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[2.8, 0.006, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={1.2}
          transparent
          opacity={0.4}
          toneMapped={false}
        />
      </mesh>

      {/* ── Orbital ring 3 ── */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[3.1, 0.005, 16, 100]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={1}
          transparent
          opacity={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* ── Small orbiting accent spheres ── */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <OrbiterDot key={i} index={i} />
      ))}
    </group>
  );
}

/* Small sphere orbiting the core */
function OrbiterDot({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const offset = (index / 6) * Math.PI * 2;
  const radius = 2.2 + (index % 3) * 0.4;
  const speed = 0.2 + index * 0.05;
  const colors = ['#00f0ff', '#8b5cf6', '#f59e0b', '#ec4899', '#3b82f6', '#10b981'];

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 1.5) * 0.5;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial
        color={colors[index]}
        emissive={colors[index]}
        emissiveIntensity={3}
        toneMapped={false}
      />
    </mesh>
  );
}
