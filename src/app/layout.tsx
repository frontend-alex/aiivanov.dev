import "@/styles/globals.css";
import { ViewTransitions } from "next-view-transitions";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


import { Navbar, Footer } from '@/components/index'
import { Cursor, Preloader } from '@/components/ui/index';
import ReactLenis from "lenis/react";

import ThemeProvider from "@/contexts/theme-provider";
import PreloaderProvider from "@/contexts/preloader-context";

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
          <PreloaderProvider>
            <ViewTransitions>
              <ReactLenis root>
                <Cursor />
                <Navbar />
                {children}
                <Footer />
              </ReactLenis>
            </ViewTransitions>
          </PreloaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
