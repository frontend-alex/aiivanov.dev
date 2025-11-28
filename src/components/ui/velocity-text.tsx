"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface VelocityTextProps {
    text: string;
}

const VelocityText = ({ text }: VelocityTextProps) => {
    const firstText = useRef<HTMLDivElement>(null);
    const secondText = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    let xPercent = 0;
    let direction = -1; // -1 for left, 1 for right

    useGSAP(() => {
        // Create the animation loop
        const animate = () => {
            if (xPercent <= -100) {
                xPercent = 0;
            }
            if (xPercent > 0) {
                xPercent = -100;
            }

            gsap.set(firstText.current, { xPercent: xPercent });
            gsap.set(secondText.current, { xPercent: xPercent });

            // Speed of the scroll
            xPercent += 0.05 * direction;
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, []);

    return (
        <div className="relative flex overflow-hidden w-full py-10">
            {/* This mask creates the fade effect on left and right */}
            <div
                className="flex w-full whitespace-nowrap"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                }}
            >
                <div ref={slider} className="relative whitespace-nowrap flex">
                    <p ref={firstText} className="text-[10vw] font-bold uppercase text-white dark:text-black leading-none m-0 pr-10 opacity-80">
                        {text}
                    </p>
                    <p ref={secondText} className="absolute left-full top-0 text-[10vw] font-bold uppercase text-white dark:text-black leading-none m-0 pr-10 opacity-80">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VelocityText;