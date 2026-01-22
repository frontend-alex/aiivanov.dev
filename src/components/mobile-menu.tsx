"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

import { footerLinks } from "@/constants/data";
import TransitionLink from "./ui/text-animation/transition-link";
import Link from "next/link";
import { useLenis } from "lenis/react";

const MobileMenu = () => {
    const lenis = useLenis();
    const tl = useRef<gsap.core.Timeline | null>(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(
        () => {
            gsap.set(".menu-link-item-holder", { y: 75 });
            tl.current = gsap
                .timeline({ paused: true })
                .to(".menu-overlay", {
                    duration: 1,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    ease: "power4.inOut",
                })
                .to(".menu-link-item-holder", {
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.out",
                    delay: -1,
                });
        },
        []
    );

    useEffect(() => {
        if (tl.current) {
            if (isMenuOpen) {
                tl.current.play();
            } else {
                tl.current.reverse();
            }
        }

        const preventTouch = (e: TouchEvent) => e.preventDefault();

        if (isMenuOpen) {
            lenis?.stop();
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";

            // iOS / mobile fix
            document.addEventListener("touchmove", preventTouch, { passive: false });
        } else {
            lenis?.start();
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.removeEventListener("touchmove", preventTouch);
        }

        return () => {
            lenis?.start();
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.removeEventListener("touchmove", preventTouch);
        };
    }, [isMenuOpen]);
    return (
        <div className="md:hidden">
            {/* Toggle Button */}
            <div
                className="cursor-pointer z-50 relative"
                onClick={toggleMenu}
            >
                <div className="bg-foreground h-6 w-6" />
            </div >

            {/* Menu Overlay */}
            < div
                className="menu-overlay fixed top-0 left-0 w-screen h-full w-full py-5 px-5 bg-black dark:bg-white z-[60] flex flex-col justify-between [clip-path:polygon(0%_0%,100%_0%,100%_0%,0%_0%)]"
            >
                {/* Header */}
                < div className="flex justify-between items-center text-white px-5" >
                    <TransitionLink href="/" onClick={toggleMenu}>
                        <h1 className="text-2xl font-bold text-white dark:text-black">AI.</h1>
                    </TransitionLink>
                    <div className="cursor-pointer bg-background h-6 w-6" onClick={toggleMenu} />
                </div >

                {/* Links / Content */}
                < div className="flex flex-col gap-8 justify-center items-center flex-1" >
                    {/* Replicating navbar.tsx content */}
                    {
                        footerLinks.slice(0, 1).map((link) => (
                            link.links.map((subLink, subIdx) => (
                                <div key={subIdx} className="menu-link-item overflow-hidden">
                                    <div className="menu-link-item-holder relative">
                                        <TransitionLink href={subLink.href} className="text-4xl font-black text-white dark:text-black uppercase" onClick={toggleMenu}>{subLink.name}</TransitionLink>
                                    </div>
                                </div>
                            ))
                        ))
                    }
                </div >

                {/* Footer / Button */}
                <Link href="mailto:alex@aiivanov.dev" className="w-full">
                    <button className="w-full py-4 bg-white dark:bg-black text-black dark:text-white text-xl rounded-full font-medium">
                        Get in touch
                    </button>
                </Link >

            </div >
        </div >
    );
};

export default MobileMenu;
