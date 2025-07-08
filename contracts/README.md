# Contracts

This folder contains Solidity smart contracts for the zkEVM layer, including DeFi, privacy, and social dApps. Contracts are designed to interact with native Bitcoin via the bridge and leverage zero-knowledge proofs for privacy.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp env.example .env
```

3. Add your private key to `.env`:
```
PRIVATE_KEY=your_private_key_here
```

## Deployment

### Deploy to Polygon zkEVM Testnet
```bash
npm run deploy:polygon-zk
```

### Deploy to Scroll Testnet
```bash
npm run deploy:scroll
```

## Contracts

- **BTCVault**: Manages BTC deposits/withdrawals via bridge
- **SocialProfile**: Stores user social profiles on zkEVM

## Contract Addresses

After deployment, contract addresses are automatically saved to `../frontend/constants/contracts.json` for frontend integration. 