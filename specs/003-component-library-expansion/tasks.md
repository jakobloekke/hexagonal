# Tasks: Component Library Expansion

**Input**: Design documents from `/specs/003-component-library-expansion/`:
- `specs/003-component-library-expansion/spec.md`
- `specs/003-component-library-expansion/plan.md`
- `specs/003-component-library-expansion/research.md`
- `specs/003-component-library-expansion/data-model.md`
- `specs/003-component-library-expansion/contracts/component-api.md`
- `specs/003-component-library-expansion/quickstart.md`

**Tests**: No dedicated unit test suite is mandated by the spec. Validation uses:
- **Storybook stories** for every component (FR-033)
- **Storybook a11y addon** checks (SC-002 / FR-034)
- **Targeted Storybook interaction tests** via `play()` on keyboard-heavy components

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] T### [P?] [US?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[US1..US4]**: User story label (REQUIRED only in user story phases)
- **File paths**: Repo-relative paths (from repository root)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare `packages/ui` for new dependencies, subpath exports, and multi-entry builds.

- [X] T001 Update dependencies in `packages/ui/package.json` (add `framer-motion`, `lucide-react`, `@tanstack/react-table`, `focus-trap-react`)
- [X] T002 Add subpath exports in `packages/ui/package.json` for `./utils` and `./styles/globals.css` (keep existing `"."` export)
- [X] T003 Create `packages/ui/src/utils/cn.ts` (className join helper)
- [X] T004 Create `packages/ui/src/utils/index.ts` (export `cn` and future utils)
- [X] T005 Update `packages/ui/vite.lib.config.ts` to build **multiple entrypoints** (`src/index.ts` and `src/utils/index.ts`) so `@secondgen/ui/utils` is a real built subpath
- [X] T006 Update `packages/ui/src/index.ts` to keep exports organized by US sections and prepare for `Dropdown` alias export (per plan.md)

**Checkpoint**: `pnpm -C packages/ui build` succeeds and consumers can import both `@secondgen/ui` and `@secondgen/ui/utils`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared utilities used by multiple user stories; MUST be completed before story work.

- [X] T007 Create `packages/ui/src/utils/tableHelpers.ts` (stubs for `sortData`, `filterData`, `paginateData`, `getTableState`) and export from `packages/ui/src/utils/index.ts`
- [X] T008 Implement `packages/ui/src/utils/portal.ts` (portal + scroll lock helpers for Modal/Drawer/Menu/Tooltip) and export from `packages/ui/src/utils/index.ts`
- [X] T009 Implement `packages/ui/src/utils/a11yClasses.ts` (shared focus ring / interactive base class constants)
- [X] T010 Add `packages/ui/src/stories/KitchenSink.stories.tsx` to compose many components for rapid manual regression checks

**Checkpoint**: `pnpm storybook` loads and `Kitchen Sink` renders without errors.

---

## Phase 3: User Story 1 - Form Building (Priority: P1) 🎯 MVP

**Goal**: Build forms using advanced input components with validation, formatting, and user-friendly interactions.

**Independent Test**:
- Run `pnpm storybook`
- Validate `Forms/*` stories render, are keyboard-navigable, and pass a11y checks

### Implementation (Forms)

