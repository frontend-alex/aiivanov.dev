"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.cursor = "none";

    const dot = dotRef.current;
    if (!dot) return;

    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    const animate = () => {
      pos.x += (mouse.x - pos.x) * 0.25;
      pos.y += (mouse.y - pos.y) * 0.25;

      gsap.set(dot, { x: pos.x, y: pos.y });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [visible]);

  return (
    <div className="hidden lg:block">
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] transition-opacity duration-150 ${visible ? "opacity-100" : "opacity-0"
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
