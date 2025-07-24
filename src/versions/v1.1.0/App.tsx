import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import CallItInPanel from './components/CallItInPanel'
import BurnItPanel from './components/BurnItPanel'
import { RitualMode } from './types'

function V110App() {
  const [currentMode, setCurrentMode] = useState<RitualMode>('call-it-in')

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Mystical Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-mystical-glow rounded-full animate-sparkle"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-mystical-gold rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-mystical-glow rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-mystical-gold rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Enhanced mystical background elements for v1.1.0 */}
        <div className="absolute top-1/2 left-20 w-1 h-1 bg-purple-400 rounded-full animate-mystical-sparkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-orange-400 rounded-full animate-mystical-sparkle" style={{ animationDelay: '2.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-cinzel-decorative font-bold glowing-text mb-4">
            Mystical Ritual
          </h1>
          <p className="text-mystical-silver/80 font-cinzel text-lg">
            Manifest your desires • Release what no longer serves
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-2"
          >
            <span className="text-mystical-gold/60 font-cinzel text-sm">
              ✨ Enhanced with Mystical Flames ✨
            </span>
          </motion.div>
        </motion.header>

        <Navigation currentMode={currentMode} onModeChange={setCurrentMode} />

        <main className="mt-12">
          <AnimatePresence mode="wait">
            {currentMode === 'call-it-in' ? (
              <CallItInPanel key="call-it-in" />
            ) : (
              <BurnItPanel key="burn-it" />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default V110App