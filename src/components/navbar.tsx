'use client'

import { footerLinks } from "@/constants/data";

import MobileMenu from "./mobile-menu";
import HoverSlideButton from "@/components/ui/button";
import TransitionLink from "./ui/text-animation/transition-link";
import HoverSlideText from "@/components/ui/text-animation/hover-slide-text";
import { useEffect, useState } from "react";

export const AppLogo = ({ className }: { className?: string }) => {
    return (
        <TransitionLink
            href="/"
            className={`
                ${className}
                navbar-logo 
                relative inline-block
                logo-hover
            `}
        >
            AI.
        </TransitionLink>
    );
};

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 1) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`
                fixed top-5 w-full px-10 flex items-center justify-between text-lg
                z-50 md:mix-blend-difference md:text-white
                transition-transform duration-300 ease-out
                ${hidden ? "-translate-y-[150%]" : ""}
            `}
        >
            <div className="flex items-center gap-10 ">
                <AppLogo className="text-2xl font-bold" />
                <div className="flex flex-col hidden lg:flex text-xl">
                    <p>Netherlands Based</p>
                    <p className="text-inverted-stone">Working globally</p>
                </div>
            </div>
            <div className="flex items-center gap-30 hidden md:flex">
                <ul className="flex  items-center gap-3">
                    {footerLinks.slice(0, 1).map((link) => (
                        link.links.map((subLink, subIdx) => (
                            <li key={subIdx}>
                                <HoverSlideText href={subLink.href} className="text-2xl cursor-target">{subLink.name}</HoverSlideText>
                            </li>
                        ))
                    ))}
                </ul>
            </div>

            <HoverSlideButton mixBlend={true} href="mailto:alex@aiivanov.dev" className="hidden md:flex">Get in touch</HoverSlideButton>

            <MobileMenu />
        </nav>
    );
};

export default Navbar;
