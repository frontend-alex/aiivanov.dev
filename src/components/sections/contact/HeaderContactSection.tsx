'use client'

import { RevealText } from "@/components/ui";

const HeaderContactSection = () => {
    return (
        <div className="min-h-screen border-b border-accent">
            <div className="flex flex-col justify-evenly h-[calc(100vh-5rem)]">
                <RevealText
                    trigger="manual"
                    delay={1.3}
                    className="font-black text-[14vw] lg:text-[15vw] uppercase"
                >
                    Contact
                </RevealText>

                <div className="flex flex-col lg:flex-row gap-10 items-end justify-between">
                    <div className="flex flex-col gap-10">

                        {/* NEW: Aligned with your design-engineering identity */}
                        <RevealText
                            trigger="manual"
                            delay={1.8}
                            className="text-2xl lg:text-3xl font-medium max-w-4xl"
                        >
                            Focused on the intersection of design and engineering, I create seamless, purposeful digital experiences built to perform.
                        </RevealText>

                        {/* NEW: Pulls in the ethos of improving the web + your craft */}
                        <RevealText
                            trigger="manual"
                            delay={2.3}
                            className="text-xl lg:text-2xl font-medium max-w-3xl text-stone-400"
                        >
                            Driven to make the web a better place, one line of code at a time. I build modern digital products with an emphasis on motion, performance, and detail transforming ideas into polished, production-ready experiences.
                        </RevealText>
                    </div>

                    <RevealText
                        trigger="manual"
                        delay={2.5}
                        className="text-2xl"
                    >
                        (Scroll)
                    </RevealText>
                </div>
            </div>
        </div>
    );
}

export default HeaderContactSection;
