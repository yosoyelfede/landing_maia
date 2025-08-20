import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 12 // Recommended for good security/performance balance

export async function hashPassword(password) {
  if (!password || typeof password !== 'string') {
    throw new Error('Invalid password provided')
  }
  
  // Check if password is too long (bcrypt limit is 72 bytes)
  if (Buffer.byteLength(password, 'utf8') > 72) {
    throw new Error('Password too long (maximum 72 bytes)')
  }
  
  return await bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password, hash) {
  if (!password || !hash) {
    return false
  }
  
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}

export async function verifyAdminPassword(inputPassword) {
  const adminPassword = process.env.ADMIN_PASSWORD
  
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable not set')
    return false
  }
  
  // For now, we'll compare directly since we're migrating from plain text
  // In a production system, you'd want to hash the admin password and store it
  return inputPassword === adminPassword
}

export function generateSecurePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let password = ''
  
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return password
}
