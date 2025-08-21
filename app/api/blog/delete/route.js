import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { verifySession } from '../../../../lib/session.js'
import { isGitHubEnabled, deleteBlogPostDataFileFromGitHub } from '../../../../lib/githubIntegration'
// import { dualDeletePost, getFeatureFlagsStatus } from '../../../../lib/fileBasedCMS'

export async function DELETE(request) {
  console.log('🗑️ Delete post API called')
  
  try {
    // Skip authentication for now - you can add it back later
    // const session = await verifySession()
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { slug } = await request.json()
    
    if (!slug) {
      console.log('❌ No slug provided for deletion')
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    console.log('🗑️ Deleting post with slug:', slug)
    console.log('🌐 GitHub integration:', isGitHubEnabled() ? 'Enabled' : 'Disabled')

    // Read current blog posts
    const blogPostsPath = path.join(process.cwd(), 'public', 'data', 'blog-posts.json')
    let blogPosts = []
    
    try {
      const blogData = await fs.readFile(blogPostsPath, 'utf8')
      const parsedData = JSON.parse(blogData)
      blogPosts = Array.isArray(parsedData) ? parsedData : (parsedData.posts || [])
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
    await fs.writeFile(blogPostsPath, JSON.stringify(blogPosts, null, 2))
    console.log('📝 Blog posts file updated after deletion')

    // GitHub integration for production
    let githubResult = null
    if (isGitHubEnabled()) {
      try {
        console.log('🚀 Deleting from GitHub...')
        
        // Delete data file from GitHub
        const message = `Delete blog post: ${postToDelete.title}`
        await deleteBlogPostDataFileFromGitHub(slug, message)
        
        // Note: Images are stored in GitHub repo, not deleted automatically
        // This keeps the image available for potential recovery or reuse
        if (postToDelete.imageUrl) {
          console.log('📷 Image remains in GitHub repo:', postToDelete.imageUrl)
        }
        
        githubResult = { success: true, message: 'Post deleted from GitHub' }
        console.log('✅ Post deleted from GitHub successfully')
      } catch (githubError) {
        console.error('❌ GitHub deletion failed:', githubError)
        githubResult = { success: false, error: githubError.message }
      }
    } else {
      // Note: Images are stored in GitHub repo, not deleted automatically
      // This keeps the image available for potential recovery or reuse
      if (postToDelete.imageUrl) {
        console.log('📷 Image remains in GitHub repo:', postToDelete.imageUrl)
      }
    }

    console.log('✅ Post deleted successfully:', slug)

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully',
      deletedPost: {
        title: postToDelete.title,
        slug: postToDelete.slug
      },
      githubResult
    })

  } catch (error) {
    console.error('❌ Delete post error:', error)
    return NextResponse.json({ 
      error: 'Failed to delete post',
      details: error.message
    }, { status: 500 })
  }
}
