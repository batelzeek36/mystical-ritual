import { useState } from 'react'
import { motion } from 'framer-motion'
import VersionSwitcher from './components/VersionSwitcher'
import { getActiveVersion, AppVersion } from './versions'

function App() {
  const [currentVersion, setCurrentVersion] = useState<AppVersion>(getActiveVersion())

  const handleVersionChange = (version: AppVersion) => {
    setCurrentVersion(version)
  }

  // Render the current version's component
  const CurrentVersionApp = currentVersion.component

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Version Switcher */}
      <VersionSwitcher onVersionChange={handleVersionChange} />

      {/* Version Badge */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-4 left-4 z-40"
      >
        <div className="bg-mystical-dark/80 backdrop-blur-sm border border-mystical-glow/30 rounded-lg px-3 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-mystical-gold rounded-full animate-pulse"></div>
            <span className="text-mystical-silver font-cinzel text-xs">
              {currentVersion.name}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Render Current Version */}
      <CurrentVersionApp />
    </div>
  )
}

export default App