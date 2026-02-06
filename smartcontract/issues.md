## 🛡️ Module 3: Security & Advanced Features

### Issue #7: Contract Pause Mechanism
**Priority:** Medium | **Status:** ✅ Completed  
**Description:** Implement a circuit breaker to pause registry updates in case of emergency.
- **Tasks:**
  - [x] Add `contract-paused` data-var.
  - [x] Implement `set-paused` function (Admin only).
  - [x] Add `asserts! (not (var-get contract-paused))` to all state-changing functions.

### Issue #8: Metadata Pagination (Read-Only)
**Priority:** Low | **Status:** 📅 Pending  
**Description:** Add helper functions to fetch tokens in pages for large registries.
- **Tasks:**
  - [ ] Implement `get-token-list-paged` using a sequence-based approach.
