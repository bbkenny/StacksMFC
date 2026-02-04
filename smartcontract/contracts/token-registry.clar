;; Stacks Mini Finance Console - Token Registry
;; Issue #1: Implement Verified Metadata Map

;; --- Data Maps and Vars ---

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

(define-constant contract-owner tx-sender)

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
