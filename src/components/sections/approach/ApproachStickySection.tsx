"use client";

import gsap from "gsap";
import RevealText from "@/components/ui/text-animation/reveal-text";

import { useEffect } from "react";
import { approach } from "@/constants/data";
import { VimeoPlayer } from "@/components/ui";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { closedClip, openClip } from "@/constants/consts";

const ApproachSection = () => {

    useEffect(
        () => {

            gsap.registerPlugin(ScrollTrigger);

            // Use scoped selector for sticky cards
            const stickyCards = gsap.utils.toArray<HTMLElement>(".sticky-card");

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
                            // const rotation = (index % 2 === 0 ? 5 : -5) * progress;
                            const afterOpacity = progress;

                            gsap.set(card, {
                                scale: scale,
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
                        clipPath: closedClip,
                    });

                    ScrollTrigger.create({
                        trigger: card,
                        start: "top 90%", // Start earlier for mobile
                        end: "top 20%",
                        onEnter: () => {
                            gsap.to(imageWrapper, {
                                clipPath: openClip,
                                duration: 0.8,
                                ease: "power3.inOut",
                            });
                        },
                        onLeaveBack: () => {
                            gsap.to(imageWrapper, {
                                clipPath: closedClip,
                                duration: 0.5,
                                ease: "power3.inOut",
                            });
                        },
                    });
                }
            });
        },
        []
    );

    return (
        <div className="relative w-full h-full">
            {approach.map((cardData, index) => (
                <div
                    className={`sticky-card relative w-full h-screen bg-background p-6 ${index > 0 ? "[box-shadow:0_-60px_60px_-60px_rgba(0,0,0,0.1)]" : ""} flex will-change-transform
                     flex-col lg:flex-row lg:gap-12`}
                    key={index}
                >
                    {/* Overlay */}
                    <div
                        className="card-overlay absolute top-0 left-0 w-full h-full transition-opacity duration-100 pointer-events-none z-[2]"
                        style={{ opacity: 0 }}
                    />

                    <div className="flex-[0.5] lg:flex-[2] flex-[1] relative z-10">
                        <RevealText tagName="h1" className="text-[20vw] font-black" duration={0.8} delay={0.1}>
                            {cardData.index}
                        </RevealText>
                    </div>
                    <div className="flex-[4] pt-6 relative z-10">
                        <div className="w-full lg:w-3/4 flex flex-col gap-10">
                            <RevealText tagName="h1" className="text-4xl lg:text-7xl w-full lg:w-3/4" delay={0.2}>
                                {cardData.title}
                            </RevealText>

                            <div className="w-full overflow-hidden rounded-lg aspect-[16/9]">
                                <div
                                    className="image-wrapper w-full h-full"
                                    style={{ clipPath: closedClip }}
                                >
                                    <VimeoPlayer
                                        videoId={cardData.videoUrl}
                                        autoplay={false}
                                        loop={true}
                                        muted={true}
                                        controls={false}
                                        className="w-full h-full overflow-hidden "
                                        wrapperClassName="w-full h-full"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-6 lg:gap-6">
                                <div className="flex-[2]">
                                    <RevealText tagName="p" className="uppercase text-xl lg:text-2xl" duration={0.6} delay={0.3}>
                                        {cardData.subtitle}
                                    </RevealText>
                                </div>
                                <div className="flex-[4]">
                                    <RevealText tagName="p" className="text-xl text-stone-400 lg:text-2xl" duration={0.8} delay={0.4}>
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
