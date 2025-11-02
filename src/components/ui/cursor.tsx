"use client";

import { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef<MousePosition>({ x: 0, y: 0 });
  const cursorPosRef = useRef<MousePosition>({ x: 0, y: 0 });
  const followerPosRef = useRef<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Detect clickable elements
  useEffect(() => {
    const clickableSelectors = [
      "a",
      "button",
      '[role="button"]',
      '[data-cursor="pointer"]',
      "input[type='submit']",
      "input[type='button']",
      ".cursor-pointer",
      "[onclick]",
    ];

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (!target) {
        setIsHovering(false);
        return;
      }

      let element: HTMLElement | null = target;
      let isClickable = false;

      while (element && element !== document.body) {
        for (const selector of clickableSelectors) {
          try {
            if (element.matches?.(selector)) {
              isClickable = true;
              break;
            }
          } catch {
            // Ignore invalid selector errors
          }
        }

        if (isClickable) break;

        if (
          element.style.cursor === "pointer" ||
          element.onclick ||
          element.getAttribute("onclick")
        ) {
          isClickable = true;
          break;
        }

        element = element.parentElement;
      }

      setIsHovering(isClickable);
    };

    window.addEventListener("mousemove", checkHover);
    return () => window.removeEventListener("mousemove", checkHover);
  }, []);

  // Main animation loop - handles cursor movement
  useEffect(() => {
    const updateCursor = () => {
      if (!cursorRef.current || !followerRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateCursor);
        return;
      }

      const { x: mouseX, y: mouseY } = mousePosRef.current;
      const { x: cursorX, y: cursorY } = cursorPosRef.current;
      const { x: followerX, y: followerY } = followerPosRef.current;

      // Smooth interpolation with delay for cursor
      const cursorEase = 0.15;
      const cursorDx = mouseX - cursorX;
      const cursorDy = mouseY - cursorY;
      
      cursorPosRef.current = {
        x: cursorX + cursorDx * cursorEase,
        y: cursorY + cursorDy * cursorEase,
      };

      // Follower dot follows more closely
      const followerEase = 0.25;
      const followerDx = mouseX - followerX;
      const followerDy = mouseY - followerY;
      
      followerPosRef.current = {
        x: followerX + followerDx * followerEase,
        y: followerY + followerDy * followerEase,
      };

      // Update DOM positions
      cursorRef.current.style.left = `${cursorPosRef.current.x}px`;
      cursorRef.current.style.top = `${cursorPosRef.current.y}px`;
      followerRef.current.style.left = `${followerPosRef.current.x}px`;
      followerRef.current.style.top = `${followerPosRef.current.y}px`;

      animationFrameRef.current = requestAnimationFrame(updateCursor);
    };

    animationFrameRef.current = requestAnimationFrame(updateCursor);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Main cursor bubble */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? "cursor-hovering" : ""}`}
      />

      {/* Follower dot (small dot that follows more closely) */}
      <div ref={followerRef} className="custom-cursor-follower" />
    </>
  );
}

