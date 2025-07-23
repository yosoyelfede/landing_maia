import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export const metadata = {
  title: 'El gran problema de los formularios: por qué nadie quiere dejar sus datos',
  description: 'Los formularios están quedando obsoletos. Descubre por qué no funcionan y cómo capturar datos de manera natural, sin fricción, dentro de un recorrido inteligente.',
}

export default function BlogPost() {
  return (
    <main>
      <Navbar />

      <div className="pt-24">
        <header className="relative mb-16">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={getAssetPath("/images/blog/nadie-quiere-dejar-sus-datos.jpg")} 
              alt="Problema de formularios en marketing inmobiliario" 
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
              El gran problema de los formularios: por qué nadie quiere dejar sus datos
            </h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium">
              <span>17 Julio, 2025</span>
              <span>·</span>
              <span>4 min de lectura</span>
            </div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <p><strong>Resumen:</strong><br />
            Cada vez menos personas completan formularios. La fricción, la desconfianza y la poca recompensa los hacen casi obsoletos. La alternativa: experiencias que conversan y capturan datos de manera natural.</p>

            <hr />

            <h2>¿Por qué los formularios dejaron de funcionar?</h2>
            <p>Hace años, completar un formulario era normal. Hoy, no.</p>
            <p>Las razones:</p>
            <ul>
              <li>El usuario desconfía de a dónde irán sus datos</li>
              <li>Los formularios son largos y aburridos</li>
              <li>No hay un incentivo claro para completarlos</li>
              <li>Interrumpen la experiencia en vez de aportar valor</li>
            </ul>
            <p>El resultado: menos leads y peor calidad.</p>

            <h2>¿Qué pasa cuando obligas a completar un formulario?</h2>
            <ul>
              <li>El 80% abandona antes de enviar sus datos</li>
              <li>Los que completan suelen ser curiosos, no compradores reales</li>
              <li>El equipo comercial pierde tiempo contactando leads mal calificados</li>
            </ul>

            <h2>¿Hay alternativa?</h2>
            <p>Sí. Y es mucho más efectiva.</p>
            <p>Un sistema que:</p>
            <ul>
              <li>Pida los datos de manera natural, dentro de la experiencia</li>
              <li>Converse en vez de interrogar</li>
              <li>Genere confianza y entregue valor antes de pedir algo a cambio</li>
            </ul>

            <h2>¿Cómo lo resuelve Maia?</h2>
            <p>En un recorrido inteligente, los datos se capturan mientras la persona interactúa, sin que lo sienta como un formulario.</p>
            <ul>
              <li>El asistente conversacional pide la información en el momento justo</li>
              <li>El visitante entiende que los datos son para recibir ayuda inmediata</li>
              <li>No hay fricción: se siente como parte natural de la visita</li>
            </ul>
            <p>Así, los leads son más reales, más calificados y llegan con contexto.</p>

            <hr />

            <h2>Conclusión</h2>
            <p>No es que la gente no quiera dejar sus datos.<br />
            No quiere sentir que está llenando un formulario.</p>
            <p>Si la información fluye como parte de la conversación, los resultados son radicalmente distintos.</p>
            <p className="font-bold">¿Todavía estás esperando que los formularios hagan el trabajo?<br />Hay una manera mejor.</p>
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
          headline: "El gran problema de los formularios: por qué nadie quiere dejar sus datos",
          image: "https://maiavr.cl/images/blog/nadie-quiere-dejar-sus-datos.jpg",
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
          datePublished: "2025-07-17",
          description: "Los formularios están quedando obsoletos. Descubre por qué no funcionan y cómo capturar datos de manera natural, sin fricción, dentro de un recorrido inteligente."
        })
      }} />
    </main>
  );
}