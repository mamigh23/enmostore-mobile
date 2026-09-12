# PROJECT STATUS

**Project:** EnmoStore Mobile  
**Status:** Phase 3 — API/Auth/Catalog Foundation  
**Last Updated:** 2026-09-12

## Completed
- [x] GitHub repository/documentation foundation
- [x] Existing PHP/MySQL backend and SQL schema audited
- [x] Phase 2 mobile foundation merged to `main`
- [x] React Native 0.81.4 + React 19.1.0 + TypeScript selected and validated for Android/iOS
- [x] Six-tab mobile shell created: Home, Explore, Search, Favorites, Cart, Account
- [x] TR / EN / DE / JA localization foundation created
- [x] Environment-aware API configuration created
- [x] Central JSON API client created with timeout, bearer-token support and normalized API errors
- [x] Access-token storage uses `react-native-keychain`
- [x] HTTP 401 handling preserves the authoritative API error even if secure-token cleanup fails
- [x] API-client regression tests added
- [x] Android native project/wrapper scaffolding validated with `assembleDebug`
- [x] iOS Xcode project/shared scheme validated with CocoaPods and simulator build on `macos-15`
- [x] Blocking CI gates established for TypeScript, ESLint, Jest, Prettier, Android, iOS and repository safety
- [x] Phase 2 PR #1 merged to `main` as squash commit `e41d10630a9badaa8d675258a018aaf9ce01a166`
- [x] `work` reset to the merged `main` baseline before Phase 3
- [x] Architecture documentation updated to the confirmed React Native mobile/API boundary

## Phase 3 In Progress
- [ ] Lock the first mobile-safe JSON API contract batch: bootstrap, products, categories and search
- [ ] Add stable mobile domain/API types without mirroring raw MySQL rows
- [ ] Add repository interfaces/implementations that use the existing centralized `ApiClient`
- [ ] Add regression tests for API envelope, pagination and catalog mapping behavior
- [ ] Define token-based mobile auth persistence/migration on the PHP backend
- [ ] Define Google identity linking migration and server verification flow
- [ ] Define mobile cart persistence strategy
- [ ] Define push notification device-token persistence/provider
- [ ] Verify exact shipping rules/address persistence
- [ ] Verify PayTR EUR merchant/account behavior and repair backend payment blockers before checkout release

## Critical Findings / Release Blockers
- PayTR `merchant_oid` initialization/callback parsing formats are inconsistent and must be standardized/tested before checkout release.
- Reviewed PayTR initialization sends `TL` unconditionally; international EUR checkout still requires verified backend mapping/account support.
- SQL export contains PayTR setting values and application/customer data. It must never be committed to the mobile repository.
- `products` has TRY/EUR price fields and aggregate stock, but no per-size/per-color inventory table. Do not invent variant inventory without an explicit migration.
- `users` has no Google provider identity columns/table. Google sign-in requires a deliberate server-side identity-linking design/migration.
- Mobile/web orders must continue sharing the existing `orders` / `order_items` records.
- The mobile repository does not contain the reviewed backend PHP source; do not claim backend API/payment fixes are complete here.

## Confirmed Product Decisions
- Android + iOS dedicated app; no WebView-only implementation
- Shared web/mobile catalog and orders
- Languages: TR / EN / DE / JA
- Turkey -> TRY; outside Turkey -> EUR
- Favorites: yes
- Push notifications: yes
- Google sign-in: yes
- Payment: PayTR
- Mobile never connects directly to MySQL

## Proven Phase 2 CI Baseline
- npm install: PASS
- TypeScript: PASS
- ESLint: PASS
- Jest: PASS — 3 suites / 8 tests
- Prettier formatting check: PASS and blocking
- Repository safety checks: PASS
- Android `assembleDebug`: PASS
- iOS project/plist/scheme validation: PASS
- CocoaPods install: PASS
- iOS simulator build: PASS on `macos-15`

These gates remain mandatory for Phase 3.

## Next Execution Batch
1. Lock a minimal, backend-safe contract for bootstrap/catalog/search without fabricating schema fields.
2. Implement mobile domain/API/repository layers against that contract only; no UI feature expansion yet.
3. Add unit tests for decoding/mapping/error behavior.
4. Run full CI and review the resulting Phase 3 diff before opening the next PR.
5. In parallel, prepare the required PHP backend migrations/contracts for mobile auth, Google linking and token persistence using the audited backend source outside this mobile repository.

## Current Phase
**Phase 3 — API/Auth/Catalog Foundation**
