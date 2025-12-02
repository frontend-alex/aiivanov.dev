"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface WordFadeTextProps {
    children: string | React.ReactNode;
    className?: string;
    tagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
    initialOpacity?: number;
    finalOpacity?: number;
    duration?: number;
    stagger?: number;
    triggerStart?: string;
    triggerEnd?: string;
}

/**
 * WordFadeText Component
 * 
 * Animates text by fading in each word individually on scroll.
 * Words start at a low opacity and gradually fade to full opacity as you scroll.
 */
const WordFadeText = ({
    children,
    className,
    tagName = "div",
    initialOpacity = 0.1,
    finalOpacity = 1,
    duration = 1,
    stagger = 0.1,
    triggerStart = "top 90%",
    triggerEnd = "bottom 60%",
}: WordFadeTextProps) => {
    const elementRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (!elementRef.current) return;

            gsap.registerPlugin(SplitText, ScrollTrigger);

            const split = new SplitText(elementRef.current, {
                type: "words",
            });

            gsap.set(split.words, {
                opacity: initialOpacity,
            });

            gsap.to(split.words, {
                opacity: finalOpacity,
                duration,
                stagger,
                ease: "none",
                scrollTrigger: {
                    trigger: elementRef.current,
                    start: triggerStart,
                    end: triggerEnd,
                    scrub: true,
                },
            });

            return () => {
                split.revert();
            };
        },
        { scope: elementRef }
    );

    const Tag = tagName;

    return (
        <Tag ref={elementRef as any} className={cn("word-fade-text", className)}>
            {children}
        </Tag>
    );
};

export default WordFadeText;
