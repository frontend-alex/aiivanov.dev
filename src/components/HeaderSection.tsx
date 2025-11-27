"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Player from "@vimeo/player";

export default function HeaderSection() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoTitleRef = useRef<HTMLDivElement>(null);
  const desktopIframeRef = useRef<HTMLIFrameElement>(null);
  const mobileIframeRef = useRef<HTMLIFrameElement>(null);
  const desktopPlayerRef = useRef<Player | null>(null);
  const mobilePlayerRef = useRef<Player | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Initialize Vimeo players
    if (desktopIframeRef.current) {
      desktopPlayerRef.current = new Player(desktopIframeRef.current);
    }
    if (mobileIframeRef.current) {
      mobilePlayerRef.current = new Player(mobileIframeRef.current);
    }

    if (typeof window === "undefined" || window.innerWidth < 900) return;

    gsap.registerPlugin(ScrollTrigger);

    const videoContainer = videoContainerRef.current;
    const videoTitleElements = videoTitleRef.current?.querySelectorAll("p");

    if (!videoContainer || !videoTitleElements) return;

    // Responsive breakpoints for initial values
    const breakpoints = [
      { maxWidth: 1000, translateY: -135, movMultiplier: 450 },
      { maxWidth: 1100, translateY: -130, movMultiplier: 500 },
      { maxWidth: 1200, translateY: -125, movMultiplier: 550 },
      { maxWidth: 1300, translateY: -120, movMultiplier: 600 },
    ];

    const getInitialValues = () => {
      const width = window.innerWidth;

      for (const bp of breakpoints) {
        if (width <= bp.maxWidth) {
          return {
            translateY: bp.translateY,
            movementMultiplier: bp.movMultiplier,
          };
        }
      }

      return {
        translateY: -105,
        movementMultiplier: 650,
      };
    };

    const initialValues = getInitialValues();

    const animationState = {
      scrollProgress: 0,
      initialTranslateY: initialValues.translateY,
      currentTranslateY: initialValues.translateY,
      movementMultiplier: initialValues.movementMultiplier,
      scale: 0.25,
      fontSize: 80,
      gap: 2,
      targetMouseX: 0,
      currentMouseX: 0,
    };

    let ctx = gsap.context(() => {
      // Handle window resize
      const handleResize = () => {
        const newValues = getInitialValues();
        animationState.initialTranslateY = newValues.translateY;
        animationState.movementMultiplier = newValues.movementMultiplier;

        if (animationState.scrollProgress === 0) {
          animationState.currentTranslateY = newValues.translateY;
        }
      };

      window.addEventListener("resize", handleResize);

      // ScrollTrigger animation
      gsap.timeline({
        scrollTrigger: {
          trigger: ".header-intro",
          start: "top bottom",
          end: "top 10%",
          scrub: true,
          onUpdate: (self) => {
            animationState.scrollProgress = self.progress;

            animationState.currentTranslateY = gsap.utils.interpolate(
              animationState.initialTranslateY,
              0,
              animationState.scrollProgress
            );

            animationState.scale = gsap.utils.interpolate(
              0.25,
              1,
              animationState.scrollProgress
            );

            animationState.gap = gsap.utils.interpolate(
              2,
              1,
              animationState.scrollProgress
            );

            if (animationState.scrollProgress <= 0.4) {
              const firstPartProgress = animationState.scrollProgress / 0.4;
              animationState.fontSize = gsap.utils.interpolate(
                80,
                40,
                firstPartProgress
              );
            } else {
              const secondPartProgress =
                (animationState.scrollProgress - 0.4) / 0.6;
              animationState.fontSize = gsap.utils.interpolate(
                40,
                20,
                secondPartProgress
              );
            }
          },
        },
      });

      // Mouse tracking
      const handleMouseMove = (e: MouseEvent) => {
        animationState.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      };

      document.addEventListener("mousemove", handleMouseMove);

      // Animation loop using gsap.ticker for better performance
      const updateAnimation = () => {
        if (window.innerWidth < 900) return;

        const {
          scale,
          targetMouseX,
          currentMouseX,
          currentTranslateY,
          fontSize,
          gap,
          movementMultiplier,
        } = animationState;

        const scaledMovementMultiplier = (1 - scale) * movementMultiplier;

        const maxHorizontalMovement =
          scale < 0.95 ? targetMouseX * scaledMovementMultiplier : 0;

        animationState.currentMouseX = gsap.utils.interpolate(
          currentMouseX,
          maxHorizontalMovement,
          0.05
        );

        if (videoContainer) {
            videoContainer.style.transform = `translateY(${currentTranslateY}%) translateX(${animationState.currentMouseX}px) scale(${scale})`;
            videoContainer.style.gap = `${gap}em`;
        }

        if (videoTitleElements) {
            videoTitleElements.forEach((element) => {
            (element as HTMLElement).style.fontSize = `${fontSize}px`;
            });
        }
      };

      gsap.ticker.add(updateAnimation);

      // Return cleanup function for context
      return () => {
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("mousemove", handleMouseMove);
        gsap.ticker.remove(updateAnimation);
      };
    });

    return () => {
      ctx.revert(); // Cleanup GSAP context
    };
  }, []);

  const toggleMute = async () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    if (desktopPlayerRef.current) {
      await desktopPlayerRef.current.setMuted(newMutedState);
    }
    if (mobilePlayerRef.current) {
      await mobilePlayerRef.current.setMuted(newMutedState);
    }
  };

  return (
    <>
      <section className="header-section header-hero">
        <h1>AI Ivanov</h1>

        <div className="header-hero-copy">
          <p>Software Engineer & Entrepreneur</p>
          <p>(Scroll)</p>
        </div>
      </section>

      <section className="header-section header-intro">
        <div className="header-video-container-desktop" ref={videoContainerRef}>
          <div className="header-video-preview">
            <div 
              className="header-video-wrapper" 
              onClick={toggleMute}
              style={{ cursor: 'pointer' }}
            >
              <iframe
                ref={desktopIframeRef}
                src="https://player.vimeo.com/video/1140981207?background=1&autoplay=1&loop=1&muted=1"
                allow="autoplay; fullscreen"
                title="Portfolio Showreel"
                loading="lazy"
              />
            </div>
          </div>
          <div className="header-video-title" ref={videoTitleRef}>
            <p>Portfolio Showreel</p>
            <p>2024 - 2025</p>
          </div>
        </div>

        <div className="header-video-container-mobile">
          <div className="header-video-preview">
            <div 
              className="header-video-wrapper"
              onClick={toggleMute}
              style={{ cursor: 'pointer' }}
            >
              <iframe
                ref={mobileIframeRef}
                src="https://player.vimeo.com/video/1140981207?background=1&autoplay=1&loop=1&muted=1"
                allow="autoplay; fullscreen"
                title="Portfolio Showreel"
                loading="lazy"
              />
            </div>
          </div>
          <div className="header-video-title">
            <p>Portfolio Showreel</p>
            <p>2024 - 2025</p>
          </div>
        </div>
      </section>
    </>
  );
}
