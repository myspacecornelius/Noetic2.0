import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 300,
  className = '',
  contentClassName = '',
  disabled = false
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      updatePosition();
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = rect.left + scrollX + rect.width / 2;
        y = rect.top + scrollY - 10;
        break;
      case 'bottom':
        x = rect.left + scrollX + rect.width / 2;
        y = rect.bottom + scrollY + 10;
        break;
      case 'left':
        x = rect.left + scrollX - 10;
        y = rect.top + scrollY + rect.height / 2;
        break;
      case 'right':
        x = rect.right + scrollX + 10;
        y = rect.top + scrollY + rect.height / 2;
        break;
    }

    setTooltipPosition({ x, y });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getTooltipStyle = () => {
    const baseStyle = {
      position: 'absolute' as const,
      zIndex: 9999,
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyle,
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: 'translate(-50%, -100%)',
        };
      case 'bottom':
        return {
          ...baseStyle,
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: 'translate(-50%, 0)',
        };
      case 'left':
        return {
          ...baseStyle,
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: 'translate(-100%, -50%)',
        };
      case 'right':
        return {
          ...baseStyle,
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: 'translate(0, -50%)',
        };
      default:
        return baseStyle;
    }
  };

  const getArrowClasses = () => {
    const baseClasses = 'absolute w-2 h-2 bg-gray-800 border border-gray-700';
    
    switch (position) {
      case 'top':
        return `${baseClasses} bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 border-t-0 border-l-0`;
      case 'bottom':
        return `${baseClasses} top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 border-b-0 border-r-0`;
      case 'left':
        return `${baseClasses} right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 border-t-0 border-r-0`;
      case 'right':
        return `${baseClasses} left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 border-b-0 border-l-0`;
      default:
        return baseClasses;
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className={`inline-block ${className}`}
      >
        {children}
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={getTooltipStyle()}
              className={`
                bg-gray-800 text-gray-100 text-sm px-3 py-2 rounded-lg
                border border-gray-700 shadow-lg max-w-xs
                ${contentClassName}
              `}
            >
              <div className={getArrowClasses()} />
              {content}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}