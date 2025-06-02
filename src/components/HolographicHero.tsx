'use client'

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Line, Text3D } from '@react-three/drei'
import * as THREE from 'three'

// Animated floating sphere component
function FloatingSphere({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <Sphere ref={meshRef} position={position} args={[0.1, 32, 32]}>
      <meshStandardMaterial color={color} transparent opacity={0.7} />
    </Sphere>
  )
}

// Flight path visualization
function FlightPath() {
  const points = [
    new THREE.Vector3(-2, 0, 0),
    new THREE.Vector3(-1, 0.5, 0.2),
    new THREE.Vector3(0, 0.8, 0.5),
    new THREE.Vector3(1, 0.5, 0.2),
    new THREE.Vector3(2, 0, 0)
  ]

  const lineRef = useRef<THREE.Line>(null)

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Line
      ref={lineRef}
      points={points}
      color="#60a5fa"
      lineWidth={3}
      dashed={false}
    />
  )
}

// Main 3D scene
function HolographicScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Floating spheres representing destinations */}
      <FloatingSphere position={[-2, 0, 0]} color="#60a5fa" speed={0.8} />
      <FloatingSphere position={[2, 0, 0]} color="#ec4899" speed={1.2} />
      <FloatingSphere position={[0, 1, 0]} color="#22c55e" speed={1.0} />
      
      {/* Flight path */}
      <FlightPath />
      
      {/* Rotating ring */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.3} />
      </mesh>
    </>
  )
}

export default function HolographicHero() {
  return (
    <motion.div 
      className="relative h-96 w-full rounded-3xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 bg-gradient-to-br from-neural-900/50 to-quantum-900/50 backdrop-blur-sm">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <HolographicScene />
        </Canvas>
      </div>
      
      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10">
          <motion.h3 
            className="text-3xl font-display font-bold holographic-text mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Neural Flight Mapping
          </motion.h3>
          <motion.p 
            className="text-neural-300 max-w-md mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Experience real-time 3D visualization of flight routes, weather patterns, and optimal pathways
          </motion.p>
        </div>
      </div>

      {/* Holographic grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </motion.div>
  )
}
