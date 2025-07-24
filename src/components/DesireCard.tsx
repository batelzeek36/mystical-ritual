import React from 'react'
import { motion } from 'framer-motion'
import { Desire } from '../types'

interface DesireCardProps {
  desire: Desire
  onToggleSeal: () => void
  onRemove: () => void
  index: number
}

const DesireCard: React.FC<DesireCardProps> = ({ desire, onToggleSeal, onRemove, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className={`mystical-card floating-card relative group ${
        desire.isSealed ? 'border-mystical-gold shadow-lg shadow-mystical-gold/20' : ''
      }`}
      style={{ animationDelay: `${index * 0.5}s` }}
    >
      {/* Sealed indicator */}
      {desire.isSealed && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-mystical-gold rounded-full flex items-center justify-center text-mystical-dark font-bold text-sm"
        >
          ✓
        </motion.div>
      )}

      {/* Remove button */}
      <motion.button
        onClick={onRemove}
        className="absolute -top-2 -left-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ×
      </motion.button>

      <div className="space-y-4">
        <p className="text-mystical-silver font-cinzel leading-relaxed">
          {desire.text}
        </p>

        <div className="flex items-center justify-between text-sm text-mystical-silver/60">
          <span className="font-cinzel">
            {desire.createdAt.toLocaleDateString()}
          </span>
          
          <motion.button
            onClick={onToggleSeal}
            className={`px-3 py-1 rounded-full font-cinzel-decorative text-xs font-bold transition-all duration-300 ${
              desire.isSealed
                ? 'bg-mystical-gold text-mystical-dark'
                : 'bg-mystical-purple text-mystical-silver hover:bg-mystical-glow'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {desire.isSealed ? '🔒 Sealed' : '🔓 Seal It'}
          </motion.button>
        </div>
      </div>

      {/* Mystical glow effect for sealed desires */}
      {desire.isSealed && (
        <div className="absolute inset-0 rounded-lg bg-mystical-gold/5 animate-pulse pointer-events-none"></div>
      )}
    </motion.div>
  )
}

export default DesireCard