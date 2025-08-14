"use client";

import { useLanguage } from '../lib/LanguageContext';
import translations from '../lib/translations';

export default function FinalCTA({ source = 'global' }) {
  const { language } = useLanguage();
  
  // Always use the global finalCTA for consistency
  const content = translations.finalCTA[language];
  
  const heading = content.heading;
  const description = content.description;
  const buttonText = content.ctaButton;
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Fondos y decoraciones */}
      <div className="absolute inset-0 bg-primary-900/95 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-300/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-300/50 to-transparent"></div>
      
      {/* Círculos decorativos */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary-500/20 mix-blend-overlay filter blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary-400/20 mix-blend-overlay filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {heading}
          </h2>
          
          <p className="text-lg sm:text-xl text-primary-100 mb-10">
            {description}
          </p>
          
          <div className="flex justify-center">
            <a 
              href="mailto:manuel@maiavr.cl?subject=¡Quiero%20probar%20Maia!&body=Me%20interesa%20saber%20más%20y%20probar%20Maia,%20quiero%20agendar%20una%20demo" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-secondary-200 text-primary-900 rounded-xl text-lg font-medium hover:bg-secondary-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}