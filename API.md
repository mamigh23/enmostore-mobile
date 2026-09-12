# EnmoStore Mobile — API

## Status

Phase 3 contract baseline is active for the first read-only mobile API batch. These are target JSON contracts for implementation; they are not proof that the PHP endpoints already exist.

## Core rule

The mobile app communicates only through secure, versioned JSON APIs. It never connects directly to MySQL and never receives payment/database secrets.

## Confirmed backend facts

- PHP + MySQLi backend
- MySQL database
- session-based website authentication and cart
- existing `users`, `products`, `categories`, `favorites`, `orders`, `order_items`, `coupons`, `preorders`, `settings`
- existing PayTR integration/callback handling
- TR / EN / DE / JA support
- TRY / EUR product pricing
- Turkey -> TRY, non-Turkey -> EUR website currency rule
- web and mobile must share products and orders

See `BACKEND_AUDIT.md` for source/schema findings and known blockers.

## API principles

- Base family: `/api/v1/...`
- JSON request/response contract
- backend-authoritative price, currency, stock, discounts, shipping, totals and order/payment state
- safe stable error envelope
- HTTPS in production
- mobile token/session model separate from browser PHP sessions
- DTOs are API contracts, not raw database rows
- no guessed tables/columns/variant inventory

## Locked response envelope

Successful single-resource response:

```json
{
  "data": {}
}
```

Successful list response:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 0,
    "totalPages": 0
  }
}
```

Error response:

```json
{
  "error": {
    "code": "stable_machine_code",
    "message": "Safe human-readable message",
    "fields": {}
  }
}
```

Rules:
- `fields` is optional and only for safe validation details.
- Never expose SQL, stack traces, filesystem paths or secrets.
- HTTP status remains authoritative; the envelope does not replace correct HTTP status codes.

## Locked common value objects

### Money

```json
{
  "amount": 1299.9,
  "currency": "TRY"
}
```

Rules:
- `currency` is explicit ISO-style code used by the backend contract (`TRY` / `EUR` for the current business rules).
- Mobile never chooses between raw TRY/EUR database columns.
- Client does not recalculate authoritative commerce totals.

### Pagination meta

```json
{
  "page": 1,
  "perPage": 20,
  "total": 120,
  "totalPages": 6
}
```

All values are non-negative integers; `page` and `perPage` are positive for paginated responses.

## Phase 3 Batch A — locked read contracts

### `GET /api/v1/bootstrap`

Purpose: safe startup configuration.

Target response data:

```json
{
  "supportedLocales": ["tr", "en", "de", "ja"],
  "currency": "TRY"
}
```

Notes:
- Backend determines the effective currency; mobile does not infer production pricing rules independently.
- Do not expose private settings/credentials from the existing `settings` domain.

### `GET /api/v1/products`

Query planning:
- `page`
- `perPage`
- optional category/filter/sort parameters only after backend implementation confirms exact supported values

Target product-list item:

```json
{
  "id": 123,
  "name": "Product name",
  "price": {
    "amount": 1299.9,
    "currency": "TRY"
  },
  "imageUrl": "https://...",
  "inStock": true
}
```

Locked semantics:
- `id` is the server product identifier.
- `price` is backend-authoritative.
- `imageUrl` may be `null` when no safe image exists.
- `inStock` is backend-derived and does not expose raw inventory internals.

Do not add guessed SKU/variant-stock fields. The audited schema does not have normalized per-size/per-color inventory.

### `GET /api/v1/products/{id}`

Target detail extends the list item with safe display data:

```json
{
  "id": 123,
  "name": "Product name",
  "description": "Product description",
  "price": {
    "amount": 1299.9,
    "currency": "TRY"
  },
  "images": ["https://..."],
  "inStock": true,
  "sizes": [],
  "colors": []
}
```

Rules:
- `sizes` / `colors` represent product-level selectable/display values only when the backend can derive them from verified existing data.
- They must not imply per-variant stock unless a real backend migration is implemented later.

### `GET /api/v1/categories`

Target category item:

```json
{
  "id": 10,
  "name": "Category name",
  "parentId": null,
  "imageUrl": null
}
```

`parentId` may be `null` for root categories.

### `GET /api/v1/search?q=...`

Returns the same paginated product-list item contract as `/products`.

Rules:
- Query must be validated server-side.
- Search implementation may reuse existing product name/description logic, but mobile receives normalized JSON only.
- Empty/invalid query behavior must be explicit in backend implementation/tests.

## Authentication — contract planning, not yet locked

Required capabilities:
- email/password login
- registration
- logout/revoke
- current profile
- Google sign-in

Google rule:
1. app obtains Google identity token
2. PHP backend verifies it with Google
3. backend resolves/creates/links the EnmoStore user
4. backend issues its own mobile authorization token/session

Never trust client-supplied Google profile claims without server verification.

The audited `users` schema has no Google identity fields and no mobile token/session persistence, so exact auth DTOs and migrations must be designed against the backend before locking them here.

## Favorites

Existing favorites are user/product based. Planned capabilities:
- list
- add
- remove

Exact routes/auth envelope will be locked with the mobile auth contract.

## Cart

The website PHP-session cart must not be reused as the mobile architecture.

Mobile cart API must:
- identify products by server ID
- validate quantity/selectable values
- re-read current price/stock server-side
- calculate subtotal/discounts server-side
- return explicit currency

Persistence strategy remains pending backend design.

## Checkout / orders

Server must revalidate:
- product price
- stock
- coupon
- shipping
- currency
- subtotal/total
- address/customer inputs

Checkout must create the shared existing `orders` / `order_items` records so web/mobile history remains unified.

Every order read/action must enforce user ownership server-side.

## PayTR

Payment credentials remain server-only. The PayTR callback/backend order state is authoritative; client success screens are not.

Known release blockers:
1. reviewed payment initialization generates `merchant_oid` as `ORD{id}X{timestamp}` while callback parsing expects a different `OR{id}T...` pattern
2. reviewed initialization sends `TL` unconditionally; TRY/EUR behavior must be verified/implemented correctly before international checkout release

Do not claim these backend issues are fixed from changes in the mobile repository.

## Notifications / addresses / shipping

Still pending backend decisions:
- device-token persistence/provider
- address persistence model
- exact shipping rules/methods/costs

Do not fabricate these contracts yet.

## Security baseline

- HTTPS only in production
- revocable/expiring mobile auth tokens
- authorization on every user-owned resource
- rate limiting/auth throttling
- strict input validation
- prepared statements
- server-side commerce calculations
- PayTR callback hash verification
- secrets from secure server environment/config only
- remaining browser session POST actions retain appropriate CSRF protection

## Codex implementation rule

Before implementing mobile or backend API code, Codex must read `MASTER_LAW.md`, `PROJECT_STATUS.md`, `BACKEND_AUDIT.md`, `ARCHITECTURE.md`, and this file.

For Phase 3 Batch A, Codex may implement mobile types/repositories/tests only for the locked bootstrap/products/categories/search contracts above. It must not fabricate backend endpoint existence, add guessed database fields, implement PayTR, invent variant stock, or claim integration tests against an unavailable backend.
