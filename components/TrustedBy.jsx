"use client";

import { getAssetPath } from '../lib/assetUtils';
import { useLanguage } from '../lib/LanguageContext';
import translations from '../lib/translations';

export default function TrustedBy() {
  const { language } = useLanguage();
  const content = translations.trustedBy[language];
  
  return (
    <section id="apoyados" className="py-20 bg-[#0A1860] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-white">{content.heading}</h2>
        
        <div className="flex flex-wrap justify-center gap-16 max-w-3xl mx-auto">
          <img 
            src={getAssetPath("/logos/incubators/incuba-udd.png")} 
            alt="Incuba UDD Logo" 
            className="h-[6.3rem] w-auto"
          />
          
          <img 
            src={getAssetPath("/logos/incubators/acelera-udd.png")}
            alt="Acelera UDD Logo" 
            className="h-24 w-auto"
          />
        </div>
      </div>
    </section>
  );
}