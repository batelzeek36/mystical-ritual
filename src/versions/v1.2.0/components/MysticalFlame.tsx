import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MysticalFlameProps {
  isActive: boolean
  onComplete: () => void
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  velocity: { x: number; y: number }
  life: number
  maxLife: number
}

const MysticalFlame: React.FC<MysticalFlameProps> = ({ isActive, onComplete }) => {
  const [particles, setParticles] = useState<Particle[]>([])
  const [,] = useState<number | null>(null)

  const colors = [
    '#FF6B35', // Orange-red
    '#F7931E', // Orange
    '#FFD700', // Gold
    '#FF4500', // Red-orange
    '#FFA500', // Orange
    '#FFFF00', // Yellow
    '#FF8C00', // Dark orange
    '#DC143C', // Crimson
  ]

  const createParticle = (id: number): Particle => {
    const baseX = 200 // Center X
    const baseY = 300 // Bottom Y
    
    return {
      id,
      x: baseX + (Math.random() - 0.5) * 60,
      y: baseY + Math.random() * 20,
      size: Math.random() * 8 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.8 + 0.2,
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: -(Math.random() * 3 + 2)
      },
      life: 0,
      maxLife: Math.random() * 60 + 40
    }
  }

  const updateParticles = (prevParticles: Particle[]): Particle[] => {
    return prevParticles
      .map(particle => ({
        ...particle,
        x: particle.x + particle.velocity.x,
        y: particle.y + particle.velocity.y,
        velocity: {
          x: particle.velocity.x + (Math.random() - 0.5) * 0.2,
          y: particle.velocity.y - 0.1
        },
        opacity: particle.opacity * 0.98,
        life: particle.life + 1
      }))
      .filter(particle => particle.life < particle.maxLife && particle.opacity > 0.01)
  }

  useEffect(() => {
    if (isActive) {
      let particleId = 0
      const interval = setInterval(() => {
        setParticles(prev => {
          const updated = updateParticles(prev)
          // Add new particles
          const newParticles = Array.from({ length: 8 }, () => createParticle(particleId++))
          return [...updated, ...newParticles].slice(-160) // Limit to 160 particles
        })
      }, 50)

      const timeout = setTimeout(() => {
        clearInterval(interval)
        // Let existing particles fade out
        const fadeInterval = setInterval(() => {
          setParticles(prev => {
            const updated = updateParticles(prev)
            if (updated.length === 0) {
              clearInterval(fadeInterval)
              onComplete()
            }
            return updated
          })
        }, 50)
      }, 3000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    } else {
      setParticles([])
    }
  }, [isActive, onComplete])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center"
        >
          <div className="relative w-96 h-96">
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              className="absolute inset-0"
            >
              {particles.map(particle => (
                <motion.circle
                  key={particle.id}
                  cx={particle.x}
                  cy={particle.y}
                  r={particle.size}
                  fill={particle.color}
                  opacity={particle.opacity}
                  style={{
                    filter: `blur(${particle.size * 0.3}px)`,
                    mixBlendMode: 'screen'
                  }}
                  animate={{
                    scale: [1, 1.2, 0.8],
                    opacity: [particle.opacity, particle.opacity * 0.7, 0]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeOut"
                  }}
                />
              ))}
              
              {/* Base glow effect */}
              <defs>
                <radialGradient id="baseGlow" cx="50%" cy="80%" r="40%">
                  <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#F7931E" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity="0.1" />
                </radialGradient>
              </defs>
              <ellipse
                cx="200"
                cy="320"
                rx="80"
                ry="40"
                fill="url(#baseGlow)"
                opacity="0.6"
              />
            </svg>
            
            {/* Additional mystical effects */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-orange-500/20 via-red-500/10 to-transparent"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MysticalFlame