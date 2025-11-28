"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CursorMode = "default" | "hover" | "magnetic" | "special";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const modeRef = useRef<CursorMode>("default");
  const activeElRef = useRef<HTMLElement | null>(null);
  const specialTlRef = useRef<gsap.core.Timeline | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    document.body.style.cursor = "none";

    const cursorEl = cursorRef.current;
    const dotEl = cursorDotRef.current;

    if (!cursorEl || !dotEl) return;

    const setMode = (mode: CursorMode) => {
      modeRef.current = mode;

      // kill special timeline if leaving special
      if (mode !== "special" && specialTlRef.current) {
        specialTlRef.current.kill();
        specialTlRef.current = null;
      }

      // always keep it a circle; just change scale/border
      switch (mode) {
        case "default":
          gsap.to(cursorEl, {
            scale: 1,
            borderWidth: 2,
            duration: 0.25,
            ease: "power3.out",
          });
          gsap.to(dotEl, {
            scale: 1,
            duration: 0.2,
            ease: "power3.out",
          });
          if (activeElRef.current) {
            gsap.to(activeElRef.current, {
              x: 0,
              y: 0,
              duration: 0.25,
              ease: "power3.out",
            });
          }
          break;
        case "hover":
          gsap.to(cursorEl, {
            scale: 1.4,
            borderWidth: 2,
            duration: 0.25,
            ease: "power3.out",
          });
          gsap.to(dotEl, {
            scale: 0.8,
            duration: 0.2,
            ease: "power3.out",
          });
          break;
        case "magnetic":
          gsap.to(cursorEl, {
            scale: 1.6,
            borderWidth: 2,
            duration: 0.25,
            ease: "power3.out",
          });
          gsap.to(dotEl, {
            scale: 0.7,
            duration: 0.2,
            ease: "power3.out",
          });
          break;
        case "special":
          gsap.to(cursorEl, {
            scale: 1.6,
            borderWidth: 2,
            duration: 0.25,
            ease: "power3.out",
          });
          gsap.to(dotEl, {
            scale: 0.6,
            duration: 0.2,
            ease: "power3.out",
          });

          // pulse effect ONLY on the circle, still round
          specialTlRef.current?.kill();
          specialTlRef.current = gsap
            .timeline({ repeat: -1, yoyo: true })
            .to(cursorEl, {
              scale: 1.9,
              duration: 0.6,
              ease: "power2.inOut",
            });
          break;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, input, textarea, select, [role='button'], [onclick], .cursor-magnetic, .cursor-special"
      ) as HTMLElement | null;

      if (interactive !== activeElRef.current) {
        activeElRef.current = interactive;

        if (!interactive) {
          setMode("default");
        } else if (interactive.classList.contains("cursor-special")) {
          setMode("special");
        } else if (interactive.classList.contains("cursor-magnetic")) {
          setMode("magnetic");
        } else {
          setMode("hover");
        }

        // reset transform on previous element when switching
        // handled in default mode when leaving
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      const { x: mx, y: my } = mousePos.current;
      let targetX = mx;
      let targetY = my;

      const mode = modeRef.current;
      const activeEl = activeElRef.current;

      // MAGNETIC LOGIC: pull cursor toward active element center,
      // and slightly move the element opposite to the cursor for a nice parallax.
      if (mode === "magnetic" && activeEl) {
        const rect = activeEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxDist = 220; // magnet radius
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 0.35; // strength of pull
          targetX = mx - dx * force;
          targetY = my - dy * force;

          // nudge element slightly
          gsap.to(activeEl, {
            x: -dx * 0.08,
            y: -dy * 0.08,
            duration: 0.2,
            ease: "power3.out",
          });
        } else {
          // when leaving radius, reset element
          gsap.to(activeEl, {
            x: 0,
            y: 0,
            duration: 0.25,
            ease: "power3.out",
          });
        }
      }

      // smooth follow
      cursorPos.current.x += (targetX - cursorPos.current.x) * 0.18;
      cursorPos.current.y += (targetY - cursorPos.current.y) * 0.18;

      gsap.set(cursorEl, {
        x: cursorPos.current.x,
        y: cursorPos.current.y,
      });

      gsap.set(cursorDotRef.current, {
        x: mx,
        y: my,
      });

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      specialTlRef.current?.kill();
    };
  }, [isVisible]);

  return (
    <div className="hidden lg:block">
      {/* Outer ring – always circular */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] border-2 border-white rounded-full transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"
          }`}

      />

      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
        style={{
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default CustomCursor;
