import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAssetPath } from '../../../lib/assetUtils';

export const metadata = {
  title: '¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor',
  description: 'Descubre cuándo conviene usar un render o un recorrido virtual en proyectos inmobiliarios y cómo transformar recorridos existentes en herramientas de ventas con Maia.',
  openGraph: {
    title: '¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor',
    description: 'Descubre cuándo conviene usar un render o un recorrido virtual en proyectos inmobiliarios y cómo Maia puede transformar recorridos en herramientas de venta inteligentes.',
    url: 'https://maiavr.cl/blog/render-vs-recorrido-virtual/',
    type: 'article',
    publishedTime: '2025-06-25T00:00:00.000Z',
    authors: ['Maia'],
    images: [
      {
        url: 'https://maiavr.cl/images/blog/render-vs-recorrido.png',
        width: 1200,
        height: 630,
        alt: 'Comparativa entre render y recorrido virtual inmobiliario',
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
              src={getAssetPath("/images/blog/render-vs-recorrido.png")} 
              alt="Comparativa entre render y recorrido virtual inmobiliario" 
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
              ¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor
            </h1>
            <div className="flex justify-center gap-4 text-sm text-gray-200 font-medium">
              <span>25 Junio, 2025</span>
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
              <li>Es plano: muestra una única perspectiva fija del espacio</li>
              <li>No permite capturar datos ni entender el comportamiento del interesado</li>
            </ul>

            <hr />

            <h2>¿Qué es un recorrido virtual?</h2>
            <p>Un recorrido virtual es una experiencia digital que permite a los usuarios explorar una propiedad en 360°, desde cualquier dispositivo.</p>

            <h3>Ventajas:</h3>
            <ul>
              <li>Permite recorrer la propiedad en cualquier momento y lugar</li>
              <li>Mejora la comprensión espacial frente a un render</li>
              <li>Aumenta el tiempo de permanencia y el engagement</li>
            </ul>

            <h3>Limitaciones:</h3>
            <ul>
              <li>No capta datos de contacto ni preferencias</li>
              <li>No entrega información al equipo comercial</li>
              <li>No permite saber qué partes generaron más interés</li>
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
                    <td className="px-4 py-3 text-sm text-gray-700">Render para redes + recorrido para sitio</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>¿Cómo convierte Maia un recorrido común en una herramienta de ventas?</h2>
            <ul>
              <li>Asistente AI que responde y personaliza en tiempo real</li>
              <li>Captura datos sin fricción</li>
              <li>Analiza comportamiento completo</li>
              <li>Entrega insights de intención de compra</li>
            </ul>

            <h2>Conclusión</h2>
            <p>No se trata de elegir entre render o recorrido. Ambos tienen su rol, pero solo uno puede convertirse en una herramienta de inteligencia comercial: el recorrido con Maia.</p>
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Quieres una demostración de Maia?</h3>
            <a 
              href="mailto:fede@maiavr.cl"
              className="inline-block px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700"
            >
              Contacta con nosotros
            </a>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}
