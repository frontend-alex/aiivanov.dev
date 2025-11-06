"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { EllipseAnimation } from "@/components/ui/ellipse";
import { Line } from "../ui/line";
import Spline from "@splinetool/react-spline";

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
    <header
      ref={headerRef}
      className="header-section min-h-[calc(100dvh-80px)] flex items-center justify-center overflow-hidden"
    >
      <Spline
        scene="https://prod.spline.design/2Ql1ThaCB26xCcR0/scene.splinecode"
        className="absolute h-screen top-0 w-full left-0"
      />
      <div className="flex flex-col justify-end h-[calc(100dvh-200px)] container gap-5 mx-auto  w-full px-5">
        <div className="flex items-center gap-5 z-2">
          <img src="/az.png" alt="avatar" className="size-20 rounded-full" />
          <div className="text-xl tracking-[-0.05vw] leading-6.5">
            <h1>Software Engineer</h1>
            <h1>and CS2 Entusiast</h1>
          </div>
        </div>
        <h1 className="2xl:text-[8.5rem] md:text-8xl text-[3.5rem] uppercase leading-[9vw] tracking-[-.35vw] z-2">
          <span className="text-primary-red">A</span>leksandar <span className="text-primary-red">I</span>vanov<span className="text-primary-red">.</span>
        </h1>
      </div>

      <div className="absolute  bg-black h-[50px] w-[150px] z-2 bottom-3 right-4"/>

      {/*  vertical lines that will be fixed on the screen */}
      <Line className="w-full absolute bottom-0 z-50" direction="horizontal" />
      <Line className="h-full fixed top-0 right-20 z-50" direction="vertical" />
      <Line className="h-full fixed top-0 left-20 z-50" direction="vertical" />
      {/*  vertical lines that will be fixed on the screen */}
    </header>
  );
};
