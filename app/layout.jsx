// Temporarily disable Google Fonts to fix build hang
// import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { getAssetPath } from '../lib/assetUtils';
import { LanguageProvider } from '../lib/LanguageContext';

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
// const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });

export const metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://maiavr.cl'),
  title: 'Maia - Transforma tus recorridos virtuales en inteligencia comercial',
  description: 'Maia transforma tus recorridos virtuales en herramientas de inteligencia comercial, ayudando a las empresas a tomar mejores decisiones basadas en datos.',
  keywords: ['maia', 'recorridos virtuales', 'inteligencia comercial', 'análisis de datos', 'realidad virtual'],
  authors: [{ name: 'Maia' }],
  openGraph: {
    title: 'Maia - Transforma tus recorridos virtuales en inteligencia comercial',
    description: 'Maia transforma tus recorridos virtuales en herramientas de inteligencia comercial, ayudando a las empresas a tomar mejores decisiones basadas en datos.',
    url: 'https://maiavr.cl',
    siteName: 'Maia',
    images: [
      {
        url: getAssetPath('/images/og-image.jpg'),
        width: 1200,
        height: 630,
        alt: 'Maia - Transforma tus recorridos virtuales en inteligencia comercial',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maia - Transforma tus recorridos virtuales en inteligencia comercial',
    description: 'Maia transforma tus recorridos virtuales en herramientas de inteligencia comercial, ayudando a las empresas a tomar mejores decisiones basadas en datos.',
    images: [getAssetPath('/images/og-image.jpg')],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: getAssetPath('/favicon.ico'), sizes: '32x32' },
      { url: getAssetPath('/favicon.png'), sizes: 'any' }
    ],
    shortcut: getAssetPath('/favicon.png'),
    apple: getAssetPath('/favicon.png'),
  },
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=5.0, user-scalable=yes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="_jBu0z5AOuedmoN8S1RomjG9q4yuMsqHZ71Axnaa73M" />
        <link rel="icon" href={getAssetPath('/favicon.ico')} sizes="32x32" />
        <link rel="icon" href={getAssetPath('/favicon.png')} type="image/png" />
        <link rel="apple-touch-icon" href={getAssetPath('/favicon.png')} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
      </head>
      <body className="antialiased bg-white text-gray-900 font-sans min-h-screen w-full overflow-x-hidden">
        <LanguageProvider>
          <div className="w-full overflow-x-hidden max-w-[100vw]">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
