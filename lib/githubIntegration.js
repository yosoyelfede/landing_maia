/**
 * GitHub Integration Utilities for Enhanced CMS
 * Provides functions to interact with GitHub API for content management
 */

// Check if GitHub integration is available
export function isGitHubEnabled() {
  return process.env.GITHUB_TOKEN && process.env.GITHUB_REPO && process.env.NODE_ENV === 'production'
}

// Get current file SHA for updates
export async function getCurrentFileSha(filePath) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${filePath}`,
      {
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    )

    if (response.status === 404) {
      return null // File doesn't exist yet
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()
    return data.sha
  } catch (error) {
    console.error('Error getting file SHA:', error)
    throw error
  }
}

// Update a file in GitHub repository
export async function updateGitHubFile(filePath, content, message, encoding = 'utf8') {
  try {
    console.log(`🔄 Updating GitHub file: ${filePath}`)
    
    const sha = await getCurrentFileSha(filePath)
    
    const body = {
      message,
      content: Buffer.from(content, encoding).toString('base64'),
    }

    if (sha) {
      body.sha = sha
    }

    const response = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify(body),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`GitHub API error: ${response.status} - ${errorData.message || 'Unknown error'}`)
    }

    const result = await response.json()
    console.log(`✅ GitHub file updated: ${filePath}`)
    return result
  } catch (error) {
    console.error('Error updating GitHub file:', error)
    throw error
  }
}

// Upload image to GitHub repository
export async function uploadImageToGitHub(imageBuffer, filePath, message) {
  try {
    console.log(`🖼️ Uploading image to GitHub: ${filePath}`)
    
    const sha = await getCurrentFileSha(filePath)
    
    const body = {
      message,
      content: imageBuffer.toString('base64'),
    }

    if (sha) {
      body.sha = sha
    }

    const response = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify(body),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`GitHub API error: ${response.status} - ${errorData.message || 'Unknown error'}`)
    }

    const result = await response.json()
    console.log(`✅ Image uploaded to GitHub: ${filePath}`)
    return result
  } catch (error) {
    console.error('Error uploading image to GitHub:', error)
    throw error
  }
}

// Delete a file from GitHub repository
export async function deleteFileFromGitHub(filePath, message) {
  try {
    console.log(`🗑️ Deleting file from GitHub: ${filePath}`)
    
    const sha = await getCurrentFileSha(filePath)
    
    if (!sha) {
      console.log(`📝 File not found in GitHub: ${filePath}`)
      return { success: true, message: 'File not found' }
    }

    const response = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${filePath}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message,
          sha,
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`GitHub API error: ${response.status} - ${errorData.message || 'Unknown error'}`)
    }

    const result = await response.json()
    console.log(`✅ File deleted from GitHub: ${filePath}`)
    return result
  } catch (error) {
    console.error('Error deleting file from GitHub:', error)
    throw error
  }
}

// Update blog posts JSON file in GitHub
export async function updateBlogPostsInGitHub(posts, message) {
  try {
    const filePath = 'public/data/blog-posts.json'
    const content = JSON.stringify(posts, null, 2)
    
    return await updateGitHubFile(filePath, content, message)
  } catch (error) {
    console.error('Error updating blog posts in GitHub:', error)
    throw error
  }
}

// Create blog post data file in GitHub
export async function createBlogPostDataFileInGitHub(slug, content, message) {
  try {
    const filePath = `data/blog-posts/${slug}.js`
    
    return await updateGitHubFile(filePath, content, message)
  } catch (error) {
    console.error('Error creating blog post data file in GitHub:', error)
    throw error
  }
}

// Delete blog post data file from GitHub
export async function deleteBlogPostDataFileFromGitHub(slug, message) {
  try {
    const filePath = `data/blog-posts/${slug}.js`
    
    return await deleteFileFromGitHub(filePath, message)
  } catch (error) {
    console.error('Error deleting blog post data file from GitHub:', error)
    throw error
  }
}

// Upload blog post image to GitHub
export async function uploadBlogPostImageToGitHub(imageBuffer, slug, message) {
  try {
    const filePath = `public/images/blog/${slug}.jpg`
    
    return await uploadImageToGitHub(imageBuffer, filePath, message)
  } catch (error) {
    console.error('Error uploading blog post image to GitHub:', error)
    throw error
  }
}
