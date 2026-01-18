"use client";

import { useRef, useMemo, useEffect } from "react";
import { projectsData } from "@/constants/data";
import ProjectCard from "@/components/cards/project-card";
import { RevealText } from "@/components/ui";
import { Footer } from "@/components";
import {
    motion,
    useMotionValue,
    useAnimationFrame,
    useTransform
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// Linear Interpolation
const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
};

export default function ProjectsPage() {
    const baseX = useMotionValue(0);
    const targetX = useRef(0); // The target position we want to reach
    const isDragging = useRef(false);

    // Dynamic duplication logic
    const duplicatedProjects = useMemo(() => {
        let items = [...projectsData];
        while (items.length < 6) {
            items = [...items, ...projectsData];
        }
        if (items.length === projectsData.length) {
            items = [...items, ...projectsData];
        }
        return items;
    }, []);

    // Lerp Physics Loop
    useAnimationFrame((t, delta) => {
        const current = baseX.get();
        const target = targetX.current;

        // Lerp towards target
        // Factor 0.08 gives a nice heavy smooth feel similar to Lenis defaults
        const diff = target - current;

        // If close enough, snap to integer to avoid sub-pixel jitter if needed, 
        // but for smooth scroll typically we just let it settle.
        if (Math.abs(diff) < 0.01) {
            baseX.set(target);
        } else {
            // Using a fixed factor is simple lerp. 
            // Adjustable based on delta if we want frame-independence but 0.08 is standard for ~60fps
            baseX.set(lerp(current, target, 0.08));
        }
    });

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onWheel = (e: WheelEvent) => {
            // Adjust sensitivity
            targetX.current -= e.deltaY;
        };

        container.addEventListener("wheel", onWheel, { passive: true });
        return () => container.removeEventListener("wheel", onWheel);
    }, []);

    // Drag handlers
    const lastClientX = useRef(0);
    const onPointerDown = (e: React.PointerEvent) => {
        isDragging.current = true;
        lastClientX.current = e.clientX;

        // Sync target on grab to prevent jumping
        targetX.current = baseX.get();

        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        document.body.style.cursor = "grabbing";
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current) return;
        const delta = e.clientX - lastClientX.current;
        lastClientX.current = e.clientX;

        // Direct manipulation feels best when specific:
        // We move the target immediately.
        // Factor > 1 makes it feel "light" / responsive.
        targetX.current += delta * 1.5;
    };

    const onPointerUp = (e: React.PointerEvent) => {
        isDragging.current = false;
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        document.body.style.cursor = "";
    };

    const x = useTransform(baseX, (v) => `${wrap(0, -50, (v * 0.05))}%`); // Scale input

    return (
        <main
            ref={containerRef}
            className="flex flex-col lg:fixed lg:inset-0 lg:overflow-hidden touch-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
        >
            {/* Header */}
            <div className="lg:absolute bottom-10 left-0 w-full px-5 flex flex-col lg:flex-row gap-5 lg:items-center justify-between mt-20 pointer-events-none z-10">
                <RevealText
                    trigger="manual"
                    delay={1.3}
                    className="flex lg:hidden font-black text-[14vw] uppercase"
                >
                    Projects
                </RevealText>
                <h1 className="text-2xl">Clients – 2022/2025</h1>
                <RevealText
                    trigger="manual"
                    delay={1.3}
                    className="hidden lg:flex text-2xl font-medium"
                >
                    (Scroll)
                </RevealText>
            </div>

            {/* Track */}
            <div className="flex-1 flex w-full lg:items-center overflow-hidden pt-10 lg:pt-0 pointer-events-none">
                <motion.div
                    className="flex gap-8 px-5 lg:px-4 pointer-events-auto"
                    style={{ x }}
                >
                    {/* Copy 1 */}
                    <div className="flex gap-8 shrink-0 items-center">
                        {duplicatedProjects.map((project, i) => (
                            <div key={`a-${i}`} className="w-full md:w-[45vw] lg:w-[30vw] shrink-0">
                                <ProjectCard card={project} className="h-[400px] lg:h-[500px]" />
                            </div>
                        ))}
                    </div>

                    {/* Copy 2 */}
                    <div className="flex gap-8 shrink-0 items-center">
                        {duplicatedProjects.map((project, i) => (
                            <div key={`b-${i}`} className="w-full md:w-[45vw] lg:w-[30vw] shrink-0">
                                <ProjectCard card={project} className="h-[400px] lg:h-[500px]" />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="flex lg:hidden">
                <Footer />
            </div>
        </main>
    );
}
