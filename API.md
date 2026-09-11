# EnmoStore Mobile — API

## Status
API contract discovery phase.

## Rule
The mobile app must communicate through secure APIs. It must never connect directly to MySQL.

## API principles
- Versioned
- Authenticated where required
- Validated
- Consistent response/error format
- Secure
- Documented
- Backend-authoritative for prices, stock, totals and order state

## Planned domains
- Authentication
- Products
- Categories
- Search
- Favorites
- Cart
- Checkout
- Orders
- Payments
- Addresses
- Shipping
- Notifications
- Account

## Example routes
These are placeholders only until the existing backend is inspected:
- `/api/v1/auth`
- `/api/v1/products`
- `/api/v1/categories`
- `/api/v1/search`
- `/api/v1/favorites`
- `/api/v1/cart`
- `/api/v1/checkout`
- `/api/v1/orders`
- `/api/v1/payment`

## Important
Do not implement or rely on placeholder endpoints as if they already exist. Verify the existing EnmoStore backend first.

## Security
- HTTPS in production.
- Authentication/session tokens must be handled securely.
- Server validates authorization, prices, stock, discounts and order totals.
- Payment secrets remain server-side.
- Never expose database credentials to the mobile client.

## Error handling
API errors should use consistent machine-readable codes and human-readable messages. The mobile app must convert technical failures into clear user-facing states.

## Contract rule
Do not guess request/response formats. Inspect the existing EnmoStore backend and document the actual contract here before implementation.
