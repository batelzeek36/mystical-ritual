import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Desire } from '../types'
import DesireCard from './DesireCard'

const CallItInPanel: React.FC = () => {
  const [desires, setDesires] = useState<Desire[]>([])
  const [newDesire, setNewDesire] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load desires from localStorage on component mount
  useEffect(() => {
    const savedDesires = localStorage.getItem('mystical-desires-v1')
    if (savedDesires) {
      try {
        const parsed = JSON.parse(savedDesires)
        setDesires(parsed.map((d: any) => ({
          ...d,
          createdAt: new Date(d.createdAt)
        })))
      } catch (error) {
        console.error('Error loading desires:', error)
      }
    }
  }, [])

  // Save desires to localStorage whenever desires change
  useEffect(() => {
    localStorage.setItem('mystical-desires-v1', JSON.stringify(desires))
  }, [desires])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDesire.trim() || isSubmitting) return

    setIsSubmitting(true)

    const desire: Desire = {
      id: Date.now().toString(),
      text: newDesire.trim(),
      createdAt: new Date(),
      isSealed: false
    }

    // Add with animation delay
    setTimeout(() => {
      setDesires(prev => [desire, ...prev])
      setNewDesire('')
      setIsSubmitting(false)
    }, 500)
  }

  const toggleSeal = (id: string) => {
    setDesires(prev => prev.map(desire => 
      desire.id === id ? { ...desire, isSealed: !desire.isSealed } : desire
    ))
  }

  const removeDesire = (id: string) => {
    setDesires(prev => prev.filter(desire => desire.id !== id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cinzel-decorative font-bold text-mystical-gold mb-4">
          🌅 Face East • Call It In
        </h2>
        <p className="text-mystical-silver/80 font-cinzel">
          Speak your desires into existence. Write what you wish to manifest.
        </p>
      </div>

      {/* Input Form */}
      <motion.form 
        onSubmit={handleSubmit}
        className="mystical-card mb-8"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="space-y-4">
          <textarea
            value={newDesire}
            onChange={(e) => setNewDesire(e.target.value)}
            placeholder="I call forth into my reality..."
            className="mystical-input w-full h-32 resize-none"
            disabled={isSubmitting}
          />
          
          <motion.button
            type="submit"
            disabled={!newDesire.trim() || isSubmitting}
            className={`mystical-button w-full ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Sealing Intention...
              </span>
            ) : (
              '✨ Seal This Intention'
            )}
          </motion.button>
        </div>
      </motion.form>

      {/* Desires Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {desires.map((desire, index) => (
            <DesireCard
              key={desire.id}
              desire={desire}
              onToggleSeal={() => toggleSeal(desire.id)}
              onRemove={() => removeDesire(desire.id)}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>

      {desires.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🌟</div>
          <p className="text-mystical-silver/60 font-cinzel">
            Your manifestation journey begins with the first intention...
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default CallItInPanel