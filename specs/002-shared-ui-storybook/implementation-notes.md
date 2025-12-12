# Implementation Notes: Shared UI Component Library

## Storybook Version Decision

### Issue Encountered
During implementation, Storybook 8.6.14 produced a critical runtime error:
```
TypeError: Cannot read properties of undefined (reading 'S')
```

This JSX runtime preamble check failure prevented all components from rendering in Storybook, despite:
- ✅ Components compiling without TypeScript errors
- ✅ Storybook server starting successfully  
- ✅ Components working when imported directly into applications

### Root Cause
This is a known compatibility issue between:
- Storybook 8.x
- React 18.3.1
- Vite 5.4.11
- pnpm workspaces

The error originates from Storybook's internal React JSX runtime validation, likely due to duplicate React instances or version mismatches in the dependency tree.

### Attempted Solutions (All Failed with v8.x)
1. React version pinning and pnpm overrides
2. Clearing all caches (node_modules, Storybook cache, build artifacts)
3. Fresh Storybook initialization
4. Removing problematic addons (addon-vitest, addon-interactions)
5. Vite and TypeScript configuration adjustments
6. Separating vite.config files for library build vs Storybook
7. Attempting upgrade to Storybook 10.x (npm registry inconsistency - core at v10 but addons still at v8)

### Final Solution: Storybook 7.6.20
Downgraded to Storybook 7.6.20, the last stable version 7 release.

**Result**: ✅ **All components render perfectly**
- Button component with all variants (primary, secondary, outline, ghost)
- Input component with label and error states
- Card component with title and footer
- Documentation pages generated via Autodocs
- A11y addon working correctly

### Why This Works
- Storybook 7.6.x is battle-tested with React 18 + Vite 5 + pnpm
- All addons (@storybook/addon-essentials, @storybook/addon-a11y, @storybook/addon-links) are stable at this version
- Zero runtime errors or compatibility issues
- Production-ready and widely deployed

### Future Upgrade Path
- Monitor Storybook 10.x ecosystem maturity
- When addon versions align with core, consider upgrading
- For now, 7.6.20 meets all functional requirements and success criteria

## Verification
All acceptance scenarios from spec.md are met:
- ✅ Storybook loads without errors
- ✅ Components render with correct styles and variants
- ✅ Controls (args) update components in real-time
- ✅ Documentation pages show props tables and code snippets
- ✅ `packages/ui` builds successfully with types
- ✅ Components importable with TypeScript support

**Test Commands**:
```bash
# Start Storybook
pnpm storybook

# Build library
pnpm build --filter @secondgen/ui

# Verify types and linting
pnpm lint --filter @secondgen/ui
```

## Dependencies Locked
```json
{
  "@storybook/addon-a11y": "^7.6.20",
  "@storybook/addon-essentials": "^7.6.20",
  "@storybook/blocks": "^7.6.20",
  "@storybook/react": "^7.6.20",
  "@storybook/react-vite": "^7.6.20",
  "storybook": "^7.6.20",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "vite": "^5.4.11",
  "tailwindcss": "^3.4.17",
  "typescript": "^5.7.2"
}
```

## Configuration Files
- `.storybook/main.ts`: Storybook 7 configuration with Vite builder, autodocs enabled
- `.storybook/preview.ts`: Global Tailwind CSS import
- `vite.config.ts`: Standard React plugin for Storybook
- `vite.lib.config.ts`: Library build configuration (separate from Storybook)
- `tailwind.config.js`: Tailwind CSS configuration
- `postcss.config.js`: PostCSS with Tailwind and autoprefixer

