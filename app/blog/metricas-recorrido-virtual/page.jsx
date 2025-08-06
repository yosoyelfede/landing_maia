import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export const metadata = {
  title: '5 métricas clave que puedes obtener desde un recorrido virtual con IA',
  description: 'Descubre cómo un recorrido con IA puede entregar datos concretos sobre intención de compra, puntos de interés y leads calificados para optimizar la venta inmobiliaria.',
};

export default function BlogPost() {
  return (
    <main>
      <Navbar />
      
      <div className="pt-24">
        <header className="relative mb-16">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={getAssetPath("/images/blog/metricas-recorrido-virtual.jpg")} 
              alt="5 métricas desde un recorrido virtual con IA" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/60"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 py-32 md:py-40 text-center">
            <div className="mb-4">
              <Link href="/blog" className="text-white hover:text-primary-300 transition-colors font-semibold">
                ← Volver al blog
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white max-w-4xl mx-auto leading-tight">
              5 métricas clave que puedes obtener desde un recorrido virtual con IA
            </h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium">
              <span>3 septiembre, 2025</span>
              <span>·</span>
              <span>4 min de lectura</span>
            </div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <p><strong>Resumen:</strong><br />
            No se trata solo de captar leads: un recorrido con IA permite medir intención de compra, puntos de interés, fricción y mucho más. Estas métricas te permiten vender de forma más inteligente.</p>

            <hr />

            <h2>¿Qué mide un recorrido tradicional?</h2>
            <p>Hoy, la mayoría de los recorridos virtuales inmobiliarios se comportan como una vitrina pasiva. Puedes ver la propiedad, pero nadie sabe:</p>
            <ul>
              <li>Quién lo visitó</li>
              <li>Qué partes generaron más interés</li>
              <li>Dónde hubo fricción o abandono</li>
            </ul>
            <p>En términos simples: es como tener una sala piloto sin cámaras, sin guías y sin registro de visitantes.</p>

            <h2>¿Qué cambia con un recorrido potenciado con IA?</h2>
            <p>Un recorrido potenciado con Maia no solo muestra, sino que mide, conversa y aprende. Al integrar un asistente conversacional que guía y capta datos en tiempo real, transformamos una visualización en una fuente de inteligencia comercial.</p>

            <p>Estas son las 5 métricas más relevantes que obtienes:</p>

            <h3>1. Tiempo total de interacción</h3>
            <p>Mide cuánto tiempo real estuvo cada visitante dentro del recorrido. Esto no es solo un número: permite clasificar interés y comparar engagement entre propiedades.</p>

            <h3>2. Zonas de mayor atención</h3>
            <p>Gracias al seguimiento del comportamiento, podemos identificar qué espacios fueron más explorados: cocina, terraza, baños, etc. Esto revela qué atributos están generando mayor interés.</p>

            <h3>3. Preguntas realizadas por los usuarios</h3>
            <p>El asistente AI registra todas las preguntas que hace cada visitante. Esta es una mina de oro: muestra exactamente qué quiere saber un comprador y permite optimizar mensajes de venta o incluso detectar oportunidades de mejora en el proyecto.</p>

            <h3>4. Nivel de intención de compra</h3>
            <p>Combinando variables como tiempo de permanencia, interacción con el asistente, datos entregados y comportamiento, Maia estima un nivel de intención de compra para cada lead. Esto permite priorizar esfuerzos comerciales con base real.</p>

            <h3>5. Leads calificados con contexto</h3>
            <p>No solo sabes que alguien dejó su nombre o correo. Sabes qué le interesó, qué preguntó, qué espacios exploró y si vale la pena contactarlo de inmediato o no. Este contexto convierte un simple lead en una oportunidad clara.</p>

            <h2>¿Por qué estas métricas importan?</h2>
            <p>Porque vender propiedades no es solo mostrar. Es entender.</p>
            <p>Entender qué buscan las personas, qué les gusta, qué les genera dudas, cuándo están listas para comprar.</p>
            <p>Las inmobiliarias que usan Maia no solo tienen más leads, tienen leads más calificados, con más información, y con mejores tasas de conversión.</p>

            <h2>Conclusión</h2>
            <p>Medir no es opcional. Es la única forma de mejorar.</p>
            <p>Y si tu recorrido actual no te dice nada de tus visitantes, no estás vendiendo de forma inteligente. Solo estás esperando a que alguien decida contactarte.</p>
            <p>Con Maia, cada recorrido se convierte en una fuente continua de aprendizaje y ventas.</p>
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Quieres una demostración de Maia?</h3>
            <a 
              href="mailto:fede@maiavr.cl"
              className="inline-block px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Contacta con nosotros
            </a>
          </div>
        </article>
      </div>
      
      <Footer />
    </main>
  );
}