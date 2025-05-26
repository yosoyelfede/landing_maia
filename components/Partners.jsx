"use client";

import { getAssetPath } from '../lib/assetUtils';

export default function Partners() {
  const partners = [
    {
      name: "Exxacon",
      logo: "/logos/partners/exxacon.svg"
    },
    {
      name: "Altas Cumbres",
      logo: "/logos/partners/altas-cumbres.svg"
    }
  ];
  
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `url(${getAssetPath('/patterns/dot-grid.svg')})` }}
      ></div>
      
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary-500">
            Confían en nosotros
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12">
          {partners.map((partner, index) => (
            <div 
              key={partner.name}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105 h-24"
            >
              <img
                src={getAssetPath(partner.logo)}
                alt={partner.name}
                className={partner.name === "Altas Cumbres" ? "h-[93px] w-auto object-contain" : "h-[70px] w-auto object-contain"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 