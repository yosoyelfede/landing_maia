/**
 * File-Based CMS Utilities
 * Enhanced CMS Phase 2: Hybrid Mode Implementation
 */

import { promises as fs } from 'fs'
import path from 'path'
import { generateBlogPostDataFile } from './blogPostTemplate.js'

// Feature flags for gradual rollout
export const CMS_FEATURE_FLAGS = {
  FILE_BASED_WRITE: process.env.CMS_FILE_BASED_WRITE === 'true' || process.env.NODE_ENV === 'development',
  FILE_BASED_READ: process.env.CMS_FILE_BASED_READ === 'true' || false,
  DUAL_WRITE: process.env.CMS_DUAL_WRITE === 'true' || true, // Enable dual write by default
  JSON_FALLBACK: process.env.CMS_JSON_FALLBACK === 'true' || true, // Always enable fallback
  VALIDATE_FILE_CONSISTENCY: process.env.CMS_VALIDATE_CONSISTENCY === 'true' || process.env.NODE_ENV === 'development'
}

// Paths configuration
export const CMS_PATHS = {
  BLOG_POSTS_DIR: path.join(process.cwd(), 'app', 'blog'),
  BLOG_DATA_DIR: path.join(process.cwd(), 'data', 'blog-posts'),
  JSON_FILE: path.join(process.cwd(), 'public', 'data', 'blog-posts.json'),
  BACKUP_DIR: path.join(process.cwd(), 'data', 'backups')
}

/**
 * Ensure directories exist
 */
export async function ensureDirectoriesExist() {
  const dirs = [
    CMS_PATHS.BLOG_DATA_DIR,
    CMS_PATHS.BACKUP_DIR,
    path.dirname(CMS_PATHS.JSON_FILE)
  ]
  
  for (const dir of dirs) {
    try {
      await fs.mkdir(dir, { recursive: true })
    } catch (error) {
      console.warn(`Failed to create directory ${dir}:`, error.message)
    }
  }
}

/**
 * Create backup of current data
 */
export async function createBackup(data, type = 'json') {
  try {
    await ensureDirectoriesExist()
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupFile = path.join(CMS_PATHS.BACKUP_DIR, `${type}-backup-${timestamp}.json`)
    
    await fs.writeFile(backupFile, JSON.stringify(data, null, 2))
    console.log(`✅ Backup created: ${backupFile}`)
    return backupFile
  } catch (error) {
    console.error('❌ Failed to create backup:', error)
    throw error
  }
}

/**
 * Write blog post as data file
 */
export async function writeBlogPostFile(postData) {
  try {
    if (!CMS_FEATURE_FLAGS.FILE_BASED_WRITE) {
      console.log('📝 File-based write disabled by feature flag')
      return null
    }

    await ensureDirectoriesExist()
    
    const { slug } = postData
    if (!slug) {
      throw new Error('Slug is required for file creation')
    }
    
    // Generate the data file content
    const fileContent = generateBlogPostDataFile(postData)
    
    // Create the file path
    const fileName = `${slug}.js`
    const filePath = path.join(CMS_PATHS.BLOG_DATA_DIR, fileName)
    
    // Write the file atomically (temp file -> rename)
    const tempPath = `${filePath}.tmp`
    await fs.writeFile(tempPath, fileContent, 'utf8')
    await fs.rename(tempPath, filePath)
    
    console.log(`✅ Blog post data file created: ${filePath}`)
    return filePath
  } catch (error) {
    console.error('❌ Failed to write blog post file:', error)
    throw error
  }
}

/**
 * Delete blog post file
 */
export async function deleteBlogPostFile(slug) {
  try {
    if (!slug) {
      throw new Error('Slug is required for file deletion')
    }
    
    const fileName = `${slug}.js`
    const filePath = path.join(CMS_PATHS.BLOG_DATA_DIR, fileName)
    
    try {
      await fs.unlink(filePath)
      console.log(`✅ Blog post file deleted: ${filePath}`)
      return true
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`📝 File not found (already deleted): ${filePath}`)
        return false
      }
      throw error
    }
  } catch (error) {
    console.error('❌ Failed to delete blog post file:', error)
    throw error
  }
}

