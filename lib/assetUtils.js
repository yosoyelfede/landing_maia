/**
 * Utility to handle asset URLs correctly with GitHub Pages deployment
 * 
 * @param {string} path - Path to the asset, starting with '/'
 * @returns {string} - The correct path to the asset
 */
export function getAssetPath(path) {
  // In production, add the base path
  const basePath = process.env.NODE_ENV === 'production' ? '/landing_maia' : '';
  return `${basePath}${path}`;
} 