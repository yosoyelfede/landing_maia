import { forwardRef } from 'react';

const Container = forwardRef(({ 
  children, 
  className = '',
  as: Component = 'div',
  ...props 
}, ref) => {
  return (
    <Component
      ref={ref}
      className={`mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

Container.displayName = 'Container';

export default Container; 