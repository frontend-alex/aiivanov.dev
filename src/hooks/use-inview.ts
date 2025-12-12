import { useEffect, useRef, useState } from "react";

export function useOnceInView<T extends Element>(
  ref: React.RefObject<T | null>,
  rootMargin = "200px"
) {
  const [visible, setVisible] = useState(false);
  const locked = useRef(false);

  useEffect(() => {
    if (!ref.current || locked.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          locked.current = true;
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return visible;
}
