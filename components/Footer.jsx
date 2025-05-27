import Link from 'next/link';
import { getAssetPath } from '../lib/assetUtils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Demo', href: '/#demo' },
    { name: 'Características', href: '/#features' },
    { name: '¿Cómo funciona?', href: '/como-funciona' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="mb-8 md:mb-0 md:flex-1">
            <Link href="/" className="flex items-center">
              <img
                src={getAssetPath("/logos/main/logo.png")} 
                alt="Maia Logo"
                className="h-20 w-auto"
              />
              <span className="text-7xl font-bold text-white ml-2 leading-none">Maia</span>
            </Link>
          </div>
          
          <div className="flex md:flex-1 justify-end items-center">
            {/* Navigation Links using the exact same structure as header */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-x-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-[16px] font-semibold text-white hover:text-primary-300 transition-colors duration-300 mb-2 md:mb-0 ${item.name === '¿Cómo funciona?' ? 'whitespace-nowrap' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-x-3 mt-2 md:mt-0">
                <a 
                  href="mailto:fede@maiavr.cl" 
                  aria-label="Email"
                  className="text-white hover:text-primary-300 transition-colors"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <div style={{ transform: 'scale(1)', transformOrigin: 'center', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      width="30" 
                      height="30"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                </a>
                <a 
                  href="https://www.linkedin.com/company/maiacl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary-300 transition-colors"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span className="sr-only">LinkedIn</span>
                  <div style={{ height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                </a>
              </div>
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