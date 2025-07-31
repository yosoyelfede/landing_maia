import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export const metadata = {
  title: 'Leads no calificados: cómo filtrar interesados reales sin perder oportunidades',
  description: 'El problema no es la cantidad de leads, es no saber quién vale la pena. Aprende a priorizar automáticamente a los interesados reales sin perder oportunidades.',
}

export default function BlogPost() {
  return (
    <main>
      <Navbar />

      <div className="pt-24">
        <header className="relative mb-16">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={getAssetPath("/images/blog/leads-no-calificados.jpg")} 
              alt="Filtrar leads no calificados en marketing inmobiliario" 
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
              Leads no calificados: cómo filtrar interesados reales sin perder oportunidades
            </h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium">
              <span>24 Julio, 2025</span>
              <span>·</span>
              <span>4 min de lectura</span>
            </div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <p><strong>Resumen:</strong><br />
            El mayor dolor de los equipos comerciales no es la falta de leads, es que la mayoría no califica. La clave no está en generar más contactos, sino en priorizar automáticamente a quienes realmente están interesados.</p>

            <hr />

            <h2>¿Por qué los leads no calificados son un problema?</h2>
            <p>Porque el equipo de ventas pierde tiempo persiguiendo curiosos.<br />
            Y porque eso genera dos consecuencias:</p>
            <ul>
              <li>Menos foco en los leads que sí tienen intención real</li>
              <li>Una percepción errónea de que “el marketing no funciona”</li>
            </ul>
            <p>El problema no es cuántos leads entran. Es qué tan buenos son.</p>

            <h2>¿Qué pasaría si pudieras saber quién vale la pena?</h2>
            <p>Imagina que antes de llamar a un prospecto ya supieras:</p>
            <ul>
              <li>Qué espacios miró con más interés</li>
              <li>Cuánto tiempo estuvo explorando el proyecto</li>
              <li>Qué preguntas hizo o qué dudas mostró</li>
              <li>En qué etapa del proceso de compra está</li>
            </ul>
            <p>El trabajo comercial sería mucho más efectivo.</p>

            <h2>¿Por qué los sistemas actuales no ayudan?</h2>
            <ul>
              <li>Solo capturan nombre, correo y teléfono</li>
              <li>No entregan contexto ni nivel de interés</li>
              <li>No ayudan a priorizar contactos</li>
            </ul>
            <p>Así, todos los leads parecen iguales.</p>

            <h2>¿Cómo lo resuelve Maia?</h2>
            <p>Un recorrido inteligente califica automáticamente al visitante mientras navega:</p>
            <ul>
              <li>Analiza su comportamiento completo: tiempo, interacciones, preguntas</li>
              <li>Detecta señales de intención de compra en tiempo real</li>
              <li>Genera reportes con prioridad sugerida para el equipo comercial</li>
            </ul>
            <p>El vendedor no parte desde cero. Llega a la llamada sabiendo a quién vale la pena contactar primero y por qué.</p>

            <hr />

            <h2>Conclusión</h2>
            <p>No necesitas más leads.<br />
            Necesitas saber cuáles son los que realmente importan.</p>
            <p>Con la información correcta, el trabajo de ventas deja de ser adivinanza y se vuelve estrategia.</p>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Leads no calificados: cómo filtrar interesados reales sin perder oportunidades",
          image: "https://maiavr.cl/images/blog/leads-no-calificados.jpg",
          author: {
            "@type": "Person",
            name: "Equipo Maia"
          },
          publisher: {
            "@type": "Organization",
            name: "Maia",
            logo: {
              "@type": "ImageObject",
              url: "https://maiavr.cl/logo-maia.png"
            }
          },
          datePublished: "2025-07-24",
          description: "El problema no es la cantidad de leads, es no saber quién vale la pena. Aprende a priorizar automáticamente a los interesados reales sin perder oportunidades."
        })
      }} />
    </main>
  );
}