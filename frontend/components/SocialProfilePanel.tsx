import React, { useState, useEffect } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { getProfile, getSocialProfileContract } from '../utils/contracts';

export default function SocialProfilePanel() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isConnected && address && publicClient) {
      loadProfile();
    }
  }, [isConnected, address, publicClient]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const profile = await getProfile(publicClient, address!);
      setUsername(profile.username);
      setBio(profile.bio);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!walletClient || !address) return;
    
    try {
      setSaving(true);
      const contract = getSocialProfileContract(walletClient);
      const tx = await contract.setProfile(username, bio);
      await tx.wait();
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded shadow max-w-md w-full mt-6">
      <h3 className="text-xl font-bold mb-2">Social Profile</h3>
      {isConnected ? (
        <>
          {loading ? (
            <div className="text-gray-400">Loading profile...</div>
          ) : (
            <form className="flex flex-col gap-2 mb-2" onSubmit={(e) => { e.preventDefault(); saveProfile(); }}>
              <input
                type="text"
                placeholder="Username"
                className="px-2 py-1 rounded bg-gray-700 text-white"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <textarea
                placeholder="Bio"
                className="px-2 py-1 rounded bg-gray-700 text-white"
                value={bio}
                onChange={e => setBio(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Set Profile'}
              </button>
            </form>
          )}
        </>
      ) : (
        <div className="text-gray-400">Connect your wallet to set your profile.</div>
      )}
    </div>
  );
} 