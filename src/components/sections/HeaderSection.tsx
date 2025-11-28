"use client";

import { MoveDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Player from "@vimeo/player";

export default function Page() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoTitleRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState<any>(null);

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

  // === your GSAP code unchanged ===
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
            1,
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
    <>
      <section className="header-section header-hero">
        <div />
        <div className="mt-[100px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between uppercase text-xl font-bold">
            <p>a</p>
            <p>really</p>
            <p>good</p>
          </div>
          <h1 className="header-title text-[6vw] xl:text-[8vw] -tracking-[0.05em] font-black uppercase">Software Engineer</h1>
        </div>

        <div className="flex items-center justify-between text-lg font-bold">
          <div className="flex items-center gap-1">
            <p>Scroll for</p>
            <MoveDown />
          </div>

          <div className="flex items-center">
            <p>cool sh*t</p>
            <MoveDown />
          </div>
        </div>
      </section>

      <section className="header-section header-intro">
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
      </section>
    </>
  );
}