/**
 * Read blog post from file
 */
export async function readBlogPostFile(slug) {
  try {
    const fileName = `${slug}.js`
    const filePath = path.join(CMS_PATHS.BLOG_DATA_DIR, fileName)
    
    // Dynamic import to get the post data
    const postModule = await import(filePath)
    const postData = postModule.default || postModule.postData
    
    if (!postData) {
      throw new Error('Invalid post file: no post data found')
    }
    
    return postData
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'MODULE_NOT_FOUND') {
      return null // File doesn't exist
    }
    console.error(`❌ Failed to read blog post file for slug "${slug}":`, error)
    throw error
  }
}

/**
 * Scan all blog post files and extract metadata
 */
export async function scanBlogPostFiles() {
  try {
    if (!CMS_FEATURE_FLAGS.FILE_BASED_READ) {
      console.log('📝 File-based read disabled by feature flag')
      return []
    }

    await ensureDirectoriesExist()
    
    const files = await fs.readdir(CMS_PATHS.BLOG_DATA_DIR)
    const jsFiles = files.filter(file => file.endsWith('.js'))
    
    const posts = []
    
    for (const file of jsFiles) {
      try {
        const slug = path.basename(file, '.js')
        const postData = await readBlogPostFile(slug)
        
        if (postData) {
          posts.push(postData)
        }
      } catch (error) {
        console.warn(`⚠️ Failed to read post file ${file}:`, error.message)
      }
    }
    
    // Sort by creation date (newest first)
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    console.log(`📚 Scanned ${posts.length} blog post files`)
    return posts
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('📝 Blog data directory not found, returning empty array')
      return []
    }
    console.error('❌ Failed to scan blog post files:', error)
    throw error
  }
}

/**
 * Read posts from JSON file (fallback)
 */
export async function readJSONPosts() {
  try {
    const content = await fs.readFile(CMS_PATHS.JSON_FILE, 'utf8')
    const posts = JSON.parse(content)
    return Array.isArray(posts) ? posts : []
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('📝 JSON file not found, returning empty array')
      return []
    }
    console.error('❌ Failed to read JSON posts:', error)
    throw error
  }
}

/**
 * Unified posts reader (files + JSON fallback)
 */
export async function readAllPosts() {
  try {
    let posts = []
    
    // Try to read from files first
    if (CMS_FEATURE_FLAGS.FILE_BASED_READ) {
      try {
        const filePosts = await scanBlogPostFiles()
        posts = [...filePosts]
        console.log(`📁 Found ${filePosts.length} posts from files`)
      } catch (error) {
        console.warn('⚠️ Failed to read from files, falling back to JSON:', error.message)
      }
    }
    
    // Fallback to JSON if enabled or if no file posts found
    if ((CMS_FEATURE_FLAGS.JSON_FALLBACK && posts.length === 0) || !CMS_FEATURE_FLAGS.FILE_BASED_READ) {
      try {
        const jsonPosts = await readJSONPosts()
        posts = [...posts, ...jsonPosts]
        console.log(`📄 Found ${jsonPosts.length} posts from JSON`)
      } catch (error) {
        console.warn('⚠️ Failed to read JSON posts:', error.message)
      }
    }
    
    // Remove duplicates (prefer file-based over JSON)
    const seenSlugs = new Set()
    const uniquePosts = posts.filter(post => {
      if (seenSlugs.has(post.slug)) {
        return false
      }
      seenSlugs.add(post.slug)
      return true
    })
    
    // Sort by publication date (newest first)
    uniquePosts.sort((a, b) => {
      const dateA = new Date(a.publishedTime || a.createdAt)
      const dateB = new Date(b.publishedTime || b.createdAt)
      return dateB - dateA
    })
    
    console.log(`📚 Total unique posts: ${uniquePosts.length}`)
    return uniquePosts
  } catch (error) {
    console.error('❌ Failed to read all posts:', error)
    return []
  }
}

/**
 * Dual write operation (JSON + files)
 */
