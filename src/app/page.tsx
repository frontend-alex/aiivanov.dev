"use client";

import { Preloader } from "@/components/ui";
import { HeaderSection, AboutSection, ProjectsSection, ApproachSection } from "@/components/sections/index";

export default function Page() {
  return (
    <div className="px-5 lg:px-10 flex flex-col gap-10">
      <Preloader />
      <HeaderSection />
      <div className="min-h-screen flex items-center justify-center lg:mt-52">
        <AboutSection />
      </div>
      <ProjectsSection triggerElement=".approach-section" />
      <ApproachSection />
      {/* <TechSection /> */}
    </div>
  );
}

