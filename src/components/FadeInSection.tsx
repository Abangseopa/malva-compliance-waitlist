
import React, { useEffect, useRef, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  threshold?: number;
  className?: string;
}

const FadeInSection = ({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.1,
  className = '',
}: FadeInSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      { threshold }
    );

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold]);

  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-10';
      case 'down':
        return 'translate-y-[-10px]';
      case 'left':
        return 'translate-x-10';
      case 'right':
        return 'translate-x-[-10px]';
      default:
        return 'translate-y-10';
    }
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible
          ? 'opacity-100 transform-none'
          : `opacity-0 ${getDirectionClass()}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
