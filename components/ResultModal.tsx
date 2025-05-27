import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Prize } from '../types'

interface ResultModalProps {
  isOpen: boolean;
  prize: Prize | null;
  token: string;
  onClose: () => void;
  onPlayAgain: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ 
  isOpen, 
  prize, 
  token, 
  onClose, 
  onPlayAgain 
}) => {
  if (!isOpen || !prize) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center border border-gray-700">
        <div className="mb-6">
          <div className="text-6xl mb-4">{prize.icon}</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Congratulations!
          </h2>
          <p className="text-lg text-gray-300 mb-1">You won:</p>
          <p className="text-xl font-bold text-white">{prize.name}</p>
          <p className="text-sm text-gray-400 mt-2">{prize.description}</p>
        </div>

        <div className="bg-white p-4 rounded-lg mb-6">
          <QRCodeSVG 
            value={token} 
            size={120}
            className="mx-auto"
          />
          <p className="text-gray-800 mt-2 font-mono text-sm">{token}</p>
        </div>

        <p className="text-sm text-gray-300 mb-6">
          Show this QR code or token at Booth #12 to claim your prize!
        </p>

        <div className="flex space-x-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultModal