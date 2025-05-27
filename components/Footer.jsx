import Link from 'next/link';
import { getAssetPath } from '../lib/assetUtils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center">
              <img
                src={getAssetPath("/logos/main/logo.png")} 
                alt="Maia Logo"
                className="h-20 w-auto"
              />
              <span className="text-7xl font-bold text-white ml-2 leading-none">Maia</span>
            </Link>
          </div>
          
          <div className="flex flex-col gap-6 items-center">
            {/* Navigation Links - vertical layout for mobile */}
            <nav className="flex flex-col sm:grid sm:grid-cols-3 md:flex md:flex-row gap-4 sm:gap-x-6 md:gap-x-8 text-center">
              <Link href="/" className="hover:text-primary-300 transition-colors px-4 py-1">
                Inicio
              </Link>
              <Link href="/#demo" className="hover:text-primary-300 transition-colors px-4 py-1">
                Demo
              </Link>
              <Link href="/#features" className="hover:text-primary-300 transition-colors px-4 py-1">
                Características
              </Link>
              <Link href="/como-funciona" className="hover:text-primary-300 transition-colors px-4 py-1">
                ¿Cómo funciona?
              </Link>
              <Link href="/blog" className="hover:text-primary-300 transition-colors px-4 py-1">
                Blog
              </Link>
            </nav>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-x-4 mt-2">
              <a 
                href="https://www.linkedin.com/company/maiacl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <img 
                  src={getAssetPath("/logos/linkedin.svg")} 
                  alt="LinkedIn" 
                  className="h-6 w-6"
                />
              </a>
              <a 
                href="mailto:fede@maiavr.cl" 
                aria-label="Email"
                className="text-white hover:text-primary-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} Maia. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0 flex gap-6">
              <Link href="/terminos-y-condiciones" className="text-sm text-gray-400 hover:text-white transition-colors">
                Términos y condiciones
              </Link>
              <Link href="/politica-de-privacidad" className="text-sm text-gray-400 hover:text-white transition-colors">
                Política de privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}