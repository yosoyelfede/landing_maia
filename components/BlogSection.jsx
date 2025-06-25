"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { getAssetPath } from '../lib/assetUtils';
import FAQCTA from './FAQCTA';
import { useLanguage } from '../lib/LanguageContext';
import translations from '../lib/translations';

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
  
  // Get blog posts and sort them by date (newest first)
  const getBlogPosts = () => {
    // Extract all blog posts from translations
    const posts = [];
    
    // Add each blog post with its slug
    if (content.blogPosts.recorridoInteligente) {
      posts.push({
        slug: 'recorrido-inteligente',
        title: content.blogPosts.recorridoInteligente.title,
        description: content.blogPosts.recorridoInteligente.description,
        date: 'Junio 2025', // This should match the date in blog.posts
        image: "/images/blog/recorrido-inteligente.png"
      });
    }
    
    if (content.blogPosts.renderVsVirtualTour) {
      posts.push({
        slug: 'render-vs-recorrido-virtual',
        title: content.blogPosts.renderVsVirtualTour.title,
        description: content.blogPosts.renderVsVirtualTour.description,
        date: 'Junio 2025', // This should match the date in blog.posts
        image: "/images/blog/render-vs-recorrido.png"
      });
    }
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => {
      // Extract month and year
      const getMonthYear = (dateStr) => {
        const parts = dateStr.split(' ');
        const month = parts[0];
        const year = parseInt(parts[1]);
        // Convert month names to numbers
        const months = {
          'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4, 'Mayo': 5, 'Junio': 6,
          'Julio': 7, 'Agosto': 8, 'Septiembre': 9, 'Octubre': 10, 'Noviembre': 11, 'Diciembre': 12
        };
        return { month: months[month] || 0, year };
      };
      
      const dateA = getMonthYear(a.date);
      const dateB = getMonthYear(b.date);
      
      // Compare years first
      if (dateB.year !== dateA.year) {
        return dateB.year - dateA.year;
      }
      // If same year, compare months
      return dateB.month - dateA.month;
    });
  };
  
  const sortedPosts = getBlogPosts();
  
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
                {sortedPosts.map((post, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden border-2 border-gray-300 transition-all hover:border-gray-400 h-full">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="flex flex-col h-full">
                        <div className="h-48 relative">
                          <img
                            src={getAssetPath(post.image)}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="uppercase tracking-wide text-sm text-primary-600 font-semibold">{content.categories.realEstateTech}</div>
                          <h3 className="mt-2 text-xl font-bold leading-tight">{post.title}</h3>
                          <p className="mt-2 text-gray-600 flex-grow">{post.description}</p>
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
                          setActiveIndex(prev => prev === sortedPosts.length - 1 ? 0 : prev + 1);
                        } else {
                          // Swiped right - show previous
                          setActiveIndex(prev => prev === 0 ? sortedPosts.length - 1 : prev - 1);
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
                  {sortedPosts.map((post, index) => (
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
                      <Link href={`/blog/${post.slug}`}>
                        <div className="flex flex-col">
                          <div className="h-48 relative">
                            <img
                              src={getAssetPath(post.image)}
                              alt={post.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6">
                            <div className="uppercase tracking-wide text-sm text-primary-600 font-semibold">{content.categories.realEstateTech}</div>
                            <h3 className="mt-2 text-xl font-bold leading-tight">{post.title}</h3>
                            <p className="mt-2 text-gray-600">{post.description}</p>
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
            {sortedPosts.length > 1 && (
              <div className="flex justify-center mt-8 gap-2 md:hidden">
                {sortedPosts.map((_, index) => (
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