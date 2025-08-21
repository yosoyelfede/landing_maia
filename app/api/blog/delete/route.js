import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { verifySession } from '../../../../lib/session.js'

export async function DELETE(request) {
  console.log('🗑️ Delete post API called')
  
  try {
    // Verify authentication
    const session = await verifySession()
    if (!session) {
      console.log('❌ Unauthorized delete attempt')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug } = await request.json()
    
    if (!slug) {
      console.log('❌ No slug provided for deletion')
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    console.log('🗑️ Deleting post with slug:', slug)

    // Read current blog posts
    const blogPostsPath = path.join(process.cwd(), 'public', 'data', 'blog-posts.json')
    let blogPosts = []
    
    try {
      const blogData = await fs.readFile(blogPostsPath, 'utf8')
      const parsedData = JSON.parse(blogData)
      blogPosts = parsedData.posts || []
    } catch (error) {
      console.log('📄 No existing blog posts file, nothing to delete')
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Find the post to delete
    const postIndex = blogPosts.findIndex(post => post.slug === slug)
    if (postIndex === -1) {
      console.log('❌ Post not found:', slug)
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const postToDelete = blogPosts[postIndex]
    console.log('🎯 Found post to delete:', postToDelete.title)

    // Remove the post from the array
    blogPosts.splice(postIndex, 1)

    // Write updated blog posts back to file
    const updatedData = {
      posts: blogPosts,
      lastUpdated: new Date().toISOString()
    }

    await fs.writeFile(blogPostsPath, JSON.stringify(updatedData, null, 2))
    console.log('📝 Blog posts file updated after deletion')

    // Try to delete the associated image file if it exists
    if (postToDelete.imageUrl) {
      try {
        const imagePath = path.join(process.cwd(), 'public', postToDelete.imageUrl)
        await fs.unlink(imagePath)
        console.log('🖼️ Associated image deleted:', postToDelete.imageUrl)
      } catch (imageError) {
        console.log('⚠️ Could not delete associated image (may not exist):', imageError.message)
        // Don't fail the whole operation if image deletion fails
      }
    }

    console.log('✅ Post deleted successfully:', slug)

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully',
      deletedPost: {
        title: postToDelete.title,
        slug: postToDelete.slug
      }
    })

  } catch (error) {
    console.error('❌ Delete post error:', error)
    return NextResponse.json({ 
      error: 'Failed to delete post',
      details: error.message
    }, { status: 500 })
  }
}
