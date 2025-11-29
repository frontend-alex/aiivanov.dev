'use client'

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProjectCard from "@/components/cards/project-card";
import HoverSlideButton from "@/components/ui/hover-slide-button";

import { projectsData } from "@/constants/data";
import { MoveRight } from "lucide-react";

const ProjectsSection = ({ triggerElement }: { triggerElement: string }) => {
    const yearRef = useRef<HTMLHeadingElement>(null);
    const workRef = useRef<HTMLHeadingElement>(null);
    const counterRef = useRef({ value: 0 });

    useEffect(() => {
        gsap.registerPlugin(SplitText, ScrollTrigger);

        // Fade out animation
        gsap.to(".project-section", {
            opacity: 0,
            scrollTrigger: {
                trigger: triggerElement,
                start: "top bottom",
                end: "top 0%",
                scrub: true,
            },
        });

        // Work text animation
        if (workRef.current) {
            const workSplit = new SplitText(workRef.current, {
                type: "chars",
                charsClass: "char",
            });

            gsap.set(workSplit.chars, {
                opacity: 0,
                y: 100,
            });

            ScrollTrigger.create({
                trigger: ".project-section",
                start: "top 80%",
                end: "bottom 20%",
                onEnter: () => {
                    gsap.to(workSplit.chars, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.05,
                        ease: "power3.out",
                    });
                },
                onLeaveBack: () => {
                    gsap.to(workSplit.chars, {
                        opacity: 0,
                        y: 100,
                        duration: 0.6,
                        stagger: 0.03,
                        ease: "power2.in",
                    });
                },
            });
        }

        // Counter and year animation
        if (yearRef.current) {
            const split = new SplitText(yearRef.current, {
                type: "chars",
                charsClass: "char",
            });

            gsap.set(split.chars, {
                opacity: 0,
                y: 100,
            });

            ScrollTrigger.create({
                trigger: ".project-section",
                start: "top 80%",
                end: "bottom 20%",
                onEnter: () => {
                    // Animate counter from 0 to 25
                    gsap.to(counterRef.current, {
                        value: 25,
                        duration: 2,
                        ease: "power2.out",
                        onUpdate: () => {
                            const value = Math.floor(counterRef.current.value);
                            if (yearRef.current) {
                                yearRef.current.textContent = `${value}'`;
                            }
                        },
                    });
                },
                onLeaveBack: () => {
                    // Reset counter to 0 when scrolling back up
                    gsap.to(counterRef.current, {
                        value: 0,
                        duration: 1,
                        ease: "power2.in",
                        onUpdate: () => {
                            const value = Math.floor(counterRef.current.value);
                            if (yearRef.current) {
                                yearRef.current.textContent = `${value}'`;
                            }
                        },
                    });
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === ".project-section" || trigger.vars.trigger === triggerElement) {
                    trigger.kill();
                }
            });
        };
    }, [triggerElement]);

    return (
        <section className="min-h-screen flex flex-col gap-5 project-section justify-center project-section">
            <div className="flex items-center justify-between">
                <h1 ref={workRef} className="font-black text-4xl lg:text-9xl uppercase">Work</h1>
                <h1 ref={yearRef} className="font-black text-4xl lg:text-9xl">0'</h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 items-center project-section-cards">
                {projectsData.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
            <HoverSlideButton href="/projects" emoji={<MoveRight />} className="mx-auto w-max">See All</HoverSlideButton>
        </section>
    );
};

export default ProjectsSection;