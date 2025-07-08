import React, { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { createCommitment, verifyProof } from '../utils/contracts';

export default function PrivacyPanel() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [secret, setSecret] = useState('');
  const [commitment, setCommitment] = useState('');
  const [nullifier, setNullifier] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCommitment = async () => {
    if (!walletClient || !secret) return;
    
    try {
      setLoading(true);
      // In a real implementation, this would be a proper hash of secret + nonce
      const commitmentHash = `0x${Buffer.from(secret + Date.now()).toString('hex').slice(0, 64)}`;
      setCommitment(commitmentHash);
      
      await createCommitment(walletClient, commitmentHash);
      alert('Commitment created successfully!');
    } catch (error) {
      console.error('Error creating commitment:', error);
      alert('Error creating commitment');
    } finally {
      setLoading(false);
    }
  };

  const verifyProofDemo = async () => {
    if (!walletClient || !commitment || !nullifier) return;
    
    try {
      setLoading(true);
      // Mock proof array (in real implementation, this would be a zk-SNARK proof)
      const mockProof = [1, 2, 3, 4, 5, 6, 7, 8];
      
      await verifyProof(walletClient, nullifier, commitment, mockProof);
      alert('Proof verified successfully!');
    } catch (error) {
      console.error('Error verifying proof:', error);
      alert('Error verifying proof');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded shadow max-w-md w-full mt-6">
      <h3 className="text-xl font-bold mb-2">Privacy: Zero-Knowledge Proofs</h3>
      {isConnected ? (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Create Commitment</h4>
            <input
              type="text"
              placeholder="Enter your secret"
              className="w-full px-2 py-1 rounded bg-gray-700 text-white mb-2"
              value={secret}
              onChange={e => setSecret(e.target.value)}
            />
            <button
              onClick={generateCommitment}
              disabled={loading || !secret}
              className="w-full bg-green-600 px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Commitment'}
            </button>
          </div>

          {commitment && (
            <div>
              <h4 className="font-semibold mb-2">Commitment Created</h4>
              <div className="text-xs bg-gray-700 p-2 rounded break-all">
                {commitment}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-2">Verify Proof (Demo)</h4>
            <input
              type="text"
              placeholder="Enter nullifier"
              className="w-full px-2 py-1 rounded bg-gray-700 text-white mb-2"
              value={nullifier}
              onChange={e => setNullifier(e.target.value)}
            />
            <button
              onClick={verifyProofDemo}
              disabled={loading || !commitment || !nullifier}
              className="w-full bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Proof'}
            </button>
          </div>

          <div className="text-xs text-gray-400 mt-4">
            <p>This demonstrates zero-knowledge proof concepts:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Create a commitment to a secret without revealing it</li>
              <li>Prove knowledge of the secret using a zk-SNARK</li>
              <li>Prevent double-spending with nullifiers</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-gray-400">Connect your wallet to use privacy features.</div>
      )}
    </div>
  );
} 