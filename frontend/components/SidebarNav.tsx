import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { Home, Banknote, Shield, Users, Image, Shuffle, User, Settings, LogOut, Trophy } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: <Home size={18} /> },
  { href: '/defi', label: 'DeFi', icon: <Banknote size={18} /> },
  { href: '/privacy', label: 'Privacy', icon: <Shield size={18} /> },
  { href: '/social', label: 'Social', icon: <Users size={18} /> },
  { href: '/nft', label: 'NFT', icon: <Image size={18} /> },
  { href: '/bridge', label: 'Bridge', icon: <Shuffle size={18} /> },
];

export default function SidebarNav() {
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  const router = useRouter();
  const { address, isConnected } = useAccount();
  if (!mounted) return null;
  return (
    <aside className="hidden md:flex flex-col justify-between h-screen w-52 bg-white/15 backdrop-blur-md border-r border-white/10 shadow-xl py-8 px-0 fixed left-0 top-0 z-50 overflow-y-auto">
      {/* Compact Card with Logo, Name, and User Avatar */}
      <div className="flex items-center gap-3 bg-white/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-md px-4 py-3 mx-3 mb-8 mt-2 min-h-[56px] max-h-[72px]">
        {/* App Logo */}
        <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-extrabold text-lg shadow">C</span>
        {/* App Name */}
        <span className="text-lg font-extrabold text-white tracking-tight ml-1">Citrea</span>
        {/* Spacer */}
        <div className="flex-1" />
        {/* User Avatar/Profile Button */}
        <button
          className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-base shadow border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400/40 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          onClick={() => setDropdownOpen(v => !v)}
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          {isConnected && address ? address.slice(2, 4) : '👤'}
        </button>
        {/* Profile Dropdown */}
        {dropdownOpen && (
          <div className="absolute top-16 right-4 z-50 w-40 bg-white/20 backdrop-blur-md border border-white/10 rounded-xl shadow-xl py-2 flex flex-col gap-1">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-white/30 focus:bg-white/30 rounded transition-all" onClick={() => { router.push('/profile'); setDropdownOpen(false); }} tabIndex={0}>
              <User size={16} /> Profile
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-white/30 focus:bg-white/30 rounded transition-all" onClick={() => { router.push('/settings'); setDropdownOpen(false); }} tabIndex={0}>
              <Settings size={16} /> Settings
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-white/30 focus:bg-white/30 rounded transition-all" tabIndex={0}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
      {/* Nav Items */}
      <nav className="flex flex-col gap-4 items-stretch flex-1 relative px-2" aria-label="Main navigation">
        {/* Sliding Indicator */}
        <div className="absolute left-0 top-0 w-1 h-12 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-xl transition-all duration-300" style={{ top: `${navLinks.findIndex(link => router.pathname === link.href) * 56}px` }} />
        {navLinks.map((link, idx) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 pl-4 pr-4 py-3 rounded-xl text-base font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/40 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:scale-105 hover:shadow-xl ${router.pathname === link.href ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105 border-2 border-blue-400/60' : 'text-gray-300'}`}
            tabIndex={0}
          >
            <span>{link.icon}</span>
            <span className="text-base font-semibold">{link.label}</span>
          </Link>
        ))}
        <div className="w-10 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-40 my-4 rounded-full self-center" />
        <Link
          href="/leaderboard"
          className={`flex items-center gap-3 pl-4 pr-4 py-3 rounded-xl text-base font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-400 hover:text-white hover:scale-105 hover:shadow-xl ${router.pathname === '/leaderboard' ? 'bg-gradient-to-r from-yellow-400 to-pink-400 text-white shadow-lg scale-105 border-2 border-yellow-400/60' : 'text-gray-300'}`}
          tabIndex={0}
        >
          <span><Trophy size={18} /></span>
          <span className="text-base font-semibold">Leaderboard</span>
        </Link>
      </nav>
      <div className="flex flex-col items-center gap-2 mt-8 mb-2">
        <span className="text-xs text-gray-400 mt-1">Profile</span>
      </div>
    </aside>
  );
} 