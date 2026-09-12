# Changelog

All meaningful project changes are recorded here.

## 2026-09-12

### Phase 2 mobile foundation hardening
- React Native 0.81.4 + TypeScript mobile foundation is tracked on `work`.
- Added API-client regression coverage for URL normalization, empty responses, conditional JSON headers, bearer auth, malformed JSON handling and 401 preservation when secure-token cleanup fails.
- Added GitHub Actions Phase 2 CI covering JavaScript quality, Android native build, iOS simulator build and repository safety.
- Repository safety checks reject committed signing/private-key material, direct MySQL/MySQLi/PDO use in the mobile source, and WebView-wrapper implementations.
- GitHub-hosted npm install succeeded, resolving the earlier Codex sandbox registry 403 limitation.
- JavaScript validation passes: TypeScript, ESLint and Jest (3 suites / 8 tests).
- Android native scaffolding is complete and `assembleDebug` passes in GitHub Actions.
- iOS Xcode project/shared scheme scaffolding is complete; project validation and CocoaPods installation pass in GitHub Actions.
- iOS CI was pinned to `macos-15` after `macos-latest` moved to an incompatible Xcode 26.x environment for the React Native 0.81.4 third-party `fmt` dependency.
- Fixed invalid single-line Swift conditional-compilation syntax in `ios/EnmoStore/AppDelegate.swift`.
- iOS simulator build now passes on `macos-15` with Xcode 16.4.
- Prettier formatting currently passes and has been promoted from a non-blocking audit to a blocking Phase 2 CI gate.
- Phase 2 is in final merge validation; the current `work` head must remain fully green before merge.

## 2026-09-11

### Documentation foundation
- Added `MASTER_LAW.md` as the canonical project rulebook.
- Added/strengthened `CLAUDE.md` with mandatory AI development instructions.
- Added/updated `PROJECT_STATUS.md` for project phase tracking.
- Added/strengthened `ARCHITECTURE.md` with the target app-to-API architecture.
- Added/strengthened `DESIGN_SYSTEM.md` with mobile-first UI/UX principles.
- Added/strengthened `API.md` with API discovery and security requirements.
- Verified GitHub write access for the project repository.
- Audited the existing EnmoStore PHP/MySQL backend and database schema.
