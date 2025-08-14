import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export default function BlogPost() {
  const title = '5 métricas clave que puedes obtener desde un recorrido virtual con IA';
  const desc = 'Mide lo que importa: tiempo de interacción, zonas de interés, preguntas, intención de compra y leads con contexto. Convierte tu recorrido en inteligencia comercial.';
  const url = 'https://maiavr.cl/blog/metricas-recorrido-virtual/';
  const ogImg = 'https://maiavr.cl/images/blog/metricas-recorrido-virtual.jpg';

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
        <meta property="article:published_time" content="2025-08-06T00:00:00Z" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            description: desc,
            image: ogImg,
            author: { '@type': 'Organization', name: 'Maia' },
            publisher: { '@type': 'Organization', name: 'Maia', logo: { '@type': 'ImageObject', url: 'https://maiavr.cl/images/logo.png' }},
            datePublished: '2025-08-06',
            mainEntityOfPage: { '@type': 'WebPage', '@id': url }
          })
        }} />
      </Head>

      <Navbar />

      <div className="pt-24">
        <header className="relative mb-16">
          <img src={getAssetPath('/images/blog/metricas-recorrido-virtual.jpg')} alt="Métricas de un recorrido virtual con IA" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/60" />
          <div className="relative z-10 container mx-auto px-4 py-32 md:py-40 text-center text-white">
            <div className="mb-4"><Link href="/blog" className="hover:text-primary-300 font-semibold">← Volver al blog</Link></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium"><span>6 Agosto, 2025</span><span>·</span><span>4 min de lectura</span></div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <p><strong>Resumen:</strong><br />No se trata solo de captar leads. Un recorrido con IA entrega métricas que permiten vender mejor y priorizar con datos.</p>
            <hr />
            <h2>¿Qué mide un recorrido tradicional?</h2>
            <p>Normalmente, nada útil: ni quién visitó, ni qué interesó, ni dónde hubo fricción.</p>
            <h2>Las 5 métricas que sí importan</h2>
            <h3>1. Tiempo total de interacción</h3><p>Clasifica interés y compara engagement entre propiedades.</p>
            <h3>2. Zonas de mayor atención</h3><p>Identifica qué ambientes generan más exploración.</p>
            <h3>3. Preguntas realizadas</h3><p>El asistente registra dudas e intereses reales del comprador.</p>
            <h3>4. Intención de compra</h3><p>Estimación basada en permanencia, interacción y comportamiento.</p>
            <h3>5. Leads con contexto</h3><p>Más que un correo: sabes qué miró, qué preguntó y si conviene contactar ya.</p>
            <h2>¿Por qué importan?</h2>
            <p>Porque vender es entender. Datos mejores = decisiones mejores para marketing y ventas.</p>
            <h2>Conclusión</h2>
            <p>Medir no es opcional. Si tu recorrido no dice nada, no te ayuda a vender. Con Maia, cada visita se convierte en aprendizaje y conversión.</p>
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