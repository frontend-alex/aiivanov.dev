"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useLenis } from "lenis/react";
import { usePreloader } from "@/contexts/preloader-context";
import RevealText from "./reveal-text";

const Preloader = () => {
  const lenis = useLenis();

  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  const { setIsPreloaderComplete } = usePreloader();

  useEffect(() => {
    if (lenis) {
      lenis.stop();
    }
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    gsap.registerPlugin(SplitText);

    gsap.set(".preloader-revealer", {
      scale: 0,
      transformOrigin: "center center",
      force3D: true,
    });

    const animateCounter = () => {
      const counterElement = document.querySelector(".preloader-counter p");
      if (!counterElement) return;

      const counterObj = { value: 0 };

      gsap.to(counterObj, {
        value: 100,
        duration: 4,
        delay: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          const value = Math.floor(counterObj.value);
          counterElement.textContent = value.toString().padStart(2, "0");
        },
      });
    };

    animateCounter();

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.inOut",
      },
      onComplete: () => {
        setIsComplete(true);
        setIsPreloaderComplete(true);

        if (lenis) {
          lenis.start();
        }
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      },
    });

    tl
      .to([".preloader-copy p .char", ".preloader-counter p .char"], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.01,
        ease: "power3.out",
        delay: 1,
      })
      .to(
        ".preloader-revealer",
        {
          scale: 0.15,
          duration: 1,
          ease: "power2.out",
        },
        "<"
      )
      .to(".preloader-revealer", {
        scale: 0.4,
        duration: 1.2,
        ease: "power2.inOut",
      })
      .to(".preloader-revealer", {
        scale: 0.7,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(".preloader-revealer", {
        scale: 1.05,
        duration: 1.2,
        ease: "power2.in",
      })
      .to(".preloader-revealer", {
        scale: 1,
        duration: 0.3,
        ease: "power1.out",
      })
      .to(
        ".preloader",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
        },
        "-=0.8"
      )
      .to(
        ".preloader",
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .add(() => {
        // Split and animate header title
        const headerTitle = document.querySelector(".header-title");
        if (headerTitle) {
          const split = new SplitText(headerTitle, {
            type: "chars",
            charsClass: "char",
          });

          gsap.set(split.chars, {
            opacity: 0,
            y: 100,
          });

          gsap.to(split.chars, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "power3.out",
          });
        }
      }, "-=0.6");

    return () => {
      tl.kill();

      if (lenis) {
        lenis.start();
      }
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [lenis, setIsPreloaderComplete]);

  return (
    <div
      className="preloader fixed top-0 left-0 w-full h-[100svh] flex items-center p-8 bg-background [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)] will-change-[clip-path,opacity] overflow-hidden z-[9999] [backface-visibility:hidden] antialiased translate-z-0 max-[1000px]:flex-col [&_.line]:will-change-transform [&_.line]:translate-y-[100%] [&_.line]:translate-z-0 [&_.line]:overflow-hidden [&_.line]:[backface-visibility:hidden] [&_.line]:block"
      ref={preloaderRef}
      style={{ display: isComplete ? 'none' : 'flex' }}
    >
      <div className="preloader-revealer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 translate-z-0 w-full aspect-square bg-primary will-change-transform z-[200] [backface-visibility:hidden] origin-center max-[1000px]:w-[200%]"></div>

      <div className="preloader-copy flex-1 flex relative z-[3] max-[1000px]:flex-col">
        <div className="preloader-copy-col flex-1 flex relative z-[3] max-[1000px]:items-center">
          <RevealText
            tagName="p"
            className="no-underline uppercase font-[var(--font-mono)] text-[0.8rem] font-medium tracking-[-0.0125rem] leading-[1.2] inline-block w-[75%] max-[1000px]:w-full"
            trigger="manual"
          >
            Handpicked collections shaped by artistry, balancing rare elements
            with a focus on purity.
          </RevealText>
        </div>
        <div className="preloader-copy-col flex-1 flex relative z-[3] max-[1000px]:items-center">
          <RevealText
            tagName="p"
            className="no-underline uppercase font-[var(--font-mono)] text-[0.8rem] font-medium tracking-[-0.0125rem] leading-[1.2] inline-block w-[75%] max-[1000px]:w-full"
            trigger="manual"
          >
            Explore timeless essentials built with care, thoughtfully designed
            to guide you.
          </RevealText>
        </div>
      </div>

      <div className="preloader-counter flex-1 flex relative z-[3] justify-end max-[1000px]:items-center">
        <div className="preloader-counter-wrapper">
          <RevealText
            tagName="p"
            className="no-underline uppercase font-[var(--font-mono)] text-[0.8rem] font-medium tracking-[-0.0125rem] leading-[1.2] inline-block"
            trigger="manual"
          >
            00
          </RevealText>
        </div>
      </div>
    </div>
  );
}

export default Preloader;