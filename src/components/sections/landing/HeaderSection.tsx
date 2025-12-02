"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Player from "@vimeo/player";
import { useLenis } from "lenis/react";

export default function Page() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoTitleRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Preloader refs
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderTextRef = useRef<HTMLHeadingElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState<any>(null);

  const lenis = useLenis();

  useEffect(() => {
    if (iframeRef.current) {
      const p = new Player(iframeRef.current);
      p.setMuted(true);
      setPlayer(p);
    }
  }, []);

  const toggleMute = () => {
    if (!player) return;
    if (isMuted) {
      player.setMuted(false);
      player.setVolume(1);
      setIsMuted(false);
    } else {
      player.setMuted(true);
      setIsMuted(true);
    }
  };

  // PRELOADER + HEADER ANIMATION PIPELINE
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // LOCK SCROLL
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const preloaderText = preloaderTextRef.current;
    if (!preloaderText) return;

    const headerTitle = document.querySelector(".header-title");

    let headerSplit: SplitText | null = null;

    if (headerTitle) {
      headerSplit = new SplitText(headerTitle, { type: "chars", charsClass: "char" });
      gsap.set(headerSplit.chars, { opacity: 0, y: 100 });
    }

    const split = new SplitText(preloaderText, { type: "chars" });
    const chars = split.chars;

    // SAFE LETTER SELECTION
    const charA = chars.find(c => c.textContent === "A");
    const charI = chars.find(c => c.textContent === "I");

    const otherChars = chars.filter(c => c !== charA && c !== charI);

    gsap.set(chars, { opacity: 0, y: 20 });
    gsap.set(".navbar-logo", { opacity: 0 });

    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.8, ease: "power3.out" }
    });

    // Reveal characters
    tl.to(chars, { opacity: 1, y: 0, stagger: 0.04 })

      // Hide all except A + I
      .to(otherChars, { opacity: 0, duration: 0.5 }, "+=0.2")

      // Merge A + I toward center
      .add(() => {
        requestAnimationFrame(() => {
          const r = preloaderText.getBoundingClientRect();
          const centerX = r.width / 2;

          if (charA && charI) {
            const rectA = charA.getBoundingClientRect();
            const rectI = charI.getBoundingClientRect();

            gsap.to(charA, {
              x: centerX - rectA.width - (rectA.left - r.left),
              duration: 0.8,
              ease: "expo.inOut"
            });

            gsap.to(charI, {
              x: centerX + 2 - (rectI.left - r.left),
              duration: 0.8,
              ease: "expo.inOut"
            });
          }
        });
      })

      // Move merged text to navbar WITH ROTATION
      .add(() => {
        requestAnimationFrame(() => {
          const navbarLogo = document.querySelector(".navbar-logo");
          if (!navbarLogo) return;

          const logoRect = navbarLogo.getBoundingClientRect();
          const textRect = preloaderText.getBoundingClientRect();

          // Calculate exact position including padding
          const dx = logoRect.left - textRect.left + logoRect.width / 2 - textRect.width / 2;
          const dy = logoRect.top - textRect.top + logoRect.height / 2 - textRect.height / 2;

          const scale =
            parseFloat(getComputedStyle(navbarLogo).fontSize) /
            parseFloat(getComputedStyle(preloaderText).fontSize);

          gsap.to(preloaderText, {
            x: dx,
            y: dy,
            scale,
            rotation: 360,
            duration: 1.2,
            ease: "power3.inOut",
            onComplete: () => {
              // Small delay before showing navbar logo for smooth handoff
              gsap.delayedCall(0.1, () => {
                gsap.set(".navbar-logo", { opacity: 1 });
                gsap.to(preloaderRef.current, {
                  opacity: 0,
                  duration: 0.3,
                  onComplete: () => {
                    gsap.set(preloaderRef.current, { display: "none" });

                    lenis?.start();
                    document.body.style.overflow = "";
                  }
                });
              });
            }
          });
        });
      })

      // Animate header text with enhanced effects
      .add(() => {
        if (headerSplit) {
          // Set initial state with blur and scale
          gsap.set(headerSplit.chars, {
            opacity: 0,
            y: 100,
            scale: 0.5,
            filter: "blur(20px)",
            rotationX: -90
          });

          // Animate to final state
          gsap.to(headerSplit.chars, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            rotationX: 0,
            duration: 1.4,
            stagger: 0.03,
            ease: "power3.out"
          });
        }
      }, "-=0.4");

    // START TIMELINE AFTER DOM PAINT
    requestAnimationFrame(() => tl.play());

    return () => {
      document.body.style.overflow = "";
      headerSplit?.revert();
      split.revert();
      tl.kill();
    };
  }, [lenis]);

  // VIDEO SCROLL & MOUSE-FOLLOW ANIMATION (ORIGINAL VERSION)
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 900) return;

    gsap.registerPlugin(ScrollTrigger);
    const videoContainer = videoContainerRef.current;
    const videoTitleElements = videoTitleRef.current?.querySelectorAll("p");
    if (!videoContainer || !videoTitleElements) return;

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
      return { translateY: -105, movementMultiplier: 650 };
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

    const handleResize = () => {
      const newValues = getInitialValues();
      animationState.initialTranslateY = newValues.translateY;
      animationState.movementMultiplier = newValues.movementMultiplier;

      if (animationState.scrollProgress === 0) {
        animationState.currentTranslateY = newValues.translateY;
      }
    };

    window.addEventListener("resize", handleResize);

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
            0.95,
            animationState.scrollProgress
          );
          animationState.gap = gsap.utils.interpolate(
            2,
            1,
            animationState.scrollProgress
          );

          if (animationState.scrollProgress <= 0.4) {
            const p = animationState.scrollProgress / 0.4;
            animationState.fontSize = gsap.utils.interpolate(80, 40, p);
          } else {
            const p = (animationState.scrollProgress - 0.4) / 0.6;
            animationState.fontSize = gsap.utils.interpolate(40, 20, p);
          }
        },
      },
    });

    const handleMouseMove = (e: MouseEvent) => {
      animationState.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
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

      videoContainer.style.transform = `translateY(${currentTranslateY}%) translateX(${animationState.currentMouseX}px) scale(${scale})`;
      videoContainer.style.gap = `${gap}em`;

      videoTitleElements.forEach((element) => {
        (element as HTMLElement).style.fontSize = `${fontSize}px`;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // HEADER TITLE SCROLL ANIMATION (VUCKO-STYLE)
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const headerTitle = document.querySelector(".header-title");
    if (!headerTitle) return;

    // Set transform origin for better scaling
    gsap.set(headerTitle, { transformOrigin: "center center" });

    gsap.to(headerTitle, {
      scrollTrigger: {
        trigger: ".header-hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      filter: "blur(10px)",
      opacity: 0,
      scale: 0.95,
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === ".header-hero") {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <>
      {/* Preloader */}
      <div
        ref={preloaderRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      >
        <h1 ref={preloaderTextRef} className="text-6xl md:text-8xl font-black uppercase tracking-tight">
          Aleksandar Ivanov
        </h1>
      </div>

      {/* HEADER */}
      <div className="header-section header-hero">
        <div />
        <div className="mt-[100px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between uppercase text-2xl font-bold">
            <p>a</p>
            <p>really</p>
            <p>good</p>
          </div>

          <h1 className="header-title char text-[6.5vw] xl:text-[8vw] -tracking-[0.05em] leading-[1] font-black uppercase">
            Software Engineer
          </h1>
        </div>

        <div className="flex items-center justify-end text-lg font-bold">
          <h2 className="text-2xl">(Scroll)</h2>
        </div>
      </div>

      {/* INTRO */}
      <div className="header-section header-intro">
        <div
          className="header-video-container-desktop"
          ref={videoContainerRef}
          onClick={toggleMute}
        >
          <div className="header-video-preview">
            <div className="header-video-wrapper">
              <iframe
                ref={iframeRef}
                src="https://player.vimeo.com/video/1140981207?background=1&autoplay=1&loop=1&dnt=1&app_id=aiivanov"
                allow="autoplay; fullscreen"
                title="Portfolio Showreel"
                loading="lazy"
              />
            </div>
          </div>

          <div className="header-video-title" ref={videoTitleRef}>
            <p></p>
            <p></p>
          </div>
        </div>

        {/* MOBILE VIDEO */}
        <div className="header-video-container-mobile" onClick={toggleMute}>
          <div className="header-video-preview">
            <div className="header-video-wrapper">
              <iframe
                src="https://player.vimeo.com/video/1140981207?background=1&autoplay=1&loop=1&dnt=1&app_id=aiivanov"
                allow="autoplay; fullscreen"
                title="Portfolio Showreel"
                loading="lazy"
              />
            </div>
          </div>

          <div className="header-video-title">
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
}
