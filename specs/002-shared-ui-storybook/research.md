# Research: Shared UI Component Library

**Status**: Complete
**Date**: 2025-12-12

## Decisions

### 1. Styling Solution
**Decision**: Tailwind CSS.
**Rationale**: Selected during clarification. Enables rapid development, easy copy-paste transfer (Replit friendliness), and consistent design tokens via configuration.
**Alternatives Considered**: CSS Modules (more boilerplate), Styled Components (runtime overhead).

### 2. Storybook Integration
**Decision**: Root script delegating to `packages/ui`.
**Rationale**: Selected during clarification. Provides a convenient `pnpm storybook` command for developers while keeping the configuration isolated within the UI package.

### 3. Build Tool
**Decision**: Vite Library Mode.
**Rationale**: Selected during clarification. Unifies the build toolchain (Frontend already uses Vite). Excellent support for Rollup-based bundling of ESM/CJS formats needed for package consumption.

### 4. Component Documentation
**Decision**: Storybook Autodocs (MDX).
**Rationale**: Standard feature of Storybook 7/8. Automatically generates props tables from TypeScript interfaces, reducing maintenance burden.

### 5. Storybook Version (7.6.x vs 8.x vs 10.x)
**Decision**: Storybook 7.6.20 (stable).
**Rationale**: During implementation, Storybook 8.6.14 produced a critical "Cannot read properties of undefined (reading 'S')" JSX runtime error that prevented component rendering despite successful compilation. This is a known compatibility issue with React 18 + Vite 5 + pnpm workspaces. Multiple troubleshooting attempts (version pinning, cache clearing, fresh init, addon removal, config adjustments, attempted upgrade to v10) all failed with v8.x. Downgrading to 7.6.20 resulted in perfect component rendering with zero errors. Version 7.6.20 is battle-tested, production-ready, and fully compatible with our stack.
**Alternatives Considered**: 
- Storybook 8.x (persistent JSX runtime failures)
- Storybook 10.x (npm registry inconsistency - core at v10 but essential addons still at v8)
**Documentation**: See `implementation-notes.md` for detailed troubleshooting history.

## Best Practices (for Implementation)

### Tailwind in Libraries
- **Prefixing**: Consider using a prefix (e.g., `ui-`) in `tailwind.config.js` if there's a risk of class collision, though less critical in controlled monorepos.
- **Exporting Config**: The `packages/ui` should export its `tailwind.config.js` (or a preset) so the consumer app (`apps/frontend`) can ingest the token values.

### Storybook Performance
- Use `vite-builder` for Storybook.
- Enable `lazyCompilation` if story count grows large (not needed for MVP).

### Replit "Ingestion"
- To support "copy-paste" or "ingestion" to Replit:
    - Keep components self-contained (colocate component, types, and stories).
    - Ensure Tailwind classes are standard or clearly defined in a shared config that can also be copied.

