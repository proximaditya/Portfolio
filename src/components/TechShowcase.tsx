"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const WORDS = ["PYTHON", "AI / ML", "NEXT.JS", "TENSORFLOW", "C++", "SUPABASE", "REACT", "NODE.JS", "THREE.JS", "VUE.JS", "DOCKER", "C", "DSA", "Git", "MLOPS", "AWS", "AZURE", "SQL", "NOSQL", "GRAPHQL", "REST API", "FASTAPI", "WebGL", "Prisma" ];
const PARTICLE_COUNT = 2800;

function ParticleText() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [wordIndex, setWordIndex] = useState(0);

  // Calculate target positions for particles based on the current word
  const targetPositions = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return new Float32Array(PARTICLE_COUNT * 3);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the word
    ctx.fillStyle = "white";
    ctx.font = "bold 120px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(WORDS[wordIndex], canvas.width / 2, canvas.height / 2);

    // Extract pixels
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const points: THREE.Vector3[] = [];

    // Sample the pixels to find where the text is
    for (let y = 0; y < canvas.height; y += 4) {
      for (let x = 0; x < canvas.width; x += 4) {
        const alpha = imageData[(y * canvas.width + x) * 4];
        if (alpha > 128) {
          // Center the coordinates and scale them for 3D space
          points.push(new THREE.Vector3((x - canvas.width / 2) / 35, -(y - canvas.height / 2) / 35, (Math.random() - 0.5) * 0.5));
        }
      }
    }

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const point = points[i % points.length]; // Loop over available points if we have too many particles
      // Add a tiny bit of random scatter so it doesn't look perfectly rigid
      positions[i * 3] = point.x + (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 1] = point.y + (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.2;
    }

    return positions;
  }, [wordIndex]);

  // Current positions that will interpolate towards target positions
  const currentPositions = useRef(new Float32Array(PARTICLE_COUNT * 3));
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize particles in random spots
  useEffect(() => {
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      currentPositions.current[i] = (Math.random() - 0.5) * 20;
    }
  }, []);

  // Change word every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    // Smoothly move particles towards their targets
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      
      // Interpolate current position to target position (Lerp)
      currentPositions.current[ix] += (targetPositions[ix] - currentPositions.current[ix]) * 0.05;
      currentPositions.current[ix + 1] += (targetPositions[ix + 1] - currentPositions.current[ix + 1]) * 0.05;
      currentPositions.current[ix + 2] += (targetPositions[ix + 2] - currentPositions.current[ix + 2]) * 0.05;

      dummy.position.set(
        currentPositions.current[ix],
        currentPositions.current[ix + 1],
        currentPositions.current[ix + 2]
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        {/* Glowy Orange Particles */}
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.8} />
      </instancedMesh>
    </Float>
  );
}

export default function TechShowcase() {
  return (
    <section className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">Stack.</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            particle kinematics demonstrating my core technologies. Drag to rotate the void.
          </p>
        </motion.div>

        {/* The 3D Canvas Box */}
        <div className="w-full max-w-[1000px] h-[400px] md:h-[500px] rounded-3xl bg-[#0a0a0a]/50 border border-white/10 shadow-2xl overflow-hidden relative cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <ParticleText />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)] pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
}