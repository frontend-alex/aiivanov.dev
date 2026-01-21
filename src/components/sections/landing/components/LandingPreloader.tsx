"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useLenis } from "lenis/react";
import { usePreloader } from "@/contexts/preloader-context";

const LandingPreloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const preloaderTextRef = useRef<HTMLHeadingElement>(null);
    const lenis = useLenis();
    const { isPreloaderComplete, setIsPreloaderComplete } = usePreloader();

    useEffect(() => {
        if (typeof window === "undefined") return;

        gsap.registerPlugin(SplitText);

        const headerTitle = document.querySelector(".header-title");
        let headerSplit: SplitText | null = null;
        if (headerTitle) {
            headerSplit = new SplitText(headerTitle, { type: "chars", charsClass: "char" });
        }

        if (!isPreloaderComplete) {
            lenis?.stop();
            document.body.style.overflow = "hidden";

            const preloaderText = preloaderTextRef.current;
            if (!preloaderText) return;

            if (headerSplit) {
                gsap.set(headerSplit.chars, { opacity: 0 });
            }

            const split = new SplitText(preloaderText, { type: "chars" });
            const chars = split.chars;

            gsap.set(preloaderText, { visibility: "visible" });

            const charA = chars.find(c => c.textContent === "A");
            const charI = chars.find(c => c.textContent === "I");
            const charPeriod = chars.find(c => c.textContent === ".");
            const otherChars = chars.filter(c => c !== charA && c !== charI && c !== charPeriod);

            gsap.set(chars, { opacity: 0, y: 40 });

            const tl = gsap.timeline({
                defaults: { duration: 0.8, ease: "power3.out" }
            });

            tl.fromTo(
                chars,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.035, duration: 0.8, ease: "power3.out" }
            )
                .to(otherChars, { opacity: 0, duration: 0.45 }, "+=0.2")
                .add(() => {
                    requestAnimationFrame(() => {
                        const r = preloaderText.getBoundingClientRect();
                        const centerX = r.width / 2;

                        if (charA && charI && charPeriod) {
                            const rectA = charA.getBoundingClientRect();
                            const rectI = charI.getBoundingClientRect();
                            const rectPeriod = charPeriod.getBoundingClientRect();
                            const spacing = 4;
                            const totalWidth = rectA.width + spacing + rectI.width + spacing + rectPeriod.width;

                            gsap.to(charA, {
                                x: centerX - totalWidth / 2 - (rectA.left - r.left),
                                duration: 0.8,
                                ease: "power3.inOut"
                            });
                            gsap.to(charI, {
                                x: centerX - totalWidth / 2 + rectA.width + spacing - (rectI.left - r.left),
                                duration: 0.8,
                                ease: "power3.inOut"
                            });
                            gsap.to(charPeriod, {
                                x: centerX - totalWidth / 2 + rectA.width + spacing + rectI.width + spacing - (rectPeriod.left - r.left),
                                duration: 0.8,
                                ease: "power3.inOut"
                            });
                        }
                    });
                })
                .add(() => {
                    requestAnimationFrame(() => {
                        const navbarLogo = document.querySelector(".navbar-logo");
                        if (!navbarLogo) return;

                        const logoRect = navbarLogo.getBoundingClientRect();
                        const textRect = preloaderText.getBoundingClientRect();
                        const dx = logoRect.left - textRect.left + logoRect.width / 2 - textRect.width / 2;
                        const dy = logoRect.top - textRect.top + logoRect.height / 2 - textRect.height / 2;
                        const scale = parseFloat(getComputedStyle(navbarLogo).fontSize) / parseFloat(getComputedStyle(preloaderText).fontSize);

                        gsap.to(preloaderText, {
                            x: dx,
                            y: dy,
                            scale,
                            rotation: 360,
                            duration: 1.2,
                            ease: "power3.inOut",
                            onComplete: () => {
                                gsap.delayedCall(0.1, () => {
                                    gsap.set(".navbar-logo", { opacity: 1 });
                                    gsap.to(preloaderRef.current, {
                                        opacity: 0,
                                        duration: 0.3,
                                        onComplete: () => {
                                            gsap.set(preloaderRef.current, { display: "none" });
                                            lenis?.start();
                                            document.body.style.overflow = "";

                                            if (headerSplit) {
                                                gsap.to(headerSplit.chars, { opacity: 1, duration: 0.5, stagger: 0.02 });
                                            }
                                            setIsPreloaderComplete(true);
                                        }
                                    });
                                });
                            }
                        });
                    });
                }, "+=1");

            return () => {
                document.body.style.overflow = "";
                headerSplit?.revert();
                split.revert();
                tl.kill();
            };
        } else {
            if (preloaderRef.current) {
                gsap.set(preloaderRef.current, { display: "none" });
            }
            const navbarLogo = document.querySelector(".navbar-logo");
            if (navbarLogo) {
                gsap.set(navbarLogo, { opacity: 1, rotation: 0 });
            }
            if (headerSplit) {
                gsap.set(headerSplit.chars, { opacity: 1, y: 0, scale: 1, filter: "none", rotationX: 0 });
            }
            return () => {
                headerSplit?.revert();
            };
        }
    }, [lenis, isPreloaderComplete, setIsPreloaderComplete]);

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-999 flex flex-col gap-3 items-center justify-center bg-background"
        >
            <h1
                ref={preloaderTextRef}
                className="preloader-text text-3xl md:text-8xl font-bold uppercase tracking-tight invisible"
            >
                Aleksandar Ivanov.
            </h1>
        </div>
    );
};

export default LandingPreloader;
