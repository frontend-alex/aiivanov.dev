"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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

    useGSAP(
        () => {
            if (!elementRef.current) return;

            // Split text
            const split = new SplitText(elementRef.current, {
                type: "chars",
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
                        // Remove will-change after animation completes for better performance
                        gsap.set(split.chars, { willChange: "auto" });
                    },
                });
            }

            // Cleanup handled automatically by useGSAP context
            return () => {
                split.revert();
            };
        },
        {
            scope: elementRef,
            dependencies: [children, trigger, delay, duration, stagger],
        }
    );

    const Tag = tagName;

    return (
        <Tag ref={elementRef as any} className={cn("reveal-text", className)}>
            {children}
        </Tag>
    );
};

export default RevealText;
