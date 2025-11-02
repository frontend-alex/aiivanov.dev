"use client";

import Navbar from "@/components/navbar";
import { LoadingScreen } from "@/components/loading-screen";
import { Header } from "@/components/sections/Header";
import { useState } from "react";
import { ScrollReveal } from "@/components/scroll/ScrollReveal";
import SectionText from "@/components/sections/SectionText";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);

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
