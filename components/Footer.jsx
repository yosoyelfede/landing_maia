import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center">
              <img
                src="/logos/main/logo.png" 
                alt="Maia Logo"
                className="h-20 w-auto"
              />
              <span className="text-7xl font-bold text-white ml-2 leading-none">Maia</span>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <nav className="flex gap-x-8">
              <Link href="/#inicio" className="hover:text-primary-300 transition-colors">
                Inicio
              </Link>
              <Link href="/#demo" className="hover:text-primary-300 transition-colors">
                Demo
              </Link>
              <Link href="/#features" className="hover:text-primary-300 transition-colors">
                Características
              </Link>
              <Link href="/blog" className="hover:text-primary-300 transition-colors">
                Blog
              </Link>
            </nav>
            
            {/* Social Media Links */}
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/maiacl" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white hover:text-primary-300 transition-colors"
              >
                <img 
                  src="/logos/linkedin.svg" 
                  alt="LinkedIn" 
                  className="h-6 w-auto" 
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
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Términos y condiciones
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Política de privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}