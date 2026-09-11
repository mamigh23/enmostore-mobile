# EnmoStore Mobile — API

## Status
Backend discovery completed for the uploaded PHP config/admin source. API contract design can now start, but final DTOs must wait for the SQL schema/structure and remaining business-rule verification.

## Core rule
The mobile app communicates only through secure JSON APIs. It never connects directly to MySQL and never receives payment/database secrets.

## Confirmed existing backend behavior
- PHP + MySQLi backend
- MySQL database
- Session-based website authentication
- Session-based website cart
- Existing `users`, `products`, `categories`, `favorites`, `orders`, `order_items`, `coupons`, `preorders`, `settings` domains
- Existing PayTR iframe/token integration
- Existing PayTR server callback/hash verification
- Existing TR / EN / DE / JA language support
- Existing TRY / EUR product price support
- Turkey -> TRY, non-Turkey -> EUR website currency rule
- Web and mobile must share products and orders

See `BACKEND_AUDIT.md` for the detailed source audit and known issues.

## API principles
- Versioned (`/api/v1/...`)
- JSON request/response contract
- Authenticated where required
- Server-authoritative prices, stock, discounts, shipping, currency, totals and order state
- Consistent error envelope
- HTTPS in production
- No SQL/stack-trace/secret leakage
- Mobile-safe token/session model separate from browser PHP session mechanics
- Backward-compatible with the existing website where practical

## Required API domains

### App/bootstrap
Returns backend-authoritative app configuration needed at startup, such as supported languages/currencies and safe public configuration.

### Authentication
Required capabilities:
- email/password login
- registration
- logout/revoke
- current user/profile
- Google sign-in

Existing website password hashing uses PHP `password_hash` / `password_verify` and can remain compatible with existing user records.

Google sign-in rule:
1. mobile obtains Google identity token
2. PHP backend verifies token with Google
3. backend resolves/creates the EnmoStore user
4. backend issues its own mobile authorization token/session

Never trust client-supplied Google profile claims without server verification.

### Products
Required capabilities:
- product list
- product detail
- featured products
- related products
- stock/availability
- variant/size information once schema is verified

Prices returned by the API must include explicit currency and numeric amount. The app must not select `price` vs `price_eur` by itself.

### Categories
- parent categories
- child categories
- category product lists

### Search
Existing backend searches product name/description. Mobile API should expose normalized paginated JSON search.

### Favorites
Existing favorites are user/product based. Required API:
- list favorites
- add favorite
- remove favorite
- optional idempotent toggle only if useful

### Cart
Existing website cart is PHP-session-based and must not be reused as the mobile architecture.

Mobile cart API/server contract must:
- identify products by server IDs
- validate quantity/variant
- re-read current price/stock server-side
- calculate subtotal server-side
- apply coupons server-side
- return current currency explicitly

Exact persistence strategy will be locked after account/cart schema decisions.

### Checkout
Server must validate/recalculate:
- product prices
- stock
- coupon
- shipping
- currency
- subtotal
- total
- address/customer inputs

Checkout must create the shared existing `orders` / `order_items` records so web and mobile order history remain unified.

### Payments / PayTR
Payment credentials remain server-only.

Required capabilities:
- initialize PayTR payment for an owned pending order
- return only safe client payment/session information
- process PayTR server callback
- expose backend-authoritative payment/order status

Known backend issues that must be resolved before release:
1. payment initialization currently generates `merchant_oid` as `ORD{id}X{timestamp}` while callback parsing expects a different `OR{id}T{timestamp}`-style pattern
2. reviewed PayTR initialization currently sets currency to `TL` unconditionally; TRY/EUR behavior must be verified and implemented correctly for international checkout

The PayTR callback, not the client success screen, is authoritative for payment completion.

### Orders
Existing backend already has ownership-aware order helper logic.

Required capabilities:
- list current user's orders
- order detail
- order items
- status/tracking data where available

Every order lookup/action must enforce user ownership server-side.

### Account/profile
Required capabilities:
- current profile
- update safe profile fields
- password/account actions as supported
- account deletion flow as required by store policy/project law

### Shipping / addresses
Exact API contract is pending verification of shipping rules and whether addresses are stored independently or only copied into orders.

### Notifications
Required capabilities:
- register/update mobile device push token
- unregister token on logout/device changes
- support order-status notifications
- support campaign/announcement notifications according to user permissions/preferences

Provider and persistence strategy are still to be selected.

## Proposed route families
These are route families for implementation planning, not proof that endpoints already exist:
- `/api/v1/bootstrap`
- `/api/v1/auth/*`
- `/api/v1/products/*`
- `/api/v1/categories/*`
- `/api/v1/search`
- `/api/v1/favorites/*`
- `/api/v1/cart/*`
- `/api/v1/checkout/*`
- `/api/v1/orders/*`
- `/api/v1/payments/paytr/*`
- `/api/v1/account/*`
- `/api/v1/notifications/devices/*`

Do not implement guessed columns/request fields. Verify schema/business rules first.

## Response rules
Use a consistent JSON envelope. Exact shape will be locked before implementation.

Errors should contain:
- stable machine-readable error code
- safe human-readable message or localization key
- optional field validation details

Never include:
- raw SQL
- database credentials
- PayTR merchant key/salt
- PHP stack traces in production
- internal filesystem paths

## Security baseline
- HTTPS only in production
- strong mobile auth tokens with expiration/revocation strategy
- authorization checks on every user-owned resource
- rate limiting/auth throttling
- strict input validation
- prepared statements
- server-side total calculations
- payment callback hash verification
- secrets from environment/secure server config, never mobile repo
- CSRF protection for remaining browser session POST actions

## Remaining blockers before locking contract
- SQL schema/structure export
- product variant/size/stock schema
- shipping rules
- address persistence model
- PayTR TRY/EUR merchant/account behavior
- Google sign-in backend configuration
- push provider and device-token persistence

## Codex rule
Before implementing an API endpoint, Codex must read `MASTER_LAW.md`, `PROJECT_STATUS.md`, `BACKEND_AUDIT.md`, and this file. It must inspect the relevant backend/schema and must not fabricate tables, columns, endpoints or successful tests.
