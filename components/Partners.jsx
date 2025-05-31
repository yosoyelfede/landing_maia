"use client";

import { getAssetPath } from '../lib/assetUtils';
import { useEffect, useRef } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import translations from '../lib/translations';

export default function Partners() {
  const { language } = useLanguage();
  const content = translations.partners[language];
  
  const partners = [
    {
      name: "Altas Cumbres",
      logo: "/logos/partners/altas-cumbres.svg"
    },
    {
      name: "Exxacon",
      logo: "/logos/partners/exxacon.svg"
    },
    {
      name: "IFocus",
      logo: "/logos/partners/ifocus.png"
    },
    {
      name: "Qiiip",
      logo: "/logos/partners/logo-qiiip.png"
    },
    {
      name: "Fleep",
      logo: "/logos/partners/Fleep.png"
    },
    {
      name: "Galeria Inmobiliaria",
      logo: "/logos/partners/galeriainmobiliaria.png"
    }
  ];
  
  // Triplicamos los logos para asegurar un bucle continuo
  const allPartners = [...partners, ...partners, ...partners];
  
  const scrollRef = useRef(null);
  const isPausedRef = useRef(false);
  const pausedTimeRef = useRef(0);
  const pausedPositionRef = useRef(0);
  
  const getHeight = (partnerName) => {
    switch(partnerName) {
      case "Altas Cumbres": return "h-[121px] sm:h-[121px] max-sm:h-[79px]";
      case "Galeria Inmobiliaria": return "h-[117px] sm:h-[117px] max-sm:h-[76px]";
      case "IFocus": return "h-[170px] sm:h-[170px] max-sm:h-[110px]";
      case "Qiiip": return "h-[75px] sm:h-[75px] max-sm:h-[49px]";
      case "Fleep": return "h-[85px] sm:h-[85px] max-sm:h-[55px]";
      default: return "h-[70px] sm:h-[70px] max-sm:h-[45px]";
    }
  };
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let animationId;
    let startTime = null;
    const scrollSpeed = 0.076;
    let timePaused = 0;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      
      // Manejo de pausa
      if (isPausedRef.current) {
        if (pausedTimeRef.current === 0) {
          // Acabamos de pausar
          pausedTimeRef.current = timestamp;
          pausedPositionRef.current = scrollContainer.scrollLeft;
        }
        animationId = requestAnimationFrame(animate);
        return;
      } else if (pausedTimeRef.current > 0) {
        // Acabamos de reanudar
        const pauseDuration = timestamp - pausedTimeRef.current;
        startTime += pauseDuration; // Ajustamos el tiempo de inicio para compensar la pausa
        pausedTimeRef.current = 0;
      }
      
      const progress = (timestamp - startTime) * scrollSpeed;
      scrollContainer.scrollLeft = progress;
      
      // Si hemos llegado a la segunda parte (después de la primera duplicación)
      // reiniciamos la posición para simular un bucle infinito
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 3) {
        // Volvemos al primer tercio sin que se note la transición
        scrollContainer.scrollLeft = scrollContainer.scrollLeft - (scrollContainer.scrollWidth / 3);
        startTime = timestamp - (scrollContainer.scrollLeft / scrollSpeed);
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `url(${getAssetPath('/patterns/dot-grid.svg')})` }}
      ></div>
      
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-primary-500">
            {content.heading}
          </h2>
        </div>
        
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Máscaras de desvanecimiento en los bordes */}
          <div className="absolute left-0 top-0 h-full w-[100px] bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-[100px] bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Contenedor de desplazamiento */}
          <div 
            ref={scrollRef}
            className="flex items-center overflow-x-scroll no-scrollbar"
            onMouseEnter={() => { isPausedRef.current = true; }}
            onMouseLeave={() => { isPausedRef.current = false; }}
            style={{ scrollBehavior: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <div className="flex items-center space-x-24 py-10 px-[100px]">
              {allPartners.map((partner, index) => (
                <div 
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 transition-all duration-300 filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-110"
                >
                  <img
                    src={getAssetPath(partner.logo)}
                    alt={partner.name}
                    className={`w-auto object-contain ${getHeight(partner.name)}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Añadimos un estilo global para ocultar la barra de desplazamiento
const styleElement = typeof document !== 'undefined' ? 
  document.createElement('style') : null;

if (styleElement) {
  styleElement.textContent = `
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;
  document.head.appendChild(styleElement);
} 