"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Global GSAP cleanup component
 * Kills all ScrollTriggers and GSAP animations on route change
 * to prevent stale references and animation conflicts
 */
export default function GSAPCleanup() {
    const pathname = usePathname();

    useEffect(() => {
        // Register plugins
        gsap.registerPlugin(ScrollTrigger);

        // Cleanup function that runs on route change
        return () => {
            // Kill all ScrollTriggers
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

            // Kill all GSAP animations
            gsap.killTweensOf("*");

            // Refresh ScrollTrigger to recalculate positions
            ScrollTrigger.refresh();
        };
    }, [pathname]); // Re-run when pathname changes

    return null;
}
