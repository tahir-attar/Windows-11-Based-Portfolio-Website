import { RefObject, useEffect, useRef, useState } from 'react';

interface IntersectionObserverOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 * Custom Intersection Observer hook used to trace whether an element is in the viewport
 *@function useIntersectionObserver
 *@param {React.RefObject<HTMLElement>} ref - ref to React.Node or HTML element
 *@param {IntersectionObserverOptions} options - root margin or threshold of element (standard intersection observer props)
 *@returns {boolean} isElementVisible - the hook returns a boolean value whether the element in viewport
 */
export const useIntersectionObserver = (
  ref: null | RefObject<HTMLDivElement>,
  options: IntersectionObserverOptions
): boolean[] => {
  const [isElementVisible, setIsElementVisible] = useState(false);
  const isMounted = useRef(true);

  const threshold = options.threshold;
  const rootMargin = options.rootMargin;

  useEffect(() => {
    isMounted.current = true;

    const observer = new IntersectionObserver(([entry]) => {
      if (isMounted.current) {
        setIsElementVisible(entry.isIntersecting);
      }
    }, { threshold, rootMargin });

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      isMounted.current = false;
      if (ref?.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin]);

  return [isElementVisible];
};
