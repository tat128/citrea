import React, { useState } from 'react';
import { useToast } from './_app';
import { Trophy, Rocket, UserCheck, Banknote, PlusCircle, Flame, BarChart2 } from 'lucide-react';

const stats = [
  { label: 'BTC Locked', value: '0.00' },
  { label: 'TVL (USD)', value: '$0' },
  { label: 'Active Vaults', value: '0' },
  { label: 'DeFi Users', value: '0' },
];

const actions = [
  { label: 'Swap', desc: 'Swap BTC for other assets', icon: '🔄', color: 'from-green-400 to-blue-400' },
  { label: 'Lend', desc: 'Lend BTC and earn yield', icon: '💰', color: 'from-blue-400 to-purple-400' },
  { label: 'Borrow', desc: 'Borrow against your BTC', icon: '💳', color: 'from-purple-400 to-pink-400' },
];

const badges = [
  { icon: <Rocket size={20} />, label: 'DeFi Pioneer', earned: true },
  { icon: <UserCheck size={20} />, label: 'Lender', earned: false },
  { icon: <Trophy size={20} />, label: 'Top Vault', earned: false },
];

const activity = [
  { icon: <PlusCircle size={18} />, desc: 'Deposited 0.05 BTC', time: '5m ago' },
  { icon: <Banknote size={18} />, desc: 'Lent 0.01 BTC', time: '1h ago' },
  { icon: <Rocket size={18} />, desc: 'Earned "DeFi Pioneer" badge', time: '2d ago' },
];

export default function DeFi() {
  const [btcAmount, setBtcAmount] = useState('');
  const [status, setStatus] = useState('');
  const toast = useToast();
  const userName = 'Satoshi';
  const defiStats = stats;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* User Greeting */}
      <div className="z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between mt-20 mb-8 px-6">
        <div className="flex flex-col items-start gap-2">
          <span className="text-lg text-gray-400">DeFi Dashboard for</span>
          <span className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg tracking-tight">{userName}</span>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 flex items-center gap-2">
            <PlusCircle size={20} /> Deposit
          </button>
        </div>
      </div>
      {/* Vault Progress and Streak */}
      <div className="z-10 w-full max-w-4xl px-6 mb-8 flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6">
          <BarChart2 size={28} className="text-blue-400" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white">Vault Progress</span>
              <span className="text-blue-400 font-bold">80%</span>
            </div>
            <div className="w-full h-3 bg-gray-800 rounded-full mt-2">
              <div className="h-3 bg-gradient-to-r from-blue-400 to-green-400 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6">
          <Flame size={28} className="text-orange-400" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white">Streak</span>
              <span className="text-orange-400 font-bold">4/7 days</span>
            </div>
            <div className="w-full h-3 bg-gray-800 rounded-full mt-2">
              <div className="h-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full" style={{ width: '57%' }}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Stat Cards */}
      <div className="z-10 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl px-6 mb-10">
        {defiStats.map(s => (
          <div key={s.label} className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 min-w-[120px]">
            <span className="text-xs text-gray-400 mb-1">{s.label}</span>
            <span className="text-2xl font-extrabold text-white">{s.value}</span>
          </div>
        ))}
      </div>
      {/* Badges/Achievements */}
      <div className="z-10 w-full max-w-4xl px-6 mb-10">
        <h3 className="text-lg font-bold text-gray-300 mb-3">Your DeFi Badges</h3>
        <div className="flex gap-4">
          {badges.map(b => (
            <div key={b.label} className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl shadow-lg border-2 ${b.earned ? 'border-green-400 bg-gradient-to-br from-green-500/20 to-blue-500/10' : 'border-gray-700 bg-gray-800/40'} min-w-[100px]`}>
              <span className={`mb-1 ${b.earned ? 'text-green-400' : 'text-gray-500'}`}>{b.icon}</span>
              <span className="text-xs font-semibold text-gray-200">{b.label}</span>
              {b.earned && <span className="text-[10px] text-green-400 font-bold">Earned</span>}
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity Feed */}
      <div className="z-10 w-full max-w-4xl px-6 mb-10">
        <h3 className="text-lg font-bold text-gray-300 mb-3">Recent Activity</h3>
        <div className="flex flex-col gap-3">
          {activity.map((a, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl shadow p-4">
              <span className="text-blue-400">{a.icon}</span>
              <span className="text-gray-200 flex-1">{a.desc}</span>
              <span className="text-xs text-gray-400">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
      {/* BTC Vault Panel */}
      <div className="z-10 w-full max-w-xl bg-white/20 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-8 mb-12 animate-fade-in-up">
        <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">BTC Vault</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <input
            type="number"
            className="flex-1 px-6 py-4 rounded-2xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400 text-xl shadow-lg"
            placeholder="Amount (BTC)"
            value={btcAmount}
            onChange={e => setBtcAmount(e.target.value)}
            min="0"
            step="any"
          />
          <button
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-extrabold text-xl shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-200 border-2 border-white/10"
            onClick={() => {
              if (!btcAmount) {
                toast.show('Please enter an amount.', 'error');
                return;
              }
              setStatus('Deposit submitted! (demo)');
              toast.show('Deposit submitted! (demo)', 'success');
            }}
          >
            Deposit
          </button>
        </div>
        {status && <div className="mt-2 text-center text-green-400 font-semibold">{status}</div>}
      </div>
    </div>
  );
} 