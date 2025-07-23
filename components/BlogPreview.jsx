export default function BlogPreview() {
  const blogPosts = [
    {
      title: "El gran problema de los formularios: por qué nadie quiere dejar sus datos",
      excerpt: "Los formularios están quedando obsoletos. Descubre por qué no funcionan y cómo capturar datos de manera natural, sin fricción, dentro de un recorrido inteligente.",
      author: "Fede Antunovic",
      date: "Julio 2025",
      imageUrl: "/images/blog/nadie-quiere-dejar-sus-datos.jpg"
    },
    {
      title: "¿Qué tan cerca estamos del modelado 3D automático en inmobiliarias?",
      excerpt: "En los últimos años, tecnologías como Gaussian Splatting y las nubes de puntos han transformado la forma en que capturamos y representamos espacios tridimensionales en el sector inmobiliario.",
      author: "Manuel José Fernández",
      date: "Junio 2024",
      imageUrl: "/images/blog/modelado-3d.jpg"
    },
    {
      title: "Reemplaza tus formularios por lenguaje natural",
      excerpt: "La mayoría de las inmobiliarias sigue usando formularios como puerta de entrada: Nombre, correo, RUT… y a veces, algo de información financiera. Pero esa información es apenas una parte...",
      author: "Fede Antunovic",
      date: "Mayo 2024",
      imageUrl: "/images/blog/lenguaje-natural.jpg"
    },
    {
      title: "Los planos y renders estáticos se quedaron en el pasado",
      excerpt: "Una de las situaciones más difíciles para un comprador es evaluar una propiedad que aún no existe físicamente. No hay piloto, no hay sala de ventas lista. Solo planos y renders.",
      author: "Fede Antunovic",
      date: "Abril 2024",
      imageUrl: "/images/blog/planos-renders.jpg"
    }
  ];

  // Solo usamos el primer artículo
  const featuredPost = blogPosts[0];

  return (
    <section className="py-12 bg-gray-200">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Novedades
          </h2>
          <p className="text-xl text-gray-600">
            Lee lo último de nuestro blog
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-60 relative overflow-hidden">
              <img 
                src={featuredPost.imageUrl} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900">{featuredPost.title}</h3>
              <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{featuredPost.author}</span>
                <span>{featuredPost.date}</span>
              </div>
            </div>
          </article>
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="/blog" 
            className="inline-block px-6 py-3 border-2 border-[#0a1860] text-[#0a1860] rounded-lg font-medium hover:bg-[#0a1860] hover:text-white transition-colors duration-200"
          >
            Ver todos los artículos
          </a>
        </div>
      </div>
    </section>
  );
} 