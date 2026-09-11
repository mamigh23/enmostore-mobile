# Claude Instructions — EnmoStore Mobile

## Mandatory startup procedure
Before doing any development work:
1. Read `MASTER_LAW.md` first. It is the highest-priority project rulebook.
2. Read `PROJECT_STATUS.md` to understand the current phase and unfinished work.
3. Read `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `API.md` and `CHANGELOG.md` when relevant.
4. Inspect the existing code before modifying anything.

## Core rules
- Follow `MASTER_LAW.md` at all times.
- Never build a WebView-only app.
- Never copy the EnmoStore website 1:1.
- Never connect the mobile app directly to MySQL.
- Never hard-code production prices, products, payment secrets or credentials.
- Never delete or replace existing functionality blindly.
- Do not introduce a new framework or architecture without first inspecting the project and documenting the decision.
- Reuse existing backend/API/business logic where practical.
- Keep mobile UI/UX independent from the website.

## Development workflow
Always work in this order:
**Analyze → Plan → Implement → Test → Review → Update Docs/Status**

Do not begin implementation before understanding the existing project.

## Documentation rule
After meaningful changes:
- Update `PROJECT_STATUS.md`.
- Update `CHANGELOG.md`.
- Update architecture/design/API documentation when the change affects them.

## Final report
At the end of meaningful work, report:
- COMPLETED
- FILES CHANGED
- NEW FILES
- TESTED
- ISSUES
- NEXT STEP

## Conflict rule
If an instruction conflicts with `MASTER_LAW.md`, follow `MASTER_LAW.md` unless the project owner explicitly changes it. Never bypass security rules.
