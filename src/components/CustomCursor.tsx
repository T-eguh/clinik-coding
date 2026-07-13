import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "button" | "link" | "portfolio">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Use springs for smooth, fluid motion
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 400, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is desktop
    const checkDevice = () => {
      const hasTouch = window.matchMedia("(pointer: coarse)").matches;
      const width = window.innerWidth;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      setIsMobile(hasTouch || width < 1024 || reducedMotion);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center the 32px cursor
      mouseY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Performance-optimized global event delegation for hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find closest interactive parent
      const clickable = target.closest("button, [role='button'], input[type='submit'], .cursor-pointer, [data-cursor]");
      const anchor = target.closest("a, .cursor-link");
      const portfolioCard = target.closest("#portfolio-grid > div, [data-cursor='portfolio']");

      if (portfolioCard) {
        setCursorType("portfolio");
      } else if (anchor) {
        setCursorType("link");
      } else if (clickable) {
        setCursorType("button");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile, isVisible, mouseX, mouseY]);

  if (isMobile || !isVisible) return null;

  // Custom visual variants matching our premium high-contrast design
  const cursorVariants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: "rgba(37, 99, 235, 0.2)",
      border: "1.5px solid rgba(37, 99, 235, 0.8)",
      borderRadius: "50%",
    },
    button: {
      width: 44,
      height: 44,
      backgroundColor: "rgba(37, 99, 235, 0.15)",
      border: "1.5px solid rgba(37, 99, 235, 0.9)",
      borderRadius: "50%",
      scale: 1.1,
    },
    link: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(6, 182, 212, 0.2)",
      border: "1.5px solid rgba(6, 182, 212, 0.9)",
      borderRadius: "50%",
      scale: 1.2,
    },
    portfolio: {
      width: 90,
      height: 90,
      backgroundColor: "rgba(11, 18, 32, 0.95)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center will-change-transform"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <motion.div
        className="relative flex items-center justify-center overflow-hidden transition-all duration-150 ease-out"
        variants={cursorVariants}
        animate={cursorType}
      >
        {cursorType === "portfolio" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider text-center uppercase"
          >
            View Project
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
