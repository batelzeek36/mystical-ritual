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
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        layout: { duration: 0.3 }
      }}
      className={`mystical-card group relative overflow-hidden ${
        desire.isSealed 
          ? 'bg-gradient-to-br from-mystical-gold/20 to-yellow-400/10 border-mystical-gold/40' 
          : 'hover:border-mystical-glow/60'
      }`}
    >
      {/* Sealed effect overlay */}
      {desire.isSealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-mystical-gold/10 to-yellow-400/5 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-radial from-mystical-gold/20 via-transparent to-transparent"></div>
        </motion.div>
      )}

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs text-mystical-silver/60 font-cinzel">
            {desire.createdAt.toLocaleDateString()}
          </span>
          <div className="flex space-x-2">
            <motion.button
              onClick={onToggleSeal}
              className={`text-sm px-3 py-1 rounded-full font-cinzel transition-all duration-200 ${
                desire.isSealed
                  ? 'bg-mystical-gold/20 text-mystical-gold border border-mystical-gold/30'
                  : 'bg-mystical-glow/20 text-mystical-glow border border-mystical-glow/30 hover:bg-mystical-glow/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {desire.isSealed ? '🔒 Sealed' : '✨ Seal'}
            </motion.button>
            <motion.button
              onClick={onRemove}
              className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>

        <p className={`font-cinzel leading-relaxed ${
          desire.isSealed ? 'text-mystical-gold' : 'text-mystical-silver'
        }`}>
          {desire.text}
        </p>

        {desire.isSealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-xs text-mystical-gold/80 font-cinzel italic"
          >
            ✨ This intention has been sealed and sent to the universe
          </motion.div>
        )}
      </div>

      {/* Mystical sparkles for sealed desires */}
      {desire.isSealed && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-mystical-gold rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${15 + i * 20}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default DesireCard