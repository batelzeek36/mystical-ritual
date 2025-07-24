import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { versions, getActiveVersion, AppVersion } from '../versions'

interface VersionSwitcherProps {
  onVersionChange: (version: AppVersion) => void
}

const VersionSwitcher: React.FC<VersionSwitcherProps> = ({ onVersionChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentVersion, setCurrentVersion] = useState(getActiveVersion())

  const handleVersionSelect = (version: AppVersion) => {
    setCurrentVersion(version)
    onVersionChange(version)
    setIsOpen(false)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-mystical-purple/80 backdrop-blur-sm border border-mystical-glow/30 rounded-lg px-4 py-2 text-mystical-silver font-cinzel text-sm hover:bg-mystical-purple/90 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center space-x-2">
          <span>⚡</span>
          <span>{currentVersion.id}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-80 bg-mystical-dark/95 backdrop-blur-sm border border-mystical-glow/30 rounded-lg shadow-lg shadow-mystical-glow/10 overflow-hidden"
          >
            <div className="p-3 border-b border-mystical-glow/20">
              <h3 className="text-mystical-gold font-cinzel-decorative font-bold text-sm">
                App Versions
              </h3>
              <p className="text-mystical-silver/60 text-xs font-cinzel mt-1">
                Switch between different versions of the app
              </p>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {versions.map((version) => (
                <motion.button
                  key={version.id}
                  onClick={() => handleVersionSelect(version)}
                  className={`w-full text-left p-3 border-b border-mystical-glow/10 last:border-b-0 transition-all duration-200 ${
                    currentVersion.id === version.id
                      ? 'bg-mystical-glow/20 border-l-4 border-l-mystical-gold'
                      : 'hover:bg-mystical-purple/20'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-mystical-gold font-cinzel-decorative font-bold text-sm">
                          {version.id}
                        </span>
                        {currentVersion.id === version.id && (
                          <span className="text-mystical-gold text-xs">✓</span>
                        )}
                      </div>
                      <h4 className="text-mystical-silver font-cinzel text-sm font-medium mt-1">
                        {version.name}
                      </h4>
                      <p className="text-mystical-silver/70 text-xs font-cinzel mt-1 leading-relaxed">
                        {version.description}
                      </p>
                      <p className="text-mystical-silver/50 text-xs font-cinzel mt-2">
                        Created: {version.createdAt}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="p-3 border-t border-mystical-glow/20 bg-mystical-purple/10">
              <p className="text-mystical-silver/60 text-xs font-cinzel">
                💡 Each version maintains its own data and settings
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default VersionSwitcher