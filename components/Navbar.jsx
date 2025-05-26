"use client";

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import { getAssetPath } from '../lib/assetUtils';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Demo', href: '/#demo' },
  { name: 'Características', href: '/#features' },
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
        <div className="hidden md:flex md:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
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
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </header>
  );
}