export async function dualWritePosts(posts) {
  const results = {
    json: { success: false, error: null },
    files: { success: false, error: null, created: [] }
  }
  
  // Always write to JSON (for backward compatibility)
  try {
    await ensureDirectoriesExist()
    
    // Create backup first
    const existingPosts = await readJSONPosts()
    if (existingPosts.length > 0) {
      await createBackup(existingPosts, 'json')
    }
    
    // Read existing posts and merge
    const updatedPosts = [...posts, ...existingPosts.filter(existing => 
      !posts.some(newPost => newPost.slug === existing.slug)
    )]
    
    await fs.writeFile(CMS_PATHS.JSON_FILE, JSON.stringify(updatedPosts, null, 2))
    results.json.success = true
    console.log('✅ JSON write successful')
  } catch (error) {
    results.json.error = error.message
    console.error('❌ JSON write failed:', error)
  }
  
  // Write to files if enabled
  if (CMS_FEATURE_FLAGS.FILE_BASED_WRITE || CMS_FEATURE_FLAGS.DUAL_WRITE) {
    for (const post of posts) {
      try {
        const filePath = await writeBlogPostFile(post)
        if (filePath) {
          results.files.created.push(filePath)
        }
      } catch (error) {
        results.files.error = error.message
        console.error(`❌ Failed to write file for post "${post.slug}":`, error)
      }
    }
    results.files.success = results.files.created.length > 0
  }
  
  return results
}

/**
 * Dual delete operation (JSON + files)
 */
export async function dualDeletePost(slug) {
  const results = {
    json: { success: false, error: null },
    files: { success: false, error: null }
  }
  
  // Delete from JSON
  try {
    const existingPosts = await readJSONPosts()
    const filteredPosts = existingPosts.filter(post => post.slug !== slug)
    
    if (filteredPosts.length !== existingPosts.length) {
      // Create backup first
      await createBackup(existingPosts, 'json')
      
      await fs.writeFile(CMS_PATHS.JSON_FILE, JSON.stringify(filteredPosts, null, 2))
      results.json.success = true
      console.log('✅ JSON delete successful')
    } else {
      console.log('📝 Post not found in JSON file')
      results.json.success = true // Not an error if not found
    }
  } catch (error) {
    results.json.error = error.message
    console.error('❌ JSON delete failed:', error)
  }
  
  // Delete file
  try {
    const fileDeleted = await deleteBlogPostFile(slug)
    results.files.success = true
    console.log(fileDeleted ? '✅ File delete successful' : '📝 File not found (ok)')
  } catch (error) {
    results.files.error = error.message
    console.error('❌ File delete failed:', error)
  }
  
  return results
}

/**
 * Validate consistency between JSON and files
 */
export async function validateConsistency() {
  if (!CMS_FEATURE_FLAGS.VALIDATE_FILE_CONSISTENCY) {
    return { consistent: true, message: 'Validation disabled' }
  }
  
  try {
    const jsonPosts = await readJSONPosts()
    const filePosts = await scanBlogPostFiles()
    
    const jsonSlugs = new Set(jsonPosts.map(p => p.slug))
    const fileSlugs = new Set(filePosts.map(p => p.slug))
    
    const inJsonNotFile = [...jsonSlugs].filter(slug => !fileSlugs.has(slug))
    const inFileNotJson = [...fileSlugs].filter(slug => !jsonSlugs.has(slug))
    
    const consistent = inJsonNotFile.length === 0 && inFileNotJson.length === 0
    
    const report = {
      consistent,
      jsonCount: jsonPosts.length,
      fileCount: filePosts.length,
      inJsonNotFile,
      inFileNotJson
    }
    
    if (!consistent) {
      console.warn('⚠️ Consistency check failed:', report)
    } else {
      console.log('✅ JSON and file data are consistent')
    }
    
    return report
  } catch (error) {
    console.error('❌ Failed to validate consistency:', error)
    return { consistent: false, error: error.message }
  }
}

/**
 * Get feature flags status
 */
export function getFeatureFlagsStatus() {
  return {
    ...CMS_FEATURE_FLAGS,
    timestamp: new Date().toISOString()
  }
}
