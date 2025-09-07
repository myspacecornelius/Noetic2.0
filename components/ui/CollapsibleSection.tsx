import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  variant?: 'default' | 'card' | 'minimal';
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  icon,
  variant = 'default',
  className = '',
  headerClassName = '',
  contentClassName = ''
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const baseClasses = {
    default: 'border border-gray-800 rounded-lg bg-gray-900/50',
    card: 'card',
    minimal: 'border-b border-gray-800'
  };

  const headerClasses = {
    default: 'px-4 py-3 bg-gray-800/30 rounded-t-lg hover:bg-gray-800/50 transition-colors',
    card: 'px-6 py-4 border-b border-gray-800 hover:bg-gray-800/30 transition-colors',
    minimal: 'py-3 hover:bg-gray-800/20 transition-colors'
  };

  return (
    <div className={`${baseClasses[variant]} ${className} transition-all duration-200`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left flex items-center justify-between ${headerClasses[variant]} ${headerClassName} focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1 focus:ring-offset-gray-900`}
        aria-expanded={isOpen}
        aria-controls={`collapsible-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-blue-400">{icon}</span>}
          <h3 className="font-semibold text-gray-100 text-lg">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="text-gray-400 hover:text-gray-200 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`collapsible-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
            ref={contentRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: 'easeInOut' },
              opacity: { duration: 0.2, ease: 'easeInOut' }
            }}
            className="overflow-hidden"
          >
            <div className={`px-4 py-4 ${variant === 'card' ? 'px-6 py-6' : ''} ${contentClassName} text-gray-300 leading-relaxed`}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}