import "@/styles/globals.css";

import { ThemeProvider } from "@/contexts/ThemeProvider";


import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import ReactLenis from "lenis/react";
import CustomCursor from "@/components/ui/cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Ivanov",
  description: "AI Ivanov is a software engineer and entrepreneur. He is the founder of AI Ivanov and the CEO of AI Ivanov.",
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
        <ReactLenis root>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <CustomCursor/>
            {children}
          </ThemeProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
