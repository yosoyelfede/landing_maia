import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

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
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Blog de <span className="text-primary-600">Maia</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-3xl mx-auto">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-64 relative overflow-hidden bg-gray-100">
                    <img 
                      src={post.imageUrl} 
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
      
      <Footer />
    </main>
  );
} 