import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export const metadata = {
  title: 'Qué debería hacer hoy una inmobiliaria para vender mejor (si parte desde cero)',
  description: 'Guía práctica para inmobiliarias que comienzan desde cero: define un embudo de ventas, usa experiencias visuales con IA, automatiza el seguimiento y convierte tu web en un canal comercial activo.',
  openGraph: {
    title: 'Qué debería hacer hoy una inmobiliaria para vender mejor (si parte desde cero)',
    description: 'Descubre el plan paso a paso para armar un sistema de ventas inmobiliarias moderno desde cero, combinando marketing visual, IA y gestión de datos.',
    url: 'https://maiavr.cl/blog/inmobiliaria-desde-cero/',
    type: 'article',
    publishedTime: '2025-10-29T00:00:00.000Z',
    authors: ['Maia'],
    images: [
      {
        url: 'https://maiavr.cl/images/blog/inmobiliaria-desde-cero.png',
        width: 1200,
        height: 630,
        alt: 'Estrategia de ventas para inmobiliarias desde cero',
      },
    ],
  },
};

export default function BlogPost() {
  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <header className="relative mb-16">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={getAssetPath("/images/blog/que-deberia-hacer-una-inmobiliaria.jpg")} 
              alt="Estrategia de ventas para inmobiliarias desde cero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/60"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 py-32 md:py-40 text-center">
            <div className="mb-4">
              <Link href="/blog" className="text-white hover:text-primary-300 font-semibold">
                ← Volver al blog
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white max-w-4xl mx-auto leading-tight">
              Qué debería hacer hoy una inmobiliaria para vender mejor (si parte desde cero)
            </h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium">
              <span>12 Agosto, 2025</span>
              <span>·</span>
              <span>6 min de lectura</span>
            </div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <p><strong>Resumen:</strong><br />
            Si hoy una inmobiliaria tuviera que comenzar desde cero, tendría la oportunidad de diseñar su estrategia comercial sin las limitaciones de sistemas antiguos. La clave está en combinar herramientas digitales modernas, datos en tiempo real y una ejecución enfocada en la conversión.</p>

            <hr />

            <h2>1. Define un embudo de ventas claro y medible</h2>
            <ul>
              <li>Entiende cuántos contactos necesitas para cerrar una venta</li>
              <li>Mide cada etapa: visitas, interesados, leads calificados, cierres</li>
              <li>Usa un CRM desde el día uno para registrar y analizar</li>
            </ul>

            <h2>2. Ofrece experiencias visuales y accesibles</h2>
            <ul>
              <li>Renders para la etapa inicial de preventa</li>
              <li>Recorridos virtuales interactivos con IA para guiar y captar leads</li>
              <li>Fotografías y videos reales en la etapa de entrega</li>
            </ul>

            <h2>3. Automatiza el seguimiento</h2>
            <ul>
              <li>Bots o asistentes AI para responder 24/7</li>
              <li>Emails y mensajes automáticos personalizados</li>
              <li>Alertas para el equipo comercial con leads calientes</li>
            </ul>

            <h2>4. Centraliza la data de tus campañas</h2>
            <ul>
              <li>Unifica información de redes, portales y sitio web</li>
              <li>Identifica canales que traen leads de calidad, no solo volumen</li>
              <li>Ajusta presupuesto en base a datos, no a intuición</li>
            </ul>

            <h2>5. Optimiza tu sitio web como canal de ventas</h2>
            <ul>
              <li>Que cargue rápido, se vea bien en móvil y tenga llamadas a la acción claras</li>
              <li>Formulario simple o reemplazado por chat inteligente</li>
              <li>Integración directa con tu CRM</li>
            </ul>

            <h2>Conclusión</h2>
            <p>Comenzar desde cero te da libertad para construir una estrategia sin herencias ineficientes. Una inmobiliaria moderna debe unir marketing visual, inteligencia artificial y gestión de datos para vender más con menos esfuerzo.</p>
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Quieres implementar esta estrategia con Maia?</h3>
            <a 
              href="mailto:fede@maiavr.cl"
              className="inline-block px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700"
            >
              Contáctanos hoy
            </a>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}