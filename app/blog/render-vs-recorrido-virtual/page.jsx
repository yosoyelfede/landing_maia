import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

export const metadata = {
  title: '¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor',
  description: '¿Render o recorrido virtual? Descubre cuándo conviene usar cada uno en proyectos inmobiliarios y cómo transformar recorridos existentes en herramientas de venta con Maia.',
  openGraph: {
    title: '¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor',
    description: 'Descubre cuándo usar renders o recorridos virtuales en inmobiliarias y cómo Maia transforma recorridos en herramientas de inteligencia comercial.',
    type: 'article',
    publishedTime: '2025-05-20',
    authors: ['Maia'],
  },
};

export default function BlogPost() {
  return (
    <main>
      <Navbar />
      
      <article className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600 transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-primary-600 transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">Render vs recorrido</span>
          </div>
          
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              ¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor
            </h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-8">
              <span>Maia</span>
              <span className="mx-2">•</span>
              <time dateTime="2025-05-20">Mayo 2025</time>
              <span className="mx-2">•</span>
              <span>5 min de lectura</span>
            </div>
            
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-10">
              <img 
                src="/images/blog/render-vs-recorrido.png" 
                alt="Render vs Recorrido Virtual" 
                className="absolute inset-0 w-full h-full object-cover"
                style={{objectPosition: '50% 50%'}}
              />
            </div>
            
            <div className="bg-gray-100 p-4 md:p-6 rounded-xl mb-10">
              <p className="text-lg md:text-xl font-medium text-gray-800">
                <strong>Resumen:</strong> Los renders son ideales para destacar atributos visuales en etapas tempranas, mientras que los recorridos virtuales son más efectivos cuando se quiere generar conexión emocional y captar leads calificados.
              </p>
            </div>
          </div>
          
          {/* Content */}
          <div className="max-w-3xl mx-auto prose prose-lg prose-primary">
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

            <hr className="my-8" />

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
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 my-6">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Etapa del proyecto</th>
                    <th className="border border-gray-300 p-3 text-left">Mejor opción</th>
                    <th className="border border-gray-300 p-3 text-left">Por qué</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">Idea / anteproyecto</td>
                    <td className="border border-gray-300 p-3 font-medium">Render</td>
                    <td className="border border-gray-300 p-3">Más barato y rápido para probar interés</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Preventa (sin sala de ventas)</td>
                    <td className="border border-gray-300 p-3 font-medium">Recorrido virtual</td>
                    <td className="border border-gray-300 p-3">Sustituye la visita física y aumenta la conversión</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Lanzamiento de campaña digital</td>
                    <td className="border border-gray-300 p-3 font-medium">Render + recorrido virtual</td>
                    <td className="border border-gray-300 p-3">Render para redes + recorrido para sitio y contacto</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Proyecto en venta con piloto</td>
                    <td className="border border-gray-300 p-3 font-medium">Recorrido + fotos reales</td>
                    <td className="border border-gray-300 p-3">Refuerza la experiencia para compradores que están lejos</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Venta internacional</td>
                    <td className="border border-gray-300 p-3 font-medium">Recorrido virtual</td>
                    <td className="border border-gray-300 p-3">Elimina barreras de distancia y horario</td>
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

            <hr className="my-8" />

            <h2>¿Qué debería hacer una inmobiliaria si quiere vender más (y mejor)?</h2>
            <p>Hoy, muchas inmobiliarias ya tienen renders y recorridos. El problema es que los están usando como piezas de apoyo, no como herramientas comerciales.</p>

            <p>Lo ideal sería:</p>
            <ul>
              <li>Usar los renders para captar atención temprana en redes sociales, portales y presentaciones</li>
              <li>Implementar recorridos virtuales como el punto central de sus sitios web para que el cliente explore la propiedad de forma autónoma</li>
              <li>Agregar inteligencia a ese recorrido a través de Maia: transformar esa visualización en una experiencia guiada, personalizada y medible</li>
            </ul>

            <hr className="my-8" />

            <h2>Conclusión</h2>
            <p>No se trata de elegir entre render o recorrido.<br />
            Se trata de entender que ambos tienen un rol distinto, y que solo uno de ellos puede evolucionar a ser una herramienta de inteligencia comercial.</p>

            <p>Si quieres vender más, con mejores leads y menos fricción, necesitas un recorrido que haga más que solo mostrar:<br />
            <strong>necesitas un recorrido que hable, que capte, que analice y que venda.</strong></p>
          </div>
          
          {/* CTA */}
          <div className="max-w-3xl mx-auto mt-12 bg-primary-50 border border-primary-100 rounded-xl p-6 md:p-8 text-center">
            <p className="text-lg md:text-xl font-medium text-gray-900 mb-4">
              ¿Ya tienes un recorrido virtual? Poténcialo con Maia.
            </p>
            <a 
              href="mailto:fede@maiavr.cl" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg text-lg font-medium hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 mx-auto"
            >
              ¡Quiero un mes de prueba gratis!
            </a>
          </div>
          
          {/* Share and navigate */}
          <div className="max-w-3xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-gray-600 text-sm mb-2">Comparte este artículo</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-primary-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-5.04 10.37l3.92 3.92L19 16.17V5H5v11.17l5.54-5.54 3.42 3.42 1.41-1.42-3.42-3.42L11.83 5H19l-1.12 1.12-3.92 3.92 1.41 1.42 3.92-3.92-5.54 5.54-3.42-3.42-1.41 1.42 3.42 3.42L5 16.17V19h11.17l-5.54-5.54-1.42-1.42 3.42-3.42 1.41 1.41z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="/blog" className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Volver al blog
              </Link>
            </div>
          </div>
        </div>
      </article>
      
      <Footer />
    </main>
  );
} 