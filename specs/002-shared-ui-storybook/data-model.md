# Data Model: Shared UI Component Library

**Status**: Baseline (Component API)
**Date**: 2025-12-12

> **Note**: For a UI library, the "Data Model" represents the Component Props Interfaces (Public API).

## Component Entities (Props)

### Button
**Purpose**: Trigger actions.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Visual style of the button. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the button. |
| `isLoading` | `boolean` | `false` | Shows a loading spinner and disables interaction. |
| `onClick` | `() => void` | `undefined` | Click handler. |
| `children` | `ReactNode` | - | Button content. |

### Input
**Purpose**: Text data entry.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `undefined` | Optional label text above the input. |
| `error` | `string` | `undefined` | Error message text below the input. |
| `placeholder` | `string` | `undefined` | Placeholder text. |
| `value` | `string` | - | Controlled value. |
| `onChange` | `(e: ChangeEvent) => void` | - | Change handler. |

### Card
**Purpose**: Container for content.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `undefined` | Optional header title. |
| `footer` | `ReactNode` | `undefined` | Optional footer content (actions). |
| `children` | `ReactNode` | - | Main content. |

## File Structure (Schema)

```text
packages/ui/src/components/[Component]/
├── [Component].tsx        # Implementation
├── [Component].stories.tsx # Storybook stories
└── index.ts               # Export
```

