# Citrea Stacking Circles: Social Bitcoin Saving Club

![Citrea Logo](./frontend/public/icon-192.png)

## Overview
Citrea Stacking Circles is a social, gamified, privacy-first Bitcoin saving platform built for the Citrea WaveHack hackathon. It empowers users to create and join stacking circles (Bitcoin saving clubs), collaborate, and grow their BTC together—leveraging Citrea's zk-rollup technology for privacy, scalability, and composability.

## Features
- **Stacking Circles:** Create or join social Bitcoin saving groups with privacy controls, invite links, and group stats.
- **Gamified Dashboard:** Achievements, badges, group stats, and activity feed for a fun, engaging experience.
- **Onchain Social Feed:** Post, chat, and share proof-of-stack within your circle.
- **Group Voting:** Onchain proposals and voting for group decisions (e.g., treasury, gifting).
- **Privacy by Default:** Shielded actions and zk-proofs for all BTC operations, powered by Citrea.
- **Mobile-First & Modern UI:** Glassmorphism, gradients, Lucide icons, and responsive design.
- **Quick Actions & Onboarding:** Tooltips, demo/testnet wallet connect, and resource links for seamless onboarding.

## Citrea Integration
- **zk-Rollup for Bitcoin:** All stacking, gifting, and voting actions are processed via Citrea's zk-rollup, ensuring privacy and scalability.
- **Shielded Transactions:** User actions are shielded by default, with visible proof-of-privacy in the UI.
- **Batch Transactions:** Group actions are batched for efficiency and low fees.
- **Composability:** Designed for future integration with multi-sig vaults, DAOs, and onchain credentials.

## Hackathon Alignment
- **Theme:** Deeply aligned with "Stacking Circles: Bitcoin Saving Club"—social saving, privacy, and gamification.
- **Citrea Focus:** Every user action showcases Citrea's zk technology, with visible feedback and educational tooltips.
- **UX & Onboarding:** Polished, accessible, and fun—maximizing user engagement and hackathon impact.
- **Extensible:** Ready for DAO tooling, analytics, and further Citrea-powered features.

## Demo
![Demo GIF](./docs/demo.gif)

1. Connect your wallet (testnet/demo mode available).
2. Create or join a stacking circle.
3. Stack BTC, post in the group feed, and vote on proposals.
4. Earn badges, track group stats, and explore privacy features.

## Quick Start
```bash
# 1. Clone the repo
$ git clone https://github.com/your-org/citrea-stacking-circles.git
$ cd citrea

# 2. Install dependencies
$ cd frontend && npm install
$ cd ../contracts && npm install

# 3. Run the frontend (Next.js)
$ cd ../frontend
$ npm run dev

# 4. Deploy contracts (optional, for devs)
$ cd ../contracts
$ npx hardhat run scripts/deploy.js --network <network>
```

## Why Citrea?
Citrea brings zk-rollups to Bitcoin, enabling private, scalable, and composable dApps. Stacking Circles demonstrates how Citrea can power the next generation of social, privacy-first Bitcoin applications.

- **Privacy:** Shielded group actions and onchain voting.
- **Scalability:** Batch transactions for low fees and high throughput.
- **Composability:** Ready for DAOs, credentials, and more.

## Contributing
Pull requests and feedback welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Resources
- [Citrea Docs](https://docs.citrea.xyz/)
- [Faucet](https://faucet.citrea.xyz/)
- [Discord](https://discord.gg/citrea)
- [GitHub](https://github.com/citrea-labs)

## License
MIT 