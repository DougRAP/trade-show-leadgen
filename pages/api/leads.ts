import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'
import { generateToken, validateEmail, validatePhone } from '../../lib/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Create new lead
    const { email, phone, offer } = req.body

    // Validation
    if (!email || !phone || !offer) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ error: 'Invalid phone format' })
    }

    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            email: email.toLowerCase(),
            phone: phone.replace(/\D/g, ''),
            offer,
          }
        ])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        return res.status(500).json({ error: 'Database error' })
      }

      return res.status(201).json({ success: true, lead: data[0] })
    } catch (error) {
      console.error('API error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  if (req.method === 'PUT') {
    // Update lead with prize info
    const { token, prize_level } = req.body

    if (!token || !prize_level) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    try {
      // Find the most recent lead and update with prize info
      const { data, error } = await supabase
        .from('leads')
        .update({
          token,
          prize_level,
        })
        .order('created_at', { ascending: false })
        .limit(1)
        .select()

      if (error) {
        console.error('Supabase error:', error)
        return res.status(500).json({ error: 'Database error' })
      }

      return res.status(200).json({ success: true, lead: data[0] })
    } catch (error) {
      console.error('API error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  res.setHeader('Allow', ['POST', 'PUT'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}