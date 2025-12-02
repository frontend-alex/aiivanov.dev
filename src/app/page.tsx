"use client";

import { Footer } from "@/components/index";
import { WordFadeText } from "@/components/ui";
import { HeaderSection, AboutSection, ProjectsSection, ServicesHoverSection } from "@/components/sections/index";


export default function Page() {
  return (
    <div className="px-5 lg:px-10 flex flex-col gap-52">
      <HeaderSection />
      <div className="min-h-1/2 flex items-center justify-center lg:mt-52">
        <AboutSection />
      </div>
      <ProjectsSection />

      <WordFadeText tagName="h1" className="text-6xl lg:text-[9vw] font-black uppercase leading-[0.75] px-5">Passinate about making the web a better place, one line of code at a time.</WordFadeText>

      <ServicesHoverSection />
      <Footer />
    </div >
  );
}

