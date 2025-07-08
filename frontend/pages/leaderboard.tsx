import React, { useState } from 'react';
import { Trophy, Flame, Gift, UserCheck, Award } from 'lucide-react';

const demoUsers = [
  { name: 'Alice', savings: 1.25, streak: 30, gifts: 0.25, badges: ['Goal Crusher'], isCurrent: false },
  { name: 'Bob', savings: 0.98, streak: 22, gifts: 0.18, badges: ['Consistent Saver'], isCurrent: false },
  { name: 'Satoshi', savings: 0.75, streak: 18, gifts: 0.15, badges: ['Early Adopter'], isCurrent: true },
  { name: 'Charlie', savings: 0.60, streak: 10, gifts: 0.10, badges: [], isCurrent: false },
];

const categories = [
  { key: 'savings', label: 'Savings', icon: <Award size={18} className="text-yellow-400" /> },
  { key: 'streak', label: 'Streak', icon: <Flame size={18} className="text-orange-400" /> },
  { key: 'gifts', label: 'Gifting', icon: <Gift size={18} className="text-pink-400" /> },
];

export default function Leaderboard() {
  const [category, setCategory] = useState('savings');
  const sorted = [...demoUsers].sort((a, b) => b[category] - a[category]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg mb-8 text-center tracking-tight">Global Leaderboard</h1>
      {/* Filter Tabs */}
      <div className="flex gap-4 mb-10">
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-base transition-all duration-150 ${category === cat.key ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow' : 'text-gray-200 bg-white/10 hover:bg-white/20'}`}
            onClick={() => setCategory(cat.key)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>
      {/* Leaderboard Table */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4 text-gray-400 font-bold text-sm">
          <span>Rank</span>
          <span>User</span>
          <span>{category === 'savings' ? 'BTC Saved' : category === 'streak' ? 'Streak' : 'BTC Gifted'}</span>
          <span>Badges</span>
        </div>
        {sorted.map((u, i) => (
          <div key={u.name} className={`flex items-center justify-between gap-2 px-3 py-3 rounded-xl mb-2 ${u.isCurrent ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-2 border-blue-400/40' : 'bg-white/5'} ${i === 0 ? 'shadow-lg' : ''}`}>
            <span className="font-bold text-lg text-yellow-400 flex items-center gap-1">{i === 0 && <Trophy size={18} />}#{i + 1}</span>
            <span className={`font-semibold ${u.isCurrent ? 'text-white' : 'text-gray-200'}`}>{u.name} {u.isCurrent && <span className="ml-1 text-xs bg-blue-500/80 text-white px-2 py-0.5 rounded-full">You</span>}</span>
            <span className="font-bold text-white">{category === 'savings' ? `${u.savings} BTC` : category === 'streak' ? `${u.streak} days` : `${u.gifts} BTC`}</span>
            <span className="flex gap-1">
              {u.badges.map(b => (
                <span key={b} className="px-2 py-1 rounded-full bg-gradient-to-r from-green-400 to-blue-400 text-white text-xs font-semibold">{b}</span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 