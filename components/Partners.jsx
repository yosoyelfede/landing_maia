"use client";

import { motion } from '../lib/motion';

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
    <section className="py-10 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/patterns/dot-grid.svg')] opacity-10"></div>
      
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-primary-600">
            Confían en nosotros
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12"
        >
          {partners.map((partner, index) => (
            <motion.div 
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105 h-24"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={partner.name === "Altas Cumbres" ? "h-[93px] w-auto object-contain" : "h-[70px] w-auto object-contain"}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 