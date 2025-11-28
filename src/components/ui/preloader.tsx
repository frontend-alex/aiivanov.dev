"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Prevent scrolling during preloader
    document.body.style.overflow = "hidden";

    gsap.registerPlugin(SplitText);

    // Split text into lines with wrapper for better animation
    const splitTextIntoLines = (selector: string) => {
      return new SplitText(selector, {
        type: "lines",
        linesClass: "line",
      });
    };

    const copySplit = splitTextIntoLines(".preloader-copy p");
    const counterSplit = splitTextIntoLines(".preloader-counter p");

    // Set initial states with GPU acceleration
    gsap.set(".preloader-revealer", {
      scale: 0,
      transformOrigin: "center center",
      force3D: true,
    });

    gsap.set([".preloader-copy p .line", ".preloader-counter p .line"], {
      y: "120%",
      force3D: true,
    });

    // Smoother counter animation with easing
    const animateCounter = () => {
      const counterElement = counterRef.current;
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

    // Optimized main timeline with smoother transitions
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.inOut",
      },
      onComplete: () => {
        setIsComplete(true);
        document.body.style.overflow = "";
      },
    });

    tl
      // Text reveals with smoother stagger
      .to([".preloader-copy p .line", ".preloader-counter p .line"], {
        y: "0%",
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.5,
      })
      // Revealer animation - smoother progression
      .to(
        ".preloader-revealer",
        {
          scale: 0.15,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.6"
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
      // Smooth exit with slight overshoot
      .to(".preloader-revealer", {
        scale: 1,
        duration: 0.3,
        ease: "power1.out",
      })
      // Preloader exit
      .to(
        ".preloader",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
        },
        "-=0.8"
      )
      // Fade out for extra smoothness
      .to(
        ".preloader",
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.6"
      );

    // Cleanup
    return () => {
      copySplit.revert();
      counterSplit.revert();
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="preloader fixed top-0 left-0 w-full h-[100svh] flex items-center p-8 bg-background [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)] will-change-[clip-path,opacity] overflow-hidden z-[9999] [backface-visibility:hidden] antialiased translate-z-0 max-[1000px]:flex-col [&_.line]:will-change-transform [&_.line]:translate-y-[120%] [&_.line]:translate-z-0 [&_.line]:overflow-hidden [&_.line]:[backface-visibility:hidden] [&_.line]:block"
      ref={preloaderRef}
      style={{ display: isComplete ? 'none' : 'flex' }}
    >
      <div className="preloader-revealer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 translate-z-0 w-full aspect-square bg-primary will-change-transform z-[200] [backface-visibility:hidden] origin-center max-[1000px]:w-[200%]"></div>

      <div className="preloader-copy flex-1 flex relative z-[3] max-[1000px]:flex-col">
        <div className="preloader-copy-col flex-1 flex relative z-[3] max-[1000px]:items-center">
          <p className="no-underline uppercase font-[var(--font-mono)] text-[0.8rem] font-medium tracking-[-0.0125rem] leading-[1.2] inline-block w-[75%] max-[1000px]:w-full">
            Handpicked collections shaped by artistry, balancing rare elements
            with a focus on purity.
          </p>
        </div>
        <div className="preloader-copy-col flex-1 flex relative z-[3] max-[1000px]:items-center">
          <p className=" no-underline uppercase font-[var(--font-mono)] text-[0.8rem] font-medium tracking-[-0.0125rem] leading-[1.2] inline-block w-[75%] max-[1000px]:w-full">
            Explore timeless essentials built with care, thoughtfully designed
            to guide you.
          </p>
        </div>
      </div>

      <div className="preloader-counter flex-1 flex relative z-[3] justify-end max-[1000px]:items-center">
        <p
          ref={counterRef}
          className="no-underline uppercase font-[var(--font-mono)] text-[0.8rem] font-medium tracking-[-0.0125rem] leading-[1.2] inline-block"
        >
          00
        </p>
      </div>
    </div>
  );
}

export default Preloader;