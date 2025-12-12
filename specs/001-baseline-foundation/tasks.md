---
description: "Task list for Repository Baseline Foundation"
---

# Tasks: Repository Baseline Foundation

**Input**: Design documents from `/specs/001-baseline-foundation/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Tests included to verify infrastructure setup (no TDD required for infrastructure scripts).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Root**: `/`
- **Frontend**: `apps/frontend/`
- **Backend**: `apps/backend/`
- **Scripts**: `scripts/`
- **Packages**: `packages/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Git repository (if not already initialized) and .gitignore at root
- [x] T002 Create root `package.json` with scripts (`dev`, `lint`, `test`, `build`)
- [x] T003 Create `pnpm-workspace.yaml` defining `apps/frontend` and `packages/*`
- [x] T004 [P] Create `.editorconfig` for consistent coding style across languages

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Initialize `apps/frontend` as a Vite React project
- [x] T006 Initialize `apps/backend` with `uv init` and `pyproject.toml`
- [x] T007 [P] Create `packages/ui` package structure with `package.json`
- [x] T008 [P] Create `packages/sdk` package structure with `package.json`
- [x] T009 [P] Setup global linting configuration (Prettier root config)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Developer Setup & Installation (Priority: P1) 🎯 MVP

**Goal**: A new developer clones the repository and sets up their local environment to begin contributing.

**Independent Test**: Clone repo -> Run setup command -> Verify all dependencies installed and "hello world" state runs.

### Implementation for User Story 1

- [x] T010 [US1] Configure `pnpm install` behavior in root
- [x] T011 [US1] Add `setup` script to root `package.json` chaining backend installation
- [ ] T012 [US1] Implement `pnpm dev` to run frontend and backend concurrently (e.g. using `concurrently` or `turbo` if added later, currently basic shell parallel)
- [x] T013 [US1] Add basic "Hello World" endpoint in `apps/backend/app/main.py`
- [x] T014 [US1] Add basic AppShell in `apps/frontend/src/App.tsx` consuming backend
- [x] T015 [US1] Verify `pnpm lint` runs across both stacks

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Capability Scaffolding (Priority: P2)

**Goal**: A developer wants to add a new feature (Capability) to the system using the standard architecture.

**Independent Test**: Run scaffold script -> Verify files created -> Verify new module is recognized by build system.

### Implementation for User Story 2

- [x] T016 [US2] Create `scripts/scaffold-capability.sh` with executable permissions
- [x] T017 [US2] Implement argument parsing (capability name) in scaffolding script
- [x] T018 [US2] Implement frontend directory generation in `apps/frontend/src/features/`
- [x] T019 [US2] Implement backend directory generation in `apps/backend/app/modules/`
- [x] T020 [US2] Implement shared package generation in `packages/ui/` and `packages/sdk/`
- [x] T021 [US2] Add template files for new capabilities (React component, Python router) within script (heredocs)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - CI/CD Baseline (Priority: P3)

**Goal**: The build system automatically verifies code quality on every push.

**Independent Test**: Push to branch -> Observe GitHub Actions (or equivalent) -> Verify success.

### Implementation for User Story 3

- [x] T022 [US3] Create `.github/workflows/ci.yml`
- [x] T023 [US3] Define "Lint" job running `pnpm lint` and `uv run ruff check`
- [x] T024 [US3] Define "Test" job running `pnpm test` and `uv run pytest`
- [x] T025 [US3] Configure caching for `pnpm` and `uv` in CI workflow

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T026 Update `README.md` with setup instructions from US1
- [x] T027 Update `docs/COMPONENTS.md` (create if missing) describing folder structure
- [x] T028 Verify `scripts/scaffold-capability.sh` handles existing directory edge cases

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of US1/US2

### Parallel Opportunities

- T004, T007, T008, T009 in Setup/Foundational can run in parallel
- US1, US2, US3 implementation can theoretically run in parallel once Foundation is set

