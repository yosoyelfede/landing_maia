'use client';

import { useState, useEffect } from 'react';
import { getAssetPath } from '../lib/assetUtils';

export default function BlogPreview() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // First try to fetch from the published JSON file
        const response = await fetch('/data/blog-posts.json');
        if (response.ok) {
          const publishedPosts = await response.json();
          if (publishedPosts && publishedPosts.length > 0) {
            // Sort by date (newest first)
            const sortedPosts = publishedPosts.sort((a, b) => {
              const dateA = new Date(a.date || 0);
              const dateB = new Date(b.date || 0);
              return dateB - dateA;
            });
            setBlogPosts(sortedPosts);
            setLoading(false);
            return;
          }
        }
        
        // Fallback to localStorage if no published posts
        const { getBlogPosts } = await import('../lib/clientDb');
        const posts = getBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Get the most recent post
  const featuredPost = blogPosts[0];

  if (loading) {
    return (
      <section className="py-12 bg-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!featuredPost) {
    return (
      <section className="py-12 bg-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Novedades
            </h2>
            <p className="text-xl text-gray-600">
              No hay artículos disponibles en este momento
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-200">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Novedades
          </h2>
          <p className="text-xl text-gray-600">
            Lee lo último de nuestro blog
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-60 relative overflow-hidden">
              <img 
                src={getAssetPath(featuredPost.imageUrl || '/images/blog/default.jpg')} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900">{featuredPost.title}</h3>
              <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{featuredPost.author}</span>
                <span>{featuredPost.date}</span>
              </div>
            </div>
          </article>
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="/blog" 
            className="inline-block px-6 py-3 border-2 border-[#0a1860] text-[#0a1860] rounded-lg font-medium hover:bg-[#0a1860] hover:text-white transition-colors duration-200"
          >
            Ver todos los artículos
          </a>
        </div>
      </div>
    </section>
  );
} 