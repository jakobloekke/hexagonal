<!--
SYNC IMPACT REPORT
Version change: (New) -> 1.0.0
Modified Principles:
- Initialized constitution with core principles from architecture strategy chat.
Added Sections:
- Modular Monolith & Polyglot Monorepo
- Capability-Based Architecture
- Loose Coupling & Strong Boundaries
- Ingestion of Innovation
- Agent-Friendly & Scaffolding-First
- Tenant-Aware & Configurable
- Governance & Compliance
Templates requiring updates:
- .specify/templates/plan-template.md (⚠ pending creation)
- .specify/templates/spec-template.md (⚠ pending creation)
- .specify/templates/tasks-template.md (⚠ pending creation)
TODOs:
- Define specific linter configs mentioned in chat (Ruff, Prettier) in repo configuration files.
-->

# SecondGen Platform Constitution

> **Version:** 1.0.0
> **Ratified:** 2025-12-12
> **Last Amended:** 2025-12-12
> **Status:** Active

This document serves as the supreme governance record for the SecondGen project. All architectural decisions, code contributions, and automated agent behaviors MUST align with these principles.

## 1. Modular Monolith & Polyglot Monorepo

**Rule:** The system is a single repository containing both the frontend (React/TypeScript) and backend (Python/FastAPI), managed as distinct but co-located toolchains.

**Rationale:** We leverage the best tools for each domain (`pnpm` for JS/TS, `uv` or `poetry` for Python) without forcing them into a single package manager. `Turborepo` orchestrates builds and tasks across both stacks to ensure efficient CI/CD and developer experience.

**Enforcement:**
-   Frontend apps and shared packages live in `apps/` and `packages/` and are managed by `pnpm workspaces`.
-   Backend applications live in `apps/backend` (or similar) and are managed by Python tooling (`uv`/`poetry`).
-   No cross-language imports; communication is strictly via API/SDK.

## 2. Capability-Based Architecture

**Rule:** Features are delivered as self-contained "Capabilities" — vertical slices encompassing frontend, backend, and data models.

**Rationale:** To maintain velocity as the system grows, we avoid monolithic entanglements. Capabilities are designed to be pluggable, enabling easier toggling, testing, and eventual extraction into microservices if needed.

**Enforcement:**
-   New features MUST be scaffolded as Capabilities.
-   Capabilities MUST expose a clear interface (routes, navigation, components).

## 3. Loose Coupling & Strong Boundaries

**Rule:** Modules must remain isolated. Backend modules own their own database tables and do not share writes.

**Rationale:** Preventing "spaghetti code" and database coupling ensures that parts of the system can be refactored or replaced without cascading failures.

**Enforcement:**
-   **No Shared Writes:** Module A cannot write to Module B’s tables.
-   **API Boundaries:** Communication between frontend and backend is mediated by typed SDKs generated from OpenAPI contracts.
-   **Feature Flags:** Capabilities should be designed to be toggled on/off per tenant.

## 4. Ingestion of Innovation ("Vibe Code")

**Rule:** High-quality prototypes (from Replit, Figma Make, etc.) are treated as first-class citizens with a structured promotion path.

**Rationale:** We value the speed of "vibe coding" and rapid prototyping. We provide a safe "ingestion pathway" to bring these solutions into the platform without compromising production stability.

**Enforcement:**
-   Prototypes enter via `packages/contrib/` or `packages/concepts/`.
-   Code follows a promotion lifecycle: **Concept** → **Previewable** → **Promotable** → **Hardened** → **Production**.
-   Experimental capabilities run behind feature flags.

## 5. Agent-Friendly & Scaffolding-First

**Rule:** The codebase is optimized for both human and AI contribution through extensive scaffolding, consistent patterns, and clear documentation.

**Rationale:** To maximize productivity, we standardize repetitive tasks. Scaffolding scripts ensure that new capabilities start with the "right" structure (tests, types, directory layout) automatically.

**Enforcement:**
-   Use `scaffold-capability` scripts for creating new modules.
-   Maintain `COMPONENTS.md` and architecture docs to guide AI agents.
-   UI components (Storybook) and Design Tokens are the source of truth for UI.

## 6. Tenant-Aware & Configurable

**Rule:** The platform is multi-tenant and configurable by default.

**Rationale:** We are building a platform, not just a single app. Features must be adaptable to different tenants' needs without code forks.

**Enforcement:**
-   Backend dependencies provide `get_current_tenant()`.
-   Features are gated by flags/permissions.

## Governance

### Amendment Procedure
1.  **Proposal:** Any contributor (human or agent) may propose an amendment via a Pull Request updating this file.
2.  **Review:** Amendments require approval from the core architectural team.
3.  **Versioning:**
    -   **MAJOR:** Fundamental changes to architecture (e.g., splitting the monorepo).
    -   **MINOR:** Adding new principles or significant guidance.
    -   **PATCH:** Clarifications and non-substantive fixes.

### Compliance
-   Automated agents (`speckit`) MUST read this constitution before generating plans or code.
-   Code reviews MUST reference specific principles when requesting changes.
