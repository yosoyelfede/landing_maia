'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getAssetPath } from '../../lib/assetUtils';
import FinalCTA from '../../components/FinalCTA';
import TrustedBy from '../../components/TrustedBy';
import FAQCTA from '../../components/FAQCTA';
import LanguageSelector from '../../components/LanguageSelector';
import { useLanguage } from '../../lib/LanguageContext';
import translations from '../../lib/translations';

export default function BlogPage() {
  const { language } = useLanguage();
  const content = translations.blog[language];
  const blogPosts = content.posts;
  
  return (
    <main>
      <LanguageSelector />
      <Navbar />
      
      {/* Hero section con fondo similar al landing */}
      <section className="relative py-20 pb-8 md:py-24 md:pb-10 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
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
      
      {/* Posts section con fondo gris */}
      <section className="py-4 md:py-6 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-3xl mx-auto">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-xl overflow-hidden border-2 border-gray-300 hover:border-gray-400 transition-colors duration-300">
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-64 relative overflow-hidden bg-gray-100">
                    <img 
                      src={getAssetPath("/images/blog/render-vs-recorrido.png")} 
                      alt={post.title} 
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{objectPosition: '50% 50%'}}
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{content.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Wrapper section para FAQCTA */}
      <section>
        <FAQCTA />
      </section>
      
      <FinalCTA />
      <TrustedBy />
      <Footer />
    </main>
  );
} 