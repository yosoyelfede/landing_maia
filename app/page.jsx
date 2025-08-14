"use client";

import { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import KeyValues from "../components/KeyValues";
import TrustedBy from "../components/TrustedBy";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import BlogSection from '../components/BlogSection';
import { useLanguage } from '../lib/LanguageContext';
import translations from '../lib/translations';


export default function HomePage() {
  const { language } = useLanguage();
  const meta = translations.metadata[language];
  
  // Update the document title based on language
  useEffect(() => {
    document.title = meta.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', meta.description);
    }
  }, [language, meta]);
  
  return (
    <main className="space-y-0 !pt-0">
      <Navbar />
      <Hero />
      <Partners />
      <KeyValues />
      <BlogSection />
      <FinalCTA />
      <TrustedBy />
      <Footer />
    </main>
  );
}