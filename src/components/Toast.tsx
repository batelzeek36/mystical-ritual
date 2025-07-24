import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  isVisible: boolean
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-600/90 to-emerald-600/90 border-green-500/30'
      case 'error':
        return 'bg-gradient-to-r from-red-600/90 to-pink-600/90 border-red-500/30'
      case 'info':
        return 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 border-blue-500/30'
      default:
        return 'bg-gradient-to-r from-purple-600/90 to-indigo-600/90 border-purple-500/30'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✨'
      case 'error':
        return '⚠️'
      case 'info':
        return 'ℹ️'
      default:
        return '🔮'
    }
  }

  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 right-4 z-50"
        >
          <div className={`${getToastStyles()} backdrop-blur-md rounded-lg p-4 border shadow-2xl max-w-sm`}>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getIcon()}</span>
              <p className="text-white font-medium flex-1">{message}</p>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Toast hook for easy usage
export const useToast = () => {
  const [toast, setToast] = React.useState<{
    message: string
    type: 'success' | 'error' | 'info'
    isVisible: boolean
  }>({
    message: '',
    type: 'info',
    isVisible: false
  })

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type, isVisible: true })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }

  return {
    toast,
    showToast,
    hideToast
  }
}