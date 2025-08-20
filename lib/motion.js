'use client';

// Importa directamente lo que necesitamos de framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// Exporta directamente las importaciones
export { motion, AnimatePresence };

// Animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

export const slideDown = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Export some commonly used motion components
export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionSpan = motion.span;
export const MotionP = motion.p;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;
export const MotionUl = motion.ul;
export const MotionLi = motion.li;
export const MotionImg = motion.img; 