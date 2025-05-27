import type { NextApiRequest, NextApiResponse } from 'next'
import { getWeightedRandomPrize } from '../../lib/prizes'
import { generateToken } from '../../lib/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    // Generate a secure, server-side spin result
    const prize = getWeightedRandomPrize()
    const token = generateToken()

    console.log(`Spin result: Prize Level ${prize.level}, Token: ${token}`)

    return res.status(200).json({
      prize,
      token,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Spin API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}