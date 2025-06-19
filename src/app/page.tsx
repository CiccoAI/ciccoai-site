"use client";
import HeroSection from '../../components/HeroSection';
import Footer from '../../components/Footer';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import LogoGroup from '../../components/LogoGroup';
import MorphingShape from '../../components/MorphingShape';
import OrganicShaderBackground from '../../components/OrganicShaderBackground';
import WhyItWorksSpinner from '../components/WhyItWorksSpinner';
import Image from 'next/image';

function OpeningAnimation({ onFinish }: { onFinish: () => void }) {
  const controls = useAnimation();
  const [landed, setLanded] = React.useState(false);
  const [target, setTarget] = React.useState<{x: number, y: number} | null>(null);
  const [textIn, setTextIn] = React.useState(false);

  React.useEffect(() => {
    function tryGetLogo() {
      const navLogo = document.getElementById('navbar-logo');
      if (navLogo) {
        const rect = navLogo.getBoundingClientRect();
        setTarget({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      } else {
        setTimeout(tryGetLogo, 100);
      }
    }
    tryGetLogo();
  }, []);

  React.useEffect(() => {
    if (!target) return;
    async function sequence() {
      await controls.start({ scale: 3, x: 0, y: 0, opacity: 1, transition: { duration: 0.01 } });
      setTextIn(true);
      await new Promise(res => setTimeout(res, 1000));
      // Animate to navbar logo position
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      if (target) {
        await controls.start({
          scale: 1,
          x: target.x - centerX,
          y: target.y - centerY,
          opacity: 1,
          transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
        });
      }
      setLanded(true);
      await new Promise(res => setTimeout(res, 1000));
      onFinish();
    }
    sequence();
    // eslint-disable-next-line
  }, [target]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] bg-background"
      style={{ background: 'rgba(0,0,0,0.98)' }}
    >
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          initial={{ scale: 3, x: 0, y: 0, opacity: 1 }}
          animate={controls}
        >
          <LogoGroup 
            animateText={true}
            textAnimation={textIn ? { x: 0, opacity: 1, transition: { duration: 1, ease: [0.4, 0, 0.2, 1] } } : {}}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Section animation variant
const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};
const staggerContainer = {
  show: { transition: { staggerChildren: 0.18 } }
};
const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

export default function Home() {
  const [showOpening, setShowOpening] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    // Prevent scroll during animation
    if (showOpening) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showOpening]);

  useEffect(() => {
    // Scroll-triggered fade-in
    const reveal = () => {
      document.querySelectorAll('.fade-section').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add('animate-fadein');
        }
      });
    };
    window.addEventListener('scroll', reveal);
    reveal();
    return () => window.removeEventListener('scroll', reveal);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace("#", ""));
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  const handleFinish = () => {
    setShowOpening(false);
    setTimeout(() => setShowMainContent(true), 50); // Small delay for smoothness
  };

  return (
    <>
      <AnimatePresence>
        {showOpening && <OpeningAnimation onFinish={handleFinish} />}
      </AnimatePresence>
      <AnimatePresence>
        {showMainContent && (
          <>
            <OrganicShaderBackground />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <MorphingShape />
              {/* <div className="bg-animated-gradient fixed inset-0 -z-10">
                <div className="blob" />
              </div>
              <div className="bg-noise-overlay fixed inset-0 -z-10" /> */}
              <div>
                <section id="hero" className="section fade-section p-6 md:p-12">
                  <HeroSection />
                </section>
                <div className="section-divider section-divider--navbar my-12" />
                <section id="services" className="section">
                  <h2 className="section-title section-title--spaced animated-gradient-title mt-6" style={{ fontFamily: 'Instrument Sans', fontWeight: 500 }}>Services</h2>
                  <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto px-4 items-start justify-center section-content">
                    <motion.div variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="premium-glow-card group/card flex flex-col w-full max-w-md h-[400px] transition-all duration-500 overflow-hidden text-center p-8" style={{background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)'}}>
                      {/* Top half: Icon + Title */}
                      <div className="flex flex-col items-center justify-center h-1/2 gap-4 mt-4">
                        <div className="w-16 h-16 aspect-square flex items-center justify-center bg-primary/10 rounded-full border border-primary/20 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-6">
                          {/* icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.08 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-medium text-white text-center leading-tight font-instrument">AI Booking Recovery System</h3>
                      </div>
                      {/* Bottom half: Content/Benefits crossfade */}
                      <div className="relative h-1/2 flex items-center justify-center mt-4">
                        {/* Content */}
                        <p className="absolute inset-0 flex items-center justify-center text-contrast/80 text-center leading-relaxed transition-all duration-500 opacity-100 group-hover/card:opacity-0 group-hover/card:pointer-events-none">
                          Never miss a booking. Turn missed calls into confirmed appointments with an AI voice agent.
                        </p>
                        {/* Benefits */}
                        <ul className="absolute inset-0 flex flex-col items-start justify-center text-sm text-gray-300 text-left list-disc list-inside leading-relaxed opacity-0 pointer-events-none transition-all duration-500 group-hover/card:opacity-100 group-hover/card:pointer-events-auto px-2 pb-2 pl-6 list-inside" style={{ textIndent: '-1.5em', paddingLeft: '1.5em' }}>
                          <li className="mb-1">Recover lost revenue from missed calls</li>
                          <li className="mb-1">Free up staff time</li>
                          <li>Increase bookings without extra spend</li>
                        </ul>
                      </div>
                    </motion.div>
                    <motion.div variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="premium-glow-card group/card flex flex-col w-full max-w-md h-[400px] transition-all duration-500 overflow-hidden text-center p-8" style={{background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)'}}>
                      {/* Top half: Icon + Title */}
                      <div className="flex flex-col items-center justify-center h-1/2 gap-4">
                        <div className="w-16 h-16 aspect-square flex items-center justify-center bg-primary/10 rounded-full border border-primary/20 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-6">
                          {/* icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="w-8 h-8">
                            <rect x="3" y="5" width="18" height="12" rx="2" strokeWidth="2" />
                            <path d="M2 19h20" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-medium text-white text-center leading-tight font-instrument">AI Website Revamp</h3>
                      </div>
                      {/* Bottom half: Content/Benefits crossfade */}
                      <div className="relative h-1/2 flex items-center justify-center mt-4">
                        {/* Content */}
                        <p className="absolute inset-0 flex items-center justify-center text-contrast/80 text-center leading-relaxed transition-all duration-500 opacity-100 group-hover/card:opacity-0 group-hover/card:pointer-events-none">
                          Upgrade your online presence with a fast, modern website rebuilt using the latest AI tools.
                        </p>
                        {/* Benefits */}
                        <ul className="absolute inset-0 flex flex-col items-start justify-center text-sm text-gray-300 text-left list-disc list-inside leading-relaxed opacity-0 pointer-events-none transition-all duration-500 group-hover/card:opacity-100 group-hover/card:pointer-events-auto px-2 pb-2 pl-6 list-inside" style={{ textIndent: '-1.5em', paddingLeft: '1.5em' }}>
                          <li className="mb-1">Attract more clients with a fast, modern site</li>
                          <li className="mb-1">Reduce ongoing website maintenance costs</li>
                          <li>Launch updates and new features quickly</li>
                        </ul>
                      </div>
                    </motion.div>
                    <motion.div variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="premium-glow-card group/card flex flex-col w-full max-w-md h-[400px] transition-all duration-500 overflow-hidden text-center p-8" style={{background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)'}}>
                      {/* Top half: Icon + Title */}
                      <div className="flex flex-col items-center justify-center h-1/2 gap-4">
                        <div className="w-16 h-16 aspect-square flex items-center justify-center bg-primary/10 rounded-full border border-primary/20 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-6">
                          {/* icon */}
                          <img src="/AI%20Chatbot%20Icon.svg" alt="AI Chatbot Icon" className="w-14 h-14 object-contain" />
                        </div>
                        <h3 className="text-xl font-medium text-white text-center leading-tight font-instrument">AI Chatbot Assistant</h3>
                      </div>
                      {/* Bottom half: Content/Benefits crossfade */}
                      <div className="relative h-1/2 flex items-center justify-center mt-4">
                        {/* Content */}
                        <p className="absolute inset-0 flex items-center justify-center text-contrast/80 text-center leading-relaxed transition-all duration-500 opacity-100 group-hover/card:opacity-0 group-hover/card:pointer-events-none">
                          Add a smart chatbot to your website to handle FAQs, bookings, and customer support automatically.
                        </p>
                        {/* Benefits */}
                        <ul className="absolute inset-0 flex flex-col items-start justify-center text-sm text-gray-300 text-left list-disc list-inside leading-relaxed opacity-0 pointer-events-none transition-all duration-500 group-hover/card:opacity-100 group-hover/card:pointer-events-auto px-2 pb-2 pl-6 list-inside" style={{ textIndent: '-1.5em', paddingLeft: '1.5em' }}>
                          <li className="mb-1">Instantly answer FAQs and handle bookings 24/7</li>
                          <li className="mb-1">Reduce support costs by automating common questions</li>
                          <li>Never miss a lead—even after hours</li>
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </section>
                <div className="section-divider my-12" />
                <section id="how" className="section min-h-[80vh]">
                  <h2 className="section-title section-title--spaced animated-gradient-title mt-6" style={{ fontFamily: 'Instrument Sans', fontWeight: 500 }}>How It Works</h2>
                  <div className="hidden md:block relative w-full max-w-5xl mx-auto mt-2" style={{height:'400px'}}>
                    {/* Centered group wrapper for cards */}
                    <div style={{ position: 'absolute', width: '1040px', left: '50%', transform: 'translateX(-50%)', top: 0, height: '100%' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0 }}>
                        <motion.div variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="premium-glow-card flex flex-col items-center text-center p-8 w-80 h-[260px]" style={{background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)'}}>
                          <div className="w-16 h-16 aspect-square flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 mb-4 text-white font-instrument font-medium text-xl">1</div>
                          <h3 className="font-medium mb-2 font-instrument">Book a Free Strategy Call</h3>
                          <p className="text-contrast/80 font-sans font-normal">I discuss your needs and goals in a quick, no-pressure consult.</p>
                        </motion.div>
                      </div>
                      <div style={{ position: 'absolute', left: 360, top: 130 }}>
                        <motion.div variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="premium-glow-card flex flex-col items-center text-center p-8 w-80 h-[260px]" style={{background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)'}}>
                          <div className="w-16 h-16 aspect-square flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 mb-4 text-white font-instrument font-medium text-xl">2</div>
                          <h3 className="font-medium mb-2 font-instrument">I Build It Fast</h3>
                          <p className="text-contrast/80 font-sans font-normal">Your automation is built with clear milestones and minimal effort required on your end.</p>
                        </motion.div>
                      </div>
                      <div style={{ position: 'absolute', left: 720, top: 260 }}>
                        <motion.div variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="premium-glow-card flex flex-col items-center text-center p-8 w-80 h-[260px]" style={{background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)'}}>
                          <div className="w-16 h-16 aspect-square flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 mb-4 text-white font-instrument font-medium text-xl">3</div>
                          <h3 className="font-medium mb-2 font-instrument">You Launch With Confidence</h3>
                          <p className="text-contrast/80 font-sans font-normal">Everything's ready to go, with optional ongoing support if you need it.</p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  {/* Mobile: vertical stack */}
                  <div className="flex flex-col md:hidden gap-8 w-full items-center mt-10">
                    <motion.div variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="premium-glow-card flex flex-col items-center text-center p-8 w-full max-w-xs h-[260px]" style={{background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)'}}>
                      <div className="w-16 h-16 aspect-square flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 mb-4 text-white font-instrument font-medium text-xl">1</div>
                      <h3 className="font-medium mb-2 font-instrument">Book a Free Strategy Call</h3>
                      <p className="text-contrast/80 font-sans font-normal">I discuss your needs and goals in a quick, no-pressure consult.</p>
                    </motion.div>
                    <motion.div variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="premium-glow-card flex flex-col items-center text-center p-8 w-full max-w-xs h-[260px]" style={{background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)'}}>
                      <div className="w-16 h-16 aspect-square flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 mb-4 text-white font-instrument font-medium text-xl">2</div>
                      <h3 className="font-medium mb-2 font-instrument">I Build It Fast</h3>
                      <p className="text-contrast/80 font-sans font-normal">Your automation is built with clear milestones and minimal effort required on your end.</p>
                    </motion.div>
                    <motion.div variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="premium-glow-card flex flex-col items-center text-center p-8 w-full max-w-xs h-[260px]" style={{background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)'}}>
                      <div className="w-16 h-16 aspect-square flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 mb-4 text-white font-instrument font-medium text-xl">3</div>
                      <h3 className="font-medium mb-2 font-instrument">You Launch With Confidence</h3>
                      <p className="text-contrast/80 font-sans font-normal">Everything's ready to go, with optional ongoing support if you need it.</p>
                    </motion.div>
                  </div>
                </section>
                <div className="section-divider my-12" />
                <section id="why" className="section">
                  <h2 className="section-title section-title--spaced animated-gradient-title mt-6" style={{ fontFamily: 'Instrument Sans', fontWeight: 500 }}>Why It Works</h2>
                  <div className="w-full flex justify-center items-center mt-8">
                    <WhyItWorksSpinner />
                  </div>
                </section>
                <div className="section-divider my-12" />
                <section id="testimonials" className="section flex flex-col justify-center items-center h-screen">
                  <h2 className="section-title section-title--spaced animated-gradient-title mt-6 font-instrument font-medium">Testimonials</h2>
                  <motion.div variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="premium-glow-card px-10 py-8 max-w-5xl mt-36" style={{background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)'}}>
                    <span className="text-xl md:text-2xl text-contrast/80 text-center font-medium font-instrument">
                      Client results are on the way. Ready to be the next success story?
                    </span>
                  </motion.div>
                </section>
                <div className="section-divider my-12" />
                <section id="about" className="section">
                  <h2 className="section-title section-title--spaced animated-gradient-title mt-6 font-instrument font-medium">About</h2>
                  <div className="w-full max-w-7xl mx-auto px-4 section-content">
                    <motion.div variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="premium-glow-card p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-16" style={{background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)'}}>
                      <Image 
                        src="/images/Luke Ciccozzi Website Photo.png" 
                        alt="Luke Ciccozzi profile photo" 
                        className="rounded-2xl w-56 h-72 object-cover shadow-xl border-4" 
                        style={{ borderColor: '#a178f0', background: 'white' }}
                        width={224}
                        height={288}
                      />
                      <motion.div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left" variants={cardVariant}>
                        <p className="text-lg md:text-xl mb-6 leading-relaxed !text-white">
                          I&apos;m Luke Ciccozzi, founder of Cicco.AI. A creative at heart, I discovered AI and was instantly captivated by its potential. My background in architecture taught me systems thinking, while my youth work experience revealed the need for better automation. This inspired me to build practical systems for small to medium-sized businesses. Today, I personally scope and build every system, ensuring it&apos;s fast, efficient, and tailored to your workflow.
                        </p>
                        <p className="text-lg md:text-xl font-medium !text-white"><span className="font-medium">Mission:</span> To make advanced automation accessible and genuinely useful for business owners, so you can focus on what matters most.</p>
                      </motion.div>
                    </motion.div>
                  </div>
                </section>
                <section id="cta" className="section">
                  <h2 className="section-title section-title--spaced animated-gradient-title mt-6" style={{ fontFamily: 'Instrument Sans', fontWeight: 500 }}>Book a Free Strategy Call</h2>
                  <motion.div variants={cardVariant} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="premium-glow-card p-4 flex flex-col justify-end gap-4 w-full max-w-4xl mx-auto section-content mb-12 min-h-[500px]" style={{background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)'}}>
                    <input type="text" placeholder="Name" className="px-4 py-3 rounded-md bg-black/60 border border-primary-dark text-contrast focus:outline-none focus:ring-2 focus:ring-primary !text-white" />
                    <input type="email" placeholder="Email" className="px-4 py-3 rounded-md bg-black/60 border border-primary-dark text-contrast focus:outline-none focus:ring-2 focus:ring-primary !text-white" />
                    <input type="tel" placeholder="Phone Number" className="px-4 py-3 rounded-md bg-black/60 border border-primary-dark text-contrast focus:outline-none focus:ring-2 focus:ring-primary !text-white" />
                    <select className="px-4 py-3 rounded-md bg-black/60 border border-primary-dark text-contrast focus:outline-none focus:ring-2 focus:ring-primary !text-white">
                      <option value="" disabled selected>Which service are you interested in?</option>
                      <option value="booking-recovery">AI Booking Recovery System</option>
                      <option value="website-revamp">AI Website Revamp</option>
                      <option value="chatbot-assistant">AI Chatbot Assistant</option>
                      <option value="other">Not sure / Other</option>
                    </select>
                    <textarea placeholder="How can I help you?" className="px-4 py-3 rounded-md bg-black/60 border border-primary-dark text-contrast focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px] !text-white" />
                    <button type="submit" className="cta-gradient-btn button-animate px-8 py-3 rounded-lg font-instrument font-medium transition-all duration-300 transform text-base w-auto min-w-[220px] mx-auto border-2 border-white">Book Now</button>
                  </motion.div>
                </section>
                <Footer />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
