"use client";

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from '../lib/motion';
import Link from 'next/link';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Demo', href: '#demo' },
  { name: 'Características', href: '#features' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contacto', href: 'mailto:fede@maiavr.cl' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-soft backdrop-blur-lg bg-opacity-80">
      <nav 
        className="container flex items-center justify-between py-1 md:py-2" 
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
            <span className="sr-only">Maia</span>
            <img
              src="/logos/main/logo.png"
              alt="Maia Logo"
              className="h-16 w-auto transition-all duration-300"
            />
            <span className="text-6xl font-bold text-gray-900 ml-2 leading-none">Maia</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú principal</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-800 hover:text-primary-600 transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a 
            href="#demo"
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-primary-600 text-white hover:bg-primary-700 shadow-soft hover:shadow-md"
          >
            Ver Demo
          </a>
        </div>
      </nav>
      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
            <Dialog.Panel
              as={motion.div}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                  <span className="sr-only">Maia</span>
                  <img
                    src="/logos/main/logo.png"
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
                  <span className="sr-only">Cerrar menú</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <a 
                      href="#demo" 
                      className="block w-full rounded-lg bg-primary-600 px-4 py-3 text-center text-base font-medium text-white shadow-md hover:bg-primary-700 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Ver Demo
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        )}
      </AnimatePresence>
    </header>
  );
}