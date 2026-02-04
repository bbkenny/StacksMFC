# Project Issues - Stacks Mini Finance Console (SMFC)

This document outlines the roadmap and tasks for building the lightweight Bitcoin & Stacks financial radar.

## Smart Contract Issues

### Token Registry
#### Issue #1: Implement Token Registry Contract
**Priority:** High  
**Status:** 🚧 In Progress  
**Description:** A Clarity smart contract to store verified token metadata.
- **Tasks:**
  - [ ] Define `tokens` map (name, symbol, contract-address, chain, decimals).
  - [ ] Implement `add-token` function (admin only).
  - [ ] Implement `update-token` function (admin only).
  - [ ] Implement `remove-token` function (admin only).
  - [ ] Implement `get-token` read-only function.

#### Issue #2: Admin & Governance Roles
**Priority:** Medium  
**Status:** 📅 Pending  
**Description:** Implement basic access control for managing the token registry.

---

## Frontend Issues

### Wallet & Balance
#### Issue #3: Connect Stacks Wallet
**Priority:** High  
**Status:** 📅 Pending  
**Description:** Integrate Hiro/Xverse/Leather wallets for balance retrieval.

#### Issue #4: Portfolio Dashboard
**Priority:** High  
**Status:** 📅 Pending  
**Description:** Display BTC, STX, and sBTC balances with real-time USD valuation.

### Tools & Radar
#### Issue #5: Universal Conversion Calculator
**Priority:** Medium  
**Status:** 📅 Pending  
**Description:** Build the UI for BTC/STX/USD/Token conversions.

#### Issue #6: DeFi Radar UI
**Priority:** Medium  
**Status:** 📅 Pending  
**Description:** Display lending APYs and sBTC bridge status from public APIs.

---

## Infrastructure & DevOps

#### Issue #7: Mainnet Deployment Strategy
**Priority:** Low  
**Status:** 📅 Pending  
**Description:** Prepare deployment plans for the Token Registry contract.

#### Issue #8: UI Theme Implementation
**Priority:** Medium  
**Status:** 🚧 In Progress  
**Description:** Implement the dark "Terminal" vibe with Stacks Orange accents as defined in README.
