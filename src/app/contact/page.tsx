import { Footer } from "@/components/index";
import { ContactHeaderSection, ContactSection, ProjectsSection } from "@/components/sections/index";

const page = () => {
    return (
        <div className="px-5 lg:px-10 flex flex-col gap-10">
            <ContactHeaderSection />
            <ContactSection />
            <ProjectsSection triggerElement=".footer" />
            <Footer />
        </div>
    );
}

export default page;
