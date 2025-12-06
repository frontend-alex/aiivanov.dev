"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
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

    useEffect(() => {
        if (!elementRef.current) return;

        gsap.registerPlugin(SplitText);

        const ctx = gsap.context(() => {
            const split = new SplitText(elementRef.current, {
                type: "words,chars",
                wordsClass: "word",
                charsClass: "char",
            });

            // Initial state
            gsap.set(split.chars, {
                opacity: 0,
                y: 20,
                force3D: true,
                willChange: "opacity, transform",
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
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                    onComplete: () => {
                        gsap.set(split.chars, { willChange: "auto" });
                    },
                });
            } else {
                // Manual trigger - animate immediately on mount
                gsap.to(split.chars, {
                    opacity: 1,
                    y: 0,
                    duration,
                    stagger,
                    delay,
                    ease: "power3.out",
                    onComplete: () => {
                        gsap.set(split.chars, { willChange: "auto" });
                    },
                });
            }
        }, elementRef);

        return () => {
            ctx.revert();
        };
    }, [trigger, delay, duration, stagger, children]);

    const Tag = tagName;

    return (
        <Tag ref={elementRef as any} className={cn("reveal-text", className)}>
            {children}
        </Tag>
    );
};

export default RevealText;
