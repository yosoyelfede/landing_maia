import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Add CORS headers helper function
function addCorsHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

// Handle preflight OPTIONS request
export async function OPTIONS(request) {
  return addCorsHeaders(new NextResponse(null, { status: 200 }))
}

export async function GET(request) {
  try {
    console.log('📖 Fetching blog posts for admin CMS')
    
    // Read dynamic posts from JSON file
    const jsonFilePath = path.join(process.cwd(), 'public/data/blog-posts.json')
    let dynamicPosts = []
    
    try {
      const jsonContent = await fs.readFile(jsonFilePath, 'utf8')
      dynamicPosts = JSON.parse(jsonContent)
      console.log(`✅ Found ${dynamicPosts.length} dynamic posts`)
    } catch (error) {
      console.log('⚠️ No dynamic posts file found or error reading it:', error.message)
      dynamicPosts = []
    }
    
    // For now, we'll only return dynamic posts since static posts are handled separately
    // In the future, we could scan the app/blog directory for static posts if needed
    
    const allPosts = dynamicPosts.map(post => ({
      ...post,
      type: 'dynamic', // Mark as dynamic for the admin interface
      id: post.slug || post.title?.toLowerCase().replace(/\s+/g, '-') // Ensure we have an ID
    }))
    
    console.log(`📊 Returning ${allPosts.length} total posts to admin`)
    
    return addCorsHeaders(NextResponse.json({
      success: true,
      posts: allPosts,
      count: allPosts.length
    }))
    
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error)
    return addCorsHeaders(NextResponse.json({ 
      error: 'Failed to fetch blog posts',
      details: error.message
    }, { status: 500 }))
  }
}

// Optional: Handle POST requests for creating posts directly via API
export async function POST(request) {
  try {
    console.log('✏️ Creating new blog post via API')
    
    const body = await request.json()
    console.log('📄 New post data:', { title: body.title, slug: body.slug })
    
    // Read existing posts
    const jsonFilePath = path.join(process.cwd(), 'public/data/blog-posts.json')
    let existingPosts = []
    
    try {
      const jsonContent = await fs.readFile(jsonFilePath, 'utf8')
      existingPosts = JSON.parse(jsonContent)
    } catch (error) {
      console.log('⚠️ No existing posts file, starting fresh')
      existingPosts = []
    }
    
    // Add the new post to the beginning of the array (newest first)
    const newPost = {
      id: body.slug || body.title?.toLowerCase().replace(/\s+/g, '-'),
      title: body.title,
      excerpt: body.excerpt || '',
      content: body.content || '',
      author: body.author || 'Maia',
      slug: body.slug || body.title?.toLowerCase().replace(/\s+/g, '-'),
      language: body.language || 'es',
      date: body.date || new Date().toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      imageUrl: body.imageUrl || '/images/blog/default-placeholder.jpg'
    }
    
    existingPosts.unshift(newPost)
    
    // Write back to file
    await fs.writeFile(jsonFilePath, JSON.stringify(existingPosts, null, 2))
    
    console.log('✅ Post created successfully')
    
    return addCorsHeaders(NextResponse.json({
      success: true,
      message: 'Post created successfully',
      post: newPost
    }))
    
  } catch (error) {
    console.error('❌ Error creating blog post:', error)
    return addCorsHeaders(NextResponse.json({ 
      error: 'Failed to create blog post',
      details: error.message
    }, { status: 500 }))
  }
}
