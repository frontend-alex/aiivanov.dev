"use client";

import { useEffect } from "react";

export function useMousePosition() {
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
      
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--mouse-x-percent", `${xPercent}%`);
      document.documentElement.style.setProperty("--mouse-y-percent", `${yPercent}%`);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
}

