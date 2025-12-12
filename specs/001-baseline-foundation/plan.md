# Implementation Plan: Repository Baseline Foundation

**Branch**: `001-baseline-foundation` | **Date**: 2025-12-12 | **Spec**: [specs/001-baseline-foundation/spec.md](spec.md)
**Input**: Feature specification from `/specs/001-baseline-foundation/spec.md`

## Summary

Initialize the monorepo structure with `pnpm workspaces` for the frontend and `uv` for the backend. Create the `scaffold-capability` script to automate feature creation. Establish CI/CD baseline with GitHub Actions.

## Technical Context

**Language/Version**: Python 3.12 (Backend), Node.js 20+ (Frontend/Tools), Bash (Scripts)
**Primary Dependencies**: 
- Backend: `uv` (manager), FastAPI, Ruff
- Frontend: `pnpm` (manager), React, Vite, TypeScript
**Storage**: N/A for baseline (Postgres setup in future modules)
**Testing**: `pytest` (Backend), `vitest` (Frontend)
**Target Platform**: Linux (CI/Production), macOS/Linux/Windows (Dev)
**Project Type**: Polyglot Monorepo
**Performance Goals**: Dev setup < 10 mins, Scaffold generation < 30s
**Constraints**: No TurboRepo (pnpm workspaces only). Strict separation of language toolchains.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Modular Monolith & Polyglot Monorepo**: Plan explicitly uses `apps/frontend` (pnpm) and `apps/backend` (uv).
- [x] **Capability-Based Architecture**: Scaffolding script enforces the capability structure.
- [x] **Loose Coupling & Strong Boundaries**: N/A for baseline (infrastructure only).
- [x] **Ingestion of Innovation**: N/A for baseline.
- [x] **Agent-Friendly & Scaffolding-First**: Core deliverable is the `scaffold-capability` script.
- [x] **Tenant-Aware & Configurable**: N/A for baseline.

## Project Structure

### Documentation (this feature)

```text
specs/001-baseline-foundation/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
/
├── apps/
│   ├── frontend/        # pnpm workspace root for frontend
│   └── backend/         # Python root (managed by uv)
├── packages/
│   ├── ui/              # Shared UI components
│   └── sdk/             # Generated SDK placeholder
├── scripts/
│   └── scaffold-capability.sh
├── .github/
│   └── workflows/
│       └── ci.yml
├── package.json         # Root scripts
├── pnpm-workspace.yaml  # Workspace definition
└── pyproject.toml       # Backend definition
```

**Structure Decision**: Standard polyglot monorepo layout as defined in Constitution.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
