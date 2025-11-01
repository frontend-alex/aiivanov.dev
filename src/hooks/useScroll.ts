"use client";

import { useEffect, useState } from "react";

interface UseScrollOptions {
  threshold?: number;
  className?: string;
  defaultClassName?: string;
  transitionClassName?: string;
}

interface UseScrollReturn {
  scrollY: number;
  className: string;
  isScrolled: boolean;
}

/**
 * Custom hook to detect scroll position and apply className based on scroll threshold
 * 
 * @param options - Configuration options
 * @param options.threshold - Scroll amount in pixels to trigger className change (default: 50)
 * @param options.className - ClassName to apply when scrolled past threshold (default: "scrolled")
 * @param options.defaultClassName - ClassName to apply when not scrolled (default: "")
 * @param options.transitionClassName - Transition classes to add for smooth animations (default: "transition-all duration-300 ease-in-out")
 * @returns Object containing scrollY position, className (with transitions), and isScrolled boolean
 * 
 * @example
 * ```tsx
 * const { scrollY, className, isScrolled } = useScroll({
 *   threshold: 100,
 *   className: "navbar-scrolled bg-white shadow-md",
 *   defaultClassName: "bg-transparent"
 * });
 * 
 * return <nav className={className}>...</nav>
 * ```
 */
export function useScroll(options: UseScrollOptions = {}): UseScrollReturn {
  const {
    threshold = 50,
    className: scrolledClassName = "scrolled",
    defaultClassName = "",
    transitionClassName = "transition-all duration-300 ease-in-out",
  } = options;

  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  // Combine transition classes with conditional classes
  const conditionalClassName = isScrolled ? scrolledClassName : defaultClassName;
  const finalClassName = `${transitionClassName} ${conditionalClassName}`.trim();

  return {
    scrollY,
    className: finalClassName,
    isScrolled,
  };
}

