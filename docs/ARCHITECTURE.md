# Citrea Architecture

## Overview

Citrea is a fullstack application that brings DeFi, privacy, and social apps to Bitcoin using zkEVM technology, without relying on wrapped tokens. The system enables native Bitcoin to interact with EVM-compatible smart contracts through a trustless bridge.

## System Components

### 1. Bitcoin Layer
- **Native BTC**: Users hold actual Bitcoin, not wrapped tokens
- **Bridge Addresses**: Special Bitcoin addresses that lock/unlock BTC
- **Transaction Monitoring**: Bridge watches for BTC transactions

### 2. Bridge Layer
- **Bitcoin Monitor**: Go service that monitors Bitcoin blockchain
- **zkEVM Integration**: Updates smart contract state based on BTC transactions
- **Transaction Processing**: Handles deposits and withdrawals
- **Security**: Trustless operation with cryptographic proofs

### 3. zkEVM Layer
- **Smart Contracts**: Solidity contracts deployed on zkEVM (Polygon zkEVM, Scroll, etc.)
- **BTCVault**: Manages BTC deposits/withdrawals
- **SocialProfile**: Stores user social data
- **PrivacyContract**: Zero-knowledge proof verification

### 4. Frontend Layer
- **React/Next.js**: Modern web interface
- **Wallet Integration**: MetaMask and other Web3 wallets
- **Contract Interaction**: Real-time contract reading/writing
- **Privacy UI**: Zero-knowledge proof demonstrations

## Data Flow

### BTC Deposit Flow
1. User sends BTC to bridge address on Bitcoin
2. Bridge monitors and detects the transaction
3. Bridge calls `BTCVault.deposit()` on zkEVM
4. User's BTC balance increases on zkEVM
5. Frontend displays updated balance

### BTC Withdrawal Flow
1. User requests withdrawal on frontend
2. Frontend calls bridge withdrawal function
3. Bridge creates Bitcoin transaction to user
4. Bridge calls `BTCVault.withdraw()` on zkEVM
5. User receives BTC on Bitcoin network

### Privacy Flow
1. User creates commitment to secret on frontend
2. Frontend calls `PrivacyContract.createCommitment()`
3. User generates zero-knowledge proof
4. Frontend calls `PrivacyContract.verifyProof()`
5. Proof verified without revealing secret

## Security Model

### Bridge Security
- **Trustless**: No single point of failure
- **Cryptographic Proofs**: All operations verified on-chain
- **Multi-signature**: Multiple operators for critical operations
- **Time Locks**: Delays for large withdrawals

### Privacy Security
- **Zero-Knowledge Proofs**: Prove knowledge without revealing data
- **Commitments**: Hash-based commitments to secrets
- **Nullifiers**: Prevent double-spending
- **Anonymity**: User identity not linked to transactions

## Technology Stack

### Backend
- **Go**: Bridge implementation
- **Solidity**: Smart contracts
- **Hardhat**: Contract development and deployment

### Frontend
- **React**: UI framework
- **Next.js**: Fullstack framework
- **Wagmi**: Web3 hooks
- **Ethers.js**: Ethereum interaction
- **Tailwind CSS**: Styling

### Infrastructure
- **zkEVM**: Polygon zkEVM, Scroll, etc.
- **Bitcoin**: Native Bitcoin network
- **IPFS**: Decentralized storage (future)

## Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Bitcoin       │    │   Bridge        │    │   zkEVM         │
│   Network       │◄──►│   Service       │◄──►│   Testnet       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User BTC      │    │   Go Monitor    │    │   Smart         │
│   Wallet        │    │   Service       │    │   Contracts     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │   Frontend      │
                                              │   dApp          │
                                              └─────────────────┘
```

## Future Enhancements

### DeFi Features
- **Lending**: BTC-backed loans on zkEVM
- **DEX**: Decentralized exchange for BTC pairs
- **Yield Farming**: Earn rewards with BTC
- **Options/Futures**: Advanced financial instruments

### Privacy Features
- **Mixing**: Coin mixing for enhanced privacy
- **Ring Signatures**: Anonymous transactions
- **Confidential Assets**: Private asset transfers
- **Identity Management**: Self-sovereign identity

### Social Features
- **Messaging**: Encrypted messaging
- **DAOs**: Decentralized organizations
- **Reputation**: On-chain reputation system
- **Content**: Decentralized content sharing 