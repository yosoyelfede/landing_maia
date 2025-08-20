'use client';

import { useState, useEffect } from 'react';
import RichTextEditor from '../../components/RichTextEditor';
import { sortPostsByDate, parseDate } from '../../lib/dateUtils';
import imageCompression from 'browser-image-compression';

export default function SimpleAdminDashboard() {
  // Force cache refresh - timestamp: 2025-08-14 13:30:00
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editorMode, setEditorMode] = useState('rich'); // 'rich' or 'code'
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    imageUrl: '',
    slug: '',
    language: 'es'
  });
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    // Check if user is authenticated using server-side session
    checkAuthentication();
    loadPosts();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
    }
  };

  const loadPosts = async () => {
    try {
      const { getBlogPosts } = await import('../../lib/clientDb');
      const posts = getBlogPosts();
      
      if (posts.length === 0) {
        setPosts([]);
        return;
      }
      
      // Sort posts by date (newest first) for consistent display
      const sortedPosts = sortPostsByDate(posts, true);
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        const data = await response.json();
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🔍 FORM DEBUG: Form submission data:', formData);
    
    // Validate that an image is provided
    if (!formData.imageUrl) {
      alert('Please upload a featured image for the blog post.');
      return;
    }
    
    // Validate that content is provided
    const textContent = formData.content ? formData.content.replace(/<[^>]*>/g, '').trim() : '';
    if (!textContent || textContent.length < 10) {
      alert('Please add content to your blog post. Content must be at least 10 characters.');
      return;
    }
    
    try {
      const { createBlogPost, updateBlogPost } = await import('../../lib/clientDb');
      
      let finalFormData = { ...formData };
      
      // If in code mode, extract metadata from the component code
      if (editorMode === 'code' && formData.content) {
        console.log('🔧 FORM SUBMIT DEBUG: Extracting metadata from code mode...');
        const extractedMetadata = extractMetadataFromCode(formData.content);
        if (extractedMetadata) {
          console.log('🔧 FORM SUBMIT DEBUG: Extracted metadata:', extractedMetadata);
          
          // Update form data with extracted metadata
          finalFormData = {
            ...finalFormData,
            title: extractedMetadata.title || finalFormData.title,
            excerpt: extractedMetadata.excerpt || finalFormData.excerpt,
            author: extractedMetadata.author || finalFormData.author || 'Maia',
            language: extractedMetadata.language || finalFormData.language || 'es',
            slug: extractedMetadata.slug || finalFormData.slug || generateSlug(extractedMetadata.title || finalFormData.title),
            imageUrl: extractedMetadata.imageUrl || finalFormData.imageUrl || '/images/blog/default-placeholder.jpg',
            date: new Date().toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          };
          
          // Convert content to rich text
          if (extractedMetadata.content) {
            finalFormData.content = convertMarkdownToHtml(extractedMetadata.content);
            console.log('✅ FORM SUBMIT DEBUG: Content converted to rich text');
          }
          
          console.log('✅ FORM SUBMIT DEBUG: Final form data:', finalFormData);
        }
      }
      
      // Also check if content is Next.js code even in rich text mode
      if (editorMode === 'rich' && formData.content && 
          formData.content.includes('export default function') && 
          (formData.content.includes('const metadata') || formData.content.includes('metadata =') || formData.content.includes('BlogPost'))) {
        
        console.log('🔧 FORM SUBMIT DEBUG: Detected Next.js code in rich text mode, extracting metadata...');
        const extractedMetadata = extractMetadataFromCode(formData.content);
        if (extractedMetadata) {
          console.log('🔧 FORM SUBMIT DEBUG: Extracted metadata from rich text mode:', extractedMetadata);
          
          // Update form data with extracted metadata
          finalFormData = {
            ...finalFormData,
            title: extractedMetadata.title || finalFormData.title,
            excerpt: extractedMetadata.excerpt || finalFormData.excerpt,
            author: extractedMetadata.author || finalFormData.author || 'Maia',
            language: extractedMetadata.language || finalFormData.language || 'es',
            slug: extractedMetadata.slug || finalFormData.slug || generateSlug(extractedMetadata.title || finalFormData.title),
            imageUrl: extractedMetadata.imageUrl || finalFormData.imageUrl || '/images/blog/default-placeholder.jpg'
          };
          
          // Convert content to rich text
          if (extractedMetadata.content) {
            finalFormData.content = convertMarkdownToHtml(extractedMetadata.content);
            console.log('✅ FORM SUBMIT DEBUG: Content converted to rich text from rich text mode');
          }
          
          console.log('✅ FORM SUBMIT DEBUG: Final form data from rich text mode:', finalFormData);
        }
      }
      
      if (editingPost) {
        updateBlogPost(editingPost.slug, finalFormData);
      } else {
        createBlogPost(finalFormData);
      }
      
      setShowForm(false);
      setEditingPost(null);
      resetForm();
      loadPosts();
      alert(editingPost ? 'Post updated successfully!' : 'Post created successfully!');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    
    // If content is Next.js code, extract metadata
    let formData = {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      imageUrl: post.imageUrl,
      slug: post.slug,
      language: post.language || 'es'
    };

    // Check if content is Next.js code and extract metadata
    if (post.content && post.content.includes('export default function') && 
        (post.content.includes('const metadata') || post.content.includes('metadata =') || post.content.includes('BlogPost'))) {
      
      console.log('🔧 EDIT DEBUG: Detected Next.js code, extracting metadata...');
      const extractedMetadata = extractMetadataFromCode(post.content);
      
      if (extractedMetadata) {
        console.log('🔧 EDIT DEBUG: Extracted metadata:', extractedMetadata);
        
        // Update form data with extracted metadata
        formData = {
          ...formData,
          title: extractedMetadata.title || formData.title,
          excerpt: extractedMetadata.excerpt || formData.excerpt,
          author: extractedMetadata.author || formData.author || 'Maia',
          language: extractedMetadata.language || formData.language || 'es',
          slug: extractedMetadata.slug || formData.slug || generateSlug(extractedMetadata.title || formData.title),
          imageUrl: extractedMetadata.imageUrl || formData.imageUrl || '/images/blog/default-placeholder.jpg'
        };
        
        // If we extracted content, convert it to rich text
        if (extractedMetadata.content) {
          formData.content = convertMarkdownToHtml(extractedMetadata.content);
        }
        
        console.log('✅ EDIT DEBUG: Form data updated with extracted metadata');
      }
    }
    
    setFormData(formData);
    setShowForm(true);
  };

  const handleDelete = async (slug) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { deleteBlogPost } = await import('../../lib/clientDb');
      deleteBlogPost(slug);
      loadPosts();
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      imageUrl: '',
      slug: '',
      language: 'es'
    });
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const extractMetadataFromCode = (code) => {
    try {
      console.log('🔧 EXTRACT DEBUG: Starting metadata extraction...');
      console.log('🔧 EXTRACT DEBUG: Code preview:', code.substring(0, 300) + '...');
      
      // Look for metadata object in the code - handle both const and let declarations
      const metadataMatch = code.match(/(?:const|let)\s+metadata\s*=\s*{([\s\S]*?)}/);
      console.log('🔧 EXTRACT DEBUG: Metadata match result:', metadataMatch ? 'FOUND' : 'NOT FOUND');
      if (metadataMatch) {
        const metadataStr = metadataMatch[1];
        
        // Extract individual fields with better regex patterns
        const titleMatch = metadataStr.match(/title:\s*["']([^"']+)["']/);
        const excerptMatch = metadataStr.match(/excerpt:\s*["']([^"']+)["']/);
        const authorMatch = metadataStr.match(/author:\s*["']([^"']+)["']/);
        const languageMatch = metadataStr.match(/language:\s*["']([^"']+)["']/);
        const slugMatch = metadataStr.match(/slug:\s*["']([^"']+)["']/);
        const imageUrlMatch = metadataStr.match(/imageUrl:\s*["']([^"']+)["']/);
        const dateMatch = metadataStr.match(/date:\s*["']([^"']+)["']/);
        
        return {
          title: titleMatch ? titleMatch[1] : '',
          excerpt: excerptMatch ? excerptMatch[1] : '',
          author: authorMatch ? authorMatch[1] : 'Maia',
          language: languageMatch ? languageMatch[1] : 'es',
          slug: slugMatch ? slugMatch[1] : '',
          imageUrl: imageUrlMatch ? imageUrlMatch[1] : '',
          date: dateMatch ? dateMatch[1] : ''
        };
      }
      
      // Also check for BlogPost component props (like in the console logs)
      console.log('🔧 EXTRACT DEBUG: Looking for BlogPost pattern...');
      console.log('🔧 EXTRACT DEBUG: Code contains BlogPost:', code.includes('BlogPost'));
      console.log('🔧 EXTRACT DEBUG: Code contains BlogPost(:', code.includes('BlogPost('));
      
      const blogPostMatch = code.match(/<BlogPost\s*([\s\S]*?)\s*\/?>/);
      console.log('🔧 EXTRACT DEBUG: BlogPost match result:', blogPostMatch ? 'FOUND' : 'NOT FOUND');
      if (blogPostMatch) {
        const propsStr = blogPostMatch[1];
        
        // Extract props from JSX format
        const titleMatch = propsStr.match(/title\s*=\s*["']([^"']+)["']/);
        const tldrMatch = propsStr.match(/tldr\s*=\s*["']([^"']+)["']/);
        const dateMatch = propsStr.match(/date\s*=\s*["']([^"']+)["']/);
        
        // Extract content from the content prop
        const contentMatch = propsStr.match(/content\s*=\s*{`([\s\S]*?)`}/);
        let content = '';
        if (contentMatch) {
          content = contentMatch[1].trim();
        }
        
        return {
          title: titleMatch ? titleMatch[1] : '',
          excerpt: tldrMatch ? tldrMatch[1] : '',
          author: 'Maia',
          language: 'es',
          slug: titleMatch ? titleMatch[1].toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim('-') : '',
          imageUrl: '',
          date: dateMatch ? dateMatch[1] : '',
          content: content
        };
      }
      
    } catch (error) {
      console.error('Error extracting metadata:', error);
    }
    return null;
  };

  const convertCodeToRichText = (code) => {
    try {
      // First, unescape the content
      const unescapedContent = code
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\t/g, '\t');

      // Extract JSX content from return statement
      const jsxMatch = unescapedContent.match(/return\s*\(\s*([\s\S]*?)\s*\)\s*;?\s*}/);
      if (!jsxMatch) {
        return null;
      }

      let jsxContent = jsxMatch[1].trim();
      
      // Remove JSX comments
      jsxContent = jsxContent.replace(/\/\*([^*]|\*[^/])*\*\//g, '');
      jsxContent = jsxContent.replace(/\/\/.*$/gm, '');
      
      // Convert className to class
      jsxContent = jsxContent.replace(/className=/g, 'class=');
      
      // Handle self-closing tags
      jsxContent = jsxContent.replace(/<(\w+)\s+([^>]*)\/>/g, '<$1 $2></$1>');
      
      // Remove JSX expressions that weren't replaced (like {metadata.xxx})
      jsxContent = jsxContent.replace(/{[^}]*}/g, '');
      
      // Convert JSX fragments to div
      jsxContent = jsxContent.replace(/<>/g, '<div>').replace(/<\/>/g, '</div>');
      
      // Normalize whitespace
      jsxContent = jsxContent.replace(/\s+/g, ' ').trim();
      
      // Extract the main content area (skip header if it exists)
      const contentMatch = jsxContent.match(/<div[^>]*class="[^"]*space-y-6[^"]*"[^>]*>([\s\S]*?)<\/div>/);
      if (contentMatch) {
        return contentMatch[1].trim();
      }
      
      // If no specific content area found, return the whole JSX
      return jsxContent;
      
    } catch (error) {
      console.error('Error converting code to rich text:', error);
      return null;
    }
  };

  const convertMarkdownToHtml = (markdown) => {
    try {
      let html = markdown;
      
      // Convert headers
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
      
      // Convert bold and italic
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      // Convert lists
      html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
      html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
      
      // Convert paragraphs
      html = html.replace(/^(?!<[h|u|o])(.*$)/gim, '<p>$1</p>');
      
      // Clean up empty paragraphs
      html = html.replace(/<p><\/p>/g, '');
      html = html.replace(/<p>\s*<\/p>/g, '');
      
      // Convert line breaks
      html = html.replace(/\n\n/g, '</p><p>');
      
      return html;
      
    } catch (error) {
      console.error('Error converting markdown to HTML:', error);
      return markdown;
    }
  };

  const handleExport = async () => {
    try {
      const { exportBlogData } = await import('../../lib/clientDb');
      exportBlogData();
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data');
    }
  };

  // Function to compress image data URL
  const compressImageDataUrl = async (dataUrl, title) => {
    try {
      console.log('🔧 COMPRESSION DEBUG: Starting compression for', title);
      
      // Convert data URL to File object
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], `${title}-image.jpg`, { type: blob.type });
      
      console.log('🔧 COMPRESSION DEBUG: Original file size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
      
      // Compression options - more aggressive compression
      const options = {
        maxSizeMB: 0.5, // Target 500KB for better compression
        maxWidthOrHeight: 1200, // Reduced max dimension
        useWebWorker: true,
        fileType: 'image/jpeg',
        quality: 0.7 // Lower quality for smaller file size
      };
      
      // Compress the image
      const compressedFile = await imageCompression(file, options);
      
      console.log('🔧 COMPRESSION DEBUG: Compressed file size:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB');
      
      // Convert back to data URL
      const compressedDataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(compressedFile);
      });
      
      console.log('🔧 COMPRESSION DEBUG: Compression successful for', title);
      return compressedDataUrl;
      
    } catch (error) {
      console.error('🔧 COMPRESSION ERROR: Failed to compress image for', title, error);
      return null;
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const { importBlogData } = await import('../../lib/clientDb');
        await importBlogData(file);
        loadPosts();
        alert('Data imported successfully!');
      } catch (error) {
        alert('Error importing data: ' + error.message);
      }
    }
  };

  const handleCleanupStorage = async () => {
    try {
      // Clear browser storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Reload posts from server
      loadPosts();
      
      alert('Storage cleaned up successfully! The page will refresh.');
      window.location.reload();
    } catch (error) {
      console.error('Error cleaning up storage:', error);
      alert('Error cleaning up storage: ' + error.message);
    }
  };

  const handlePublish = async () => {
    console.log('🚀 PUBLISH DEBUG: Starting publish process...');
    
    // First, fetch current published posts to compare
    let currentPublishedPosts = [];
    try {
      const response = await fetch('/data/blog-posts.json?t=' + Date.now());
      if (response.ok) {
        currentPublishedPosts = await response.json();
      }
                  } catch (error) {
                // Could not fetch current published posts for comparison
              }

    // Get CMS posts
    const { getBlogPosts } = await import('../../lib/clientDb');
    const cmsPosts = getBlogPosts();
    
    console.log('📋 PUBLISH DEBUG: CMS Posts found:', cmsPosts.length);
    console.log('📋 PUBLISH DEBUG: CMS Posts data:', JSON.stringify(cmsPosts, null, 2));
    
    if (cmsPosts.length === 0) {
      alert('No posts to publish. Create some posts first!');
      return;
    }

    // Sort CMS posts by date (newest first)
    const sortedCmsPosts = sortPostsByDate(cmsPosts, true);

    // Generate diff to show user what will change
    const diff = generatePostDiff(currentPublishedPosts, sortedCmsPosts);
    
    // Show diff preview to user
    const diffMessage = formatDiffMessage(diff);
    const shouldContinue = confirm(`Publishing will make the following changes:\n\n${diffMessage}\n\nContinue?`);
    
    if (!shouldContinue) return;
    
                  try {



      // Prepare posts for publishing (normalize data and extract metadata from code)
      const normalizedPosts = sortedCmsPosts.map(post => {
        let processedPost = {
          ...post,
          date: post.date || new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        };

        // If content is Next.js code, extract metadata and convert to rich text
        console.log('🔍 CODE DETECTION DEBUG: Checking post:', post.title || 'Untitled');
        console.log('🔍 CODE DETECTION DEBUG: Content preview:', post.content ? post.content.substring(0, 200) + '...' : 'NO CONTENT');
        console.log('🔍 CODE DETECTION DEBUG: Has export default function:', post.content ? post.content.includes('export default function') : false);
        console.log('🔍 CODE DETECTION DEBUG: Has const metadata:', post.content ? post.content.includes('const metadata') : false);
        console.log('🔍 CODE DETECTION DEBUG: Has metadata =:', post.content ? post.content.includes('metadata =') : false);
        console.log('🔍 CODE DETECTION DEBUG: Has BlogPost(', post.content ? post.content.includes('BlogPost(') : false);
        
        if (post.content && post.content.includes('export default function') && 
            (post.content.includes('const metadata') || post.content.includes('metadata =') || post.content.includes('BlogPost'))) {
          
          console.log('🔧 CODE PROCESSING: Extracting metadata from Next.js code for post:', post.title || 'Untitled');
          
          // Extract metadata from the code
          const extractedMetadata = extractMetadataFromCode(post.content);
          console.log('🔧 CODE PROCESSING: Extracted metadata:', extractedMetadata);
          if (extractedMetadata) {
            // Update post with extracted metadata
            processedPost = {
              ...processedPost,
              title: extractedMetadata.title || processedPost.title,
              excerpt: extractedMetadata.excerpt || processedPost.excerpt,
              author: extractedMetadata.author || processedPost.author || 'Maia',
              language: extractedMetadata.language || processedPost.language || 'es',
              slug: extractedMetadata.slug || processedPost.slug || generateSlug(extractedMetadata.title || processedPost.title),
              imageUrl: extractedMetadata.imageUrl || processedPost.imageUrl || '/images/blog/default-placeholder.jpg'
            };
            
            // Convert Next.js code to rich text content
            if (extractedMetadata.content) {
              // If we extracted content from the code, convert markdown to HTML
              processedPost.content = convertMarkdownToHtml(extractedMetadata.content);
            } else {
              // Otherwise, try to convert the JSX to rich text
              const richTextContent = convertCodeToRichText(post.content);
              if (richTextContent) {
                processedPost.content = richTextContent;
              }
            }
            
            console.log('✅ CODE PROCESSING: Successfully extracted metadata and converted to rich text');
          }
        }

        return processedPost;
      });
      
      console.log('🔧 PUBLISH DEBUG: Normalized posts:', JSON.stringify(normalizedPosts, null, 2));

      // Helper function to check if a post has changed
      const hasPostChanged = (cmsPost, publishedPost) => {
        if (!publishedPost) return true; // New post
        
        // Check if key fields have changed
        return (
          cmsPost.title !== publishedPost.title ||
          cmsPost.content !== publishedPost.content ||
          cmsPost.excerpt !== publishedPost.excerpt ||
          cmsPost.author !== publishedPost.author ||
          cmsPost.imageUrl !== publishedPost.imageUrl ||
          cmsPost.slug !== publishedPost.slug
        );
      };

      // Process posts and handle images (only for changed posts)
      const processedPosts = [];
      
      // Process posts sequentially to handle async compression
      for (const post of normalizedPosts) {
        const processedPost = { ...post };
        
        // Find the corresponding published post
        const publishedPost = currentPublishedPosts.find(p => p.slug === post.slug);
        const postHasChanged = hasPostChanged(post, publishedPost);
        
        console.log(`🔍 POST ANALYSIS: "${post.title}" - Changed: ${postHasChanged ? 'YES' : 'NO'}`);
        
        // Only process images if the post has changed
        if (postHasChanged && post.imageUrl && post.imageUrl.startsWith('data:image/')) {
          const base64Data = post.imageUrl.split(',')[1];
          const sizeInBytes = Math.ceil((base64Data.length * 3) / 4);
          const sizeInMB = sizeInBytes / (1024 * 1024);
          
          console.log('🔍 IMAGE DEBUG: Image size for', post.title, ':', sizeInMB.toFixed(2), 'MB');
          
          if (sizeInMB > 0.5) { // Reduced threshold to 500KB
            console.log('🔧 COMPRESSION DEBUG: Large image detected, compressing...');
            
            // Try to compress the image
            const compressedDataUrl = await compressImageDataUrl(post.imageUrl, post.title);
            
            if (compressedDataUrl) {
              // Check if compressed image is still too large
              const compressedBase64 = compressedDataUrl.split(',')[1];
              const compressedSizeInBytes = Math.ceil((compressedBase64.length * 3) / 4);
              const compressedSizeInMB = compressedSizeInBytes / (1024 * 1024);
              
              if (compressedSizeInMB > 0.8) { // If still over 800KB, use default image
                console.warn('⚠️ COMPRESSED IMAGE STILL TOO LARGE: Using default image for', post.title);
                processedPost.imageUrl = '/images/blog/default-placeholder.jpg';
              } else {
                // Use the compressed image
                processedPost.imageUrl = compressedDataUrl;
                console.log('✅ COMPRESSION SUCCESS: Image compressed and kept for', post.title);
              }
            } else {
              // Compression failed, use default image
              console.warn('⚠️ COMPRESSION FAILED: Using default image for', post.title);
              processedPost.imageUrl = '/images/blog/default-placeholder.jpg';
            }
          } else {
            // Image is small enough, keep it
            console.log('✅ IMAGE OK: Image size acceptable for', post.title);
          }
        } else if (!postHasChanged && publishedPost) {
          // Post hasn't changed, keep the existing imageUrl from published post
          processedPost.imageUrl = publishedPost.imageUrl;
          console.log('✅ IMAGE PRESERVED: Using existing image for unchanged post:', post.title);
        }
        
        processedPosts.push(processedPost);
      }

      // All images have been processed (compressed if needed)
      console.log('✅ IMAGE PROCESSING COMPLETE: All images processed successfully');

                      // Prepare the payload with diff information (no images to keep payload small)
                const payload = {
                  posts: processedPosts,
                  diff: diff, // Include the diff information
                  timestamp: new Date().toISOString(), // Force cache refresh
                  version: Date.now(), // Add version for cache busting
                  action: 'apply_diff', // New action to apply diff
                  totalPosts: processedPosts.length, // Send count for verification
                  currentPublishedCount: currentPublishedPosts.length // For verification
                };
                
                console.log('📤 PUBLISH DEBUG: Final payload being sent to API:', JSON.stringify(payload, null, 2));

      

      // Send to local API
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        
        if (response.status === 413) {
          errorMessage = 'Payload too large. Some images may be too big. Please try with smaller images.';
        } else {
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
            if (errorData.details && errorData.postTitle) {
              errorMessage = `${errorMessage} for post "${errorData.postTitle}": ${errorData.details.join(', ')}`;
            }
          } catch (parseError) {
            console.error('Failed to parse error response:', parseError);
            errorMessage = `Server error (${response.status}). Please try again.`;
          }
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();

                      if (result.success) {
        
        // Verify the publish by checking the live JSON file after a short delay
                          setTimeout(async () => {
                    try {
                      const verifyTimestamp = Date.now();
                      const verifyResponse = await fetch(`/data/blog-posts.json?t=${verifyTimestamp}&v=${verifyTimestamp}`);
                                  if (verifyResponse.ok) {
                        const livePosts = await verifyResponse.json();

                        if (livePosts.length === processedPosts.length) {
                          alert('✅ Successfully published to live site! Verification passed.');
                        } else {
                          alert('⚠️ Published but verification failed. Live site may not reflect all changes.');
                        }
                      } else {
                        alert('✅ Successfully published to live site! Your changes will be live in a few minutes.');
                      }
                    } catch (verifyError) {
                      alert('✅ Successfully published to live site! Your changes will be live in a few minutes.');
                    }
        }, 2000);
      } else {
        throw new Error('Publish failed');
      }
    } catch (error) {
      console.error('Publish error:', error);
      alert(`❌ Publish failed: ${error.message}`);
    }
  };

  // Generate diff between published and CMS posts
  const generatePostDiff = (publishedPosts, cmsPosts) => {
    const publishedSlugs = new Set(publishedPosts.map(p => p.slug));
    const cmsSlugs = new Set(cmsPosts.map(p => p.slug));
    
    const added = cmsPosts.filter(post => !publishedSlugs.has(post.slug));
    const removed = publishedPosts.filter(post => !cmsSlugs.has(post.slug));
    const modified = [];
    
    // Check for modifications (same slug but different content)
    for (const cmsPost of cmsPosts) {
      const publishedPost = publishedPosts.find(p => p.slug === cmsPost.slug);
      if (publishedPost && JSON.stringify(cmsPost) !== JSON.stringify(publishedPost)) {
        modified.push({
          slug: cmsPost.slug,
          title: cmsPost.title,
          oldTitle: publishedPost.title
        });
      }
    }
    
    return { added, removed, modified };
  };

  // Format diff message for user
  const formatDiffMessage = (diff) => {
    let message = '';
    
    if (diff.added.length > 0) {
      message += `➕ ADD ${diff.added.length} post(s):\n`;
      diff.added.forEach(post => {
        message += `  • "${post.title}"\n`;
      });
      message += '\n';
    }
    
    if (diff.removed.length > 0) {
      message += `❌ REMOVE ${diff.removed.length} post(s):\n`;
      diff.removed.forEach(post => {
        message += `  • "${post.title}"\n`;
      });
      message += '\n';
    }
    
    if (diff.modified.length > 0) {
      message += `✏️ MODIFY ${diff.modified.length} post(s):\n`;
      diff.modified.forEach(post => {
        message += `  • "${post.oldTitle}" → "${post.title}"\n`;
      });
      message += '\n';
    }
    
    if (diff.added.length === 0 && diff.removed.length === 0 && diff.modified.length === 0) {
      message = 'No changes detected - posts are already up to date.';
    }
    
    return message;
  };

  const handleImportPublishedPosts = async () => {
    try {
      // Fetch published posts from the JSON file with aggressive cache busting
      const timestamp = Date.now();
      const response = await fetch(`/data/blog-posts.json?t=${timestamp}&v=${timestamp}`);
      if (!response.ok) {
        throw new Error('Failed to fetch published posts');
      }
      
      const publishedPosts = await response.json();
      
      if (!publishedPosts || publishedPosts.length === 0) {
        alert('No published posts found to import.');
        return;
      }
  
      // Get CMS functions
      const { getBlogPosts, createBlogPost, updateBlogPost } = await import('../../lib/clientDb');
      
      // Get current CMS posts
      const currentPosts = getBlogPosts();
      
      // Create a map of existing posts by slug for quick lookup
      const existingPostsMap = new Map(currentPosts.map(post => [post.slug, post]));
      
      let importedCount = 0;
      let updatedCount = 0;
      let skippedCount = 0;
      let importList = [];
      let updateList = [];
      
      for (const publishedPost of publishedPosts) {
        const existingPost = existingPostsMap.get(publishedPost.slug);
        
        if (!existingPost) {
          // Post doesn't exist in CMS - will import it
          importedCount++;
          importList.push(publishedPost.title);
        } else {
          // Post exists - check if it needs updating
          // Compare key fields to detect changes
          const hasChanges = 
            existingPost.title !== publishedPost.title ||
            existingPost.excerpt !== publishedPost.excerpt ||
            existingPost.content !== publishedPost.content ||
            existingPost.author !== publishedPost.author ||
            existingPost.imageUrl !== publishedPost.imageUrl ||
            existingPost.language !== publishedPost.language ||
            existingPost.date !== publishedPost.date;
          
          if (hasChanges) {
            // Will update the existing post
            updatedCount++;
            updateList.push(publishedPost.title);
          } else {
            // No changes - will skip
            skippedCount++;
          }
        }
      }
      
      // Show preview and ask for confirmation
      let previewMessage = `Import Preview:\n\n`;
      if (importedCount > 0) {
        previewMessage += `📥 Will import ${importedCount} new posts:\n`;
        importList.forEach(title => previewMessage += `  • "${title}"\n`);
        previewMessage += '\n';
      }
      if (updatedCount > 0) {
        previewMessage += `🔄 Will update ${updatedCount} existing posts:\n`;
        updateList.forEach(title => previewMessage += `  • "${title}"\n`);
        previewMessage += '\n';
      }
      if (skippedCount > 0) {
        previewMessage += `⏭️ Will skip ${skippedCount} unchanged posts\n\n`;
      }
      
      if (importedCount === 0 && updatedCount === 0) {
        alert(`ℹ️ No changes needed. All ${skippedCount} published posts are already up to date in the CMS.`);
        return;
      }
      
      const shouldProceed = confirm(`${previewMessage}Do you want to proceed with the import?`);
      if (!shouldProceed) return;
      
      // Proceed with the actual import
      for (const publishedPost of publishedPosts) {
        const existingPost = existingPostsMap.get(publishedPost.slug);
        
        if (!existingPost) {
          // Post doesn't exist in CMS - import it
          const postToImport = {
            ...publishedPost,
            createdAt: publishedPost.createdAt || new Date().toISOString(),
            updatedAt: publishedPost.updatedAt || new Date().toISOString()
          };
          
          createBlogPost(postToImport);
        } else {
          // Post exists - check if it needs updating
          const hasChanges = 
            existingPost.title !== publishedPost.title ||
            existingPost.excerpt !== publishedPost.excerpt ||
            existingPost.content !== publishedPost.content ||
            existingPost.author !== publishedPost.author ||
            existingPost.imageUrl !== publishedPost.imageUrl ||
            existingPost.language !== publishedPost.language ||
            existingPost.date !== publishedPost.date;
          
          if (hasChanges) {
            // Update the existing post with published version
            const postToUpdate = {
              ...publishedPost,
              createdAt: existingPost.createdAt, // Preserve original creation date
              updatedAt: new Date().toISOString()
            };
            
            updateBlogPost(publishedPost.slug, postToUpdate);
          }
        }
      }
      
      // Reload posts to show the changes
      loadPosts();
      
      // Show final results
      let resultMessage = '';
      if (importedCount > 0) {
        resultMessage += `✅ Imported ${importedCount} new posts\n`;
      }
      if (updatedCount > 0) {
        resultMessage += `🔄 Updated ${updatedCount} existing posts\n`;
      }
      if (skippedCount > 0) {
        resultMessage += `⏭️ Skipped ${skippedCount} unchanged posts\n`;
      }
      
      alert(`Import completed successfully!\n\n${resultMessage}`);
    } catch (error) {
      console.error('Import error:', error);
      alert(`❌ Import failed: ${error.message}`);
    }
  };



  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100">
              <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Maia CMS Access
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter admin password to continue
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Maia CMS - Dual Mode</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Admin Access</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <button
            onClick={() => {
              setShowForm(true);
              setEditingPost(null);
              resetForm();
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create New Post
          </button>
          <button
            onClick={handlePublish}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Publish to Live Site
          </button>
          <button
            onClick={handleExport}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Export Data
          </button>
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="import-file"
            />
            <label
              htmlFor="import-file"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
            >
              Import Data
            </label>
          </div>
                  <button
          onClick={handleImportPublishedPosts}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Import Published Posts
        </button>
                  <button
            onClick={() => {
              loadPosts();
              alert('Posts refreshed!');
            }}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Posts
          </button>
          <button
            onClick={handleCleanupStorage}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            🧹 Clean Storage
          </button>


        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            
            {/* Editor Mode Toggle */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Editor Mode:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => {
                      // If switching from code mode to rich text mode, extract metadata
                      if (editorMode === 'code' && formData.content) {
                        console.log('🔧 MODE SWITCH DEBUG: Switching from code to rich text, extracting metadata...');
                        const extractedMetadata = extractMetadataFromCode(formData.content);
                        if (extractedMetadata) {
                          console.log('🔧 MODE SWITCH DEBUG: Extracted metadata:', extractedMetadata);
                          
                          // Update form data with extracted metadata
                          setFormData(prev => ({
                            ...prev,
                            title: extractedMetadata.title || prev.title,
                            excerpt: extractedMetadata.excerpt || prev.excerpt,
                            author: extractedMetadata.author || prev.author || 'Maia',
                            language: extractedMetadata.language || prev.language || 'es',
                            slug: extractedMetadata.slug || prev.slug || generateSlug(extractedMetadata.title || prev.title),
                            imageUrl: extractedMetadata.imageUrl || prev.imageUrl || '/images/blog/default-placeholder.jpg'
                          }));
                          
                          // If we extracted content, convert it to rich text
                          if (extractedMetadata.content) {
                            setFormData(prev => ({
                              ...prev,
                              content: convertMarkdownToHtml(extractedMetadata.content)
                            }));
                          }
                          
                          console.log('✅ MODE SWITCH DEBUG: Form data updated with extracted metadata');
                        }
                      }
                      setEditorMode('rich');
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      editorMode === 'rich' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Rich Text Editor
                  </button>
                  <button
                    onClick={() => setEditorMode('code')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      editorMode === 'code' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Next.js Code Editor
                  </button>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {editorMode === 'rich' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => {
                          setFormData({ ...formData, title: e.target.value });
                          if (!editingPost) {
                            setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="es">Spanish</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </>
              )}

              {editorMode === 'rich' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            const dataUrl = e.target.result;
                            setFormData({ ...formData, imageUrl: dataUrl });
                            setUploadedImages(prev => [...prev, { name: file.name, url: dataUrl }]);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.imageUrl && (
                      <div className="flex items-center gap-2">
                        <img src={formData.imageUrl} alt="Preview" className="w-16 h-16 object-cover rounded" />
                        <span className="text-sm text-gray-600">Image uploaded</span>
                      </div>
                    )}
                    {!formData.imageUrl && (
                      <p className="text-sm text-red-600">⚠️ A featured image is required for all blog posts. Please upload an image to continue.</p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                
                {editorMode === 'rich' ? (
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    onImageUpload={(dataUrl, fileName) => {
                      // When an image is uploaded in the rich text editor, update the featured image
                      if (!formData.imageUrl || formData.imageUrl === '/images/blog/default.jpg') {
                        setFormData({ ...formData, imageUrl: dataUrl });
                        setUploadedImages(prev => [...prev, { name: fileName, url: dataUrl }]);
                      }
                    }}
                  />
                                 ) : (
                   <div className="space-y-4">
                     <div className="flex items-center justify-between">
                       <span className="text-sm text-gray-600">
                         Create a complete Next.js component with all metadata
                       </span>
                       <button
                         type="button"
                         onClick={() => {
                           const sampleCode = `// Blog Post Component - All metadata included
export default function BlogPost() {
  // Metadata - this will be extracted automatically
  const metadata = {
    title: "My Amazing Blog Post",
    excerpt: "This is a brief description of the post that will appear in previews.",
    author: "Your Name",
    date: "${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}",
    language: "es",
    imageUrl: "/images/blog/default.jpg", // You can upload images in the rich text editor
    slug: "my-amazing-blog-post"
  };

  return (
    <article className="prose prose-lg max-w-none">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {metadata.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <span>By {metadata.author}</span>
          <span>{metadata.date}</span>
        </div>
        <p className="text-xl text-gray-600 leading-relaxed">
          {metadata.excerpt}
        </p>
      </header>

      {/* Your content here */}
      <div className="space-y-6">
        <p>This is your main content. You can use any Next.js components and Tailwind CSS classes.</p>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Custom Section</h2>
          <p>You can create any layout you want with full Next.js functionality!</p>
        </div>

        <h2>Features</h2>
        <ul>
          <li>Full Next.js component support</li>
          <li>React hooks and state management</li>
          <li>Tailwind CSS styling</li>
          <li>Custom layouts and components</li>
        </ul>
      </div>
    </article>
  );
}`;
                           setFormData({ ...formData, content: sampleCode });
                         }}
                         className="text-sm text-blue-600 hover:text-blue-700"
                       >
                         Load Complete Template
                       </button>
                       
                       <button
                         type="button"
                         onClick={() => {
                           if (formData.content) {
                             console.log('🔧 EXTRACT DEBUG: Manually extracting metadata from code...');
                             const extractedMetadata = extractMetadataFromCode(formData.content);
                             if (extractedMetadata) {
                               console.log('🔧 EXTRACT DEBUG: Extracted metadata:', extractedMetadata);
                               
                               // Update form data with extracted metadata
                               setFormData(prev => ({
                                 ...prev,
                                 title: extractedMetadata.title || prev.title,
                                 excerpt: extractedMetadata.excerpt || prev.excerpt,
                                 author: extractedMetadata.author || prev.author || 'Maia',
                                 language: extractedMetadata.language || prev.language || 'es',
                                 slug: extractedMetadata.slug || prev.slug || generateSlug(extractedMetadata.title || prev.title),
                                 imageUrl: extractedMetadata.imageUrl || prev.imageUrl || '/images/blog/default-placeholder.jpg'
                               }));
                               
                               console.log('✅ EXTRACT DEBUG: Form data updated with extracted metadata');
                               alert('✅ Metadata extracted successfully! Check the form fields above.');
                             } else {
                               alert('❌ No metadata found in the code. Make sure your code includes a metadata object or BlogPost component props.');
                             }
                           } else {
                             alert('❌ No content to extract metadata from. Please add some code first.');
                           }
                         }}
                         className="text-sm text-green-600 hover:text-green-700 ml-2"
                       >
                         Extract Metadata
                       </button>
                     </div>
                     
                     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                       <div className="flex items-start gap-2">
                         <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                         <div>
                           <h4 className="text-sm font-medium text-yellow-800 mb-1">Self-Contained Component</h4>
                           <p className="text-sm text-yellow-700">
                             Include all metadata (title, author, date, excerpt) directly in your component. 
                             The system will extract this information automatically for the blog listing.
                           </p>
                         </div>
                       </div>
                     </div>
                     
                     {/* Image Upload for Code Mode */}
                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                       <div className="flex items-start gap-2 mb-3">
                         <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>
                         <div>
                           <h4 className="text-sm font-medium text-blue-800 mb-1">Upload Images for Code Mode</h4>
                           <p className="text-sm text-blue-700 mb-3">
                             Upload images here and reference them in your code using the provided data URLs.
                           </p>
                         </div>
                       </div>
                       
                       <div className="space-y-3">
                         <div className="flex items-center gap-2">
                           <input
                             type="file"
                             accept="image/*"
                             onChange={(e) => {
                               const file = e.target.files[0];
                               if (file) {
                                 const reader = new FileReader();
                                 reader.onload = (e) => {
                                   const dataUrl = e.target.result;
                                   // Update the imageUrl field
                                   if (!formData.imageUrl || formData.imageUrl === '/images/blog/default.jpg') {
                                     setFormData({ ...formData, imageUrl: dataUrl });
                                   }
                                   // Add to uploaded images
                                   setUploadedImages(prev => [...prev, { name: file.name, url: dataUrl }]);
                                 };
                                 reader.readAsDataURL(file);
                               }
                             }}
                             className="text-sm"
                           />
                           <span className="text-xs text-gray-500">Upload image for featured image</span>
                         </div>
                         
                         {uploadedImages.length > 0 && (
                           <div className="space-y-2">
                             <p className="text-xs font-medium text-gray-700">Uploaded Images (copy these URLs to use in your code):</p>
                             {uploadedImages.map((img, index) => (
                               <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                                 <img src={img.url} alt={img.name} className="w-8 h-8 object-cover rounded" />
                                 <span className="text-xs text-gray-600 flex-1 truncate">{img.name}</span>
                                 <button
                                   type="button"
                                   onClick={() => {
                                     navigator.clipboard.writeText(img.url);
                                   }}
                                   className="text-xs text-blue-600 hover:text-blue-700"
                                 >
                                   Copy URL
                                 </button>
                               </div>
                             ))}
                           </div>
                         )}
                       </div>
                     </div>
                     
                     <textarea
                       value={formData.content}
                       onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                       rows={25}
                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                       placeholder="Paste your complete Next.js component with metadata here..."
                     />
                     
                     <div className="text-xs text-gray-500 space-y-1">
                       <p>💡 <strong>Tip:</strong> Include a metadata object in your component with title, excerpt, author, date, language, and slug.</p>
                       <p>💡 <strong>Images:</strong> Upload images above and copy the data URLs to use in your code, or use the rich text editor.</p>
                       <p>💡 <strong>Full Support:</strong> You can use any Next.js components, React hooks, and Tailwind CSS classes.</p>
                     </div>
                   </div>
                 )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={!formData.imageUrl}
                  className={`px-6 py-3 rounded-lg ${
                    formData.imageUrl 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                >
                  {editingPost ? 'Update Post' : 'Create Post'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPost(null);
                    resetForm();
                  }}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Blog Posts ({posts.length})</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {posts.map((post) => (
              <div key={post.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">{post.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>By {post.author}</span>
                    <span>{post.date}</span>
                    <span className="uppercase">{post.language}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      post.content.includes('export default') 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {post.content.includes('export default') ? 'Code' : 'Rich Text'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.slug)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <div className="px-6 py-8 text-center text-gray-500">
                No blog posts yet. Create your first post!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
