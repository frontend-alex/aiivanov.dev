"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { EllipseAnimation } from "@/components/ui/ellipse";
import { Line } from "../ui/line";

interface HeaderProps {
  isLoading: boolean;
}

export const Header = ({ isLoading }: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!headerRef.current || isLoading) return;

      gsap.set(".h1-word-holder", { y: 10, opacity: 0 });
      
      gsap.set(".header-subtitle", { y: 30, opacity: 0 });
      gsap.set(".header-signature", { y: 30, opacity: 0 });

      gsap.to(".h1-word-holder", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.inOut",
        delay: 0.1,
      });
      
      gsap.to(".header-subtitle", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.5,
      });
      
      gsap.to(".header-signature", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.7,
      });
    },
    { scope: headerRef, dependencies: [isLoading] }
  );

  return (
    <header ref={headerRef} className="header-section min-h-[calc(100dvh-80px)] flex items-center justify-center overflow-hidden">
      <div className="flex flex-col gap-20 max-w-7xl mx-auto relative px-5">
        <div className="flex flex-col gap-5">
          <p className="max-w-[300px] mx-auto md:max-w-none text-sm text-stone-400 font-medium text-center header-subtitle">
            Software engineer. Designer of interactions. Student of
            perfection
          </p>
          <h1 className="text-3xl sm:text-6xl xl:text-8xl  2xl:text-[8.5rem] text-center max-w-4xl xl:max-w-full mx-auto h1-word-container">
            <div className="h1-line">
              <span className="h1-word-item">
                <span className="h1-word-holder">
                  <span>&ldquo;Where</span>
                </span>
              </span>
              <span className="h1-word-item">
                <span className="h1-word-holder">
                  <span className="text-primary-red font-italiana">Code</span>
                </span>
              </span>
              <span className="h1-word-item">
                <span className="h1-word-holder">
                  <span>Constructs</span>
                </span>
              </span>
            </div>
            <div className="h1-line">
              <span className="h1-word-item">
                <span className="h1-word-holder">
                  <span className="text-primary-red font-italiana">Consciousness</span>
                </span>
              </span>
              <span className="h1-word-item">
                <span className="h1-word-holder">
                  <span>and</span>
                </span>
              </span>
            </div>
            <div className="h1-line">
              <span className="h1-word-item">
                <span className="h1-word-holder">
                  <span>Design Defines</span>
                </span>
              </span>
            </div>
            <div className="h1-line">
              <span className="h1-word-item">
                <span className="h1-word-holder">
                  <span className="text-primary-red font-italiana">Existence</span>
                </span>
              </span>
              <span className="h1-word-item">
                <span className="h1-word-holder">
                  <span>&rdquo;</span>
                </span>
              </span>
            </div>
          </h1>
          <p className="flex justify-end text-sm max-w-5xl px-10 header-signature">
            - Aleksandar Ivanov
          </p>
        </div>
      </div>

      {/*  vertical lines that will be fixed on the screen */}
      <Line className="w-full absolute bottom-0 z-50" direction="horizontal" />
      <Line className="h-full fixed top-0 right-20 z-50" direction="vertical" />
      <Line className="h-full fixed top-0 left-20 z-50" direction="vertical" />
      {/*  vertical lines that will be fixed on the screen */}

      <EllipseAnimation
        className="custom-ellipse"
        startX={1169}
        startY={51}
        startRotation={19.29}
        delay={0}
        animationType="first"
      />
      <EllipseAnimation
        className="custom-ellipse-3"
        startX={-264}
        startY={200}
        startRotation={-66.57}
        delay={2}
        animationType="second"
      />
    </header>
  );
};

