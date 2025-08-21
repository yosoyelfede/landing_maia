import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { getAssetPath } from '../../../lib/assetUtils'

// Generate static params for static generation
export async function generateStaticParams() {
  try {
    // Read dynamic posts from JSON file
    const jsonFilePath = path.join(process.cwd(), 'public/data/blog-posts.json')
    let posts = []
    
    try {
      const jsonContent = await fs.readFile(jsonFilePath, 'utf8')
      posts = JSON.parse(jsonContent)
    } catch (error) {
      console.log('No dynamic posts found for static generation')
      return []
    }
    
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post no encontrado | Blog Maia'
    }
  }

  return {
    title: `${post.title} | Blog Maia`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: getAssetPath(post.imageUrl || '/images/blog/default-placeholder.jpg'),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [getAssetPath(post.imageUrl || '/images/blog/default-placeholder.jpg')],
    },
  }
}

// Get post data
async function getPost(slug) {
  try {
    // Try to read from JSON file first (dynamic posts)
    const jsonFilePath = path.join(process.cwd(), 'public/data/blog-posts.json')
    
    try {
      const jsonContent = await fs.readFile(jsonFilePath, 'utf8')
      const posts = JSON.parse(jsonContent)
      const post = posts.find(p => p.slug === slug)
      
      if (post) {
        return {
          ...post,
          type: 'dynamic'
        }
      }
    } catch (error) {
      console.log('No dynamic posts file found or error reading it')
    }
    
    // If not found in dynamic posts, could check for static posts here
    // For now, we'll just return null
    return null
    
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// Main page component
export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  // Calculate reading time (approximate)
  const wordsPerMinute = 200
  const wordCount = post.content ? post.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                  <Link href="/" className="hover:text-primary-600 transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/blog" className="hover:text-primary-600 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-800">{post.title}</li>
              </ol>
            </nav>

            {/* Article Header */}
            <header className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-center space-x-6 text-gray-600 mb-8">
                <div className="flex items-center">
                  <span className="font-medium">{post.author || 'Maia'}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{readingTime} min de lectura</span>
                </div>
              </div>

              {post.excerpt && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Featured Image */}
            {post.imageUrl && (
              <div className="max-w-4xl mx-auto mb-12">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={getAssetPath(post.imageUrl)}
                    alt={post.title}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="max-w-4xl mx-auto">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-gray-900 prose-strong:font-semibold prose-a:text-primary-600 prose-a:no-underline hover:prose-a:text-primary-700 prose-ul:my-6 prose-ol:my-6 prose-li:text-gray-700 prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-primary-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Article Footer */}
            <footer className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-600">
                    Publicado por <span className="font-medium text-gray-900">{post.author || 'Maia'}</span>
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver al blog
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </article>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16 mt-16">
          <div className="container mx-auto px-4">
            <div className="text-center text-white max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Te gustó este artículo?
              </h2>
              <p className="text-xl mb-8 text-primary-100">
                Descubre cómo Maia puede transformar tus recorridos virtuales en herramientas de inteligencia comercial
              </p>
              <Link 
                href="/como-funciona"
                className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-300"
              >
                Conoce más sobre Maia
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

// Enable static generation with ISR
export const revalidate = 3600 // Revalidate every hour
