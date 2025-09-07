import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  formatter?: (value: number) => string;
  triggerOnce?: boolean;
}

export function AnimatedCounter({
  value,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  formatter,
  triggerOnce = true
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, { once: triggerOnce, margin: '-10px' });
  const controls = useAnimation();

  const formatValue = (val: number): string => {
    if (formatter) {
      return formatter(val);
    }
    
    const formattedNumber = val.toFixed(decimals);
    return `${prefix}${formattedNumber}${suffix}`;
  };

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now() + delay;
    const endTime = startTime + duration;

    const updateValue = () => {
      const now = Date.now();
      
      if (now < startTime) {
        requestAnimationFrame(updateValue);
        return;
      }

      if (now >= endTime) {
        setDisplayValue(value);
        controls.start({
          scale: [1, 1.05, 1],
          transition: { duration: 0.3, ease: 'easeOut' }
        });
        return;
      }

      const progress = (now - startTime) / duration;
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOut cubic
      const currentValue = easedProgress * value;
      
      setDisplayValue(currentValue);
      requestAnimationFrame(updateValue);
    };

    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    });

    requestAnimationFrame(updateValue);
  }, [isInView, value, duration, delay, controls]);

  return (
    <motion.span
      ref={countRef}
      animate={controls}
      initial={{ opacity: 0, y: 20 }}
      className={`inline-block tabular-nums ${className}`}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {formatValue(displayValue)}
    </motion.span>
  );
}

// Utility function for common number formatting
export const formatters = {
  currency: (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value),
  
  percentage: (value: number) => `${value.toFixed(1)}%`,
  
  compact: (value: number) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
    return value.toString();
  },
  
  number: (value: number) => new Intl.NumberFormat('en-US').format(value),
};