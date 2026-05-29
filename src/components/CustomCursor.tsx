"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Track mouse movement
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Check if hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (window.getComputedStyle(target).cursor === "pointer" || target.tagName.toLowerCase() === "a" || target.tagName.toLowerCase() === "button") {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Small dot that perfectly follows the mouse */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-orange-500 rounded-full pointer-events-none z-[99999] mix-blend-screen"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1, // Disappears when hovering over a button
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />

      {/* Larger glowing ring that trails behind */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-orange-500/50 rounded-full pointer-events-none z-[99998] flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.4)]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1, // Expands over buttons
          backgroundColor: isHovering ? "rgba(249,115,22,0.1)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.8 }}
      />
    </>
  );
}