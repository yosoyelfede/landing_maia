import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Head from 'next/head';
import FinalCTA from '../../../components/FinalCTA';
import TrustedBy from '../../../components/TrustedBy';

export const metadata = {
  title: '¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor',
  description: '¿Render o recorrido virtual? Descubre cuándo conviene usar cada uno en proyectos inmobiliarios y cómo transformar recorridos existentes en herramientas de venta con Maia.',
}

export default function BlogPost() {
  return (
    <main>
      <Navbar />

      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:title" content="¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor" />
        <meta property="og:description" content="¿Render o recorrido virtual? Descubre cuándo conviene usar cada uno en proyectos inmobiliarios y cómo transformar recorridos existentes en herramientas de venta con Maia." />
        <meta property="og:image" content="https://www.maiavr.cl/images/blog/render-vs-recorrido.png" />
        <meta property="og:url" content="https://www.maiavr.cl/blog/render-vs-recorrido-virtual" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor" />
        <meta name="twitter:description" content="¿Render o recorrido virtual? Descubre cuándo conviene usar cada uno en proyectos inmobiliarios y cómo transformar recorridos existentes en herramientas de venta con Maia." />
        <meta name="twitter:image" content="https://www.maiavr.cl/images/blog/render-vs-recorrido.png" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor",
          "description": "¿Render o recorrido virtual? Descubre cuándo conviene usar cada uno en proyectos inmobiliarios y cómo transformar recorridos existentes en herramientas de venta con Maia.",
          "author": {
            "@type": "Organization",
            "name": "Maia"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Maia",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.maiavr.cl/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.maiavr.cl/blog/render-vs-recorrido-virtual"
          },
          "datePublished": "2024-05-10"
        }` }} />
      </Head>

      <div className="pt-24">
        <header className="relative mb-16">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="https://www.maiavr.cl/images/blog/render-vs-recorrido.png" 
              alt="Comparación entre render y recorrido virtual inmobiliario" 
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
              ¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor
            </h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium">
              <span>10 Mayo, 2024</span>
              <span>·</span>
              <span>5 min de lectura</span>
            </div>
          </div>
        </header>

        <article className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="prose prose-lg max-w-none mb-10">
            <p><strong>Resumen:</strong><br />
            Los renders son ideales para destacar atributos visuales en etapas tempranas, mientras que los recorridos virtuales son más efectivos cuando se quiere generar conexión emocional y captar leads calificados.</p>

            <hr />

            <h2>¿Qué es un render inmobiliario?</h2>
            <p>Un render inmobiliario es una imagen digital que simula cómo se verá un proyecto una vez construido. Se utiliza para mostrar espacios, terminaciones, iluminación y ambiente general.</p>

            <h3>Ventajas:</h3>
            <ul>
              <li>Comunica visualmente el concepto del proyecto</li>
              <li>Útil para campañas de atracción en redes sociales y plataformas visuales</li>
              <li>Puede utilizarse en etapas tempranas sin necesidad de mucho desarrollo</li>
            </ul>

            <h3>Limitaciones:</h3>
            <ul>
              <li>Es estático: el usuario no puede interactuar ni moverse dentro de la imagen</li>
              <li>Es plano: muestra una única perspectiva fija del espacio, sin posibilidad de cambiar el punto de vista</li>
              <li>No permite capturar datos ni entender el comportamiento del interesado</li>
            </ul>

            <hr />

            <h2>¿Qué es un recorrido virtual?</h2>
            <p>Un recorrido virtual es una experiencia digital que permite a los usuarios explorar una propiedad en 360°, desde cualquier dispositivo, como si estuvieran físicamente ahí.<br />
            Se usa comúnmente en sitios web de proyectos inmobiliarios para reemplazar o complementar la visita presencial.</p>

            <h3>Ventajas:</h3>
            <ul>
              <li>Permite recorrer la propiedad en cualquier momento y desde cualquier lugar</li>
              <li>Mejora la comprensión espacial del proyecto frente a un render estático</li>
              <li>Aumenta el tiempo de permanencia y el engagement del usuario</li>
            </ul>

            <h3>Limitaciones:</h3>
            <ul>
              <li>No capta datos de contacto ni preferencias del usuario</li>
              <li>No entrega información al equipo comercial</li>
              <li>No permite saber qué partes del recorrido generaron más interés</li>
            </ul>

            <h2>¿Cuándo conviene usar uno u otro?</h2>
            <div className="overflow-x-auto my-6">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Etapa del proyecto</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Mejor opción</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Por qué</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700">Idea / anteproyecto</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Render</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Más barato y rápido para probar interés</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700">Preventa (sin sala de ventas)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Recorrido virtual</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Sustituye la visita física y aumenta la conversión</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700">Lanzamiento de campaña digital</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Render + recorrido virtual</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Render para redes + recorrido para sitio y contacto</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700">Proyecto en venta con piloto</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Recorrido + fotos reales</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Refuerza la experiencia para compradores que están lejos</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700">Venta internacional</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Recorrido virtual</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Elimina barreras de distancia y horario</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>¿Cómo convierte Maia un recorrido común en una herramienta de ventas?</h2>
            <p>Hoy, todos los recorridos virtuales del mercado solo sirven para mirar. Ninguno vende.<br />
            Ninguno te dice quién los vio, por cuánto tiempo, qué le interesó o qué preguntó.</p>

            <p>Con Maia, puedes reutilizar tu recorrido actual y transformarlo en una herramienta activa de venta e inteligencia comercial. ¿Cómo?</p>
            <ul>
              <li>Guiamos al visitante con un asistente AI que responde preguntas, destaca atributos y personaliza la experiencia en tiempo real (una funcionalidad única en el mundo)</li>
              <li>Captamos datos como nombre, RUT, correo e intereses a través de lenguaje natural, sin fricción y sin formularios</li>
              <li>Analizamos el comportamiento completo dentro del recorrido: qué miró, cuánto tiempo estuvo, qué ignoró, qué preguntó</li>
              <li>Te entregamos información sobre intención de compra y nivel de interés de cada visitante</li>
            </ul>

            <p>Esto ya no es una visualización pasiva. Es una experiencia de venta activa.</p>

            <hr />

            <h2>¿Qué debería hacer una inmobiliaria si quiere vender más (y mejor)?</h2>
            <p>Hoy, muchas inmobiliarias ya tienen renders y recorridos. El problema es que los están usando como piezas de apoyo, no como herramientas comerciales.</p>

            <p>Lo ideal sería:</p>
            <ul>
              <li>Usar los renders para captar atención temprana en redes sociales, portales y presentaciones</li>
              <li>Implementar recorridos virtuales como el punto central de sus sitios web para que el cliente explore la propiedad de forma autónoma</li>
              <li>Agregar inteligencia a ese recorrido a través de Maia: transformar esa visualización en una experiencia guiada, personalizada y medible</li>
            </ul>

            <hr />

            <h2>Conclusión</h2>
            <p>No se trata de elegir entre render o recorrido.<br />
            Se trata de entender que ambos tienen un rol distinto, y que solo uno de ellos puede evolucionar a ser una herramienta de inteligencia comercial.</p>

            <p>Si quieres vender más, con mejores leads y menos fricción, necesitas un recorrido que haga más que solo mostrar:<br />
            <strong>necesitas un recorrido que hable, que capte, que analice y que venda.</strong></p>

            <p className="font-bold">¿Ya tienes un recorrido virtual? Poténcialo con Maia.</p>
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

      <FinalCTA />
      <TrustedBy />
      <Footer />
    </main>
  );
}