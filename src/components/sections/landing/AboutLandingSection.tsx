"use client";

import { VimeoPlayer, WordFadeText } from "@/components/ui";

const AboutLandingSection = () => {
    return (
        <div

            className="h-full flex items-center flex-col gap-10 lg:justify-center lg:flex-row about-section"
        >
            <div className="h-full flex items-center flex-col gap-10 lg:justify-center lg:flex-row">
                <div className="flex flex-col justify-center gap-3">
                    <p className="uppercase">Myself</p>

                    <WordFadeText
                        tagName="h2"
                        className="text-2xl lg:text-5xl max-w-4xl leading-[1.1]"
                    >
                        Focused on the intersection of design and engineering, I craft seamless, interactive experiences built for purpose. With an emphasis on motion, performance, and detail, I help forward-thinking brands bring polished digital products to market.
                    </WordFadeText>

                </div>
                <VimeoPlayer
                    videoId=""
                    autoplay={true}
                    loop={true}
                    background={true}
                    muted={true}
                    controls={true}
                    title="Portfolio Showreel"
                    className="w-full h-full rounded-3xl"
                    wrapperClassName="aspect-[16/9] w-full lg:w-[600px] rounded-3xl"
                    onPlayerReady={(player) => {
                        player.play();
                    }}
                />
            </div>
        </div>
    );
};

export default AboutLandingSection;