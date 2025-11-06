"use client";

import { lazy, Suspense } from "react";
import { Line } from "../ui/line";
import { useInView } from "react-intersection-observer";

const SplineScene = lazy(() => import("@splinetool/react-spline"));

interface HeaderProps {
  isLoading?: boolean;
}

export const Header = ({ isLoading = false }: HeaderProps) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  const shouldLoadSpline = !isLoading && inView;

  return (
    <header
      ref={ref}
      className="header-section min-h-[calc(100dvh-80px)] flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="">
        {/* <img src="/bg.png" className="flex lg:hidden absolute h-screen top-0 w-full left-0 z-0 pointer-events-auto object-cover"/> */}
        {shouldLoadSpline && (
          <Suspense fallback={null}>
            <SplineScene
              scene="https://prod.spline.design/2Ql1ThaCB26xCcR0/scene.splinecode"
              className="absolute h-screen top-0 w-full left-0 z-0 pointer-events-auto"
            />
          </Suspense>
        )}
      </div>

      <div className="flex flex-col justify-end h-[calc(100dvh-200px)] container gap-5 mx-auto  w-full px-5 relative z-10 pointer-events-none">
        <div className="flex items-center gap-5 pointer-events-none">
          <img
            src="/az.png"
            alt="avatar"
            className="size-20 rounded-full pointer-events-none"
          />
          <div className="text-xl tracking-[-0.05vw] leading-6.5 pointer-events-none">
            <h1>Software Engineer</h1>
            <h1>and CS2 Entusiast</h1>
          </div>
        </div>
        <h1 className="2xl:text-[8.5rem] md:text-8xl text-[3.5rem] uppercase leading-[9vw] tracking-[-.35vw] pointer-events-none">
          <span className="text-primary-red">A</span>leksandar{" "}
          <span className="text-primary-red">I</span>vanov
          <span className="text-primary-red">.</span>
        </h1>
      </div>

      <div className="absolute  bg-black h-[50px] w-[150px] z-10 pointer-events-none bottom-3 right-4" />

      {/*  vertical lines that will be fixed on the screen */}
      <Line className="w-full absolute bottom-0 z-50" direction="horizontal" />
      <Line className="h-full fixed top-0 right-20 z-50" direction="vertical" />
      <Line className="h-full fixed top-0 left-20 z-50" direction="vertical" />
      {/*  vertical lines that will be fixed on the screen */}
    </header>
  );
};
