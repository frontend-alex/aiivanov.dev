'use client'

import { RevealText } from "@/components/ui";

const HeaderContactSection = () => {
    return (
        <div

            className="min-h-screen header-contact-section border-b border-accent"
        >
            <div className="flex flex-col justify-evenly h-[calc(100vh-5rem)]">
                <RevealText trigger="manual" delay={1.3} className="font-black text-[14vw] lg:text-[15vw] uppercase">Contact</RevealText>
                <div className="flex flex-col lg:flex-row gap-10 flex items-end justify-between">
                    <div className="flex flex-col gap-10">
                        <RevealText trigger="manual" delay={1.8} className="text-2xl lg:text-3xl font-medium max-w-4xl">
                            Crafting digital experiences that connect, engage, and inspire.
                        </RevealText>
                        <RevealText trigger="manual" delay={2.3} className="text-2xl lg:text-3xl font-light max-w-3xl text-stone-400">
                            I specialize in building modern web applications with a focus on performance, design, and user experience. From concept to deployment, I bring ideas to life through clean code and thoughtful design.
                        </RevealText>
                    </div>
                    <RevealText trigger="manual" delay={2.5} className="text-2xl">(Scroll)</RevealText>
                </div>
            </div>
        </div>
    );
}

export default HeaderContactSection;