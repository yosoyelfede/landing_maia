const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Rutas de imágenes que necesitamos crear
const imagesToCreate = [
  // Features
  { path: 'public/images/feature/feature-1.jpg', width: 800, height: 600, text: 'Recorridos virtuales inteligentes', color: '#0a1857' },
  { path: 'public/images/feature/feature-2.jpg', width: 800, height: 600, text: 'Captura inteligente de datos', color: '#0a1857' },
  { path: 'public/images/feature/feature-3.jpg', width: 800, height: 600, text: 'Integración sin fricciones', color: '#0a1857' },
  
  // Blog
  { path: 'public/images/blog/modelado-3d.jpg', width: 600, height: 400, text: 'Modelado 3D', color: '#3b82f6' },
  { path: 'public/images/blog/lenguaje-natural.jpg', width: 600, height: 400, text: 'Lenguaje Natural', color: '#3b82f6' },
  { path: 'public/images/blog/planos-renders.jpg', width: 600, height: 400, text: 'Planos y Renders', color: '#3b82f6' },
  
  // Logos
  { path: 'public/logos/main/logo-white.png', width: 300, height: 100, text: 'MAIA', color: '#ffffff', background: 'transparent' },
  { path: 'public/logos/partners/exxacon.png', width: 200, height: 80, text: 'Exxacon', color: '#333333', background: 'transparent' },
  { path: 'public/logos/partners/altas-cumbres.png', width: 200, height: 80, text: 'Altas Cumbres', color: '#333333', background: 'transparent' },
  { path: 'public/logos/partners/partner3.png', width: 200, height: 80, text: 'Partner 3', color: '#333333', background: 'transparent' },
  { path: 'public/logos/accelerators/udd-acelera.png', width: 200, height: 80, text: 'Acelera UDD', color: '#ffffff', background: 'transparent' },
  { path: 'public/logos/accelerators/udd-incuba.png', width: 200, height: 80, text: 'Incuba UDD', color: '#ffffff', background: 'transparent' },
];

// Función para asegurar que exista el directorio
function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) return true;
  
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

// Crear cada imagen
imagesToCreate.forEach(img => {
  ensureDirectoryExists(img.path);
  
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  
  // Dibujar fondo
  if (img.background && img.background !== 'transparent') {
    ctx.fillStyle = img.background;
    ctx.fillRect(0, 0, img.width, img.height);
  } else if (img.path.endsWith('.jpg')) {
    // Para JPG necesitamos un fondo
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, img.width, img.height);
  }
  
  // Dibujar texto
  ctx.fillStyle = img.color;
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(img.text, img.width / 2, img.height / 2);
  
  // Guardar archivo
  const buffer = canvas.toBuffer(img.path.endsWith('.jpg') ? 'image/jpeg' : 'image/png');
  fs.writeFileSync(img.path, buffer);
  
  console.log(`✅ Creado: ${img.path}`);
});

console.log('¡Todas las imágenes de placeholder han sido creadas!'); 