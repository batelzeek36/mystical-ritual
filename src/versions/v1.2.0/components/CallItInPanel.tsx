import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Desire, User } from '../types'
import DesireCard from './DesireCard'
import { intentionService } from '../../../lib/supabase'

interface CallItInPanelProps {
  user: User | null
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
}

const CallItInPanel: React.FC<CallItInPanelProps> = ({ user, showToast }) => {
  const [desires, setDesires] = useState<Desire[]>([])
  const [newDesire, setNewDesire] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load desires from Supabase or localStorage
  useEffect(() => {
    const loadDesires = async () => {
      if (user) {
        setIsLoading(true)
        try {
          const intentions = await intentionService.getIntentions()
          const manifestDesires = intentions
            .filter(intention => intention.type === 'manifest')
            .map(intention => ({
              id: intention.id,
              text: intention.text,
              createdAt: new Date(intention.created_at),
              isSealed: true // All Supabase intentions are considered sealed
            }))
          setDesires(manifestDesires)
        } catch (error) {
          console.error('Error loading desires:', error)
          showToast('Failed to load your intentions', 'error')
        } finally {
          setIsLoading(false)
        }
      } else {
        // Load from localStorage for non-authenticated users
        const savedDesires = localStorage.getItem('mystical-desires-v1.2.0')
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
      }
    }

    loadDesires()
  }, [user, showToast])

  // Save desires to localStorage for non-authenticated users
  useEffect(() => {
    if (!user) {
      localStorage.setItem('mystical-desires-v1.2.0', JSON.stringify(desires))
    }
  }, [desires, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDesire.trim() || isSubmitting) return

    setIsSubmitting(true)

    try {
      if (user) {
        // Save to Supabase
        const intention = await intentionService.addIntention(newDesire.trim(), 'manifest')
        const desire: Desire = {
          id: intention.id,
          text: intention.text,
          createdAt: new Date(intention.created_at),
          isSealed: true
        }
        setDesires(prev => [desire, ...prev])
        showToast('Intention sealed and sent to the universe! ✨', 'success')
      } else {
        // Save locally for non-authenticated users
        const desire: Desire = {
          id: Date.now().toString(),
          text: newDesire.trim(),
          createdAt: new Date(),
          isSealed: false
        }
        setTimeout(() => {
          setDesires(prev => [desire, ...prev])
          showToast('Intention created! Sign in to sync across devices ✨', 'info')
        }, 500)
      }
      setNewDesire('')
    } catch (error) {
      console.error('Error saving desire:', error)
      showToast('Failed to save intention', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleSeal = async (id: string) => {
    if (user) {
      showToast('Authenticated intentions are automatically sealed ✨', 'info')
      return
    }

    // Only allow sealing for local desires
    setDesires(prev => prev.map(desire => 
      desire.id === id ? { ...desire, isSealed: !desire.isSealed } : desire
    ))
  }

  const removeDesire = async (id: string) => {
    try {
      if (user) {
        await intentionService.deleteIntention(id)
        showToast('Intention released from the universe', 'success')
      } else {
        showToast('Local intention removed', 'info')
      }
      setDesires(prev => prev.filter(desire => desire.id !== id))
    } catch (error) {
      console.error('Error removing desire:', error)
      showToast('Failed to remove intention', 'error')
    }
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
        {!user && (
          <p className="text-mystical-gold/60 font-cinzel text-sm mt-2">
            💡 Sign in to sync your intentions across all devices
          </p>
        )}
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
                {user ? 'Sealing Intention...' : 'Creating Intention...'}
              </span>
            ) : (
              user ? '✨ Seal & Sync Intention' : '✨ Create Intention'
            )}
          </motion.button>
        </div>
      </motion.form>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <motion.div
            className="w-8 h-8 border-2 border-mystical-gold border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-mystical-silver/60 font-cinzel">Loading your intentions...</p>
        </div>
      )}

      {/* Desires Grid */}
      {!isLoading && (
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
      )}

      {!isLoading && desires.length === 0 && (
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