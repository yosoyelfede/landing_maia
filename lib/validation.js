import DOMPurify from 'isomorphic-dompurify'

export function sanitizeInput(data) {
  if (!data || typeof data !== 'object') {
    return {}
  }
  
  // Preserve key blog metadata so the landing page cards render correctly
  const sanitized = {
    title: DOMPurify.sanitize(data.title?.trim() || ''),
    content: DOMPurify.sanitize(data.content || ''),
    excerpt: DOMPurify.sanitize(data.excerpt?.trim() || ''),
    author: DOMPurify.sanitize(data.author?.trim() || ''),
    slug: data.slug?.toLowerCase().replace(/[^a-z0-9-]/g, '-') || '',
    imageUrl: DOMPurify.sanitize((data.imageUrl || data.image || '').toString().trim()),
    language: DOMPurify.sanitize((data.language || 'es').toString().trim()),
    date: DOMPurify.sanitize((data.date || '').toString().trim()),
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  // Keep an id if one already exists to avoid churn when diffing
  if (data.id) {
    sanitized.id = data.id
  }

  return sanitized
}

export function validateInput(data) {
  console.log('🔍 VALIDATION DEBUG: Starting validation for:', data.title)
  console.log('🔍 VALIDATION DEBUG: Raw data:', {
    title: data.title,
    content: data.content,
    excerpt: data.excerpt,
    author: data.author,
    imageUrl: data.imageUrl
  })
  
  const errors = []
  
  if (!data.title || data.title.length < 3) {
    errors.push('Title must be at least 3 characters')
  }
  
  if (data.title && data.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }
  
  // Strip HTML tags to check actual text content length
  const textContent = data.content ? data.content.replace(/<[^>]*>/g, '').trim() : '';
  console.log('🔍 VALIDATION DEBUG: Content analysis:', {
    originalContent: data.content,
    originalContentLength: data.content ? data.content.length : 0,
    textContent: textContent,
    textContentLength: textContent.length,
    hasTextContent: !!textContent,
    meetsMinimumLength: textContent.length >= 10
  })
  
  if (!textContent || textContent.length < 10) {
    errors.push('Content must be at least 10 characters')
  }
  
  if (data.content && data.content.length > 50000) {
    errors.push('Content must be less than 50,000 characters')
  }
  
  if (data.excerpt && data.excerpt.length > 500) {
    errors.push('Excerpt must be less than 500 characters')
  }
  
  // Only require imageUrl for posts that don't already have an image field
  // (to maintain backward compatibility with existing posts)
  // Allow null imageUrl for posts where image was too large and removed
  const hasImageUrl = data.imageUrl && data.imageUrl.trim() !== '';
  const hasImage = data.image && data.image.trim() !== '';
  
  if (!hasImageUrl && !hasImage && data.imageUrl !== null) {
    errors.push('A featured image is required for all blog posts')
  }
  
  return errors
}

export function sanitizeSlug(slug) {
  if (!slug) return ''
  
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function validatePassword(password) {
  const errors = []
  
  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (password && password.length > 72) {
    errors.push('Password must be less than 72 characters')
  }
  
  if (password && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (password && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (password && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return errors
}

export function sanitizeHtml(html) {
  if (!html || typeof html !== 'string') {
    return ''
  }
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target'],
    ALLOW_DATA_ATTR: false
  })
}
