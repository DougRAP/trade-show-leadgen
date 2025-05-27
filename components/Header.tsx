import React from 'react'
import Link from 'next/link'

interface HeaderProps {
  showNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNav = true }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold text-white">TechFlow</div>
          <div className="text-sm text-gray-300">Booth #12</div>
        </div>
        
        {showNav && (
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition-colors">
              Leaderboard
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm transition-colors">
              Ask Questions
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header