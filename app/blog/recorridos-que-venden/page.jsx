import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export const metadata = {
  title: '¿Y si tus recorridos virtuales no estuvieran vendiendo?',
  description: 'La mayoría de los recorridos virtuales son solo visuales. No venden, no califican, no informan. Descubre cómo transformar cualquier recorrido en una herramienta de ventas sin rehacer nada.',
}

export default function BlogPost() {
  return (
    <main>
      <Navbar />

      <div className="pt-24">
        <header className="relative mb-16">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={getAssetPath("/images/blog/recorridos-que-venden.png")} 
              alt="Recorrido virtual inmobiliario sin vender" 
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
              ¿Y si tus recorridos virtuales no estuvieran vendiendo?
            </h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium">
              <span>Julio 2025</span>
              <span>·</span>
              <span>4 min de lectura</span>
            </div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <p><strong>Resumen:</strong><br />
            La mayoría de los recorridos virtuales son visuales, no comerciales. Atraen, pero no convierten. Este artículo explica por qué no están funcionando y qué puedes hacer para que sí lo hagan.</p>

            <hr />

            <h2>¿Qué está fallando?</h2>
            <p>Las inmobiliarias invierten en renders, videos y recorridos, pero los leads siguen sin calificar.</p>
            <p>La mayoría de los recorridos virtuales:</p>
            <ul>
              <li>No conversan con el cliente</li>
              <li>No capturan datos útiles</li>
              <li>No entregan información comercial accionable</li>
            </ul>
            <p>Son vitrinas bonitas. Pero no venden.</p>

            <h2>¿Qué deberían hacer?</h2>
            <p>Los equipos de marketing necesitan herramientas que conecten con los usuarios y que generen oportunidades reales. Y los equipos de ventas necesitan información para actuar a tiempo.</p>
            <p>Un recorrido bien implementado puede hacer eso. Pero no lo va a hacer solo.</p>

            <h2>¿Qué es lo mínimo que deberías exigirle a un recorrido?</h2>
            <ul>
              <li>Que identifique al visitante sin fricción</li>
              <li>Que entregue alguna forma de contacto</li>
              <li>Que te diga si está interesado o solo mirando</li>
              <li>Que le permita al comercial saber cómo abordarlo</li>
              <li>Que sea activable: que permita dar seguimiento inmediato</li>
            </ul>
            <p>Si no cumple con eso, no es una herramienta de ventas. Es una postal interactiva.</p>

            <h2>¿Qué hace diferente Maia?</h2>
            <p>Con Maia puedes tomar cualquier recorrido virtual (incluso uno que ya tengas publicado) y agregarle una capa de inteligencia:</p>
            <ul>
              <li>Un asistente conversacional personalizado que guía, destaca atributos y responde dudas</li>
              <li>Captura de datos sin formularios ni fricción</li>
              <li>Seguimiento del comportamiento: qué miró, cuánto tiempo, qué preguntó</li>
              <li>Reportes listos para el equipo comercial, en tiempo real</li>
            </ul>
            <p>No tienes que rehacer el recorrido. Solo agregarle inteligencia.</p>

            <hr />

            <h2>Conclusión</h2>
            <p>No necesitas más tráfico.<br />
            Necesitas que el tráfico que ya tienes se convierta.</p>
            <p>Un recorrido inteligente no reemplaza a tu equipo de ventas.<br />
            Pero sí los prepara para que puedan vender mejor.</p>

            <p className="font-bold">¿Tienes un recorrido que no está funcionando como esperabas?<br />Conviértelo en una herramienta de ventas con Maia.</p>
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
          headline: "¿Y si tus recorridos virtuales no estuvieran vendiendo?",
          image: "https://maiavr.cl/images/blog/recorridos-que-venden.png",
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
          datePublished: "2025-07-03",
          description: "La mayoría de los recorridos virtuales son solo visuales. No venden, no califican, no informan. Descubre cómo transformar cualquier recorrido en una herramienta de ventas sin rehacer nada."
        })
      }} />
    </main>
  );
}
