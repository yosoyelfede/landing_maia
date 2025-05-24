import React from 'react';
import Link from 'next/link';

export default function BlogSection() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Novedades
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lee lo último de nuestro blog
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Link href="/blog/render-vs-recorrido-virtual" className="block">
              <div className="md:grid md:grid-cols-2">
                <div className="h-56 md:h-56 bg-primary-50">
                  <img 
                    src="/images/blog/render-vs-recorrido.png" 
                    alt="Render vs Recorrido Virtual" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="uppercase tracking-wide text-xs font-semibold text-primary-600 mb-1">
                    Artículo destacado
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                    ¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
                    Los renders son ideales para destacar atributos visuales en etapas tempranas, mientras que los recorridos virtuales son más efectivos cuando se quiere generar conexión emocional y captar leads calificados.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Mayo 2025</span>
                    <span className="text-primary-600 font-medium hover:underline">Leer más →</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow"
            >
              Ver todos los artículos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 