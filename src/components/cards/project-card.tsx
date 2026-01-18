"use client";

import gsap from "gsap";
import Image from "next/image";

import { useRef, memo } from "react";
import { useGSAP } from "@gsap/react";
import { type ProjectCard as ProjectCardType } from "@/types/types";
import { VimeoPlayer, type VimeoPlayerRef } from "../ui";
import { cn } from "@/lib/utils";
import { closedClip, openClip } from "@/constants/consts";

type ProjectCardProps = {
    card: ProjectCardType;
    className?: string;
}


const ProjectCard = memo(({ card, className }: ProjectCardProps) => {

    const { title, image, icon: Icon, year, type, technologiesText, videoUrl } = card;

    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const videoPopupWrapperRef = useRef<HTMLDivElement>(null);
    const videoPopupContentRef = useRef<HTMLDivElement>(null);

    const velocityText1Ref = useRef<HTMLDivElement>(null);
    const velocityText2Ref = useRef<HTMLDivElement>(null);
    const playerRef = useRef<VimeoPlayerRef>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    useGSAP(() => {
        gsap.set(imageRef.current, { scale: 1.2 });
        gsap.to(imageRef.current, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });

        let xPercent = 0;
        const direction = -1;

        const animateVelocityText = () => {
            if (xPercent <= -100) {
                xPercent = 0;
            }
            gsap.set(velocityText1Ref.current, { xPercent: xPercent });
            gsap.set(velocityText2Ref.current, { xPercent: xPercent });

            xPercent += 0.05 * direction;
            requestAnimationFrame(animateVelocityText);
        };

        requestAnimationFrame(animateVelocityText);

    }, { scope: containerRef });

    const handleMouseEnter = contextSafe(() => {
        playerRef.current?.play();

        gsap.to(imageRef.current, {
            filter: "blur(10px) brightness(0.6) grayscale(1)",
            duration: 0.5,
            ease: "power4.out",
            overwrite: true
        });

        gsap.to(videoPopupContentRef.current, {
            clipPath: openClip,
            duration: 0.8,
            ease: "power3.inOut",
            overwrite: true
        });
    });

    const handleMouseLeave = contextSafe(() => {
        playerRef.current?.pause();

        // Unblur background and remove grayscale
        gsap.to(imageRef.current, {
            filter: "blur(0px) brightness(1) grayscale(0)",
            duration: 0.5,
            ease: "power4.out",
            overwrite: true
        });

        // Bottom-to-Top Wipe Close
        gsap.to(videoPopupContentRef.current, {
            clipPath: closedClip,
            duration: 0.5,
            ease: "power3.inOut",
            overwrite: true
        });
    });

    return (
        <div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn("group relative h-[500px] lg:h-[800px] w-full rounded-2xl overflow-hidden cursor-pointer", className)}
        >
            {/* 1. Background Image (For Parallax and Blur) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div ref={imageRef} className="relative w-full h-[120%] -top-[10%]">
                    <Image
                        src={image}
                        className="w-full h-full object-cover"
                        alt={title}
                        width={1920}
                        height={1080}
                    />
                </div>
            </div>

            {/* 2. The Video Window (Smaller, Centered, Animated with Wipe) */}
            <div
                ref={videoPopupWrapperRef}
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            >
                {/* Inner Video Container defines size and receives the clip-path animation */}
                <div
                    ref={videoPopupContentRef}
                    className="w-[80%] aspect-video bg-black relative rounded-lg overflow-hidden"
                    // Initial clip-path: closed line at the bottom (0% 100%)
                    style={{ clipPath: closedClip }}
                >
                    <VimeoPlayer
                        ref={playerRef}
                        videoId={videoUrl}
                        autoplay={false}
                        loop={true}
                        background={false}
                        muted={true}
                        controls={false}
                        title={title}
                        className="w-full h-full object-cover"
                        wrapperClassName="absolute inset-0"
                    />
                </div>
            </div>

            {/* 3. Content (Velocity Text & Metadata) */}
            <div className="absolute -bottom-5 left-0 w-full p-6 z-30 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-3">

                {/* Title and Metadata */}
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center justify-between">
                    <div className="flex items-center gap-3">
                        {Icon && <Icon className="bg-primary text-white rounded-full w-10 h-10 p-2 backdrop-blur-md border border-white/10" />}
                        <span className="text-white text-2xl font-medium tracking-tight">{title}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-300 text-sm font-medium uppercase tracking-wider">
                        <span>{type}</span>
                        {year && <span className="w-1 h-1 rounded-full bg-zinc-400"></span>}
                        <span>{year}</span>
                    </div>
                </div>

                {/* Velocity Text with Gradient Fade (Technologies) */}
                <div className="relative flex overflow-hidden w-full h-8 mb-4">
                    <div
                        className="flex w-full whitespace-nowrap"
                        style={{
                            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                        }}
                    >
                        <div className="relative whitespace-nowrap flex text-white/80 text-xl uppercase font-semibold">
                            <div ref={velocityText1Ref} className="pr-8">
                                {technologiesText}
                            </div>
                            <div ref={velocityText2Ref} className="absolute left-full top-0 pr-8">
                                {technologiesText}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;