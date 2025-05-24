"use client";

import { motion } from '../lib/motion';

export default function TrustedBy() {
  return (
    <section id="apoyados" className="py-10 bg-[#0a1860] text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('/patterns/grid-light.svg')] opacity-5"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-400/20 mix-blend-overlay filter blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-300/20 mix-blend-overlay filter blur-3xl"></div>
      
      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Apoyados por
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-10 md:gap-16 mb-16"
        >
          <div className="transform transition-all duration-300 hover:scale-105">
            <img
              src="/logos/incubators/incuba-udd.png"
              alt="Incuba UDD"
              className="h-[86px] w-auto object-contain"
            />
          </div>
          <div className="transform transition-all duration-300 hover:scale-105">
            <img
              src="/logos/incubators/acelera-udd.png"
              alt="Acelera UDD"
              className="h-[72px] w-auto object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}