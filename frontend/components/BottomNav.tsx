import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Banknote, Shield, Users, Image, Shuffle } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: <Home size={24} /> },
  { href: '/defi', label: 'DeFi', icon: <Banknote size={24} /> },
  { href: '/privacy', label: 'Privacy', icon: <Shield size={24} /> },
  { href: '/social', label: 'Social', icon: <Users size={24} /> },
  { href: '/nft', label: 'NFT', icon: <Image size={24} /> },
  { href: '/bridge', label: 'Bridge', icon: <Shuffle size={24} /> },
];

export default function BottomNav() {
  const router = useRouter();
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95vw] max-w-md z-50 flex md:hidden justify-around items-center bg-white/20 backdrop-blur-2xl border border-white/10 shadow-2xl py-4 px-2 rounded-2xl gap-1 animate-fade-in-up">
      {navLinks.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-base font-bold transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:scale-110 hover:shadow-xl ${router.pathname === link.href ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110 border-2 border-blue-400/60' : 'text-gray-400'}`}
        >
          <span>{link.icon}</span>
          <span className="text-xs font-semibold mt-0.5">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
} 