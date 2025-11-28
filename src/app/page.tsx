"use client";

import AboutSection from "@/components/sections/AboutSection";
import HeaderSection from "@/components/sections/HeaderSection";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function Page() {
  return (
    <div className="px-10 flex flex-col gap-10">
      <HeaderSection />
      <AboutSection />
      <ProjectsSection />
    </div>
  );
}

