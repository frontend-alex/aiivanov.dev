"use client";

import { HeaderSection, AboutSection, ProjectsSection, TechSection } from "@/components/sections/index";

export default function Page() {
  return (
    <div className="px-10 flex flex-col gap-10">
      <HeaderSection />
      <AboutSection />
      <ProjectsSection />
      {/* <TechSection /> */}
    </div>
  );
}

