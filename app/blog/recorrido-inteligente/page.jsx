import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export default function BlogPost() {
  const title = '¿Qué es un recorrido inteligente? (Y por qué tu equipo de ventas lo necesita urgentemente)';
  const desc = 'Un recorrido inteligente no solo muestra: guía, conversa y vende. Descubre cómo transformar cualquier recorrido virtual en una herramienta comercial con IA, sin rehacer nada.';
  const url = 'https://maiavr.cl/blog/recorrido-inteligente/';
  const ogImg = 'https://maiavr.cl/images/blog/recorrido-inteligente.jpg';

  return (
    <main>
      <Head>
        <title>{title} | Blog de Maia</title>
        <meta name="description" content={desc} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImg} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={ogImg} />
        <meta property="article:author" content="Maia" />
        <meta property="article:published_time" content="2025-07-02T00:00:00Z" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            description: desc,
            image: ogImg,
            author: { '@type': 'Organization', name: 'Maia' },
            publisher: { '@type': 'Organization', name: 'Maia', logo: { '@type': 'ImageObject', url: 'https://maiavr.cl/images/logo.png' }},
            datePublished: '2025-07-02',
            mainEntityOfPage: { '@type': 'WebPage', '@id': url }
          })
        }} />
      </Head>

      <Navbar />

      <div className="pt-24">
        <header className="relative mb-16">
          <img src={getAssetPath('/images/blog/recorrido-inteligente.jpg')} alt="Recorrido inteligente con IA para inmobiliarias" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/60" />
          <div className="relative z-10 container mx-auto px-4 py-32 md:py-40 text-center text-white">
            <div className="mb-4"><Link href="/blog" className="hover:text-primary-300 font-semibold">← Volver al blog</Link></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium"><span>2 Julio, 2025</span><span>·</span><span>4 min de lectura</span></div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <p><strong>Resumen:</strong><br />Un recorrido inteligente no solo muestra una propiedad. Conversa con tus clientes, entiende qué les interesa y te ayuda a vender mejor. Es la evolución natural del marketing inmobiliario digital.</p>
            <hr />
            <h2>¿Qué es un recorrido inteligente?</h2>
            <p>Es la evolución del recorrido virtual tradicional: guía, conversa y captura insights reales del visitante. De experiencia pasiva a <strong>experiencia comercial activa</strong>.</p>
            <h3>Ventajas frente a uno tradicional</h3>
            <ul>
              <li>Asistente con IA que responde dudas y guía la visita</li>
              <li>Captura de datos reales sin formularios</li>
              <li>Información de comportamiento e intención de compra para ventas</li>
              <li>Mayor permanencia y engagement</li>
            </ul>
            <h3>Lo que cambia en la práctica</h3>
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className="bg-gray-100"><th className="px-4 py-3 text-left text-sm font-semibold">Sin recorrido inteligente</th><th className="px-4 py-3 text-left text-sm font-semibold">Con recorrido inteligente</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-3">El usuario entra, mira y se va</td><td className="px-4 py-3">El usuario conversa, deja datos e interactúa</td></tr>
                  <tr><td className="px-4 py-3">No sabes qué miró o qué le interesó</td><td className="px-4 py-3">Ventas recibe reportes en tiempo real</td></tr>
                  <tr><td className="px-4 py-3">No hay acción comercial posterior</td><td className="px-4 py-3">Seguimiento automático y calificación de leads</td></tr>
                </tbody>
              </table>
            </div>
            <h2>¿Por qué tu equipo de ventas lo necesita?</h2>
            <p>Porque los leads “no califican” si el canal digital no aporta contexto. Un recorrido inteligente filtra intención real, prioriza y acelera seguimiento con mejor información.</p>
            <h2>¿Cómo lo hace Maia?</h2>
            <ul>
              <li>Asistente conversacional dentro del recorrido</li>
              <li>Personalización por perfil e interés</li>
              <li>Captura de información útil incluso sin formularios</li>
              <li>Análisis de comportamiento: tiempo, preguntas, focos de interés</li>
            </ul>
            <p>Funciona sobre recorridos existentes. No hay que rehacer nada.</p>
            <hr />
            <h2>Conclusión</h2>
            <p>Si quieres convertir visitas en ventas, necesitas un recorrido que <strong>guíe, hable, analice y convierta</strong>. Convierte el que ya tienes en inteligente con Maia.</p>
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Quieres una demostración de Maia?</h3>
            <a href="mailto:fede@maiavr.cl" className="inline-block px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700">Contacta con nosotros</a>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}