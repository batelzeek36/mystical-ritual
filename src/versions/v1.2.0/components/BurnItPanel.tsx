import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MysticalFlame from './MysticalFlame'
import { User } from '../types'
import { intentionService } from '../../../lib/supabase'

interface BurnItPanelProps {
  user: User | null
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
}

const BurnItPanel: React.FC<BurnItPanelProps> = ({ user, showToast }) => {
  const [releaseText, setReleaseText] = useState('')
  const [isBurning, setIsBurning] = useState(false)
  const [showMysticalFlame, setShowMysticalFlame] = useState(false)
  const [burnedItems, setBurnedItems] = useState<string[]>([])

  const handleBurn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!releaseText.trim() || isBurning) return

    setIsBurning(true)
    setShowMysticalFlame(true)

    try {
      if (user) {
        // Save to Supabase
        await intentionService.addIntention(releaseText.trim(), 'release')
        showToast('Released to the mystical flames and transformed! 🔥', 'success')
      } else {
        showToast('Released to the mystical flames! Sign in to sync across devices 🔥', 'info')
      }

      // Add to burned items for the animation
      setBurnedItems(prev => [...prev, releaseText.trim()])

      // Clear the text after burn animation
      setTimeout(() => {
        setReleaseText('')
        setIsBurning(false)
        // Remove from burned items after animation
        setTimeout(() => {
          setBurnedItems(prev => prev.slice(1))
        }, 2000)
      }, 2000)
    } catch (error) {
      console.error('Error burning release:', error)
      showToast('Failed to release to the flames', 'error')
      setIsBurning(false)
      setShowMysticalFlame(false)
    }
  }

  const handleFlameComplete = () => {
    setShowMysticalFlame(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cinzel-decorative font-bold text-red-400 mb-4">
          🔥 Face West • Burn It
        </h2>
        <p className="text-mystical-silver/80 font-cinzel">
          Release what no longer serves you. Let the mystical flames transform your burdens into ash.
        </p>
        {!user && (
          <p className="text-red-400/60 font-cinzel text-sm mt-2">
            💡 Sign in to save your releases and track your transformation journey
          </p>
        )}
      </div>

      {/* Burn Form */}
      <motion.form 
        onSubmit={handleBurn}
        className="mystical-card mb-8 relative overflow-hidden"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Enhanced Fire background effect when burning */}
        <AnimatePresence>
          {isBurning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-orange-600/40 to-yellow-400/30 pointer-events-none"
            >
              {/* Animated fire overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-800/50 via-orange-500/30 to-transparent animate-flame-core"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-700/40 via-yellow-500/20 to-transparent animate-flame-middle"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4 relative z-10">
          <textarea
            value={releaseText}
            onChange={(e) => setReleaseText(e.target.value)}
            placeholder="I release and let go of..."
            className={`mystical-input w-full h-32 resize-none transition-all duration-300 ${
              isBurning ? 'bg-red-900/30 border-red-500/60 text-red-100 placeholder-red-300/50' : ''
            }`}
            disabled={isBurning}
          />
          
          <motion.button
            type="submit"
            disabled={!releaseText.trim() || isBurning}
            className={`w-full py-4 px-6 rounded-lg font-cinzel-decorative font-bold text-lg transition-all duration-300 ${
              isBurning
                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white cursor-not-allowed shadow-lg shadow-red-500/50'
                : !releaseText.trim()
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 to-orange-500 text-white hover:shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-orange-400'
            }`}
            whileHover={!isBurning && releaseText.trim() ? { scale: 1.02 } : {}}
            whileTap={!isBurning && releaseText.trim() ? { scale: 0.98 } : {}}
          >
            {isBurning ? (
              <span className="flex items-center justify-center">
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Mystical Flames Consuming...
              </span>
            ) : (
              user ? '🔥 Burn & Transform' : '🔥 Burn It Away'
            )}
          </motion.button>
        </div>
      </motion.form>

      {/* Mystical Flame Animation */}
      <MysticalFlame 
        isActive={showMysticalFlame} 
        onComplete={handleFlameComplete}
      />

      {/* Burning Animation Area */}
      <div className="relative min-h-[200px] flex items-center justify-center">
        <AnimatePresence>
          {burnedItems.map((item, index) => (
            <BurningText key={`${item}-${index}`} text={item} />
          ))}
        </AnimatePresence>

        {burnedItems.length === 0 && !isBurning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🕯️</div>
            <p className="text-mystical-silver/60 font-cinzel">
              The sacred mystical fire awaits your offerings...
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Enhanced Burning text animation component
const BurningText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, y: 0 }}
      animate={{ 
        opacity: [1, 0.9, 0.7, 0.4, 0],
        scale: [1, 1.05, 1.15, 1.1, 0.8],
        y: [0, -15, -35, -55, -80],
        filter: [
          'hue-rotate(0deg) brightness(1) saturate(1)',
          'hue-rotate(20deg) brightness(1.3) saturate(1.2)',
          'hue-rotate(40deg) brightness(1.6) saturate(1.4)',
          'hue-rotate(60deg) brightness(1.4) saturate(1.1)',
          'hue-rotate(80deg) brightness(0.6) saturate(0.8)'
        ]
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className="absolute mystical-card bg-gradient-to-t from-red-900/90 to-orange-600/70 border-red-500/60 max-w-md shadow-lg shadow-red-500/30"
    >
      <p className="text-red-100 font-cinzel leading-relaxed">
        {text}
      </p>
      
      {/* Enhanced Fire particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full"
            style={{
              left: `${15 + i * 10}%`,
              top: `${85 - i * 8}%`,
            }}
            animate={{
              y: [-5, -25, -45],
              x: [0, Math.sin(i) * 10, Math.cos(i) * 15],
              opacity: [1, 0.8, 0],
              scale: [1, 1.2, 0.4],
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default BurnItPanel