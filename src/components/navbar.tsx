import TransitionLink from "./ui/text-animation/transition-link";
import MobileMenu from "./mobile-menu";
import HoverSlideText from "@/components/ui/text-animation/hover-slide-text";
import HoverSlideButton from "@/components/ui/button";
import Link from "next/link";

const AppLogo = ({ className }: { className?: string }) => {
    return <TransitionLink href={'/'} className={`${className} navbar-logo opacity-0`}>AI.</TransitionLink>
}

const Navbar = () => {
    return (
        <nav className="fixed top-5 w-full px-10 flex items-center justify-between text-lg z-50 md:mix-blend-difference md:text-white">
            <div className="flex items-center gap-10 ">
                <AppLogo className="text-2xl font-bold" />
                <div className="flex flex-col hidden md:flex">
                    <p>Netherlands Based</p>
                    <p className="text-inverted-stone">Working globally</p>
                </div>
            </div>
            <div className="flex items-center gap-30 hidden md:flex">
                <div className="flex flex-col">
                    <p>Building at</p>
                    <HoverSlideText href={'/'} className="cursor-special text-inverted-stone">@OutSource</HoverSlideText>
                </div>
                <div className="flex flex-col">
                    <p>Position</p>
                    <HoverSlideText className="text-inverted-stone">
                        Fullstack Developer
                    </HoverSlideText>
                </div>
            </div>

            <HoverSlideButton mixBlend={true} href="mailto:alex@aiivanov.dev" className="hidden md:flex">Get in touch</HoverSlideButton>

            <MobileMenu />
        </nav>
    )
}

export default Navbar