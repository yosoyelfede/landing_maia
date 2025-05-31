"use client";

import Link from 'next/link';
import { getAssetPath } from '../lib/assetUtils';
import { useLanguage } from '../lib/LanguageContext';
import translations from '../lib/translations';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language, toggleLanguage } = useLanguage();
  
  // Get translations based on current language
  const navigation = translations.navigation[language];
  const footerText = translations.footer[language];
  const accessibility = translations.accessibility[language];
  const languageToggleText = translations.languageToggle[language];

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
            {/* Navigation Links */}
            <div className="flex flex-col md:flex-row md:items-center">
              <nav className="flex flex-col md:flex-row items-center justify-between w-[520px]">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[16px] font-semibold text-white hover:text-primary-300 transition-colors duration-300 mb-2 md:mb-0 whitespace-nowrap"
                    style={{ flex: '0 0 auto', textAlign: 'center' }}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center md:ml-8 gap-x-6 mt-2 md:mt-0">
                <a 
                  href="mailto:fede@maiavr.cl" 
                  aria-label={accessibility.email}
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
                  <span className="sr-only">{accessibility.linkedin}</span>
                  <div style={{ height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                </a>
                {/* Language Toggle Button */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center justify-center text-primary-900 bg-secondary-200 px-2 py-1 rounded-lg transition-colors hover:bg-secondary-300"
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
                        <clipPath id="a-footer">
                          <path fillOpacity=".7" d="M0 0h682.7v512H0z"/>
                        </clipPath>
                      </defs>
                      <g fillRule="evenodd" clipPath="url(#a-footer)" transform="scale(.9375)">
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
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              {footerText.copyright.replace('{year}', currentYear)}
            </p>
            <div className="mt-4 md:mt-0 flex gap-6">
              <Link href="/terminos-y-condiciones" className="text-sm text-gray-400 hover:text-white transition-colors">
                {footerText.terms}
              </Link>
              <Link href="/politica-de-privacidad" className="text-sm text-gray-400 hover:text-white transition-colors">
                {footerText.privacy}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}