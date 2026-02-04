# Frontend - Stacks Mini Finance Console (SMFC)

A lightweight Bitcoin & Stacks mini-app that helps users view balances, convert values, and monitor Bitcoin DeFi opportunities.

## Project Overview

The Stacks Mini Finance Console is a minimal, non-custodial dashboard for:
- **Wallet Balance Viewer**: Connect Stacks wallet and display BTC, STX, and sBTC balances.
- **Universal Conversion Calculator**: Convert between BTC, STX, USD, and tokens.
- **Token Registry**: View verified token metadata stored on-chain.
- **Bitcoin DeFi Radar**: Monitor current lending APYs and swap price feeds (read-only).

## Technology Stack

- **Next.js 15+**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **@stacks/connect**: Wallet connection and authentication
- **@stacks/transactions**: Transaction building and broadcasting
- **Framer Motion**: Smooth UI animations and transitions

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── components/        # Shared React components
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page / Dashboard
├── lib/                   # Utility libraries
│   ├── hooks/             # Custom React hooks
│   └── constants/         # App constants and contract info
└── public/                # Static assets
```

## Installation & Setup

### Prerequisites
- **Node.js** 18+ and npm
- **Stacks Wallet** (Hiro, Xverse, or Leather)

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Features

### 1. Wallet Balance Viewer
Connect your Stacks wallet to view your real-time balances of BTC, STX, and other SIP-010 tokens.

### 2. Universal Conversion Calculator
A handy tool for quick financial conversions between major ecosystem assets and USD.

### 3. Bitcoin DeFi Radar
Stay updated with the latest APYs and opportunities in the Stacks DeFi ecosystem without leaving the console.

## Styling & Theme

SMFC features a dark, professional terminal-style interface with Stacks Orange accents:
- **Stacks Orange**: `#F2A900`
- **Background**: Deep Black (`#0B0B0C`)
- **UI Elements**: Glassmorphism cards with subtle neon glows

---

**Built for the future of Bitcoin DeFi (BTCFi).**
