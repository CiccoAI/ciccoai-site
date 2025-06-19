import React from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full py-10 px-4 text-contrast bg-transparent">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-start gap-10 md:gap-0">
        {/* Left: Contact Info */}
        <div className="flex flex-col gap-4 min-w-[220px] items-start text-left">
          <div className="text-sm font-medium opacity-70 tracking-widest mb-1 font-instrument">CONTACT</div>
          <div className="flex items-center gap-2 text-base opacity-90 justify-start"><span className="text-lg"><FaMapMarkerAlt /></span>Adelaide, South Australia</div>
          <div className="flex items-center gap-2 text-base opacity-90 justify-start"><span className="text-lg"><FaEnvelope /></span><a href="mailto:luke@ciccoai.com" className="hover:text-primary transition">luke@ciccoai.com</a></div>
          <div className="flex items-center gap-2 text-base opacity-90 justify-start"><span className="text-lg"><FaPhone /></span><a href="tel:+61438068660" className="hover:text-primary transition">+61 438 068 660</a></div>
        </div>
        {/* Middle: Spacer for layout balance */}
        <div className="flex-1" />
        {/* Right: Social Icons + Copyright */}
        <div className="flex flex-col items-center md:items-end gap-4 min-w-[120px]">
          <div className="text-sm font-medium opacity-70 tracking-widest mb-1 md:text-right font-instrument">SOCIALS</div>
          <div className="flex flex-col gap-3">
            <a href="https://www.instagram.com/lukeciccozzi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-2xl opacity-80 hover:text-[#a178f0] transition-colors"><FaInstagram /></a>
            <a href="https://www.facebook.com/lukeciccozzi" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-2xl opacity-80 hover:text-[#a178f0] transition-colors"><FaFacebookF /></a>
            <a href="https://www.linkedin.com/in/luke-ciccozzi-018b932ab/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-2xl opacity-80 hover:text-[#a178f0] transition-colors"><FaLinkedinIn /></a>
            <a href="https://x.com/lukeciccozzi" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-2xl opacity-80 hover:text-[#a178f0] transition-colors"><FaXTwitter /></a>
          </div>
        </div>
      </div>
      {/* Bottom row: Copyright and Legal Links */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center mt-8 gap-2">
        <div className="text-xs opacity-40 font-sans font-normal tracking-wide select-none text-center md:text-left" style={{letterSpacing: '0.04em'}}>
          © 2025 <span className="font-orbitron font-black uppercase">CICCO.AI</span>. All rights reserved.
        </div>
        <div className="flex flex-row gap-4 text-xs opacity-60 mt-2 md:mt-0">
          <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">Privacy Policy</a>
          <span>|</span>
          <a href="/terms-of-service.html" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
} 