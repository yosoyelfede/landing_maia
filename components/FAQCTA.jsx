"use client";

import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import translations from '../lib/translations';

export default function FAQCTA() {
  const { language } = useLanguage();
  const content = translations.faqCTA[language];
  
  return (
    <section className="py-12 bg-gray-50 relative overflow-hidden">
      {/* Background pattern - Añadir el fondo con puntitos */}
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-secondary-100 rounded-xl overflow-hidden border-2 border-gray-300">
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.heading}</h3>
            <p className="text-gray-600 mb-6">{content.description}</p>
            <Link href="/preguntas-frecuentes" className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors duration-300">
              {content.ctaButton}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 