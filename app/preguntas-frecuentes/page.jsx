'use client';

import { useState, useEffect } from 'react';
import { Accordion, AccordionItem } from '../../components/ui/accordion';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TrustedBy from "../../components/TrustedBy";
import FinalCTA from "../../components/FinalCTA";

import { useLanguage } from '../../lib/LanguageContext';
import translations from '../../lib/translations';

export default function PreguntasFrecuentes() {
  const { language } = useLanguage();
  const content = translations.faq[language];
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

  // Dynamic padding for the header - increased significantly to match blog page title position
  const headerPadding = isScrolled
    ? "py-32 pb-8 md:py-36 md:pb-10" // Normal padding when scrolled (navbar is normal size)
    : "py-36 pb-8 md:py-40 md:pb-10"; // Extra padding when not scrolled (navbar is slightly larger)
  
  return (
    <>
      <Navbar />
      <div className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-20 -left-28 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 -right-28 w-80 h-80 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        <div className={`max-w-4xl mx-auto px-4 ${headerPadding} relative z-10 text-center transition-all duration-500 ease-in-out`}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8 animate-fade-in-up"
              dangerouslySetInnerHTML={{ __html: content.title }}>
          </h1>
          <p className="text-xl md:text-2xl font-normal text-gray-600 max-w-2xl mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {content.description}
          </p>

          <section className="py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-xl overflow-hidden border-2 border-gray-300 mb-8">
              <Accordion type="single" collapsible={true} className="w-full divide-y divide-gray-100 rounded-xl">
                {content.questions.map((item, index) => (
                  <AccordionItem 
                    key={index}
                    value={`q${index + 1}`} 
                    title={
                      <div className="flex items-center">
                        <div className="mr-4 p-2 bg-primary-50 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                          </svg>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">{item.question}</span>
                      </div>
                    }
                  >
                    <div className="pl-11 pt-2 pb-1 text-lg text-gray-600 leading-relaxed text-left">
                      {item.answer}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </div>
      </div>
      
      <FinalCTA />
      <TrustedBy />
      <Footer />
    </>
  );
} 