"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { projectsData } from "@/constants/data";
import ProjectCard from "@/components/cards/project-card";
import { RevealText } from "@/components/ui";
import { Footer } from "@/components";

export default function ProjectsPage() {
    const trackRef = useRef<HTMLDivElement>(null);

    // Physics state
    const xRef = useRef(0);
    const velocityRef = useRef(0);
    const isDraggingRef = useRef(false);
    const lastClientXRef = useRef(0);
    const rafIdRef = useRef<number>(null);

    const wrapWidthRef = useRef(0);

    // Create a tripled list for the loop to ensure seamless scrolling
    // We duplicate the data in React so all interactive children (links/videos) work correctly
    // Filter out empty placeholders first
    const allProjects = [...projectsData, ...projectsData, ...projectsData];

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Use GSAP MatchMedia for responsive logic
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            // --------------------------------------------------------
            // DESKTOP ONLY LOGIC
            // --------------------------------------------------------

            // Measure items
            // We expect 3 * N items
            const items = Array.from(track.children) as HTMLElement[];
            if (items.length === 0) return;

            const itemWidth = items[0].getBoundingClientRect().width;
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.gap) || 32;

            // The width of ONE original set (projectsData.length)
            const singleSetWidth = (itemWidth + gap) * projectsData.length;

            wrapWidthRef.current = singleSetWidth;

            // Initial Position: reset to 0
            gsap.set(track, { x: 0 });

            // --------------------------------------------------------
            // PHYSICS LOOP
            // --------------------------------------------------------
            const loop = () => {
                // Friction
                if (!isDraggingRef.current) {
                    velocityRef.current *= 0.95;
                }

                // Stop small numbers
                if (Math.abs(velocityRef.current) < 0.01) {
                    // velocityRef.current = 0; // Optional: full stop
                }

                xRef.current += velocityRef.current;

                // Wrap logic
                const totalWidth = wrapWidthRef.current;
                if (totalWidth > 1) {
                    // Standard infinite scroll wrapping
                    const wrappedX = ((xRef.current % totalWidth) + totalWidth) % totalWidth;

                    // We render 3 sets. 
                    // To center the "infinite" feel, we might want to offset by one set width?
                    // Actually, simple wrap of 0..totalWidth is fine if we just translate -wrappedX.
                    // But to avoid the edge, we usually start at -totalWidth (the middle set).
                    // Let's just do standard module for now. 
                    // If we see flash, we can adjust.

                    gsap.set(track, { x: -wrappedX });
                }

                rafIdRef.current = requestAnimationFrame(loop);
            };
            loop();

            // --------------------------------------------------------
            // EVENTS
            // --------------------------------------------------------
            const handleWheel = (e: WheelEvent) => {
                velocityRef.current += e.deltaY * 0.1;
            };

            const handlePointerDown = (e: PointerEvent) => {
                isDraggingRef.current = true;
                lastClientXRef.current = e.clientX;
                track.style.cursor = "grabbing";
            };

            const handlePointerMove = (e: PointerEvent) => {
                if (!isDraggingRef.current) return;
                e.preventDefault();
                const delta = lastClientXRef.current - e.clientX;
                lastClientXRef.current = e.clientX;
                xRef.current += delta;
                velocityRef.current = delta;
            };

            const handlePointerUp = () => {
                isDraggingRef.current = false;
                track.style.cursor = "grab";
            };

            window.addEventListener("wheel", handleWheel);
            track.addEventListener("pointerdown", handlePointerDown);
            window.addEventListener("pointermove", handlePointerMove);
            window.addEventListener("pointerup", handlePointerUp);
            window.addEventListener("pointercancel", handlePointerUp);

            return () => {
                if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
                window.removeEventListener("wheel", handleWheel);
                track.removeEventListener("pointerdown", handlePointerDown);
                window.removeEventListener("pointermove", handlePointerMove);
                window.removeEventListener("pointerup", handlePointerUp);
                window.removeEventListener("pointercancel", handlePointerUp);

                gsap.set(track, { clearProps: "all" });
            };
        });

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <main className="min-h-screen flex flex-col lg:fixed lg:inset-0 lg:overflow-hidden">
            {/* Header / Nav Placeholder */}
            <div className="lg:absolute bottom-10 left-0 w-full px-5 flex flex-col lg:flex-row gap-5 lg:items-center justify-between mt-20 pointer-events-none z-10">
                <RevealText trigger="manual" delay={1.3} className="flex lg:hidden font-black text-[14vw] lg:text-[15vw] uppercase">Projects</RevealText>
                <h1 className="text-2xl">Clients - 2022/2025</h1>
                <RevealText trigger="manual" delay={1.3} className="hidden lg:flex text-2xl font-bold">(Scroll)</RevealText>
            </div>

            {/* Content Container */}
            <div className="flex-1 flex w-full lg:items-center lg:cursor-grab lg:active:cursor-grabbing overflow-visible lg:overflow-hidden pt-10 lg:pt-0">
                <div
                    ref={trackRef}
                    className="flex flex-col lg:flex-row gap-8 px-5 lg:px-8 items-center lg:items-center w-full lg:w-auto lg:will-change-transform"
                >
                    {allProjects.map((project, i) => (
                        <div
                            key={i}
                            className="w-full md:w-[45vw] lg:w-[30vw] shrink-0 pointer-events-auto"
                        >
                            <ProjectCard card={project} className="h-[400px] lg:h-[500px]" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex lg:hidden px-5">
                <Footer />
            </div>
        </main>
    );
}
