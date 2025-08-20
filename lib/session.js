import { cookies } from 'next/headers'
import CryptoJS from 'crypto-js'

const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback-secret-key-change-in-production'

export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  const sessionData = { userId, expiresAt: expiresAt.toISOString() }
  
  // Encrypt session data
  const encryptedSession = CryptoJS.AES.encrypt(
    JSON.stringify(sessionData), 
    SESSION_SECRET
  ).toString()
  
  const cookieStore = await cookies()
  
  cookieStore.set('session', encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
  
  return sessionData
}

export async function verifySession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  
  if (!session) return null
  
  try {
    // Decrypt session data
    const decrypted = CryptoJS.AES.decrypt(session, SESSION_SECRET).toString(CryptoJS.enc.Utf8)
    const sessionData = JSON.parse(decrypted)
    
    // Check if session has expired
    if (new Date() > new Date(sessionData.expiresAt)) {
      return null
    }
    
    return sessionData
  } catch (error) {
    console.error('Session verification error:', error)
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export async function refreshSession(userId) {
  await destroySession()
  return await createSession(userId)
}
