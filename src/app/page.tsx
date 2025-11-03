"use client";

import Navbar from "@/components/Navbar";
import SectionText from "@/components/sections/SectionText";

import { useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { Header } from "@/components/sections/Header";
import { ScrollReveal } from "@/components/scroll/ScrollReveal";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="overflow-hidden">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s",
          visibility: isLoading ? "hidden" : "visible",
        }}
      >
        <Navbar />
        <Header isLoading={isLoading} />

        {/* Text Section */}
        <SectionText />
        
        {/* Scroll Reveal Section */}
        <div className="hidden md:block">
        <ScrollReveal
          initialScale={100}
          scrollDistance={2}
        />
        </div>
      </div>
    </div>
  );
};

export default Page;
