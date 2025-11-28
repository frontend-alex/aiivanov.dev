import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import ReactLenis from "lenis/react";
import Navbar from "@/components/navbar";
import ThemeProvider from "@/contexts/theme-provider";

import CustomCursor from "@/components/ui/cursor";
import Preloader from "@/components/ui/preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI",
  description: "AI Ivanov is a software engineer and entrepreneur. He is the founder of AI Ivanov and the CEO of AI Ivanov.",
  icons: {
    icon: "/images/icon.png",
    shortcut: "/images/icon.png",
    apple: "/images/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ReactLenis root>
            <CustomCursor />
            <Preloader />
            <Navbar />
            {children}
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  );
}
