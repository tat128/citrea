import React, { useState } from 'react';
import { User, Award, Flame, UserCheck, Rocket } from 'lucide-react';

const demoAddress = '0x1234...abcd';
const demoBadges = [
  { icon: <Rocket size={20} className="text-green-400" />, label: 'Early Adopter' },
  { icon: <UserCheck size={20} className="text-blue-400" />, label: 'Verified' },
  { icon: <Award size={20} className="text-yellow-400" />, label: 'Goal Crusher' },
];

export default function Profile() {
  const [username, setUsername] = useState('Satoshi');
  const [bio, setBio] = useState('Building the future of Bitcoin.');
  const [saving, setSaving] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-extrabold text-3xl shadow-lg border-4 border-white/20">
            <User size={40} />
          </div>
          <span className="text-gray-400 text-xs mt-1">{demoAddress}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-bold text-white">{username}</span>
          <span className="text-gray-300 text-center">{bio}</span>
        </div>
        <form className="flex flex-col gap-4 w-full items-center" onSubmit={e => { e.preventDefault(); setSaving(true); setTimeout(() => setSaving(false), 1000); }}>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <textarea
            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400 text-base"
            placeholder="Bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
          <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition-all duration-200 w-max self-end">
            {saving ? 'Saving...' : 'Save'}
          </button>
        </form>
        <div className="w-full mt-6">
          <h4 className="text-lg font-bold text-gray-300 mb-2 flex items-center gap-2"><Award size={18} className="text-yellow-400" /> Badges</h4>
          <div className="flex gap-3">
            {demoBadges.map(b => (
              <div key={b.label} className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl shadow-lg border-2 border-blue-400/30 min-w-[100px] bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <span>{b.icon}</span>
                <span className="text-xs font-semibold text-gray-200">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mt-6 flex items-center gap-2 justify-center">
          <Flame size={22} className="text-orange-400" />
          <span className="text-gray-200 font-bold">Streak: 30 days</span>
        </div>
      </div>
    </div>
  );
} 