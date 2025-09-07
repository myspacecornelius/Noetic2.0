import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SubnavItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface StickySubnavProps {
  items: SubnavItem[];
  className?: string;
  offset?: number;
}

export function StickySubnav({ items, className = '', offset = 100 }: StickySubnavProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > offset);

      // Find the active section based on scroll position
      const sections = items.map(item => document.getElementById(item.id)).filter(Boolean);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(items[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, offset]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        position: isSticky ? 'fixed' : 'static',
        top: isSticky ? 0 : 'auto',
        zIndex: isSticky ? 50 : 'auto',
        backgroundColor: isSticky ? 'rgba(15, 15, 18, 0.95)' : 'transparent',
        backdropFilter: isSticky ? 'blur(10px)' : 'none',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`w-full border-b border-gray-800 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center space-x-1 py-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50
                ${activeSection === item.id 
                  ? 'text-blue-400 bg-blue-900/20' 
                  : 'text-gray-400 hover:text-gray-200'
                }
              `}
            >
              <div className="flex items-center gap-2">
                {item.icon && (
                  <span className="w-4 h-4 flex-shrink-0">{item.icon}</span>
                )}
                <span>{item.label}</span>
              </div>
              
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeSection"
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
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      )}
    </motion.nav>
  );
}