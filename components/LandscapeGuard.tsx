import React, { useState, useEffect } from 'react'

interface LandscapeGuardProps {
  children: React.ReactNode;
}

const LandscapeGuard: React.FC<LandscapeGuardProps> = ({ children }) => {
  const [isLandscape, setIsLandscape] = useState(true)

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }

    checkOrientation()
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)

    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])

  if (!isLandscape) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">📱</div>
          <h2 className="text-2xl font-bold mb-2">Rotate Your Device</h2>
          <p className="text-gray-300">
            This experience is optimized for landscape orientation
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default LandscapeGuard