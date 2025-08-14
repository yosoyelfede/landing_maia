'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getAssetPath } from '../../lib/assetUtils';
import FinalCTA from '../../components/FinalCTA';
import TrustedBy from '../../components/TrustedBy';
import FAQCTA from '../../components/FAQCTA';

import { useLanguage } from '../../lib/LanguageContext';
import translations from '../../lib/translations';
import { sortPostsByDate } from '../../lib/dateUtils';

export default function BlogPage() {
  const { language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll detection to match navbar behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10); // Same threshold as navbar
    };

    // Set initial state based on current scroll position
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  // Load blog posts from published JSON file first, then fallback to static posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        // First try to fetch from the published JSON file (contains all posts) with cache busting
        const response = await fetch('/data/blog-posts.json?t=' + Date.now());
        if (response.ok) {
          const publishedPosts = await response.json();
          if (publishedPosts && publishedPosts.length > 0) {
            // Sort by date (newest first) using proper date parsing
            const sortedPosts = sortPostsByDate(publishedPosts, true);
            setBlogPosts(sortedPosts);
            setLoading(false);
            return;
          }
        }
        
        // Fallback to static posts from translations
        const content = translations.blog[language];
        const staticPosts = [...content.posts].sort((a, b) => {
          // Extract day, month and year from date strings
          const getDateComponents = (dateStr) => {
            const parts = dateStr.split(' ');
            // Handle both formats: "17 Julio 2025" and "July 17, 2025"
            let day, month, year;
            
            if (parts.length === 3) {
              // Format: "17 Julio 2025"
              day = parseInt(parts[0]);
              month = parts[1];
              year = parseInt(parts[2]);
            } else if (parts.length === 4) {
              // Format: "July 17, 2025"
              month = parts[0];
              day = parseInt(parts[1].replace(',', ''));
              year = parseInt(parts[3]);
            } else {
              // Fallback for old format: "Julio 2025"
              day = 1;
              month = parts[0];
              year = parseInt(parts[1]);
            }
            
            // Convert month names to numbers for comparison
            const months = {
              'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4, 'Mayo': 5, 'Junio': 6,
              'Julio': 7, 'Agosto': 8, 'Septiembre': 9, 'Octubre': 10, 'Noviembre': 11, 'Diciembre': 12,
              'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
              'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
            };
            
            return { 
              day: day || 1, 
              month: months[month] || 0, 
              year: year || 0 
            };
          };
          
          const dateA = getDateComponents(a.date);
          const dateB = getDateComponents(b.date);
          
          // Compare years first (newest first)
          if (dateB.year !== dateA.year) {
            return dateB.year - dateA.year;
          }
          
          // If same year, compare months (newest first)
          if (dateB.month !== dateA.month) {
            return dateB.month - dateA.month;
          }
          
          // If same month and year, compare days (newest first)
          if (dateB.day !== dateA.day) {
            return dateB.day - dateA.day;
          }
          
          // If same day, month and year, maintain order based on original array position
          // (posts earlier in array are newer)
          const indexA = content.posts.indexOf(a);
          const indexB = content.posts.indexOf(b);
          return indexA - indexB;
        });
        
        setBlogPosts(staticPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        // Fallback to empty array
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [language]);

  // Dynamic padding for the header - adjusted for new navbar size
  const headerPadding = isScrolled
    ? "py-20 pb-8 md:py-24 md:pb-10" // Normal padding when scrolled (navbar is normal size)
    : "py-24 pb-8 md:py-28 md:pb-10"; // Extra padding when not scrolled (navbar is slightly larger)

  const content = translations.blog[language];
  
  // Helper function to get the correct image for each blog post
  const getBlogImage = (post) => {
    // If the post has an imageUrl from the CMS, use it
    if (post.imageUrl) {
      return post.imageUrl;
    }
    
    // Otherwise, use the static mapping for existing posts
    switch(post.slug) {
      case 'que-deberia-hacer-una-inmobiliaria':
        return "/images/blog/que-deberia-hacer-una-inmobiliaria.jpg";
      case 'metricas-recorrido-virtual':
        return "/images/blog/metricas-recorrido-virtual.jpg";
      case 'leads-no-calificados':
        return "/images/blog/leads-no-calificados.jpg";
      case 'nadie-quiere-dejar-sus-datos':
        return "/images/blog/nadie-quiere-dejar-sus-datos.jpg";
      case 'para-que-sirve-un-recorrido-virtual':
        return "/images/blog/para-que-sirve-un-recorrido-virtual.png";
      case 'recorridos-que-venden':
        return "/images/blog/recorridos-que-venden.png";
      case 'recorrido-inteligente':
        return "/images/blog/recorrido-inteligente.png";
      case 'render-vs-recorrido-virtual':
        return "/images/blog/render-vs-recorrido.png";
      default:
        return "/images/blog/default.jpg";
    }
  };

  // Show loading state
  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-xl">Loading blog posts...</div>
        </div>
      </main>
    );
  }

  // Group posts into grids of 6 (3x2)
  const postsPerGrid = 6;
  const postGrids = [];
  for (let i = 0; i < blogPosts.length; i += postsPerGrid) {
    postGrids.push(blogPosts.slice(i, i + postsPerGrid));
  }
  
  return (
    <main>
      <Navbar />
      
      {/* Hero section con fondo similar al landing */}
      <section className={`relative ${headerPadding} overflow-hidden bg-gradient-to-b from-gray-50 to-white transition-all duration-500 ease-in-out`}>
        {/* Background pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>
        
        {/* Círculos decorativos con animaciones */}
        <div className="absolute top-20 -left-28 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 -right-28 w-80 h-80 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-0">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8 animate-fade-in-up"
                dangerouslySetInnerHTML={{ __html: content.title }}>
            </h1>
            <p className="text-xl md:text-2xl font-normal text-gray-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}
               dangerouslySetInnerHTML={{ __html: content.description }}>
            </p>
          </div>
        </div>
      </section>
      
      {/* Posts section with horizontal scrolling grids */}
      <section className="py-4 md:py-6 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Horizontal scroll container */}
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="flex gap-8" style={{ width: `${postGrids.length * 100}%` }}>
              {postGrids.map((grid, gridIndex) => (
                <div 
                  key={gridIndex} 
                  className="flex-shrink-0" 
                  style={{ width: `${100 / postGrids.length}%` }}
                >
                  {/* Dynamic grid based on number of posts in this grid */}
                  <div className={`grid gap-6 max-w-6xl mx-auto ${
                    grid.length === 1 ? 'grid-cols-1 md:grid-cols-1' :
                    grid.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                    grid.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
                    grid.length === 4 ? 'grid-cols-1 md:grid-cols-2' :
                    grid.length === 5 ? 'grid-cols-1 md:grid-cols-3' :
                    'grid-cols-1 md:grid-cols-3'
                  } ${
                    grid.length >= 4 ? 'md:grid-rows-2' : ''
                  }`}>
                    {grid.map((post, index) => (
                      <article key={`${gridIndex}-${index}`} className="bg-white rounded-xl overflow-hidden border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-lg cursor-pointer" onClick={() => window.open(`/blog/view?slug=${post.slug}`, '_blank')}>
                        <div className="h-48 relative overflow-hidden bg-gray-100">
                          <img 
                            src={getAssetPath(getBlogImage(post))} 
                            alt={post.title} 
                            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            style={{objectPosition: '50% 50%'}}
                          />
                        </div>
                        <div className="p-4">
                          <h2 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{post.excerpt}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>{post.author || content.author}</span>
                            <span>{post.date}</span>
                          </div>

                        </div>
                      </article>
                    ))}
                  </div>
                  
                  {/* Grid indicator dots */}
                  {postGrids.length > 1 && (
                    <div className="flex justify-center mt-8 gap-2">
                      {postGrids.map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            gridIndex === dotIndex ? 'bg-primary-500 w-6' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Horizontal scroll indicators (only show if multiple grids) */}
          {postGrids.length > 1 && (
            <div className="text-center mt-4 text-sm text-gray-500">
              {language === 'es' ? 'Desliza para ver más artículos' : 'Scroll to see more articles'}
            </div>
          )}
        </div>
      </section>
      
      {/* Wrapper section para FAQCTA */}
      <section>
        <FAQCTA />
      </section>
      
      <FinalCTA />
      <TrustedBy />
      <Footer />
      
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
} 