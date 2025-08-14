import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export default function BlogPost() {
  const title = 'Leads no calificados: cómo filtrar interesados reales sin perder oportunidades';
  const desc = 'El problema no es cuántos leads entran, sino no saber a quién llamar primero. Prioriza automáticamente con señales de intención de compra y contexto real desde el recorrido.';
  const url = 'https://maiavr.cl/blog/leads-no-calificados/';
  const ogImg = 'https://maiavr.cl/images/blog/leads-no-calificados.jpg';

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
        <meta property="article:published_time" content="2025-07-30T00:00:00Z" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            description: desc,
            image: ogImg,
            author: { '@type': 'Organization', name: 'Maia' },
            publisher: { '@type': 'Organization', name: 'Maia', logo: { '@type': 'ImageObject', url: 'https://maiavr.cl/images/logo.png' }},
            datePublished: '2025-07-30',
            mainEntityOfPage: { '@type': 'WebPage', '@id': url }
          })
        }} />
      </Head>

      <Navbar />

      <div className="pt-24">
        <header className="relative mb-16">
          <img src={getAssetPath('/images/blog/leads-no-calificados.jpg')} alt="Filtrar leads no calificados con inteligencia" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/60" />
          <div className="relative z-10 container mx-auto px-4 py-32 md:py-40 text-center text-white">
            <div className="mb-4"><Link href="/blog" className="hover:text-primary-300 font-semibold">← Volver al blog</Link></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium"><span>30 Julio, 2025</span><span>·</span><span>4 min de lectura</span></div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <p><strong>Resumen:</strong><br />El mayor dolor no es la falta de leads, es la mala prioridad. Con señales de intención y contexto del recorrido, ventas sabe a quién contactar primero y por qué.</p>
            <hr />
            <h2>¿Por qué duele tanto el lead no calificado?</h2>
            <p>Foco perdido en curiosos, percepción de “marketing no funciona” y esfuerzo comercial desperdiciado.</p>
            <h2>¿Qué pasaría si supieras a quién vale la pena?</h2>
            <ul>
              <li>Qué ambientes miró con interés</li>
              <li>Cuánto tiempo exploró</li>
              <li>Qué preguntas hizo</li>
              <li>En qué etapa de compra está</li>
            </ul>
            <h2>Por qué lo actual no ayuda</h2>
            <ul><li>Solo capturan nombre, correo, teléfono</li><li>Sin contexto ni nivel de interés</li><li>Nada para priorizar</li></ul>
            <h2>¿Cómo lo resuelve Maia?</h2>
            <ul>
              <li>Analiza comportamiento completo en el recorrido</li>
              <li>Detecta intención de compra en tiempo real</li>
              <li>Genera reportes con prioridad sugerida</li>
            </ul>
            <hr />
            <h2>Conclusión</h2>
            <p>No necesitas más leads, necesitas mejores decisiones. La prioridad correcta convierte mejor con menos esfuerzo.</p>
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