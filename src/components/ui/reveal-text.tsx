"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

interface RevealTextProps {
    children: string | React.ReactNode;
    className?: string;
    tagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
    trigger?: "scroll" | "manual";
    delay?: number;
    duration?: number;
    stagger?: number;
}

const RevealText = ({
    children,
    className,
    tagName = "div",
    trigger = "scroll",
    delay = 0,
    duration = 0.5,
    stagger = 0.01,
}: RevealTextProps) => {
    const elementRef = useRef<HTMLElement>(null);
    const splitRef = useRef<SplitText | null>(null);

    useEffect(() => {
        gsap.registerPlugin(SplitText, ScrollTrigger);

        if (!elementRef.current) return;

        // Split text
        const split = new SplitText(elementRef.current, {
            type: "chars",
            charsClass: "char",
        });
        splitRef.current = split;

        // Initial state
        gsap.set(split.chars, {
            opacity: 0,
            y: 20,
            force3D: true,
        });

        // Animation
        if (trigger === "scroll") {
            gsap.to(split.chars, {
                opacity: 1,
                y: 0,
                duration,
                stagger,
                delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elementRef.current,
                    start: "top 90%", // Start earlier for better mobile experience
                    toggleActions: "play none none reverse",
                },
            });
        }

        return () => {
            if (splitRef.current) splitRef.current.revert();
            // We don't kill all ScrollTriggers here to avoid affecting other components,
            // but we should kill the specific one created if we stored it.
            // However, GSAP usually handles cleanup if the element is removed.
        };
    }, [children, trigger, delay, duration, stagger]);

    const Tag = tagName;

    return (
        <Tag ref={elementRef as any} className={cn("reveal-text", className)}>
            {children}
        </Tag>
    );
};

export default RevealText;
