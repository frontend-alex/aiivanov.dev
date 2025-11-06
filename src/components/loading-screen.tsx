"use client";

import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const aiHolderRef = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline>(null);
  const safetyTimeoutId = useRef<number | null>(null);

  useEffect(() => {
    // Respect reduced motion: skip loader
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [onComplete]);

  useGSAP(
    () => {
      if (!containerRef.current || !overlayRef.current || !aiHolderRef.current) return;

      // Initial states
      gsap.set(aiHolderRef.current, { y: 60 });

      // Build timeline (forward reveal -> auto reverse)
      const timeline = gsap
        .timeline({ paused: true })
        .to(overlayRef.current, {
          duration: 0.9,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power4.inOut",
        })
        .to(
          aiHolderRef.current,
          {
            y: 0,
            duration: 0.7,
            ease: "power4.inOut",
          },
          "-=0.5"
        )
        // immediately schedule reverse after forward completes
        .call(() => {
          timeline.reverse();
        });

      tl.current = timeline;

      // on reverse complete, finish
      tl.current.eventCallback("onReverseComplete", () => {
        onComplete();
      });

      // Safety timeout in case GSAP callbacks don't run
      safetyTimeoutId.current = window.setTimeout(() => {
        onComplete();
      }, 4000);

      // Play forward
      tl.current.play(0);

      return () => {
        if (tl.current) {
          tl.current.kill();
          tl.current = null as unknown as GSAPTimeline;
        }
        if (safetyTimeoutId.current) {
          clearTimeout(safetyTimeoutId.current);
          safetyTimeoutId.current = null;
        }
      };
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

