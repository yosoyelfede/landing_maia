import { NextResponse } from 'next/server'
import { verifySession } from '../../../lib/session.js'

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
  console.log('📤 Image upload API called - will upload to GitHub')
  
  try {
    // Verify authentication
    const session = await verifySession()
    if (!session) {
      console.log('❌ Unauthorized upload attempt')
      return addCorsHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
    }

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

    console.log('📷 Processing image for GitHub upload:', {
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

    // Get GitHub configuration
    const githubToken = process.env.GITHUB_TOKEN
    const githubRepo = process.env.GITHUB_REPO
    
    if (!githubToken || !githubRepo) {
      console.log('❌ GitHub configuration missing')
      return addCorsHeaders(NextResponse.json({ 
        error: 'GitHub configuration missing' 
      }, { status: 500 }))
    }

    // Determine file extension (force .jpg for consistency)
    const fileExtension = '.jpg'
    const filename = `${slug}${fileExtension}`
    const githubPath = `public/images/blog/${filename}`

    console.log('🐙 Uploading to GitHub:', githubPath)

    // Convert File to base64 for GitHub API
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Content = buffer.toString('base64')

    // Check if file already exists (for updating)
    let currentSha = null
    try {
      const existingFileResponse = await fetch(
        `https://api.github.com/repos/${githubRepo}/contents/${githubPath}`,
        {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      )
      
      if (existingFileResponse.ok) {
        const existingFile = await existingFileResponse.json()
        currentSha = existingFile.sha
        console.log('📄 Found existing file, will update')
      }
    } catch (error) {
      console.log('📄 No existing file found, will create new')
    }

    // Upload to GitHub
    const uploadResponse = await fetch(
      `https://api.github.com/repos/${githubRepo}/contents/${githubPath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: `Add blog image: ${filename}`,
          content: base64Content,
          ...(currentSha && { sha: currentSha })
        })
      }
    )

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json()
      console.error('❌ GitHub image upload error:', errorData)
      return addCorsHeaders(NextResponse.json({ 
        error: 'Failed to upload image to GitHub',
        details: errorData.message
      }, { status: 500 }))
    }

    const result = await uploadResponse.json()
    const imageUrl = `/images/blog/${filename}`
    
    console.log('✅ Image uploaded to GitHub successfully:', imageUrl)

    return addCorsHeaders(NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      filename: filename,
      size: file.size,
      githubCommit: result.commit.sha,
      message: 'Image uploaded to GitHub successfully'
    }))

  } catch (error) {
    console.error('❌ Image upload error:', error)
    return addCorsHeaders(NextResponse.json({ 
      error: 'Failed to upload image',
      details: error.message
    }, { status: 500 }))
  }
}
