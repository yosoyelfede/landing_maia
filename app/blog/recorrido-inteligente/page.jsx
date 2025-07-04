import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export const metadata = {
  title: '¿Qué es un recorrido inteligente? (Y por qué tu equipo de ventas lo necesita urgentemente)',
  description: 'Un recorrido inteligente no solo muestra. Guía, conversa y vende. Descubre cómo transformar cualquier recorrido virtual en una herramienta de ventas con IA, sin rehacer nada.',
}

export default function BlogPost() {
  return (
    <main>
      <Navbar />

      <div className="pt-24">
        <header className="relative mb-16">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={getAssetPath("/images/blog/recorrido-inteligente.png")} 
              alt="Recorrido inteligente IA para inmobiliarias" 
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
              ¿Qué es un recorrido inteligente? (Y por qué tu equipo de ventas lo necesita urgentemente)
            </h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium">
              <span>Junio 2025</span>
              <span>·</span>
              <span>4 min de lectura</span>
            </div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <p><strong>Resumen:</strong><br />
            Un recorrido inteligente no solo muestra una propiedad. Conversa con tus clientes, entiende qué les interesa y te ayuda a vender mejor. Es la evolución natural del marketing inmobiliario digital.</p>

            <hr />

            <h2>¿Qué es un recorrido inteligente?</h2>
            <p>Un recorrido inteligente es una evolución del recorrido virtual tradicional. Ya no se trata solo de explorar en 360°. Se trata de guiar, conversar y capturar insights reales del visitante.</p>
            <p>En lugar de una experiencia pasiva, es una experiencia comercial activa.</p>

            <h3>Ventajas frente a un recorrido tradicional:</h3>
            <ul>
              <li>Acompaña al visitante con un asistente AI que responde dudas y guía la visita</li>
              <li>Capta datos reales (nombre, contacto, preferencias) sin formularios</li>
              <li>Entrega al equipo de ventas información sobre comportamiento e intención de compra</li>
              <li>Aumenta el tiempo de permanencia y el engagement dentro del sitio</li>
            </ul>

            <h3>Lo que cambia en la práctica:</h3>
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Sin recorrido inteligente</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Con recorrido inteligente</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700">El usuario entra, mira y se va</td>
                    <td className="px-4 py-3 text-sm text-gray-700">El usuario conversa, deja datos e interactúa</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700">Nadie sabe qué miró o qué le interesó</td>
                    <td className="px-4 py-3 text-sm text-gray-700">El equipo comercial recibe reportes en tiempo real</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700">No hay acción comercial posterior</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Se activa seguimiento automático y calificación de leads</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>¿Por qué tu equipo de ventas lo necesita?</h2>
            <p>Porque el 100% de las inmobiliarias dice lo mismo: <em>"los leads no califican"</em>.<br />
            La mayoría de los recorridos virtuales no aportan nada al trabajo del equipo comercial.</p>
            <p>Un recorrido inteligente:</p>
            <ul>
              <li>Filtra automáticamente quién tiene real intención de compra</li>
              <li>Prioriza leads según comportamiento e intereses dentro del recorrido</li>
              <li>Permite dar seguimiento inmediato desde una base mucho más rica</li>
            </ul>
            <p>No se trata solo de capturar correos.<br />
            Se trata de saber <strong>quién está listo para comprar y por qué</strong>.</p>

            <h2>¿Cómo lo hace Maia?</h2>
            <p>En Maia desarrollamos una capa de inteligencia que puedes agregar sobre cualquier recorrido virtual existente. Sin rehacer nada.</p>
            <p>¿Qué hace esa capa?</p>
            <ul>
              <li>Agrega un asistente conversacional dentro del recorrido (con lenguaje natural, sin fricción)</li>
              <li>Personaliza la experiencia de cada visitante según su perfil e interés</li>
              <li>Capta información útil para el equipo comercial, incluso si el usuario no completa un formulario</li>
              <li>Analiza todo el comportamiento dentro del recorrido: tiempo, preguntas, foco de interés</li>
            </ul>
            <p>Y sí: esto ya existe hoy y está funcionando con resultados reales.</p>

            <hr />

            <h2>Conclusión</h2>
            <p>El recorrido virtual fue un gran avance en visualización digital inmobiliaria.<br />
            Pero ya no es suficiente.</p>
            <p>Si quieres convertir visitas en ventas, necesitas algo más:<br />
            Un recorrido que no solo muestre, sino que <strong>guíe, hable, analice y convierta</strong>.</p>
            <p className="font-bold">¿Ya tienes un recorrido virtual? Conviértelo en inteligente con Maia.</p>
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Quieres una demostración de Maia?</h3>
            <a 
              href="mailto:manuel@maiavr.cl?subject=¡Quiero%20probar%20Maia!&body=Me%20interesa%20saber%20más%20y%20probar%20Maia,%20quiero%20agendar%20una%20demo"
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
          headline: "¿Qué es un recorrido inteligente? (Y por qué tu equipo de ventas lo necesita urgentemente)",
          image: "https://maiavr.cl/images/blog/recorrido-inteligente.png",
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
          datePublished: "2025-06-18",
          description: "Un recorrido inteligente no solo muestra. Guía, conversa y vende. Descubre cómo transformar cualquier recorrido virtual en una herramienta de ventas con IA, sin rehacer nada."
        })
      }} />
    </main>
  );
}
