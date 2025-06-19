"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Extend the Window interface to include __alertedLogoY
declare global {
  interface Window {
    __alertedLogoY?: boolean;
  }
}

// Custom anchor offsets (tweak as needed for your logo)
const ANCHOR_OFFSET_Y = 1.7; // Move anchor up further to prevent chopping
const ANCHOR_OFFSET_X = 0; // No horizontal offset
const ANCHOR_OFFSET_Z = 0; // No depth offset
function SpinningLogoWithShadow({ onYChange, onRotationY }: { onYChange?: (y: number) => void, onRotationY?: (ry: number) => void }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/Cicco AI 3D Logo.glb');

  React.useEffect(() => {
    if (group.current) {
      group.current.rotation.set(0, 0, 0);
      group.current.position.set(0, 0, 0);
    }
  }, []);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.4; // Time-based rotation for consistent speed
      if (onRotationY) onRotationY(group.current.rotation.y);
      // Logo bounces above ground
      const y = Math.abs(Math.sin(clock.getElapsedTime() * 0.7)) * 1.0 + 0.1;
      group.current.position.y = y;
      group.current.position.x = 0;
      group.current.position.z = 0;
      if (onYChange) onYChange(y);
    }
  });

  return (
    <group>
      {/* Offset the anchor upward, move model down to compensate */}
      <group ref={group} position={[ANCHOR_OFFSET_X, ANCHOR_OFFSET_Y, ANCHOR_OFFSET_Z]}>
        <primitive object={scene} scale={1.0} position={[-ANCHOR_OFFSET_X, -ANCHOR_OFFSET_Y, -ANCHOR_OFFSET_Z]} />
      </group>
    </group>
  );
}

const HeroSection = () => {
  const [logoY, setLogoY] = React.useState(0.1);
  const [rotationY, setRotationY] = React.useState(0); // Track Y rotation
  // Track min and max logoY for sync diagnosis
  const minYRef = React.useRef(logoY);
  const maxYRef = React.useRef(logoY);
  React.useEffect(() => {
    if (logoY < minYRef.current) minYRef.current = logoY;
    if (logoY > maxYRef.current) maxYRef.current = logoY;
  }, [logoY]);
  // Glow scale: bigger when logo is lower, smaller when higher
  const minScale = 0.4; // Smaller when logo is highest
  const maxScale = 1.2; // Larger when logo is lowest
  const minY = 0.1; // Exact minimum from measurements
  const maxY = 1.0999999999857102; // Exact maximum from measurements
  // When logo is at highest (minY), scale is max. When at lowest (maxY), scale is min.
  const scale = minScale + ((logoY - minY) / (maxY - minY)) * (maxScale - minScale);
  const glowTop = '89%'; // Keep as is for now

  // Smooth the glow scale using interpolation
  const [smoothedScale, setSmoothedScale] = React.useState(1);
  React.useEffect(() => {
    let animationFrame: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    function animate() {
      setSmoothedScale(prev => lerp(prev, scale, 0.12)); // 0.12 controls smoothness
      animationFrame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [scale]);

  const PHASE = -Math.PI / 4; // larger negative phase shift
  const AMPLITUDE = 24; // px, slightly increased amplitude
  const MANUAL_OFFSET = -8; // px, final nudge to the right
  // Remove speed factor; tune PHASE and AMPLITUDE for perfect sync
  const glowX = Math.sin(rotationY + PHASE) * AMPLITUDE + MANUAL_OFFSET;

  const [showScrollIndicator, setShowScrollIndicator] = React.useState(true);

  // Add scroll listener to hide indicator when user scrolls
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="h-screen w-full flex items-center justify-center px-6 scroll-mt-[3rem] relative overflow-hidden">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-12 md:gap-8 relative z-10 h-full">
        {/* Left: Text and buttons */}
        <div className="w-full flex flex-col justify-center items-center md:items-start text-center md:text-left gap-6 max-w-xl mt-12 md:mt-0 mb-8 md:mb-0">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white leading-tight animated-gradient-title tracking-wide max-w-[20ch] md:max-w-[16ch]"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)', fontFamily: 'Instrument Sans, sans-serif', fontWeight: 500 }}
          >
            AI services that streamline your business.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-200 leading-relaxed max-w-lg"
            style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)', fontFamily: 'Instrument Sans, sans-serif', fontWeight: 500 }}
          >
            Founder-built, fast, tailored, and ready to save you time.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row w-full gap-6 md:gap-6"
          >
            <a href="#services" className="button-animate mobile-fixed-btn flex flex-col md:flex-row flex-1 w-full text-center px-0 md:px-4 md:h-14 border-2 border-white text-white rounded-lg font-bold transition-all duration-300 transform text-base md:text-lg box-border whitespace-normal md:whitespace-nowrap md:text-ellipsis leading-snug font-instrument" style={{background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)'}}>
              <span className="flex-1 flex items-center justify-center w-full h-full text-center">See Services</span>
            </a>
            <a href="#cta" className="cta-gradient-btn mobile-fixed-btn flex flex-col md:flex-row flex-1 w-full text-center px-0 md:px-4 md:h-14 rounded-lg font-bold transition-all duration-300 transform text-base md:text-lg border-2 border-white shadow-lg hover:scale-110 box-border whitespace-normal md:whitespace-nowrap md:text-ellipsis leading-snug font-instrument">
              <span className="flex-1 flex items-center justify-center w-full h-full text-center">Book a Free Strategy Call</span>
            </a>
          </motion.div>
        </div>
        {/* Right: Logo (vertically and horizontally centered) */}
        <div className="w-full flex justify-center items-center mt-4 md:mt-0" style={{ marginTop: '-1.5rem' }}>
          <div className="relative w-[220px] h-[220px] md:w-[400px] md:h-[400px] flex items-center justify-center mt-[-6rem] md:mt-0">
            {/* Dynamic 2D CSS Glow always under the logo */}
            <div
              style={{
                position: 'absolute',
                left: `calc(50% + ${glowX}px)`,
                top: 'calc(50% + 190px)',
                transform: `translate(-50%, -50%) scale(${smoothedScale})`,
                width: '220px',
                height: '40px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(176,133,255,0.25) 0%, transparent 100%)',
                filter: 'blur(18px)',
                zIndex: 2,
                pointerEvents: 'none',
                transition: 'none',
              }}
            />
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }} style={{ width: '100%', height: '100%', background: 'transparent' }} gl={{ alpha: true }}>
              <ambientLight intensity={0.9} />
              <directionalLight position={[5, 5, 5]} intensity={2.2} />
              <directionalLight position={[-5, -5, 5]} intensity={1.7} color="#a259ff" />
              <SpinningLogoWithShadow onYChange={y => setLogoY(y)} onRotationY={setRotationY} />
            </Canvas>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollIndicator ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-8 right-8 md:right-16 z-20 w-12 h-16 md:w-16 md:h-24"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-sm font-instrument tracking-wider">SCROLL</span>
          <div className="w-4 h-7 md:w-6 md:h-10 rounded-full border-2 border-white/60 flex items-start justify-center p-0.5 md:p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
            />
          </div>
        </motion.div>
      </motion.div>
      {/* Debug: Show current glowX for tuning */}
      {/* <span style={{position:'absolute',top:0,left:0,color:'white',zIndex:99}}>glowX: {glowX.toFixed(2)}</span> */}
    </section>
  );
};

export default HeroSection;

// Required for GLTF loading
// @ts-ignore
useGLTF.preload('/models/Cicco AI 3D Logo.glb'); 