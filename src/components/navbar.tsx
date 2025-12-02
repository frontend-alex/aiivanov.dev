import { footerLinks } from "@/constants/data";

import MobileMenu from "./mobile-menu";
import HoverSlideButton from "@/components/ui/button";
import TransitionLink from "./ui/text-animation/transition-link";
import HoverSlideText from "@/components/ui/text-animation/hover-slide-text";

export const AppLogo = ({ className }: { className?: string }) => {
    return (
        <TransitionLink
            href="/"
            className={`
                ${className}
                navbar-logo opacity-0
                relative inline-block
                logo-hover
            `}
        >
            AI.
        </TransitionLink>
    );
};
const Navbar = () => {
    return (
        <nav className="fixed top-5 w-full px-10 flex items-center justify-between text-lg z-50 md:mix-blend-difference md:text-white">
            <div className="flex items-center gap-10 ">
                <AppLogo className="text-2xl font-bold" />
                <div className="flex flex-col hidden md:flex text-xl">
                    <p>Netherlands Based</p>
                    <p className="text-inverted-stone">Working globally</p>
                </div>
            </div>
            <div className="flex items-center gap-30 hidden md:flex">
                {/* <div className="flex flex-col text-xl">
                    <p>Building at</p>
                    <HoverSlideText href={'/'} className="cursor-special text-inverted-stone">@OutSource</HoverSlideText>
                </div> */}
                <ul className="flex  items-center gap-3">
                    {footerLinks.slice(0, 1).map((link) => (
                        link.links.map((subLink, subIdx) => (
                            <li key={subIdx}>
                                <HoverSlideText href={subLink.href} className="text-2xl cursor-target">{subLink.name}</HoverSlideText>
                            </li>
                        ))
                    ))}
                </ul>
            </div>

            <HoverSlideButton mixBlend={true} href="mailto:alex@aiivanov.dev" className="hidden md:flex">Get in touch</HoverSlideButton>

            <MobileMenu />
        </nav>
    )
}

export default Navbar