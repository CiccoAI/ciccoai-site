"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setIsAnimating(false);
          onComplete();
        },
      });
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.7 }
      );
      tl.fromTo(
        ".cicco-title",
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.7 },
        "-=0.3"
      );
      tl.to({}, { duration: 1.1 }); // Pause
      // Calculate navbar logo position and scale
      const isMobile = window.innerWidth < 768;
      const navLeft = 16; // px-4
      const navTop = 8; // py-2
      const logoSize = 32; // h-8 w-8
      const textSize = isMobile ? 20 : 24; // text-xl or text-2xl
      const gap = 12; // gap-3
      // Get current center position of wrapper
      const el = logoWrapperRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Target: left padding + half logo width, top padding + half logo height
        const targetX = navLeft + logoSize / 2;
        const targetY = navTop + logoSize / 2;
        // Animate to scale 1 (navbar size)
        tl.to(logoWrapperRef.current, {
          x: targetX - centerX,
          y: targetY - centerY,
          scale: logoSize / 144, // 144 = h-36/w-36, so logo shrinks to navbar size
          transformOrigin: "top left",
          duration: 1,
          ease: "power2.inOut",
        });
      }
      tl.to(preloaderRef.current, { opacity: 0, duration: 0.7 }, "+=0.1");
    }, preloaderRef);
    return () => ctx.revert();
  }, [onComplete]);

  if (!isAnimating) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 text-white transition-opacity duration-700"
    >
      <div ref={logoWrapperRef} className="flex items-center font-orbitron font-black text-xl md:text-2xl text-primary tracking-widest select-none gap-3">
        {/* Actual SVG Logo (copied from Navbar) */}
        <span className="inline-block align-middle h-36 w-36 md:h-44 md:w-44">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2834.65 2834.65" width="100%" height="100%" className="h-full w-full" style={{display:'block'}}><path d="M2038.68,1382.16h550.35c41.2,0,61.84,49.82,32.7,78.95l-950.76,950.76c-180.61,180.61-473.45,180.61-654.06,0l-32.7-32.7-584.92-584.93-65.4-65.39c-180.62-180.61-180.62-473.45,0-654.07l65.4-65.4,120.82-120.83,465.79-465.78c86.73-86.73,204.37-135.46,327.03-135.46h1276.96c41.15,0,61.8,49.7,32.78,78.88-159.53,160.4-323.89,320.78-482.6,481.17-26.07,26.35-61.58,41.18-98.64,41.18h-678.98c-36.8,0-72.09,14.62-98.11,40.64l-374.51,374.51c-54.18,54.18-54.18,142.04,0,196.22l388.71,388.7c54.18,54.18,142.03,54.18,196.22,0l465.81-465.81c26.02-26.02,61.31-40.64,98.11-40.64Z" fill="#a178f0"/></svg>
        </span>
        CICCO.AI
      </div>
    </div>
  );
};

export default Preloader; 