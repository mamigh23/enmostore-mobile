# PROJECT STATUS

**Project:** EnmoStore Mobile  
**Status:** Phase 1 — Backend Discovery / API Foundation  
**Last Updated:** 2026-09-11

## Completed
- [x] GitHub repository/documentation foundation
- [x] Existing PHP/MySQL backend source inspected
- [x] SQL database export inspected
- [x] Core database schema verified
- [x] Session auth identified
- [x] Product/category/order/favorites/coupon/preorder domains verified
- [x] TR/EN/DE/JA localization confirmed
- [x] TRY/EUR product fields confirmed
- [x] Shared `orders` + `order_items` model confirmed for web/mobile
- [x] Favorites unique user/product relationship confirmed
- [x] Existing database cart table identified
- [x] PayTR iframe/token/callback integration confirmed
- [x] Backend/schema audit documented in `BACKEND_AUDIT.md`

## In Progress
- [ ] Lock mobile-safe PHP JSON API contract
- [ ] Decide mobile technology stack
- [ ] Define token-based auth + Google identity linking migration
- [ ] Define API cart persistence strategy
- [ ] Define push notification architecture/device-token migration
- [ ] Verify exact shipping rules
- [ ] Verify PayTR EUR merchant/account support

## Critical Findings
- PayTR `merchant_oid` initialization/callback parsing formats are inconsistent and must be standardized/tested.
- Reviewed PayTR initialization sends `TL` unconditionally; international EUR checkout needs verified backend mapping/account support.
- SQL export contains PayTR setting values and application/customer data. It must never be committed to the mobile repository.
- `products` has TRY/EUR price fields and aggregate stock, but no per-size/per-color inventory table. Codex must not invent variant inventory without an explicit migration.
- `users` has no Google provider identity columns/table. Google sign-in requires a deliberate server-side identity-linking design/migration.
- Mobile and web orders will use the same `orders` / `order_items` records.

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

## Next Execution Batch
1. Record mobile framework decision.
2. Define secure API response/error/auth conventions.
3. Create reviewed DB migrations only for missing mobile capabilities (external identities/device tokens and any chosen persistent cart additions).
4. Implement PHP `/api/v1` foundation without breaking website routes.
5. Fix PayTR merchant OID handling and test callback parsing.
6. Verify/map TRY/EUR PayTR behavior.
7. Initialize mobile project and design/navigation shell.
8. Implement auth/catalog/favorites/cart/checkout/orders/account/notifications phase-by-phase.

## Current Phase
**Phase 1 — Backend Discovery / API Foundation**
