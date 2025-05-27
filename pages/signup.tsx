import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { validateEmail, validatePhone, formatPhone } from '../lib/utils'
import { Offer } from '../types'

const SignupPage: React.FC = () => {
  const router = useRouter()
  const { offer: offerSlug } = router.query
  
  const [offer, setOffer] = useState<Offer | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Get offer from localStorage or redirect
    const storedOffer = localStorage.getItem('selectedOffer')
    if (storedOffer) {
      setOffer(JSON.parse(storedOffer))
    } else if (offerSlug) {
      // Fallback - find offer by slug
      import('../lib/offers').then(({ SAMPLE_OFFERS }) => {
        const foundOffer = SAMPLE_OFFERS.find(o => o.slug === offerSlug)
        if (foundOffer) setOffer(foundOffer)
      })
    } else {
      router.push('/offers')
    }
  }, [offerSlug, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'phone' ? formatPhone(value) : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm() || !offer) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          offer: offer.slug,
        }),
      })
      
      if (response.ok) {
        // Give user a spin token
        const currentSpins = parseInt(localStorage.getItem('spinsRemaining') || '0')
        localStorage.setItem('spinsRemaining', (currentSpins + 1).toString())
        
        // Redirect to spin page
        router.push('/spin')
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!offer) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full border border-gray-700">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            Get Your Free Spin!
          </h1>
          <p className="text-gray-300 text-sm">
            You're interested in: <span className="font-bold text-white">{offer.title}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="(555) 123-4567"
              required
            />
            {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
          </div>

          {errors.submit && (
            <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Get My Free Spin!'}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          By signing up, you agree to receive information about our products and services.
        </p>
      </div>
    </div>
  )
}

export default SignupPage