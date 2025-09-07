import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

function LazySectionSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
        {/* Header skeleton */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-gray-700 rounded"></div>
          <div className="h-6 bg-gray-700 rounded w-32"></div>
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
              <div className="h-4 bg-gray-700 rounded w-24"></div>
              <div className="h-3 bg-gray-700 rounded w-full"></div>
              <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
              <div className="h-4 bg-gray-700 rounded w-24"></div>
              <div className="h-3 bg-gray-700 rounded w-full"></div>
              <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="h-6 bg-gray-700 rounded-full w-16"></div>
            <div className="h-6 bg-gray-700 rounded-full w-20"></div>
            <div className="h-6 bg-gray-700 rounded-full w-18"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LazySection({ 
  children, 
  fallback, 
  className = '' 
}: LazySectionProps) {
  return (
    <Suspense 
      fallback={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={className}
        >
          {fallback || <LazySectionSkeleton />}
        </motion.div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={className}
      >
        {children}
      </motion.div>
    </Suspense>
  );
}

// Higher-order component for creating lazy-loaded sections
export function createLazySection<T extends React.ComponentType<any>>(
  Component: T,
  fallback?: React.ReactNode
) {
  return dynamic(() => Promise.resolve(Component), {
    ssr: false,
    loading: () => (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {fallback || <LazySectionSkeleton />}
      </motion.div>
    )
  });
}

// Utility for creating intersection observer-based lazy loading
export function useInViewLazyLoad(threshold = 0.1) {
  const [isInView, setIsInView] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}