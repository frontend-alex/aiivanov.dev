"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpIcon } from "lucide-react";
import { SplitText } from "gsap/SplitText";
import { footerLinks } from "@/constants/data";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FallingObjects from "./ui/falling-objects";

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        if (!footerRef.current) return;

        const texts = footerRef.current.querySelectorAll(".footer-animate");

        if (texts.length === 0) return;

        const split = new SplitText(texts, {
            type: "chars",
            charsClass: "char",
        });

        gsap.set(split.chars, {
            opacity: 0,
            y: 20,
            force3D: true,
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 60%",
                toggleActions: "play none none reverse",
            }
        });

        tl.to(split.chars, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.01,
            ease: "power4.inOut",
        });

        return () => {
            split.revert();
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === footerRef.current) t.kill();
            });
        };
    }, []);

    return (
        <footer ref={footerRef} className="border-t border-neutral-200 px-10 mt-20 relative overflow-hidden min-h-screen flex flex-col justify-between">
            <FallingObjects />

            <div className="flex flex-col lg:flex-row justify-between lg:gap-10 border-b border-neutral-200 py-10 lg:py-20 relative z-10 pointer-events-none">
                <h1 className="footer-animate text-4xl lg:text-7xl pointer-events-auto">Work with me</h1>
                <Link href="mailto:alex@aiivanov.dev" className="footer-animate text-4xl lg:text-7xl text-underline pointer-events-auto">alex@aiivanov.dev</Link>
            </div>

            <div className="flex flex-col lg:flex-row justify-start gap-10 py-20 relative z-10 pointer-events-none">
                {footerLinks.map((link, idx) => (
                    <div key={idx} className="flex flex-col gap-3 pointer-events-auto">
                        <h1 className="footer-animate font-medium text-2xl">{link.name}</h1>
                        {link.links.map((subLink, subIdx) => (
                            <Link key={subIdx} href={subLink.href} className="text-2xl text-stone-300 hover:text-stone-400 dark:text-stone-500 dark:hover:text-stone-400 transition-colors duration-300 block w-fit">
                                <span className="footer-animate inline-block">{subLink.name}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>


            <div className="flex flex-col lg:flex-row items-center justify-between relative z-1 pointer-events-none">
                <h1 className="footer-animate text-[12vw] pointer-events-auto">AI.</h1>
                <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 text-[3vw] cursor-pointer pointer-events-auto">
                    <h1 className="footer-animate text-[5vw]">Back to top</h1>
                    <ArrowUpIcon size={30} />
                </div>
                <h1 className="footer-animate text-center text-2xl mt-10 pointer-events-auto">Copyright © 2025 AI.</h1>
            </div>
        </footer>
    )
}

export default Footer;