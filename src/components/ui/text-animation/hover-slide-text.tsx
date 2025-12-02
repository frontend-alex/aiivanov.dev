"use client";

import TransitionLink from "./transition-link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

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

    const pathname = usePathname();

    const isActive = href && pathname === href;
    const combinedClass = `${className} ${isActive ? "navbar-active" : ""}`.trim();

    const content = (
        <span className="group relative inline-block overflow-hidden cursor-pointer">
            <span className="relative inline-block">
                {/* Original text sliding out */}
                <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-full">
                    {children}
                </span>

                {/* Duplicate text sliding in */}
                <span className="absolute left-0 top-0 inline-block translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0">
                    {children}
                </span>
            </span>
        </span>
    );

    if (href) {
        return (
            <TransitionLink href={href} className={combinedClass} onClick={onClick}>
                {content}
            </TransitionLink>
        );
    }

    return (
        <span className={combinedClass} onClick={onClick}>
            {content}
        </span>
    );
}
