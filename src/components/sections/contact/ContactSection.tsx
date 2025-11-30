'use client'

import gsap from "gsap";

import { RevealText } from "@/components/ui";
import { useEffect } from "react";

const ContactSection = () => {

    useEffect(() => {
        gsap.to(".contact-section", {
            opacity: 0,
            scrollTrigger: {
                trigger: ".project-section",
                start: "top bottom",
                end: "top 0%",
                scrub: true,
            },
        });
    }, [])


    return (
        <section className="min-h-[50dvh] flex flex-col lg:flex-row gap-10 contact-section border-b border-accent">
            <div className="flex flex-col gap-10 lg:w-[33%]">
                <RevealText delay={0.4} duration={1} className="text-xl font-medium">(New Businesses)</RevealText>
            </div>
            <div className="flex flex-col">
                <RevealText delay={0.6} duration={1} className="text-4xl lg:text-7xl">Aleksandar Ivanov</RevealText>
                <RevealText delay={0.8} duration={1} className="text-4xl lg:text-7xl text-underline">alex@aiivanov.dev</RevealText>
            </div>
        </section>
    );
};

export default ContactSection;
