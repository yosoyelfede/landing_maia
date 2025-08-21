#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateBlogPostFile } from '../lib/blogPostTemplate.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createBlogPost() {
  try {
    console.log('🚀 Creating blog post: "¿Por qué tu sitio inmobiliario espanta a los interesados?"');
    
    const postData = {
      title: '¿Por qué tu sitio inmobiliario espanta a los interesados?',
      excerpt: 'Muchos sitios inmobiliarios están diseñados para mostrar propiedades, pero no para venderlas. En este post te mostramos los errores más comunes que hacen que tus visitantes reboten y cómo transformarlos en una experiencia comercial que realmente convierte.',
      content: `<p><strong>Resumen:</strong><br />
Tu sitio web debería ser una herramienta comercial activa. Pero en muchos casos, no lo es. En este artículo revisamos los errores más comunes que cometen las inmobiliarias y corredoras en sus sitios, y cómo corregirlos para no seguir perdiendo oportunidades de venta.</p>

<hr />

<h2>1. Demasiada información técnica sin narrativa</h2>
<p>Mostrar todos los datos de una propiedad no es lo mismo que comunicar su valor. Planos, superficies, UF/m², materiales... sin contexto ni jerarquía, no dicen mucho.</p>
<ul>
  <li>Prioriza beneficios antes que características.</li>
  <li>Simplifica la información más técnica.</li>
  <li>Construye una historia comercial: "Tu primer departamento a pasos del parque" comunica más que "52 m² útiles".</li>
</ul>

<h2>2. Recorridos virtuales sin guía</h2>
<p>Tener un recorrido no es suficiente. Si la experiencia es plana, sin orientación ni interacción, no genera interés ni confianza.</p>
<ul>
  <li>Explica el valor de cada espacio con contexto comercial.</li>
  <li>Guía al visitante para que entienda qué está viendo.</li>
  <li>Integra una asistente conversacional para resolver dudas en tiempo real.</li>
</ul>

<h2>3. Formularios como única vía de contacto</h2>
<p>Forzar al visitante a entregar sus datos sin haber recibido ningún valor a cambio genera desconfianza y abandono.</p>
<ul>
  <li>Permite navegar, explorar y resolver dudas sin fricción.</li>
  <li>Capta datos progresivamente, no como requisito inicial.</li>
  <li>Ofrece una conversación antes de exigir un formulario.</li>
</ul>

<h2>4. Experiencia lenta o poco funcional en móvil</h2>
<p>Más del 60% del tráfico inmobiliario ocurre desde el celular. Si el sitio carga lento, se rompe o es difícil de usar, el visitante se va.</p>
<ul>
  <li>Optimiza velocidad de carga, especialmente en móvil.</li>
  <li>Diseña para pantallas pequeñas, no como adaptación secundaria.</li>
  <li>Facilita la navegación y reduce pasos innecesarios.</li>
</ul>

<h2>5. Falta de propuesta clara o diferenciación</h2>
<p>Si no explicas rápidamente por qué tu proyecto es distinto o relevante, el comprador lo percibe como una opción más.</p>
<ul>
  <li>Destaca lo que realmente hace única tu propuesta.</li>
  <li>Comunica con claridad para quién es la propiedad y por qué debería interesarle.</li>
  <li>No vendas características: vende una solución.</li>
</ul>

<h2>Checklist: ¿Tu sitio ayuda o frena las ventas?</h2>
<ul>
  <li>¿La propuesta de valor se entiende en los primeros segundos?</li>
  <li>¿El recorrido guía al visitante o lo deja solo?</li>
  <li>¿Se puede interactuar sin rellenar un formulario?</li>
  <li>¿Funciona bien en celular?</li>
  <li>¿Conecta emocional y funcionalmente con el tipo de comprador ideal?</li>
</ul>

<h2>Preguntas frecuentes</h2>
<p><strong>¿Cómo mejorar la conversión en mi sitio inmobiliario?</strong><br />
Acompañando al visitante desde el primer segundo, reduciendo fricción y ofreciendo una experiencia guiada que resuelva dudas antes de pedir datos.</p>

<p><strong>¿Qué es un recorrido virtual guiado?</strong><br />
Es una experiencia interactiva que entrega contexto, responde preguntas y personaliza la navegación según el perfil del visitante. No solo muestra, sino que acompaña.</p>

<p><strong>¿Cuántos leads puedo estar perdiendo?</strong><br />
En promedio, entre el 60% y 80% de los visitantes se van sin dejar rastro. Optimizar tu sitio puede multiplicar tus oportunidades de venta sin invertir más en tráfico.</p>

<h2>Conclusión</h2>
<p>Tu sitio ya no es un apoyo comercial: es tu vendedor digital principal. Si no está diseñado para captar, guiar y convertir, está frenando tus resultados.</p>

<p>¿Quieres que revisemos tu sitio y detectemos oportunidades de mejora?  
En Maia transformamos recorridos virtuales y sitios web en experiencias de venta inteligentes.</p>`,
      author: 'Maia',
      date: '4 Septiembre, 2025',
      slug: 'por-que-tu-sitio-inmobiliario-espanta-a-los-interesados',
      imageUrl: '/images/blog/por-que-tu-sitio-inmobiliario-espanta-a-los-interesados.jpg'
    };
    
    const blogDir = path.join(__dirname, '..', 'app', 'blog', postData.slug);
    const filePath = path.join(blogDir, 'page.jsx');
    
    // Create directory
    await fs.mkdir(blogDir, { recursive: true });
    
    // Generate and write the file
    const fileContent = generateBlogPostFile(postData);
    await fs.writeFile(filePath, fileContent);
    
    console.log(`✅ Blog post created successfully!`);
    console.log(`📁 File: ${filePath}`);
    console.log(`🌐 URL: http://localhost:3000/blog/${postData.slug}`);
    
  } catch (error) {
    console.error('❌ Failed to create blog post:', error);
    process.exit(1);
  }
}

createBlogPost();
