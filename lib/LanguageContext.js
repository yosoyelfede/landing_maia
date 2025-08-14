"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Initialize language from localStorage if available, otherwise use Spanish as default
  const [language, setLanguage] = useState('es');
  
  useEffect(() => {
    // Get language from localStorage on client side
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    // For debugging - log language changes
    console.log('Language set to:', language);
  }, []); // Only run once on component mount

  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Dispatch storage event so other components can listen for it
    window.dispatchEvent(new Event('storage'));
    
    // Log for debugging
    console.log('Language toggled to:', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 