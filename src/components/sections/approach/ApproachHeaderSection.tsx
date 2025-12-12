import { RevealText } from "@/components/ui";

const ApproachHeaderSection = () => {
    return (
        <div
            className="min-h-screen border-b border-accent"
        >
            <div className="flex flex-col justify-evenly h-[calc(100vh-5rem)]">
                <RevealText
                    trigger="manual"
                    delay={1.3}
                    className="font-black text-[14vw] lg:text-[15vw] uppercase"
                >
                    Approach
                </RevealText>

                <div className="flex flex-col lg:flex-row gap-10 items-end justify-between">
                    <div className="flex flex-col gap-10">

                        {/* NEW: Aligned with your design-engineering positioning */}
                        <RevealText
                            trigger="manual"
                            delay={1.8}
                            className="text-2xl lg:text-3xl font-medium max-w-4xl"
                        >
                            My approach blends design clarity with engineering precision to shape digital experiences that perform, engage, and scale.
                        </RevealText>

                        {/* NEW: Purpose-driven + user-centered without the generic phrasing */}
                        <RevealText
                            trigger="manual"
                            delay={2.3}
                            className="text-2xl lg:text-3xl font-light max-w-3xl text-stone-400"
                        >
                            Every project begins with a grounded understanding of user needs and evolves through intentional motion, detail, and performance-focused development all geared toward building a better web, one line at a time.
                        </RevealText>
                    </div>

                    <RevealText
                        trigger="manual"
                        delay={2.5}
                        className="text-2xl"
                    >
                        (Scroll)
                    </RevealText>
                </div>
            </div>
        </div>
    );
};

export default ApproachHeaderSection;
