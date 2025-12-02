"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { approach } from "@/constants/data";
import { HoverSlideButton, RevealText } from "@/components/ui";
import { ArrowRight } from "lucide-react";

const ServicesHoverSection = ({ className }: { className?: string }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const videoContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
    const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const handleTitleMouseEnter = contextSafe((index: number) => {
        setActiveIndex(index);

        const videoContainer = videoContainerRefs.current[index];

        const totalItems = approach.length;
        let alignmentPercent = 0;

        if (totalItems === 1) {
            alignmentPercent = 50;
        } else {
            alignmentPercent = (index / (totalItems - 1)) * 50;
        }

        if (videoWrapperRef.current) {
            gsap.to(videoWrapperRef.current, {
                y: `${alignmentPercent}%`,
                duration: 0.6,
                ease: "power3.out",
            });
        }

        if (videoContainer) {
            gsap.fromTo(
                videoContainer,
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                },
                {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 0.8,
                    ease: "power3.inOut",
                }
            );
        }

        descriptionRefs.current.forEach((desc, i) => {
            if (!desc) return;

            if (i === index) {
                // Animate IN
                gsap.fromTo(
                    desc,
                    { opacity: 0, y: 10 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        delay: 0.1,
                        ease: "power2.out",
                        overwrite: true
                    }
                );
            } else {
                gsap.to(desc, {
                    opacity: 0,
                    y: -10,
                    duration: 0.2,
                    ease: "power2.out",
                    overwrite: true
                });
            }
        });
    });

    return (
        <section ref={containerRef} className={cn("w-full flex flex-col gap-20", className)}>
            <div className="flex justify-between flex-col lg:flex-row gap-10">
                <RevealText tagName="h1" className="text-2xl font-medium">(Approach)</RevealText>
                <p className="text-lg lg:text-2xl max-w-md hidden lg:flex">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, rerum.</p>
                <HoverSlideButton emoji={<ArrowRight />} mixBlend={false} href="/approach" className="hidden lg:flex">Learn About my approach</HoverSlideButton>
            </div>


            {/* pc */}
            <div className="hidden lg:flex gap-10 items-start">
                {/* Left Side - Video and Description */}
                <div className="w-full lg:w-1/3">
                    {/* Video Container with dynamic vertical positioning */}
                    <div className="relative h-[60vh] w-full">
                        <div
                            ref={videoWrapperRef}
                            className="absolute top-0 left-0 w-full flex flex-col gap-6"
                            style={{ transform: 'translateY(0%)' }}
                        >
                            {/* Video */}
                            <div className="relative aspect-[16/9] w-full max-w-lg overflow-hidden rounded-2xl">
                                {approach.map((service, index) => (
                                    <div
                                        key={service.id}
                                        ref={(el) => { videoContainerRefs.current[index] = el; }}
                                        className={cn(
                                            "absolute inset-0",
                                            activeIndex === index ? "z-10" : "z-0 pointer-events-none"
                                        )}
                                        style={{
                                            clipPath: activeIndex === index
                                                ? undefined
                                                : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
                                        }}
                                    >
                                        <iframe
                                            src={service.videoUrl}
                                            className="w-full h-full object-cover"
                                            allow="autoplay; fullscreen; picture-in-picture"
                                            style={{
                                                transformOrigin: 'top left',
                                                border: 'none'
                                            }}
                                            title={service.title}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Description - Right under video */}
                            <div className="relative min-h-24 w-full max-w-lg">
                                {approach.map((service, index) => (
                                    <p
                                        key={service.id}
                                        ref={(el) => { descriptionRefs.current[index] = el; }}
                                        className={cn(
                                            "absolute inset-0 text-lg lg:text-2xl leading-relaxed max-w-md",
                                            activeIndex === index ? "z-10" : "z-0 opacity-0 pointer-events-none"
                                        )}
                                    >
                                        {service.description.slice(0, 100) + "..."}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Service Titles */}
                <div className="flex-1 flex flex-col gap-4 lg:gap-6">
                    {approach.map((service, index) => (
                        <div
                            key={service.id}
                            onMouseEnter={() => handleTitleMouseEnter(index)}
                        >
                            <RevealText
                                tagName="h2"
                                className={cn(
                                    "text-[7vw] font-black uppercase leading-none cursor-pointer transition-colors duration-300",
                                    activeIndex === index
                                        ? "text-black dark:text-white"
                                        : "text-zinc-300 dark:text-zinc-700"
                                )}
                            >
                                {service.title}
                            </RevealText>
                        </div>
                    ))}
                </div>
            </div>


            {/* mobile */}
            <div className="flex lg:hidden flex-col gap-10">
                {approach.map((service, index) => (
                    <div className="border-b border-accent flex flex-col gap-10 pb-5" key={service.id}>
                        <RevealText delay={index * 0.2} duration={1} className="text-4xl font-black">{service.title}</RevealText>
                        <div className="w-full h-[200px] overflow-hidden rounded-lg">
                            <iframe
                                src={`${service.videoUrl}&muted=1`}
                                className="w-full h-full object-cover"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <RevealText delay={index * 0.2} duration={1} className="text-xl">{service.description}</RevealText>
                    </div>
                ))}
                <HoverSlideButton emoji={<ArrowRight />} mixBlend={false} href="/approach" className="mx-auto">Learn About my approach</HoverSlideButton>
            </div>
        </section>
    );
};

export default ServicesHoverSection;
