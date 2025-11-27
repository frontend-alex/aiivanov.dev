"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CursorState {
  x: number;
  y: number;
  scale: number;
  width: number;
  height: number;
  borderRadius: string;
}

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorState = useRef<CursorState>({
    x: 0,
    y: 0,
    scale: 1,
    width: 40,
    height: 40,
    borderRadius: "50%",
  });

  const targetState = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      targetState.current.x = e.clientX;
      targetState.current.y = e.clientY;
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Check for interactive elements
    const updateCursorOnHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button'], [onclick], .cursor-magnetic"
      );

      if (interactive && cursorRef.current) {
        const rect = interactive.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Magnetic effect - pull cursor towards center
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        if (distance < 100) {
          const pullStrength = 0.3;
          targetState.current.x = e.clientX + (centerX - e.clientX) * pullStrength;
          targetState.current.y = e.clientY + (centerY - e.clientY) * pullStrength;
        }

        // Morph to element shape
        cursorState.current.width = rect.width + 20;
        cursorState.current.height = rect.height + 20;
        cursorState.current.scale = 1.2;
        
        // Match border radius
        const computedStyle = window.getComputedStyle(interactive);
        cursorState.current.borderRadius = computedStyle.borderRadius || "50%";
      } else {
        // Reset to default circular cursor
        cursorState.current.width = 40;
        cursorState.current.height = 40;
        cursorState.current.scale = 1;
        cursorState.current.borderRadius = "50%";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousemove", updateCursorOnHover);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      if (cursorRef.current && cursorDotRef.current) {
        // Smooth follow with GSAP
        cursorState.current.x += (targetState.current.x - cursorState.current.x) * 0.15;
        cursorState.current.y += (targetState.current.y - cursorState.current.y) * 0.15;

        gsap.set(cursorRef.current, {
          x: cursorState.current.x,
          y: cursorState.current.y,
          width: cursorState.current.width,
          height: cursorState.current.height,
          borderRadius: cursorState.current.borderRadius,
          scale: cursorState.current.scale,
        });

        // Faster dot follow
        gsap.set(cursorDotRef.current, {
          x: targetState.current.x,
          y: targetState.current.y,
        });
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", updateCursorOnHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      {/* Main cursor ring with mix-blend-mode */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      >
        <div className="w-full h-full border-2 rounded-full border-white transition-all duration-300 ease-out" />
      </div>

      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}

export default CustomCursor;
