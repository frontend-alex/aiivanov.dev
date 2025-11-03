import gsap from "gsap";

import { Line } from "../ui/line";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useTheme } from "next-themes";
import { useRef } from "react";

const SectionText = () => {
  const { theme } = useTheme();
  const doodleRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const firstMsgSplit = SplitText.create(".first-message", {
      type: "words",
    });
    const secMsgSplit = SplitText.create(".second-message", {
      type: "words",
    });
    const paragraphSplit = SplitText.create(".message-content p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    gsap.to(firstMsgSplit.words, {
      color: theme !== "dark" ? "#000" : "#fff",
      ease: "power1.in",
      stagger: 1,
      scrollTrigger: {
        trigger: ".message-content",
        start: "top center",
        end: "30% center",
        scrub: true,
      },
    });
    gsap.to(secMsgSplit.words, {
      color: theme !== "dark" ? "#000" : "#fff",
      ease: "power1.in",
      stagger: 1,
      scrollTrigger: {
        trigger: ".second-message",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".msg-text-scroll",
        start: "top 60%",
      },
    });
    revealTl.to(".msg-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "circ.inOut",
    });

    const paragraphTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".message-content p",
        start: "top center",
      },
    });
    paragraphTl.from(paragraphSplit.words, {
      yPercent: 300,
      rotate: 3,
      ease: "power1.inOut",
      duration: 1,
      stagger: 0.01,
    });

    // Animate doodle drawing effect with scroll
    if (doodleRef.current && sectionRef.current) {
      const path = doodleRef.current.querySelector("path");
      
      if (path) {
        const length = path.getTotalLength();
        
        // Set initial state - line is not drawn
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        
        // Animate the line drawing as user scrolls
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
            markers: false,
          },
        });
      }
    }
  });

  return (
    <section ref={sectionRef} className="message-content -mt-[200px] relative">
      {/* Animated Doodle SVG */}
      <svg
        ref={doodleRef}
        className="absolute lg:-rotate-12 left-0 top-[70%] -translate-y-1/2 pointer-events-none z-0 opacity-40 w-full h-[200px]"
        viewBox="0 0 1920 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M 0 100 
             C 100 60, 150 60, 180 100 
             C 200 130, 200 170, 180 180 
             C 160 190, 140 170, 140 140 
             C 140 110, 160 90, 200 100
             
             L 250 100
             C 300 100, 320 60, 360 80
             C 400 100, 420 150, 460 130
             C 480 120, 500 80, 540 90
             
             C 560 95, 580 120, 600 130
             C 640 150, 680 150, 700 120
             C 720 90, 720 50, 700 40
             C 680 30, 660 50, 660 80
             C 660 110, 680 130, 720 120
             
             L 760 110
             C 800 100, 840 60, 900 80
             C 920 85, 940 110, 960 120
             C 990 135, 1020 140, 1040 120
             
             C 1070 90, 1100 50, 1140 70
             C 1180 90, 1200 130, 1240 130
             C 1280 130, 1300 90, 1320 80
             C 1360 60, 1380 90, 1380 120
             C 1380 150, 1360 170, 1320 160
             C 1280 150, 1260 120, 1280 100
             
             L 1340 90
             C 1400 80, 1460 60, 1520 90
             C 1560 110, 1600 140, 1660 130
             C 1720 120, 1760 80, 1800 90
             C 1840 100, 1880 120, 1920 110"
          stroke="var(--primary-red)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="container mx-auto flex-center py-28 relative z-10">
        <div className="w-full h-full">
          <div className="msg-wrapper">
            <h1 className="first-message">SDa ti eba maikata blq blq blq</h1>
            <div className="msg-text-scroll">
              <div className="bg-primary-red px-20">
                <h2 className="font-italiana">Fuel Up</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Line direction="horizontal" className="flex absolute top-[70%] lg:top-[80%]" />
    </section>
  );
};

export default SectionText;
