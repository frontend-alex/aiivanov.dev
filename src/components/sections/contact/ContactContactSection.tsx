'use client'

import CopyToClipboard from "@/components/copy";
import { RevealText } from "@/components/ui";

const ContactContactSection = () => {
    return (
        <div

            className="min-h-[40dvh] flex flex-col lg:flex-row gap-10 contact-section border-b border-accent"
        >
            <div className="flex flex-col gap-10 lg:w-[33%]">
                <RevealText delay={0.4} className="text-2xl font-medium">(New Businesses)</RevealText>
            </div>
            <div className="flex flex-col">
                <RevealText delay={0.6} className="text-4xl lg:text-7xl">Aleksandar Ivanov</RevealText>
                <CopyToClipboard value="hello@aiivanov.dev">
                    <RevealText delay={0.8} className="text-4xl lg:text-7xl text-underline">hello@aiivanov.dev</RevealText>
                </CopyToClipboard>
            </div>
        </div>
    );
};

export default ContactContactSection;
