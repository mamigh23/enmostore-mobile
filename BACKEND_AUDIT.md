# EnmoStore Existing Backend Audit

**Audit date:** 2026-09-11  
**Source reviewed:** uploaded PHP website/config/admin source archives  
**Purpose:** establish factual backend constraints before Codex/mobile implementation

## Confirmed stack
- PHP + MySQLi
- MySQL database
- Session-based website authentication
- PayTR iframe payment integration
- Server-rendered website pages
- Existing TR / EN / DE / JA language files
- Existing TRY / EUR product pricing support

## Confirmed business requirements
- Android + iOS dedicated mobile app
- No WebView-only implementation
- Mobile and web share the same products and orders
- Supported app languages: TR, EN, DE, JA
- Currency rule: Turkey -> TRY, outside Turkey -> EUR
- Favorites required
- Push notifications required
- Google sign-in required
- PayTR remains the payment provider
- Mobile client must never connect directly to MySQL

## Existing data/domain model discovered
Existing code references these core tables/domains:
- `users`
- `products`
- `categories`
- `favorites`
- `orders`
- `order_items`
- `coupons`
- `preorders`
- `settings`
- `slider_slides`
- `smtp_settings`
- `email_templates`

The exact production schema still needs either the SQL schema/export or a migration/schema dump before API DTOs are locked.

## Existing authentication
Website authentication currently uses:
- email + password
- `password_hash(..., PASSWORD_DEFAULT)` for registration
- `password_verify(...)` for login
- PHP session variables such as `user_id`, `user_name`, `user_email`, `user_role`

### Mobile implication
Do not reuse browser PHP sessions as the primary mobile authentication mechanism. Create a mobile-safe API authentication layer while keeping the existing `users`/order ownership model compatible with the website.

Google sign-in must be implemented server-side: the app obtains a Google identity token, the PHP API verifies it, resolves/creates the user, then issues the app's own authenticated session/token. Never trust Google identity data supplied by the client without server verification.

## Existing products and currency logic
The site supports:
- base TRY fields such as `price` / `sale_price`
- EUR fields such as `price_eur` / `sale_price_eur`
- TRY and EUR formatting
- IP-based country detection
- TR -> TRY
- non-TR -> EUR

The current website implementation stores currency choice in PHP session and uses IP geolocation.

### Mobile implication
Currency must be resolved by the backend/API and returned explicitly with every price/checkout context. The mobile app must not calculate or invent currency/prices locally.

Recommended API response fields include explicit values such as:
- `currency`: `TRY` or `EUR`
- `currency_symbol`
- backend-authoritative numeric prices

## Existing cart/checkout
The website cart is currently PHP-session-based.

Checkout creates:
1. an `orders` record
2. related `order_items`
3. redirects PayTR orders to payment initialization

The current order contains customer/address fields, subtotal, shipping, total, payment method and coupon data.

### Mobile implication
The mobile app needs API-backed cart/checkout state. Do not depend on a browser session cart. The server must recalculate product price, stock, coupon, shipping and final total during checkout.

## Existing favorites
Favorites are already associated with:
- `user_id`
- `product_id`

There is an existing POST-style favorites toggle flow.

### Mobile implication
Expose favorites through authenticated JSON API endpoints rather than HTML/session page actions.

## Existing orders
Website helper functions already retrieve:
- orders for a user
- a specific order with `user_id` ownership checking
- order items

### Mobile implication
Mobile and web orders can remain unified in the existing `orders` / `order_items` model. The API must enforce ownership on every order read/action.

## Existing PayTR integration
Confirmed server-side PayTR iframe/token initialization and callback hash verification.

PayTR merchant credentials are server-side settings and must never be included in the mobile app or committed to the mobile GitHub repository.

### Critical issue discovered
There is currently an order-ID format mismatch between PayTR initialization and PayTR callback parsing:
- payment initialization builds `merchant_oid` in the form `ORD{id}X{timestamp}`
- callback currently attempts to parse a form equivalent to `OR{id}T{timestamp}`

This can prevent the callback from resolving the order ID correctly. This must be fixed and regression-tested before mobile payment integration is considered production-ready.

### Additional payment constraint
The reviewed payment initialization currently sends PayTR currency as `TL` unconditionally. Since EnmoStore requirements include EUR for non-Turkey customers, PayTR currency behavior and merchant-account support must be verified and then made backend-authoritative for TRY/EUR checkout.

## Security findings
1. Database credentials/config values exist in the uploaded PHP source. Do not copy them into GitHub or mobile code.
2. PayTR secrets are retrieved server-side and must stay server-side.
3. Mobile must use HTTPS APIs only in production.
4. API must validate authorization, prices, stock, discounts, shipping and totals.
5. API errors must not leak SQL, credentials, stack traces or payment secrets.
6. Add rate limiting and authentication throttling for mobile auth endpoints.
7. Add CSRF protection where browser session endpoints remain in use; token-based mobile APIs should use their own authorization model.

## API implementation direction
Create a versioned PHP JSON API alongside the existing website, for example under `/api/v1/`, without breaking the current web pages.

Required domains:
- bootstrap/app config
- auth
- Google sign-in
- products
- categories
- search
- favorites
- cart
- checkout
- PayTR payment initiation/status
- orders
- account/profile
- shipping/address handling
- notification device registration

Do not lock request/response DTOs until the remaining schema and business rules are verified.

## Codex execution order
Codex must follow this order:
1. Read `MASTER_LAW.md`.
2. Read `PROJECT_STATUS.md`.
3. Read this `BACKEND_AUDIT.md`.
4. Read `ARCHITECTURE.md`, `API.md`, and `DESIGN_SYSTEM.md`.
5. Do not invent database columns/endpoints not verified by source/schema.
6. Build/secure the PHP API layer before wiring production commerce screens.
7. Fix PayTR merchant OID callback mismatch before payment release.
8. Verify TRY/EUR PayTR handling.
9. Initialize the mobile project only after the framework decision is recorded.
10. Update `PROJECT_STATUS.md` and `CHANGELOG.md` after every meaningful implementation batch.

## Still required from backend source
To fully lock the API contract, obtain/inspect:
- SQL schema or database export (structure is enough; no production customer data required)
- full product/variant/stock model
- exact shipping rules
- address model if separate from orders
- Google sign-in configuration strategy
- push notification provider/device-token persistence strategy

Never upload real production secrets or customer data for this purpose.
