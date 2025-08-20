import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: 'Política de Privacidad - Maia',
  description: 'Política de privacidad y tratamiento de datos del sitio web de Maia.',
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-28 sm:py-32 container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Política de Privacidad</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Actualmente, este sitio no recolecta ningún tipo de información personal ni utiliza cookies. 
            En caso de incorporar estas funcionalidades en el futuro, esta política será actualizada.
          </p>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 