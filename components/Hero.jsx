"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import translations from '../lib/translations';

export default function Hero() {
  const { language } = useLanguage();
  const hero = translations.hero[language];
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Dynamic padding for the content - increased top padding to set the standard for all pages
  const contentPadding = isScrolled
    ? "pt-40 pb-20 md:pt-44 md:pb-24" // Increased top padding when scrolled 
    : "pt-44 pb-20 md:pt-48 md:pb-24"; // Increased top padding when not scrolled
  
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>
      
      {/* Decorative circles with animations */}
      <div className="absolute top-20 -left-28 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      <div className="absolute top-40 -right-28 w-80 h-80 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="container relative z-10">
        <div className={`${contentPadding} transition-all duration-500 ease-in-out`}>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 animate-fade-in-up"
                dangerouslySetInnerHTML={{ 
                  __html: hero.heading.replace('<span>', '<span class="text-primary-500 relative">') 
                                   .replace('</span>', '<span class="absolute bottom-1 left-0 w-full h-2 bg-secondary-200 opacity-50 -z-10"></span></span>')
                }}>
            </h1>
            <p className="text-xl md:text-2xl font-normal text-gray-600 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {hero.description}
            </p>
            
            {/* CTA mejorado con efectos de hover */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a 
                href="mailto:manuel@maiavr.cl?subject=¡Quiero%20probar%20Maia!&body=Me%20interesa%20saber%20más%20y%20probar%20Maia,%20quiero%20agendar%20una%20demo" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-xl text-lg font-medium transition-all duration-300 shadow-soft hover:shadow-strong transform hover:-translate-y-1 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
              >
                {hero.cta}
              </a>
            </div>
          </div>
          
          {/* Demo interactivo en un "dispositivo" con efectos mejorados */}
          <div id="demo" className="relative w-full transform hover:-translate-y-2 transition-all duration-500">
            <div className="bg-gradient-to-tr from-gray-800 to-gray-900 p-4 rounded-2xl shadow-strong mx-auto">
              <div className="flex items-center justify-start mb-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <iframe 
                src="https://maiavr.s3.sa-east-1.amazonaws.com/lift/3d.html"
                width="100%"
                height="600"
                style={{ borderRadius: '8px' }}
                title={hero.demoTitle}
                className="bg-white shadow-inner"
                allow="xr-spatial-tracking *; microphone *;"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Decoración bajo el demo */}
          </div>
        </div>
      </div>
    </section>
  );
}