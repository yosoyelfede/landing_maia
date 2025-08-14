'use client';

import { getAssetPath } from '../lib/assetUtils';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import translations from '../lib/translations';

export default function KeyValues() {
  const { language } = useLanguage();
  const content = translations.keyValues[language];
  
  return (
    <section id="features" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6 text-gray-900"
              dangerouslySetInnerHTML={{ 
                __html: content.heading
              }}>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {content.description}
          </p>
          
          {/* Botón CTA hacia la página de cómo funciona */}
          <div className="flex justify-center mb-16">
            <Link 
              href="/como-funciona" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-xl text-lg font-medium transition-all duration-300 shadow-soft hover:shadow-strong transform hover:-translate-y-1 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
            >
              {content.ctaButton}
            </Link>
          </div>
        </div>

        {/* Feature 1 - Imagen a la izquierda */}
        <div className="grid md:grid-cols-2 gap-0 items-center mb-24 rounded-2xl overflow-hidden bg-white border-2 border-gray-300 transition-all duration-300 hover:bg-secondary-200 hover:bg-opacity-50 hover:border-gray-400">
          <div className="relative h-full min-h-[400px] md:min-h-[500px] bg-gray-100">
            <img 
              src={getAssetPath("/images/feature/feature-1.jpg")} 
              alt={content.features[0].imgAlt} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-600/20 to-primary-900/30 mix-blend-multiply"></div>
          </div>
          <div className="p-8 lg:p-12">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-primary-100 text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-gray-900">{content.features[0].title}</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {content.features[0].description}
            </p>
            <ul className="space-y-4">
              {content.features[0].benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-secondary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feature 2 - Imagen a la derecha */}
        <div className="grid md:grid-cols-2 gap-0 items-center mb-24 rounded-2xl overflow-hidden bg-white border-2 border-gray-300 transition-all duration-300 hover:bg-secondary-200 hover:bg-opacity-50 hover:border-gray-400">
          <div className="order-1 md:order-2 relative h-full min-h-[400px] md:min-h-[500px] bg-gray-100">
            <img 
              src={getAssetPath("/images/feature/feature-2.jpg")} 
              alt={content.features[1].imgAlt} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-600/20 to-secondary-900/30 mix-blend-multiply"></div>
          </div>
          <div className="order-2 md:order-1 p-8 lg:p-12">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-secondary-100 text-secondary-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-gray-900">{content.features[1].title}</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {content.features[1].description}
            </p>
            <ul className="space-y-4">
              {content.features[1].benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-secondary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feature 3 - Imagen a la izquierda */}
        <div className="grid md:grid-cols-2 gap-0 items-center rounded-2xl overflow-hidden bg-white border-2 border-gray-300 transition-all duration-300 hover:bg-secondary-200 hover:bg-opacity-50 hover:border-gray-400">
          <div className="relative h-full min-h-[400px] md:min-h-[500px] bg-gray-100">
            <img 
              src={getAssetPath("/images/feature/feature-3.jpg")} 
              alt={content.features[2].imgAlt} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-accent-600/20 to-accent-900/30 mix-blend-multiply"></div>
          </div>
          <div className="p-8 lg:p-12">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-accent-100 text-accent-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-gray-900">{content.features[2].title}</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {content.features[2].description}
            </p>
            <ul className="space-y-4">
              {content.features[2].benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-secondary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}