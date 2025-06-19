import React from 'react';
import { motion } from 'framer-motion';

export default function LogoGroup({ className = "", animateText = false, textAnimation = {}, textLeft = false }: { className?: string; animateText?: boolean; textAnimation?: any; textLeft?: boolean }) {
  const isLogoBlack = className.includes('logo-black');
  const textColor = isLogoBlack ? 'black' : 'white';
  const logoFill = isLogoBlack ? '#000' : '#a178f0';

  const textSpan = animateText ? (
    <motion.span
      className={`font-orbitron font-black text-lg md:text-xl tracking-widest select-none text-white group-hover:text-primary`}
      style={{ letterSpacing: '0.08em' }}
      initial={{ x: -40, opacity: 0 }}
      animate={textAnimation}
    >
      CICCO.AI
    </motion.span>
  ) : (
    <span className="font-orbitron font-black text-lg md:text-xl tracking-widest select-none text-white group-hover:text-primary" style={{ letterSpacing: '0.08em' }}>
      CICCO.AI
    </span>
  );

  return (
    <div className={`flex flex-row items-center gap-2.5 ${className}`}>
      {textLeft ? (
        <>
          {textSpan}
          <span className="inline-block align-middle h-8 w-8">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2834.65 2834.65" width="32" height="32" className="h-full w-full" style={{display:'block'}}><path className="fill-[#a178f0] group-hover:fill-primary" d="M2038.68,1382.16h550.35c41.2,0,61.84,49.82,32.7,78.95l-950.76,950.76c-180.61,180.61-473.45,180.61-654.06,0l-32.7-32.7-584.92-584.93-65.4-65.39c-180.62-180.61-180.62-473.45,0-654.07l65.4-65.4,120.82-120.83,465.79-465.78c86.73-86.73,204.37-135.46,327.03-135.46h1276.96c41.15,0,61.8,49.7,32.78,78.88-159.53,160.4-323.89,320.78-482.6,481.17-26.07,26.35-61.58,41.18-98.64,41.18h-678.98c-36.8,0-72.09,14.62-98.11,40.64l-374.51,374.51c-54.18,54.18-54.18,142.04,0,196.22l388.71,388.7c54.18,54.18,142.03,54.18,196.22,0l465.81-465.81c26.02-26.02,61.31-40.64,98.11-40.64Z"/></svg>
          </span>
        </>
      ) : (
        <>
          <span className="inline-block align-middle h-8 w-8">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2834.65 2834.65" width="32" height="32" className="h-full w-full" style={{display:'block'}}><path className="fill-[#a178f0] group-hover:fill-primary" d="M2038.68,1382.16h550.35c41.2,0,61.84,49.82,32.7,78.95l-950.76,950.76c-180.61,180.61-473.45,180.61-654.06,0l-32.7-32.7-584.92-584.93-65.4-65.39c-180.62-180.61-180.62-473.45,0-654.07l65.4-65.4,120.82-120.83,465.79-465.78c86.73-86.73,204.37-135.46,327.03-135.46h1276.96c41.15,0,61.8,49.7,32.78,78.88-159.53,160.4-323.89,320.78-482.6,481.17-26.07,26.35-61.58,41.18-98.64,41.18h-678.98c-36.8,0-72.09,14.62-98.11,40.64l-374.51,374.51c-54.18,54.18-54.18,142.04,0,196.22l388.71,388.7c54.18,54.18,142.03,54.18,196.22,0l465.81-465.81c26.02-26.02,61.31-40.64,98.11-40.64Z"/></svg>
          </span>
          {textSpan}
        </>
      )}
    </div>
  );
} 