import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollspy } from '../hooks/useScrollspy';

interface ScrollspyItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface StickyScrollspyProps {
  items: ScrollspyItem[];
  className?: string;
  offset?: number;
}

export function StickyScrollspy({ items, className = '', offset = 100 }: StickyScrollspyProps) {
  const [isSticky, setIsSticky] = useState(false);
  const sectionIds = items.map(item => item.id);
  const { activeId, scrollToSection } = useScrollspy({ sectionIds, offset });

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return (
    <motion.nav
      initial={false}
      animate={{
        position: isSticky ? 'fixed' : 'static',
        top: isSticky ? 0 : 'auto',
        zIndex: isSticky ? 50 : 'auto',
        backgroundColor: isSticky ? 'rgba(15, 15, 18, 0.95)' : 'transparent',
        backdropFilter: isSticky ? 'blur(12px)' : 'none',
        borderBottomColor: isSticky ? 'rgba(39, 39, 42, 0.8)' : 'transparent',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`w-full border-b ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center overflow-x-auto scrollbar-hide py-3 gap-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
                transition-all duration-200 whitespace-nowrap flex-shrink-0
                hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50
                ${activeId === item.id 
                  ? 'text-blue-400 bg-blue-900/20' 
                  : 'text-gray-400 hover:text-gray-200'
                }
              `}
              aria-label={`Navigate to ${item.label} section`}
            >
              {item.icon && (
                <span className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
              
              {activeId === item.id && (
                <motion.div
                  layoutId="activeScrollspySection"
                  className="absolute inset-0 bg-blue-900/30 rounded-lg border border-blue-700/50"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {isSticky && (
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
      )}
    </motion.nav>
  );
}