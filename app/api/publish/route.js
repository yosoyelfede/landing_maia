import { NextResponse } from 'next/server'
import { verifySession } from '../../../lib/session.js'
import { sanitizeInput, validateInput } from '../../../lib/validation.js'

// Add CORS headers helper function
function addCorsHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

// Handle preflight OPTIONS request
export async function OPTIONS(request) {
  console.log('=== OPTIONS request received ===')
  return addCorsHeaders(new NextResponse(null, { status: 200 }))
}

export async function POST(request) {
  console.log('🔍 API DEBUG: POST request received to /api/publish')
  console.log('🔍 API DEBUG: Request origin:', request.headers.get('origin'))
  console.log('🔍 API DEBUG: Request method:', request.method)
  console.log('🔍 API DEBUG: Request headers:', Object.fromEntries(request.headers.entries()))
  
  try {
    // Verify authentication
    console.log('=== Verifying session ===')
    const session = await verifySession()
    console.log('Session result:', session ? 'valid' : 'invalid')
    
    if (!session) {
      console.log('=== Authentication failed ===')
      return addCorsHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
    }
    
    console.log('🔍 API DEBUG: Parsing request body')
    const body = await request.json()
    console.log('🔍 API DEBUG: Body keys:', Object.keys(body))
    console.log('🔍 API DEBUG: Full body:', JSON.stringify(body, null, 2))
    
    // Validate input
    if (!body.posts || !Array.isArray(body.posts)) {
      console.log('=== Invalid posts data ===')
      return addCorsHeaders(NextResponse.json({ error: 'Invalid posts data' }, { status: 400 }))
    }
    
    console.log('🔍 API DEBUG: Validating and sanitizing posts')
    // Validate and sanitize each post
    const validatedPosts = []
    for (const post of body.posts) {
      console.log('🔍 API DEBUG: Processing post:', post.title)
      console.log('🔍 API DEBUG: Post content field:', {
        hasContent: !!post.content,
        contentType: typeof post.content,
        contentLength: post.content ? post.content.length : 0,
        contentPreview: post.content ? post.content.substring(0, 100) + '...' : 'NO CONTENT'
      })
      const errors = validateInput(post)
      if (errors.length > 0) {
        console.log('=== Validation errors for post ===', post.title, errors)
        console.log('=== Post data ===', JSON.stringify(post, null, 2))
    console.log('=== Content length check ===', {
      content: post.content,
      contentLength: post.content ? post.content.length : 0,
      textContent: post.content ? post.content.replace(/<[^>]*>/g, '').trim() : '',
      textContentLength: post.content ? post.content.replace(/<[^>]*>/g, '').trim().length : 0
    })
        return addCorsHeaders(NextResponse.json({ 
          error: 'Validation failed', 
          details: errors,
          postTitle: post.title
        }, { status: 400 }))
      }
      
      const sanitizedPost = sanitizeInput(post)
      validatedPosts.push(sanitizedPost)
    }
    
    console.log('=== Getting GitHub configuration ===')
    // Get GitHub configuration
    const githubToken = process.env.GITHUB_TOKEN
    const githubRepo = process.env.GITHUB_REPO
    
    if (!githubToken || !githubRepo) {
      console.log('=== GitHub configuration missing ===')
      return addCorsHeaders(NextResponse.json({ 
        error: 'GitHub configuration missing' 
      }, { status: 500 }))
    }
    
    console.log('=== Getting current file SHA ===')
    // Get current file SHA (required for GitHub API)
    const currentFileResponse = await fetch(
      `https://api.github.com/repos/${githubRepo}/contents/public/data/blog-posts.json`,
      {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    )
    
    let currentSha = null
    if (currentFileResponse.ok) {
      const currentFile = await currentFileResponse.json()
      currentSha = currentFile.sha
      console.log('Current SHA:', currentSha)
    } else {
      console.log('No existing file found, will create new one')
    }
    
    console.log('=== Preparing content for GitHub ===')
    // Prepare the content for GitHub
    const content = JSON.stringify(validatedPosts, null, 2)
    const contentBase64 = Buffer.from(content).toString('base64')
    
    console.log('=== Updating file on GitHub ===')
    // Update the file on GitHub
    const updateResponse = await fetch(
      `https://api.github.com/repos/${githubRepo}/contents/public/data/blog-posts.json`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: `Update blog posts - ${new Date().toISOString()}`,
          content: contentBase64,
          sha: currentSha
        })
      }
    )
    
    if (!updateResponse.ok) {
      const errorData = await updateResponse.json()
      console.error('=== GitHub API error ===', errorData)
      return addCorsHeaders(NextResponse.json({ 
        error: 'Failed to update GitHub repository' 
      }, { status: 500 }))
    }
    
    console.log('=== GitHub update successful ===')
    const result = await updateResponse.json()
    
    console.log('=== Returning success response ===')
    return addCorsHeaders(NextResponse.json({
      success: true,
      message: 'Blog posts published successfully',
      commit: result.commit.sha,
      postsCount: validatedPosts.length
    }))
    
  } catch (error) {
    console.error('=== Publishing error ===', error)
    return addCorsHeaders(NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 }))
  }
}
