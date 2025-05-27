import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import KeyValues from "../components/KeyValues";
import TrustedBy from "../components/TrustedBy";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import BlogSection from '../components/BlogSection';

export const metadata = {
  title: 'Maia - Convierte tus recorridos virtuales en herramientas de inteligencia comercial',
  description: 'Transforma tus recorridos virtuales en herramientas de inteligencia comercial que captan leads y analizan comportamiento.',
};

export default function HomePage() {
  return (
    <main className="space-y-0">
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