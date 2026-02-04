# Smart Contract - Stacks Mini Finance Console (SMFC)

This directory contains the Clarity smart contracts for the Stacks Mini Finance Console, a lightweight Bitcoin & Stacks financial radar.

## Project Overview

The SMFC smart contract suite currently focuses on:
- **Token Registry**: A trust-minimized source for verified token metadata (names, symbols, decimals, etc.) on Stacks and Bitcoin.
- **Read-Only Portfolios**: Helper functions for aggregating and viewing asset balances efficiently.

## Technology Stack

- **Clarity 4**: Smart contract language for Stacks.
- **Clarinet**: Development and testing framework.
- **Vitest**: Testing framework for contract tests.
- **TypeScript**: For writing test files.

## Contract Architecture

### token-registry.clar

The core contract that handles:

1. **Token Metadata Storage**
   - Store verified token names, symbols, and decimals.
   - Map contract addresses to their metadata.
   - Track chain origin (Stacks / Bitcoin).

2. **Registry Management**
   - Authorized administrators can add or update token information.
   - Ensure only verified tokens are displayed in the console.

3. **Public Discovery**
   - Read-only functions for fetching token details by symbol or address.

## Contract Functions

### Admin Functions (Authorized Only)

#### add-token
Add a new verified token to the registry.

#### update-token
Update existing token metadata.

#### remove-token
Remove a token from the registry.

### Read-Only Functions (Public)

#### get-token
Retrieve token metadata by symbol or address.

## Installation & Setup

### Prerequisites
- **Clarinet**
- **Node.js** 18+

### Install Dependencies

```bash
npm install
```

### Check Contract Syntax

```bash
clarinet check
```

### Run Tests

```bash
npm run test
```

## Security Considerations

- **Access Control**: Only authorized administrators can modify the registry.
- **Trust-Minimized**: Metadata is stored on-chain to prevent spoofing or misinformation.
- **Read-Only Default**: The console is designed to be read-heavy, reducing the attack surface.

---

**Built for the future of Bitcoin DeFi (BTCFi) on Stacks.**
