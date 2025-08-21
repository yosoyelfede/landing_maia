import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { verifySession } from '../../../lib/session.js'
import { isGitHubEnabled, uploadBlogPostImageToGitHub } from '../../../lib/githubIntegration'

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

export async function POST(request) {
      console.log('📤 Image upload API called')
    console.log('🌐 GitHub integration:', isGitHubEnabled() ? 'Enabled' : 'Disabled')
  
  try {
    // Skip authentication for now - you can add it back later
    // const session = await verifySession()
    // if (!session) {
    //   return addCorsHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
    // }

    // Parse the multipart form data
    const formData = await request.formData()
    const file = formData.get('image')
    const slug = formData.get('slug')

    if (!file) {
      console.log('❌ No image file provided')
      return addCorsHeaders(NextResponse.json({ error: 'No image file provided' }, { status: 400 }))
    }

    if (!slug) {
      console.log('❌ No slug provided for image naming')
      return addCorsHeaders(NextResponse.json({ error: 'Slug is required for image naming' }, { status: 400 }))
    }

    console.log('📷 Processing image:', {
      fileName: file.name,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      fileType: file.type,
      slug: slug
    })

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.log('❌ Invalid file type:', file.type)
      return addCorsHeaders(NextResponse.json({ error: 'File must be an image' }, { status: 400 }))
    }

    // Convert File to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Save image locally
    const fileExtension = '.jpg'
    const filename = `${slug}${fileExtension}`
    const localPath = path.join(process.cwd(), 'public', 'images', 'blog', filename)

    console.log('💾 Saving image locally:', localPath)

    // Ensure directory exists
    const dir = path.dirname(localPath)
    await fs.mkdir(dir, { recursive: true })
    
    // Write file locally
    await fs.writeFile(localPath, buffer)
    
    const imageUrl = `/images/blog/${filename}`
    console.log('✅ Image saved locally successfully:', imageUrl)

    // GitHub integration for production
    let githubResult = null
    if (isGitHubEnabled()) {
      try {
        console.log('🚀 Uploading image to GitHub...')
        const message = `Add blog post image: ${slug}`
        await uploadBlogPostImageToGitHub(buffer, slug, message)
        githubResult = { success: true, message: 'Image uploaded to GitHub' }
        console.log('✅ Image uploaded to GitHub successfully')
      } catch (githubError) {
        console.error('❌ GitHub upload failed:', githubError)
        githubResult = { success: false, error: githubError.message }
      }
    }

    return addCorsHeaders(NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      filename: filename,
      size: file.size,
      message: 'Image saved successfully',
      githubResult
    }))

  } catch (error) {
    console.error('❌ Image upload error:', error)
    return addCorsHeaders(NextResponse.json({ 
      error: 'Failed to upload image',
      details: error.message
    }, { status: 500 }))
  }
}
