'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { skills, type Skill } from '@/lib/data';
import { useStore } from '@/stores/useStore';

/**
 * Floating 3D skill nodes orbiting the core structure.
 * Each node is a small glowing sphere with an HTML label.
 */
export default function SkillNodes() {
  /* Only show first 8 skills as 3D nodes */
  const visible = skills.slice(0, 8);

  return (
    <group>
      {visible.map((skill, i) => (
        <SkillNode key={skill.name} skill={skill} index={i} total={visible.length} />
      ))}
    </group>
  );
}

function SkillNode({
  skill,
  index,
  total,
}: {
  skill: Skill;
  index: number;
  total: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const setCursorVariant = useStore((s) => s.setCursorVariant);

  /* Distribute evenly in a ring */
  const angle = (index / total) * Math.PI * 2;
  const radius = 4.2;
  const baseX = Math.cos(angle) * radius;
  const baseZ = Math.sin(angle) * radius;
  const baseY = 0.5 + Math.sin(angle * 2) * 0.8;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      /* Gentle floating motion */
      ref.current.position.x = baseX + Math.sin(t * 0.3 + index) * 0.15;
      ref.current.position.y = baseY + Math.sin(t * 0.5 + index * 0.7) * 0.2;
      ref.current.position.z = baseZ + Math.cos(t * 0.3 + index) * 0.15;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group ref={ref} position={[baseX, baseY, baseZ]}>
      {/* Glowing sphere */}
      <mesh
        ref={meshRef}
        onPointerEnter={() => setCursorVariant('hover')}
        onPointerLeave={() => setCursorVariant('default')}
      >
        <octahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={2}
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </mesh>

      {/* Glow aura */}
      <sprite scale={[0.6, 0.6, 1]}>
        <spriteMaterial
          color={skill.color}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </sprite>

      {/* HTML label */}
      <Html
        center
        distanceFactor={10}
        position={[0, 0.35, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div className="whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono text-white/80 bg-black/60 backdrop-blur-sm border border-white/10 select-none">
          {skill.icon} {skill.name}
        </div>
      </Html>
    </group>
  );
}
