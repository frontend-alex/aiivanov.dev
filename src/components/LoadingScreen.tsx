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
  const tl = useRef<GSAPTimeline>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !overlayRef.current || !aiHolderRef.current) return;

      gsap.set(aiHolderRef.current, { y: 75 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(overlayRef.current, {
          duration: 1.25,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power4.inOut",
        })
        .to(
          aiHolderRef.current,
          {
            y: 0,
            duration: 1,
            ease: "power4.inOut",
          },
          "-=0.75"
        );
      
      // Start the timeline (play forward)
      tl.current?.play();

      // After showing, reverse the animation
      setTimeout(() => {
        if (tl.current) {
          tl.current.reverse();
          // Wait for reverse animation to complete
          tl.current.eventCallback("onReverseComplete", () => {
            onComplete();
          });
        }
      }, 2000); // Show time before reversing
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="loading-screen-container">
      <div ref={overlayRef} className="loading-overlay">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="loading-ai-item">
            <div ref={aiHolderRef} className="loading-ai-holder">
              <h1 className="loading-ai-text">AI.</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