- [X] T011 [P] [US1] Implement `packages/ui/src/components/Checkbox/Checkbox.tsx` (checked/indeterminate/disabled, label, error, a11y)
- [X] T012 [P] [US1] Add `packages/ui/src/components/Checkbox/Checkbox.stories.tsx`
- [X] T013 [P] [US1] Implement `packages/ui/src/components/Radio/Radio.tsx` (group-friendly, label, disabled, a11y)
- [X] T014 [P] [US1] Add `packages/ui/src/components/Radio/Radio.stories.tsx`
- [X] T015 [P] [US1] Implement `packages/ui/src/components/Switch/Switch.tsx` (size variants, disabled, label, a11y)
- [X] T016 [P] [US1] Add `packages/ui/src/components/Switch/Switch.stories.tsx`
- [X] T017 [P] [US1] Implement `packages/ui/src/components/Slider/Slider.tsx` (single + range, keyboard, min/max/step, a11y)
- [X] T018 [P] [US1] Add `packages/ui/src/components/Slider/Slider.stories.tsx`
- [X] T019 [P] [US1] Implement `packages/ui/src/components/Textarea/Textarea.tsx` (auto-resize, count, maxLength, label/error, a11y)
- [X] T020 [P] [US1] Add `packages/ui/src/components/Textarea/Textarea.stories.tsx`
- [X] T021 [P] [US1] Implement `packages/ui/src/components/MaskedInput/MaskedInput.tsx` (mask patterns, formatted+raw callbacks, paste/backspace behavior)
- [X] T022 [P] [US1] Add `packages/ui/src/components/MaskedInput/MaskedInput.stories.tsx`
- [X] T023 [P] [US1] Implement `packages/ui/src/components/Select/Select.tsx` (search, multi, async, combobox ARIA, keyboard nav)
- [X] T024 [P] [US1] Add `packages/ui/src/components/Select/Select.stories.tsx` (basic, searchable, multi, async mock)
- [X] T025 [P] [US1] Implement `packages/ui/src/components/FileUpload/FileUpload.tsx` (drag/drop, accept/maxSize validation, progress UI, a11y)
- [X] T026 [P] [US1] Add `packages/ui/src/components/FileUpload/FileUpload.stories.tsx`
- [X] T027 [US1] Implement `packages/ui/src/components/DatePicker/DatePicker.tsx` (calendar UI, keyboard nav, range, min/max, Intl formatting, ARIA grid)
- [X] T028 [US1] Add `packages/ui/src/components/DatePicker/DatePicker.stories.tsx` (include `play()` keyboard scenario)
- [X] T029 [US1] Export US1 components from `packages/ui/src/index.ts`

**Checkpoint**: US1 is independently demoable in Storybook; a11y addon shows no blocking violations for `Forms/*`.

---

## Phase 4: User Story 2 - Data Display & Management (Priority: P1)

**Goal**: Provide an accessible, responsive, **controlled** Table that includes built-in UI controls (filtering/pagination/column customization) while keeping state in the consumer.

**Independent Test**:
- Run `pnpm storybook`
- Open `Data Display/Table` stories and verify:
  - Sorting indicators toggle state (controlled)
  - Built-in filter controls call `onGlobalFilterChange` / `onColumnFiltersChange`
  - Built-in pagination controls call `onPaginationChange`
  - Row selection works (controlled)
  - Column visibility/resizing/reordering works (controlled)
  - Mobile viewport uses horizontal scroll
- Verify helpers are importable from `@secondgen/ui/utils`

### Implementation (Table + helpers)

- [X] T030 [US2] Implement `packages/ui/src/utils/tableHelpers.ts` (real implementations for `sortData`, `filterData`, `paginateData`, `getTableState`) and export from `packages/ui/src/utils/index.ts`
- [X] T031 [US2] Implement `packages/ui/src/components/Table/Table.tsx` using `@tanstack/react-table` (controlled state props; renders built-in controls when enabled)
- [X] T032 [P] [US2] Implement `packages/ui/src/components/Table/TableControls.tsx` (global filter + pagination controls UI; calls consumer handlers)
- [X] T033 [P] [US2] Implement `packages/ui/src/components/Table/ColumnCustomizer.tsx` (column show/hide + reorder controls; calls consumer handlers)
- [X] T034 [US2] Add resize handles + column sizing wiring in `packages/ui/src/components/Table/Table.tsx` (FR-013)
- [X] T035 [P] [US2] Add `packages/ui/src/components/Table/Table.stories.tsx` (basic, sorting, filtering, pagination, selection, responsive)
- [X] T036 [P] [US2] Add `packages/ui/src/components/Table/TableColumnCustomization.stories.tsx` (visibility + resizing + reordering demos)
- [X] T037 [US2] Export `Table` from `packages/ui/src/index.ts`

