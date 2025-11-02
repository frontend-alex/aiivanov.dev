"use client";

import Navbar from "@/components/navbar";
import SectionText from "@/components/sections/SectionText";

import { useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { Header } from "@/components/sections/Header";
import { ScrollReveal } from "@/components/scroll/ScrollReveal";

const page = () => {
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

        {/* Scroll Reveal Section */}
        <ScrollReveal
          logoImage={<SectionText />}
          initialScale={100}
          scrollDistance={2}
        />
      </div>
    </div>
  );
};

export default page;
