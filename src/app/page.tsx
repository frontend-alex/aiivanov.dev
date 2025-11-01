"use client";

import Navbar from "@/components/Navbar";
import { EllipseAnimation } from "@/components/EllipseAnimation";

const page = () => {
  return (
    <div>
      <Navbar />

      {/*  header section */}
      <header className="header-section min-h-[calc(100dvh-80px)] flex items-center justify-center overflow-hidden">
        <div className="flex flex-col gap-20 max-w-7xl mx-auto relative">
          <div className="flex flex-col gap-5">
            <p className="text-stone-400 font-medium text-center text-sm">
              Software engineer. Designer of interactions. Student of perfection
            </p>
            <h1 className="text-5xl sm:text-6xl xl:text-8xl text-center max-w-4xl xl:max-w-full mx-auto">
              "Where{" "}
              <span className="text-primary-red font-italiana">Code</span>{" "}
              Constructs{" "}
              <span className="text-primary-red font-italiana">
                Consciousness
              </span>{" "}
              and Design Defines{" "}
              <span className="text-primary-red font-italiana">Existence</span>"
            </h1>
            <p className="flex justify-end text-sm max-w-5xl px-10">
              - Aleksandar Ivanov
            </p>
          </div>
        </div>

        {/*  vertical lines that will be fixed on the screen */}
        <div className="w-full absolute bottom-0 bg-accent h-px" />
        <div className="hidden lg:flex h-full fixed top-0 right-20 bg-accent w-px" />
        <div className="hidden lg:flex h-full fixed top-0 left-20 bg-accent w-px" />
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
      {/*  header section */}

      <div className="h-[2000dvh]"></div>
    </div>
  );
};

export default page;
