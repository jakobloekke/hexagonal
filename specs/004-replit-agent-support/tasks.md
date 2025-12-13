# Tasks: Replit & Agent Integration Support

**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)
**Feature**: Replit & Agent Integration

## Phase 1: Setup
*Goal: Ensure clean environment for configuration files.*

- [x] T001 Verify no existing `.replit` or `replit.nix` files in root (backup if present) in `/`

## Phase 2: Replit Infrastructure (User Story 1)
*Goal: Enable "Fork & Run" experience on Replit.*

- [x] T002 [P] [US1] Create `replit.nix` with Node 20, Python 3.11, pnpm, and uv in `/replit.nix`
- [x] T003 [P] [US1] Create `.replit` configuration with `run` command in `/.replit`

## Phase 3: Agent Context (User Story 2)
*Goal: Provide structured context for AI Agents to reduce hallucinations and ensure architectural alignment.*

- [x] T004 [US2] Initialize `docs/AI_GUIDE.md` with Header and Introduction in `docs/AI_GUIDE.md`
- [x] T005 [P] [US2] Add "Polyglot Monorepo Structure" section (Frontend vs Backend) in `docs/AI_GUIDE.md`
- [x] T006 [P] [US2] Add "Preferred Stack" section (Tailwind, Lucide, Framer, TanStack) in `docs/AI_GUIDE.md`
- [x] T007 [US2] Add "Component Usage" section with `@secondgen/ui` import examples in `docs/AI_GUIDE.md`
- [x] T008 [P] [US2] Add "Negative Constraints" section (What NOT to do) in `docs/AI_GUIDE.md`

## Phase 4: Polish & Verification
*Goal: Verify all artifacts are present and correct.*

- [x] T009 Verify all configuration files exist and contain correct content in `replit.nix`, `.replit`, `docs/AI_GUIDE.md`
- [x] T010 Run final inspection of `docs/AI_GUIDE.md` against requirements in `specs/004-replit-agent-support/checklists/requirements.md`

## Dependencies

- **US1 (Replit Infra)**: Independent.
- **US2 (Agent Context)**: Independent.
- **Phase 4**: Depends on US1 and US2 completion.

## Implementation Strategy

1.  **Parallel Execution**: US1 and US2 can be implemented completely in parallel as they touch different files.
2.  **Validation**: Verification (T009) is manual/visual since we cannot physically run Replit in this environment.

