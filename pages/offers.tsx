import React from 'react'
import { useRouter } from 'next/router'
import { Offer } from '../types'
import OffersCarousel from '../components/OffersCarousel'
import { SAMPLE_OFFERS } from '../lib/offers'

const OffersPage: React.FC = () => {
  const router = useRouter()

  const handleOfferClick = (offer: Offer) => {
    // Store selected offer and redirect to signup
    localStorage.setItem('selectedOffer', JSON.stringify(offer))
    router.push(`/signup?offer=${offer.slug}`)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Exclusive Trade Show Offers
          </h1>
          <p className="text-xl text-gray-300">
            Click any offer to learn more and spin to win amazing prizes!
          </p>
        </div>

        <div className="flex justify-center">
          <OffersCarousel 
            offers={SAMPLE_OFFERS} 
            onOfferClick={handleOfferClick}
          />
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400">
            Visit us at <span className="font-bold text-white">Booth #12</span> for more information
          </p>
        </div>
      </div>
    </div>
  )
}

export default OffersPage