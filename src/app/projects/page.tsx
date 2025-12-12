"use client";

import { useEffect, useRef } from "react";
import { projectsData } from "@/constants/data";
import ProjectCard from "@/components/cards/project-card";
import { RevealText } from "@/components/ui";
import { Footer } from "@/components";

export default function ProjectsPage() {
    const trackRef = useRef<HTMLDivElement>(null);

    // Physics
    const xRef = useRef(0);
    const velocityRef = useRef(0);
    const isDraggingRef = useRef(false);
    const lastXRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const widthRef = useRef(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const items = Array.from(track.children) as HTMLElement[];
        if (!items.length) return;

        const itemWidth = items[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).gap || "32");
        widthRef.current = (itemWidth + gap) * items.length;

        const applyTransform = () => {
            const w = widthRef.current;
            if (!w) return;

            const wrapped =
                ((xRef.current % w) + w) % w;

            track.style.transform = `translate3d(${-wrapped}px, 0, 0)`;
        };

        const stopRAF = () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };

        const startRAF = () => {
            if (rafRef.current) return;

            const loop = () => {
                velocityRef.current *= 0.92;
                xRef.current += velocityRef.current;
                applyTransform();

                if (Math.abs(velocityRef.current) > 0.1) {
                    rafRef.current = requestAnimationFrame(loop);
                } else {
                    stopRAF();
                }
            };

            rafRef.current = requestAnimationFrame(loop);
        };

        const onPointerDown = (e: PointerEvent) => {
            isDraggingRef.current = true;
            lastXRef.current = e.clientX;
            track.setPointerCapture(e.pointerId);
            track.style.cursor = "grabbing";
            stopRAF();
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!isDraggingRef.current) return;
            const dx = lastXRef.current - e.clientX;
            lastXRef.current = e.clientX;
            xRef.current += dx;
            velocityRef.current = dx;
            applyTransform();
        };

        const onPointerUp = (e: PointerEvent) => {
            isDraggingRef.current = false;
            track.releasePointerCapture(e.pointerId);
            track.style.cursor = "grab";
            startRAF();
        };

        const onWheel = (e: WheelEvent) => {
            velocityRef.current += e.deltaY * 0.15;
            startRAF();
        };

        track.addEventListener("pointerdown", onPointerDown);
        track.addEventListener("pointermove", onPointerMove);
        track.addEventListener("pointerup", onPointerUp);
        track.addEventListener("pointercancel", onPointerUp);
        track.addEventListener("wheel", onWheel, { passive: true });

        return () => {
            stopRAF();
            isDraggingRef.current = false;

            track.removeEventListener("pointerdown", onPointerDown);
            track.removeEventListener("pointermove", onPointerMove);
            track.removeEventListener("pointerup", onPointerUp);
            track.removeEventListener("pointercancel", onPointerUp);
            track.removeEventListener("wheel", onWheel);

            track.style.transform = "";
        };
    }, []);

    return (
        <main className="flex flex-col lg:fixed lg:inset-0 lg:overflow-hidden">
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
            <div className="flex-1 flex w-full lg:items-center overflow-hidden pt-10 lg:pt-0">
                <div
                    ref={trackRef}
                    className="flex flex-col lg:flex-row gap-8 px-5 lg:px-8 items-center w-full lg:w-auto cursor-grab will-change-transform"
                >
                    {projectsData.map((project, i) => (
                        <div
                            key={i}
                            className="w-full md:w-[45vw] lg:w-[30vw] shrink-0"
                        >
                            <ProjectCard
                                card={project}
                                className="h-[400px] lg:h-[500px]"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex lg:hidden">
                <Footer />
            </div>
        </main>
    );
}
