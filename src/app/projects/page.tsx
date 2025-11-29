import { RevealText } from "@/components/ui";

const page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <RevealText trigger="manual" duration={1} delay={1.3} className="font-black text-[9vw]">Projects Page</RevealText>
        </div>
    );
}

export default page;
