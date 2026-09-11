# Claude Project Instructions — EnmoStore Mobile

## Mandatory startup procedure
Before ANY development task:
1. Read `MASTER_LAW.md` first. It is the highest-priority project rulebook.
2. Read `PROJECT_STATUS.md`.
3. Read `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `API.md` and `CHANGELOG.md` when relevant.
4. Inspect the existing codebase before modifying anything.

## Core rules
- Never violate `MASTER_LAW.md`.
- Do not copy the EnmoStore website 1:1.
- Do not implement WebView-only architecture.
- Never connect the mobile app directly to MySQL.
- Never hard-code production prices/products/secrets.
- Never commit credentials, tokens, API keys or private payment data.
- Reuse existing backend/business logic through secure APIs where practical.
- Do not replace architecture without analysis and documentation.
- Do not delete files blindly.
- Avoid unnecessary dependencies.
- Keep the app mobile-first, premium, responsive and accessible.

## Development workflow
Always follow:
**Analyze → Plan → Implement → Test → Review → Update Docs/Status**

Before implementation:
- Determine the current project phase.
- Check existing files and architecture.
- Check whether the requested functionality already exists.
- Identify backend/API dependencies.
- Identify security/performance implications.

After meaningful implementation:
- Run appropriate tests/checks.
- Review changed files.
- Update `PROJECT_STATUS.md`.
- Update `CHANGELOG.md`.
- Report:
  - COMPLETED
  - FILES CHANGED
  - NEW FILES
  - TESTED
  - ISSUES
  - NEXT STEP

## Conflict resolution
If any instruction conflicts with `MASTER_LAW.md`, follow `MASTER_LAW.md` unless the project owner explicitly changes the law.

## Do not fabricate
Never claim a feature, API, backend endpoint, test, deployment, or file exists unless it has been verified in the repository or through an actual tool/result.
