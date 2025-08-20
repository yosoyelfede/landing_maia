"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { getAssetPath } from '../lib/assetUtils';
import FAQCTA from './FAQCTA';
import { useLanguage } from '../lib/LanguageContext';
import translations from '../lib/translations';
import { sortPostsByDate } from '../lib/dateUtils';

// Add custom styles for hiding scrollbar
const scrollbarStyles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Forzar ocultamiento de scrollbar en todos los contextos */
  .force-hide-scroll {
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
  }
  
  .force-hide-scroll::-webkit-scrollbar { 
    width: 0 !important;
    height: 0 !important;
    display: none !important;
  }
`;

export default function BlogSection() {
  const { language } = useLanguage();
  const content = translations.blogSection[language];
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const loadPosts = async () => {
      try {
        // First try to fetch from the published JSON file with cache busting
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
        const posts = [];
        
        // Add each blog post with its slug
        if (content.blogPosts.queDeberiaHacerUnaInmobiliaria) {
          posts.push({
            slug: 'que-deberia-hacer-una-inmobiliaria',
            title: content.blogPosts.queDeberiaHacerUnaInmobiliaria.title,
            excerpt: content.blogPosts.queDeberiaHacerUnaInmobiliaria.description,
            date: '12 Agosto 2025',
            imageUrl: "/images/blog/que-deberia-hacer-una-inmobiliaria.jpg"
          });
        }
        
        if (content.blogPosts.metricasRecorridoVirtual) {
          posts.push({
            slug: 'metricas-recorrido-virtual',
            title: content.blogPosts.metricasRecorridoVirtual.title,
            excerpt: content.blogPosts.metricasRecorridoVirtual.description,
            date: '6 Agosto 2025',
            imageUrl: "/images/blog/metricas-recorrido-virtual.jpg"
          });
        }
        
        if (content.blogPosts.leadsNoCalificados) {
          posts.push({
            slug: 'leads-no-calificados',
            title: content.blogPosts.leadsNoCalificados.title,
            excerpt: content.blogPosts.leadsNoCalificados.description,
            date: '30 Julio 2025',
            imageUrl: "/images/blog/leads-no-calificados.jpg"
          });
        }
        
        if (content.blogPosts.nadieQuiereDejarSusDatos) {
          posts.push({
            slug: 'nadie-quiere-dejar-sus-datos',
            title: content.blogPosts.nadieQuiereDejarSusDatos.title,
            excerpt: content.blogPosts.nadieQuiereDejarSusDatos.description,
            date: '23 Julio 2025',
            imageUrl: "/images/blog/nadie-quiere-dejar-sus-datos.jpg"
          });
        }
        
        if (content.blogPosts.paraQueSirveUnRecorridoVirtual) {
          posts.push({
            slug: 'para-que-sirve-un-recorrido-virtual',
            title: content.blogPosts.paraQueSirveUnRecorridoVirtual.title,
            excerpt: content.blogPosts.paraQueSirveUnRecorridoVirtual.description,
            date: '16 Julio 2025',
            imageUrl: "/images/blog/para-que-sirve-un-recorrido-virtual.png"
          });
        }
        
        if (content.blogPosts.recorridosQueVenden) {
          posts.push({
            slug: 'recorridos-que-venden',
            title: content.blogPosts.recorridosQueVenden.title,
            excerpt: content.blogPosts.recorridosQueVenden.description,
            date: '9 Julio 2025',
            imageUrl: "/images/blog/recorridos-que-venden.png"
          });
        }
        
        if (content.blogPosts.recorridoInteligente) {
          posts.push({
            slug: 'recorrido-inteligente',
            title: content.blogPosts.recorridoInteligente.title,
            excerpt: content.blogPosts.recorridoInteligente.description,
            date: '2 Julio 2025',
            imageUrl: "/images/blog/recorrido-inteligente.png"
          });
        }
        
        if (content.blogPosts.renderVsVirtualTour) {
          posts.push({
            slug: 'render-vs-recorrido-virtual',
            title: content.blogPosts.renderVsVirtualTour.title,
            excerpt: content.blogPosts.renderVsVirtualTour.description,
            date: '25 Junio 2025',
            imageUrl: "/images/blog/render-vs-recorrido.png"
          });
        }
        
        // Sort posts by date (newest first)
        const sortedPosts = posts.sort((a, b) => {
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
          return posts.indexOf(a) - posts.indexOf(b);
        });
        
        setBlogPosts(sortedPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [content.blogPosts]);
  
  const sortedPosts = blogPosts;
  
  // Limit to only the 3 most recent posts for the landing page
  const recentPosts = sortedPosts.slice(0, 3);
  
  if (loading) {
    return (
      <>
        <style jsx global>{scrollbarStyles}</style>
        <section>
          <FAQCTA />
        </section>
        
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">{content.heading}</h2>
              <p className="text-gray-600 mt-2">{content.description}</p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="animate-pulse">
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-xl overflow-hidden border-2 border-gray-300 h-full">
                      <div className="h-48 bg-gray-300"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-6 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  
  return (
    <>
      <style jsx global>{scrollbarStyles}</style>
      {/* Wrapper section para FAQCTA */}
      <section>
        <FAQCTA />
      </section>
      
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">{content.heading}</h2>
            <p className="text-gray-600 mt-2">{content.description}</p>
          </div>
          
          <div className="max-w-6xl mx-auto relative">
            {/* Blog posts container - grid on web, swipeable on mobile */}
            <div className="relative">
              {/* Desktop view - grid layout with no scrolling */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden border-2 border-gray-300 transition-all hover:border-gray-400 h-full">
                    <Link href={`/blog/view?slug=${post.slug}`}>
                      <div className="flex flex-col h-full">
                        <div className="h-48 relative">
                          <img
                            src={getAssetPath(post.imageUrl || post.image)}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="uppercase tracking-wide text-sm text-primary-600 font-semibold">{content.categories.realEstateTech}</div>
                          <h3 className="mt-2 text-xl font-bold leading-tight">{post.title}</h3>
                          <p className="mt-2 text-gray-600 flex-grow">{post.excerpt || post.description}</p>
                          <div className="mt-4 flex items-center">
                            <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">{content.tags.virtualTours}</span>
                            <span className="mx-2 text-gray-500">·</span>
                            <span className="text-sm text-gray-500">{content.readingTime.replace('{minutes}', index === 0 ? '4' : '5')}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              
              {/* Mobile view - swipe only with no arrows */}
              <div className="md:hidden relative">
                <div
                  className="relative w-full"
                  onTouchStart={(e) => {
                    const touch = e.touches[0];
                    e.currentTarget.dataset.touchStartX = touch.clientX.toString();
                    e.currentTarget.dataset.touchStartY = touch.clientY.toString();
                    e.currentTarget.dataset.touchStartTime = Date.now().toString();
                  }}
                  onTouchMove={(e) => {
                    // Prevent default to avoid scrolling during swipe
                    if (e.currentTarget.dataset.isSwiping === "true") {
                      e.preventDefault();
                    }
                  }}
                  onTouchEnd={(e) => {
                    if (e.currentTarget.dataset.touchStartX && e.currentTarget.dataset.touchStartY) {
                      const touchStartX = parseFloat(e.currentTarget.dataset.touchStartX);
                      const touchStartY = parseFloat(e.currentTarget.dataset.touchStartY);
                      const touchStartTime = parseFloat(e.currentTarget.dataset.touchStartTime);
                      
                      // Get ending touch position from changedTouches
                      const touch = e.changedTouches[0];
                      const touchEndX = touch.clientX;
                      const touchEndY = touch.clientY;
                      
                      // Calculate distance and time
                      const distanceX = touchStartX - touchEndX;
                      const distanceY = Math.abs(touchStartY - touchEndY);
                      const elapsedTime = Date.now() - touchStartTime;
                      
                      // Only register as swipe if:
                      // 1. Horizontal movement is greater than vertical (to avoid triggering during scroll)
                      // 2. Movement is more than 50px or is fast enough
                      // 3. Swipe doesn't take too long (less than 300ms for quick swipe)
                      const isHorizontalSwipe = Math.abs(distanceX) > distanceY;
                      const isSignificantMove = Math.abs(distanceX) > 50 || (Math.abs(distanceX) > 30 && elapsedTime < 300);
                      
                      if (isHorizontalSwipe && isSignificantMove) {
                        if (distanceX > 0) {
                          // Swiped left - show next
                          setActiveIndex(prev => prev === recentPosts.length - 1 ? 0 : prev + 1);
                        } else {
                          // Swiped right - show previous
                          setActiveIndex(prev => prev === 0 ? recentPosts.length - 1 : prev - 1);
                        }
                      }
                    }
                    
                    // Reset swipe tracking
                    e.currentTarget.dataset.touchStartX = "";
                    e.currentTarget.dataset.touchStartY = "";
                    e.currentTarget.dataset.touchStartTime = "";
                    e.currentTarget.dataset.isSwiping = "false";
                  }}
                >
                  {recentPosts.map((post, index) => (
                    <div 
                      key={index} 
                      className={`bg-white rounded-xl overflow-hidden border-2 border-gray-300 transition-all duration-500 ${
                        activeIndex === index 
                          ? 'opacity-100 transform translate-x-0 z-10' 
                          : index < activeIndex
                            ? 'opacity-0 transform -translate-x-full absolute top-0 left-0 w-full' 
                            : 'opacity-0 transform translate-x-full absolute top-0 left-0 w-full'
                      }`}
                    >
                      <Link href={`/blog/view?slug=${post.slug}`}>
                        <div className="flex flex-col">
                          <div className="h-48 relative">
                            <img
                              src={getAssetPath(post.imageUrl || post.image)}
                              alt={post.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6">
                            <div className="uppercase tracking-wide text-sm text-primary-600 font-semibold">{content.categories.realEstateTech}</div>
                            <h3 className="mt-2 text-xl font-bold leading-tight">{post.title}</h3>
                            <p className="mt-2 text-gray-600">{post.excerpt || post.description}</p>
                            <div className="mt-4 flex items-center">
                              <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">{content.tags.virtualTours}</span>
                              <span className="mx-2 text-gray-500">·</span>
                              <span className="text-sm text-gray-500">{content.readingTime.replace('{minutes}', index === 0 ? '4' : '5')}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Dots indicators - only for mobile */}
            {recentPosts.length > 1 && (
              <div className="flex justify-center mt-8 gap-2 md:hidden">
                {recentPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeIndex === index 
                        ? 'bg-primary-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to post ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
} 