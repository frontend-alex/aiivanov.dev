"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutSection = () => {
    const h1Ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.registerPlugin(SplitText, ScrollTrigger);

        if (!h1Ref.current) return;

        const split = new SplitText(h1Ref.current, {
            type: "words",
        });

        gsap.set(split.words, {
            opacity: 0.1,
        });

        gsap.to(split.words, {
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
                trigger: h1Ref.current,
                start: "top 90%",
                end: "bottom 60%",
                scrub: true,
            },
        });

        gsap.to(".about-section", {
            opacity: 0,
            scrollTrigger: {
                trigger: ".project-section-cards",
                start: "top bottom",
                end: "top 0%",
                scrub: true,
            },
        });

        return () => {
            split.revert();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section className=" h-full flex items-center flex-col gap-10 lg:justify-center lg:flex-row about-section sticky top-0 about-section">
            <div className="flex flex-col justify-center gap-3">
                <p className="uppercase">Myself</p>
                <h1
                    ref={h1Ref}
                    className="text-2xl lg:text-5xl max-w-4xl leading-[1.1]"
                >
                    Passionate about merging design and engineering, I craft smooth,
                    interactive experiences with purpose. With a focus on motion,
                    performance, and detail, I help bring digital products to life for
                    forward-thinking brands around the world.
                </h1>
            </div>
            <div className="aspect-[16/9] w-full lg:w-[600px]  rounded-4xl">
                <iframe
                    src="https://player.vimeo.com/video/1140981207?background=1&autoplay=1&loop=1&dnt=1&app_id=aiivanov"
                    allow="autoplay; fullscreen"
                    title="Portfolio Showreel"
                    loading="lazy"
                    className="w-full h-full rounded-4xl"
                />
            </div>
        </section>
    );
};

export default AboutSection;