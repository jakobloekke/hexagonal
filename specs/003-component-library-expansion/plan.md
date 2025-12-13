# Implementation Plan: Component Library Expansion

**Branch**: `003-component-library-expansion` | **Date**: 2025-12-12 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `/specs/003-component-library-expansion/spec.md`

## Summary

Expand the shared UI component library in `packages/ui` with the **component set defined by**:

- **Component requirements**: **FR-001..FR-030** (components)
- **Cross-cutting requirements**: **FR-031..FR-036** (styling, typing, Storybook, a11y, JSDoc, tree-shaking)

All components will use:
- **Tailwind CSS** for styling
- **Framer Motion** for animations/transitions (where applicable)
- **Lucide React** for icons
- **TanStack Table** for Table logic

**Important scope clarification (addresses prior inconsistency)**:
- We treat the “component set” as **FR-001..FR-030** (30 components). Any “36 components” references in other docs are interpreted as a requirements-count artifact and should not drive implementation scope.

## Technical Context

**Language/Version**: TypeScript 5.7+ (repo), React 18+, Node.js 20.19+  
**Primary Dependencies**:
- Styling: `tailwindcss`, `postcss`, `autoprefixer`
- Animation: `framer-motion`
- Icons: `lucide-react`
- Table logic: `@tanstack/react-table`
- A11y focus management: `focus-trap-react`
- Build: `vite`, `@vitejs/plugin-react`, `vite-plugin-dts`
- Docs: `storybook` 7.6.x (`@storybook/react-vite`, `@storybook/addon-a11y`, `@storybook/test`)

**Storage**: N/A (UI library)  
**Testing**: Storybook stories + a11y addon + targeted interaction tests (`play()` in stories); Vitest remains available but not required by spec  
**Target Platform**: Modern evergreen browsers  
**Project Type**: Shared Package (`packages/ui`)  
**Performance Goals**:
- Table: < 100ms render per page for 10k rows (paged), < 50ms sort for 1k rows (client-side helper scenario)
- Storybook cold start < 5s
**Constraints**:
- WCAG 2.1 AA (FR-034)
- No `any` in component public props (SC-009)
- Tree-shakeable exports (FR-036)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Alignment | Evidence |
|---|---|---|
| **Modular Monolith & Polyglot Monorepo** | ✅ PASS | Work is limited to `packages/ui` in the pnpm workspace. |
| **Capability-Based Architecture** | ✅ PASS | Shared UI components enable capabilities without coupling. |
| **Loose Coupling & Strong Boundaries** | ✅ PASS | Controlled components; no backend coupling; clear TS interfaces. |
| **Ingestion of Innovation** | ✅ PASS | Storybook docs + portable Tailwind usage supports Replit ingestion. |
| **Agent-Friendly & Scaffolding-First** | ✅ PASS | Predictable folder conventions; Storybook is executable docs; strong typing. |
| **Tenant-Aware & Configurable** | ✅ PASS | Presentation-only; tenant logic belongs in consuming apps. |

## Key Design Decisions (from `research.md`)

- **Animations**: Framer Motion for complex transitions; Tailwind transitions for simple hover/focus.
- **Table**: TanStack Table v8 headless core + **controlled** state props.  
- **Icons**: Lucide React; **named imports** for tree-shaking.
- **A11y**: focus-trap-react + WAI-ARIA APG patterns.
- **Naming / compatibility**: Export `Dropdown` as an alias of `Menu` to match contract wording and avoid drift.

## Table UX Scope Clarification (addresses ambiguity)

To satisfy FR-009/FR-010/FR-013 while preserving the “controlled mode” decision:

- **Table renders built-in UI controls** (opt-in via props) for:
  - Global filter input and/or per-column filter controls
  - Pagination controls (next/prev, page size, total rows)
  - Column customization UI (show/hide, resize handles, reorder controls)
- **State remains controlled**:
  - The consumer owns `sorting`, `filters`, `pagination`, `rowSelection`, `columnVisibility`, `columnSizing`, `columnOrder`.
  - The Table calls `on*Change` handlers when the built-in UI is used.
- **Optional client-side helpers** exist in `@secondgen/ui/utils` for small datasets (FR-010a).

## Project Structure

### Documentation (this feature)

```text
specs/003-component-library-expansion/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── component-api.md
└── tasks.md
```

### Source Code (repository root)

```text
packages/ui/
├── src/
│   ├── components/
│   │   ├── (existing) Button/, Input/, Card/
│   │   ├── (US1) DatePicker/, MaskedInput/, Select/, FileUpload/, Checkbox/, Radio/, Switch/, Slider/, Textarea/
│   │   ├── (US2) Table/
│   │   ├── (US4) Container/, Stack/, Divider/, NavigationBar/
│   │   └── (US3) Modal/, AlertDialog/, Drawer/, Tabs/, Accordion/, Menu/ (export alias: Dropdown), Toast/, Badge/, Tag/, Avatar/, Tooltip/, Spinner/, Skeleton/, ProgressBar/, Breadcrumb/, Pagination/
│   ├── utils/
│   │   ├── index.ts            # exported as @secondgen/ui/utils
│   │   ├── cn.ts
│   │   ├── tableHelpers.ts
│   │   └── portal.ts
│   ├── styles/
│   │   └── globals.css         # exported as @secondgen/ui/styles/globals.css
│   └── index.ts                # exported as @secondgen/ui
├── vite.lib.config.ts          # multi-entry build (root + utils)
└── package.json                # exports map updated for subpaths
```

**Structure Decision**: Shared package enhancement (extend `packages/ui`).

## Complexity Tracking

> No constitution violations to justify.

