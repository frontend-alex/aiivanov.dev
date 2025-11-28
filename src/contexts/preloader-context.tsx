"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PreloaderContextType {
    isPreloaderComplete: boolean;
    setIsPreloaderComplete: (value: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(
    undefined
);

export default function PreloaderProvider({ children }: { children: ReactNode }) {
    const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

    return (
        <PreloaderContext.Provider
            value={{ isPreloaderComplete, setIsPreloaderComplete }}
        >
            {children}
        </PreloaderContext.Provider>
    );
}

export function usePreloader() {
    const context = useContext(PreloaderContext);
    if (context === undefined) {
        throw new Error("usePreloader must be used within a PreloaderProvider");
    }
    return context;
}
