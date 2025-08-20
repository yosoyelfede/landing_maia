import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data');
const BLOG_POSTS_FILE = path.join(DB_PATH, 'blog-posts.json');

// Ensure data directory exists
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH, { recursive: true });
}

// Initialize blog posts file if it doesn't exist
if (!fs.existsSync(BLOG_POSTS_FILE)) {
  fs.writeFileSync(BLOG_POSTS_FILE, JSON.stringify([], null, 2));
}

export function getBlogPosts() {
  try {
    const data = fs.readFileSync(BLOG_POSTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function saveBlogPosts(posts) {
  try {
    fs.writeFileSync(BLOG_POSTS_FILE, JSON.stringify(posts, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving blog posts:', error);
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
