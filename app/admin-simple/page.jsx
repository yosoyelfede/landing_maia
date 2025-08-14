'use client';

import { useState, useEffect } from 'react';
import RichTextEditor from '../../components/RichTextEditor';

export default function SimpleAdminDashboard() {
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
    // Check if user is authenticated (simple password check)
    const savedPassword = localStorage.getItem('maia_admin_password');
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'maia2024';
    if (savedPassword === adminPassword) {
      setIsAuthenticated(true);
    }
    
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { getBlogPosts } = await import('../../lib/clientDb');
      const posts = getBlogPosts();
      setPosts(posts);
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'maia2024';
    if (password === adminPassword) {
      localStorage.setItem('maia_admin_password', password);
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('maia_admin_password');
    setIsAuthenticated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { createBlogPost, updateBlogPost } = await import('../../lib/clientDb');
      
      let finalFormData = { ...formData };
      
      // If in code mode, extract metadata from the component code
      if (editorMode === 'code' && formData.content) {
        const extractedMetadata = extractMetadataFromCode(formData.content);
        if (extractedMetadata) {
          finalFormData = {
            ...finalFormData,
            ...extractedMetadata,
            date: new Date().toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          };
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
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      imageUrl: post.imageUrl,
      slug: post.slug,
      language: post.language || 'es'
    });
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
      // Look for metadata object in the code
      const metadataMatch = code.match(/const\s+metadata\s*=\s*{([^}]+)}/);
      if (metadataMatch) {
        const metadataStr = metadataMatch[1];
        
        // Extract individual fields
        const titleMatch = metadataStr.match(/title:\s*["']([^"']+)["']/);
        const excerptMatch = metadataStr.match(/excerpt:\s*["']([^"']+)["']/);
        const authorMatch = metadataStr.match(/author:\s*["']([^"']+)["']/);
        const languageMatch = metadataStr.match(/language:\s*["']([^"']+)["']/);
        const slugMatch = metadataStr.match(/slug:\s*["']([^"']+)["']/);
        const imageUrlMatch = metadataStr.match(/imageUrl:\s*["']([^"']+)["']/);
        
        return {
          title: titleMatch ? titleMatch[1] : '',
          excerpt: excerptMatch ? excerptMatch[1] : '',
          author: authorMatch ? authorMatch[1] : '',
          language: languageMatch ? languageMatch[1] : 'es',
          slug: slugMatch ? slugMatch[1] : '',
          imageUrl: imageUrlMatch ? imageUrlMatch[1] : ''
        };
      }
    } catch (error) {
      console.error('Error extracting metadata:', error);
    }
    return null;
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

  const handlePublish = async () => {
    if (!confirm('This will publish all posts to your live site. Continue?')) return;
    
    try {
      const { getBlogPosts } = await import('../../lib/clientDb');
      const posts = getBlogPosts();
      
      if (posts.length === 0) {
        alert('No posts to publish. Create some posts first!');
        return;
      }

      // Prepare posts for publishing (normalize data)
      const normalizedPosts = posts.map(post => ({
        ...post,
        date: post.date || new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }));

      // Extract images from data URLs and prepare for upload
      const images = [];
      const processedPosts = normalizedPosts.map(post => {
        const processedPost = { ...post };
        
        // If imageUrl is a data URL, convert it to a file path and add to images array
        if (post.imageUrl && post.imageUrl.startsWith('data:image/')) {
          const fileName = `uploads/${post.slug}-${Date.now()}.jpg`;
          const base64Data = post.imageUrl.split(',')[1];
          
          images.push({
            path: `public/${fileName}`,
            contentBase64: post.imageUrl
          });
          
          // Update the post to use the file path instead of data URL
          processedPost.imageUrl = `/${fileName}`;
        }
        
        return processedPost;
      });

      // Prepare the payload
      const payload = {
        posts: processedPosts,
        images: images
      };

      // Get publish configuration from environment or use defaults
      const publishUrl = 'https://maia-cms-publisher.vercel.app/api/publish';
      const publishKey = 'WSmq5yDkBCzePpuYlA';

      // Send to Vercel function
      const response = await fetch(publishUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Publish-Key': publishKey,
          'Origin': window.location.origin
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const result = await response.json();
      
      if (result.ok) {
        alert('✅ Successfully published to live site! Your changes will be live in a few minutes.');
      } else {
        throw new Error('Publish failed');
      }
    } catch (error) {
      console.error('Publish error:', error);
      alert(`❌ Publish failed: ${error.message}`);
    }
  };

  const handleImportPublishedPosts = async () => {
    if (!confirm('This will import all published posts into the CMS. Continue?')) return;
    
    try {
      // Fetch published posts from the JSON file
      const response = await fetch('/data/blog-posts.json');
      if (!response.ok) {
        throw new Error('Failed to fetch published posts');
      }
      
      const publishedPosts = await response.json();
      
      if (!publishedPosts || publishedPosts.length === 0) {
        alert('No published posts found to import.');
        return;
      }

      // Get current CMS posts
      const { getBlogPosts, createBlogPost } = await import('../../lib/clientDb');
      const currentPosts = getBlogPosts();
      
      // Create a set of existing slugs to avoid duplicates
      const existingSlugs = new Set(currentPosts.map(post => post.slug));
      
      // Import posts that don't already exist in CMS
      let importedCount = 0;
      for (const post of publishedPosts) {
        if (!existingSlugs.has(post.slug)) {
          // Add createdAt and updatedAt if they don't exist
          const postToImport = {
            ...post,
            createdAt: post.createdAt || new Date().toISOString(),
            updatedAt: post.updatedAt || new Date().toISOString()
          };
          
          createBlogPost(postToImport);
          importedCount++;
        }
      }
      
      // Reload posts to show the imported ones
      loadPosts();
      
      if (importedCount > 0) {
        alert(`✅ Successfully imported ${importedCount} posts into the CMS!`);
      } else {
        alert('All published posts are already in the CMS.');
      }
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
                    onClick={() => setEditorMode('rich')}
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
                    Featured Image
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
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
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
