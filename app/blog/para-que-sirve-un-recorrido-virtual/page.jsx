import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export default function BlogPost() {
  const title = '¿Para qué sirve realmente un recorrido virtual inmobiliario?';
  const desc = 'Los recorridos virtuales no deberían ser solo visuales. Descubre su verdadero rol comercial y cómo transformarlos en herramientas activas de venta con inteligencia.';
  const url = 'https://maiavr.cl/blog/para-que-sirve-un-recorrido-virtual/';
  const ogImg = 'https://maiavr.cl/images/blog/para-que-sirve-un-recorrido-virtual.jpg';

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
        <meta property="article:published_time" content="2025-07-16T00:00:00Z" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            description: desc,
            image: ogImg,
            author: { '@type': 'Organization', name: 'Maia' },
            publisher: { '@type': 'Organization', name: 'Maia', logo: { '@type': 'ImageObject', url: 'https://maiavr.cl/images/logo.png' }},
            datePublished: '2025-07-16',
            mainEntityOfPage: { '@type': 'WebPage', '@id': url }
          })
        }} />
      </Head>

      <Navbar />

      <div className="pt-24">
        <header className="relative mb-16">
          <img src={getAssetPath('/images/blog/para-que-sirve-un-recorrido-virtual.jpg')} alt="Recorrido virtual inmobiliario como herramienta comercial" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/60" />
          <div className="relative z-10 container mx-auto px-4 py-32 md:py-40 text-center text-white">
            <div className="mb-4"><Link href="/blog" className="hover:text-primary-300 font-semibold">← Volver al blog</Link></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium"><span>16 Julio, 2025</span><span>·</span><span>4 min de lectura</span></div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <p><strong>Resumen:</strong><br />Aunque muchos los usan como vitrinas digitales, los recorridos virtuales pueden ser un canal comercial activo que atrae, guía y califica interesados.</p>
            <hr />
            <h2>El recorrido como se usa hoy</h2>
            <p>Se publica para “explorar” el proyecto. Problema: experiencia pasiva. El visitante entra, mira y se va sin dejar rastro.</p>
            <h2>El potencial desaprovechado</h2>
            <ul>
              <li><strong>Guía:</strong> responder dudas, resaltar atributos y adaptar la experiencia</li>
              <li><strong>Captura:</strong> datos de contacto y contexto sin fricción</li>
              <li><strong>Inteligencia:</strong> métricas accionables y señales de intención</li>
            </ul>
            <h2>Cuando solo es “bonito”</h2>
            <ul><li>No sabes quién lo vio</li><li>No sabes qué le interesó</li><li>No puedes hacer seguimiento inmediato</li></ul>
            <h2>¿Cómo cambia con Maia?</h2>
            <ul>
              <li>Atiende 24/7 en lenguaje natural</li>
              <li>Personaliza por perfil e interés</li>
              <li>Obtiene nombre, correo, RUT e intereses</li>
              <li>Registra interacciones y mide interés real</li>
            </ul>
            <p>El recorrido deja de ser accesorio y pasa a ser el centro del canal digital.</p>
            <hr />
            <h2>Conclusión</h2>
            <p>Un recorrido virtual no es un lujo visual: es una <strong>herramienta estratégica</strong> para vender más y mejor si integras guía, captura e inteligencia.</p>
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