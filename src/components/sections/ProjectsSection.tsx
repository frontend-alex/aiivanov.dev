import ProjectCard from "@/components/cards/project-card";
import RevealText from "@/components/ui/reveal-text";
import HoverSlideButton from "@/components/ui/hover-slide-button";

import { projectsData } from "@/constants/data";
import { MoveRight } from "lucide-react";

const ProjectsSection = () => {
    return (
        <section className="min-h-screen flex flex-col gap-5 project-section justify-center">
            <div className="flex items-center justify-between">
                <RevealText tagName="h1" duration={1} delay={0.2} className="font-black text-4xl lg:text-9xl uppercase">Work</RevealText>
                <RevealText tagName="h1" duration={1} delay={0.5} className="font-black text-4xl lg:text-9xl">'25</RevealText>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 items-center">
                {projectsData.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
            <HoverSlideButton emoji={<MoveRight />} className="mx-auto w-max">See All</HoverSlideButton>
        </section>
    );
};

export default ProjectsSection;