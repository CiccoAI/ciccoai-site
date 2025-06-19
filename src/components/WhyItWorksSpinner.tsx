import React, { useState } from 'react';
import WhyItWorksCard from './WhyItWorksCard';

const cards = [
  {
    title: 'Simple, guided setup.',
    description: 'I handle the tech and walk you through every step so nothing feels overwhelming.'
  },
  {
    title: 'Save time and look great online.',
    description: "Whether it's automation behind the scenes or a new website, everything is clean and intuitive so your clients enjoy a seamless experience."
  },
  {
    title: 'Built on proven, modern AI platforms.',
    description: 'Stable, fast, and efficient.'
  },
  {
    title: 'Direct, personal support.',
    description: "You'll always be in touch with me for updates, tweaks, and support."
  },
  {
    title: 'Future-proof solutions.',
    description: 'Your setup is built to grow with your business and stay useful long term.'
  }
];

const getIndex = (base: number, offset: number, length: number) => {
  return (base + offset + length) % length;
};

const WhyItWorksSpinner: React.FC = () => {
  const [centerIdx, setCenterIdx] = useState(0);
  const len = cards.length;

  const handleNext = () => setCenterIdx((i) => (i - 1 + len) % len);
  const handlePrev = () => setCenterIdx((i) => (i + 1) % len);

  // Helper for card-like button style
  const cardButtonStyle = {
    background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)',
    boxShadow: '0 0 16px 2px #a178f099, 0 0 24px 6px #2a1d4c66',
    color: '#fff',
    border: '2px solid #fff',
    transition: 'box-shadow 0.25s, border-color 0.25s, transform 0.18s',
  };

  // Responsive: stack buttons above/below on mobile
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-3xl relative">
        <div className="flex flex-col items-center w-full relative min-h-[420px] justify-center">
          {/* Top card (de-emphasized) */}
          <div className="absolute left-0 right-0 top-0 pointer-events-none w-full flex justify-center" style={{zIndex: 10}}>
            <WhyItWorksCard {...cards[getIndex(centerIdx, -1, len)]} deEmphasized />
          </div>
          {/* Center card (focused) */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full flex justify-center z-20">
            <WhyItWorksCard {...cards[getIndex(centerIdx, 0, len)]} focused />
          </div>
          {/* Arrow buttons, absolutely positioned and separated from card */}
          <div className="hidden md:flex flex-col gap-2 absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-[calc(210px+2rem)] z-30">
            <button
              aria-label="Previous"
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center text-2xl font-medium rounded-full group transition-all duration-300 border-2"
              style={cardButtonStyle}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 24px 6px #a178f0, 0 0 48px 12px #6a4cff66';
                e.currentTarget.style.borderColor = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = cardButtonStyle.boxShadow;
                e.currentTarget.style.borderColor = '#fff';
              }}
              onFocus={e => {
                e.currentTarget.style.boxShadow = '0 0 24px 6px #a178f0, 0 0 48px 12px #6a4cff66';
                e.currentTarget.style.borderColor = '#fff';
              }}
              onBlur={e => {
                e.currentTarget.style.boxShadow = cardButtonStyle.boxShadow;
                e.currentTarget.style.borderColor = '#fff';
              }}
            >
              <span className="sr-only">Previous</span>
              &#8593;
            </button>
            <button
              aria-label="Next"
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center text-2xl font-medium rounded-full group transition-all duration-300 border-2"
              style={cardButtonStyle}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 24px 6px #a178f0, 0 0 48px 12px #6a4cff66';
                e.currentTarget.style.borderColor = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = cardButtonStyle.boxShadow;
                e.currentTarget.style.borderColor = '#fff';
              }}
              onFocus={e => {
                e.currentTarget.style.boxShadow = '0 0 24px 6px #a178f0, 0 0 48px 12px #6a4cff66';
                e.currentTarget.style.borderColor = '#fff';
              }}
              onBlur={e => {
                e.currentTarget.style.boxShadow = cardButtonStyle.boxShadow;
                e.currentTarget.style.borderColor = '#fff';
              }}
            >
              <span className="sr-only">Next</span>
              &#8595;
            </button>
          </div>
          {/* Bottom card (de-emphasized) */}
          <div className="absolute left-0 right-0 bottom-0 pointer-events-none w-full flex justify-center" style={{zIndex: 10}}>
            <WhyItWorksCard {...cards[getIndex(centerIdx, 1, len)]} deEmphasized />
          </div>
        </div>
        {/* Mobile arrow buttons below the card stack */}
        <div className="flex md:hidden flex-row gap-4 justify-center items-center mt-6 w-full">
          <button
            aria-label="Previous"
            onClick={handlePrev}
            className="w-12 h-12 flex items-center justify-center text-2xl font-medium rounded-full group transition-all duration-300 border-2"
            style={cardButtonStyle}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 24px 6px #a178f0, 0 0 48px 12px #6a4cff66';
              e.currentTarget.style.borderColor = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = cardButtonStyle.boxShadow;
              e.currentTarget.style.borderColor = '#fff';
            }}
            onFocus={e => {
              e.currentTarget.style.boxShadow = '0 0 24px 6px #a178f0, 0 0 48px 12px #6a4cff66';
              e.currentTarget.style.borderColor = '#fff';
            }}
            onBlur={e => {
              e.currentTarget.style.boxShadow = cardButtonStyle.boxShadow;
              e.currentTarget.style.borderColor = '#fff';
            }}
          >
            <span className="sr-only">Previous</span>
            &#8593;
          </button>
          <button
            aria-label="Next"
            onClick={handleNext}
            className="w-12 h-12 flex items-center justify-center text-2xl font-medium rounded-full group transition-all duration-300 border-2"
            style={cardButtonStyle}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 24px 6px #a178f0, 0 0 48px 12px #6a4cff66';
              e.currentTarget.style.borderColor = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = cardButtonStyle.boxShadow;
              e.currentTarget.style.borderColor = '#fff';
            }}
            onFocus={e => {
              e.currentTarget.style.boxShadow = '0 0 24px 6px #a178f0, 0 0 48px 12px #6a4cff66';
              e.currentTarget.style.borderColor = '#fff';
            }}
            onBlur={e => {
              e.currentTarget.style.boxShadow = cardButtonStyle.boxShadow;
              e.currentTarget.style.borderColor = '#fff';
            }}
          >
            <span className="sr-only">Next</span>
            &#8595;
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyItWorksSpinner; 