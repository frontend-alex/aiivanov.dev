"use client";

import Link from "next/link";

import { ReactNode } from "react";
import TransitionLink from "./transition-link";

interface HoverEmojiButtonProps {
    children: ReactNode;
    emoji?: string | ReactNode;
    onClick?: () => void;
    className?: string;
    href: string;
    mixBlend: boolean;
}

export default function HoverSlideButton({
    children,
    emoji = ":)",
    onClick,
    className = "",
    href,
    mixBlend = false
}: HoverEmojiButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`group relative ${className}`}
        >
            <div className="relative">
                {/* Emoji circle that slides in from the left */}
                <div className={`absolute left-0 top-0 w-12 h-12 ${mixBlend ? "bg-white" : "bg-black"} rounded-full flex items-center justify-center rotate-180 scale-95 group-hover:scale-100 group-hover:rotate-0 group-hover:-translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] -z-10`}>
                    {typeof emoji === "string" ? <span className={`text-xl ${mixBlend ? "text-black" : "text-white"}`}>{emoji}</span> : <i className={`text-xl ${mixBlend ? "text-black" : "text-white"}`}>{emoji}</i>}
                </div>

                {/* Main button content */}
                <div className={`flex items-center relative px-5 ${mixBlend ? "bg-white" : "bg-black"} lg:px-6 h-12 lg:h-14 rounded-full  font-semibold text-base z-10`}>
                    <div className="overflow-hidden">
                        <TransitionLink href={href || "#"} className="relative inline-block">
                            {/* Original text that slides out */}
                            <span className={`inline-block transition-transform  duration-300 ease-out group-hover:-translate-x-full ${mixBlend ? "text-black" : "text-white"}`}>
                                {children}
                            </span>

                            {/* Duplicate text that slides in */}
                            <span className={`absolute left-0 top-0 inline-block   translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 ${mixBlend ? "text-black" : "text-white"}`}>
                                {children}
                            </span>
                        </TransitionLink>
                    </div>
                </div>
            </div>
        </button >
    );
}
