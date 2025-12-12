---
description: "Task list for Shared UI Component Library"
---

# Tasks: Shared UI Component Library

**Input**: Design documents from `/specs/002-shared-ui-storybook/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Storybook interactions serve as visual tests.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Root**: `/`
- **UI Package**: `packages/ui/`
- **Frontend**: `apps/frontend/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Storybook in `packages/ui` using `pnpm dlx storybook@latest init` (Vite)
- [ ] T002 Configure `vite.config.ts` in `packages/ui` for Library Mode (build)
- [ ] T003 Install Tailwind CSS in `packages/ui` (`postcss`, `autoprefixer`)
- [ ] T004 [P] Create `packages/ui/tailwind.config.js` and `packages/ui/postcss.config.js`
- [ ] T005 Add `storybook` script to root `package.json` delegating to `packages/ui`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Configure Storybook to use Vite builder and PostCSS (for Tailwind)
- [ ] T007 Create `packages/ui/src/styles/globals.css` with Tailwind directives
- [ ] T008 Import global styles in `packages/ui/.storybook/preview.ts`
- [ ] T009 [P] Update `packages/ui/tsconfig.json` to include Storybook files

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Viewing Components (Priority: P1) 🎯 MVP

**Goal**: A developer can view and interact with shared UI components (e.g., Button, Input) in a local Storybook environment.

**Independent Test**: Run `pnpm storybook` -> Navigate to localhost -> Click through component stories.

### Implementation for User Story 1

- [ ] T010 [P] [US1] Create Button component in `packages/ui/src/components/Button/Button.tsx` (Props: variant, size, isLoading)
- [ ] T011 [P] [US1] Create Button stories in `packages/ui/src/components/Button/Button.stories.tsx`
- [ ] T012 [P] [US1] Create Input component in `packages/ui/src/components/Input/Input.tsx` (Props: label, error)
- [ ] T013 [P] [US1] Create Input stories in `packages/ui/src/components/Input/Input.stories.tsx`
- [ ] T014 [P] [US1] Create Card component in `packages/ui/src/components/Card/Card.tsx` (Props: title, footer)
- [ ] T015 [P] [US1] Create Card stories in `packages/ui/src/components/Card/Card.stories.tsx`
- [ ] T016 [US1] Export all components from `packages/ui/src/index.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Component Documentation (Priority: P2)

**Goal**: A developer or product manager can read usage documentation for each component within Storybook to understand how to implementation them.

**Independent Test**: Open Storybook -> Navigate to "Docs" tab -> Verify props table and usage examples exist.

### Implementation for User Story 2

- [ ] T017 [US2] Enable Autodocs in `packages/ui/.storybook/main.ts`
- [ ] T018 [P] [US2] Add JSDoc comments to Button props in `packages/ui/src/components/Button/Button.tsx`
- [ ] T019 [P] [US2] Add JSDoc comments to Input props in `packages/ui/src/components/Input/Input.tsx`
- [ ] T020 [P] [US2] Add JSDoc comments to Card props in `packages/ui/src/components/Card/Card.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Replit Integration Support (Priority: P3)

**Goal**: A developer can easily export or reference the component library structure to use in external prototyping environments like Replit.

**Independent Test**: Verify `packages/ui` builds successfully and exports types.

### Implementation for User Story 3

- [ ] T021 [US3] Configure `build` script in `packages/ui/package.json` to run `vite build && tsc --emitDeclarationOnly`
- [ ] T022 [US3] Verify `dist/` output contains ESM/CJS bundles and `index.d.ts`
- [ ] T023 [US3] Document consumption instructions (e.g. copying `dist` or private npm) in `packages/ui/README.md`

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T024 [P] Verify accessibility (a11y) addon in Storybook
- [ ] T025 Check for console warnings in Storybook
- [ ] T026 Update root `README.md` with Storybook commands

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
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Dependent on component creation in US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of US1/US2

### Parallel Opportunities

- T004, T009 in Setup/Foundational can run in parallel
- Component implementation (T010-T015) can run in parallel
- Documentation (T018-T020) can run in parallel

