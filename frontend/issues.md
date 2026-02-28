# Frontend Roadmap - Stacks Mini Finance Console (SMFC)

This document outlines the UI/UX development and blockchain integration strategy for the SMFC dashboard.

## 🎨 Phase 1: Terminal UI & Core Layout

### Issue #1: "Console" Layout & Glassmorphism
**Priority:** High | **Status:** 🚧 In Progress  
**Description:** Establish the "Terminal" aesthetic using Tailwind CSS 4 and Stacks Orange.
- **Tasks:**
  - [ ] Implement `Sidebar` with navigation: Dashboard, Portfolio, Converter, Radar.
  - [ ] Apply `Geist Mono` font globally for a code-centric feel.
  - [ ] Create `ConsoleCard` component with glassmorphism (blur, border-opacity, neon-glow).
  - [ ] Add `Framer Motion` page transitions (slide-up + fade).

### Issue #2: Real-time "Ticker" Component
**Priority:** Low | **Status:** ✅ Completed  
**Description:** A scrolling ticker at the top/bottom showing live BTC/STX prices.
- ✅ Implemented `Ticker.tsx` component.
- ✅ Added animated price feed and global layout integration.

---

## ⛓️ Phase 2: Stacks & Wallet Integration

### Issue #3: Robust Session Management
**Priority:** High | **Status:** ✅ Completed  
**Description:** Handle wallet state and data persistence using `@stacks/connect`.
- **Tasks:**
  - [x] Implement `StacksProvider` context to wrap the application.
  - [x] Store `UserData` and handle `onFinish` callbacks for auth.
  - [x] Implement "Address Formatting" utility (e.g., `SP12...ABCD`).

### Issue #4: Asset Portfolio Engine
**Priority:** Critical | **Status:** 📅 Pending  
**Description:** The core logic for fetching balances across multiple assets.
- **Tasks:**
  - [ ] Integrate `Hiro API` for STX balance.
  - [ ] Integrate `CoinGecko API` for real-time USD conversion rates.
  - [ ] Map through `Token Registry` contract to fetch SIP-010 balances.
  - [ ] Calculate total portfolio value in USD.

---

## 🛠️ Phase 3: Financial Tools

### Issue #5: Universal Calculator implementation
**Priority:** Medium | **Status:** 📅 Pending  
**Description:** A tool for converting values between ecosystem assets.
- **Tasks:**
  - [ ] Build `ConversionForm` with live validation.
  - [ ] Support `BTC ↔ USD`, `STX ↔ USD`, and `sBTC ↔ STX`.
  - [ ] Add "Copy to Clipboard" for calculation results.

### Issue #6: DeFi Radar (The Monitoring Tool)
**Priority:** Medium | **Status:** 📅 Pending  
**Description:** A dashboard to view the health of Stacks DeFi.
- [ ] **Lending APYs**: Fetch data from Zest and Alex protocols (mock if no API).
- [ ] **sBTC Bridge**: Display status (Active/Maintenance) and minting limits.
- [ ] **Transaction History**: List last 5 wallet transactions with status badges.

---

## 🚀 Phase 4: Performance & Polish

### Issue #7: State Optimization & Caching
**Priority:** Medium | **Status:** 📅 Pending  
- [ ] Use `SWR` or `React Query` for price feed caching (5-minute TTL).
- [ ] Implement `Skeleton Loaders` for the portfolio table.

### Issue #8: Mobile Console Experience
**Priority:** High | **Status:** 📅 Pending  
- [ ] Responsive navigation (bottom bar for mobile).
- [ ] Touch-optimized cards for the DeFi Radar.
