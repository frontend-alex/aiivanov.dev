import "@/styles/globals.css";
import { ViewTransitions } from "next-view-transitions";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


import { Navbar } from '@/components/index'
import { Cursor } from '@/components/ui/index';

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
  metadataBase: new URL("https://aiivanov.dev"),
  title: {
    default: "AI.",
    template: "%s | AI.",
  },
  description:
    "AI is a Creative Software Engineer specializing in building immersive digital experiences, high-performance web applications, and interactive user interfaces.",
  keywords: [
    "Software Engineer",
    "Creative Developer",
    "Web Developer",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "AI",
    "Portfolio",
    "Creative Coding",
    "Interactive Web Design",
    "Backend Developer",
    "Fullstack Developer",
    "AI",
    "Aleksandar Ivanov"
  ],
  authors: [{ name: "AI", url: "https://aiivanov.dev" }],
  creator: "AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aiivanov.dev",
    title: "AI | Creative Software Engineer",
    description:
      "AI is a Creative Software Engineer specializing in building immersive digital experiences, high-performance web applications, and interactive user interfaces.",
    siteName: "AI",
    images: [
      {
        url: "/images/og-image.png", // Assuming an OG image exists or will be added
        width: 1200,
        height: 630,
        alt: "AI Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI | Creative Software Engineer",
    description:
      "AI is a Creative Software Engineer specializing in building immersive digital experiences, high-performance web applications, and interactive user interfaces.",
    creator: "@aiivanov", // Placeholder, update if known
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/images/icon.png",
    shortcut: "/images/icon.png",
    apple: "/images/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aiivanov.dev",
  },
};

import JsonLd from "@/components/seo/json-ld";

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
        <JsonLd />
        <ThemeProvider>
          <PreloaderProvider>
            <ViewTransitions>
              <ReactLenis root>
                <Cursor />
                <Navbar />
                {children}
              </ReactLenis>
            </ViewTransitions>
          </PreloaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
