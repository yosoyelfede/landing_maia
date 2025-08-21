import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
// import { readAllPosts, getFeatureFlagsStatus, validateConsistency } from '../../../lib/fileBasedCMS'


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
    console.log('📖 Fetching blog posts from JSON file')
    
    // Read posts from JSON file (temporary fallback)
    const jsonFilePath = path.join(process.cwd(), 'public/data/blog-posts.json')
    let allPosts = []
    
    try {
      const jsonContent = await fs.readFile(jsonFilePath, 'utf8')
      const posts = JSON.parse(jsonContent)
      
      allPosts = posts.map(post => ({
        ...post,
        type: 'dynamic',
        id: post.slug || post.title?.toLowerCase().replace(/\s+/g, '-')
      }))
      
      console.log(`✅ Found ${allPosts.length} posts from JSON`)
    } catch (error) {
      console.log('⚠️ No JSON file found or error reading it:', error.message)
    }
    
    console.log(`📊 Returning ${allPosts.length} total posts`)
    
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

// Note: POST method removed - posts are now created via file system through /api/publish
