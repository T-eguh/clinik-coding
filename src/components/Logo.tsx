import React from "react";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  variant?: "icon" | "full" | "horizontal";
  size?: number; // Size of the icon
  animated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  variant = "full",
  size = 48,
  animated = true,
}) => {
  // SVG Icon Component
  const Icon = () => {
    const iconContent = (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          {/* Top Swirl Gradient (Bright cyan to royal blue) */}
          <linearGradient id="topSwirlGrad" x1="120" y1="80" x2="400" y2="380" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00C6FF" />
            <stop offset="100%" stopColor="#0072FF" />
          </linearGradient>

          {/* Bottom Swirl Gradient (Deep royal blue to navy) */}
          <linearGradient id="bottomSwirlGrad" x1="120" y1="240" x2="380" y2="440" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0052D4" />
            <stop offset="100%" stopColor="#002060" />
          </linearGradient>

          {/* Cursor Gradient */}
          <linearGradient id="cursorGrad" x1="280" y1="260" x2="360" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00C6FF" />
            <stop offset="100%" stopColor="#0072FF" />
          </linearGradient>

          {/* Browser Window Gradient */}
          <linearGradient id="browserHeaderGrad" x1="180" y1="140" x2="380" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0A192F" />
            <stop offset="100%" stopColor="#112240" />
          </linearGradient>
        </defs>

        {/* Outer Circular Swirl Group */}
        <g>
          {/* Top-to-Left Crescent/Swirl */}
          <path
            d="M 330 115 
               C 420 115, 470 210, 410 300 
               C 380 345, 330 380, 275 390
               C 215 400, 160 365, 140 310
               C 135 295, 150 280, 165 285
               C 185 292, 210 310, 235 310
               C 285 310, 315 280, 335 255
               C 365 215, 340 155, 290 145
               C 275 142, 275 120, 290 118
               C 305 116, 318 115, 330 115 Z"
            fill="url(#topSwirlGrad)"
          />

          {/* Bottom-to-Right Swirl (Swoosh underneath browser) */}
          <path
            d="M 165 285
               C 140 220, 165 150, 225 125
               C 240 118, 250 135, 240 148
               C 215 180, 210 225, 240 260
               C 270 295, 325 305, 365 280
               C 400 258, 430 215, 442 225
               C 455 238, 405 310, 355 345
               C 305 380, 235 380, 185 345
               C 170 335, 160 310, 165 285 Z"
            fill="url(#bottomSwirlGrad)"
          />
        </g>

        {/* Browser Mockup Window */}
        <g>
          {/* Shadow behind browser */}
          <rect x="180" y="140" width="180" height="135" rx="16" fill="#030712" opacity="0.3" />
          
          {/* Main Browser Window Body */}
          <rect x="180" y="140" width="180" height="135" rx="16" fill="#0A1128" stroke="#1E293B" strokeWidth="4" />
          
          {/* Browser Header/Title Bar */}
          <path d="M 182 156 A 12 12 0 0 1 194 142 L 346 142 A 12 12 0 0 1 358 156 L 358 175 L 182 175 Z" fill="url(#browserHeaderGrad)" />
          
          {/* Header Dots (Window Controls) */}
          <circle cx="204" cy="158" r="5" fill="#FF5F56" />
          <circle cx="220" cy="158" r="5" fill="#FFBD2E" />
          <circle cx="236" cy="158" r="5" fill="#27C93F" />

          {/* Code Icon inside Browser: < / > */}
          {/* Left Bracket < */}
          <path d="M 230 195 L 210 210 L 230 225" stroke="#00C6FF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Slash / */}
          <path d="M 265 190 L 245 230" stroke="#0072FF" strokeWidth="4.5" strokeLinecap="round" />
          {/* Right Bracket > */}
          <path d="M 280 195 L 300 210 L 280 225" stroke="#00C6FF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Pixel/Square floating blocks on the left */}
        <g>
          <rect x="120" y="200" width="14" height="14" rx="2" fill="#00C6FF" />
          <rect x="131" y="218" width="18" height="18" rx="3" fill="#0072FF" />
          <rect x="105" y="222" width="12" height="12" rx="2" fill="#0052D4" />
          <rect x="120" y="240" width="10" height="10" rx="2" fill="#002060" />
        </g>

        {/* Mouse Pointer Cursor (bottom right of browser) */}
        <g filter="drop-shadow(0px 4px 8px rgba(0,0,0,0.4))">
          <path
            d="M 310 250
               L 355 295
               L 338 300
               L 348 320
               L 336 325
               L 326 305
               L 310 315 Z"
            fill="url(#cursorGrad)"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinejoin="miter"
          />
        </g>
      </svg>
    );

    if (animated) {
      return (
        <motion.div
          className="flex items-center justify-center shrink-0"
          style={{ width: size, height: size }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          {iconContent}
        </motion.div>
      );
    }

    return (
      <div className="flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
        {iconContent}
      </div>
    );
  };

  if (variant === "icon") {
    return <Icon />;
  }

  const isHorizontal = variant === "horizontal";

  return (
    <div
      className={`flex ${
        isHorizontal ? "flex-row items-center gap-3.5" : "flex-col items-center gap-3"
      } ${className}`}
    >
      <Icon />

      {/* Brand Text Section */}
      <div className={isHorizontal ? "text-left" : "text-center"}>
        {/* Clinik Coding Typography */}
        <div className="flex items-center font-heading font-extrabold tracking-tight leading-none">
          <span className="text-slate-900 dark:text-white text-lg md:text-xl font-black">
            CLINIK
          </span>
          <span className="text-brand-primary dark:text-cyan-400 text-lg md:text-xl font-black ml-1.5">
            CODING
          </span>
        </div>

        {/* Subtitle / Tagline */}
        <div className="mt-1 flex items-center justify-center lg:justify-start gap-1.5">
          {isHorizontal ? null : <span className="h-[1px] w-4 bg-brand-primary/40 dark:bg-cyan-500/30" />}
          <span className="text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-widest font-bold uppercase whitespace-nowrap">
            Jasa Pembuatan Website
          </span>
          {isHorizontal ? null : <span className="h-[1px] w-4 bg-brand-primary/40 dark:bg-cyan-500/30" />}
        </div>
      </div>
    </div>
  );
};
