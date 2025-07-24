import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BurnItPanel: React.FC = () => {
  const [releaseText, setReleaseText] = useState('')
  const [isBurning, setIsBurning] = useState(false)
  const [burnedItems, setBurnedItems] = useState<string[]>([])

  const handleBurn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!releaseText.trim() || isBurning) return

    setIsBurning(true)

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
          Release what no longer serves you. Let the flames transform your burdens into ash.
        </p>
      </div>

      {/* Burn Form */}
      <motion.form 
        onSubmit={handleBurn}
        className="mystical-card mb-8 relative overflow-hidden"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Fire background effect when burning */}
        <AnimatePresence>
          {isBurning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-red-900/50 via-orange-600/30 to-yellow-400/20 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="space-y-4 relative z-10">
          <textarea
            value={releaseText}
            onChange={(e) => setReleaseText(e.target.value)}
            placeholder="I release and let go of..."
            className={`mystical-input w-full h-32 resize-none transition-all duration-300 ${
              isBurning ? 'bg-red-900/20 border-red-500/50 text-red-200' : ''
            }`}
            disabled={isBurning}
          />
          
          <motion.button
            type="submit"
            disabled={!releaseText.trim() || isBurning}
            className={`w-full py-4 px-6 rounded-lg font-cinzel-decorative font-bold text-lg transition-all duration-300 ${
              isBurning
                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white cursor-not-allowed'
                : !releaseText.trim()
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 to-orange-500 text-white hover:shadow-lg hover:shadow-red-500/25'
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
                Burning...
              </span>
            ) : (
              '🔥 Burn It Away'
            )}
          </motion.button>
        </div>
      </motion.form>

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
              The sacred fire awaits your offerings...
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Burning text animation component
const BurningText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, y: 0 }}
      animate={{ 
        opacity: [1, 0.8, 0.6, 0.3, 0],
        scale: [1, 1.1, 1.2, 0.9, 0.7],
        y: [0, -20, -40, -60, -80],
        filter: [
          'hue-rotate(0deg) brightness(1)',
          'hue-rotate(30deg) brightness(1.2)',
          'hue-rotate(60deg) brightness(1.5)',
          'hue-rotate(90deg) brightness(1.2)',
          'hue-rotate(120deg) brightness(0.5)'
        ]
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="absolute mystical-card bg-gradient-to-t from-red-900/80 to-orange-600/60 border-red-500/50 max-w-md"
    >
      <p className="text-red-200 font-cinzel leading-relaxed">
        {text}
      </p>
      
      {/* Fire particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${80 - i * 5}%`,
            }}
            animate={{
              y: [-10, -30, -50],
              opacity: [1, 0.7, 0],
              scale: [1, 0.8, 0.3],
            }}
            transition={{
              duration: 1.5,
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