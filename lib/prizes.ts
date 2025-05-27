import { Prize } from '../types'

export const PRIZES: Prize[] = [
  {
    id: 0,
    level: 1,
    name: "Premium Consultation",
    description: "1-hour strategy session with our experts",
    icon: "💎",
    color: "#8B5CF6",
    weight: 2
  },
  {
    id: 1,
    level: 2,
    name: "Software License",
    description: "3-month free premium software access",
    icon: "🎯",
    color: "#10B981",
    weight: 13
  },
  {
    id: 2,
    level: 3,
    name: "Gift Card",
    description: "$50 Amazon gift card",
    icon: "🎁",
    color: "#F59E0B",
    weight: 25
  },
  {
    id: 3,
    level: 4,
    name: "Branded Swag",
    description: "Premium branded merchandise package",
    icon: "👕",
    color: "#EF4444",
    weight: 35
  },
  {
    id: 4,
    level: 5,
    name: "Digital Guide",
    description: "Comprehensive industry guide PDF",
    icon: "📚",
    color: "#3B82F6",
    weight: 25
  }
]

export const getWeightedRandomPrize = (): Prize => {
  const totalWeight = PRIZES.reduce((sum, prize) => sum + prize.weight, 0)
  let random = Math.random() * totalWeight
  
  for (const prize of PRIZES) {
    random -= prize.weight
    if (random <= 0) {
      return prize
    }
  }
  
  return PRIZES[PRIZES.length - 1] // fallback
}