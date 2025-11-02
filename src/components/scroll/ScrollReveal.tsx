"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { logoData } from "@/constants/logo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  /**
   * Hero image content (background)
   */
  heroImage?: ReactNode;
  
  /**
   * Logo image (top center)
   */
  logoImage?: ReactNode;
  
  /**
   * Copy text below logo
   */
  heroCopy?: string;
  
  /**
   * Overlay text that appears with gradient
   */
  overlayText?: ReactNode;
  
  /**
   * Initial overlay scale (default: 500)
   */
  initialScale?: number;
  
  /**
   * Scroll distance multiplier (default: 5)
   */
  scrollDistance?: number;
  
  /**
   * Section height (default: h-dvh)
   */
  height?: string;
  
  /**
   * Show logo and copy initially (default: true)
   */
  showLogoAndCopy?: boolean;
}

export const ScrollReveal = ({
  heroImage,
  logoImage,
  heroCopy = "",
  overlayText,
  initialScale = 500,
  scrollDistance = 5,
  height = "h-dvh",
  showLogoAndCopy = true,
}: ScrollRevealProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const heroImgContainerRef = useRef<HTMLDivElement>(null);
  const heroImgLogoRef = useRef<HTMLDivElement>(null);
  const heroImgCopyRef = useRef<HTMLDivElement>(null);
  const fadeOverlayRef = useRef<HTMLDivElement>(null);
  const svgOverlayRef = useRef<HTMLDivElement>(null);
  const overlayCopyRef = useRef<HTMLHeadingElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const logoMaskRef = useRef<SVGPathElement>(null);


  const updateLogoMask = () => {
    if (!logoContainerRef.current || !logoMaskRef.current) return;

    const logoDimensions = logoContainerRef.current.getBoundingClientRect();
    const logoBoundingBox = logoMaskRef.current.getBBox();

    const horizontalScaleRatio = logoDimensions.width / logoBoundingBox.width;
    const verticalScaleRatio = logoDimensions.height / logoBoundingBox.height;
    const logoScaleFactor = Math.min(horizontalScaleRatio, verticalScaleRatio);

    const logoHorizontalPosition =
      logoDimensions.left +
      (logoDimensions.width - logoBoundingBox.width * logoScaleFactor) / 2 -
      logoBoundingBox.x * logoScaleFactor;
    const logoVerticalPosition =
      logoDimensions.top +
      (logoDimensions.height - logoBoundingBox.height * logoScaleFactor) / 2 -
      logoBoundingBox.y * logoScaleFactor;

    logoMaskRef.current.setAttribute(
      "transform",
      `translate(${logoHorizontalPosition}, ${logoVerticalPosition}) scale(${logoScaleFactor})`
    );
  };

  useGSAP(() => {
    if (!svgOverlayRef.current || !logoMaskRef.current) return;

    // Set overlay initial styles
    const overlay = svgOverlayRef.current;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.transform = "none";

    // Set logo mask path
    logoMaskRef.current.setAttribute("d", logoData);

    updateLogoMask();
   
    // Hide overlay text initially
    gsap.set(overlayCopyRef.current, {
      opacity: 0,
    });

    gsap.set(svgOverlayRef.current, {
      transformOrigin: "50% 50%",
      xPercent: 0,
      yPercent: 0,
      left: 0,
      top: 0,
      scale: initialScale,
    });

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: `+=${window.innerHeight * scrollDistance}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        // Only run animation if we're actually in the section
        if (self.progress === 0 && !self.isActive) {
          return; // Don't animate if not scrolled to section yet
        }
        const scrollProgress = self.progress;

        // Scale hero image and SVG overlay
        if (scrollProgress <= 0.85) {
          const normalizedProgress = scrollProgress * (1 / 0.85);
          const heroImgContainerScale = 1.5 - 0.5 * normalizedProgress;
          const overlayScale =
            initialScale *
            Math.pow(1 / initialScale, normalizedProgress);
          let fadeOverlayOpacity = 0;

          if (heroImgContainerRef.current) {
            gsap.set(heroImgContainerRef.current, {
              scale: heroImgContainerScale,
            });
          }

          gsap.set(svgOverlayRef.current, {
            transformOrigin: "50% 25%",
            scale: overlayScale,
            force3D: true,
          });

          if (scrollProgress >= 0.25) {
            fadeOverlayOpacity = Math.min(
              1,
              (scrollProgress - 0.25) * (1 / 0.4)
            );
          }

          gsap.set(fadeOverlayRef.current, {
            opacity: fadeOverlayOpacity,
          });
        }

        // Reveal overlay copy
        if (scrollProgress >= 0.7 && scrollProgress <= 0.85) {
          const overlayCopyRevealProgress = (scrollProgress - 0.7) * (1 / 0.15);
          const overlayCopyScale = 1.25 - 0.25 * overlayCopyRevealProgress;

          gsap.set(overlayCopyRef.current, {
            scale: overlayCopyScale,
            opacity: overlayCopyRevealProgress,
          });
        } else if (scrollProgress < 0.7) {
          gsap.set(overlayCopyRef.current, {
            opacity: 0,
          });
        }
      },
    });

    const handleResize = () => {
      updateLogoMask();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      scrollTriggerInstance.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, [initialScale, scrollDistance, showLogoAndCopy]);

  return (
    <section ref={heroRef} className={`relative w-screen ${height} text-center overflow-hidden`}>
      {/* Hero image container */}
      {heroImage && (
        <div
          ref={heroImgContainerRef}
          className="absolute top-0 left-0 w-full h-full"
        >
          {heroImage}
        </div>
      )}

      {/* Hero logo */}
      <div
        ref={heroImgLogoRef}
        className="will-change-[opacity]"
        style={{
        }}
      >
        {logoImage}
      </div>

      {/* Hero copy */}
      <div
        ref={heroImgCopyRef}
        className="will-change-[opacity]"
      >
        <p className="uppercase text-[0.65rem] font-medium leading-[0.8]">
          {heroCopy}
        </p>
      </div>

      {/* Fade overlay */}
      <div
        ref={fadeOverlayRef}
        className="absolute top-0 left-0 w-full h-full bg-black dark:bg-white will-change-[opacity]"
        style={{ opacity: 0 }}
      />

      {/* SVG Overlay with mask */}
      <div
        ref={svgOverlayRef}
        className="fixed top-0 left-0 w-screen h-[150vh] z-1"
        style={{
          transformOrigin: "center center",
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <mask id="logoRevealMask">
              <rect width="100%" height="100%" fill="white" />
              <path ref={logoMaskRef} id="logoMask" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="var(--background)"
            mask="url(#logoRevealMask)"
          />
        </svg>
      </div>

      {/* Logo container (invisible, for mask positioning) */}
      <div
        ref={logoContainerRef}
        className="fixed top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] z-2"
      />

      {/* Overlay copy */}
      <div 
        ref={overlayCopyRef}
        className="absolute z-2 w-full"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
          <h1>cicki cicki cicki</h1>
      </div>
    </section>
  );
};

