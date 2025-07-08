import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useToast, useJudgeMode } from './_app';
import { Trophy, Rocket, UserCheck, Users, PlusCircle, Flame, Award, BarChart2, Link2, ShieldCheck, Gift, Lock, Info, Wallet, Target, Group, PiggyBank, UsersRound, LockKeyhole, Share2, X } from 'lucide-react';

const features = [
  { href: '/defi', label: 'DeFi', icon: '💸', desc: 'Lend, borrow, swap BTC natively.' },
  { href: '/privacy', label: 'Privacy', icon: '🕵️', desc: 'Shield BTC, private transfers.' },
  { href: '/social', label: 'Social', icon: '🌐', desc: 'On-chain profiles, community.' },
  { href: '/nft', label: 'NFT', icon: '🎨', desc: 'Mint, trade, launch NFTs.' },
  { href: '/bridge', label: 'Bridge', icon: '🌉', desc: 'Move BTC between chains.' },
];

const stats = [
  { label: 'BTC Locked', value: '1,234.56' },
  { label: 'Shielded BTC', value: '567.89' },
  { label: 'Active Users', value: '8,765' },
  { label: 'DeFi TVL', value: '$12,345,678' },
];

const badges = [
  { icon: <Rocket size={20} />, label: 'Early Adopter', earned: true },
  { icon: <UserCheck size={20} />, label: 'Consistent User', earned: true },
  { icon: <Trophy size={20} />, label: 'Top Performer', earned: false },
];

const activity = [
  { icon: <PlusCircle size={18} />, desc: 'Deposited 0.1 BTC', time: '2m ago' },
  { icon: <Users size={18} />, desc: 'Joined Community', time: '1h ago' },
  { icon: <Rocket size={18} />, desc: 'Earned "Early Adopter" badge', time: '1d ago' },
];

