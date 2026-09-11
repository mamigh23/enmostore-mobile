# EnmoStore Mobile — Architecture

**Status:** Initial draft

## Architectural principle
The mobile application is a dedicated mobile frontend for EnmoStore. It must communicate with backend services through secure APIs.

**APP → API → BACKEND → DATABASE**

The mobile app must never connect directly to MySQL.

## Current state
The exact mobile framework and backend API contract have not yet been selected/documented. Do not invent them before inspecting the existing project and EnmoStore backend.

## Planned layers
- Presentation / UI
- Navigation
- State management
- API / networking
- Authentication/session
- Local persistence/cache
- Commerce domain logic
- Platform integrations

## Backend integration
The existing EnmoStore backend should be reused where practical. Product, inventory, customer, cart, order and payment business rules should remain authoritative on the backend.

## Security principles
- No secrets in source code.
- No database credentials in the app.
- No direct database connection.
- Backend validates prices, stock, discounts and order totals.
- Payment credentials remain server-side.

## Documentation rule
Update this document whenever the architecture, technology stack, API boundary or major data flow changes.
