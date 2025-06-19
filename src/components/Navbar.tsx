"use client";
import React, { useState } from "react";
import Link from "next/link";
import LogoGroup from "./LogoGroup";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#how" },
  { label: "Why It Works", href: "/#why" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "About", href: "/#about" },
  { label: "Book a Free Call", href: "/#cta" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-white shadow-lg shadow-primary-dark/10" style={{height: '3rem', minHeight: '3rem', maxHeight: '3rem', background: 'rgba(0,0,0,0.5)'}}>
      <div className="w-full flex items-center px-4 gap-x-8" style={{height: '3rem', minHeight: '3rem', maxHeight: '3rem'}}>
        {/* Left: Logo */}
        <Link href="/#hero" scroll={true} id="navbar-logo" className="flex items-center font-orbitron font-black text-xl md:text-2xl text-contrast tracking-widest select-none transition-colors whitespace-nowrap flex-shrink-0 gap-3 group hover:text-black">
          <LogoGroup className="navbar-logo-svg group-hover:logo-black" />
        </Link>
        {/* Center: Main nav links */}
        <ul className="hidden md:flex flex-1 gap-6 items-center justify-center whitespace-nowrap">
          {navLinks.filter(link => link.label !== "Book a Free Call").map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                scroll={true}
                className="font-bold text-contrast hover:text-primary transition-colors duration-200 text-sm md:text-base tracking-wide px-2 py-1 relative group text-center whitespace-nowrap uppercase"
                style={{ fontFamily: 'Instrument Sans, sans-serif', fontWeight: 500 }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Right: CTA (desktop only) */}
        <Link
          href="/#cta"
          scroll={true}
          className="cta-gradient-btn hidden md:inline-block navbar-cta px-4 py-2 rounded-lg font-bold transition-all duration-300 transform text-base uppercase"
          style={{ fontFamily: 'Instrument Sans, sans-serif', fontWeight: 500, height: '2.2rem', minHeight: '2.2rem', maxHeight: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem', boxSizing: 'border-box' }}
        >
          BOOK A FREE STRATEGY CALL
        </Link>
        {/* Right: Hamburger (mobile only) */}
        <button
          className="ml-auto md:hidden flex items-center justify-center text-white text-3xl focus:outline-none mr-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full px-4 pt-2 pb-4 z-50 animate-fadein">
          <div
            className="rounded-2xl shadow-2xl border border-white/30 p-4 flex flex-col gap-2"
            style={{
              background: 'linear-gradient(180deg, #000 0%, #2a1d4c 100%)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                scroll={true}
                className="font-bold text-white hover:text-primary transition-colors duration-200 text-base px-3 py-2 rounded-lg text-center uppercase"
                style={{ fontFamily: 'Instrument Sans, sans-serif', fontWeight: 500 }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
} 