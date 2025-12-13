# Implementation Plan: Replit & Agent Integration Support

**Branch**: `004-replit-agent-support` | **Date**: 2025-12-13 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/004-replit-agent-support/spec.md`

## Technical Context

**Language/Version**: Nix (for Replit config), Markdown (for AI Guide), Bash (for scripts)
**Primary Dependencies**: None (system level configuration)
**Target Platform**: Replit (Nix environment), Local Dev (macOS/Linux)
**Project Type**: Infrastructure / Documentation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Alignment | Evidence |
|---|---|---|
| **Modular Monolith & Polyglot Monorepo** | ✅ PASS | Configures polyglot env (Node+Python) in `replit.nix`. |
| **Capability-Based Architecture** | N/A | Infra feature, not a business capability. |
| **Loose Coupling & Strong Boundaries** | N/A | Does not affect module coupling. |
| **Ingestion of Innovation** | ✅ PASS | Directly enables this principle by smoothing Replit on-ramp. |
| **Agent-Friendly & Scaffolding-First** | ✅ PASS | Creates explicit `AI_GUIDE.md` context for agents. |
| **Tenant-Aware & Configurable** | N/A | Infra feature. |

## Phase 0: Research

**Status**: Complete. See `research.md`.
- Confirmed `pkgs.nodejs-20_x`, `pkgs.python311`, `pkgs.nodePackages.pnpm` are the correct Nix packages.
- Confirmed `.replit` run command should be `pnpm dev`.

## Phase 1: Design & Contracts

**Project Structure**

```text
/
├── replit.nix          # Nix environment definition
├── .replit             # Replit run configuration
└── docs/
    └── AI_GUIDE.md     # Context file for AI Agents
```

**Data Model**: N/A (Config/Docs only)

**API Contracts**: N/A

## Phase 2: Implementation

**Feature Scope**:
1.  **Infrastructure**: Create `replit.nix` and `.replit` with pinned versions (Node 20, Py 3.11, uv) and run command (`pnpm dev`).
2.  **Documentation**: Author `docs/AI_GUIDE.md` with strict stack constraints (Tailwind, Lucide, Framer Motion) and usage examples for `@secondgen/ui`.
3.  **Validation**: Verify files exist and contain correct content.

**Complexity Tracking**: Low complexity, high impact. Purely additive configuration.
