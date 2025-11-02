"use client";

import { useEffect, useRef } from "react";

interface EllipseAnimationProps {
  className: string;
  startX: number;
  startY: number;
  startRotation: number;
  delay: number;
  animationType?: "first" | "second" | "third" | "fourth" | "fifth";
}

// Easing function to match CSS ease-in-out timing (smoother)
function easeInOut(t: number): number {
  return t < 0.5
    ? 2 * t * t
    : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// Linear easing (for linear animations)
function linear(t: number): number {
  return t;
}

export function EllipseAnimation({
  className,
  startX,
  startY,
  startRotation,
  delay = 0,
  animationType = "first",
}: EllipseAnimationProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const updateAnimation = (currentTime: number) => {
      if (!elementRef.current) return;

      // Initialize start time on first frame
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime - (delay * 1000);
      }

      const elapsed = (currentTime - startTimeRef.current) / 1000; // Convert to seconds

      // Animation durations in seconds
      const cycleDurations = {
        first: 30,
        second: 20,
        third: 40,
        fourth: 40,
        fifth: 20,
      };

      const duration = cycleDurations[animationType];
      const normalizedTime = (elapsed % duration) / duration;

      let movementTransform = "";
      let rotationTransform = `rotate(${startRotation}deg)`;

      // Get element dimensions for percentage-based movement
      const element = elementRef.current;
      const elementWidth = element.offsetWidth || 506.71;
      const elementHeight = element.offsetHeight || 541;

      switch (animationType) {
        case "first": // moveVertical - smooth vertical movement (30s ease)
          const easedTime1 = easeInOut(normalizedTime);
          const verticalPercent1 = (easedTime1 - 0.5) * 1.0; // -50% to 50% of height
          movementTransform = `translateY(${verticalPercent1 * elementHeight}px)`;
          break;

        case "second": // moveInCircle reverse (20s reverse)
          const reversedTime2 = 1 - normalizedTime; // Reverse direction
          const angle2 = reversedTime2 * 360; // Counterclockwise
          const radius2 = Math.min(elementWidth, elementHeight) * 0.2; // 20% of size
          const circleX2 = Math.cos((angle2 * Math.PI) / 180) * radius2;
          const circleY2 = Math.sin((angle2 * Math.PI) / 180) * radius2;
          movementTransform = `translate(${circleX2}px, ${circleY2}px)`;
          rotationTransform = `rotate(${startRotation + angle2}deg)`;
          break;

        case "third": // moveInCircle linear (40s linear)
          const linearTime3 = linear(normalizedTime);
          const angle3 = linearTime3 * 360; // Clockwise
          const radius3 = Math.min(elementWidth, elementHeight) * 0.25; // 25% of size
          const circleX3 = Math.cos((angle3 * Math.PI) / 180) * radius3;
          const circleY3 = Math.sin((angle3 * Math.PI) / 180) * radius3;
          movementTransform = `translate(${circleX3}px, ${circleY3}px)`;
          rotationTransform = `rotate(${startRotation + angle3}deg)`;
          break;

        case "fourth": // moveHorizontal (40s ease)
          const easedTime4 = easeInOut(normalizedTime);
          const horizontalPercent4 = (easedTime4 - 0.5) * 1.0; // -50% to 50% of width
          const verticalPercent4 = Math.sin(normalizedTime * Math.PI * 2) * 0.1; // -10% to 10% of height
          movementTransform = `translate(${horizontalPercent4 * elementWidth}px, ${verticalPercent4 * elementHeight}px)`;
          break;

        case "fifth": // moveInCircle ease (20s ease)
          const easedTime5 = easeInOut(normalizedTime);
          const angle5 = easedTime5 * 360;
          const radius5 = Math.min(elementWidth, elementHeight) * 0.18; // 18% of size
          const circleX5 = Math.cos((angle5 * Math.PI) / 180) * radius5;
          const circleY5 = Math.sin((angle5 * Math.PI) / 180) * radius5;
          movementTransform = `translate(${circleX5}px, ${circleY5}px)`;
          rotationTransform = `rotate(${startRotation + angle5}deg)`;
          break;
      }

      // Apply movement and rotation transforms
      elementRef.current.style.transform = `${movementTransform} ${rotationTransform}`;

      animationFrameRef.current = requestAnimationFrame(updateAnimation);
    };

    animationFrameRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      startTimeRef.current = null;
    };
  }, [startX, startY, startRotation, delay, animationType]);

  return <span ref={elementRef} className={className} style={{ opacity: 1 }} />;
}
