import { Footer } from "@/components/index";
import { ContactContactSection, ContactHeaderContactSection, ProjectsLandingSection } from "@/components/sections/index";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Explore the portfolio of AI Ivanov, featuring a collection of innovative web applications, creative coding projects, and digital experiences.",
    openGraph: {
        title: "Contact | AI.",
        description: "Explore the portfolio of AI Ivanov, featuring a collection of innovative web applications, creative coding projects, and digital experiences.",
        url: "https://aiivanov.dev/contact",
    },
};

const page = () => {
    return (
        <div className="flex flex-col gap-20 lg:gap-52">
            <div className="px-5 lg:px-10 flex flex-col gap-20">
                <ContactHeaderContactSection />
                <ContactContactSection />
                <ProjectsLandingSection />
            </div>
            <Footer />
        </div>
    );
}

export default page;
