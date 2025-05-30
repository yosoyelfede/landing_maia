"use client";

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import { getAssetPath } from '../lib/assetUtils';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Demo', href: '/#demo' },
  { name: 'Características', href: '/#features' },
  { name: '¿Cómo funciona?', href: '/como-funciona' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/preguntas-frecuentes' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-soft backdrop-blur-lg bg-opacity-80">
      <nav 
        className="container flex items-center justify-between py-1 md:py-2" 
        aria-label="Global"
      >
        <div className="flex md:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
            <span className="sr-only">Maia</span>
            <img
              src={getAssetPath("/logos/main/logo.png")}
              alt="Maia Logo"
              className="h-16 w-auto transition-all duration-300"
            />
            <span className="text-6xl font-bold text-gray-900 ml-2 leading-none">Maia</span>
          </Link>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú principal</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex md:items-center md:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-[16px] font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-300 ${item.name === '¿Cómo funciona?' ? 'whitespace-nowrap' : ''}`}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center gap-x-3">
            <a 
              href="mailto:fede@maiavr.cl" 
              aria-label="Email"
              className="text-gray-700 hover:text-primary-600 transition-colors"
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
              className="text-gray-700 hover:text-primary-600 transition-colors"
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
                  className="h-16 w-auto"
                />
                <span className="text-6xl font-bold text-gray-900 ml-2 leading-none">Maia</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Cerrar menu</span>
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
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="flex items-center justify-start gap-x-3 py-3 mt-2 -mx-3 px-3">
                    <a 
                      href="mailto:fede@maiavr.cl" 
                      aria-label="Email"
                      className="text-gray-700 hover:text-primary-600 transition-colors"
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
                      className="text-gray-700 hover:text-primary-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">LinkedIn</span>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </div>
                    </a>
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