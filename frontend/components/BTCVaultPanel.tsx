import React, { useState, useEffect } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { getBTCBalance } from '../utils/contracts';

export default function BTCVaultPanel() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && address && publicClient) {
      loadBalance();
    }
  }, [isConnected, address, publicClient]);

  const loadBalance = async () => {
    try {
      setLoading(true);
      const btcBalance = await getBTCBalance(publicClient, address!);
      setBalance(parseFloat(btcBalance.toString()));
    } catch (error) {
      console.error('Error loading balance:', error);
      setBalance(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded shadow max-w-md w-full mt-6">
      <h3 className="text-xl font-bold mb-2">BTCVault</h3>
      {isConnected ? (
        <>
          <div className="mb-2">
            Your BTC Balance: 
            <span className="font-mono ml-2">
              {loading ? 'Loading...' : `${balance.toFixed(8)} BTC`}
            </span>
          </div>
          <form className="flex flex-col gap-2 mb-2">
            <input type="number" placeholder="Amount" className="px-2 py-1 rounded bg-gray-700 text-white" disabled />
            <button className="bg-blue-600 px-4 py-2 rounded" disabled>Deposit (via Bridge)</button>
            <button className="bg-green-600 px-4 py-2 rounded" disabled>Withdraw (via Bridge)</button>
          </form>
          <div className="text-xs text-gray-400">
            Bridge integration coming soon. Balance is read from deployed contract.
          </div>
        </>
      ) : (
        <div className="text-gray-400">Connect your wallet to view BTCVault balance.</div>
      )}
    </div>
  );
} 