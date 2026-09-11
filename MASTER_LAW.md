# ENMOSTORE MOBILE — MASTER DEVELOPMENT LAW

**Version:** 1.0  
**Status:** ACTIVE  
**Project:** EnmoStore Mobile

This document is the highest-priority project rulebook.

## 1. Project Goal
Build a production-ready premium mobile commerce application for EnmoStore for Android and iOS. The app must support real physical-product purchases and must be a dedicated mobile product, not a website wrapper.

## 2. Absolute Design Rule
Do NOT copy the existing EnmoStore website 1:1. Preserve EnmoStore brand identity, logo, colors and visual language while creating a distinct mobile-first UI/UX optimized for touch, small screens, gestures and native platform patterns.

Forbidden:
- WebView-only packaging
- Screenshot-based UI
- 1:1 website replication

## 3. Design Philosophy
Modern, premium, young, dynamic, minimal, visual, fast and easy to use. Animations must be polished, purposeful and performance-friendly.

## 4. Responsive UI
The app must work across small and large Android phones and iPhones. No overflow, cutoffs, broken layouts or unusable touch targets.

## 5. Navigation
A typical structure may include Home, Explore/Categories, Search, Cart and Account. Improve this when UX requires it.

## 6. Product System
Product cards/details must support gallery, name, price, currency, variants/sizes, stock, favorites, add-to-cart, purchase and shipping information. Never hard-code production products or prices in the frontend.

## 7. Cart & Checkout
Cart must support quantity, removal, variants, stock validation, discounts where supported and clear totals. Preferred checkout: Cart → Address → Shipping → Payment → Confirmation.

## 8. Payments
Real purchases must use a secure backend/API. Never store CVV, hard-code payment secrets, commit private credentials or trust client-side totals without backend verification.

## 9. Account & Favorites
Support profile, orders, tracking, addresses, favorites, notifications, language, settings, privacy, terms, logout and account deletion where required. Logged-in favorites should sync with the backend; guest favorites may be local.

## 10. Search
Support product search, suggestions, recent searches, categories, price filtering, sorting, variants and availability.

## 11. Loading & Errors
Use skeleton/shimmer/spinner states appropriately. Errors must be human-readable and actionable. Never expose SQL errors, raw backend errors or stack traces.

## 12. Guest Users
Guests should be able to browse, search, view products and use the cart without mandatory login unless authentication is genuinely required.

## 13. Backend Architecture
The mobile app must NEVER connect directly to MySQL.

**APP → API → BACKEND → DATABASE**

Reuse existing EnmoStore backend/business logic through secure APIs whenever practical. Do not create redundant systems without a documented reason.

## 14. API
APIs must be secure, versioned, validated, documented and consistent. Example endpoints include `/api/v1/products`, `/api/v1/categories`, `/api/v1/auth`, `/api/v1/cart`, `/api/v1/orders`, `/api/v1/payment`. Inspect the existing backend before inventing contracts.

## 15. Security
Never commit database passwords, API secrets, payment secrets, private keys, admin credentials or access tokens. Use environment variables and keep `.env` files out of Git. Check for secrets before every push.

## 16. GitHub
Keep the repository professional. Use meaningful commits with prefixes such as `feat:`, `fix:`, `refactor:`, `docs:`, `test:` and `chore:`. Avoid giant unrelated commits.

## 17. Documentation
Maintain at minimum:
- `MASTER_LAW.md`
- `PROJECT_STATUS.md`
- `ARCHITECTURE.md`
- `DESIGN_SYSTEM.md`
- `API.md`
- `CHANGELOG.md`
- `README.md`
- `CLAUDE.md`

## 18. Code Quality
Code must be clean, readable, modular, reusable and maintainable. Avoid duplication and unnecessary dependencies. Use type safety where supported.

## 19. Performance
Optimize images, lazy-load where appropriate, paginate large data sets, cache appropriately, minimize unnecessary API calls and re-renders, manage memory carefully and optimize startup time.

## 20. Accessibility & Localization
Maintain sufficient contrast, font scaling, accessible touch targets and screen-reader labels. Keep the app localization-ready and do not scatter hard-coded user-facing strings throughout the code.

## 21. Currency & Shipping
Prices and currencies come from backend/configuration. Never hard-code production prices. Support domestic/international shipping requirements where needed, including country, address, shipping method/cost and applicable taxes/duties.

## 22. Store Preparation
Prepare Android AAB and iOS release builds, icons, splash assets, screenshots, privacy policy, terms, store metadata and required platform declarations.

## 23. Testing
Test authentication, products, product details, search, cart, checkout, payment, orders, favorites, notifications, localization, network failures and error states.

## 24. AI Development Rule
AI must inspect the existing project before changing code. Never delete blindly, replace architecture without analysis, duplicate functionality, expose secrets or add unnecessary dependencies.

Always follow:
**Analyze → Plan → Implement → Test → Review → Update Docs/Status**

## 25. Development Phases
1. Architecture
2. Design system
3. Navigation
4. Authentication
5. Home
6. Categories
7. Search
8. Product details
9. Favorites
10. Cart
11. Checkout
12. Payment
13. Orders
14. Account
15. Push notifications
16. Localization
17. Performance
18. Security audit
19. Testing
20. Store preparation

Phases may overlap when justified, but status must remain accurate.

## 26. Decision Priority
1. EnmoStore brand identity
2. `MASTER_LAW.md`
3. UX
4. Platform standards
5. Performance
6. Aesthetics

## 27. Conflict Rule
If a user instruction conflicts with this Master Law, the Master Law wins unless the project owner explicitly changes this document. Security rules must never be bypassed.

## 28. Status Reporting
After meaningful work report:
- COMPLETED
- FILES CHANGED
- NEW FILES
- TESTED
- ISSUES
- NEXT STEP

Update `PROJECT_STATUS.md` and `CHANGELOG.md` when appropriate.

## 29. Final Vision
EnmoStore Mobile must become a premium, fast, modern, mobile-first, secure and scalable commerce platform — not a mobile website.
