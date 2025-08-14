'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';
import FinalCTA from '../../../components/FinalCTA';
import TrustedBy from '../../../components/TrustedBy';
import FAQCTA from '../../../components/FAQCTA';

// Dynamic component renderer for Next.js components
function DynamicComponentRenderer({ content }) {
  const [renderedContent, setRenderedContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Parse the component content
      const { metadata, jsxContent } = parseComponentContent(content);
      
      if (!metadata || !jsxContent) {
        setError('Could not parse component content');
        return;
      }

      // Replace template variables with actual values
      let processedJsx = jsxContent;
      Object.keys(metadata).forEach(key => {
        const regex = new RegExp(`{metadata\\.${key}}`, 'g');
        processedJsx = processedJsx.replace(regex, metadata[key] || '');
      });

      // Convert JSX to HTML
      const htmlContent = convertJsxToHtml(processedJsx);
      setRenderedContent(htmlContent);
    } catch (err) {
      console.error('Error rendering component:', err);
      setError(err.message);
    }
  }, [content]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span className="text-sm font-medium text-red-800">Component Error</span>
        </div>
        <p className="text-sm text-red-700 mb-3">
          Error rendering component: {error}
        </p>
        <details className="text-sm">
          <summary className="cursor-pointer text-red-800 hover:text-red-900 font-medium">
            View Code
          </summary>
          <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
            <code>{content}</code>
          </pre>
        </details>
      </div>
    );
  }

  if (!renderedContent) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: renderedContent }}
      className="text-gray-800 leading-relaxed"
    />
  );
}

// Parse component content to extract metadata and JSX
function parseComponentContent(content) {
  // First, unescape the content
  const unescapedContent = content
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/\\t/g, '\t');

  // Extract metadata object - handle comments and multiline
  const metadataMatch = unescapedContent.match(/const metadata = ({[\s\S]*?});/);
  if (!metadataMatch) {
    return { metadata: null, jsxContent: null };
  }

  // Parse metadata object
  const metadataStr = metadataMatch[1];
  const metadata = {};
  
  // Extract all key-value pairs from the metadata object, handling comments
  const keyValueRegex = /(\w+):\s*"([^"]*)"(?:\s*\/\/[^]*?)?/g;
  let match;
  while ((match = keyValueRegex.exec(metadataStr)) !== null) {
    const [, key, value] = match;
    metadata[key] = value;
  }

  // Extract JSX content from return statement
  const jsxMatch = unescapedContent.match(/return\s*\(\s*([\s\S]*?)\s*\)\s*;?\s*}/);
  if (!jsxMatch) {
    return { metadata: null, jsxContent: null };
  }

  return {
    metadata,
    jsxContent: jsxMatch[1].trim()
  };
}

// Convert JSX to HTML
function convertJsxToHtml(jsx) {
  let html = jsx;
  
  // Remove JSX comments
  html = html.replace(/\/\*([^*]|\*[^/])*\*\//g, '');
  html = html.replace(/\/\/.*$/gm, '');
  
  // Convert className to class
  html = html.replace(/className=/g, 'class=');
  
  // Handle self-closing tags
  html = html.replace(/<(\w+)\s+([^>]*)\/>/g, '<$1 $2></$1>');
  
  // Remove JSX expressions that weren't replaced (like {metadata.xxx})
  html = html.replace(/{[^}]*}/g, '');
  
  // Normalize whitespace
  html = html.replace(/\s+/g, ' ').trim();
  
  return html;
}

function BlogPostViewerContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        // Fetch from the published JSON file with cache busting
        const response = await fetch('/data/blog-posts.json?t=' + Date.now());
        if (response.ok) {
          const publishedPosts = await response.json();
          const foundPost = publishedPosts.find(p => p.slug === slug);
          if (foundPost) {
            setPost(foundPost);
            setLoading(false);
            return;
          }
        }
        
        setError('Post not found');
      } catch (error) {
        console.error('Error loading post:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
            <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
            <a 
              href="/blog" 
              className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Blog
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      
      {/* Hero section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li><a href="/" className="hover:text-blue-600">Inicio</a></li>
                <li>/</li>
                <li><a href="/blog" className="hover:text-blue-600">Blog</a></li>
                <li>/</li>
                <li className="text-gray-900">{post.title}</li>
              </ol>
            </nav>

            {/* Post header */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-gray-600 mb-8">
                <span>By {post.author}</span>
                <span>{post.date}</span>
                <span className="uppercase">{post.language}</span>
              </div>
              {post.imageUrl && (
                <div className="relative h-96 rounded-xl overflow-hidden mb-8">
                  <img 
                    src={getAssetPath(post.imageUrl)} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <p className="text-xl text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
            </header>

            {/* Post content */}
            <article className="prose prose-lg max-w-none">
              {post.content && post.content.includes('export default') ? (
                <DynamicComponentRenderer content={post.content} />
              ) : (
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="text-gray-800 leading-relaxed"
                />
              )}
            </article>

            {/* Post footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Published on {post.date}</span>
                <a 
                  href="/blog" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Back to Blog
                </a>
              </div>
            </footer>
          </div>
        </div>
      </section>
      
      <FAQCTA />
      <FinalCTA />
      <TrustedBy />
      <Footer />
      
      <style jsx global>{`
        .prose {
          max-width: none;
        }
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
          color: #1f2937;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h1 {
          font-size: 2.25rem;
          line-height: 2.5rem;
        }
        .prose h2 {
          font-size: 1.875rem;
          line-height: 2.25rem;
        }
        .prose h3 {
          font-size: 1.5rem;
          line-height: 2rem;
        }
        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.75;
        }
        .prose ul, .prose ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 2rem 0;
          font-style: italic;
          color: #6b7280;
        }
        .prose img {
          border-radius: 0.5rem;
          margin: 2rem 0;
        }
        .prose a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .prose a:hover {
          color: #2563eb;
        }
      `}</style>
    </main>
  );
}

export default function BlogPostViewer() {
  return (
    <Suspense fallback={
      <main>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      </main>
    }>
      <BlogPostViewerContent />
    </Suspense>
  );
}
