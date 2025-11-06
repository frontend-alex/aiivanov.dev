"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Line } from "@/components/ui/line";

const NavbarLogo = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"}>
      <h1 className={cn("text-3xl font-bold", className)}>AI.</h1>
    </Link>
  );
};

const Navbar = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const tl = useRef<GSAPTimeline>(null);

  const toggleMenu = () => setIsMenuOpened((prev) => !prev);

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Projects",
      href: "/projects",
    },
  ];

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 75 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isMenuOpened) {
      tl.current?.play();
      document.body.style.overflow = 'hidden';
    } else {
      tl.current?.reverse();
      document.body.style.overflow = '';
    }
  }, [isMenuOpened]);

  return (
    <nav className="menu-container" ref={container}>
      <div className="menu-bar">
        <div className="menu-logo">
          <NavbarLogo className="text-black dark:text-white"/>
        </div>
        <div className="flex flex-col gap-3 items-center" data-cursor="pointer" onClick={toggleMenu}>
          <div className="dark:bg-white bg-black w-[20px] h-[2px]"/>
          <div className="dark:bg-white bg-black w-[45px] h-[2px]"/>
          <div className="dark:bg-white bg-black w-[20px] h-[2px]"/>
        </div>
      </div>
      <div className="menu-overlay">
        <div className="flex justify-between items-center border-b border-black dark:border-accent p-4">
          <NavbarLogo className="text-black" />
          <div className="mr-3 text-black" data-cursor="pointer" onClick={toggleMenu}>
            <p className="text-3xl">&#x2715;</p>
          </div>
        </div>

        <Line className="h-full fixed top-0 right-20 bg-black" direction="vertical" />
        <Line className="h-full fixed top-0 left-20 bg-black" direction="vertical" />

        <div className="flex flex-col gap-10 max-w-[90em] mx-auto p-5 lg:pt-20">
          <div className="menu-links">
            {navLinks.map((link, index) => (
              <div className="menu-link-item" key={index}>
                <div className="menu-link-item-holder">
                  <Link href={link.href} className="menu-link">
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
