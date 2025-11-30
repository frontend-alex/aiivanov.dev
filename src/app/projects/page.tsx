import { RevealText } from "@/components/ui";

const page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <RevealText trigger="manual" duration={1} delay={1.3} className="font-black  uppercase text-[9vw]">Projects Page</RevealText>
        </div>
    );
}

export default page;
