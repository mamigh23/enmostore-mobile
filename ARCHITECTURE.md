# EnmoStore Mobile — Architecture

## Status

Phase 3 — API/Auth/Catalog Foundation.

## Confirmed mobile stack

- React Native 0.81.4
- React 19.1.0
- TypeScript
- React Navigation
- `react-native-keychain` for mobile access-token storage
- Android Gradle native project
- iOS Xcode/CocoaPods native project
- GitHub Actions validation for JS quality, formatting, Android, iOS and repository safety

## System boundary

**Mobile App → Versioned JSON API → Existing PHP Backend → MySQL**

The mobile app never connects directly to MySQL and never receives database, PayTR or other private server credentials.

## Mobile application layers

### UI / Feature layer
Screens and user interaction. Feature code must not call `fetch` directly or know database/schema details.

### Domain layer
Stable app-facing types and business concepts such as session, product, category, money and pagination.

### Data / Repository layer
Feature repositories translate API contracts into domain types. Network behavior remains centralized through `ApiClient`.

### Core layer
Shared networking, localization, secure storage, environment configuration and cross-cutting infrastructure.

## API rules

- All production data comes through versioned `/api/v1/...` JSON endpoints.
- Prices, currency, stock, discounts, shipping, totals and order/payment state are server-authoritative.
- Mobile DTOs must represent the API contract, not mirror raw MySQL rows.
- No guessed backend columns or undocumented endpoint behavior.
- Authentication for mobile uses backend-issued tokens; browser PHP sessions are not reused as the mobile auth mechanism.
- Google identity must be verified server-side before an EnmoStore mobile token is issued.
- User-owned resources must be authorization-checked server-side.

## Catalog architecture

The first Phase 3 read path is:

`Screen → Repository → ApiClient → /api/v1/... → PHP backend → MySQL`

Initial contract families:
- bootstrap
- products
- categories
- search

Do not invent variant-level inventory. The audited database currently has aggregate product stock and product-level size/color fields but no normalized variant-stock table.

## Authentication architecture

Planned mobile auth flow:
1. app submits supported credentials or a Google identity token to the PHP JSON API
2. backend verifies identity using existing user records/provider verification
3. backend issues its own revocable mobile access token/session
4. app stores only the backend-issued token in secure storage
5. `ApiClient` sends the bearer token and treats HTTP 401 as authoritative

Exact server persistence/migration for mobile tokens and Google identity linking must be implemented in the backend, not guessed in the mobile repository.

## Cart / checkout boundary

The current website session cart is not the mobile cart architecture. Mobile cart/checkout requires a server-authoritative API that revalidates product, quantity, stock, price, currency, coupons, shipping and totals before order creation.

Shared orders must continue using the existing `orders` / `order_items` records.

## Payments

PayTR remains server-only. The app must never contain merchant key/salt or decide that a payment succeeded. PayTR callback/backend order state is authoritative.

Known release blockers remain:
- `merchant_oid` generation/callback parsing mismatch in the reviewed backend
- reviewed initialization hardcodes `TL`; EUR behavior requires verified implementation/account support

## Security constraints

- HTTPS in production
- no secrets in source control
- no direct DB access from mobile
- no WebView-wrapper architecture
- no client-authoritative prices/totals/payment state
- safe error envelopes only; no SQL/stack traces/filesystem paths

## CI architecture

Phase 2 established blocking validation for:
- TypeScript
- ESLint
- Jest
- Prettier
- Android `assembleDebug`
- iOS simulator build on `macos-15`
- repository secret/signing artifact checks
- direct DB usage rejection
- WebView-wrapper rejection

These gates remain mandatory for Phase 3 changes.

## Documentation rule

Update this document whenever the stack, API boundary, repository layering, auth model or major data flow changes.
