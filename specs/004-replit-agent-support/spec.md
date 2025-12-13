# Feature Specification: Replit & Agent Integration Support

**Feature Branch**: `004-replit-agent-support`
**Created**: 2025-12-13
**Status**: Draft
**Input**: User description: "Replit & Agent Integration Support" (derived from conversation about enabling "Ingestion of Innovation" workflow).

## Clarifications

### Session 2025-12-13
- Q: Which command should execute when a user clicks "Run" on Replit? → A: Full Stack (`pnpm dev`) - Launches both. Most comprehensive but highest risk of failure due to missing env vars/DB.
- Q: Which versions should we pin in `replit.nix`? → A: Match Local (Node 20, Python 3.11) - Safest. Ensures dev/prod parity.
- Q: Where should the `AI_GUIDE.md` file live for maximum discoverability? → A: Docs Folder (`/docs/AI_GUIDE.md`) - Cleaner root, but slightly hidden. Standard for larger projects.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Replit "Fork & Run" Experience (Priority: P1)

A developer forks the repository on Replit and clicks "Run", causing the environment to automatically configure and start the development server without manual intervention.

**Why this priority**: Supports the "Ingestion of Innovation" constitution principle. Removes friction for prototyping, allowing developers to focus on "vibe coding" rather than environment debugging.

**Independent Test**: Import the repository into a fresh Replit instance → Click "Run" → Verify the application or Storybook starts successfully.

**Acceptance Scenarios**:

1. **Given** a fresh import of the repository on Replit, **When** the environment initializes, **Then** `replit.nix` installs Node.js (v20), Python (v3.11), and pnpm automatically.
2. **Given** the environment is ready, **When** the user clicks the "Run" button, **Then** the configured start command (e.g., `pnpm run dev` or `pnpm storybook`) executes.
3. **Given** the repository structure, **When** working in Replit, **Then** the monorepo workspace links (`@secondgen/ui`) work correctly without manual linking steps.

---

### User Story 2 - Agent Context Awareness (Priority: P1)

A developer provides an AI Agent (Replit Agent, Cursor, etc.) with a specific context file, enabling the Agent to generate code that correctly utilizes the existing project architecture and component library.

**Why this priority**: Agents are primary contributors in this architecture ("Agent-Friendly & Scaffolding-First"). Without explicit guidance, agents often hallucinate new stacks or duplicate existing components.

**Independent Test**: Provide `docs/AI_GUIDE.md` to an LLM → Ask it to "Create a login form" → Verify the output imports `Input` and `Button` from `@secondgen/ui` instead of creating new ones or installing `mui`.

**Acceptance Scenarios**:

1. **Given** an AI Agent with `docs/AI_GUIDE.md` context, **When** asked to build a new feature, **Then** it uses the preferred stack (Tailwind, Lucide, Framer Motion) as defined in the guide.
2. **Given** an AI Agent, **When** generating UI code, **Then** it correctly imports components from `@secondgen/ui` and utilities from `@secondgen/ui/utils`.
3. **Given** an AI Agent, **When** scaffolding a new capability, **Then** it follows the directory structure defined in the guide (`packages/` vs `apps/`).

### Edge Cases

- **What happens when** Replit changes its default Nix channels?
  - *Response*: The `replit.nix` file should pin versions where possible to maintain stability.
- **How does system handle** monorepo dependency conflicts in Replit?
  - *Response*: The `.replit` config should use `pnpm` which handles node_modules linking more reliably than npm in mixed environments.
- **What happens when** an Agent ignores the guide?
  - *Response*: Documentation cannot force behavior, but providing "Negative Constraints" (what NOT to do) statistically reduces these errors.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST include a `replit.nix` configuration file specifying all necessary system-level dependencies (Node.js 20, Python 3.11, pnpm, uv).
- **FR-002**: System MUST include a `.replit` configuration file defining the default "Run" command as `pnpm dev` (Full Stack start).
- **FR-003**: System MUST include an `AI_GUIDE.md` documentation file located in the `docs/` directory (`docs/AI_GUIDE.md`).
- **FR-004**: The `AI_GUIDE.md` MUST explicitly document the "Polyglot Monorepo" structure (Frontend/Backend separation).
- **FR-005**: The `AI_GUIDE.md` MUST explicitly list the "Preferred Stack" (React, Vite, Tailwind, Lucide, Framer Motion, TanStack Table).
- **FR-006**: The `AI_GUIDE.md` MUST provide concrete examples of importing from `@secondgen/ui` and `@secondgen/ui/utils`.
- **FR-007**: The `AI_GUIDE.md` MUST include a "Negative Constraints" section (e.g., "Do not use CSS modules", "Do not install Material UI").

### Key Entities

- **Replit Config**: Configuration set (`.replit`, `replit.nix`) that defines the runtime environment.
- **AI Context**: Structured documentation (`docs/AI_GUIDE.md`) designed for LLM consumption.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: "Zero-Config Start": Replit "Run" button successfully starts the dev server in < 3 minutes on a fresh import (excluding download time).
- **SC-002**: "Hallucination Reduction": An AI Agent provided with `docs/AI_GUIDE.md` produces code with 0 import errors related to `@secondgen/ui` in a standard "Create Form" test task.
- **SC-003**: "Stack Adherence": Generated code uses Tailwind CSS utility classes exclusively for styling (no created `.css` files) when following the guide.

## Assumptions *(optional)*

1. **Replit Environment**: Assumes Replit continues to support Nix-based configuration.
2. **LLM Capability**: Assumes current generation LLMs (GPT-4, Claude 3.5) can effectively read and apply markdown context files.
3. **Repo Access**: Assumes the repository is public or the Replit user has appropriate access tokens for private cloning.

## Out of Scope *(optional)*

1. **Replit Database Integration**: Configuring Replit's specific database features is out of scope (we use our own backend persistence).
2. **Deployment from Replit**: This feature focuses on *development* and *prototyping* (Ingestion), not production deployment from Replit.
