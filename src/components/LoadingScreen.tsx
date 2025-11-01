"use client";

import { gsap } from "gsap";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const aiHolderRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Disable scrolling when loading screen is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isVisible]);

  useGSAP(
    () => {
      if (!containerRef.current || !overlayRef.current || !aiHolderRef.current) return;

      gsap.set(aiHolderRef.current, { y: 75 });

      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        duration: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power4.inOut",
      })
        .to(
          aiHolderRef.current,
          {
            y: 0,
            duration: 0.8,
            ease: "power4.inOut",
          },
          "-=0.5"
        )
        .to({}, { duration: 1.5 })
        .to(
          aiHolderRef.current,
          {
            y: 75,
            duration: 0.8,
            ease: "power4.inOut",
          },
          "-=0.2"
        )
        .to(
          overlayRef.current,
          {
            duration: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
            ease: "power4.inOut",
            onComplete: () => {
              setIsVisible(false);
              onComplete();
            },
          },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="loading-screen-container" style={{ display: isVisible ? 'block' : 'none' }}>
      <div ref={overlayRef} className="loading-overlay">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="loading-ai-item">
            <div ref={aiHolderRef} className="loading-ai-holder">
              <h1 className="loading-ai-text">AI</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

