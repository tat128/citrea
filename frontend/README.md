# Frontend

This folder contains the React/Next.js frontend for interacting with the zkEVM smart contracts, Bitcoin bridge, and social dApps.

## Prerequisites

1. Deploy contracts first (see `../contracts/README.md`)
2. Ensure `constants/contracts.json` has valid contract addresses

## Setup

1. Install dependencies:
```bash
yarn install
```

2. Start development server:
```bash
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Features

- **Wallet Connection**: Connect MetaMask or other Web3 wallets
- **DeFi**: View BTCVault balance (read from deployed contract)
- **Social**: Set and view social profiles on zkEVM
- **Privacy**: Zero-knowledge proof demo (coming soon)

## Contract Integration

The frontend automatically reads contract addresses from `constants/contracts.json` and provides:
- Real-time balance reading from BTCVault
- Profile reading/writing to SocialProfile
- Transaction signing and confirmation

## Networks Supported

- Polygon zkEVM Testnet
- Scroll Testnet
- Mainnet (for testing)

## Configure contract addresses

Edit `constants/contracts.ts` to set deployed contract addresses for BTCVault and SocialProfile. 