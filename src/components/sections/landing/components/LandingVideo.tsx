"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VimeoPlayer, { VimeoPlayerRef } from "@/components/ui/VimeoPlayer";

const LandingVideo = () => {
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoTitleRef = useRef<HTMLDivElement>(null);
    const vimeoPlayerRef = useRef<VimeoPlayerRef>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = async () => {
        if (!vimeoPlayerRef.current) return;
        const newMutedState = !isMuted;
        await vimeoPlayerRef.current.setMuted(newMutedState);
        setIsMuted(newMutedState);
    };

    useEffect(() => {
        if (typeof window === "undefined" || window.innerWidth < 900) return;

        gsap.registerPlugin(ScrollTrigger);
        const videoContainer = videoContainerRef.current;
        const videoTitleElements = videoTitleRef.current?.querySelectorAll("p");
        if (!videoContainer || !videoTitleElements) return;

        const breakpoints = [
            { maxWidth: 1000, translateY: -135, movMultiplier: 450 },
            { maxWidth: 1100, translateY: -130, movMultiplier: 500 },
            { maxWidth: 1200, translateY: -125, movMultiplier: 550 },
            { maxWidth: 1300, translateY: -120, movMultiplier: 600 },
        ];

        const getInitialValues = () => {
            const width = window.innerWidth;
            for (const bp of breakpoints) {
                if (width <= bp.maxWidth) {
                    return {
                        translateY: bp.translateY,
                        movementMultiplier: bp.movMultiplier,
                    };
                }
            }
            return { translateY: -105, movementMultiplier: 650 };
        };

        const initialValues = getInitialValues();
        const animationState = {
            scrollProgress: 0,
            initialTranslateY: initialValues.translateY,
            currentTranslateY: initialValues.translateY,
            movementMultiplier: initialValues.movementMultiplier,
            scale: 0.25,
            fontSize: 80,
            gap: 2,
            targetMouseX: 0,
            currentMouseX: 0,
        };

        const handleResize = () => {
            const newValues = getInitialValues();
            animationState.initialTranslateY = newValues.translateY;
            animationState.movementMultiplier = newValues.movementMultiplier;
            if (animationState.scrollProgress === 0) {
                animationState.currentTranslateY = newValues.translateY;
            }
        };

        window.addEventListener("resize", handleResize);

        const trigger = ScrollTrigger.create({
            trigger: ".header-intro",
            start: "top bottom",
            end: "top 10%",
            scrub: true,
            onUpdate: (self) => {
                animationState.scrollProgress = self.progress;
                animationState.currentTranslateY = gsap.utils.interpolate(
                    animationState.initialTranslateY,
                    0,
                    animationState.scrollProgress
                );
                animationState.scale = gsap.utils.interpolate(
                    0.25,
                    0.90,
                    animationState.scrollProgress
                );
                animationState.gap = gsap.utils.interpolate(
                    2,
                    1,
                    animationState.scrollProgress
                );

                if (animationState.scrollProgress <= 0.4) {
                    const p = animationState.scrollProgress / 0.4;
                    animationState.fontSize = gsap.utils.interpolate(80, 40, p);
                } else {
                    const p = (animationState.scrollProgress - 0.4) / 0.6;
                    animationState.fontSize = gsap.utils.interpolate(40, 20, p);
                }
            },
        });

        const handleMouseMove = (e: MouseEvent) => {
            animationState.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        };

        document.addEventListener("mousemove", handleMouseMove);

        let animationFrameId: number;
        const animate = () => {
            if (window.innerWidth < 900) return;

            const {
                scale,
                targetMouseX,
                currentMouseX,
                currentTranslateY,
                fontSize,
                gap,
                movementMultiplier,
            } = animationState;

            const scaledMovementMultiplier = (1 - scale) * movementMultiplier;
            const maxHorizontalMovement =
                scale < 0.95 ? targetMouseX * scaledMovementMultiplier : 0;

            animationState.currentMouseX = gsap.utils.interpolate(
                currentMouseX,
                maxHorizontalMovement,
                0.05
            );

            if (videoContainer) {
                videoContainer.style.transform = `translateY(${currentTranslateY}%) translateX(${animationState.currentMouseX}px) scale(${scale})`;
                videoContainer.style.gap = `${gap}em`;
            }

            videoTitleElements.forEach((element) => {
                (element as HTMLElement).style.fontSize = `${fontSize}px`;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousemove", handleMouseMove);
            trigger.kill();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="header-section header-intro">
            <div
                className="header-video-container-desktop"
                ref={videoContainerRef}
                onClick={toggleMute}
            >
                <div
                    className="header-video-preview"
                    style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
                >
                    <VimeoPlayer
                        ref={vimeoPlayerRef}
                        videoId="1140981207"
                        autoplay
                        loop
                        background
                        muted
                        wrapperClassName="header-video-wrapper"
                        title="Portfolio Showreel"
                        loading="eager"
                    />
                </div>

                <div className="header-video-title" ref={videoTitleRef}>
                    <p></p>
                    <p></p>
                </div>
            </div>

            <div className="header-video-container-mobile" onClick={toggleMute}>
                <div
                    className="header-video-preview"
                    style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
                >
                    <div className="header-video-wrapper">
                        <VimeoPlayer
                            videoId="1140981207"
                            autoplay
                            loop
                            background
                            muted
                            title="Portfolio Showreel"
                            loading="eager"
                        />
                    </div>
                </div>

                <div className="header-video-title">
                    <p></p>
                    <p></p>
                </div>
            </div>
        </div>
    );
};

export default LandingVideo;
