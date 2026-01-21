"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LandingHero = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const textElements = document.querySelectorAll(".blur-on-scroll");

        gsap.to(textElements, {
            scrollTrigger: {
                trigger: ".header-hero",
                start: "top top",
                end: "bottom top",
                scrub: 1
            },
            filter: "blur(10px)",
            opacity: 0,
            ease: "none"
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.vars.trigger === ".header-hero") t.kill();
            });
        };
    }, []);

    return (
        <div className="header-section header-hero">
            <div />
            <div className="mt-[100px] blur-on-scroll">
                <div className="flex flex-col md:flex-row md:items-center justify-between uppercase text-2xl font-bold">
                    <p>a</p>
                    <p>really</p>
                    <p>good</p>
                </div>

                <h1 className="header-title char text-[15vw] xl:text-[8vw] -tracking-[0.05em] font-black uppercase">
                    Software Engineer
                </h1>
            </div>

            <div className="flex items-center justify-end text-lg font-bold blur-on-scroll">
                <h2 className="hidden lg:flex text-2xl font-medium">(Scroll)</h2>
            </div>
        </div>
    );
};

export default LandingHero;
