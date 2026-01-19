"use client";

import {
    forwardRef,
    memo,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
} from "react";
import Player from "@vimeo/player";
import { useOnceInView } from "@/hooks/use-inview";

/* ----------------------------- types ----------------------------- */

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
    play: () => Promise<void> | undefined;
    pause: () => Promise<void> | undefined;
    setMuted: (muted: boolean) => Promise<boolean> | undefined;
    getMuted: () => Promise<boolean>;
    getPlaying: () => Promise<boolean>;
}
/* ---------------------------- component --------------------------- */

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

        const wrapperRef = useRef<HTMLDivElement>(null);
        const iframeRef = useRef<HTMLIFrameElement>(null);
        const playerRef = useRef<Player | null>(null);

        const inView = useOnceInView(wrapperRef);

        /* ----------------------- memoized src ------------------------ */

        const src = useMemo(() => {
            if (!videoId) return "";

            const params = new URLSearchParams({
                ...(background && { background: "1" }),
                ...(autoplay && { autoplay: "1" }),
                ...(loop && { loop: "1" }),
                ...(muted && { muted: "1" }),
                ...(controls === false && { controls: "0" }),
                dnt: "1",
            });

            return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
        }, [videoId, autoplay, loop, background, muted, controls]);

        /* --------------------- player creation ----------------------- */

        useEffect(() => {
            if (!iframeRef.current || playerRef.current || !inView) return;

            const player = new Player(iframeRef.current);
            playerRef.current = player;

            onPlayerReady?.(player);

            return () => {
                player.destroy();
                playerRef.current = null;
            };
        }, [inView, onPlayerReady]);

        /* -------------------- prop synchronization ------------------- */

        useEffect(() => {
            playerRef.current?.setMuted(muted);
        }, [muted]);

        useEffect(() => {
            playerRef.current?.setLoop(loop);
        }, [loop]);

        /* --------------------- imperative API ------------------------ */

        useImperativeHandle(ref, () => ({
            player: playerRef.current,

            play: () => playerRef.current?.play(),
            pause: () => playerRef.current?.pause(),
            setMuted: (m) => playerRef.current?.setMuted(m),

            getMuted: async () =>
                playerRef.current ? playerRef.current.getMuted() : true,

            getPlaying: async () =>
                playerRef.current
                    ? !(await playerRef.current.getPaused())
                    : false,
        }));

        /* --------------------- unavailable state --------------------- */

        if (!videoId) {
            return (
                <div ref={wrapperRef} className={wrapperClassName}>
                    <div className="w-full h-full rounded-md flex items-center bg-neutral-100 dark:bg-neutral-900 justify-center">
                        <h1 className="text-4xl font-black">Unavailable</h1>
                    </div>
                </div>
            );
        }

        /* ---------------------------- render -------------------------- */

        return (
            <div
                ref={wrapperRef}
                className={wrapperClassName}
                {...(onClick && { onClick })}
            >
                {inView && (
                    <iframe
                        ref={iframeRef}
                        src={src}
                        title={title}
                        loading={loading}
                        allow="autoplay; fullscreen"
                        className={className}
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                    />
                )}
            </div>
        );
    }
);

VimeoPlayer.displayName = "VimeoPlayer";

export default memo(VimeoPlayer);
