'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';
import FinalCTA from '../../../components/FinalCTA';
import TrustedBy from '../../../components/TrustedBy';
import FAQCTA from '../../../components/FAQCTA';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        // First try to fetch from the published JSON file
        const response = await fetch('/data/blog-posts.json');
        if (response.ok) {
          const publishedPosts = await response.json();
          const foundPost = publishedPosts.find(p => p.slug === params.slug);
          if (foundPost) {
            setPost(foundPost);
            setLoading(false);
            return;
          }
        }
        
        // Fallback to localStorage if not found in published posts
        const { getBlogPostBySlug } = await import('../../../lib/clientDb');
        const foundPost = getBlogPostBySlug(params.slug);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
      } catch (error) {
        console.error('Error loading post:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      loadPost();
    }
  }, [params.slug]);

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
              {post.content.includes('export default') ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-yellow-800">Code Component</span>
                  </div>
                  <p className="text-sm text-yellow-700 mb-3">
                    This post contains Next.js component code. For full functionality, you may need to create a separate component file.
                  </p>
                  <details className="text-sm">
                    <summary className="cursor-pointer text-yellow-800 hover:text-yellow-900 font-medium">
                      View Code
                    </summary>
                    <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
                      <code>{post.content}</code>
                    </pre>
                  </details>
                </div>
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
