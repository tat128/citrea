import React, { useState } from 'react';
import { useToast } from './_app';
import { Trophy, Rocket, Shuffle, PlusCircle } from 'lucide-react';

// Transaction type
interface Transaction {
  id: number;
  type: string;
  amount: string;
  status: string;
  time: string;
  tx: string;
}

const dummyHistory: Transaction[] = [
  { id: 1, type: 'Deposit', amount: '0.1', status: 'Confirmed', time: '2m ago', tx: '0xabc...' },
  { id: 2, type: 'Withdraw', amount: '0.05', status: 'Pending', time: 'just now', tx: '0xdef...' },
];

const stats = [
  { label: 'BTC Bridged', value: '0.00' },
  { label: 'Bridge Users', value: '0' },
  { label: 'Pending Tx', value: '0' },
  { label: 'Completed Tx', value: '0' },
];

const actions = [
  { label: 'Deposit', desc: 'Bridge BTC to zkEVM', icon: '⬇️', color: 'from-blue-400 to-purple-400' },
  { label: 'Withdraw', desc: 'Bridge BTC to Bitcoin', icon: '⬆️', color: 'from-pink-400 to-blue-400' },
  { label: 'History', desc: 'View bridge history', icon: '📜', color: 'from-green-400 to-blue-400' },
];

const badges = [
  { icon: <Rocket size={20} />, label: 'Bridge Pioneer', earned: true },
  { icon: <Shuffle size={20} />, label: 'Bridge Master', earned: false },
  { icon: <Trophy size={20} />, label: 'Top Bridger', earned: false },
];

const activity = [
  { icon: <PlusCircle size={18} />, desc: 'Bridged 0.03 BTC', time: '20m ago' },
  { icon: <Shuffle size={18} />, desc: 'Completed Bridge', time: '4h ago' },
  { icon: <Rocket size={18} />, desc: 'Earned "Bridge Pioneer" badge', time: '2d ago' },
];

export default function Bridge() {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const toast = useToast();
  const userName = 'Satoshi';
  const bridgeStats = stats;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* User Greeting */}
      <div className="z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between mt-20 mb-8 px-6">
        <div className="flex flex-col items-start gap-2">
          <span className="text-lg text-gray-400">Bridge Dashboard for</span>
          <span className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg tracking-tight">{userName}</span>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 flex items-center gap-2">
            <PlusCircle size={20} /> Bridge
          </button>
        </div>
      </div>
      {/* Stat Cards */}
      <div className="z-10 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl px-6 mb-10">
        {bridgeStats.map(s => (
          <div key={s.label} className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 min-w-[120px]">
            <span className="text-xs text-gray-400 mb-1">{s.label}</span>
            <span className="text-2xl font-extrabold text-white">{s.value}</span>
          </div>
        ))}
      </div>
      {/* Badges/Achievements */}
      <div className="z-10 w-full max-w-4xl px-6 mb-10">
        <h3 className="text-lg font-bold text-gray-300 mb-3">Your Bridge Badges</h3>
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
      {/* Bridge Panel */}
      <div className="z-10 w-full max-w-xl bg-white/20 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-8 mb-12 animate-fade-in-up">
        <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Bridge BTC</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <input
            type="number"
            className="flex-1 px-6 py-4 rounded-2xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl shadow-lg"
            placeholder="Amount (BTC)"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            min="0"
            step="any"
          />
          <button
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-extrabold text-xl shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-200 border-2 border-white/10"
            onClick={() => {
              if (!amount) {
                toast.show('Please enter an amount.', 'error');
                return;
              }
              setStatus('Bridge transaction submitted! (demo)');
              toast.show('Bridge transaction submitted! (demo)', 'success');
            }}
          >
            Bridge
          </button>
        </div>
        {status && <div className="mt-2 text-center text-green-400 font-semibold">{status}</div>}
      </div>
    </div>
  );
} 