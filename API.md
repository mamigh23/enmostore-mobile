# EnmoStore Mobile — API

**Status:** Initial draft

## API principle
The mobile app communicates with EnmoStore through secure backend APIs. The mobile app must never connect directly to MySQL.

## Expected domains
The API will likely need domains for:
- Authentication
- Products
- Categories
- Search
- Favorites
- Cart
- Addresses
- Shipping
- Orders
- Payments
- Notifications
- Account

## Example versioned routes
These are examples only and must not be implemented until the existing backend is inspected:

- `/api/v1/auth`
- `/api/v1/products`
- `/api/v1/categories`
- `/api/v1/search`
- `/api/v1/favorites`
- `/api/v1/cart`
- `/api/v1/orders`
- `/api/v1/payment`

## Security requirements
- HTTPS in production.
- Authentication/session tokens must be handled securely.
- Server validates authorization, prices, stock, discounts and order totals.
- Payment secrets remain server-side.
- Never expose database credentials to the mobile client.

## API contract rule
Do not guess request/response formats. Inspect the existing EnmoStore backend and document the actual contract here before implementation.

## Error handling
API errors should use consistent machine-readable codes and human-readable messages. The mobile app must convert technical failures into clear user-facing states.
