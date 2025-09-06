import { PropsWithChildren, HTMLAttributes } from 'react'

export interface DashboardCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  variant?: 'default' | 'highlighted' | 'warning' | 'success'
  loading?: boolean
}

export default function DashboardCard({ 
  title, 
  subtitle,
  variant = 'default',
  loading = false,
  children, 
  className = '', 
  ...props 
}: PropsWithChildren<DashboardCardProps>) {
  const variantClasses = {
    default: 'card',
    highlighted: 'card border-l-4 border-l-blue-500',
    warning: 'card border-l-4 border-l-yellow-500',
    success: 'card border-l-4 border-l-green-500'
  }

  if (loading) {
    return (
      <div className={`${variantClasses[variant]} ${className}`} {...props}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${variantClasses[variant]} ${className}`} {...props}>
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  )
}