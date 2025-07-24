import React from 'react'
import { motion } from 'framer-motion'

interface MysticalFlameProps {
  isActive: boolean
  onComplete?: () => void
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
  duration: number
  intensity: number
}

const MysticalFlame: React.FC<MysticalFlameProps> = ({ isActive, onComplete }) => {
  React.useEffect(() => {
    if (isActive && onComplete) {
      const timer = setTimeout(onComplete, 3000)
      return () => clearTimeout(timer)
    }
  }, [isActive, onComplete])

  if (!isActive) return null

  // Generate lots of magical particles
  const generateParticles = (): Particle[] => {
    const particles: Particle[] = []
    const centerX = 50
    const centerY = 80
    
    // Core flame particles (red/orange)
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2
      const radius = Math.random() * 30 + 10
      particles.push({
        id: i,
        x: centerX + Math.cos(angle) * radius * (Math.random() * 0.5 + 0.5),
        y: centerY - Math.random() * 60,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? '#ff4500' : '#ff6b35',
        delay: Math.random() * 0.5,
        duration: Math.random() * 1.5 + 1,
        intensity: Math.random() * 0.8 + 0.2
      })
    }
    
    // Middle flame particles (orange/yellow)
    for (let i = 40; i < 80; i++) {
      const angle = (i / 40) * Math.PI * 2
      const radius = Math.random() * 25 + 8
      particles.push({
        id: i,
        x: centerX + Math.cos(angle) * radius * (Math.random() * 0.4 + 0.3),
        y: centerY - Math.random() * 50 - 10,
        size: Math.random() * 2.5 + 0.8,
        color: Math.random() > 0.5 ? '#ffa500' : '#ffb347',
        delay: Math.random() * 0.3,
        duration: Math.random() * 1.2 + 0.8,
        intensity: Math.random() * 0.9 + 0.1
      })
    }
    
    // Inner flame particles (yellow/white)
    for (let i = 80; i < 110; i++) {
      const angle = (i / 30) * Math.PI * 2
      const radius = Math.random() * 20 + 5
      particles.push({
        id: i,
        x: centerX + Math.cos(angle) * radius * (Math.random() * 0.3 + 0.2),
        y: centerY - Math.random() * 40 - 20,
        size: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? '#ffff00' : '#fff8dc',
        delay: Math.random() * 0.2,
        duration: Math.random() * 1 + 0.6,
        intensity: Math.random() * 1 + 0.3
      })
    }
    
    // Mystical particles (purple/blue)
    for (let i = 110; i < 130; i++) {
      const angle = (i / 20) * Math.PI * 2
      const radius = Math.random() * 35 + 15
      particles.push({
        id: i,
        x: centerX + Math.cos(angle) * radius * (Math.random() * 0.6 + 0.2),
        y: centerY - Math.random() * 70 - 10,
        size: Math.random() * 1.5 + 0.3,
        color: Math.random() > 0.5 ? '#8a2be2' : '#4b0082',
        delay: Math.random() * 0.4,
        duration: Math.random() * 2 + 1,
        intensity: Math.random() * 0.7 + 0.3
      })
    }
    
    // Sparkle particles (gold/white)
    for (let i = 130; i < 160; i++) {
      particles.push({
        id: i,
        x: centerX + (Math.random() - 0.5) * 80,
        y: centerY - Math.random() * 80,
        size: Math.random() * 1.2 + 0.2,
        color: Math.random() > 0.5 ? '#ffd700' : '#ffffff',
        delay: Math.random() * 1,
        duration: Math.random() * 1.5 + 0.5,
        intensity: Math.random() * 1.2 + 0.3
      })
    }
    
    return particles
  }

  const particles = generateParticles()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
    >
      {/* Particle Container */}
      <div className="relative w-96 h-96">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              bottom: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0,
              y: 0,
              x: 0
            }}
            animate={{ 
              opacity: [0, particle.intensity, particle.intensity * 0.8, 0],
              scale: [0, 1, 1.2, 0.3],
              y: [0, -20 - Math.random() * 40, -40 - Math.random() * 60, -80 - Math.random() * 40],
              x: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15],
              rotate: [0, Math.random() * 360]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
        
        {/* Additional floating embers */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`ember-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${50 + (Math.random() - 0.5) * 60}%`,
              bottom: `${60 + Math.random() * 40}%`,
              backgroundColor: Math.random() > 0.5 ? '#ff4500' : '#ffa500',
              boxShadow: `0 0 4px ${Math.random() > 0.5 ? '#ff4500' : '#ffa500'}`,
            }}
            animate={{
              y: [0, -100 - Math.random() * 100],
              x: [(Math.random() - 0.5) * 30],
              opacity: [1, 0.8, 0],
              scale: [1, 0.5, 0.2]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 1,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
        
        {/* Mystical energy wisps */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`wisp-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${50 + Math.sin(i * 0.8) * 40}%`,
              bottom: `${70 + Math.cos(i * 0.6) * 30}%`,
              backgroundColor: '#8a2be2',
              boxShadow: '0 0 8px #8a2be2',
            }}
            animate={{
              y: [0, -60, -120],
              x: [0, Math.sin(i) * 20, Math.cos(i) * 30],
              opacity: [0.8, 0.6, 0],
              scale: [1, 1.5, 0.5]
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Magical text overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, times: [0, 0.2, 0.8, 1] }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 text-mystical-gold font-cinzel-decorative text-lg font-bold"
      >
        ✨ Mystical Particles Consume All ✨
      </motion.div>
      
      {/* Glowing base effect */}
      <motion.div
        className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-radial from-orange-500/40 via-red-500/20 to-transparent rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}

export default MysticalFlame