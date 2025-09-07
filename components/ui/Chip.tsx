import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const variants = {
  default: 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:border-gray-600',
  primary: 'bg-blue-900/30 text-blue-300 border-blue-700/50 hover:bg-blue-900/50 hover:border-blue-600',
  success: 'bg-green-900/30 text-green-300 border-green-700/50 hover:bg-green-900/50 hover:border-green-600',
  warning: 'bg-amber-900/30 text-amber-300 border-amber-700/50 hover:bg-amber-900/50 hover:border-amber-600',
  danger: 'bg-red-900/30 text-red-300 border-red-700/50 hover:bg-red-900/50 hover:border-red-600',
  info: 'bg-cyan-900/30 text-cyan-300 border-cyan-700/50 hover:bg-cyan-900/50 hover:border-cyan-600'
};

const sizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base'
};

export function Chip({
  children,
  variant = 'default',
  size = 'md',
  removable = false,
  onRemove,
  className = '',
  icon,
  onClick,
  disabled = false
}: ChipProps) {
  const isClickable = onClick && !disabled;

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={isClickable ? { scale: 0.98 } : undefined}
      className={`
        inline-flex items-center gap-1.5 border rounded-full font-medium
        transition-all duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${isClickable ? 'cursor-pointer' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={isClickable ? onClick : undefined}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="flex-shrink-0 hover:bg-gray-700 rounded-full p-0.5 transition-colors"
          disabled={disabled}
          aria-label="Remove"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </motion.div>
  );
}