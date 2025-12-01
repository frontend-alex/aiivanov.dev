"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FadeOutSectionProps {
    children: React.ReactNode;
    className?: string;
    triggerSelector: string;
    triggerStart?: string;
    triggerEnd?: string;
    yOffset?: number;
    scale?: number;
    blur?: number;
}

const FadeOutSection = ({
    children,
    className,
    triggerSelector,
    triggerStart = "top bottom",
    triggerEnd = "top 0%",
    yOffset = -100,
    scale = 0.95,
    blur = 10,
}: FadeOutSectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        const animation = gsap.to(sectionRef.current, {
            y: yOffset,
            scale: scale,
            filter: `blur(${blur}px)`,
            scrollTrigger: {
                trigger: triggerSelector,
                start: triggerStart,
                end: triggerEnd,
                scrub: true,
            },
        });

        return () => {
            animation.kill();
        };
    }, [triggerSelector, triggerStart, triggerEnd, yOffset, scale, blur]);

    return (
        <div ref={sectionRef} className={cn(className)}>
            {children}
        </div>
    );
};

export default FadeOutSection;
