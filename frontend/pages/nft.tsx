import React, { useState } from 'react';
import { Image as LucideImage, PlusCircle, X, Share2, Award, Flame } from 'lucide-react';

interface NFT {
  name: string;
  desc: string;
  img: string;
}

const demoNFTs: NFT[] = [
  { name: 'Citrea Genesis', desc: 'First NFT on Citrea', img: 'https://placehold.co/200x200?text=Genesis' },
  { name: 'zkEVM Pioneer', desc: 'Early adopter badge', img: 'https://placehold.co/200x200?text=zkEVM' },
];

const nftStats = [
  { label: 'NFTs Minted', value: '2' },
  { label: 'Badges', value: '1' },
  { label: 'Gallery Views', value: '123' },
  { label: 'Minted Today', value: '0' },
];

const badges = [
  { icon: <Award size={20} />, label: 'Genesis Holder', earned: true },
  { icon: <Flame size={20} />, label: 'Mint Streak', earned: false },
];

const activity = [
  { icon: <PlusCircle size={18} />, desc: 'Minted "Citrea Genesis"', time: '2m ago' },
  { icon: <LucideImage size={18} />, desc: 'Viewed NFT Gallery', time: '1h ago' },
];

export default function NFTPage() {
  const [mintOpen, setMintOpen] = useState(false);
  const [nfts, setNfts] = useState<NFT[]>(demoNFTs);
  const [mintName, setMintName] = useState('');
  const [mintDesc, setMintDesc] = useState('');
  const [mintImg, setMintImg] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const userName = 'Satoshi';
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* User Greeting */}
      <div className="z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between mt-20 mb-8 px-6">
        <div className="flex flex-col items-start gap-2">
          <span className="text-lg text-gray-400">NFT Dashboard for</span>
          <span className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 drop-shadow-lg tracking-tight">{userName}</span>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 flex items-center gap-2" onClick={() => setMintOpen(true)}>
            <PlusCircle size={20} /> Mint NFT
          </button>
        </div>
      </div>
      {/* Stat Cards */}
      <div className="z-10 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl px-6 mb-10">
        {nftStats.map(s => (
          <div key={s.label} className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 min-w-[120px]">
            <span className="text-xs text-gray-400 mb-1">{s.label}</span>
            <span className="text-2xl font-extrabold text-white">{s.value}</span>
          </div>
        ))}
      </div>
      {/* Badges/Achievements */}
      <div className="z-10 w-full max-w-4xl px-6 mb-10">
        <h3 className="text-lg font-bold text-gray-300 mb-3">Your NFT Badges</h3>
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
              <span className="text-pink-400">{a.icon}</span>
              <span className="text-gray-200 flex-1">{a.desc}</span>
              <span className="text-xs text-gray-400">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
      {/* NFT Collection Grid */}
      <div className="z-10 w-full max-w-4xl px-6 mb-16">
        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Your NFT Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
          {nfts.map((nft, i) => (
            <button key={i} className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-200" onClick={() => { setSelectedNFT(nft); setDetailsOpen(true); }}>
              <img src={nft.img} alt={nft.name} className="w-32 h-32 rounded-xl object-cover border-2 border-pink-400/30 shadow" />
              <span className="text-lg font-bold text-white mt-2">{nft.name}</span>
              <span className="text-gray-300 text-sm text-center">{nft.desc}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Mint NFT Modal */}
      {mintOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-4 relative border border-white/10">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none" onClick={() => setMintOpen(false)} aria-label="Close"><X size={28} /></button>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"><LucideImage size={24} className="text-pink-400" /> Mint New NFT</h3>
            <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); setNfts([...nfts, { name: mintName, desc: mintDesc, img: mintImg || 'https://placehold.co/200x200?text=NFT' }]); setMintOpen(false); setMintName(''); setMintDesc(''); setMintImg(''); }}>
              <input
                type="text"
                className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400 text-base"
                placeholder="NFT Name"
                value={mintName}
                onChange={e => setMintName(e.target.value)}
                required
              />
              <input
                type="text"
                className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400 text-base"
                placeholder="Description"
                value={mintDesc}
                onChange={e => setMintDesc(e.target.value)}
              />
              <input
                type="url"
                className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400 text-base"
                placeholder="Image URL (optional)"
                value={mintImg}
                onChange={e => setMintImg(e.target.value)}
              />
              <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition-all duration-200 w-max self-end">
                <PlusCircle size={18} className="inline-block mr-2" /> Mint
              </button>
            </form>
          </div>
        </div>
      )}
      {/* NFT Details Modal */}
      {detailsOpen && selectedNFT && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-4 relative border border-white/10">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none" onClick={() => setDetailsOpen(false)} aria-label="Close"><X size={28} /></button>
            <img src={selectedNFT.img} alt={selectedNFT.name} className="w-48 h-48 rounded-xl object-cover border-2 border-pink-400/30 shadow mx-auto" />
            <h3 className="text-2xl font-bold text-white mt-4 flex items-center gap-2"><LucideImage size={24} className="text-pink-400" /> {selectedNFT.name}</h3>
            <span className="text-gray-300 text-base text-center">{selectedNFT.desc}</span>
            <button className="mt-4 px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition-all duration-200 w-max self-center flex items-center gap-2" onClick={() => { setDetailsOpen(false); }}>
              <Share2 size={18} /> Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 