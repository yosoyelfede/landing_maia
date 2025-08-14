'use client';

import { useState, useEffect } from 'react';
import { Accordion, AccordionItem } from '../../components/ui/accordion';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from '../../components/ui/Button';
import TrustedBy from "../../components/TrustedBy";
import FAQCTA from "../../components/FAQCTA";
import FinalCTA from "../../components/FinalCTA";
import { useLanguage } from '../../lib/LanguageContext';
import translations from '../../lib/translations';


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

  /* Add even smaller text class for mobile */
  .text-xxxs {
    font-size: 0.6rem;
    line-height: 0.75rem;
  }
  
  @media (min-width: 768px) {
    .text-xxxs {
      font-size: 0.8rem;
      line-height: 1rem;
    }
  }
  
  @media (min-width: 1024px) {
    .text-xxxs {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }
`;

export default function ComoFunciona() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tourType, setTourType] = useState('needTour'); // 'needTour' or 'haveTour'
  const [isScrolled, setIsScrolled] = useState(false);

  const { language } = useLanguage();
  const content = translations.howItWorks[language];
  const steps = tourType === 'needTour' ? content.stepsNeedTour : content.stepsWithTour;

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

  // Log the transformation for debugging (matching the console output)
  const original = content.title;
  let transformed = '';
  if (language === 'es') {
    transformed = content.title.replace('<span>', '<span class="text-primary-500 relative">') 
                              .replace('</span>', '<span class="absolute bottom-1 left-0 w-full h-2 bg-secondary-200 opacity-50 -z-10"></span></span>');
  } else {
    transformed = content.title.replace('<span>', '<span class="text-primary-500 relative">') 
                              .replace('</span>', '<span class="absolute bottom-1 left-0 w-full h-2 bg-secondary-200 opacity-50 -z-10"></span></span>');
  }
  console.log(`Language: ${language} Original: ${original} Transformed: ${transformed}`);

  // Get comparison features as array for dynamic rendering with shortened content
  const comparisonFeatures = [
    {
      icon: 'clock',
      withoutMaia: { detail: language === 'es' ? 'Pierdes tiempo respondiendo' : 'You lose time answering' },
      withMaia: { detail: language === 'es' ? 'Responde 24/7' : 'Responds 24/7 automatically' }
    },
    {
      icon: 'search',
      withoutMaia: { detail: language === 'es' ? 'No sabes quién está interesado' : 'You don\'t know who\'s interested' },
      withMaia: { detail: language === 'es' ? 'Identifica clientes con intención' : 'Identifies clients with intention' }
    },
    {
      icon: 'document',
      withoutMaia: { detail: language === 'es' ? 'Formularios que nadie completa' : 'Forms nobody completes' },
      withMaia: { detail: language === 'es' ? 'Captura datos en conversación' : 'Captures data in conversation' }
    },
    {
      icon: 'home',
      withoutMaia: { detail: language === 'es' ? 'Coordinar visitas toma horas' : 'Coordinating visits takes hours' },
      withMaia: { detail: language === 'es' ? 'Agenda visitas por ti' : 'Schedules visits for you' }
    },
    {
      icon: 'id-card',
      withoutMaia: { detail: language === 'es' ? 'Leads fríos y sin contexto' : 'Cold leads without context' },
      withMaia: { detail: language === 'es' ? 'Leads con datos reales' : 'Leads with real data' }
    },
    {
      icon: 'repeat',
      withoutMaia: { detail: language === 'es' ? 'Trabajo repetitivo' : 'Repetitive work' },
      withMaia: { detail: language === 'es' ? 'Filtra y prioriza por ti' : 'Filters and prioritizes' }
    },
    {
      icon: 'info',
      withoutMaia: { detail: language === 'es' ? 'Información desordenada' : 'Disorganized information' },
      withMaia: { detail: language === 'es' ? 'Historial claro de leads' : 'Clear history of leads' }
    }
  ];

  // Icon mapping
  const getIcon = (iconName) => {
    const icons = {
      clock: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      user: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 717.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      document: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      home: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      'id-card': (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
        </svg>
      ),
      repeat: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      ),
      info: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      ),
      search: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      )
    };
    return icons[iconName] || icons.info;
  };

  return (
    <>
      <style jsx global>{scrollbarStyles}</style>
      <style jsx>{`
        .comparison-row-hover {
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.9), rgba(99, 102, 241, 0.9)) !important;
          transition: all 0.3s ease !important;
        }
        
        .comparison-row-hover span {
          color: white !important;
        }
        
        .icon-bubble-hover {
          background: linear-gradient(135deg, #4F46E5, #6366F1) !important;
          border-color: white !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 8px 25px -5px rgba(79, 70, 229, 0.3) !important;
        }
        
        .icon-bubble-hover svg {
          color: white !important;
          stroke: white !important;
        }
        
        /* Override Tailwind text-blue-500 specifically */
        .icon-bubble-hover svg.text-blue-500,
        .icon-bubble-hover .text-blue-500 {
          color: white !important;
          stroke: white !important;
        }
        
        .icon-bubble-hover svg * {
          stroke: white !important;
          fill: none !important;
          color: white !important;
        }
        
        .icon-bubble-hover svg path {
          stroke: white !important;
          fill: none !important;
          stroke-width: 2 !important;
        }
        
        .icon-bubble-hover svg circle {
          stroke: white !important;
          fill: none !important;
          stroke-width: 2 !important;
        }
        
        .icon-bubble-hover svg rect {
          stroke: white !important;
          fill: none !important;
          stroke-width: 2 !important;
        }
        
        .icon-bubble-hover svg line {
          stroke: white !important;
          stroke-width: 2 !important;
        }
        
        .icon-bubble-hover svg polyline {
          stroke: white !important;
          fill: none !important;
          stroke-width: 2 !important;
        }
        
        .icon-bubble-hover svg polygon {
          stroke: white !important;
          fill: none !important;
          stroke-width: 2 !important;
        }
        
        .icon-bubble-hover svg ellipse {
          stroke: white !important;
          fill: none !important;
          stroke-width: 2 !important;
        }
        
        /* Force override of any blue colors - comprehensive targeting */
        .icon-bubble-hover svg[stroke="currentColor"] {
          stroke: white !important;
        }
        
        .icon-bubble-hover svg *[stroke="currentColor"] {
          stroke: white !important;
        }
        
        /* Additional comprehensive override for Tailwind classes */
        .comparison-row-hover .text-blue-500,
        .floating-icon-row-hover .text-blue-500,
        .icon-bubble-hover .text-blue-500 {
          color: white !important;
          stroke: white !important;
        }
        
        /* Clean responsive design - no conflicting overrides */
      `}</style>
      <Navbar />
      <div className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-20 -left-28 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 -right-28 w-80 h-80 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="relative z-10">
          <div className={`max-w-4xl mx-auto px-4 ${headerPadding} text-center transition-all duration-500 ease-in-out`}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8 animate-fade-in-up">
              {language === 'es' ? (
                <div dangerouslySetInnerHTML={{ 
                  __html: content.title.replace('<span>', '<span class="text-primary-500 relative">') 
                                       .replace('</span>', '<span class="absolute bottom-1 left-0 w-full h-2 bg-secondary-200 opacity-50 -z-10"></span></span>')
                }} />
              ) : (
                <div dangerouslySetInnerHTML={{ 
                  __html: content.title.replace('<span>', '<span class="text-primary-500 relative">') 
                                       .replace('</span>', '<span class="absolute bottom-1 left-0 w-full h-2 bg-secondary-200 opacity-50 -z-10"></span></span>')
                }} />
              )}
            </h1>
          <p className="text-xl md:text-2xl font-normal text-gray-600 max-w-2xl mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {content.description}
          </p>

          <section className="mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6 text-gray-900 text-center">{content.processTitle}</h2>
            
            {/* Tour Type Selection Buttons */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => {
                    setTourType('needTour');
                    setActiveIndex(0);
                  }}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    tourType === 'needTour'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {content.buttons.needTour}
                </button>
                <button
                  onClick={() => {
                    setTourType('haveTour');
                    setActiveIndex(0);
                  }}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    tourType === 'haveTour'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {content.buttons.haveTour}
                </button>
              </div>
            </div>
            
            <div className="relative mx-0 md:mx-16">
              {/* Left arrow - positioned outside */}
              <button 
                onClick={() => setActiveIndex(prev => prev === 0 ? steps.length - 1 : prev - 1)}
                className="absolute -left-12 top-[125px] z-20 md:block hidden transition-all duration-300 hover:scale-110"
                aria-label={content.prevStep}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-primary-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              
              {/* Right arrow - positioned outside */}
              <button 
                onClick={() => setActiveIndex(prev => prev === steps.length - 1 ? 0 : prev + 1)}
                className="absolute -right-12 top-[125px] z-20 md:block hidden transition-all duration-300 hover:scale-110"
                aria-label={content.nextStep}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-primary-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
              
              {/* Cards container */}
              <div className="overflow-hidden pb-4 relative h-[300px] md:h-[250px]">
                {/* Remove mobile navigation arrows and implement touch swipe */}
                <div 
                  className="relative w-full h-full"
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
                          setActiveIndex(prev => prev === steps.length - 1 ? 0 : prev + 1);
                        } else {
                          // Swiped right - show previous
                          setActiveIndex(prev => prev === 0 ? steps.length - 1 : prev - 1);
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
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full md:h-[250px] h-[350px] rounded-2xl p-6 transition-all duration-500 ${
                      activeIndex === index 
                        ? 'opacity-100 transform translate-x-0 z-10 bg-white border-2 border-gray-300' 
                        : index < activeIndex
                          ? 'opacity-0 transform -translate-x-full' 
                          : 'opacity-0 transform translate-x-full'
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="text-center mb-4">
                      <span className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-primary-100 text-primary-700 font-bold text-md">
                        Paso {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 text-center">{step.title}</h3>
                    <p className="text-sm md:text-lg text-gray-600 text-center leading-relaxed">{step.description}</p>
                  </div>
                ))}
                </div>
              </div>
              
              {/* Step indicators - centered and visible on all devices */}
              <div className="flex justify-center mt-8 gap-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeIndex === index 
                        ? 'bg-primary-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
          </div>
        </div>

        <section className="py-20 bg-white relative overflow-hidden">
          {/* Remove background decorations */}
          
          <div className="container relative z-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6 text-gray-900 text-center">{content.whatMaiaCanDo.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center p-5 rounded-lg border-2 border-gray-300 transition-all duration-300 hover:bg-secondary-200 hover:bg-opacity-50 hover:border-gray-400">
                <div className="w-14 h-14 mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{content.whatMaiaCanDo.features[0].title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{content.whatMaiaCanDo.features[0].description}</p>
              </div>
              
              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center p-5 rounded-lg border-2 border-gray-300 transition-all duration-300 hover:bg-secondary-200 hover:bg-opacity-50 hover:border-gray-400">
                <div className="w-14 h-14 mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{content.whatMaiaCanDo.features[1].title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{content.whatMaiaCanDo.features[1].description}</p>
              </div>
              
              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center p-5 rounded-lg border-2 border-gray-300 transition-all duration-300 hover:bg-secondary-200 hover:bg-opacity-50 hover:border-gray-400">
                <div className="w-14 h-14 mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{content.whatMaiaCanDo.features[2].title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{content.whatMaiaCanDo.features[2].description}</p>
              </div>
              
              {/* Feature 4 */}
              <div className="flex flex-col items-center text-center p-5 rounded-lg border-2 border-gray-300 transition-all duration-300 hover:bg-secondary-200 hover:bg-opacity-50 hover:border-gray-400">
                <div className="w-14 h-14 mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{content.whatMaiaCanDo.features[3].title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{content.whatMaiaCanDo.features[3].description}</p>
              </div>
              
              {/* Feature 5 */}
              <div className="flex flex-col items-center text-center p-5 rounded-lg border-2 border-gray-300 transition-all duration-300 hover:bg-secondary-200 hover:bg-opacity-50 hover:border-gray-400">
                <div className="w-14 h-14 mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{content.whatMaiaCanDo.features[4].title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{content.whatMaiaCanDo.features[4].description}</p>
              </div>
              
              {/* Feature 6 */}
              <div className="flex flex-col items-center text-center p-5 rounded-lg border-2 border-gray-300 transition-all duration-300 hover:bg-secondary-200 hover:bg-opacity-50 hover:border-gray-400">
                <div className="w-14 h-14 mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{content.whatMaiaCanDo.features[5].title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{content.whatMaiaCanDo.features[5].description}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-100 relative overflow-hidden">
          {/* Remove background decorations */}
          
          <div className="container relative z-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-12 text-gray-900 text-center">{content.whyUseMaia.title}</h2>
            
            <div className="max-w-7xl mx-auto mt-8">
              {/* Comparison Table - Completely Mobile Optimized */}
              <div className="px-2 sm:px-4 py-4 sm:py-6">
                
                {/* Full responsive table for all devices */}
                <div className="relative">
                  {/* Flexbox wrapper for centering */}
                  <div className="flex justify-center">
                    {/* Outer container with gradient background */}
                    <div className="relative bg-gradient-to-r from-red-200 to-green-200 rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-200 p-0 overflow-hidden w-full max-w-4xl mx-1 sm:mx-2">
                      <div className="flex relative">
                        
                        {/* Sin Maia Column */}
                        <div className="w-1/2 flex-shrink-0 bg-transparent overflow-hidden comparison-column">
                          {/* Header */}
                          <div className="bg-transparent px-2 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 flex items-center justify-center min-h-[45px] sm:min-h-[50px] md:min-h-[60px] border-b border-gray-200/30">
                            <span className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-gray-900">Sin Maia</span>
                          </div>
                        
                          {comparisonFeatures.map((feature, index) => (
                            <div 
                              key={index} 
                              className={`comparison-row-${index} comparison-row px-1 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 min-h-[60px] sm:min-h-[65px] md:min-h-[75px] ${index < comparisonFeatures.length - 1 ? 'border-b border-gray-200/20' : ''} bg-transparent cursor-pointer flex items-center`}
                              onMouseEnter={() => {
                                // Apply hover to all cells in this row
                                document.querySelectorAll(`.comparison-row-${index}`).forEach(el => {
                                  el.classList.add('comparison-row-hover');
                                });
                                // Apply hover to icon bubble in floating container
                                document.querySelectorAll(`.floating-icon-row-${index} .icon-bubble`).forEach(el => {
                                  el.classList.add('icon-bubble-hover');
                                });
                              }}
                              onMouseLeave={() => {
                                // Remove hover from all cells in this row
                                document.querySelectorAll(`.comparison-row-${index}`).forEach(el => {
                                  el.classList.remove('comparison-row-hover');
                                });
                                // Remove hover from icon bubble in floating container
                                document.querySelectorAll(`.floating-icon-row-${index} .icon-bubble`).forEach(el => {
                                  el.classList.remove('icon-bubble-hover');
                                });
                              }}
                            >
                              <div className="flex items-center justify-center h-full w-full pr-2 sm:pr-4 md:pr-6">
                                <span className="text-[0.6rem] leading-[0.75rem] sm:text-[0.75rem] sm:leading-tight md:text-sm md:leading-normal lg:text-base lg:leading-normal text-gray-900 font-medium text-center break-words hyphens-auto overflow-wrap-anywhere max-w-full">{feature.withoutMaia.detail}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Con Maia Column */}
                        <div className="w-1/2 flex-shrink-0 bg-transparent overflow-hidden comparison-column">
                          {/* Header */}
                          <div className="bg-transparent px-2 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 flex items-center justify-center min-h-[45px] sm:min-h-[50px] md:min-h-[60px] border-b border-gray-200/30">
                            <div className="flex items-center">
                              <span className="font-bold text-xs sm:text-sm md:text-base lg:text-lg mr-1 sm:mr-2 text-gray-900">Con Maia</span>
                              <img src="/logos/main/logo.png" alt="Maia Logo" className="h-3 sm:h-4 md:h-5 lg:h-6 object-contain" />
                            </div>
                          </div>
                        
                          {comparisonFeatures.map((feature, index) => (
                            <div 
                              key={index} 
                              className={`comparison-row-${index} comparison-row px-1 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 min-h-[60px] sm:min-h-[65px] md:min-h-[75px] ${index < comparisonFeatures.length - 1 ? 'border-b border-gray-200/20' : ''} bg-transparent cursor-pointer flex items-center`}
                              onMouseEnter={() => {
                                // Apply hover to all cells in this row
                                document.querySelectorAll(`.comparison-row-${index}`).forEach(el => {
                                  el.classList.add('comparison-row-hover');
                                });
                                // Apply hover to icon bubble in floating container
                                document.querySelectorAll(`.floating-icon-row-${index} .icon-bubble`).forEach(el => {
                                  el.classList.add('icon-bubble-hover');
                                });
                              }}
                              onMouseLeave={() => {
                                // Remove hover from all cells in this row
                                document.querySelectorAll(`.comparison-row-${index}`).forEach(el => {
                                  el.classList.remove('comparison-row-hover');
                                });
                                // Remove hover from icon bubble in floating container
                                document.querySelectorAll(`.floating-icon-row-${index} .icon-bubble`).forEach(el => {
                                  el.classList.remove('icon-bubble-hover');
                                });
                              }}
                            >
                              <div className="flex items-center justify-center h-full w-full pl-2 sm:pl-4 md:pl-6">
                                <span className="text-[0.6rem] leading-[0.75rem] sm:text-[0.75rem] sm:leading-tight md:text-sm md:leading-normal lg:text-base lg:leading-normal text-gray-900 font-medium text-center break-words hyphens-auto overflow-wrap-anywhere max-w-full">{feature.withMaia.detail}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Floating Icons - positioned absolutely in the center */}
                        <div className="absolute inset-0 z-30 pointer-events-none">
                          <div className="flex flex-col h-full">
                            {/* Header spacer - match exact header height and padding */}
                            <div className="min-h-[45px] sm:min-h-[50px] md:min-h-[60px] px-2 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 border-b border-transparent"></div>
                            
                            {/* Icon rows */}
                            {comparisonFeatures.map((feature, index) => (
                              <div 
                                key={index} 
                                className={`floating-icon-row-${index} min-h-[60px] sm:min-h-[65px] md:min-h-[75px] px-1 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 flex items-center justify-center cursor-pointer pointer-events-auto ${index < comparisonFeatures.length - 1 ? 'border-b border-transparent' : ''}`}
                                onMouseEnter={() => {
                                  // Apply hover to all row cells in this row
                                  document.querySelectorAll(`.comparison-row-${index}`).forEach(el => {
                                    el.classList.add('comparison-row-hover');
                                  });
                                  // Apply hover to icon bubble
                                  document.querySelectorAll(`.floating-icon-row-${index} .icon-bubble`).forEach(el => {
                                    el.classList.add('icon-bubble-hover');
                                  });
                                }}
                                onMouseLeave={() => {
                                  // Remove hover from all row cells in this row
                                  document.querySelectorAll(`.comparison-row-${index}`).forEach(el => {
                                    el.classList.remove('comparison-row-hover');
                                  });
                                  // Remove hover from icon bubble
                                  document.querySelectorAll(`.floating-icon-row-${index} .icon-bubble`).forEach(el => {
                                    el.classList.remove('icon-bubble-hover');
                                  });
                                }}
                                onTouchStart={() => {
                                  // For touch devices - apply hover effect on touch
                                  document.querySelectorAll(`.comparison-row-${index}`).forEach(el => {
                                    el.classList.add('comparison-row-hover');
                                  });
                                  document.querySelectorAll(`.floating-icon-row-${index} div[class*="w-"]`).forEach(el => {
                                    el.classList.add('icon-bubble-hover');
                                  });
                                }}
                              >
                                <div className="icon-bubble w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-white shadow-xl border-2 border-gray-200 flex items-center justify-center z-40">
                                  {getIcon(feature.icon)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FAQCTA />
        <FinalCTA />
      </div>
      
      <TrustedBy />
      <Footer />
    </>
  );
} 