"use client";

import { useLanguage } from '../lib/LanguageContext';
import { useState, useEffect, useRef } from 'react';

export default function LanguageSelector() {
  const { language, toggleLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50" ref={menuRef}>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-secondary-200 text-primary-900 shadow-md hover:bg-secondary-300 transition-colors duration-300"
        aria-label="Select language"
      >
        {/* Globe Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>

        {/* US/Chile Flag SVG */}
        {language === 'en' ? (
          <svg className="w-6 h-5 ml-1 overflow-hidden" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
            <g fillRule="evenodd">
              <g strokeWidth="1pt">
                <path fill="#bd3d44" d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0z" transform="scale(.9375)"/>
                <path fill="#fff" d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0z" transform="scale(.9375)"/>
              </g>
              <path fill="#192f5d" d="M0 0h389.1v275.7H0z" transform="scale(.9375)"/>
              <path fill="#fff" d="M32.4 11.8L36 22.7h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.2-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zM64.9 39.4l3.5 10.9h11.5L70.6 57 74 67.9l-9-6.7-9.3 6.7L59 57l-9-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 10.9-9.3-6.7-9.3 6.7L124 57l-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 10.9-9.3-6.7-9.2 6.7 3.5-10.9-9.3-6.7H256zm64.9 0l3.5 10.9h11.5L330 57l3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7h11.4z" transform="scale(.9375)"/>
            </g>
          </svg>
        ) : (
          <svg className="w-6 h-5 ml-1 overflow-hidden" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="a-selector">
                <path fillOpacity=".7" d="M0 0h682.7v512H0z"/>
              </clipPath>
            </defs>
            <g fillRule="evenodd" clipPath="url(#a-selector)" transform="scale(.9375)">
              <path fill="#fff" d="M0 0h768v256H0z"/>
              <path fill="#0039a6" d="M0 0h256v256H0z"/>
              <path fill="#fff" d="M167.8 191.7L128.2 162l-39.5 30 14.7-48.8L64 113.1l48.7-.5L127.8 64l15.5 48.5 48.7.1-39.2 30.4 15 48.7z"/>
              <path fill="#d52b1e" d="M0 256h768v256H0z"/>
            </g>
          </svg>
        )}
      </button>

      {isVisible && (
        <div className="absolute top-10 right-0 bg-white shadow-xl rounded-lg overflow-hidden w-32">
          <button
            onClick={() => {
              toggleLanguage();
              setIsVisible(false);
            }}
            className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-300 flex items-center ${language === 'es' ? 'font-bold bg-gray-100' : 'font-normal'}`}
          >
            <svg className="w-6 h-5 mr-2 overflow-hidden" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="a-es">
                  <path fillOpacity=".7" d="M0 0h682.7v512H0z"/>
                </clipPath>
              </defs>
              <g fillRule="evenodd" clipPath="url(#a-es)" transform="scale(.9375)">
                <path fill="#fff" d="M0 0h768v256H0z"/>
                <path fill="#0039a6" d="M0 0h256v256H0z"/>
                <path fill="#fff" d="M167.8 191.7L128.2 162l-39.5 30 14.7-48.8L64 113.1l48.7-.5L127.8 64l15.5 48.5 48.7.1-39.2 30.4 15 48.7z"/>
                <path fill="#d52b1e" d="M0 256h768v256H0z"/>
              </g>
            </svg>
            Español
          </button>
          <button
            onClick={() => {
              toggleLanguage();
              setIsVisible(false);
            }}
            className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-300 flex items-center ${language === 'en' ? 'font-bold bg-gray-100' : 'font-normal'}`}
          >
            <svg className="w-6 h-5 mr-2 overflow-hidden" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
              <g fillRule="evenodd">
                <g strokeWidth="1pt">
                  <path fill="#bd3d44" d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0z" transform="scale(.9375)"/>
                  <path fill="#fff" d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0z" transform="scale(.9375)"/>
                </g>
                <path fill="#192f5d" d="M0 0h389.1v275.7H0z" transform="scale(.9375)"/>
                <path fill="#fff" d="M32.4 11.8L36 22.7h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.5z" transform="scale(.9375)"/>
              </g>
            </svg>
            English
          </button>
        </div>
      )}
    </div>
  );
} 