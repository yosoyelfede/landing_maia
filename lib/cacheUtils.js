// Cache busting utilities for blog posts

// Generate a cache-busting URL for blog posts
export const getCacheBustedUrl = (baseUrl) => {
  const timestamp = Date.now();
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}t=${timestamp}&v=${timestamp}`;
};

// Fetch with cache busting
export const fetchWithCacheBusting = async (url) => {
  const cacheBustedUrl = getCacheBustedUrl(url);
  return fetch(cacheBustedUrl);
};

// Get blog posts with cache busting
export const fetchBlogPosts = async () => {
  try {
    const response = await fetchWithCacheBusting('/data/blog-posts.json');
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`HTTP ${response.status}`);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};
