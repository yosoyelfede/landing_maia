"use client";

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import { getAssetPath } from '../lib/assetUtils';
import { useLanguage } from '../lib/LanguageContext';
import translations from '../lib/translations';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  
  // Get current navigation items based on language
  const navigation = translations.navigation[language];
  const accessibility = translations.accessibility[language];
  const languageToggleText = translations.languageToggle[language];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10); // Change state when scrolled more than 10px
    };

    // Set initial state based on current scroll position
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Dynamic classes for logo size - more conservative scaling
  const logoImageClasses = isScrolled
    ? "h-10 sm:h-12 md:h-14 lg:h-16 w-auto transition-all duration-500 ease-in-out"
    : "h-14 sm:h-16 md:h-18 lg:h-20 w-auto transition-all duration-500 ease-in-out";

  const logoTextClasses = isScrolled
    ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 ml-2 leading-none transition-all duration-500 ease-in-out"
    : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 ml-2 leading-none transition-all duration-500 ease-in-out";

  // Dynamic navbar padding to accommodate larger logo
  const navPadding = isScrolled
    ? "py-1 md:py-2"
    : "py-2 md:py-4";

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-soft backdrop-blur-lg bg-opacity-80 w-full">
      <nav 
        className={`container flex items-center justify-between ${navPadding} px-4 md:px-6 transition-all duration-500 ease-in-out`}
        aria-label="Global"
      >
        <div className="flex md:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
            <span className="sr-only">Maia</span>
            <img
              src={getAssetPath("/logos/main/logo.png")}
              alt="Maia Logo"
              className={logoImageClasses}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">{accessibility.openMenu}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-x-4 xl:gap-x-10">
          {/* Navigation container with uniform spacing to match footer */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-4">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[14px] xl:text-[16px] font-semibold transition-colors duration-300 whitespace-nowrap relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-2 after:bg-secondary-200 after:opacity-50 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                  item.name === 'Demo' 
                    ? 'text-primary-500 hover:text-gray-900' 
                    : 'text-gray-900 hover:text-primary-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a 
              href="mailto:manuel@maiavr.cl?subject=¡Quiero%20probar%20Maia!&body=Me%20interesa%20saber%20más%20y%20probar%20Maia,%20quiero%20agendar%20una%20demo" 
              aria-label={accessibility.email}
              className="text-gray-700 hover:text-primary-500 transition-colors"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <div style={{ transform: 'scale(0.9)', transformOrigin: 'center', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  width="24" 
                  height="24"
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
              className="text-gray-700 hover:text-primary-500 transition-colors"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span className="sr-only">{accessibility.linkedin}</span>
              <div style={{ height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 xl:h-6 xl:w-6">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
            </a>
            {/* Language Toggle Button - rightmost element */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center text-primary-900 bg-secondary-200 px-1.5 xl:px-2 py-1 rounded-lg transition-colors hover:bg-secondary-300"
              aria-label={accessibility.languageSwitch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 xl:h-6 xl:w-6">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              
              {/* Flag icon based on current language */}
              {language === 'en' ? (
                <svg className="w-5 h-4 xl:w-6 xl:h-5 ml-1 overflow-hidden" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
                  <g fillRule="evenodd">
                    <g strokeWidth="1pt">
                      <path fill="#bd3d44" d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0z" transform="scale(.9375)"/>
                      <path fill="#fff" d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0z" transform="scale(.9375)"/>
                    </g>
                    <path fill="#192f5d" d="M0 0h389.1v275.7H0z" transform="scale(.9375)"/>
                    <path fill="#fff" d="M32.4 11.8L36 22.7h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.5z" transform="scale(.9375)"/>
                  </g>
                </svg>
              ) : (
                <svg className="w-5 h-4 xl:w-6 xl:h-5 ml-1 overflow-hidden" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="a-nav">
                      <path fillOpacity=".7" d="M0 0h682.7v512H0z"/>
                    </clipPath>
                  </defs>
                  <g fillRule="evenodd" clipPath="url(#a-nav)" transform="scale(.9375)">
                    <path fill="#fff" d="M0 0h768v256H0z"/>
                    <path fill="#0039a6" d="M0 0h256v256H0z"/>
                    <path fill="#fff" d="M167.8 191.7L128.2 162l-39.5 30 14.7-48.8L64 113.1l48.7-.5L127.8 64l15.5 48.5 48.7.1-39.2 30.4 15 48.7z"/>
                    <path fill="#d52b1e" d="M0 256h768v256H0z"/>
                  </g>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <Dialog
          className="relative z-50"
          open={mobileMenuOpen} 
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel
            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                <span className="sr-only">Maia</span>
                <img
                  src={getAssetPath("/logos/main/logo.png")}
                  alt="Maia Logo"
                  className="h-10 w-auto"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">{accessibility.closeMenu}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 relative after:absolute after:-bottom-1 after:left-3 after:right-3 after:h-2 after:bg-secondary-200 after:opacity-50 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                        item.name === 'Demo' 
                          ? 'text-primary-500' 
                          : 'text-gray-900'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="flex items-center justify-start gap-x-3 py-3 mt-2 -mx-3 px-3">
                    <a 
                      href="mailto:manuel@maiavr.cl?subject=¡Quiero%20probar%20Maia!&body=Me%20interesa%20saber%20más%20y%20probar%20Maia,%20quiero%20agendar%20una%20demo" 
                      aria-label={accessibility.email}
                      className="text-gray-700 hover:text-primary-500 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          width="24" 
                          height="24"
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
                      className="text-gray-700 hover:text-primary-500 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">{accessibility.linkedin}</span>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </div>
                    </a>
                    
                    {/* Mobile Language Toggle Button */}
                    <button
                      onClick={() => {
                        toggleLanguage();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center text-primary-900 bg-secondary-200 px-2 py-1 rounded-lg transition-colors hover:bg-secondary-300"
                      aria-label={accessibility.languageSwitch}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                      
                      {/* Flag icon based on current language */}
                      {language === 'en' ? (
                        <svg className="w-6 h-5 ml-1 overflow-hidden" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
                          <g fillRule="evenodd">
                            <g strokeWidth="1pt">
                              <path fill="#bd3d44" d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0z" transform="scale(.9375)"/>
                              <path fill="#fff" d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0z" transform="scale(.9375)"/>
                            </g>
                            <path fill="#192f5d" d="M0 0h389.1v275.7H0z" transform="scale(.9375)"/>
                            <path fill="#fff" d="M32.4 11.8L36 22.7h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.5z" transform="scale(.9375)"/>
                          </g>
                        </svg>
                      ) : (
                        <svg className="w-6 h-5 ml-1 overflow-hidden" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <clipPath id="a-nav-mobile">
                              <path fillOpacity=".7" d="M0 0h682.7v512H0z"/>
                            </clipPath>
                          </defs>
                          <g fillRule="evenodd" clipPath="url(#a-nav-mobile)" transform="scale(.9375)">
                            <path fill="#fff" d="M0 0h768v256H0z"/>
                            <path fill="#0039a6" d="M0 0h256v256H0z"/>
                            <path fill="#fff" d="M167.8 191.7L128.2 162l-39.5 30 14.7-48.8L64 113.1l48.7-.5L127.8 64l15.5 48.5 48.7.1-39.2 30.4 15 48.7z"/>
                            <path fill="#d52b1e" d="M0 256h768v256H0z"/>
                          </g>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </header>
  );
}