import RevealText from "@/components/ui/reveal-text";

const ProjectsSection = () => {
    return (
        <section className="min-h-screen flex flex-col gap-5 mt-52 project-section">
            <div className="flex items-center justify-between">
                <RevealText tagName="h1" duration={1} delay={0.2} className="font-black text-4xl lg:text-9xl uppercase">Work</RevealText>
                <RevealText tagName="h1" duration={1} delay={0.5} className="font-black text-4xl lg:text-9xl">'25</RevealText>
            </div>
            <div className="flex flex-col lg:flex-row gap-1 items-center">
                <div className="p-5 rounded-xl bg-black dark:bg-white w-full">

                </div>
                <div className="p-5 rounded-xl bg-black dark:bg-white w-full">

                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;