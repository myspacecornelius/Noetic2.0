import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';
import { Tooltip } from './Tooltip';

interface StatBoxProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  formatter?: (value: number) => string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  icon?: React.ReactNode;
  tooltip?: string;
  className?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const variants = {
  default: 'border-gray-700 bg-gray-900/50',
  primary: 'border-blue-700/50 bg-blue-900/10',
  success: 'border-green-700/50 bg-green-900/10',
  warning: 'border-amber-700/50 bg-amber-900/10',
  danger: 'border-red-700/50 bg-red-900/10'
};

const sizes = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6'
};

const valueSizes = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl'
};

const labelSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base'
};

export function StatBox({
  label,
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  formatter,
  trend,
  icon,
  tooltip,
  className = '',
  variant = 'default',
  size = 'md',
  animated = true
}: StatBoxProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    const iconClasses = 'w-4 h-4';
    
    switch (trend.direction) {
      case 'up':
        return <span className={`${iconClasses} text-green-400`}>↗</span>;
      case 'down':
        return <span className={`${iconClasses} text-red-400`}>↘</span>;
      default:
        return <span className={`${iconClasses} text-gray-400`}>→</span>;
    }
  };

  const getTrendColor = () => {
    if (!trend) return 'text-gray-400';
    
    switch (trend.direction) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const content = (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`
        border rounded-xl transition-all duration-200
        hover:border-opacity-80 hover:shadow-lg hover:shadow-black/20
        focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:ring-offset-1 focus-within:ring-offset-gray-900
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <p className={`font-medium text-gray-400 ${labelSizes[size]} leading-tight`}>
          {label}
        </p>
        {icon && (
          <div className="text-gray-500 flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-3">
        <div className={`font-bold text-gray-100 ${valueSizes[size]} tracking-tight leading-none`}>
          {animated ? (
            <AnimatedCounter
              value={value}
              prefix={prefix}
              suffix={suffix}
              decimals={decimals}
              formatter={formatter}
              duration={1500}
            />
          ) : (
            formatter ? formatter(value) : `${prefix}${value.toFixed(decimals)}${suffix}`
          )}
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 ${getTrendColor()} text-sm font-medium`}>
            {getTrendIcon()}
            <span>
              {formatter ? formatter(trend.value) : `${trend.value > 0 ? '+' : ''}${trend.value.toFixed(1)}%`}
            </span>
          </div>
        )}
      </div>
      
      {trend?.label && (
        <p className="text-xs text-gray-500 mt-1">
          {trend.label}
        </p>
      )}
    </motion.div>
  );

  return tooltip ? (
    <Tooltip content={tooltip} position="top">
      {content}
    </Tooltip>
  ) : content;
}