import { RevealText } from "@/components/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Approach",
    description: "Explore the portfolio of AI Ivanov, featuring a collection of innovative web applications, creative coding projects, and digital experiences.",
    openGraph: {
        title: "Approach | AI Ivanov",
        description: "Explore the portfolio of AI Ivanov, featuring a collection of innovative web applications, creative coding projects, and digital experiences.",
        url: "https://aiivanov.dev/approach",
    },
};

const page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <RevealText trigger="manual" duration={1} delay={1.3} className="font-black  uppercase text-[9vw]">Approach Page</RevealText>
        </div>
    );
}

export default page;
