# Bitcoin-to-zkEVM Bridge

This folder contains the logic for a trustless Bitcoin-to-zkEVM bridge. The bridge enables locking/unlocking of native BTC and referencing it on the zkEVM without wrapped tokens.

## Architecture

The bridge consists of:
- **Bitcoin Monitor**: Watches Bitcoin blockchain for transactions to bridge addresses
- **zkEVM Integration**: Updates BTCVault contract state based on Bitcoin transactions
- **Transaction Processing**: Handles deposits and withdrawals between Bitcoin and zkEVM

## Setup

1. Install Go dependencies:
```bash
go mod tidy
```

2. Set environment variables:
```bash
export ETH_RPC_URL="https://rpc.public.zkevm-test.net"
export BTC_VAULT_ADDRESS="0x..." # Set after contract deployment
export BRIDGE_PRIVATE_KEY="0x..." # Your bridge operator private key
```

3. Run the bridge:
```bash
go run bridge.go
```

## Features

- **Bitcoin Transaction Monitoring**: Automatically detects BTC sent to bridge addresses
- **Automatic Deposits**: Updates BTCVault contract when BTC is locked
- **Withdrawal Processing**: Handles withdrawal requests from zkEVM to Bitcoin
- **Balance Tracking**: Monitors bridge BTC balance

## Implementation Status

- ✅ Basic bridge structure
- ✅ Ethereum client integration
- ✅ Bitcoin transaction simulation
- 🔄 Bitcoin RPC integration (TODO)
- 🔄 Actual contract calls (TODO)
- 🔄 Bitcoin transaction creation (TODO)

## Security Considerations

- Bridge operator private key must be kept secure
- Bitcoin transactions require multiple confirmations
- Implement proper validation and rate limiting
- Add monitoring and alerting for bridge operations 