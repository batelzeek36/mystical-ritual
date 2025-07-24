import React from 'react'
import { motion } from 'framer-motion'
import { RitualMode } from '../types'

interface NavigationProps {
  currentMode: RitualMode
  onModeChange: (mode: RitualMode) => void
}

const Navigation: React.FC<NavigationProps> = ({ currentMode, onModeChange }) => {
  return (
    <nav className="flex justify-center">
      <div className="mystical-card p-2 flex rounded-full">
        <motion.button
          className={`px-8 py-4 rounded-full font-cinzel-decorative font-bold text-lg transition-all duration-300 ${
            currentMode === 'call-it-in'
              ? 'bg-gradient-to-r from-mystical-gold to-yellow-400 text-mystical-dark shadow-lg shadow-mystical-gold/25'
              : 'text-mystical-silver hover:text-mystical-gold'
          }`}
          onClick={() => onModeChange('call-it-in')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🌅 Call It In
        </motion.button>
        
        <div className="w-px bg-mystical-glow/30 mx-2"></div>
        
        <motion.button
          className={`px-8 py-4 rounded-full font-cinzel-decorative font-bold text-lg transition-all duration-300 ${
            currentMode === 'burn-it'
              ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-500/25'
              : 'text-mystical-silver hover:text-red-400'
          }`}
          onClick={() => onModeChange('burn-it')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔥 Burn It
        </motion.button>
      </div>
    </nav>
  )
}

export default Navigation