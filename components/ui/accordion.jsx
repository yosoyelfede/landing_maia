import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

export function Accordion({ children, type = 'single', collapsible = true, className = '' }) {
  // Using a single string instead of an object for simpler state management in 'single' mode
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (value) => {
    // If the item is already open and collapsible is true, close it
    if (openItem === value && collapsible) {
      setOpenItem(null);
      return;
    }
    
    // Otherwise, open the item
    setOpenItem(value);
  };

  // Process children
  const processedChildren = React.Children.map(children, child => {
    if (!child || !React.isValidElement(child)) {
      return child;
    }
    
    // Only process AccordionItem components
    if (child.props && typeof child.props.value !== 'undefined') {
      const isOpen = openItem === child.props.value;
      
      return React.cloneElement(child, {
        isOpen,
        onToggle: () => toggleItem(child.props.value)
      });
    }
    
    return child;
  });

  return (
    <div className={className}>
      {processedChildren}
    </div>
  );
}

export function AccordionItem({ value, title, children, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden">
      <h3 className="w-full">
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            onToggle();
          }}
          className={`flex justify-between items-center w-full py-4 px-4 text-left font-medium focus:outline-none transition-colors duration-200 ${
            isOpen ? 'bg-secondary-100' : 'bg-white hover:bg-gray-50'
          }`}
          aria-expanded={isOpen}
        >
          {typeof title === 'string' ? <span>{title}</span> : title}
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 