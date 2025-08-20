const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Asegurar que exista el directorio
function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) return true;
  
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

// Crear el logo principal
function createMainLogo() {
  const width = 300;
  const height = 100;
  const filePath = 'public/logos/main/logo.png';
  
  ensureDirectoryExists(filePath);
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Texto "MAIA" con fondo transparente
  ctx.fillStyle = '#0a1857'; // Color primario
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('MAIA', width / 2, height / 2);
  
  // Guardar como PNG (con transparencia)
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filePath, buffer);
  
  console.log(`✅ Logo principal creado: ${filePath}`);
}

createMainLogo(); 