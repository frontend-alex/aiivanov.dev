"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CopyToClipboardProps {
    value: string;
    children?: React.ReactNode;
}

export default function CopyToClipboard({
    value,
    children,
}: CopyToClipboardProps) {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const copyText = async (text: string) => {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }

        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            document.execCommand("copy");
        } finally {
            document.body.removeChild(textarea);
        }
    };

    const handleCopy = async () => {
        try {
            await copyText(value);
            setCopied(true);

            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = window.setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={handleCopy}
                className="cursor-pointer select-none"
                aria-label="Copy to clipboard"
            >
                {children ?? value}
            </button>

            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.95 }}
                        transition={{
                            duration: 0.2,
                            ease: "easeOut",
                        }}
                        className="absolute top-full text-center left-1/2 -translate-x-1/2 mt-2 p-8 text-3xl rounded-md bg-muted whitespace-nowrap pointer-events-none"
                    >
                        Copied!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
