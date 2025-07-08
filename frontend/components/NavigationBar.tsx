import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Banknote, Shield, Users, Image, Shuffle } from 'lucide-react';
import { useJudgeMode } from '../pages/_app';

const navLinks = [
  { href: '/', label: 'Home', icon: <Home size={20} /> },
  { href: '/defi', label: 'DeFi', icon: <Banknote size={20} /> },
  { href: '/privacy', label: 'Privacy', icon: <Shield size={20} /> },
  { href: '/social', label: 'Social', icon: <Users size={20} /> },
  { href: '/nft', label: 'NFT', icon: <Image size={20} /> },
  { href: '/bridge', label: 'Bridge', icon: <Shuffle size={20} /> },
];

export default function NavigationBar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { judgeMode, setJudgeMode } = useJudgeMode();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/20 backdrop-blur-2xl border-b border-white/10 shadow-2xl flex items-center justify-between px-4 md:px-10 py-3 rounded-b-2xl animate-fade-in-down">
      <div className="flex items-center gap-3">
        <Link href="/" className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg tracking-tight transition-all duration-200 hover:scale-105">
          Citrea
        </Link>
      </div>
      {/* Desktop Nav */}
      <div className="hidden md:flex gap-2 md:gap-4 items-center">
        {navLinks.map((link) => {
          const isActive = router.pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-base transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:shadow-xl ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg border-2 border-blue-400/60' : 'text-gray-200'}`}
            >
              {link.icon}
              {link.label}
              {isActive && (
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-2/3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></span>
              )}
            </Link>
          );
        })}
        {/* Judge Mode Toggle */}
        <div className="flex items-center gap-2 ml-6">
          <label htmlFor="judge-mode-toggle" className="text-xs font-semibold text-blue-300">Judge Mode</label>
          <input
            id="judge-mode-toggle"
            type="checkbox"
            checked={judgeMode}
            onChange={e => setJudgeMode(e.target.checked)}
            className="accent-blue-500 w-5 h-5 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      {/* Hamburger for Mobile */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/20 transition-all duration-150"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle navigation menu"
      >
        <span className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl flex flex-col items-center py-4 md:hidden animate-slide-down z-40 transition-all duration-300">
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative w-full text-center px-4 py-3 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition-all duration-150 hover:bg-white/10 hover:text-white ${isActive ? 'text-white' : 'text-gray-200'}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.icon}
                {link.label}
                {isActive && (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-1 h-0.5 w-2/3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
} 