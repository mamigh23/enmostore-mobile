# PROJECT STATUS

**Project:** EnmoStore Mobile  
**Status:** Phase 2 — Mobile Foundation Hardening  
**Last Updated:** 2026-09-12

## Completed
- [x] GitHub repository/documentation foundation
- [x] Existing PHP/MySQL backend and SQL schema audited
- [x] React Native 0.81.4 + TypeScript selected for Android/iOS
- [x] Six-tab mobile shell created: Home, Explore, Search, Favorites, Cart, Account
- [x] TR / EN / DE / JA localization foundation created
- [x] Environment-aware API configuration created
- [x] Central JSON API client created with timeout, bearer-token support and normalized API errors
- [x] Access-token storage uses `react-native-keychain`
- [x] HTTP 401 handling preserves the authoritative API error even if secure-token cleanup fails
- [x] API-client regression tests added
- [x] GitHub Actions Phase 2 CI added
- [x] CI confirms npm dependency installation, TypeScript, ESLint and unit tests pass
- [x] CI safety checks confirm no committed signing/private-key material, direct DB access or WebView wrapper implementation

## In Progress
- [ ] Complete and validate Android native project/wrapper scaffolding against the React Native 0.81 template
- [ ] Complete and validate iOS Xcode project/scheme scaffolding against the React Native 0.81 template
- [ ] Run a real Android debug build in CI
- [ ] Run a real iOS build on a macOS runner
- [ ] Normalize the existing Prettier formatting baseline (currently audited but non-blocking)
- [ ] Lock the mobile-safe PHP JSON API contract
- [ ] Define token-based auth + Google identity linking migration
- [ ] Define API cart persistence strategy
- [ ] Define push notification architecture/device-token migration
- [ ] Verify exact shipping rules
- [ ] Verify PayTR EUR merchant/account support

## Critical Findings / Release Blockers
- PayTR `merchant_oid` initialization/callback parsing formats are inconsistent and must be standardized/tested before checkout release.
- Reviewed PayTR initialization sends `TL` unconditionally; international EUR checkout still requires verified backend mapping/account support.
- SQL export contains PayTR setting values and application/customer data. It must never be committed to the mobile repository.
- `products` has TRY/EUR price fields and aggregate stock, but no per-size/per-color inventory table. Do not invent variant inventory without an explicit migration.
- `users` has no Google provider identity columns/table. Google sign-in requires a deliberate server-side identity-linking design/migration.
- Mobile and web orders will use the same `orders` / `order_items` records.
- Phase 2 is **NOT READY FOR MERGE** until native Android/iOS project validation is complete.

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

## Current CI Baseline
- npm install: PASS
- TypeScript: PASS
- ESLint: PASS
- Jest: PASS — 3 suites / 8 tests
- Repository safety checks: PASS
- Prettier: baseline debt detected in existing files; audit is currently non-blocking
- Android assembleDebug: NOT YET RUN
- iOS Xcode build: NOT YET RUN

## Next Execution Batch
1. Have Codex complete the missing native Android/iOS project scaffolding only; no Phase 3 features.
2. Review those changes before they reach `work`.
3. Add Android debug-build CI and resolve native build failures.
4. Add macOS/iOS build validation when the Xcode project is complete.
5. Normalize Prettier baseline and make formatting blocking.
6. Only after Phase 2 is green, proceed to backend API/auth/catalog implementation.

## Current Phase
**Phase 2 — Mobile Foundation Hardening**
