// This file no longer needs framer-motion imports
// Utility functions can be added here if needed

/**
 * Combines multiple class names into a single string
 * 
 * @param {...string} classes - Class names to combine
 * @returns {string} Combined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
} 