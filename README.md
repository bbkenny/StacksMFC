## 🧡 Stacks Mini Finance Console (SMFC)

A lightweight Bitcoin & Stacks mini‑app that helps users **view balances, convert values, and monitor Bitcoin DeFi opportunities**—without complexity, custody, or heavy DeFi execution.

> Think of it as a **Bitcoin finance radar**: fast, simple, and read‑only by default.

---

# 🚀 Overview

The Stacks Mini Finance Console is a minimal, non‑custodial dashboard for:

- Viewing BTC, STX, and token balances
- Converting between BTC, STX, USD, and stablecoins
- Monitoring Stacks DeFi opportunities (APY, swaps, bridges)
- Displaying verified token metadata on‑chain

This project is designed to be **simple, fast, and hackathon‑ready**, while demonstrating real Web3 engineering across frontend, indexing, and Clarity smart contracts.

---

# 🎯 Problem Statement

Bitcoin and Stacks users often face:

- Fragmented tools for prices, balances, and DeFi data
- Complex dashboards built for Ethereum power users
- No simple interface for quick Bitcoin financial insight

**SMFC solves this by providing a single minimal console for Bitcoin financial awareness.**

---

# 🧩 Core Features (MVP)

## 1️⃣ Wallet Balance Viewer

- Connect Stacks wallet (Hiro, Xverse, Leather)
- Display:
  - BTC balance
  - STX balance
  - sBTC & SIP‑010 token balances

- Real‑time USD valuation

## 2️⃣ Universal Conversion Calculator

- BTC ↔ USD
- STX ↔ USD
- Token ↔ BTC
- Token ↔ STX
- Simple financial calculator for quick conversions

## 3️⃣ Token Registry (On‑Chain)

A Clarity smart contract that stores verified token metadata:

- Token name
- Symbol
- Contract address
- Chain (Stacks / Bitcoin)
- Decimals

This ensures **trust‑minimized token discovery**.

## 4️⃣ Bitcoin DeFi Radar (Read‑Only)

- Current lending APYs on Stacks protocols
- Swap price feeds
- sBTC bridge status
  n> No execution in v1. This reduces risk and keeps the app lightweight.

---

# 🧠 Design Philosophy

- **Read‑heavy, execute‑light**
- No custody of user funds
- Minimal UI for Bitcoin‑native users
- Dark, professional terminal‑style interface

---

# 🏗️ Architecture

## Frontend

- Next.js / React
- Tailwind CSS
- Stacks Wallet SDK
  n

## Backend / Indexing

- Public APIs for price feeds (CoinGecko / Stacks API)
- Optional custom indexer for token metadata
  n

## Smart Contracts (Clarity 4)

- Token Registry Contract
- Governance/Admin role for token updates
- Read‑only portfolio snapshot functions

---

# 📜 Smart Contract Modules

## Token Registry Contract

Stores verified token metadata with admin‑controlled updates.

### Functions

- `add-token`
- `update-token`
- `remove-token`
- `get-token`

### Roles

- Owner / Admin (authorized maintainers)
- Public read access

---

# 🎨 UI / UX Color Scheme

## Primary Stacks Theme

- **Stacks Orange:** `#F2A900`

## Core Dark Theme

- **Deep Black:** `#0B0B0C`
- **Dark Gray:** `#121212`
- **Surface Gray:** `#1A1A1A`

## Accent Colors

- **Bitcoin Yellow:** `#F7931A`
- **Electric Blue:** `#1E90FF` (for links & active states)
- **Success Green:** `#16A34A`
- **Error Red:** `#DC2626`

## Text Colors

- **Primary Text:** `#EDEDED`
- **Secondary Text:** `#9CA3AF`
- **Muted Text:** `#6B7280`

### UI Style Notes

- Glassmorphism cards on dark background
- Subtle neon glow for BTC/STX metrics
- Minimal charts, no clutter
- Terminal‑like financial console vibe

---

# 📦 Project Structure

```
/stacks-mini-finance-console
  /contracts
  /frontend
  /api
  /docs
  README.md
```

---

# 🛠️ Installation

## Clone Repository

```
git clone https://github.com/<your-username>/stacks-mini-finance-console.git
cd stacks-mini-finance-console
```

## Install Dependencies

```
npm install
```

## Run Frontend

```
npm run dev
```

---

# 🧪 Smart Contract Deployment

Deploy using Clarinet or Stacks CLI:

```
clarinet deploy
```

---

# 🔐 Security Considerations

- No private keys stored
- Wallet interactions via official SDKs
- Read‑only DeFi monitoring in v1
- Admin‑controlled token registry

---

# 🌍 Use Cases

- Bitcoin holders tracking portfolio value
- Stacks users monitoring DeFi yields
- Developers needing quick token conversion tools
- Traders checking BTC/STX price relationships

---

# 🚧 Future Roadmap

## v2

- Swap execution via Stacks DEX SDK
- Portfolio history charts
- Price alerts

## v3

- Lending deposits & withdrawals
- Yield optimizer
- Governance dashboard

## v4

- Multi‑chain portfolio aggregation
- Merchant & payroll dashboards
  n

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Submit a PR with clear description

---

# 📜 License

MIT License

---

# 🧠 Author Vision

This project demonstrates how Bitcoin‑native finance tools can be **simple, transparent, and developer‑friendly** while leveraging the power of Stacks and Clarity smart contracts.

> Built for the future of Bitcoin DeFi (BTCFi).
