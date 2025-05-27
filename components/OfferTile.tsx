import React from 'react'
import { Offer } from '../types'

interface OfferTileProps {
  offer: Offer;
  onClick: (offer: Offer) => void;
}

const OfferTile: React.FC<OfferTileProps> = ({ offer, onClick }) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg p-6 w-72 h-40 flex flex-col justify-between cursor-pointer transform hover:scale-105 transition-transform duration-200 border border-gray-700 hover:border-blue-500"
      onClick={() => onClick(offer)}
    >
      <div>
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
          {offer.headline}
        </h3>
        <p className="text-gray-300 text-sm line-clamp-2">
          {offer.description}
        </p>
      </div>
      
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors w-full mt-3">
        {offer.ctaText}
      </button>
    </div>
  )
}

export default OfferTile