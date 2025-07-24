import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import CallItInPanel from './components/CallItInPanel'
import BurnItPanel from './components/BurnItPanel'
import { AuthModal } from '../../components/AuthModal'
import { Toast, useToast } from '../../components/Toast'
import { RitualMode, User } from './types'
import { authService } from '../../lib/supabase'

function V120App() {
  const [currentMode, setCurrentMode] = useState<RitualMode>('call-it-in')
  const [user, setUser] = useState<User | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast, showToast, hideToast } = useToast()

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        if (currentUser) {
          setUser({
            id: currentUser.id,
            email: currentUser.email || ''
          })
        }
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      if (user) {
        setUser({
          id: user.id,
          email: user.email || ''
        })
        setIsAuthModalOpen(false)
        showToast('Welcome to the mystical realm! ✨', 'success')
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [showToast])

  const handleSignOut = async () => {
    try {
      await authService.signOut()
      showToast('You have left the mystical realm. Until next time... 🌙', 'info')
    } catch (error) {
      showToast('Error signing out', 'error')
    }
  }

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false)
    showToast('Magic link sent! Check your email ✉️', 'success')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            className="w-12 h-12 border-4 border-mystical-gold border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-mystical-silver font-cinzel">Connecting to the mystical realm...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Mystical Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-mystical-glow rounded-full animate-sparkle"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-mystical-gold rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-mystical-glow rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-mystical-gold rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Enhanced mystical background elements for v1.2.0 */}
        <div className="absolute top-1/2 left-20 w-1 h-1 bg-purple-400 rounded-full animate-mystical-sparkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-orange-400 rounded-full animate-mystical-sparkle" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-blue-400 rounded-full animate-mystical-sparkle" style={{ animationDelay: '3s' }}></div>
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
              ✨ Enhanced with Cloud Sync & Authentication ✨
            </span>
          </motion.div>

          {/* User Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mt-4 flex items-center justify-center space-x-4"
          >
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-mystical-silver/80 font-cinzel text-sm">
                  🔮 Signed in as {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-mystical-gold/80 hover:text-mystical-gold font-cinzel text-sm underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-cinzel text-sm transition-all duration-200"
              >
                🔮 Sign In to Sync
              </button>
            )}
          </motion.div>
        </motion.header>

        <Navigation currentMode={currentMode} onModeChange={setCurrentMode} />

        <main className="mt-12">
          <AnimatePresence mode="wait">
            {currentMode === 'call-it-in' ? (
              <CallItInPanel key="call-it-in" user={user} showToast={showToast} />
            ) : (
              <BurnItPanel key="burn-it" user={user} showToast={showToast} />
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  )
}

export default V120App