import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export default function BlogPost() {
  const title = 'El gran problema de los formularios: por qué nadie quiere dejar sus datos';
  const desc = 'Los formularios están quedando obsoletos: generan fricción y poco valor. Aprende cómo capturar datos de manera natural dentro de un recorrido inteligente, sin perder calidad.';
  const url = 'https://maiavr.cl/blog/el-problema-de-los-formularios/';
  const ogImg = 'https://maiavr.cl/images/blog/el-problema-de-los-formularios.jpg';

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
        <meta property="article:published_time" content="2025-07-23T00:00:00Z" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            description: desc,
            image: ogImg,
            author: { '@type': 'Organization', name: 'Maia' },
            publisher: { '@type': 'Organization', name: 'Maia', logo: { '@type': 'ImageObject', url: 'https://maiavr.cl/images/logo.png' }},
            datePublished: '2025-07-23',
            mainEntityOfPage: { '@type': 'WebPage', '@id': url }
          })
        }} />
      </Head>

      <Navbar />

      <div className="pt-24">
        <header className="relative mb-16">
          <img src={getAssetPath('/images/blog/el-problema-de-los-formularios.jpg')} alt="Baja conversión de formularios en inmobiliarias" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/60" />
          <div className="relative z-10 container mx-auto px-4 py-32 md:py-40 text-center text-white">
            <div className="mb-4"><Link href="/blog" className="hover:text-primary-300 font-semibold">← Volver al blog</Link></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium"><span>23 Julio, 2025</span><span>·</span><span>4 min de lectura</span></div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <p><strong>Resumen:</strong><br />Cada vez menos personas completan formularios. La fricción, la desconfianza y la poca recompensa los vuelven obsoletos. La alternativa: experiencias que conversan y capturan datos de forma natural.</p>
            <hr />
            <h2>¿Por qué dejaron de funcionar?</h2>
            <ul>
              <li>Desconfianza sobre el uso de datos</li>
              <li>Formularios largos y aburridos</li>
              <li>Sin incentivo claro</li>
              <li>Interrumpen la experiencia</li>
            </ul>
            <h2>¿Qué pasa cuando obligas a completar?</h2>
            <ul>
              <li>Abandono elevado antes de enviar</li>
              <li>Leads curiosos, no compradores</li>
              <li>Tiempo de ventas mal invertido</li>
            </ul>
            <h2>La alternativa</h2>
            <ul>
              <li>Solicitar datos dentro de la experiencia</li>
              <li>Conversar en vez de interrogar</li>
              <li>Entregar valor antes de pedir información</li>
            </ul>
            <h2>¿Cómo lo resuelve Maia?</h2>
            <ul>
              <li>Asistente conversacional pide datos en el momento justo</li>
              <li>El visitante entiende el beneficio inmediato</li>
              <li>Captura sin fricción como parte natural de la visita</li>
            </ul>
            <p>Leads más reales, más calificados y con contexto.</p>
            <hr />
            <h2>Conclusión</h2>
            <p>No es que las personas no quieran dejar datos, es que no quieren sentir que llenan un formulario. En un recorrido inteligente, la información fluye con la conversación y mejora radicalmente la conversión.</p>
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