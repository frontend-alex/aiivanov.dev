"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLenis } from "lenis/react";
import VimeoPlayer, { VimeoPlayerRef } from "@/components/ui/VimeoPlayer";

const HeaderLandingSection = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoTitleRef = useRef<HTMLDivElement>(null);
  const vimeoPlayerRef = useRef<VimeoPlayerRef>(null);

  // Preloader refs
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderTextRef = useRef<HTMLHeadingElement>(null);

  const [isMuted, setIsMuted] = useState(true);

  const lenis = useLenis();

  const toggleMute = async () => {
    if (!vimeoPlayerRef.current) return;
    const newMutedState = !isMuted;
    await vimeoPlayerRef.current.setMuted(newMutedState);
    setIsMuted(newMutedState);
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

    // reveal text NOW (still hidden until animation starts)
    gsap.set(preloaderText, { visibility: "visible" });

    // SAFE LETTER SELECTION
    const charA = chars.find(c => c.textContent === "A");
    const charI = chars.find(c => c.textContent === "I");
    const charPeriod = chars.find(c => c.textContent === ".");

    const otherChars = chars.filter(c => c !== charA && c !== charI && c !== charPeriod);

    gsap.set(chars, { opacity: 0, y: 40 });
    gsap.set(".navbar-logo", { opacity: 0 });

    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.8, ease: "power3.out" }
    });

    // CHARACTER REVEAL — no flash, no delay
    tl.fromTo(
      chars,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.035,
        duration: 0.8,
        ease: "power3.out"
      }
    )

      // Fade out all except A + I
      .to(otherChars, { opacity: 0, duration: 0.45 }, "+=0.2")

      // Merge A + I + . into center
      .add(() => {
        requestAnimationFrame(() => {
          const r = preloaderText.getBoundingClientRect();
          const centerX = r.width / 2;

          if (charA && charI && charPeriod) {
            const rectA = charA.getBoundingClientRect();
            const rectI = charI.getBoundingClientRect();
            const rectPeriod = charPeriod.getBoundingClientRect();

            // Calculate total width of "A I ."
            const spacing = 4; // spacing between characters
            const totalWidth = rectA.width + spacing + rectI.width + spacing + rectPeriod.width;

            // Position A
            gsap.to(charA, {
              x: centerX - totalWidth / 2 - (rectA.left - r.left),
              duration: 0.8,
              ease: "power3.inOut"
            });

            // Position I
            gsap.to(charI, {
              x: centerX - totalWidth / 2 + rectA.width + spacing - (rectI.left - r.left),
              duration: 0.8,
              ease: "power3.inOut"
            });

            // Position .
            gsap.to(charPeriod, {
              x: centerX - totalWidth / 2 + rectA.width + spacing + rectI.width + spacing - (rectPeriod.left - r.left),
              duration: 0.8,
              ease: "power3.inOut"
            });
          }
        });
      })

      // Move merged AI to navbar + rotation effect
      .add(() => {
        requestAnimationFrame(() => {
          const navbarLogo = document.querySelector(".navbar-logo");
          if (!navbarLogo) return;

          const logoRect = navbarLogo.getBoundingClientRect();
          const textRect = preloaderText.getBoundingClientRect();

          const dx =
            logoRect.left -
            textRect.left +
            logoRect.width / 2 -
            textRect.width / 2;

          const dy =
            logoRect.top -
            textRect.top +
            logoRect.height / 2 -
            textRect.height / 2;

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
      }, "+=1")

      // HEADER TEXT ENTRY
      .add(() => {
        if (!headerSplit) return;

        gsap.fromTo(
          headerSplit.chars,
          {
            opacity: 0,
            y: 100,
            scale: 0.5,
            filter: "blur(20px)",
            rotationX: -90
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            rotationX: 0,
            duration: 1.4,
            stagger: 0.03,
            ease: "power3.out"
          }
        );
      }, "-=0.4");

    // START TIMELINE
    requestAnimationFrame(() => tl.play());

    return () => {
      document.body.style.overflow = "";
      headerSplit?.revert();
      split.revert();
      tl.kill();
    };
  }, [lenis]);

  // GLOBAL TEXT BLUR ON SCROLL
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const textElements = document.querySelectorAll(".blur-on-scroll");

    gsap.to(textElements, {
      scrollTrigger: {
        trigger: ".header-hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
      },
      filter: "blur(10px)",
      opacity: 0,
      ease: "none"
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  // VIDEO ANIMATION (unchanged)
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

  return (
    <div className="flex flex-col gap-10">
      {/* Preloader */}
      <div
        ref={preloaderRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      >
        <h1
          ref={preloaderTextRef}
          className="preloader-text text-3xl md:text-8xl font-bold uppercase tracking-tight"
        >
          Aleksandar Ivanov.
        </h1>
      </div>

      {/* HEADER */}
      <div className="header-section header-hero">
        <div />
        <div className="mt-[100px] blur-on-scroll">
          <div className="flex flex-col md:flex-row md:items-center justify-between uppercase text-2xl font-bold">
            <p>a</p>
            <p>really</p>
            <p>good</p>
          </div>

          <h1 className="header-title char text-[15vw] xl:text-[8vw] -tracking-[0.05em] leading-[1] font-black uppercase">
            Software Engineer
          </h1>
        </div>

        <div className="flex items-center justify-end text-lg font-bold blur-on-scroll">
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
            <VimeoPlayer
              ref={vimeoPlayerRef}
              videoId="1140981207"
              autoplay
              loop
              background
              muted
              wrapperClassName="header-video-wrapper"
              title="Portfolio Showreel"
              loading="eager"
            />
          </div>

          <div className="header-video-title" ref={videoTitleRef}>
            <p></p>
            <p></p>
          </div>
        </div>

        <div className="header-video-container-mobile" onClick={toggleMute}>
          <div className="header-video-preview">
            <div className="header-video-wrapper">
              <VimeoPlayer
                videoId="1140981207"
                autoplay
                loop
                background
                muted
                title="Portfolio Showreel"
                loading="eager"
              />
            </div>
          </div>

          <div className="header-video-title">
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderLandingSection;
