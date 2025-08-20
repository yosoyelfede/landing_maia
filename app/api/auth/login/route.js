import { NextResponse } from 'next/server'
import { verifyAdminPassword } from '../../../../lib/auth.js'
import { createSession } from '../../../../lib/session.js'
import { checkRateLimit, getRemainingAttempts } from '../../../../lib/rateLimit.js'

export async function POST(request) {
  try {
    const { password } = await request.json()
    
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }
    
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
    
    // Check rate limiting
    if (!checkRateLimit(`login:${ip}`)) {
      const remaining = getRemainingAttempts(`login:${ip}`)
      return NextResponse.json(
        { 
          error: 'Too many login attempts. Please try again later.',
          remainingAttempts: remaining
        },
        { status: 429 }
      )
    }
    
    // Verify admin password
    const isValid = await verifyAdminPassword(password)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
    
    // Create session
    await createSession('admin')
    
    return NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
