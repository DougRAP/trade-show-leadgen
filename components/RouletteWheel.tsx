import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { PRIZES } from '../lib/prizes'

interface WheelProps {
  isSpinning: boolean;
  onSpinComplete: (prizeIndex: number) => void;
}

const WheelMesh: React.FC<WheelProps> = ({ isSpinning, onSpinComplete }) => {
  const wheelRef = useRef<THREE.Group>(null)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    if (isSpinning && wheelRef.current) {
      // Calculate target rotation (multiple full spins + final position)
      const spins = 5 + Math.random() * 3 // 5-8 full rotations
      const finalAngle = Math.random() * Math.PI * 2
      const targetRotation = spins * Math.PI * 2 + finalAngle
      
      gsap.to(wheelRef.current.rotation, {
        z: targetRotation,
        duration: 5,
        ease: "power4.out",
        onComplete: () => {
          // Calculate which segment we landed on
          const normalizedAngle = (finalAngle % (Math.PI * 2)) / (Math.PI * 2)
          const segmentSize = 1 / PRIZES.length
          const prizeIndex = Math.floor(normalizedAngle / segmentSize)
          onSpinComplete(prizeIndex)
        }
      })
    }
  }, [isSpinning, onSpinComplete])

  const segmentAngle = (Math.PI * 2) / PRIZES.length

  return (
    <group ref={wheelRef} rotation={[Math.PI / 12, 0, 0]}>
      {/* Wheel segments */}
      {PRIZES.map((prize, index) => {
        const angle = index * segmentAngle
        const x = Math.cos(angle) * 2
        const y = Math.sin(angle) * 2
        
        return (
          <group key={prize.id} rotation={[0, 0, angle]}>
            <mesh position={[1.5, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.3, 0.8]} />
              <meshStandardMaterial color={prize.color} />
            </mesh>
            <Text
              position={[1.2, 0, 0.1]}
              fontSize={0.15}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {prize.icon}
            </Text>
          </group>
        )
      })}
      
      {/* Main wheel disc */}
      <mesh>
        <cylinderGeometry args={[2.5, 2.5, 0.2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      
      {/* Center hub */}
      <mesh position={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
    </group>
  )
}

const RouletteWheel: React.FC<WheelProps> = ({ isSpinning, onSpinComplete }) => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <WheelMesh isSpinning={isSpinning} onSpinComplete={onSpinComplete} />
      </Canvas>
    </div>
  )
}

export default RouletteWheel