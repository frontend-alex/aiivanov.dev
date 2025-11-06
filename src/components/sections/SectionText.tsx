import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { Line } from "../ui/line";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useTheme } from "next-themes";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SectionText = () => {
  const { theme } = useTheme();
  const doodleRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const SCROLL_SPEED_PER_WORD = 30; 

  useGSAP(() => {
    if (!sectionRef.current) return;

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

    // Set initial state - text is transparent/low opacity
    const targetColor = theme !== "dark" ? "#000" : "#fff";
    const initialColor = theme !== "dark" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";
    
    gsap.set(firstMsgSplit.words, { color: initialColor });
    if (secMsgSplit.words) {
      gsap.set(secMsgSplit.words, { color: initialColor });
    }

    // Animate first message - lights up word by word as you scroll
    const firstMsgWords = firstMsgSplit.words as HTMLElement[];
    const wordCount = firstMsgWords.length;
    const scrollDistance = wordCount * SCROLL_SPEED_PER_WORD;
    
    gsap.to(firstMsgWords, {
      color: targetColor,
      ease: "none",
      stagger: {
        each: 0.1,
        from: "start",
      },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: `+=${scrollDistance}`, // Scroll distance for all words to light up
        scrub: 1,
      },
    });

    // Animate second message if it exists - word by word
    if (secMsgSplit.words && secMsgSplit.words.length > 0) {
      const secMsgWords = secMsgSplit.words as HTMLElement[];
      const secWordCount = secMsgWords.length;
      const secScrollDistance = secWordCount * SCROLL_SPEED_PER_WORD;
      
      gsap.to(secMsgWords, {
        color: targetColor,
        ease: "none",
        stagger: {
          each: 0.1,
          from: "start",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: `+=${secScrollDistance}`, // Scroll distance for all words to light up
          scrub: 1,
        },
      });
    }

    // Reveal scroll text with scroll
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".msg-text-scroll",
        start: "top 60%",
        end: "top 40%",
        scrub: 1,
      },
    });
    revealTl.to(".msg-text-scroll", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "none",
    });

    // Paragraph animation with scroll
    if (paragraphSplit.words && paragraphSplit.words.length > 0) {
      gsap.set(paragraphSplit.words, { yPercent: 300, rotate: 3, opacity: 0 });
      
      gsap.to(paragraphSplit.words, {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        ease: "none",
        stagger: 0.01,
        scrollTrigger: {
          trigger: ".message-content p",
          start: "top center",
          end: "center center",
          scrub: 1,
        },
      });
    }

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
            scrub: 4,
            markers: false,
          },
        });
      }
    }
  }, { scope: sectionRef, dependencies: [theme] });

  return (
    <section ref={sectionRef} className="message-content relative">
      {/* Animated Doodle SVG */}
      <svg
        ref={doodleRef}
        className="absolute -rotate-12 left-1/2 -translate-x-1/2 top-1/2 lg:top-[70%] -translate-y-1/2 pointer-events-none z-0 opacity-40 w-screen h-[200px]"
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
            <h1 className="first-message">Is this supposed to be a long message?</h1>
            <div className="msg-text-scroll">
              <div className="bg-primary-red px-20">
                <h2 className="font-italiana">Lets see</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen">
        <Line direction="horizontal" className="w-full"/>
      </div>
    </section>
  );
};

export default SectionText;
