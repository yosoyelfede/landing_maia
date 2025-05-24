/**
 * Utility to handle asset URLs correctly with GitHub Pages deployment
 * 
 * @param {string} path - Path to the asset, starting with '/'
 * @returns {string} - The correct path to the asset
 */
export function getAssetPath(path) {
  // En el servidor durante compilación, no tenemos acceso a process.env.NODE_ENV
  const isProduction = typeof process !== 'undefined' && 
                      process.env && 
                      process.env.NODE_ENV === 'production';
  
  // In production, add the base path
  const basePath = isProduction ? '/landing_maia' : '';
  return `${basePath}${path}`;
} 