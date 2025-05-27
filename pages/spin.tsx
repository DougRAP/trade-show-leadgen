import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import OffersCarousel from '../components/OffersCarousel'
import RouletteWheel from '../components/RouletteWheel'
import SpinButton from '../components/SpinButton'
import ResultModal from '../components/ResultModal'
import { SAMPLE_OFFERS } from '../lib/offers'
import { getWeightedRandomPrize } from '../lib/prizes'
import { generateToken } from '../lib/utils'
import { Offer, Prize } from '../types'

const SpinPage: React.FC = () => {
  const router = useRouter()
  const [spinsRemaining, setSpinsRemaining] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [wonPrize, setWonPrize] = useState<Prize | null>(null)
  const [prizeToken, setPrizeToken] = useState('')

  useEffect(() => {
    const spins = parseInt(localStorage.getItem('spinsRemaining') || '0')
    setSpinsRemaining(spins)
    
    if (spins === 0) {
      router.push('/offers')
    }
  }, [router])

  const handleOfferClick = (offer: Offer) => {
    localStorage.setItem('selectedOffer', JSON.stringify(offer))
    router.push(`/signup?offer=${offer.slug}`)
  }

  const handleSpin = async () => {
    if (spinsRemaining <= 0 || isSpinning) return
    
    setIsSpinning(true)
    
    const newSpins = spinsRemaining - 1
    setSpinsRemaining(newSpins)
    localStorage.setItem('spinsRemaining', newSpins.toString())
  }

  const handleSpinComplete = async () => {
    setIsSpinning(false)
    
    const prize = getWeightedRandomPrize()
    const token = generateToken()
    
    try {
      await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          prize_level: prize.level,
        }),
      })
    } catch (error) {
      console.error('Error saving prize result:', error)
    }
    
    setWonPrize(prize)
    setPrizeToken(token)
    setShowResult(true)
  }

  const handlePlayAgain = () => {
    setShowResult(false)
    setWonPrize(null)
    setPrizeToken('')
    
    if (spinsRemaining === 0) {
      router.push('/offers')
    }
  }

  const handleCloseResult = () => {
    setShowResult(false)
    setWonPrize(null)
    setPrizeToken('')
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      
      <div className="h-32 px-4 py-2">
        <OffersCarousel 
          offers={SAMPLE_OFFERS} 
          onOfferClick={handleOfferClick}
          mini={true}
        />
      </div>

      <div className="px-6 py-4 text-center border-b border-gray-700">
        <h2 className="text-lg font-bold text-white mb-2">How to Play</h2>
        <p className="text-sm text-gray-300">
          Spin the wheel to win amazing prizes! Show your winning token at Booth #12 to claim your reward.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl h-96 mb-8">
          <RouletteWheel 
            isSpinning={isSpinning}
            onSpinComplete={handleSpinComplete}
          />
        </div>

        <SpinButton
          onClick={handleSpin}
          disabled={spinsRemaining === 0 || isSpinning}
          spinsRemaining={spinsRemaining}
        />

        {spinsRemaining === 0 && !isSpinning && (
          <div className="mt-4 text-center">
            <p className="text-gray-400 mb-2">Want more spins?</p>
            <button
              onClick={() => router.push('/offers')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              View More Offers
            </button>
          </div>
        )}
      </div>

      <ResultModal
        isOpen={showResult}
        prize={wonPrize}
        token={prizeToken}
        onClose={handleCloseResult}
        onPlayAgain={handlePlayAgain}
      />
    </div>
  )
}

export default SpinPage