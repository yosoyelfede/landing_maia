"use client";

import React from 'react';
import Link from 'next/link';
import { getAssetPath } from '../lib/assetUtils';
import FAQCTA from './FAQCTA';
import { useLanguage } from '../lib/LanguageContext';
import translations from '../lib/translations';

export default function BlogSection() {
  const { language } = useLanguage();
  const content = translations.blogSection[language];
  
  return (
    <>
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
          
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl overflow-hidden border-2 border-gray-300 transition-all hover:border-gray-400">
              <Link href="/blog/render-vs-recorrido-virtual">
                <div className="md:flex">
                  <div className="md:w-1/3 h-64 md:h-auto relative">
                    <img
                      src={getAssetPath("/images/blog/render-vs-recorrido.png")}
                      alt={content.blogPosts.renderVsVirtualTour.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="uppercase tracking-wide text-sm text-primary-600 font-semibold">{content.categories.realEstateTech}</div>
                    <h3 className="mt-2 text-xl font-bold leading-tight">{content.blogPosts.renderVsVirtualTour.title}</h3>
                    <p className="mt-2 text-gray-600">{content.blogPosts.renderVsVirtualTour.description}</p>
                    <div className="mt-4 flex items-center">
                      <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">{content.tags.virtualTours}</span>
                      <span className="mx-2 text-gray-500">·</span>
                      <span className="text-sm text-gray-500">{content.readingTime.replace('{minutes}', '5')}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 