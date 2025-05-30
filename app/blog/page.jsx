import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getAssetPath } from '../../lib/assetUtils';
import FinalCTA from '../../components/FinalCTA';
import TrustedBy from '../../components/TrustedBy';
import FAQCTA from '../../components/FAQCTA';

const blogPosts = [
  {
    slug: 'render-vs-recorrido-virtual',
    title: '¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor',
    excerpt: 'Los renders son ideales para destacar atributos visuales en etapas tempranas, mientras que los recorridos virtuales son más efectivos cuando se quiere generar conexión emocional y captar leads calificados.',
    author: 'Maia',
    date: 'Mayo 2025',
    imageUrl: '/images/blog/render-vs-recorrido.png'
  }
];

export const metadata = {
  title: 'Blog | Maia - Transformando recorridos virtuales',
  description: 'Artículos sobre inteligencia artificial, recorridos virtuales y ventas inmobiliarias.',
};

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      
      {/* Hero section con fondo similar al landing */}
      <section className="relative py-20 pb-8 md:py-24 md:pb-10 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none"></div>
        
        {/* Círculos decorativos con animaciones */}
        <div className="absolute top-20 -left-28 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 -right-28 w-80 h-80 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-0">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8 animate-fade-in-up">
              Blog de <span className="text-primary-500 relative">
                Maia
                <span className="absolute bottom-1 left-0 w-full h-2 bg-secondary-200 opacity-50"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-normal text-gray-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              ¿Tienes propiedades para vender?<br />
              Esto te puede ayudar. Cada miércoles, sin falta.
            </p>
          </div>
        </div>
      </section>
      
      {/* Posts section con fondo gris */}
      <section className="py-4 md:py-6 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-3xl mx-auto">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-xl overflow-hidden border-2 border-gray-300 hover:border-gray-400 transition-colors duration-300">
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-64 relative overflow-hidden bg-gray-100">
                    <img 
                      src={getAssetPath(post.imageUrl)} 
                      alt={post.title} 
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{objectPosition: '50% 50%'}}
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Wrapper section para FAQCTA */}
      <section>
        <FAQCTA />
      </section>
      
      <FinalCTA />
      <TrustedBy />
      <Footer />
    </main>
  );
} 