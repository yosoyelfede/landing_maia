// Client-side database for static export compatibility
const STORAGE_KEY = 'maia_blog_posts';

// Clean up storage when quota is exceeded
function cleanupStorage() {
  try {
    // Clear all localStorage data except essential items
    const keysToKeep = ['maia_blog_posts']; // Keep only our main data
    const allKeys = Object.keys(localStorage);
    
    for (const key of allKeys) {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    }
    
    // If still having issues, try to reduce our own data size
    const posts = getBlogPosts();
    if (posts.length > 50) { // Keep only last 50 posts
      const trimmedPosts = posts.slice(0, 50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedPosts));
    }
    
    return true;
  } catch (error) {
    console.error('Storage cleanup failed:', error);
    return false;
  }
}

export function getBlogPosts() {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function saveBlogPosts(posts) {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return true;
  } catch (error) {
    console.error('Error saving blog posts:', error);
    
    // If it's a quota error, try to clean up storage
    if (error.name === 'QuotaExceededError' || error.message.includes('quota')) {
      console.log('Storage quota exceeded, attempting cleanup...');
      if (cleanupStorage()) {
        try {
          // Try saving again after cleanup
          localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
          console.log('Successfully saved after cleanup');
          return true;
        } catch (retryError) {
          console.error('Still failed after cleanup:', retryError);
        }
      }
    }
    
    return false;
  }
}

export function getBlogPostBySlug(slug) {
  const posts = getBlogPosts();
  return posts.find(post => post.slug === slug);
}

export function createBlogPost(post) {
  const posts = getBlogPosts();
  const newPost = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  posts.unshift(newPost); // Add to beginning (newest first)
  return saveBlogPosts(posts) ? newPost : null;
}

export function updateBlogPost(slug, updates) {
  const posts = getBlogPosts();
  const index = posts.findIndex(post => post.slug === slug);
  if (index === -1) return null;
  
  posts[index] = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return saveBlogPosts(posts) ? posts[index] : null;
}

export function deleteBlogPost(slug) {
  const posts = getBlogPosts();
  const filteredPosts = posts.filter(post => post.slug !== slug);
  return saveBlogPosts(filteredPosts);
}

// Export data for backup/migration
export function exportBlogData() {
  const posts = getBlogPosts();
  const dataStr = JSON.stringify(posts, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'maia-blog-posts.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Import data from backup
export function importBlogData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const posts = JSON.parse(e.target.result);
        if (Array.isArray(posts)) {
          saveBlogPosts(posts);
          resolve(true);
        } else {
          reject(new Error('Invalid data format'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
