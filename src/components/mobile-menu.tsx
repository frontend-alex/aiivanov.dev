"use client";

import React, { useEffect, useRef, useState } from "react";
import TransitionLink from "./ui/text-animation/transition-link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import { footerLinks } from "@/constants/data";
import { AppLogo } from "./navbar";

const MobileMenu = () => {
    const tl = useRef<gsap.core.Timeline | null>(null);
    const container = useRef<HTMLDivElement>(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useGSAP(
        () => {
            gsap.set(".menu-link-item-holder", { y: 75 });
            tl.current = gsap
                .timeline({ paused: true })
                .to(".menu-overlay", {
                    duration: 1.25,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    ease: "power4.inOut",
                })
                .to(".menu-link-item-holder", {
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.out",
                    delay: -0.75,
                });
        },
        { scope: container }
    );

    useEffect(() => {
        if (tl.current) {
            if (isMenuOpen) {
                tl.current.play();
            } else {
                tl.current.reverse();
            }
        }

        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [isMenuOpen]);
    return (
        <div className="md:hidden" ref={container}>
            {/* Toggle Button */}
            <div
                className="cursor-pointer z-50 relative"
                onClick={toggleMenu}
            >
                <Menu size={24} />
            </div>

            {/* Menu Overlay */}
            <div
                className="menu-overlay fixed top-0 left-0 w-screen h-full w-full py-5 px-10 bg-primary z-[60] flex flex-col justify-between [clip-path:polygon(0%_0%,100%_0%,100%_0%,0%_0%)]"
            >
                {/* Header */}
                <div className="flex justify-between items-center text-white">
                    <AppLogo />
                    <div className="cursor-pointer" onClick={toggleMenu}>
                        <X size={24} />
                    </div>
                </div>

                {/* Links / Content */}
                <div className="flex flex-col gap-8 justify-center flex-1">
                    {/* Replicating navbar.tsx content */}
                    {footerLinks.slice(0, 1).map((link) => (
                        link.links.map((subLink, subIdx) => (
                            <div key={subIdx} className="menu-link-item overflow-hidden">
                                <div className="menu-link-item-holder relative">
                                    <TransitionLink href={subLink.href} className="text-2xl font-medium" onClick={toggleMenu}>{subLink.name}</TransitionLink>
                                </div>
                            </div>
                        ))
                    ))}

                    {/* <div className="menu-link-item overflow-hidden">
                        <div className="menu-link-item-holder relative">
                            <div className="flex flex-col gap-2">
                                <p className="text-lg">Building at</p>
                                <TransitionLink href="/" className="text-2xl font-medium text-white " onClick={toggleMenu}>@OutSource</TransitionLink>
                            </div>
                        </div>
                    </div>

                    <div className="menu-link-item overflow-hidden">
                        <div className="menu-link-item-holder relative">
                            <div className="flex flex-col gap-2">
                                <p className="text-lg">Position</p>
                                <TransitionLink href="/" className="text-2xl font-medium text-white" onClick={toggleMenu}>Fullstack Developer</TransitionLink>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Footer / Button */}
                <div className="w-full">
                    <button className="w-full py-4 bg-foreground text-background text-xl rounded-full font-medium">
                        Get in touch
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MobileMenu;
