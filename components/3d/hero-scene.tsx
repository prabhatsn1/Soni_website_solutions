"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

function GlowOrb({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += delta * 0.05;
  });

  return (
    <mesh ref={meshRef} scale={1.6}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#7c6cf0"
        emissive="#4c3fd6"
        emissiveIntensity={0.35}
        roughness={0.15}
        metalness={0.6}
        distort={reducedMotion ? 0.15 : 0.35}
        speed={reducedMotion ? 0 : 1.6}
      />
    </mesh>
  );
}

function WireframeShape({
  position,
  geometry,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  geometry: "box" | "octahedron" | "torus";
  scale?: number;
  speed?: number;
}) {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.1 * speed;
    meshRef.current.rotation.y += delta * 0.15 * speed;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry === "box" ? <boxGeometry args={[1, 1, 1]} /> : null}
        {geometry === "octahedron" ? <octahedronGeometry args={[1, 0]} /> : null}
        {geometry === "torus" ? <torusGeometry args={[0.7, 0.22, 16, 48]} /> : null}
        <meshStandardMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 4, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -2, -2]} intensity={0.8} color="#7c6cf0" />

      <GlowOrb reducedMotion={reducedMotion} />

      <WireframeShape position={[-2.6, 1.1, -1]} geometry="octahedron" scale={0.55} />
      <WireframeShape position={[2.5, -0.8, -0.5]} geometry="torus" scale={0.5} speed={0.7} />
      <WireframeShape position={[2, 1.6, -1.5]} geometry="box" scale={0.35} speed={1.3} />

      {!reducedMotion ? (
        <Sparkles count={60} scale={7} size={2} speed={0.3} color="#a78bfa" opacity={0.5} />
      ) : null}

      <Environment preset="city" environmentIntensity={0.3} />
    </Canvas>
  );
}