export default function Home() {
  const [lang, setLang] = React.useState('EN');
  const toast = useToast();
  const { judgeMode } = useJudgeMode();
  const handleLang = (l: string) => {
    setLang(l);
    toast.show(`Language switched to ${l} (demo)`, 'info');
  };
  // Simulate user name for demo
  const userName = 'Satoshi';
  const [progressOpen, setProgressOpen] = React.useState(false);
  const [assetModal, setAssetModal] = React.useState(false);
  const [legacyModal, setLegacyModal] = React.useState(false);
  const [giftModal, setGiftModal] = React.useState(false);
  const [securityModal, setSecurityModal] = React.useState(false);
  const [giftRecipient, setGiftRecipient] = React.useState('');
  const [giftAmount, setGiftAmount] = React.useState('');
  const [giftMessage, setGiftMessage] = React.useState('');
  const topGifters = [
    { name: 'Alice', amount: '0.25 BTC' },
    { name: 'Bob', amount: '0.18 BTC' },
    { name: 'Satoshi', amount: '0.15 BTC' },
  ];
  const [assetType, setAssetType] = React.useState('ETH');
  const [assetAmount, setAssetAmount] = React.useState('');
  const assetBalances = { ETH: '2.50', USDC: '1200', BTC: '0.15' };
  const [beneficiary, setBeneficiary] = React.useState('');
  const [timelock, setTimelock] = React.useState('');
  const [beneficiaries, setBeneficiaries] = React.useState([]);
  const [createCircleOpen, setCreateCircleOpen] = React.useState(false);
  const [circles, setCircles] = React.useState([
    {
      name: 'Citrea OG Stackers',
      desc: 'Early adopters stacking sats together',
      privacy: 'public',
      members: 5,
      streak: 12,
      link: 'https://citrea.app/circle/og-stackers',
    },
  ]);
  const [circleName, setCircleName] = React.useState('');
  const [circleDesc, setCircleDesc] = React.useState('');
  const [circlePrivacy, setCirclePrivacy] = React.useState('public');
  const [circleModal, setCircleModal] = React.useState<null | number>(null);
  const [circleTab, setCircleTab] = React.useState<'feed' | 'vote'>('feed');
  const [chatInput, setChatInput] = React.useState('');
  const [circleMessages, setCircleMessages] = React.useState([
    [
      { user: 'Alice', msg: 'Stacked 10k sats today! 🚀', proof: true },
      { user: 'Bob', msg: "Let's hit a new streak record!", proof: false },
    ],
  ]);
  const [showCreateCircleTip, setShowCreateCircleTip] = useState(true);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [showCitreaTip, setShowCitreaTip] = useState(false);

  // Mock/demo data for Judge Mode
  const judgeStats = [
    { label: 'BTC Locked', value: '9,999.99' },
    { label: 'Shielded BTC', value: '8,888.88' },
    { label: 'Active Users', value: '42,000' },
    { label: 'DeFi TVL', value: '$99,999,999' },
  ];
  const judgeBadges = [
    { icon: <Rocket size={20} />, label: 'Early Adopter', earned: true },
    { icon: <UserCheck size={20} />, label: 'Consistent User', earned: true },
    { icon: <Trophy size={20} />, label: 'Top Performer', earned: true },
    { icon: <Award size={20} />, label: 'DAO Voter', earned: true },
  ];
  const judgeActivity = [
    { icon: <PlusCircle size={18} />, desc: 'Deposited 1 BTC', time: '1m ago' },
    { icon: <Users size={18} />, desc: 'Created "Citrea Judges Circle"', time: '2m ago' },
    { icon: <Rocket size={18} />, desc: 'Earned "DAO Voter" badge', time: '3m ago' },
    { icon: <Gift size={18} />, desc: 'Gifted 0.5 BTC to Alice', time: '5m ago' },
  ];
  const judgeCircles = [
    {
      name: 'Citrea Judges Circle',
      desc: 'Demo group for hackathon judges',
      privacy: 'private',
      members: 12,
      streak: 99,
      link: 'https://citrea.app/circle/judges',
    },
    {
      name: 'DAO Stackers',
      desc: 'DAO-powered stacking club',
      privacy: 'public',
      members: 30,
      streak: 45,
      link: 'https://citrea.app/circle/dao',
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Judge Mode Banner */}
      {judgeMode && (
        <div className="fixed top-0 left-0 w-full bg-blue-600 text-white text-center py-2 z-50 shadow-lg animate-fade-in-down">
          Judge Mode: All features are demoed with mock data. Citrea zk-rollup integration is highlighted throughout the app.
        </div>
      )}
      {/* Language Switcher */}
      <div className="fixed top-4 right-6 z-50 flex gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full shadow border border-white/10">
        {['EN', 'ES', '中文'].map(l => (
          <button
            key={l}
            className={`px-2 py-1 rounded-full font-bold text-xs md:text-sm transition-all duration-150 ${lang === l ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow' : 'text-gray-200 hover:bg-white/20'}`}
            onClick={() => handleLang(l)}
          >
            {l}
          </button>
        ))}
      </div>
      {/* User Greeting */}
      <div className="z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between mt-20 mb-8 px-6">
        <div className="flex flex-col items-start gap-2">
          <span className="text-lg text-gray-400">Welcome back,</span>
          <span className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg tracking-tight">{userName} 👋</span>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 flex items-center gap-2">
            <PlusCircle size={20} /> Get Started
          </button>
          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 flex items-center gap-2">
            <Users size={20} /> Join Community
          </button>
        </div>
      </div>
      {/* Streak Card */}
      <div className="z-10 w-full max-w-4xl px-6 mb-8">
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6">
          <Flame size={28} className="text-orange-400" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white">Weekly Streak</span>
              <span className="text-orange-400 font-bold">6/7 days</span>
            </div>
            <div className="w-full h-3 bg-gray-800 rounded-full mt-2">
              <div className="h-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full" style={{ width: '86%' }}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Stat Cards */}
      <div className="z-10 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl px-6 mb-10">
        {(judgeMode ? judgeStats : stats).map(s => (
          <div key={s.label} className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 min-w-[120px]">
            <span className="text-xs text-gray-400 mb-1">{s.label}</span>
            <span className="text-2xl font-extrabold text-white">{s.value}</span>
          </div>
        ))}
      </div>
      {/* Badges/Achievements */}
      <div className="z-10 w-full max-w-4xl px-6 mb-10">
        <h3 className="text-lg font-bold text-gray-300 mb-3">Your Badges</h3>
        <div className="flex gap-4">
          {(judgeMode ? judgeBadges : badges).map(b => (
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
          {(judgeMode ? judgeActivity : activity).map((a, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl shadow p-4">
              <span className="text-blue-400">{a.icon}</span>
              <span className="text-gray-200 flex-1">{a.desc}</span>
              <span className="text-xs text-gray-400">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Growth Rewards & Recognition */}
      <div className="z-10 w-full max-w-4xl px-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3">
              <Flame size={28} className="text-orange-400" />
              <span className="text-lg font-bold text-white">Growth Rewards & Recognition</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex flex-col items-center">
                <Flame size={22} className="text-orange-400" />
                <span className="text-xs text-gray-300 mt-1">30-day streak</span>
              </div>
              <div className="flex flex-col items-center">
                <Award size={22} className="text-yellow-400" />
                <span className="text-xs text-gray-300 mt-1">Goal Crusher NFT</span>
              </div>
              <div className="flex flex-col items-center">
                <BarChart2 size={22} className="text-blue-400" />
                <span className="text-xs text-gray-300 mt-1">#5 Leaderboard</span>
              </div>
            </div>
            <button
              className="mt-4 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition-all duration-200 w-max"
              onClick={() => setProgressOpen(true)}
            >
              View Progress
            </button>
          </div>
        </div>
        {/* Progress Modal */}
        {progressOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-4 relative border border-white/10">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
                onClick={() => setProgressOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Flame size={24} className="text-orange-400" /> Progress Overview
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Flame size={20} className="text-orange-400" />
                  <span className="text-gray-200">Streak: <span className="font-bold text-orange-400">30 days</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-yellow-400" />
                  <span className="text-gray-200">Milestone: <span className="font-bold text-yellow-400">Goal Crusher NFT</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart2 size={20} className="text-blue-400" />
                  <span className="text-gray-200">Leaderboard: <span className="font-bold text-blue-400">#5 Global</span></span>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-bold text-gray-300 mb-2">Badges</h4>
                <div className="flex gap-3">
                  <Rocket size={20} className="text-green-400" />
                  <Trophy size={20} className="text-yellow-400" />
                  <UserCheck size={20} className="text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Feature Cards Section */}
      <div className="z-10 w-full max-w-4xl px-6 mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Connect Assets */}
        <div className="flex flex-col gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3">
            <Link2 size={28} className="text-blue-400" />
            <span className="text-lg font-bold text-white">Connect Assets</span>
          </div>
          <span className="text-gray-300 text-sm">Seamlessly contribute from any blockchain. ETH, USDC, and more are auto-converted to BTC for your savings.</span>
          <button className="mt-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition-all duration-200 w-max" onClick={() => setAssetModal(true)}>
            Connect Assets
          </button>
        </div>
        {/* Secure Legacy */}
        <div className="flex flex-col gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck size={28} className="text-green-400" />
            <span className="text-lg font-bold text-white">Secure Legacy</span>
          </div>
          <span className="text-gray-300 text-sm">Protect your Bitcoin with programmable inheritance vaults. Set beneficiaries and time-locks for future generations.</span>
          <button className="mt-2 px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold shadow hover:scale-105 transition-all duration-200 w-max" onClick={() => setLegacyModal(true)}>
            Secure Legacy
          </button>
        </div>
        {/* Send Gift */}
        <div className="flex flex-col gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3">
            <Gift size={28} className="text-pink-400" />
            <span className="text-lg font-bold text-white">Send Gift</span>
          </div>
          <span className="text-gray-300 text-sm">Send Bitcoin gifts to friends and family with personal messages. Climb the generosity leaderboard and earn exclusive SBTs.</span>
          <button className="mt-2 px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition-all duration-200 w-max" onClick={() => setGiftModal(true)}>
            Send Gift
          </button>
        </div>
        {/* Security */}
        <div className="flex flex-col gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3">
            <Lock size={28} className="text-yellow-400" />
            <span className="text-lg font-bold text-white">Security</span>
          </div>
          <span className="text-gray-300 text-sm">All transactions settle on Bitcoin L1 via Citrea's ZK-Rollup. Enjoy instant, secure, and final settlement.</span>
          <button className="mt-2 px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-bold shadow hover:scale-105 transition-all duration-200 w-max" onClick={() => setSecurityModal(true)}>
            Learn More
          </button>
        </div>
      </div>
      {/* Modals for each feature */}
      {assetModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-4 relative border border-white/10">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none" onClick={() => setAssetModal(false)} aria-label="Close">&times;</button>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"><Link2 size={24} className="text-blue-400" /> Connect Assets</h3>
            <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); toast.show('Assets connected! (demo)', 'success'); setAssetModal(false); }}>
              <label className="text-gray-300 font-semibold">Asset</label>
              <select
                className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                value={assetType}
                onChange={e => setAssetType(e.target.value)}
              >
                <option value="ETH">ETH</option>
                <option value="USDC">USDC</option>
                <option value="BTC">BTC</option>
              </select>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                Balance: <span className="text-white font-bold">{assetBalances[assetType as keyof typeof assetBalances]}</span> {assetType}
              </div>
              <input
                type="number"
                className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                placeholder="Amount"
                value={assetAmount}
                onChange={e => setAssetAmount(e.target.value)}
                min="0"
                step="any"
                required
              />
              <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition-all duration-200 w-max self-end">
                <Link2 size={18} className="inline-block mr-2" /> Connect
              </button>
            </form>
            <div className="mt-4 text-xs text-gray-400">(Demo) Assets will be auto-converted to BTC for your savings.</div>
          </div>
        </div>
      )}
      {legacyModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-4 relative border border-white/10">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none" onClick={() => setLegacyModal(false)} aria-label="Close">&times;</button>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"><ShieldCheck size={24} className="text-green-400" /> Secure Legacy</h3>
            <form className="flex flex-col gap-4" onSubmit={e => {
              e.preventDefault();
              if (!beneficiary || !timelock) return;
              setBeneficiaries(prev => [...prev, { beneficiary, timelock }]);
              setBeneficiary('');
              setTimelock('');
              toast.show('Beneficiary added! (demo)', 'success');
            }}>
              <input
                type="text"
                className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400 text-base"
                placeholder="Beneficiary address"
                value={beneficiary}
                onChange={e => setBeneficiary(e.target.value)}
                required
              />
              <input
                type="number"
                className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-400 text-base"
                placeholder="Time-lock (days)"
                value={timelock}
                onChange={e => setTimelock(e.target.value)}
                min="1"
                required
              />
              <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold shadow hover:scale-105 transition-all duration-200 w-max self-end">
                <ShieldCheck size={18} className="inline-block mr-2" /> Add Beneficiary
              </button>
            </form>
            <div className="mt-6">
              <h4 className="text-lg font-bold text-gray-300 mb-2 flex items-center gap-2"><Users size={18} className="text-green-400" /> Beneficiaries</h4>
              <div className="flex flex-col gap-2">
                {beneficiaries.length === 0 && <span className="text-gray-500">No beneficiaries added yet.</span>}
                {beneficiaries.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2">
                    <span className="text-green-400 font-bold">{b.beneficiary}</span>
                    <span className="text-gray-300 ml-auto">Time-lock: {b.timelock} days</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {giftModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-4 relative border border-white/10">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none" onClick={() => setGiftModal(false)} aria-label="Close">&times;</button>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"><Gift size={24} className="text-pink-400" /> Send Gift</h3>
            <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); toast.show('Gift sent! (demo)', 'success'); setGiftModal(false); }}>
              <input
                type="text"
                className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400 text-base"
                placeholder="Recipient address or username"
                value={giftRecipient}
                onChange={e => setGiftRecipient(e.target.value)}
                required
              />
              <input
                type="number"
                className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400 text-base"
                placeholder="Amount (BTC)"
                value={giftAmount}
                onChange={e => setGiftAmount(e.target.value)}
                min="0"
                step="any"
                required
              />
              <textarea
                className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400 text-base"
                placeholder="Personal message (optional)"
                value={giftMessage}
                onChange={e => setGiftMessage(e.target.value)}
              />
              <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition-all duration-200 w-max self-end">
                <Gift size={18} className="inline-block mr-2" /> Send
              </button>
            </form>
            <div className="mt-6">
              <h4 className="text-lg font-bold text-gray-300 mb-2 flex items-center gap-2"><Trophy size={18} className="text-yellow-400" /> Top Gifters</h4>
              <div className="flex flex-col gap-2">
                {topGifters.map((g, i) => (
                  <div key={g.name} className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2">
                    <span className="text-pink-400 font-bold">#{i + 1}</span>
                    <span className="text-white font-semibold">{g.name}</span>
                    <span className="text-gray-300 ml-auto">{g.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {securityModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-4 relative border border-white/10">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none" onClick={() => setSecurityModal(false)} aria-label="Close">&times;</button>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"><Lock size={24} className="text-yellow-400" /> Security</h3>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-3">
                <ShieldCheck size={22} className="text-green-400" />
                <span className="text-gray-200">ZK-Rollup: All transactions are bundled and proven with zero-knowledge cryptography for privacy and scalability.</span>
              </div>
              <div className="flex items-center gap-3">
                <Award size={22} className="text-blue-400" />
                <span className="text-gray-200">Bitcoin L1 Settlement: Every transaction is ultimately settled on Bitcoin Layer 1 for unmatched security.</span>
              </div>
              <div className="flex items-center gap-3">
                <Rocket size={22} className="text-pink-400" />
                <span className="text-gray-200">Lightning-Fast: Enjoy instant transactions with Bitcoin finality, powered by Citrea's rollup technology.</span>
              </div>
            </div>
            <a href="#" className="mt-6 text-blue-400 hover:underline text-sm font-semibold self-end">Learn More</a>
          </div>
        </div>
      )}
      {/* Quick Actions Row */}
      <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-end px-4 md:px-8 mt-2 mb-4 z-40">
        <div className="relative">
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow-md text-base hover:scale-105 hover:shadow-xl transition-all duration-200 backdrop-blur-md"
            onClick={() => setCreateCircleOpen(true)}
            onMouseEnter={() => setShowCreateCircleTip(true)}
            onMouseLeave={() => setShowCreateCircleTip(false)}
          >
            <UsersRound size={18} /> Create Circle
          </button>
          {showCreateCircleTip && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 bg-white/90 text-gray-900 text-xs rounded-lg shadow-lg px-4 py-2 z-50 border border-blue-400 animate-fade-in-up">
              Start a new stacking group! Circles let you save, chat, and vote together. Invite friends and stack sats as a team.
            </div>
          )}
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow-md text-base hover:scale-105 hover:shadow-xl transition-all duration-200 backdrop-blur-md"
          onClick={() => toast.show('History coming soon!', 'info')}
        >
          <span>📜</span> History
        </button>
        <button
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold shadow-md text-base hover:scale-105 hover:shadow-xl transition-all duration-200 backdrop-blur-md"
          onClick={() => toast.show('Insights coming soon!', 'info')}
        >
          <span>📊</span> Insights
        </button>
        <button
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-bold shadow-md text-base hover:scale-105 hover:shadow-xl transition-all duration-200 backdrop-blur-md"
          onClick={() => toast.show('Notifications coming soon!', 'info')}
        >
          <span>🔔</span> Enable Notifications
        </button>
      </div>
      {/* Create Circle Modal */}
      {createCircleOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-4 relative border border-white/10">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none" onClick={() => setCreateCircleOpen(false)} aria-label="Close"><X size={28} /></button>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"><UsersRound size={22} className="text-blue-400" /> Create New Stacking Circle</h3>
            <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); setCircles([...circles, { name: circleName, desc: circleDesc, privacy: circlePrivacy, members: 1, streak: 1, link: 'https://citrea.app/circle/' + circleName.toLowerCase().replace(/\s+/g, '-') }]); setCreateCircleOpen(false); setCircleName(''); setCircleDesc(''); setCirclePrivacy('public'); }}>
              <input
                type="text"
                className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                placeholder="Circle Name"
                value={circleName}
                onChange={e => setCircleName(e.target.value)}
                required
              />
              <input
                type="text"
                className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                placeholder="Description"
                value={circleDesc}
                onChange={e => setCircleDesc(e.target.value)}
              />
              <div className="flex items-center gap-3">
                <label className="text-gray-300 text-sm">Privacy:</label>
                <select
                  className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                  value={circlePrivacy}
                  onChange={e => setCirclePrivacy(e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition-all duration-200 w-max self-end">
                <PlusCircle size={18} className="inline-block mr-2" /> Create
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Your Circles Section */}
      <div className="z-10 w-full max-w-4xl px-6 mb-8">
        <h3 className="text-lg font-bold text-gray-300 mb-3 flex items-center gap-2"><UsersRound size={18} className="text-blue-400" /> Your Circles</h3>
        <div className="flex flex-wrap gap-4">
          {circles.map((circle, i) => (
            <button key={i} className="flex flex-col gap-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-5 min-w-[220px] max-w-xs hover:scale-105 hover:shadow-2xl transition-all duration-200 text-left" onClick={() => setCircleModal(i)}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-white">{circle.name}</span>
                {circle.privacy === 'private' ? <LockKeyhole size={16} className="text-pink-400" /> : <Share2 size={16} className="text-blue-400" />}
              </div>
              <span className="text-gray-300 text-sm">{circle.desc}</span>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-gray-400 flex items-center gap-1"><Users size={14} /> {circle.members} members</span>
                <span className="text-xs text-orange-400 flex items-center gap-1"><Flame size={14} /> {circle.streak}d streak</span>
              </div>
              <span className="text-xs text-blue-400 hover:underline mt-1 flex items-center gap-1"><Link2 size={12} /> Join</span>
            </button>
          ))}
        </div>
      </div>
      {/* Circle Modal */}
      {circleModal !== null && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-4 relative border border-white/10">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none" onClick={() => setCircleModal(null)} aria-label="Close"><X size={28} /></button>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold text-white">{circles[circleModal].name}</span>
              {circles[circleModal].privacy === 'private' ? <LockKeyhole size={18} className="text-pink-400" /> : <Share2 size={18} className="text-blue-400" />}
              <span className="ml-auto text-xs text-blue-400 flex items-center gap-1"><Link2 size={12} /> <a href={circles[circleModal].link} className="hover:underline" target="_blank" rel="noopener noreferrer">Invite</a></span>
            </div>
            <span className="text-gray-300 text-sm mb-2">{circles[circleModal].desc}</span>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs text-gray-400 flex items-center gap-1"><Users size={14} /> {circles[circleModal].members} members</span>
              <span className="text-xs text-orange-400 flex items-center gap-1"><Flame size={14} /> {circles[circleModal].streak}d streak</span>
              <span className="text-xs text-gray-400 flex items-center gap-1"><ShieldCheck size={14} /> Privacy: <span className="font-bold">{circles[circleModal].privacy}</span></span>
            </div>
            {/* Tabs */}
            <div className="flex gap-2 mb-2">
              <button className={`px-4 py-2 rounded-lg font-bold text-sm ${circleTab === 'feed' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-white/10 text-gray-300'}`} onClick={() => setCircleTab('feed')}>Feed</button>
              <button className={`px-4 py-2 rounded-lg font-bold text-sm ${circleTab === 'vote' ? 'bg-gradient-to-r from-pink-500 to-yellow-400 text-white' : 'bg-white/10 text-gray-300'}`} onClick={() => setCircleTab('vote')}>Vote</button>
            </div>
            {/* Feed Tab */}
            {circleTab === 'feed' && (
              <div className="flex flex-col gap-3 max-h-56 overflow-y-auto mb-2">
                {(circleMessages[circleModal] || []).map((msg, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                    <span className="font-bold text-blue-300">{msg.user}</span>
                    <span className="text-gray-200 flex-1">{msg.msg}</span>
                    {msg.proof && <span className="text-xs text-green-400 font-bold flex items-center gap-1"><ShieldCheck size={12} /> Proof</span>}
                  </div>
                ))}
              </div>
            )}
            {/* Vote Tab */}
            {circleTab === 'vote' && (
              <div className="flex flex-col gap-3 max-h-56 overflow-y-auto mb-2">
                <div className="flex flex-col gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <span className="font-bold text-yellow-400">Proposal: Donate 0.01 BTC to OpenSats</span>
                  <div className="flex gap-2 mt-2">
                    <button className="px-4 py-2 rounded-lg bg-green-500/80 text-white font-bold hover:bg-green-600">Yes</button>
                    <button className="px-4 py-2 rounded-lg bg-red-500/80 text-white font-bold hover:bg-red-600">No</button>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">Voting ends in 2h</span>
                </div>
              </div>
            )}
            {/* Chat Input */}
            {circleTab === 'feed' && (
              <form className="flex gap-2 mt-2" onSubmit={e => { e.preventDefault(); if (!chatInput) return; const msgs = [...(circleMessages[circleModal] || []), { user: 'You', msg: chatInput, proof: false }]; const newMsgs = [...circleMessages]; newMsgs[circleModal] = msgs; setCircleMessages(newMsgs); setChatInput(''); }}>
                <input
                  type="text"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                  placeholder="Send a message or proof-of-stack..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                />
                <button type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition-all duration-200">Send</button>
              </form>
            )}
          </div>
        </div>
      )}
      {/* How it Works Section */}
      <div className="z-10 w-full max-w-4xl px-6 mb-16">
        <h3 className="text-xl font-bold text-white mb-6">How Citrea Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6">
            <Wallet size={32} className="text-blue-400" />
            <span className="text-lg font-bold text-white">Connect Wallet</span>
            <span className="text-gray-300 text-sm text-center">Connect your wallet for seamless onboarding and secure access.</span>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6">
            <Group size={32} className="text-green-400" />
            <span className="text-lg font-bold text-white">Create Circle</span>
            <span className="text-gray-300 text-sm text-center">Set up a savings circle, invite friends, and start your journey together.</span>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6">
            <Target size={32} className="text-pink-400" />
            <span className="text-lg font-bold text-white">Set Goal</span>
            <span className="text-gray-300 text-sm text-center">Define your savings goal, timeline, and contribution schedule.</span>
          </div>
          {/* Step 4 */}
          <div className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6">
            <PiggyBank size={32} className="text-yellow-400" />
            <span className="text-lg font-bold text-white">Start Saving</span>
            <span className="text-gray-300 text-sm text-center">Contribute, track progress, and celebrate milestones with your circle.</span>
          </div>
        </div>
      </div>
      {/* Powered by Citrea & Resources */}
      <div className="w-full flex flex-col items-center gap-2 mt-10 mb-4 opacity-80">
        <span
          className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer"
          onMouseEnter={() => setShowCitreaTip(true)}
          onMouseLeave={() => setShowCitreaTip(false)}
        >
          Powered by <span className="font-bold text-blue-400">Citrea</span> <ShieldCheck size={14} className="text-blue-400" />
        </span>
        {showCitreaTip && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 bg-white/90 text-gray-900 text-xs rounded-lg shadow-lg px-4 py-2 z-50 border border-blue-400 animate-fade-in-up">
            Citrea brings Bitcoin to DeFi with zk-rollups. <a href="https://docs.citrea.xyz/developer-documentation/deployment-guide" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Learn more in the docs</a>.
          </div>
        )}
        <div className="flex gap-3 flex-wrap justify-center">
          <a href="https://docs.citrea.xyz/developer-documentation/deployment-guide" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">Docs</a>
          <a href="https://citrea.xyz/faucet" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">Testnet Faucet</a>
          <a href="https://discord.com/invite/citrea" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">Discord</a>
          <a href="https://github.com/chainwayxyz/citrea" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">GitHub</a>
        </div>
      </div>
      {/* Connect Wallet Button */}
      {!walletConnected && (
        <div className="w-full flex justify-end px-4 md:px-8 mt-4">
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-md text-base hover:scale-105 hover:shadow-xl transition-all duration-200 backdrop-blur-md"
            onClick={() => setShowWalletModal(true)}
          >
            <Wallet size={18} /> Connect Wallet
          </button>
        </div>
      )}
      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-4 relative border border-white/10">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none" onClick={() => setShowWalletModal(false)} aria-label="Close"><X size={28} /></button>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"><Wallet size={22} className="text-blue-400" /> Connect Demo/Testnet Wallet</h3>
            <div className="flex flex-col gap-3">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition-all duration-200" onClick={() => { setWalletConnected(true); setShowWalletModal(false); }}>Connect Demo Wallet</button>
              <a href="https://citrea.xyz/faucet" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">Get Testnet BTC from Faucet</a>
            </div>
            <div className="mt-4 text-xs text-gray-400">(Demo) This is a simulated wallet connection for hackathon judging. Integrate with real wallets for production.</div>
          </div>
        </div>
      )}
    </div>
  );
} 