import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export const metadata = {
  title: '¿Para qué sirve realmente un recorrido virtual inmobiliario?',
  description: 'Los recorridos virtuales no deberían ser solo visuales. Descubre su verdadero rol comercial y cómo transformarlos en herramientas activas de venta.',
}

export default function BlogPost() {
  return (
    <main>
      <Navbar />

      <div className="pt-24">
        <header className="relative mb-16">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={getAssetPath("/images/blog/para-que-sirve-un-recorrido-virtual.png")} 
              alt="Recorrido virtual inmobiliario útil para ventas" 
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
              ¿Para qué sirve realmente un recorrido virtual inmobiliario?
            </h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium">
              <span>10 Julio, 2025</span>
              <span>·</span>
              <span>4 min de lectura</span>
            </div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <p><strong>Resumen:</strong><br />
            Muchos equipos usan recorridos virtuales solo para “mostrar” proyectos. Pero ese no es su mayor valor. Este artículo explica para qué deberían usarse realmente, y cómo aprovecharlos mucho mejor.</p>

            <hr />

            <h2>¿Para qué lo estás usando hoy?</h2>
            <p>Si tu recorrido virtual está en una sección del sitio tipo “Mira el piloto en 360º”... estás perdiendo oportunidades.</p>
            <p>Un recorrido no debería ser solo una herramienta visual.<br />Puede (y debe) ser una herramienta comercial.</p>

            <h2>¿Qué podrías lograr si lo usaras bien?</h2>
            <ul>
              <li>Captar leads más calificados</li>
              <li>Saber qué espacios interesan a cada persona</li>
              <li>Entender en qué etapa está el comprador</li>
              <li>Guiarlo hacia la decisión sin intervención humana</li>
              <li>Generar más contacto sin depender de formularios</li>
            </ul>

            <h2>¿Por qué no está pasando eso hoy?</h2>
            <p>Porque los recorridos actuales son pasivos.<br />
            Esperan que el usuario “haga todo”.<br />
            Y el equipo comercial no recibe ningún dato útil.</p>

            <h2>¿Qué diferencia a un recorrido inteligente?</h2>
            <ul>
              <li>Conversan con el visitante</li>
              <li>Responden dudas y destacan lo relevante para él</li>
              <li>Detectan intención de compra en tiempo real</li>
              <li>Entregan alertas e insights al equipo de ventas</li>
            </ul>
            <p>Todo eso, sin cambiar la visual del recorrido que ya tienes.</p>

            <h2>¿Y si ya tienes uno publicado?</h2>
            <p>Puedes integrarle Maia directamente.<br />Sin rehacer nada.</p>
            <p>Reutilizas tu recorrido actual, pero con una capa de inteligencia que:</p>
            <ul>
              <li>Aumenta la conversión</li>
              <li>Califica automáticamente los leads</li>
              <li>Te dice quién vale la pena contactar y cuándo</li>
            </ul>

            <hr />

            <h2>Conclusión</h2>
            <p>No se trata de tener “un recorrido porque todos tienen uno”.</p>
            <p>Se trata de usarlo como lo que podría ser:<br />
            una pieza central del proceso de venta.</p>

            <p className="font-bold">¿Y si ese recorrido, en vez de mostrar... vendiera?</p>
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
          headline: "¿Para qué sirve realmente un recorrido virtual inmobiliario?",
          image: "https://maiavr.cl/images/blog/para-que-sirve-un-recorrido-virtual.png",
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
          datePublished: "2025-07-10",
          description: "Los recorridos virtuales no deberían ser solo visuales. Descubre su verdadero rol comercial y cómo transformarlos en herramientas activas de venta."
        })
      }} />
    </main>
  );
}
