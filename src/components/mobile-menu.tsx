"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

import { footerLinks } from "@/constants/data";
import TransitionLink from "./ui/text-animation/transition-link";

const MobileMenu = () => {
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
        <div className="md:hidden">
            {/* Toggle Button */}
            <div
                className="cursor-pointer z-50 relative"
                onClick={toggleMenu}
            >
                <h1 className="text-xl font-bold">Menu</h1>
            </div >

            {/* Menu Overlay */}
            < div
                className="menu-overlay fixed top-0 left-0 w-screen h-full w-full py-5 px-5 bg-black dark:bg-white z-[60] flex flex-col justify-between [clip-path:polygon(0%_0%,100%_0%,100%_0%,0%_0%)]"
            >
                {/* Header */}
                < div className="flex justify-between items-center text-white" >
                    <TransitionLink href="/" onClick={toggleMenu}>
                        <h1 className="text-2xl font-bold text-white dark:text-black">AI.</h1>
                    </TransitionLink>
                    <div className="cursor-pointer" onClick={toggleMenu}>
                        <h1 className="text-xl font-bold text-white dark:text-black">Close</h1>
                    </div>
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
                </div >

                {/* Footer / Button */}
                < div className="w-full" >
                    <button className="w-full py-4 bg-white dark:bg-black text-black dark:text-white text-xl rounded-full font-medium">
                        Get in touch
                    </button>
                </div >

            </div >
        </div >
    );
};

export default MobileMenu;
