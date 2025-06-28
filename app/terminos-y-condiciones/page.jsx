import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: 'Términos y Condiciones - Maia',
  description: 'Términos y condiciones de uso del sitio web de Maia.',
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-28 sm:py-32 container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Términos y Condiciones</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Esta página web es meramente informativa. No representa una oferta comercial vinculante. 
            El contenido aquí mostrado puede cambiar sin previo aviso. Todos los derechos reservados por Maia.
          </p>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 