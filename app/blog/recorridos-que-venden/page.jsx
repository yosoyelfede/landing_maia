import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export default function BlogPost() {
  const title = '¿Y si tus recorridos virtuales no estuvieran vendiendo?';
  const desc = 'La mayoría de los recorridos virtuales son visuales, no comerciales. Descubre por qué no convierten y cómo transformarlos en una herramienta de ventas sin rehacer nada.';
  const url = 'https://maiavr.cl/blog/recorridos-que-venden/';
  const ogImg = 'https://maiavr.cl/images/blog/recorridos-que-venden.jpg';

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
        <meta property="article:published_time" content="2025-07-09T00:00:00Z" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            description: desc,
            image: ogImg,
            author: { '@type': 'Organization', name: 'Maia' },
            publisher: { '@type': 'Organization', name: 'Maia', logo: { '@type': 'ImageObject', url: 'https://maiavr.cl/images/logo.png' }},
            datePublished: '2025-07-09',
            mainEntityOfPage: { '@type': 'WebPage', '@id': url }
          })
        }} />
      </Head>

      <Navbar />

      <div className="pt-24">
        <header className="relative mb-16">
          <img src={getAssetPath('/images/blog/recorridos-que-venden.jpg')} alt="Recorrido virtual inmobiliario que no convierte" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/60" />
          <div className="relative z-10 container mx-auto px-4 py-32 md:py-40 text-center text-white">
            <div className="mb-4"><Link href="/blog" className="hover:text-primary-300 font-semibold">← Volver al blog</Link></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium"><span>9 Julio, 2025</span><span>·</span><span>4 min de lectura</span></div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <p><strong>Resumen:</strong><br />La mayoría de los recorridos virtuales son visuales, no comerciales. Atraen, pero no convierten. Aquí explicamos por qué y cómo hacer que sí vendan.</p>
            <hr />
            <h2>¿Qué está fallando?</h2>
            <p>Las inmobiliarias invierten en visuales, pero los leads no califican. Los recorridos típicos:</p>
            <ul><li>No conversan con el cliente</li><li>No capturan datos útiles</li><li>No entregan información accionable a ventas</li></ul>
            <p>Resultado: vitrinas bonitas que no venden.</p>
            <h2>¿Qué deberías exigirle a un recorrido?</h2>
            <ul>
              <li>Identificación sin fricción</li>
              <li>Forma de contacto clara</li>
              <li>Señales de interés vs. “solo mirando”</li>
              <li>Contexto para abordar comercialmente</li>
              <li>Activable: seguimiento inmediato</li>
            </ul>
            <h2>¿Qué hace diferente Maia?</h2>
            <ul>
              <li>Asistente conversacional que guía y responde</li>
              <li>Captura de datos sin formularios</li>
              <li>Tracking de comportamiento: qué miró, cuánto, qué preguntó</li>
              <li>Reportes en tiempo real para ventas</li>
            </ul>
            <p>No hay que rehacer el recorrido. Se le agrega inteligencia.</p>
            <hr />
            <h2>Conclusión</h2>
            <p>No necesitas más tráfico: necesitas que el tráfico convierta. Un recorrido inteligente prepara a ventas para vender mejor.</p>
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