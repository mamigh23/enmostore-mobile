# EnmoStore Mobile — Architecture

## Status
Architecture definition phase.

## Current stack
**TBD — do not assume a framework before project inspection and explicit decision.**

## Target architecture
**Mobile App → Secure API → Existing/Shared Backend → Database**

The mobile app must never connect directly to MySQL.

## Architecture principles
- Mobile-first frontend
- Reuse existing EnmoStore backend/business logic where practical
- Secure API boundary
- Clear separation of UI, state, networking, domain/business logic and data
- Environment-based configuration
- No secrets in source control
- Scalable and testable modules
- Offline/local caching only where useful and safe

## Before implementation
Inspect:
1. Existing repository contents
2. Existing EnmoStore website/backend
3. Existing API endpoints
4. Authentication model
5. Product/catalog model
6. Cart/order model
7. Payment integration
8. Shipping/currency/tax logic
9. Existing assets and brand identity

## Technology decision
The framework and supporting technologies must be explicitly selected after inspection. Do not fabricate a stack.

## Architectural decision record
No final technology decision has been made yet.

## Documentation rule
Update this document whenever the architecture, technology stack, API boundary or major data flow changes.