**Checkpoint**: Table stories cover FR-008..FR-013 explicitly and pass Storybook a11y checks.

---

## Phase 5: User Story 4 - Layout & Structure (Priority: P1)

**Goal**: Provide layout primitives and a responsive NavigationBar for assembling app layouts quickly.

**Independent Test**:
- Run `pnpm storybook`
- Verify `Layout/*` stories behave across breakpoints, and NavigationBar collapses to mobile at ~768px and animates

### Implementation (Layout)

- [X] T038 [P] [US4] Implement `packages/ui/src/components/Container/Container.tsx` and add `packages/ui/src/components/Container/Container.stories.tsx`
- [X] T039 [P] [US4] Implement `packages/ui/src/components/Stack/Stack.tsx` and add `packages/ui/src/components/Stack/Stack.stories.tsx`
- [X] T040 [P] [US4] Implement `packages/ui/src/components/Divider/Divider.tsx` and add `packages/ui/src/components/Divider/Divider.stories.tsx`
- [X] T041 [US4] Implement `packages/ui/src/components/NavigationBar/NavigationBar.tsx` (Framer Motion mobile drawer, Lucide icons, a11y)
- [X] T042 [P] [US4] Add `packages/ui/src/components/NavigationBar/NavigationBar.stories.tsx`
- [X] T043 [US4] Export US4 components from `packages/ui/src/index.ts`

**Checkpoint**: Layout example from `specs/003-component-library-expansion/quickstart.md` can be built with no custom CSS beyond Tailwind utilities.

---

## Phase 6: User Story 3 - Application UI Patterns (Priority: P2)

**Goal**: Provide common app UI patterns for overlays, menus, feedback, navigation, and loading states.

**Independent Test**:
- Run `pnpm storybook`
- Keyboard walkthrough: ESC closes overlays, arrow keys navigate menus, focus trap holds and returns focus
- Storybook a11y addon shows no blocking violations

### Implementation (Overlays / Focus / Menus)

- [X] T044 [US3] Implement `packages/ui/src/components/Modal/Modal.tsx` and add `packages/ui/src/components/Modal/Modal.stories.tsx` (include `play()` focus trap)
- [X] T045 [US3] Implement `packages/ui/src/components/AlertDialog/AlertDialog.tsx` and add `packages/ui/src/components/AlertDialog/AlertDialog.stories.tsx`
- [X] T046 [US3] Implement `packages/ui/src/components/Drawer/Drawer.tsx` and add `packages/ui/src/components/Drawer/Drawer.stories.tsx`
- [X] T047 [US3] Implement `packages/ui/src/components/Menu/Menu.tsx` and add `packages/ui/src/components/Menu/Menu.stories.tsx` (include keyboard navigation)
- [X] T048 [US3] Export `Dropdown` alias for `Menu` from `packages/ui/src/index.ts` (compat with contracts) and document alias in `packages/ui/README.md`
- [X] T049 [US3] Implement `packages/ui/src/components/Tooltip/Tooltip.tsx` and add `packages/ui/src/components/Tooltip/Tooltip.stories.tsx`

### Implementation (Navigation / Feedback / Loading)

