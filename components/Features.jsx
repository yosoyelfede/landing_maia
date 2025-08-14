"use client";

import { motion } from '../lib/motion';

export default function Features() {
  const features = [
    {
      title: "Agente AI Inteligente",
      description: "Un agente virtual que guía a los visitantes, responde preguntas y destaca las características más relevantes de cada propiedad en tiempo real.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      color: "from-primary-600 to-primary-400",
      delay: 0.1
    },
    {
      title: "Captura de Leads Natural",
      description: "Recopila información de tus visitantes de forma conversacional, sin formularios aburridos que interrumpan la experiencia inmersiva.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2v4l-4-4H9a2 2 0 0 1-2-2v-1"></path>
          <path d="M15 4h2a2 2 0 0 1 2 2v4"></path>
          <path d="M8 13v-1a2 2 0 0 1 2-2h2"></path>
          <path d="M3 8a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H6l-3 3V8Z"></path>
        </svg>
      ),
      color: "from-secondary-600 to-secondary-400",
      delay: 0.2
    },
    {
      title: "Análisis de Comportamiento",
      description: "Obtén insights detallados sobre cómo los visitantes interactúan con tus propiedades: tiempo de visita, áreas de interés y patrones de conversión.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"></path>
          <path d="M18 9l-5-6-5 6"></path>
          <path d="M13 4v11"></path>
          <rect x="15" y="15" width="3" height="4"></rect>
          <rect x="8" y="12" width="3" height="7"></rect>
        </svg>
      ),
      color: "from-accent-500 to-accent-300",
      delay: 0.3
    },
    {
      title: "Integración con CRM",
      description: "Sincroniza automáticamente los leads y datos de comportamiento con tu sistema CRM existente para optimizar tu pipeline de ventas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14"></path>
          <path d="M18 13l-6 6-6-6"></path>
          <path d="M6 9l6-6 6 6"></path>
        </svg>
      ),
      color: "from-primary-600 to-accent-500",
      delay: 0.4
    }
  ];

  return (
    <section id="features" className="section-padding bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-secondary-100 mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute left-0 bottom-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-primary-100 mix-blend-multiply filter blur-3xl opacity-70"></div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700 mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2"></span>
            Funcionalidades principales
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="heading-2 mb-4 text-gray-900"
          >
            Potencia tus ventas con <span className="text-gradient-primary">inteligencia artificial</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600"
          >
            Transforma tus recorridos virtuales en una herramienta de ventas inteligente que trabaja 24/7 para capturar y convertir leads automáticamente.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100"
            >
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
              <div className={`h-1.5 bg-gradient-to-r ${feature.color}`}></div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="#demo" 
            className="btn-primary inline-flex items-center justify-center group px-8 py-4 text-lg"
          >
            Descubre cómo funciona
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 