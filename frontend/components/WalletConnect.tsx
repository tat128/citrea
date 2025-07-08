import React, { useEffect, useState } from 'react';
import { useAccount, useBalance, useNetwork, useDisconnect } from 'wagmi';
import { useConnect } from 'wagmi';
import { useToast } from '../pages/_app';

function getAvatar(address: string | undefined) {
  if (!address) return '👤';
  // Simple emoji avatar based on address
  const emojis = ['🦊', '🦉', '🐧', '🐼', '🐸', '🦄', '🐲', '🐙', '🦁', '🐻'];
  const idx = address.charCodeAt(2) % emojis.length;
  return emojis[idx];
}

export default function WalletConnect() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const toast = useToast();

  const handleConnect = (connector: any) => {
    connect({ connector });
    toast.show('Connecting wallet...', 'info');
  };

  const handleDisconnect = () => {
    disconnect();
    toast.show('Wallet disconnected', 'info');
  };

  if (!mounted) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-xs md:max-w-sm">
      <div className="relative bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl border-4 border-transparent bg-clip-padding p-8 flex flex-col items-center gap-6"
        style={{ borderImage: 'linear-gradient(90deg, #6366f1 0%, #ec4899 100%) 1' }}>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-md opacity-70 animate-pulse" />
        <div className="flex flex-col items-center gap-3">
          <div className="text-5xl md:text-6xl mb-2 select-none drop-shadow-[0_0_16px_rgba(99,102,241,0.5)] animate-pulse">
            {getAvatar(address)}
          </div>
          <div className="text-white font-extrabold text-xl tracking-wide">
            {isConnected ? (
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">Connected</span>
            ) : (
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">Wallet</span>
            )}
          </div>
          <div className="text-xs text-gray-300 font-mono">
            {isConnected && address ? (
              <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
            ) : (
              <span>Not connected</span>
            )}
          </div>
        </div>
        {isConnected && (
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="text-gray-200 text-base font-semibold">
              {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}
            </div>
            <div className="text-gray-400 text-xs">
              {chain?.name || 'Unknown Network'}
            </div>
          </div>
        )}
        <div className="w-full flex flex-col gap-3 mt-3">
          {!isConnected ? (
            connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => handleConnect(connector)}
                className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-extrabold shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-200 text-lg tracking-wide border-2 border-white/10"
              >
                Connect {connector.name}
              </button>
            ))
          ) : (
            <button
              onClick={handleDisconnect}
              className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-extrabold shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-200 text-lg tracking-wide border-2 border-white/10"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 