# Research: Repository Baseline Foundation

**Status**: Complete
**Date**: 2025-12-12

## Decisions

### 1. Python Package Management
**Decision**: Use `uv`.
**Rationale**: Selected during clarification. It provides a unified, fast toolchain for Python (pip, poetry, venv replacement) which simplifies CI and dev setup in a monorepo.
**Alternatives Considered**: Poetry (slower resolution), pip+venv (too manual).

### 2. Scaffolding Script Language
**Decision**: Bash.
**Rationale**: Selected during clarification. Universal availability in CI/Dev environments and simplicity for file system operations.
**Alternatives Considered**: Node.js (more complex dependency bootstrapping), Python (requires python setup first).

### 3. CI Provider
**Decision**: GitHub Actions.
**Rationale**: Selected during clarification. Deep integration with GitHub, free tier for public/private repos, and extensive marketplace.

### 4. Build Orchestration
**Decision**: `pnpm workspaces` (native).
**Rationale**: Selected during clarification.

## Best Practices (for Implementation)

### Monorepo Root Scripts
- `pnpm dev`: Should parallelize frontend and backend dev servers.
- `pnpm lint`: Should chain `pnpm -r lint` and `uv run ruff check`.
- `pnpm test`: Should chain `pnpm -r test` and `uv run pytest`.

### Scaffolding Template
- Use `sed` or `envsubst` for template variable replacement in Bash.
- Ensure `scaffold-capability.sh` is executable (`chmod +x`).
- Check for `apps/frontend` and `apps/backend` existence before running.

