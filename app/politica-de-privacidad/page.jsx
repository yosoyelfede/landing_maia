"use client";

import { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: 'Política de Privacidad - Maia',
  description: 'Política de privacidad y tratamiento de datos del sitio web de Maia.',
};

export default function PrivacidadPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection to match navbar behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10); // Same threshold as navbar
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Dynamic padding for the content - larger when navbar is large
  const contentPadding = isScrolled
    ? "py-20" // Normal padding when scrolled (navbar is small)
    : "py-28 sm:py-32"; // Extra padding when not scrolled (navbar is large)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className={`flex-grow ${contentPadding} container mx-auto px-4 max-w-3xl transition-all duration-500 ease-in-out`}>
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Política de Privacidad</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Actualmente, este sitio no recolecta ningún tipo de información personal ni utiliza cookies. 
            En caso de incorporar estas funcionalidades en el futuro, esta política será actualizada.
          </p>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 