import { VimeoPlayer } from "@/components/ui";
import {
    ScrollVelocityContainer,
    ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity"



const ApproachHorizontalScrollSection = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center overflow-hidden py-8">
            <ScrollVelocityContainer className="w-full">
                <ScrollVelocityRow baseVelocity={1} direction={1} className="py-4">
                    {Array.from({ length: 10 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="mx-4 inline-block w-[400px] h-[400px] lg:w-[700px] lg:h-[700px] rounded-lg overflow-hidden pointer-events-auto"
                        >
                            <VimeoPlayer
                                videoId=""
                                autoplay={false}
                                loop={true}
                                muted={true}
                                controls={false}
                                className="w-full h-full object-cover pointer-events-none"
                                wrapperClassName="w-full h-full"
                            />
                        </div>
                    ))}
                </ScrollVelocityRow>
            </ScrollVelocityContainer>
        </div>
    )
}

export default ApproachHorizontalScrollSection;

