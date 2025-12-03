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
                        Passionate about merging design and engineering, I craft smooth,
                        interactive experiences with purpose. With a focus on motion,
                        performance, and detail, I help bring digital products to life for
                        forward-thinking brands around the world.
                    </WordFadeText>

                </div>
                <div className="aspect-[16/9] w-full lg:w-[600px]  rounded-4xl">
                    <VimeoPlayer
                        videoId="1140981207"
                        autoplay={true}
                        loop={true}
                        background={true}
                        muted={true}
                        controls={true}
                        title="Portfolio Showreel"
                        className="w-full h-full rounded-4xl"
                        wrapperClassName="aspect-[16/9] w-full lg:w-[600px]  rounded-4x"
                        onPlayerReady={(player) => {
                            player.play();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutLandingSection;