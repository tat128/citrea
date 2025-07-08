import { ethers } from 'ethers';
import contracts from '../constants/contracts.json';

// Contract ABIs (simplified for demo)
const BTCVaultABI = [
  "function balances(address) view returns (uint256)",
  "function deposit(address user, uint256 amount) external",
  "function withdraw(address user, uint256 amount) external",
  "event Deposit(address indexed user, uint256 amount)",
  "event Withdraw(address indexed user, uint256 amount)"
];

const SocialProfileABI = [
  "function profiles(address) view returns (string username, string bio)",
  "function setProfile(string username, string bio) external",
  "event ProfileUpdated(address indexed user, string username, string bio)"
];

const PrivacyContractABI = [
  "function commitments(bytes32) view returns (bool)",
  "function nullifiers(bytes32) view returns (bool)",
  "function createCommitment(bytes32 commitment) external",
  "function verifyProof(bytes32 nullifier, bytes32 commitment, uint256[8] proof) external",
  "function hasCommitment(bytes32 commitment) view returns (bool)",
  "function isNullifierUsed(bytes32 nullifier) view returns (bool)",
  "event CommitmentCreated(bytes32 indexed commitment, address indexed user)",
  "event ProofVerified(bytes32 indexed nullifier, address indexed user)"
];

export function getBTCVaultContract(client: any) {
  return new ethers.Contract(contracts.BTCVault, BTCVaultABI, client);
}

export function getSocialProfileContract(client: any) {
  return new ethers.Contract(contracts.SocialProfile, SocialProfileABI, client);
}

export function getPrivacyContract(client: any) {
  return new ethers.Contract(contracts.PrivacyContract, PrivacyContractABI, client);
}

export async function getBTCBalance(provider: any, address: string) {
  if (!contracts.BTCVault) return 0;
  const contract = new ethers.Contract(contracts.BTCVault, BTCVaultABI, provider);
  const balance = await contract.balances(address);
  return ethers.formatEther(balance);
}

export async function getProfile(provider: any, address: string) {
  if (!contracts.SocialProfile) return { username: '', bio: '' };
  const contract = new ethers.Contract(contracts.SocialProfile, SocialProfileABI, provider);
  const profile = await contract.profiles(address);
  return { username: profile.username, bio: profile.bio };
}

export async function createCommitment(client: any, commitment: string) {
  if (!contracts.PrivacyContract) throw new Error('PrivacyContract not deployed');
  const contract = getPrivacyContract(client);
  const tx = await contract.createCommitment(commitment);
  return await tx.wait();
}

export async function verifyProof(client: any, nullifier: string, commitment: string, proof: number[]) {
  if (!contracts.PrivacyContract) throw new Error('PrivacyContract not deployed');
  const contract = getPrivacyContract(client);
  const tx = await contract.verifyProof(nullifier, commitment, proof);
  return await tx.wait();
} 