"use client";

import { useLanguage } from '../lib/LanguageContext';
import translations from '../lib/translations';

export default function Hero() {
  const { language } = useLanguage();
  const hero = translations.hero[language];
  
  return (
    <section id="inicio" className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>
      
      {/* Círculos decorativos con animaciones mejoradas */}
      <div className="absolute top-20 -left-28 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      <div className="absolute top-40 -right-28 w-80 h-80 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-40 left-1/4 w-64 h-64 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float" style={{ animationDelay: '2.2s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8 animate-fade-in-up"
              dangerouslySetInnerHTML={{ 
                __html: hero.heading.replace('<span>', '<span class="text-primary-500 relative"><span class="absolute bottom-1 left-0 w-full h-2 bg-secondary-200 opacity-50 -z-10"></span>') 
                                 .replace('</span>', '</span>')
              }}>
          </h1>
          <p className="text-xl md:text-2xl font-normal text-gray-600 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {hero.description}
          </p>
          
          {/* CTA mejorado con efectos de hover */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a 
              href="mailto:fede@maiavr.cl" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-xl text-lg font-medium transition-all duration-300 shadow-soft hover:shadow-strong transform hover:-translate-y-1 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
            >
              {hero.cta}
            </a>
          </div>
        </div>
        
        {/* Demo interactivo en un "dispositivo" con efectos mejorados */}
        <div id="demo" className="relative max-w-5xl mx-auto transform hover:-translate-y-2 transition-all duration-500">
          <div className="bg-gradient-to-tr from-gray-800 to-gray-900 p-4 rounded-2xl shadow-strong mx-auto">
            <div className="flex items-center justify-start mb-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <iframe 
              src="https://maiavr.s3.sa-east-1.amazonaws.com/demo.html"
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
    </section>
  );
}