# ZoraSage Smart Contracts

This directory contains the smart contracts for ZoraSage, an AI-powered trading and creation suite for Zora Coins.

## Technologies Used

- Solidity 0.8.20
- Hardhat
- OpenZeppelin Contracts
- Ethers.js

## Smart Contracts

### ZoraSageManager.sol

The core contract for managing trading strategies and user funds. It allows users to:

- Create, update, and delete AI-powered trading strategies
- Deposit and withdraw funds
- Get information about strategies and user funds

### ZoraSageZoraIntegration.sol

Contract for interacting with Zora coins, facilitating:

- Trading Zora coins using AI-driven strategies
- Recording trading volume and user activity
- Managing approved coins for trading
- Tracking referral earnings

## Development

### Prerequisites

- Node.js 18+
- npm, yarn, or bun

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PRIVATE_KEY=your_private_key
   ALCHEMY_API_KEY=your_alchemy_api_key
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

### Compiling

```
npx hardhat compile
```

### Testing

```
npx hardhat test
```

### Deployment

To deploy to Base Sepolia testnet:

```
npx hardhat run scripts/deploy.js --network baseSepolia
```

To deploy to Base mainnet:

```
npx hardhat run scripts/deploy.js --network base
```

## Network Support

The contracts are designed to be deployed on:

- Base Mainnet
- Base Sepolia Testnet

## Security

These contracts:
- Use OpenZeppelin's battle-tested libraries
- Implement access control for sensitive functions
- Include nonReentrant modifiers to prevent reentrancy attacks
- Have limitations on fees and other parameters

## License

This project is licensed under the MIT License - see the LICENSE file for details.
