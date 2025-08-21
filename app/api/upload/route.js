import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
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
  console.log('📤 Image upload API called')
  
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

    console.log('📷 Processing image upload:', {
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

    // Get file extension from original filename
    const originalExtension = path.extname(file.name).toLowerCase()
    let fileExtension = originalExtension

    // Default to .jpg if no extension or unsupported extension
    if (!fileExtension || !['.jpg', '.jpeg', '.png', '.webp'].includes(fileExtension)) {
      fileExtension = '.jpg'
    }

    // Create filename based on slug
    const filename = `${slug}${fileExtension}`
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'blog')
    const filePath = path.join(uploadDir, filename)

    console.log('💾 Saving image to:', filePath)

    // Ensure the upload directory exists
    try {
      await fs.access(uploadDir)
    } catch {
      console.log('📁 Creating blog images directory')
      await fs.mkdir(uploadDir, { recursive: true })
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Write the file
    await fs.writeFile(filePath, buffer)

    const imageUrl = `/images/blog/${filename}`
    
    console.log('✅ Image uploaded successfully:', imageUrl)

    return addCorsHeaders(NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      filename: filename,
      size: file.size,
      message: 'Image uploaded successfully'
    }))

  } catch (error) {
    console.error('❌ Image upload error:', error)
    return addCorsHeaders(NextResponse.json({ 
      error: 'Failed to upload image',
      details: error.message
    }, { status: 500 }))
  }
}
