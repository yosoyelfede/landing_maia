"use client";

import { getAssetPath } from '../lib/assetUtils';

export default function TrustedBy() {
  return (
    <section id="apoyados" className="py-10 bg-[#0a1860] text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary-900/20 to-transparent"></div>
      
      {/* Decoration elements */}
      <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-primary-400/10 blur-3xl"></div>
      <div className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-accent-400/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Apoyados por</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center">
            <img 
              src={getAssetPath("/logos/incubators/incuba-udd.png")} 
              alt="Incuba UDD Logo" 
              className="h-20 w-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Incuba UDD</h3>
            <p className="text-sm text-gray-300 mt-2">Incubadora de la Universidad del Desarrollo</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center">
            <img 
              src={getAssetPath("/logos/incubators/acelera-udd.png")}
              alt="Acelera UDD Logo" 
              className="h-20 w-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Acelera UDD</h3>
            <p className="text-sm text-gray-300 mt-2">Aceleradora de la Universidad del Desarrollo</p>
          </div>
        </div>
      </div>
    </section>
  );
}