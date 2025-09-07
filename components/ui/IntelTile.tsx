import React from 'react';
import { motion } from 'framer-motion';

interface IntelTileProps {
  title: string;
  meta?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
  interactive?: boolean;
}

const variants = {
  default: {
    border: 'border-gray-700/50',
    bg: 'bg-gray-800/30',
    titleColor: 'text-gray-100',
    metaColor: 'text-gray-400',
    iconColor: 'text-gray-400'
  },
  primary: {
    border: 'border-blue-700/50',
    bg: 'bg-blue-900/10',
    titleColor: 'text-blue-300',
    metaColor: 'text-blue-400/70',
    iconColor: 'text-blue-400'
  },
  success: {
    border: 'border-green-700/50',
    bg: 'bg-green-900/10',
    titleColor: 'text-green-300',
    metaColor: 'text-green-400/70',
    iconColor: 'text-green-400'
  },
  warning: {
    border: 'border-amber-700/50',
    bg: 'bg-amber-900/10',
    titleColor: 'text-amber-300',
    metaColor: 'text-amber-400/70',
    iconColor: 'text-amber-400'
  },
  danger: {
    border: 'border-red-700/50',
    bg: 'bg-red-900/10',
    titleColor: 'text-red-300',
    metaColor: 'text-red-400/70',
    iconColor: 'text-red-400'
  },
  info: {
    border: 'border-cyan-700/50',
    bg: 'bg-cyan-900/10',
    titleColor: 'text-cyan-300',
    metaColor: 'text-cyan-400/70',
    iconColor: 'text-cyan-400'
  }
};

export function IntelTile({
  title,
  meta,
  children,
  icon,
  variant = 'default',
  className = '',
  interactive = true
}: IntelTileProps) {
  const variantStyles = variants[variant];

  const content = (
    <div 
      className={`
        rounded-lg p-6 border transition-all duration-200
        ${variantStyles.border}
        ${variantStyles.bg}
        ${interactive ? 'hover:border-opacity-80 hover:bg-opacity-80' : ''}
        ${className}
      `}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className={variantStyles.iconColor} aria-hidden="true">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-lg ${variantStyles.titleColor} leading-tight`}>
            {title}
          </h3>
          {meta && (
            <div className={`text-sm ${variantStyles.metaColor} mt-1`}>
              {meta}
            </div>
          )}
        </div>
      </div>
      
      <div className="text-gray-300 leading-relaxed">
        {children}
      </div>
    </div>
  );

  return interactive ? (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-full"
    >
      {content}
    </motion.div>
  ) : content;
}