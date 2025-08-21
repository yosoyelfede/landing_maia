'use client';

import { useState, useEffect } from 'react';
import { RichTextEditor } from '../../components/RichTextEditor';
import imageCompression from 'browser-image-compression';

export default function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [editorMode, setEditorMode] = useState('rich'); // 'rich' or 'code'
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    date: '',
    image: null,
    tags: []
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  // Handle image upload with compression
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('🖼️ Image selected:', file.name, `${(file.size / 1024 / 1024).toFixed(2)}MB`);

    try {
      setIsUploadingImage(true);

      // Generate slug from title or extract from code for image naming
      let slug = formData.slug;
      
      if (!slug) {
      if (editorMode === 'code' && formData.content) {
          // Try to extract metadata from code to get slug/title
          const metadata = extractMetadataFromCode(formData.content);
          if (metadata.title) {
            slug = metadata.title
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .trim();
          } else if (metadata.slug) {
            slug = metadata.slug;
          }
        } else if (formData.title) {
          slug = formData.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
        }
      }

      if (!slug) {
        if (editorMode === 'code') {
          alert('Por favor pega el código del post primero para extraer el título y generar el nombre de la imagen');
      } else {
          alert('Por favor ingresa un título para generar el nombre de la imagen');
        }
        setIsUploadingImage(false);
        return;
      }

      // Compress image
      console.log('🗜️ Compressing image...');
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/jpeg', // Convert all to JPEG for consistency
        initialQuality: 0.8,
      };

      const compressedFile = await imageCompression(file, options);
      console.log('✅ Image compressed:', `${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);

      // Create preview
      const previewUrl = URL.createObjectURL(compressedFile);
      setImagePreview(previewUrl);

      // Upload to server
      console.log('📤 Uploading compressed image...');
      const uploadFormData = new FormData();
      uploadFormData.append('image', compressedFile);
      uploadFormData.append('slug', slug);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      });

      const uploadResult = await uploadResponse.json();

      if (uploadResult.success) {
        console.log('✅ Image uploaded successfully:', uploadResult.imageUrl);
        setUploadedImageUrl(uploadResult.imageUrl);
        setFormData({ ...formData, image: compressedFile });
        
        // Update slug if it was auto-generated
        if (!formData.slug) {
          setFormData(prev => ({ ...prev, slug: slug }));
        }
      } else {
        throw new Error(uploadResult.error || 'Upload failed');
      }

    } catch (error) {
      console.error('❌ Image upload error:', error);
      alert(`Error al subir imagen: ${error.message}`);
      setImagePreview(null);
      setUploadedImageUrl(null);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const extractMetadataFromCode = (code) => {
    const metadata = {};
    console.log('🔍 Extracting metadata from code...');
    
    // Pattern 1: BlogPost component pattern
    const blogPostMatch = code.match(/<BlogPost\s*([\s\S]*?)\s*\/?>/);
    if (blogPostMatch) {
      console.log('📝 Found BlogPost component pattern');
      const propsStr = blogPostMatch[1];
      
      // Extract props from JSX format
      const titleMatch = propsStr.match(/title\s*=\s*["']([^"']+)["']/);
      const tldrMatch = propsStr.match(/tldr\s*=\s*["']([^"']+)["']/);
      const excerptMatch = propsStr.match(/excerpt\s*=\s*["']([^"']+)["']/);
      const dateMatch = propsStr.match(/date\s*=\s*["']([^"']+)["']/);
      const authorMatch = propsStr.match(/author\s*=\s*["']([^"']+)["']/);
      const contentMatch = propsStr.match(/content\s*=\s*{`([\s\S]*?)`}/s);
      
      if (titleMatch) metadata.title = titleMatch[1];
      if (tldrMatch) metadata.excerpt = tldrMatch[1];
      if (excerptMatch) metadata.excerpt = excerptMatch[1]; // excerpt has priority over tldr
      if (dateMatch) metadata.date = dateMatch[1];
      if (authorMatch) metadata.author = authorMatch[1];
      if (contentMatch) metadata.content = contentMatch[1];
    }
    
    // Pattern 2: export const metadata pattern (Next.js App Router)
    const metadataExportMatch = code.match(/export\s+const\s+metadata\s*=\s*{([\s\S]*?)};/);
    if (metadataExportMatch && !metadata.title) {
      console.log('📝 Found export const metadata pattern');
      const metadataStr = metadataExportMatch[1];
      
      const titleMatch = metadataStr.match(/title\s*:\s*["']([^"']+)["']/);
      const descMatch = metadataStr.match(/description\s*:\s*["']([^"']+)["']/);
      
      // Extract date from openGraph.publishedTime
      const publishedTimeMatch = metadataStr.match(/publishedTime\s*:\s*["']([^"']+)["']/);
      if (publishedTimeMatch) {
        const publishedDate = new Date(publishedTimeMatch[1]);
        metadata.date = publishedDate.toLocaleDateString('es-ES', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        });
      }
      
      // Extract authors from openGraph.authors array
      const authorsMatch = metadataStr.match(/authors\s*:\s*\[["']([^"']+)["']\]/);
      if (authorsMatch) {
        metadata.author = authorsMatch[1];
      }
      
      if (titleMatch) metadata.title = titleMatch[1].replace(' | Blog Maia', '');
      if (descMatch) metadata.excerpt = descMatch[1];
    }
    
    // Pattern 3: Individual const declarations
    if (!metadata.title) {
      const titleConstMatch = code.match(/const\s+title\s*=\s*["']([^"']+)["']/);
      if (titleConstMatch) {
        console.log('📝 Found const title pattern');
        metadata.title = titleConstMatch[1];
      }
    }
    
    if (!metadata.excerpt) {
      const excerptConstMatch = code.match(/const\s+excerpt\s*=\s*["']([^"']+)["']/);
      if (excerptConstMatch) {
        console.log('📝 Found const excerpt pattern');
        metadata.excerpt = excerptConstMatch[1];
      }
    }
    
    if (!metadata.author) {
      const authorConstMatch = code.match(/const\s+author\s*=\s*["']([^"']+)["']/);
      if (authorConstMatch) {
        console.log('📝 Found const author pattern');
        metadata.author = authorConstMatch[1];
      }
    }
    
    if (!metadata.date) {
      const dateConstMatch = code.match(/const\s+date\s*=\s*["']([^"']+)["']/);
      if (dateConstMatch) {
        console.log('📝 Found const date pattern');
        metadata.date = dateConstMatch[1];
      }
    }
    
    // Pattern 4: Traditional HTML metadata (fallback)
    if (!metadata.title) {
      const titleMatch = code.match(/<title>([^<]+)<\/title>/);
      if (titleMatch) {
        console.log('📝 Found HTML title pattern');
        metadata.title = titleMatch[1].replace(' | Blog Maia', '');
      }
    }
    
    if (!metadata.excerpt) {
      const descMatch = code.match(/name="description"\s+content="([^"]+)"/);
      if (descMatch) {
        console.log('📝 Found HTML description pattern');
        metadata.excerpt = descMatch[1];
      }
    }
    
    // Generate slug from title if found
    if (metadata.title && !metadata.slug) {
      metadata.slug = metadata.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      console.log('🏷️ Generated slug:', metadata.slug);
    }
    
    console.log('✅ Extracted metadata:', metadata);
    return metadata;
  };

  const convertCodeToRichText = (code) => {
    console.log('🔄 Converting code to rich text...');
    
    // First try to extract content from BlogPost component pattern
    const blogPostContentMatch = code.match(/content\s*=\s*{`([\s\S]*?)`}/s);
    if (blogPostContentMatch) {
      console.log('📝 Found BlogPost content pattern');
      let content = blogPostContentMatch[1];
      
      // Convert markdown-like syntax to HTML
      content = content
        .replace(/## (.*)/g, '<h2>$1</h2>')
        .replace(/### (.*)/g, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^\- (.*)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        .replace(/^([^<\n].*)$/gm, '<p>$1</p>')
        .replace(/\n\s*\n/g, '\n');
      
      return content;
    }
    
    // Extract content from JSX return statement (Next.js App Router pattern)
    const returnMatch = code.match(/return\s*\(([\s\S]*?)\);?\s*}/);
    if (returnMatch) {
      console.log('📝 Found JSX return pattern - extracting content');
      let jsxContent = returnMatch[1];
      
      // Extract content from article or main content area
      const articleMatch = jsxContent.match(/<article[^>]*>([\s\S]*?)<\/article>/);
      const mainContentMatch = jsxContent.match(/<div[^>]*className[^>]*prose[^>]*>([\s\S]*?)<\/div>/);
      
      let extractedContent = '';
      if (articleMatch) {
        extractedContent = articleMatch[1];
      } else if (mainContentMatch) {
        extractedContent = mainContentMatch[1];
      } else {
        // Try to extract text content from JSX
        extractedContent = jsxContent
          .replace(/<[^>]*>/g, '') // Remove all HTML/JSX tags
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
      }
      
      // Convert JSX content to HTML
      if (extractedContent) {
        extractedContent = extractedContent
          .replace(/^\s*<p><strong>([^<]*)<\/strong><br \/>\s*/gm, '<p><strong>$1:</strong><br />')
          .replace(/<h([123])>/g, '<h$1>')
          .replace(/<\/h([123])>/g, '</h$1>')
          .replace(/<ul>/g, '<ul>')
          .replace(/<\/ul>/g, '</ul>')
          .replace(/<li>/g, '<li>')
          .replace(/<\/li>/g, '</li>')
          .replace(/<p>/g, '<p>')
          .replace(/<\/p>/g, '</p>')
          .replace(/<strong>/g, '<strong>')
          .replace(/<\/strong>/g, '</strong>')
          .replace(/<hr \/>/g, '<hr />')
          .trim();
        
        console.log('✅ Extracted content from JSX');
        return extractedContent;
      }
    }
    
    console.log('⚠️ No content pattern found');
    return '';
  };

  const handleModeSwitch = (mode) => {
    if (mode === 'rich' && editorMode === 'code') {
      // Extract metadata and convert content when switching from code to rich
      const metadata = extractMetadataFromCode(formData.content);
      const richContent = convertCodeToRichText(formData.content);
      
      setFormData(prev => ({
        ...prev,
        ...metadata,
        content: richContent
      }));
    }
    setEditorMode(mode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPublishing(true);

    try {
      // If in code mode, extract metadata first
      let dataToSubmit = { ...formData };
      if (editorMode === 'code') {
        const metadata = extractMetadataFromCode(formData.content);
        const richContent = convertCodeToRichText(formData.content);
        dataToSubmit = {
          ...formData,
          ...metadata,
          content: richContent
        };
      }

      // Validate required fields including image
      if (!dataToSubmit.title || !dataToSubmit.content) {
        alert('Title and content are required');
        setIsPublishing(false);
        return;
      }

      if (!uploadedImageUrl && !editingPost) {
        alert('Featured image is required. Please upload an image before publishing.');
        setIsPublishing(false);
        return;
      }

      // Generate slug if not provided
      if (!dataToSubmit.slug) {
        dataToSubmit.slug = dataToSubmit.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
      }

      // Set default date if not provided
      if (!dataToSubmit.date) {
        dataToSubmit.date = new Date().toISOString().split('T')[0];
      }

      // Set default author if not provided
      if (!dataToSubmit.author) {
        dataToSubmit.author = 'Maia';
      }

      // Add uploaded image URL to the post data
      if (uploadedImageUrl) {
        dataToSubmit.imageUrl = uploadedImageUrl;
      }

      // Convert to posts array format for API
      const postData = {
        posts: [dataToSubmit]
      };

      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert('Post published successfully!');
        resetForm();
        fetchPosts();
        } else {
            const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error publishing post:', error);
      alert('Error publishing post');
    } finally {
      setIsPublishing(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      date: '',
      image: null,
      tags: []
    });
    setIsCreating(false);
    setEditingPost(null);
    setEditorMode('rich');
    setImagePreview(null);
    setUploadedImageUrl(null);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      author: post.author || '',
      date: post.date || '',
      image: null,
      tags: post.tags || []
    });
    setIsCreating(true);
    setEditorMode('rich');
  };

  const handleDelete = async (post) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar el post "${post.title}"?\n\nEsta acción no se puede deshacer.`
    );
    
    if (!confirmed) return;

    try {
      const response = await fetch('/api/blog/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug: post.slug })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete post');
      }

      // Remove the post from the local state
      setPosts(posts => posts.filter(p => p.slug !== post.slug));
      alert('Post eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error al eliminar el post: ' + error.message);
    }
  };

    return (
    <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Admin</h1>
          <p className="mt-2 text-gray-600">Manage your blog posts</p>
      </div>

        {!isCreating ? (
            <div>
            <div className="mb-6">
          <button
                onClick={() => setIsCreating(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create New Post
          </button>
          </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.slug}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        <div className="text-sm text-gray-500">{post.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {post.date}
                      </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                          onClick={() => handleEdit(post)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
        >
                          Edit
        </button>
                  <button
                          onClick={() => handleDelete(post)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
        </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
              <div className="flex space-x-2">
                  <button
                  onClick={() => handleModeSwitch('rich')}
                  className={`px-3 py-1 rounded ${
                    editorMode === 'rich' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  Rich Text
                  </button>
                  <button
                  onClick={() => handleModeSwitch('code')}
                  className={`px-3 py-1 rounded ${
                    editorMode === 'code' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  Code
          </button>
          <button
                  onClick={resetForm}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
                  Cancel
                  </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image upload - required for both modes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image *
                </label>
            <input
              type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  disabled={isUploadingImage}
                  required
                />
                {isUploadingImage && (
                  <p className="text-sm text-blue-600 mt-2">
                    🗜️ Comprimiendo y subiendo imagen...
                  </p>
                )}
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-green-600 mb-2">✅ Imagen subida exitosamente</p>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-w-xs h-32 object-cover rounded-md border"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      URL: {uploadedImageUrl}
                    </p>
          </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {editorMode === 'code' 
                    ? 'Sube la imagen del post. Los metadatos se extraerán automáticamente del código.'
                    : 'La imagen será comprimida automáticamente y convertida a JPEG'
                  }
                </p>
        </div>

              {editorMode === 'rich' && (
                <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-md"
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
                      className="w-full p-3 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt
                      </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows="3"
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
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                  </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                      </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                {editorMode === 'rich' ? (
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                  />
                                 ) : (
                     <textarea
                       value={formData.content}
                       onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md font-mono text-sm"
                    rows="20"
                    placeholder="Paste your Next.js blog post code here..."
                  />
                 )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isPublishing}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {isPublishing ? 'Publishing...' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
