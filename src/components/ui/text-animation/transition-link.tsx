"use client";

import { useTransitionRouter } from "next-view-transitions";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { slideInOut } from "@/lib/transition-utils";

interface TransitionLinkProps extends LinkProps {
    children: ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function TransitionLink({
    children,
    href,
    onClick,
    ...props
}: TransitionLinkProps) {
    const router = useTransitionRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            onClick(e);
        }

        // If it's a simple navigation to a string href, we can hijack it.
        // If it's an object or external, we might want to fall back to default behavior
        // but for this specific task, we assume internal string navigation mostly.
        if (typeof href === 'string' && href.startsWith('/')) {
            e.preventDefault();
            router.push(href, {
                onTransitionReady: () => {
                    slideInOut();
                    // Scroll to top after transition starts
                    setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'instant' });
                    }, 0);
                },
            });
        }
    };

    return (
        <Link href={href} onClick={handleClick} {...props}>
            {children}
        </Link>
    );
}


