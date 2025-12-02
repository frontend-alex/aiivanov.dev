"use client";

import TransitionLink from "./transition-link";
import { ReactNode } from "react";

interface HoverSlideTextProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
}

export default function HoverSlideText({
    children,
    href,
    onClick,
    className = ""
}: HoverSlideTextProps) {
    const content = (
        <span className="group relative inline-block overflow-hidden cursor-pointer">
            <span className="relative inline-block">
                {/* Original text that slides out */}
                <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-full">
                    {children}
                </span>

                {/* Duplicate text that slides in */}
                <span className="absolute left-0 top-0 inline-block translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0">
                    {children}
                </span>
            </span>
        </span>
    );

    if (href) {
        return (
            <TransitionLink href={href} className={className} onClick={onClick}>
                {content}
            </TransitionLink>
        );
    }

    return (
        <span className={className} onClick={onClick}>
            {content}
        </span>
    );
}
