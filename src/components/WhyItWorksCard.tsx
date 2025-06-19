import React from 'react';
import { motion } from 'framer-motion';

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

interface WhyItWorksCardProps {
  title: string;
  description: string;
  focused?: boolean;
  deEmphasized?: boolean;
}

const WhyItWorksCard: React.FC<WhyItWorksCardProps> = ({ title, description, focused = false, deEmphasized = false }) => {
  let backgroundStyle = {};
  if (focused) {
    backgroundStyle = {
      background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)'
    };
  } else {
    backgroundStyle = {
      background: 'rgba(0,0,0,0.25)'
    };
  }
  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className={`premium-glow-card group/card max-w-xl w-[420px] mx-auto transition-all duration-500 overflow-hidden text-center p-8
        ${focused ? 'shadow-2xl z-20' : 'z-10'}
        ${deEmphasized ? 'opacity-60 blur-sm pointer-events-none' : 'opacity-100'}
      `}
      style={backgroundStyle}
    >
      <h3 className="text-xl font-medium text-white text-center leading-tight mb-2 font-instrument">{title}</h3>
      <p className="text-contrast/80 text-center leading-relaxed font-sans font-normal">{description.charAt(0).toUpperCase() + description.slice(1)}</p>
    </motion.div>
  );
};

export default WhyItWorksCard; 