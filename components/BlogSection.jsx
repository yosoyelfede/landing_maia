import React from 'react';
import Link from 'next/link';
import { getAssetPath } from '../lib/assetUtils';

export default function BlogSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Novedades</h2>
          <p className="text-gray-600 mt-2">Lee lo último de nuestro blog</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:shadow-lg">
            <Link href="/blog/render-vs-recorrido-virtual">
              <div className="md:flex">
                <div className="md:w-1/3 h-64 md:h-auto relative">
                  <img
                    src={getAssetPath("/images/blog/render-vs-recorrido.png")}
                    alt="Render vs recorrido virtual"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="uppercase tracking-wide text-sm text-primary-600 font-semibold">Tecnología inmobiliaria</div>
                  <h3 className="mt-2 text-xl font-bold leading-tight">¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor</h3>
                  <p className="mt-2 text-gray-600">Aprende cuándo utilizar cada tecnología y cómo maximizar tu retorno de inversión en marketing digital inmobiliario.</p>
                  <div className="mt-4 flex items-center">
                    <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">Recorridos virtuales</span>
                    <span className="mx-2 text-gray-500">·</span>
                    <span className="text-sm text-gray-500">5 min de lectura</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 