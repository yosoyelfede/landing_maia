"use client";

import { getAssetPath } from '../lib/assetUtils';

export default function TrustedBy() {
  return (
    <section id="apoyados" className="py-20 bg-[#0a1860] text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary-900/20 to-transparent"></div>
      
      {/* Decoration elements */}
      <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-primary-400/10 blur-3xl"></div>
      <div className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-accent-400/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Apoyados por</h2>
        
        <div className="flex flex-wrap justify-center gap-16 max-w-3xl mx-auto">
          <img 
            src={getAssetPath("/logos/incubators/incuba-udd.png")} 
            alt="Incuba UDD Logo" 
            className="h-24 w-auto"
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