# Changelog

All meaningful project changes are recorded here.

## 2026-09-12

### Phase 2 mobile foundation
- Initialized React Native 0.81.4 + TypeScript native Android/iOS foundation.
- Added six-tab navigation, TR/EN/DE/JA localization, design tokens, API client and secure token storage foundation.
- Added centralized HTTP error normalization and protected 401 token cleanup so local Keychain cleanup cannot mask the server response.
- Added Android Gradle wrapper and aligned Android SDK/NDK/Kotlin values with the official React Native 0.81-stable template.
- Added iOS Xcode project, shared scheme, LaunchScreen, asset catalog and privacy manifest.
- Added Phase 2 GitHub Actions validation for TypeScript, ESLint, Jest, Prettier, Android debug build and iOS static project validation.
- Added API error mapping regression tests.

### Validation status
- Earlier Codex dependency installation and Android build attempts were blocked by outbound HTTP 403 proxy restrictions; GitHub CI is now the authoritative next validation path.
- Phase 3 has not been started by this hardening batch.

## 2026-09-11

### Documentation and backend discovery
- Added the canonical project documentation set.
- Audited the existing PHP/MySQL backend and SQL schema.
- Documented mobile API, authentication, pricing/currency and PayTR release blockers.
