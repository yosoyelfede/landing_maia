import { LRUCache } from 'lru-cache'

// Rate limiting cache with 15-minute TTL
const rateLimit = new LRUCache({
  max: 500, // Maximum number of entries
  ttl: 1000 * 60 * 15, // 15 minutes
  updateAgeOnGet: false,
  allowStale: false,
})

export function checkRateLimit(identifier, maxAttempts = 5) {
  if (!identifier) {
    return false
  }
  
  const attempts = rateLimit.get(identifier) || 0
  
  if (attempts >= maxAttempts) {
    return false
  }
  
  rateLimit.set(identifier, attempts + 1)
  return true
}

export function getRemainingAttempts(identifier) {
  const attempts = rateLimit.get(identifier) || 0
  return Math.max(0, 5 - attempts)
}

export function resetRateLimit(identifier) {
  rateLimit.delete(identifier)
}

export function getRateLimitInfo(identifier) {
  const attempts = rateLimit.get(identifier) || 0
  const remaining = Math.max(0, 5 - attempts)
  const isBlocked = attempts >= 5
  
  return {
    attempts,
    remaining,
    isBlocked,
    resetTime: rateLimit.getRemainingTTL(identifier)
  }
}
