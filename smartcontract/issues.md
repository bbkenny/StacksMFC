# Smart Contract Roadmap - Stacks Mini Finance Console (SMFC)

This document tracks the engineering tasks for the Clarity smart contracts, focusing on the Token Registry and Read-Only utility layers.

## 🛠️ Module 1: Token Registry (Core)

### Issue #1: Implement Verified Metadata Map
**Priority:** High | **Status:** ✅ Completed  
**Description:** Define the storage structure for trust-minimized token discovery.
- **Tasks:**
  - [x] Define `tokens` map: `{ symbol: (string-ascii 12) }` -> `{ name: (string-ascii 64), contract: principal, decimals: uint, logo-uri: (string-ascii 256), chain: (string-ascii 20) }`.
  - [x] Implement `get-token-metadata` (Read-only).
  - [x] Implement `is-token-verified` check.

### Issue #2: Administrative Access Control
**Priority:** High | **Status:** ✅ Completed  
**Description:** Ensure only authorized maintainers can update the registry.
- **Tasks:**
  - [x] Implement `contract-admin` variable for governance.
  - [x] Add `add-token` function with authorization check.
  - [x] Add `update-token-metadata` function.
  - [x] Add `transfer-ownership` function.

### Issue #3: Registry Validation Logic
**Priority:** Medium | **Status:** ✅ Completed  
**Description:** Prevent invalid data from entering the registry.
- **Tasks:**
  - [x] Assert symbol length is > 0.
  - [x] Assert decimals is <= 18.
  - [x] Add error codes for invalid input.

---

## 📊 Module 2: Utility & Aggregation (Read-Only)

### Issue #4: Portfolio Batch Fetcher
**Priority:** Medium | **Status:** ✅ Completed  
**Description:** Create a helper function to fetch multiple token records in a single call.
- **Tasks:**
  - [x] Implement `get-multiple-tokens` function taking a list of symbols.
  - [x] Return a list of metadata records for efficient frontend loading.

---

## 🧪 Testing & Quality Assurance

### Issue #5: Comprehensive Test Suite
**Priority:** High | **Status:** 🚧 In Progress  
- [ ] **Unit Tests**: Test successful token addition and unauthorized rejection.
- [ ] **Edge Cases**: Test updating non-existent tokens and removing tokens.
- [ ] **Integration**: Test fetching registry data via `vitest` and `clarinet-sdk`.

### Issue #6: Security Review
**Priority:** Critical | **Status:** 📅 Pending  
- [ ] Check for post-condition vulnerabilities.
- [ ] Ensure all administrative functions are properly gated.
- [ ] Optimize data maps for gas efficiency.
