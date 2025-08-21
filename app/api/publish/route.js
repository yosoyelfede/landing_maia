 import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { verifySession } from '../../../lib/session.js'
import { sanitizeInput, validateInput } from '../../../lib/validation.js'
import { dualWritePosts, getFeatureFlagsStatus, CMS_FEATURE_FLAGS } from '../../../lib/fileBasedCMS'
import { 
  isGitHubEnabled, 
  updateBlogPostsInGitHub, 
  createBlogPostDataFileInGitHub,
  uploadBlogPostImageToGitHub 
} from '../../../lib/githubIntegration'
import { generateBlogPostDataFile } from '../../../lib/blogPostTemplate'


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
  
  try {
    // Skip authentication for now - you can add it back later
    // const session = await verifySession()
    // if (!session) {
    //   return addCorsHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
    // }
    
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
    
    console.log('=== Enhanced CMS: Dual Write Mode ===')
    console.log('🏗️ Feature flags:', getFeatureFlagsStatus())
    console.log('🌐 GitHub integration:', isGitHubEnabled() ? 'Enabled' : 'Disabled')
    
    try {
      // Use dual write functionality for hybrid CMS approach
      const writeResults = await dualWritePosts(validatedPosts)
      
      console.log('📊 Local write results:', writeResults)
      
      // GitHub integration for production
      let githubResults = null
      if (isGitHubEnabled()) {
        try {
          console.log('🚀 Publishing to GitHub...')
          
          // Update JSON file in GitHub
          const jsonMessage = `Update blog posts: ${validatedPosts.map(p => p.title).join(', ')}`
          await updateBlogPostsInGitHub(writeResults.json.posts || [], jsonMessage)
          
          // Create data files in GitHub for new posts
          const githubFileResults = []
          for (const post of validatedPosts) {
            if (writeResults.files.created.includes(post.slug)) {
              const dataFileContent = await generateBlogPostDataFile(post)
              const fileMessage = `Add blog post: ${post.title}`
              await createBlogPostDataFileInGitHub(post.slug, dataFileContent, fileMessage)
              githubFileResults.push(post.slug)
            }
          }
          
          githubResults = {
            success: true,
            jsonUpdated: true,
            filesCreated: githubFileResults,
            message: 'Successfully published to GitHub'
          }
          
          console.log('✅ GitHub integration successful')
        } catch (githubError) {
          console.error('❌ GitHub integration failed:', githubError)
          githubResults = {
            success: false,
            error: githubError.message
          }
        }
      }
      
      // Determine overall success
      const localSuccess = writeResults.json.success || writeResults.files.success
      const githubSuccess = !isGitHubEnabled() || (githubResults && githubResults.success)
      const overallSuccess = localSuccess && githubSuccess
      
      if (!overallSuccess) {
        throw new Error(`Write operations failed. Local: ${!localSuccess ? 'failed' : 'success'}, GitHub: ${!githubSuccess ? 'failed' : 'success'}`)
      }
      
      // Build response message
      const messages = []
      if (writeResults.json.success) {
        messages.push('JSON updated')
      }
      if (writeResults.files.success) {
        messages.push(`${writeResults.files.created.length} files created`)
      }
      if (githubResults && githubResults.success) {
        messages.push('GitHub updated')
      }
      
      const warnings = []
      if (!writeResults.json.success) {
        warnings.push(`JSON write failed: ${writeResults.json.error}`)
      }
      if (!writeResults.files.success && CMS_FEATURE_FLAGS.FILE_BASED_WRITE) {
        warnings.push(`File write failed: ${writeResults.files.error}`)
      }
      if (githubResults && !githubResults.success) {
        warnings.push(`GitHub update failed: ${githubResults.error}`)
      }
      
      return addCorsHeaders(NextResponse.json({
        success: true,
        message: `Blog posts published successfully (${messages.join(', ')})`,
        postsCount: validatedPosts.length,
        writeResults,
        githubResults,
        warnings: warnings.length > 0 ? warnings : undefined,
        featureFlags: getFeatureFlagsStatus(),
        environment: process.env.NODE_ENV
      }))
    } catch (error) {
      console.error('=== Enhanced CMS write failed ===', error)
      return addCorsHeaders(NextResponse.json({
        success: false,
        message: `Failed to save posts: ${error.message}`,
        featureFlags: getFeatureFlagsStatus()
      }, { status: 500 }))
    }
    
  } catch (error) {
    console.error('=== Publishing error ===', error)
    return addCorsHeaders(NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 }))
  }
}
