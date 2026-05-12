/* eslint-disable @typescript-eslint/no-namespace */
import { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    // Merge R3F's Three.js elements into the global JSX namespace
    // so <group>, <mesh>, etc. are recognized by the TypeScript compiler.
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
