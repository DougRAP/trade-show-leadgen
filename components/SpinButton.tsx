import React from 'react'

interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
  spinsRemaining: number;
}

const SpinButton: React.FC<SpinButtonProps> = ({ onClick, disabled, spinsRemaining }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-8 py-4 rounded-full text-lg font-bold transition-all duration-200 ${
          disabled
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse-glow'
        }`}
      >
        {disabled ? 'No Spins Left' : 'SPIN TO WIN!'}
      </button>
      
      <div className="text-center">
        <div className="text-sm text-gray-400">Spins Remaining</div>
        <div className="text-2xl font-bold text-white">{spinsRemaining}</div>
      </div>
    </div>
  )
}

export default SpinButton