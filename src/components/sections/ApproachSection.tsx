"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RevealText from "@/components/ui/reveal-text";
import { stickyCardsData } from "@/constants/data";

gsap.registerPlugin(ScrollTrigger);

const ApproachSection = () => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!container.current) return;

            // Use scoped selector for sticky cards
            const stickyCards = gsap.utils.toArray<HTMLElement>(".sticky-card", container.current);

            stickyCards.forEach((card, index) => {
                // Pin cards on scroll
                if (index < stickyCards.length - 1) {
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top top",
                        endTrigger: stickyCards[stickyCards.length - 1],
                        end: "top top",
                        pin: true,
                        pinSpacing: false,
                    });
                }

                // Scale, rotation, and overlay animation
                if (index < stickyCards.length - 1) {
                    const overlay = card.querySelector(".card-overlay");

                    ScrollTrigger.create({
                        trigger: stickyCards[index + 1],
                        start: "top bottom",
                        end: "top top",
                        onUpdate: (self) => {
                            const progress = self.progress;
                            const scale = 1 - progress * 0.25;
                            const rotation = (index % 2 === 0 ? 5 : -5) * progress;
                            const afterOpacity = progress;

                            gsap.set(card, {
                                scale: scale,
                                rotation: rotation,
                            });

                            if (overlay) {
                                gsap.set(overlay, {
                                    opacity: afterOpacity,
                                });
                            }
                        },
                    });
                }

                // Image clip-path reveal animation
                const imageWrapper = card.querySelector(".image-wrapper");
                if (imageWrapper) {
                    gsap.set(imageWrapper, {
                        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                    });

                    ScrollTrigger.create({
                        trigger: card,
                        start: "top 90%", // Start earlier for mobile
                        end: "top 20%",
                        onEnter: () => {
                            gsap.to(imageWrapper, {
                                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                                duration: 0.8,
                                ease: "power3.inOut",
                            });
                        },
                        onLeaveBack: () => {
                            gsap.to(imageWrapper, {
                                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                                duration: 0.5,
                                ease: "power3.inOut",
                            });
                        },
                    });
                }
            });
        },
        { scope: container }
    );

    useEffect(() => {
        gsap.to(".approach-section", {
            opacity: 0,
            scrollTrigger: {
                trigger: ".footer",
                start: "top bottom",
                end: "top 0%",
                scrub: true,
            },
        });
    }, []);

    return (
        <div className="relative w-full h-full bg-white dark:bg-black approach-section" ref={container}>
            {stickyCardsData.map((cardData, index) => (
                <div
                    className="sticky-card relative rounded-2xl w-full h-screen bg-black dark:bg-white text-white dark:text-black p-6 flex gap-12 will-change-transform
                     flex-col lg:flex-row lg:gap-12"
                    key={index}
                >
                    {/* Overlay */}
                    <div
                        className="card-overlay absolute top-0 left-0 w-full h-full bg-black/50 dark:bg-white/50 transition-opacity duration-100 pointer-events-none z-[2]"
                        style={{ opacity: 0 }}
                    />

                    <div className="flex-[0.5] lg:flex-[2] flex-[1] relative z-10">
                        <RevealText tagName="h1" className="text-6xl lg:text-8xl font-bold" duration={0.8} delay={0.1}>
                            {cardData.index}
                        </RevealText>
                    </div>
                    <div className="flex-[4] pt-6 relative z-10">
                        <div className="w-full lg:w-3/4 flex flex-col gap-6">
                            <RevealText tagName="h1" className="text-4xl lg:text-6xl font-bold w-full lg:w-3/4" duration={1} delay={0.2}>
                                {cardData.title}
                            </RevealText>

                            <div className="w-full overflow-hidden rounded-lg">
                                <div
                                    className="image-wrapper w-full aspect-[5/3] overflow-hidden"
                                    style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
                                >
                                    <img
                                        src={cardData.image}
                                        alt={cardData.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-6 lg:gap-6">
                                <div className="flex-[2]">
                                    <RevealText tagName="p" className="uppercase font-semibold text-sm lg:text-base" duration={0.6} delay={0.3}>
                                        {cardData.subtitle}
                                    </RevealText>
                                </div>
                                <div className="flex-[4]">
                                    <RevealText tagName="p" className="text-base lg:text-lg leading-relaxed" duration={0.8} delay={0.4}>
                                        {cardData.description}
                                    </RevealText>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ApproachSection;
