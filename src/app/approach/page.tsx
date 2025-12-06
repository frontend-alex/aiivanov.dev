import { Footer } from "@/components";
import { ApproachHeaderSection, ApproachHorizontalScrollSection, ApproachStickySection } from "@/components/sections";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Approach",
    description: "Explore the portfolio of AI Ivanov, featuring a collection of innovative web applications, creative coding projects, and digital experiences.",
    openGraph: {
        title: "Approach | AI.",
        description: "Explore the portfolio of AI Ivanov, featuring a collection of innovative web applications, creative coding projects, and digital experiences.",
        url: "https://aiivanov.dev/approach",
    },
};

const page = () => {
    return (
        <div className="flex flex-col gap-20">
            <ApproachHeaderSection />
            <ApproachHorizontalScrollSection />
            <ApproachStickySection />
            <div className="px-5 lg:px-10">
                <Footer />
            </div>
        </div>
    );
}

export default page;
