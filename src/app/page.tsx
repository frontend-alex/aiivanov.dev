"use client";

import { HeaderSection, AboutSection, ProjectsSection, TechSection } from "@/components/sections/index";

export default function Page() {
  return (
    <div className="px-10 flex flex-col gap-10">
      <HeaderSection />
      <div className="min-h-screen flex items-center justify-center mt-52">
        <AboutSection />
      </div>
      <ProjectsSection />
      {/* <TechSection /> */}
    </div>
  );
}

