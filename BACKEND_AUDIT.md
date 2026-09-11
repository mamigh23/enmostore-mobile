# EnmoStore Existing Backend Audit

**Audit date:** 2026-09-11  
**Sources reviewed:** uploaded PHP website/config/admin source archives + `enmostore_yeni.sql` database export  
**Purpose:** establish factual backend constraints before Codex/mobile implementation

## Confirmed stack
- PHP + MySQLi
- MySQL database
- Session-based website authentication
- PayTR iframe payment integration
- Server-rendered website pages
- Existing TR / EN / DE / JA language support
- Existing TRY / EUR product pricing support

## Confirmed business requirements
- Android + iOS dedicated mobile app
- No WebView-only implementation
- Mobile and web share the same product catalog and order system
- Supported app languages: TR, EN, DE, JA
- Currency rule: Turkey -> TRY, outside Turkey -> EUR
- Favorites required
- Push notifications required
- Google sign-in required
- PayTR remains the payment provider
- Mobile client must never connect directly to MySQL

## Verified database schema
The supplied SQL export confirms these tables:
- `cart`
- `categories`
- `coupons`
- `email_templates`
- `favorites`
- `orders`
- `order_items`
- `preorders`
- `products`
- `settings`
- `slider_slides`
- `smtp_settings`
- `users`

### Users
`users` contains `id`, `first_name`, `last_name`, unique `email`, password hash, phone, address, city, role and timestamps.

There is currently no Google provider/sub/provider-id column. Google sign-in must therefore either link by verified email under a carefully defined account-linking policy or use a dedicated identity table/migration. Do not overload the password field with Google identity data.

### Products
`products` confirms:
- TRY: `price`, `sale_price`
- EUR: `price_eur`, `sale_price_eur`
- category relation
- primary image + serialized/text gallery field
- `sizes` and `colors` stored as varchar fields
- one aggregate `stock` integer
- featured/active flags
- preorder fields
- sport and SEO fields

Important: the current schema does **not** have per-size/per-color stock rows. Variants are descriptive selections while stock is aggregate at product level unless the backend source contains additional logic. Codex must not invent variant-stock tables without an explicit migration decision.

### Orders
`orders` confirms a shared order record with nullable `user_id`, customer snapshot fields, address/city/postal code, subtotal, shipping, total, 3-character currency, status, tracking fields, payment method, coupon and discount fields.

`order_items` snapshots product name/image/price/quantity/size/color/total and references the order. This model is suitable for unified web + mobile orders.

### Favorites
`favorites` has `user_id` + `product_id` with a unique composite key, so the same user cannot favorite the same product twice.

### Cart
A database `cart` table exists with optional `user_id` or `session_id`, product, quantity, size and color. The reviewed website code also uses PHP-session cart behavior. For mobile, define one authoritative API cart strategy rather than exposing raw session mechanics.

### Settings / secrets
The SQL export contains PayTR setting keys including merchant ID/key/salt/test-mode. The uploaded export also contains data rows, including production-like application data.

**Security rule:** never commit this SQL dump, credential values, SMTP values, user rows, order rows, password hashes, or other production/customer data to `enmostore-mobile`. Only schema-derived documentation/migrations with secrets and personal data removed may enter GitHub.

## Existing authentication
Website authentication uses email/password, `password_hash` / `password_verify`, and PHP sessions.

### Mobile implication
Create a mobile-safe API authentication layer while preserving compatibility with the existing `users.id` ownership model so web and mobile orders/favorites can belong to the same customer identity where appropriate.

Google sign-in must be verified server-side. Recommended schema direction is a dedicated external identity mapping (for example provider + provider subject + user_id) rather than storing Google identifiers in the password column. Any migration must be explicit and documented before implementation.

## Currency
Products already store independent TRY and EUR prices. Backend must select authoritative currency/prices based on the EnmoStore country rule and return the selected currency explicitly to mobile. The client must never convert prices itself.

## Cart / checkout
Checkout must recalculate authoritative product prices, stock, coupon, shipping and totals on the server. Mobile checkout creates records in the same `orders` and `order_items` tables as web checkout.

## PayTR
Confirmed server-side iframe/token initialization and callback hash verification.

### Critical issue
Payment initialization builds `merchant_oid` as `ORD{id}X{timestamp}` while the reviewed callback parsing expects an `OR{id}T{timestamp}`-style value. Standardize this format and regression-test success/failure callbacks before mobile payment release.

### Currency constraint
Reviewed PayTR initialization sends `TL` unconditionally. The EnmoStore account/payment configuration must be verified for EUR support; then the backend must map the authoritative order currency to the correct PayTR currency value. Never let the mobile client choose arbitrary payment currency.

## API direction
Create a versioned PHP JSON API alongside the existing website, e.g. `/api/v1/`, without breaking existing pages.

Required domains:
- app bootstrap/config
- auth + Google sign-in
- products/categories/search
- favorites
- cart
- coupon/shipping quote
- checkout
- PayTR initiation/status
- orders/tracking
- account/profile
- notification device registration

## Database/API rules for Codex
1. Reuse existing `users`, `products`, `categories`, `favorites`, `orders`, `order_items`, `coupons`, `preorders` where compatible.
2. Never expose SQL credentials or direct DB access to the app.
3. Never commit the supplied SQL data dump.
4. Never invent product variant inventory that the schema does not contain.
5. New tables required for mobile auth/device tokens/cart behavior must be introduced through explicit reviewed migrations.
6. Preserve web compatibility when adding API/mobile fields.
7. All prices, stock, discounts, shipping and order totals are server-authoritative.
8. Every order endpoint enforces user ownership.
9. Google tokens are verified server-side before account creation/linking.
10. Payment secrets remain server-side only.

## Remaining decisions before production contract is fully locked
- exact shipping-price/business rules
- whether mobile cart persists in existing `cart` table or a revised cart model
- Google account-linking policy and identity-table migration
- push provider (recommended to decide during mobile framework initialization) and device-token persistence migration
- PayTR EUR merchant/account support and exact currency mapping

## Codex execution order
1. Read `MASTER_LAW.md`.
2. Read `PROJECT_STATUS.md`.
3. Read this file.
4. Read `ARCHITECTURE.md`, `API.md`, `DESIGN_SYSTEM.md`.
5. Build from verified schema; do not invent existing fields/endpoints.
6. Define migrations for genuinely missing mobile capabilities.
7. Standardize/fix PayTR merchant OID and verify TRY/EUR behavior.
8. Initialize the chosen mobile framework after the framework decision is recorded.
9. Implement API + app phase-by-phase with tests.
10. Update `PROJECT_STATUS.md` and `CHANGELOG.md` after every meaningful batch.
