import { NextResponse } from 'next/server'
import { verifySession } from '../../../../lib/session.js'

export async function GET() {
  try {
    const session = await verifySession()
    
    if (!session) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }
    
    return NextResponse.json(
      { 
        authenticated: true,
        userId: session.userId,
        expiresAt: session.expiresAt
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Session verification error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    )
  }
}
