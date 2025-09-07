import { useState, useEffect, useRef } from 'react';

interface UseScrollspyOptions {
  sectionIds: string[];
  offset?: number;
  throttleMs?: number;
}

export function useScrollspy({ sectionIds, offset = 150, throttleMs = 100 }: UseScrollspyOptions) {
  const [activeId, setActiveId] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (throttleTimeout.current) return;

      throttleTimeout.current = setTimeout(() => {
        // Find the section that's most visible
        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveId(visibleSections[0].target.id);
        }

        throttleTimeout.current = null;
      }, throttleMs);
    };

    // Clean up existing observer
    if (observer.current) {
      observer.current.disconnect();
    }

    // Create new observer
    observer.current = new IntersectionObserver(handleIntersection, {
      rootMargin: `-${offset}px 0px -50% 0px`,
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    });

    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element && observer.current) {
        observer.current.observe(element);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, [sectionIds, offset, throttleMs]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Immediately update active id for responsive feedback
      setActiveId(id);
    }
  };

  return { activeId, scrollToSection };
}