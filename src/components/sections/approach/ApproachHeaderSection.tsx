import { RevealText } from "@/components/ui";

const ApproachHeaderSection = () => {
    return (
        <div

            className="min-h-screen header-contact-section border-b border-accent px-5 lg:px-10"
        >
            <div className="flex flex-col justify-evenly h-[calc(100vh-5rem)]">
                <RevealText trigger="manual" duration={1} delay={1.3} className="font-black text-[14vw] lg:text-[15vw] uppercase">Approach</RevealText>
                <div className="flex flex-col lg:flex-row gap-10 flex items-end justify-between">
                    <div className="flex flex-col gap-10">
                        <RevealText trigger="manual" duration={1} delay={1.8} className="text-2xl lg:text-3xl font-medium max-w-4xl">
                            My approach to web development is centered around creating innovative and engaging digital experiences.
                        </RevealText>
                        <RevealText trigger="manual" duration={1} delay={2.3} className="text-2xl lg:text-3xl font-light max-w-3xl text-stone-400">
                            I believe that the best way to create a successful web application is to start with a clear understanding of the user's needs and goals.
                        </RevealText>
                    </div>
                    <RevealText trigger="manual" duration={1} delay={2.5} className="text-2xl">(Scroll)</RevealText>
                </div>
            </div>
        </div>
    );
};

export default ApproachHeaderSection;
