'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { getAssetPath } from '../../lib/assetUtils'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true)
        
        // Fetch dynamic posts from our API
        const response = await fetch('/api/blog/posts')
        const data = await response.json()
        
        if (data.success) {
          setPosts(data.posts)
        } else {
          throw new Error(data.error || 'Failed to fetch posts')
        }
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando artículos...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600">Error al cargar el blog</h1>
              <p className="mt-2 text-gray-600">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              {...fadeInUp}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
                Blog Maia
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Descubre cómo transformar tus recorridos virtuales en herramientas de inteligencia comercial
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No hay artículos disponibles</h2>
                <p className="text-gray-600">Pronto publicaremos contenido interesante sobre recorridos virtuales e inteligencia comercial.</p>
              </div>
            ) : (
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={stagger}
                initial="initial"
                animate="animate"
              >
                {posts.map((post, index) => (
                  <motion.article
                    key={post.slug || post.id}
                    className="bg-white rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden group"
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative overflow-hidden">
                        <Image
                          src={getAssetPath(post.imageUrl || '/images/blog/default-placeholder.jpg')}
                          alt={post.title}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span>{post.author || 'Maia'}</span>
                          <span className="mx-2">•</span>
                          <span>{post.date}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors duration-300">
                          Leer más
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center text-white max-w-3xl mx-auto"
              {...fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Listo para transformar tus recorridos virtuales?
              </h2>
              <p className="text-xl mb-8 text-primary-100">
                Descubre cómo Maia puede convertir tus recorridos en herramientas de inteligencia comercial
              </p>
              <Link 
                href="/como-funciona"
                className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-300"
              >
                Conoce Maia
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
