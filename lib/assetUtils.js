/**
 * Utility to handle asset URLs correctly with GitHub Pages deployment
 * 
 * @param {string} path - Path to the asset, starting with '/'
 * @returns {string} - The correct path to the asset
 */
export function getAssetPath(path) {
  // Using empty base path now that we have a custom domain
  const basePath = '';
  return `${basePath}${path}`;
} 