- [X] T050 [P] [US3] Implement `packages/ui/src/components/Tabs/Tabs.tsx` and add `packages/ui/src/components/Tabs/Tabs.stories.tsx`
- [X] T051 [P] [US3] Implement `packages/ui/src/components/Accordion/Accordion.tsx` and add `packages/ui/src/components/Accordion/Accordion.stories.tsx`
- [X] T052 [US3] Implement Toast system: `packages/ui/src/components/Toast/Toast.tsx` (ToastProvider, useToast hook)
- [X] T053 [P] [US3] Add `packages/ui/src/components/Toast/Toast.stories.tsx` (stacking, max 5, actions)
- [X] T054 [P] [US3] Implement Badge + stories: `packages/ui/src/components/Badge/Badge.tsx`, `packages/ui/src/components/Badge/Badge.stories.tsx`
- [X] T055 [P] [US3] Implement Tag + stories: exported from Badge.tsx (outline variant)
- [X] T056 [P] [US3] Implement Avatar + stories: `packages/ui/src/components/Avatar/Avatar.tsx`, `packages/ui/src/components/Avatar/Avatar.stories.tsx`
- [X] T057 [P] [US3] Implement Spinner + stories: `packages/ui/src/components/Spinner/Spinner.tsx`, `packages/ui/src/components/Spinner/Spinner.stories.tsx`
- [X] T058 [P] [US3] Implement Skeleton + stories: exported from Spinner.tsx
- [X] T059 [P] [US3] Implement ProgressBar + stories: `packages/ui/src/components/ProgressBar/ProgressBar.tsx`, `packages/ui/src/components/ProgressBar/ProgressBar.stories.tsx`
- [X] T060 [P] [US3] Implement Breadcrumb + stories: `packages/ui/src/components/Breadcrumb/Breadcrumb.tsx`, `packages/ui/src/components/Breadcrumb/Breadcrumb.stories.tsx`
- [X] T061 [P] [US3] Implement Pagination + stories: `packages/ui/src/components/Pagination/Pagination.tsx`, `packages/ui/src/components/Pagination/Pagination.stories.tsx`
- [X] T062 [US3] Export US3 components from `packages/ui/src/index.ts` (Modal/AlertDialog/Drawer/Menu/Dropdown/Tooltip/Tabs/Accordion/Toast/Badge/Tag/Avatar/Spinner/Skeleton/ProgressBar/Breadcrumb/Pagination)

**Checkpoint**: Overlay and keyboard-heavy components pass manual keyboard walkthrough + a11y addon checks.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Ensure cross-cutting requirements and measurability are enforced.

- [X] T063 Ensure all story files include `tags: ['autodocs']` and meaningful `argTypes` descriptions in `packages/ui/src/components/**/**.stories.tsx`
- [X] T064 Enforce FR-035: add/verify JSDoc on exported prop interfaces across `packages/ui/src/components/**/**.tsx`
- [X] T065 Add an explicit a11y gate checklist section in `packages/ui/ACCESSIBILITY_CHECKLIST.md` and verify Storybook a11y tab passes for all components (FR-034 / SC-002)
- [X] T066 Add a lightweight perf validation story `packages/ui/src/components/Table/TablePerf.stories.tsx` (10k rows paged; documented measurement steps) (SC-003/SC-011)
- [X] T067 Add bundle size check script `scripts/check-ui-bundle-size.sh` and test execution (SC-005)
- [X] T068 Validate exports by adding `packages/sdk/src/ui-smoke.ts` that imports from `@secondgen/ui` and `@secondgen/ui/utils`
- [X] T069 Run and fix TypeScript issues across entrypoints (`packages/ui/src/index.ts` and `packages/ui/src/utils/index.ts`)
- [X] T070 Verify `specs/003-component-library-expansion/quickstart.md` code snippets compile against the implemented APIs (adjust quickstart if needed)

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Phase 1; BLOCKS all stories
- **User Stories (Phase 3+)**: Start after Phase 2
- **Polish (Phase 7)**: After desired stories are complete

### User Story Dependencies
- **US1 (P1)**: Depends on Phase 2
- **US2 (P1)**: Depends on Phase 2
- **US4 (P1)**: Depends on Phase 2
- **US3 (P2)**: Depends on Phase 2

### Parallel Opportunities (examples)
- US1 most components are parallelizable (T011–T026 marked [P])
- US4 primitives are parallelizable (T038–T040 marked [P])
- US3 small components are parallelizable (T054–T061 marked [P])

---

## Suggested MVP Scope

- **MVP**: **US1** + Phase 1–2 prerequisites
- **Next**: **US2 (Table)** and **US4 (Layout)** (both P1), then **US3 (UI Patterns)** (P2)


