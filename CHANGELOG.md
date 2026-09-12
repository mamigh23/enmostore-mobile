# Changelog

All meaningful project changes are recorded here.

## 2026-09-12

### Phase 2 mobile foundation hardening
- React Native 0.81.4 + TypeScript mobile foundation is now tracked on `work`.
- Added API-client regression coverage for URL normalization, empty responses, conditional JSON headers, bearer auth, malformed JSON handling and 401 preservation when secure-token cleanup fails.
- Added GitHub Actions Phase 2 CI.
- CI now validates dependency installation, TypeScript, ESLint, Jest and repository safety rules.
- Repository safety checks reject committed signing/private-key material, direct MySQL/MySQLi/PDO use in the mobile source, and WebView-wrapper implementations.
- GitHub-hosted npm install succeeded, resolving the earlier Codex sandbox registry 403 limitation.
- Current JS validation result: TypeScript PASS, ESLint PASS, Jest PASS (3 suites / 8 tests).
- Prettier baseline debt was detected in existing foundation files and is temporarily non-blocking until normalized.
- Native Android/iOS build validation remains outstanding; Phase 2 is not ready for merge.

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
