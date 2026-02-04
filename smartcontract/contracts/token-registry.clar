;; Stacks Mini Finance Console - Token Registry
;; Issue #1: Implement Verified Metadata Map

;; --- Data Maps and Vars ---

(define-data-var contract-admin principal tx-sender)

(define-map tokens 
  { symbol: (string-ascii 12) }
  {
    name: (string-ascii 64),
    contract: principal,
    decimals: uint,
    logo-uri: (string-ascii 256),
    chain: (string-ascii 20)
  }
)

;; --- Constants ---

;; Error Codes ---

(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-TOKEN-ALREADY-EXISTS (err u101))
(define-constant ERR-TOKEN-NOT-FOUND (err u102))
(define-constant ERR-INVALID-SYMBOL (err u103))
(define-constant ERR-INVALID-DECIMALS (err u104))

;; --- Read-Only Functions ---

;; Get all metadata for a specific token symbol
(define-read-only (get-token-metadata (symbol (string-ascii 12)))
  (map-get? tokens { symbol: symbol })
)

;; Check if a token symbol is registered and verified
(define-read-only (is-token-verified (symbol (string-ascii 12)))
  (is-some (map-get? tokens { symbol: symbol }))
)

;; Get the contract principal for a token
(define-read-only (get-token-contract (symbol (string-ascii 12)))
  (get contract (map-get? tokens { symbol: symbol }))
)

;; Get metadata for multiple tokens (Batch Fetcher)
(define-read-only (get-multiple-tokens (symbols (list 20 (string-ascii 12))))
  (map get-token-metadata symbols)
)

;; --- Public Functions ---

;; Change contract administrator (Admin Only)
(define-public (transfer-ownership (new-admin principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-admin)) ERR-NOT-AUTHORIZED)
    (ok (var-set contract-admin new-admin))
  )
)

;; Add a new token to the registry (Admin Only)
(define-public (add-token (symbol (string-ascii 12)) (name (string-ascii 64)) (contract principal) (decimals uint) (logo-uri (string-ascii 256)) (chain (string-ascii 20)))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-admin)) ERR-NOT-AUTHORIZED)
    (asserts! (> (len symbol) u0) ERR-INVALID-SYMBOL)
    (asserts! (<= decimals u18) ERR-INVALID-DECIMALS)
    (asserts! (is-none (get-token-metadata symbol)) ERR-TOKEN-ALREADY-EXISTS)
    (ok (map-set tokens { symbol: symbol } 
      { 
        name: name, 
        contract: contract, 
        decimals: decimals, 
        logo-uri: logo-uri, 
        chain: chain 
      }
    ))
  )
)

;; Update existing token metadata (Admin Only)
(define-public (update-token-metadata (symbol (string-ascii 12)) (name (string-ascii 64)) (contract principal) (decimals uint) (logo-uri (string-ascii 256)) (chain (string-ascii 20)))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-admin)) ERR-NOT-AUTHORIZED)
    (asserts! (> (len symbol) u0) ERR-INVALID-SYMBOL)
    (asserts! (<= decimals u18) ERR-INVALID-DECIMALS)
    (asserts! (is-some (get-token-metadata symbol)) ERR-TOKEN-NOT-FOUND)
    (ok (map-set tokens { symbol: symbol } 
      { 
        name: name, 
        contract: contract, 
        decimals: decimals, 
        logo-uri: logo-uri, 
        chain: chain 
      }
    ))
  )
)

;; Remove a token from the registry (Admin Only)
(define-public (remove-token (symbol (string-ascii 12)))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-admin)) ERR-NOT-AUTHORIZED)
    (asserts! (is-some (get-token-metadata symbol)) ERR-TOKEN-NOT-FOUND)
    (ok (map-delete tokens { symbol: symbol }))
  )
)
