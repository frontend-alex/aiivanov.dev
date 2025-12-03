"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Player from "@vimeo/player";

export interface VimeoPlayerProps {
    videoId: string;
    autoplay?: boolean;
    loop?: boolean;
    background?: boolean;
    muted?: boolean;
    controls?: boolean;
    title?: string;
    className?: string;
    wrapperClassName?: string;
    onPlayerReady?: (player: Player) => void;
    onClick?: () => void;
    loading?: "lazy" | "eager";
}

export interface VimeoPlayerRef {
    player: Player | null;
    setMuted: (muted: boolean) => Promise<void>;
    play: () => Promise<void>;
    pause: () => Promise<void>;
    getMuted: () => Promise<boolean>;
    getPlaying: () => Promise<boolean>;
}

const VimeoPlayer = forwardRef<VimeoPlayerRef, VimeoPlayerProps>(
    (
        {
            videoId,
            autoplay = false,
            loop = false,
            background = false,
            muted = true,
            controls = true,
            title = "Video",
            className = "",
            wrapperClassName = "",
            onPlayerReady,
            onClick,
            loading = "lazy",
        },
        ref
    ) => {
        const iframeRef = useRef<HTMLIFrameElement>(null);
        const [player, setPlayer] = useState<Player | null>(null);

        // Build Vimeo URL with parameters
        const buildVimeoUrl = () => {
            const params = new URLSearchParams({
                ...(background && { background: "1" }),
                ...(autoplay && { autoplay: "1" }),
                ...(loop && { loop: "1" }),
                dnt: "1",
                app_id: "aiivanov",
            });

            return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
        };

        // Initialize Vimeo Player
        useEffect(() => {
            if (!iframeRef.current) return;

            const vimeoPlayer = new Player(iframeRef.current);
            vimeoPlayer.setMuted(muted);
            setPlayer(vimeoPlayer);

            if (onPlayerReady) {
                onPlayerReady(vimeoPlayer);
            }

            return () => {
                vimeoPlayer.destroy();
            };
        }, [videoId, muted, onPlayerReady]);

        // Expose player methods via ref
        useImperativeHandle(ref, () => ({
            player,
            setMuted: async (muted: boolean) => {
                if (player) {
                    await player.setMuted(muted);
                }
            },
            play: async () => {
                if (player) {
                    await player.play();
                }
            },
            pause: async () => {
                if (player) {
                    await player.pause();
                }
            },
            getMuted: async () => {
                if (player) {
                    return await player.getMuted();
                }
                return true;
            },
            getPlaying: async () => {
                if (player) {
                    const paused = await player.getPaused();
                    return !paused;
                }
                return false;
            },
        }));

        if (!videoId) {
            return (
                <div className={wrapperClassName} onClick={onClick}>
                    <div className="bg-stone-400 w-full h-full" />
                </div>
            );
        }

        return (
            <div className={wrapperClassName} onClick={onClick}>
                <iframe
                    ref={iframeRef}
                    src={buildVimeoUrl()}
                    allow="autoplay; fullscreen"
                    title={title}
                    loading={loading}
                    className={className}
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                    }}
                />
            </div>
        );
    }
);

VimeoPlayer.displayName = "VimeoPlayer";

export default VimeoPlayer;
