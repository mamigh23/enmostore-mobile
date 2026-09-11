# PROJECT STATUS

**Project:** EnmoStore Mobile  
**Status:** Phase 1 — Backend Discovery / API Foundation  
**Last Updated:** 2026-09-11

## Completed
- [x] GitHub repository exists
- [x] `MASTER_LAW.md` created
- [x] GitHub write access verified
- [x] `CLAUDE.md` created/updated
- [x] Project documentation foundation started
- [x] Existing PHP/MySQL backend source inspected (config + admin archives)
- [x] Existing session auth identified
- [x] Existing product/category/order/favorites/coupon/preorder domains identified
- [x] Existing TR/EN/DE/JA localization confirmed
- [x] Existing TRY/EUR site pricing logic confirmed
- [x] Existing PayTR iframe/token/callback integration confirmed
- [x] Backend audit documented in `BACKEND_AUDIT.md`

## In Progress
- [ ] Obtain/inspect SQL schema or structure export
- [ ] Verify exact product variant/stock schema
- [ ] Verify shipping/address business rules
- [ ] Define mobile-safe PHP JSON API contract
- [ ] Decide mobile technology stack
- [ ] Define token-based mobile authentication + Google sign-in flow
- [ ] Define push notification architecture

## Critical Findings
- PayTR payment initialization currently creates `merchant_oid` as `ORD{id}X{timestamp}` while callback parsing expects an `OR{id}T{timestamp}`-style value. Fix and regression-test before production mobile payments.
- Reviewed PayTR initialization currently sends currency as `TL` unconditionally; TRY/EUR PayTR behavior must be verified before international mobile checkout.
- Database/payment secrets exist in backend configuration/settings and must never be copied to the mobile repository/client.
- Existing web cart is PHP-session-based; mobile requires API-backed cart/checkout state.

## Confirmed Product Decisions
- Android + iOS dedicated mobile app
- No WebView-only implementation
- Web and mobile share product catalog and orders
- Languages: TR / EN / DE / JA
- Currency rule: Turkey -> TRY, outside Turkey -> EUR
- Favorites: yes
- Push notifications: yes
- Google sign-in: yes
- Payment provider: PayTR
- Mobile client never connects directly to MySQL

## Next
1. Inspect database schema/structure when supplied.
2. Lock verified API DTOs and endpoints.
3. Fix/define PayTR merchant OID and TRY/EUR payment behavior.
4. Select and record the mobile framework.
5. Initialize the mobile application.
6. Build design system + navigation shell.
7. Implement auth, catalog, favorites, cart, checkout, payment, orders, account and notifications phase-by-phase.
8. Test every backend contract and update docs/status after each implementation batch.

## Known Issues / Decisions
- Mobile framework has not yet been selected.
- API contract is not yet locked because database schema/business rules are incomplete.
- Existing website uses PHP sessions for auth and cart; these must not be treated as the mobile API architecture.
- Final production payment flow requires PayTR callback/currency verification.
- Final brand tokens must be verified from existing EnmoStore assets/site before being locked into the mobile design system.

## Current Phase
**Phase 1 — Backend Discovery / API Foundation**
