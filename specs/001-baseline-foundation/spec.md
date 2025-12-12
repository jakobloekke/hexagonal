# Feature Specification: Repository Baseline Foundation

**Feature Branch**: `001-baseline-foundation`
**Created**: 2025-12-12
**Status**: Draft
**Input**: User description: "Now let's specify the first feature, which is the baseline. We need to lay the foundation for this repository so we can start adding features."

## Clarifications

### Session 2025-12-12
- Q: Which Python package manager should be used? → A: **uv** (Fast, modern, monolithic tool).
- Q: Which language should the scaffolding script be written in? → A: **Bash** (Universal, simple filesystem ops).
- Q: Which CI provider should be used? → A: **GitHub Actions** (Integrated, standard).
- Q: Should TurboRepo be included? → A: **No, pnpm workspaces only** (Keep it simple initially).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer Setup & Installation (Priority: P1)

A new developer clones the repository and sets up their local environment to begin contributing.

**Why this priority**: Essential for any development to occur. If developers cannot run the project, no features can be built.

**Independent Test**: Clone repo -> Run setup command -> Verify all dependencies installed and "hello world" state runs.

**Acceptance Scenarios**:

1. **Given** a clean machine with prerequisites (Node, Python), **When** developer runs `pnpm install` and backend setup, **Then** all dependencies fetch without error.
2. **Given** the installed repo, **When** developer runs `pnpm dev`, **Then** the development server (or shell) starts without crashing.
3. **Given** the installed repo, **When** developer runs `pnpm lint`, **Then** no linting errors are reported on the baseline code.

---

### User Story 2 - Capability Scaffolding (Priority: P2)

A developer wants to add a new feature (Capability) to the system using the standard architecture.

**Why this priority**: Enforces the "Agent-Friendly & Scaffolding-First" principle from the Constitution. Ensures all new features follow the correct structure from day one.

**Independent Test**: Run scaffold script -> Verify files created -> Verify new module is recognized by build system.

**Acceptance Scenarios**:

1. **Given** the repo root, **When** running `scripts/scaffold-capability.sh new-feature`, **Then** a new directory structure is created in `apps/` and `packages/` according to the template.
2. **Given** a scaffolded capability, **When** running tests, **Then** the generated placeholder tests pass.
3. **Given** a scaffolded capability, **When** checking `pnpm-workspace.yaml` (or implicit workspace resolution), **Then** the new package is linked.

---

### User Story 3 - CI/CD Baseline (Priority: P3)

The build system automatically verifies code quality on every push.

**Why this priority**: Establishes the quality gate immediately, preventing regression as soon as the first real feature lands.

**Independent Test**: Push to branch -> Observe GitHub Actions (or equivalent) -> Verify success.

**Acceptance Scenarios**:

1. **Given** a push to `main` or feature branch, **When** CI pipeline runs, **Then** it executes linting for both frontend (JS/TS) and backend (Python).
2. **Given** a push, **When** CI pipeline runs, **Then** it executes unit tests for both stacks.

---

### Edge Cases

- **Network Failure**: Setup scripts should handle partial downloads or network interruptions gracefully (or fail clearly).
- **Version Mismatches**: Setup should verify or enforce correct Node/Python versions to prevent "works on my machine" issues.
- **Existing Directories**: Scaffolding script should abort if the target capability name already exists.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST be configured as a monorepo with `apps/frontend` (pnpm managed) and `apps/backend` (Python tooling managed) co-located.
- **FR-002**: System MUST include a `pnpm-workspace.yaml` defining `apps/frontend` and `packages/*` as the workspace.
- **FR-003**: System MUST include a root `package.json` with scripts to orchestrate tasks across the stack (e.g., `dev`, `lint`, `test`, `build`).
- **FR-004**: System MUST include a `scripts/scaffold-capability.sh` (Bash) script that generates:
    - Frontend feature folder (`apps/frontend/src/features/[name]`)
    - Backend module folder (`apps/backend/app/modules/[name]`)
    - Shared UI component folder (`packages/ui/src/components/[name]`)
    - SDK placeholder (`packages/sdk/src/[name]`)
- **FR-005**: System MUST include a backend dependency definition file (`pyproject.toml`) managed by `uv`.
- **FR-006**: System MUST have Prettier and a Python linter (e.g., Ruff) configured with a shared configuration where applicable.
- **FR-007**: System MUST have a GitHub Actions CI configuration file (`.github/workflows/ci.yml`) that runs linting and testing stages.

### Key Entities

- **Capability**: A logical grouping of code spanning frontend, backend, and shared packages, identifiable by a unique name.
- **Workspace**: The root configuration linking all JavaScript/TypeScript packages.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new developer can complete the "from clone to running dev server" process in under 10 minutes on a standard machine.
- **SC-002**: The `scaffold-capability` script generates a fully compliant, test-passing feature skeleton in under 30 seconds.
- **SC-003**: The baseline CI pipeline completes (install + lint + test) in under 5 minutes.
- **SC-004**: 100% of generated scaffold code passes the configured linting rules by default.
