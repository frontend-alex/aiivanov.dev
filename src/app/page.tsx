"use client";

import { Footer } from "@/components/index";
import { WordFadeText } from "@/components/ui";
import { HeaderLandingSection, AboutLandingSection, ProjectsLandingSection, ServicesHoverLandingSection } from "@/components/sections/index";

export default function Page() {
  return (
    <div className="px-5 lg:px-10 flex flex-col gap-20 lg:gap-52">
      <HeaderLandingSection />
      <div className="min-h-1/2 flex items-center justify-center lg:mt-52">
        <AboutLandingSection />
      </div>
      <ProjectsLandingSection />

      <WordFadeText tagName="h1" className="text-6xl lg:text-[9vw] font-black uppercase leading-[0.75] px-5">Driven to make the web a better place, one line of code at a time.</WordFadeText>

      <ServicesHoverLandingSection />
      <Footer />
    </div >
  );
}

