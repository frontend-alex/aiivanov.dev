import { RevealText } from "@/components/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore the portfolio of AI Ivanov, featuring a collection of innovative web applications, creative coding projects, and digital experiences.",
    openGraph: {
        title: "Projects | AI Ivanov",
        description: "Explore the portfolio of AI Ivanov, featuring a collection of innovative web applications, creative coding projects, and digital experiences.",
        url: "https://aiivanov.dev/projects",
    },
};

const page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <RevealText trigger="manual" duration={1} delay={1.3} className="font-black  uppercase text-[9vw]">Projects Page</RevealText>
        </div>
    );
}

export default page;
