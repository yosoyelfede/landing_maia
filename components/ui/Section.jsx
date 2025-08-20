'use client';

import { motion } from '../../lib/motion';
import { forwardRef } from 'react';
import Container from './Container';

const Section = forwardRef(({ 
  children, 
  className = '',
  as: Component = 'section',
  container = true,
  ...props 
}, ref) => {
  const content = container ? <Container>{children}</Container> : children;

  return (
    <motion.div
      ref={ref}
      as={Component}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`py-12 sm:py-16 lg:py-20 ${className}`}
      {...props}
    >
      {content}
    </motion.div>
  );
});

Section.displayName = 'Section';

export default Section; 