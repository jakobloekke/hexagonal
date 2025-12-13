# Research: Component Library Expansion

**Status**: Complete
**Date**: 2025-12-12

## 1. Framer Motion Integration Patterns

**Decision**: Use Framer Motion for complex animations (Modal, Drawer, Accordion, Toast) with Tailwind for simple transitions (hover, focus states).

**Rationale**: 
- Framer Motion provides declarative animation API with built-in gesture support and spring physics
- Excellent TypeScript support and React 18 compatibility
- Tailwind transitions sufficient for simple state changes
- Tree-shakeable - only imported animations are bundled

**Alternatives Considered**:
- Pure CSS/Tailwind animations: Lacks orchestration for complex sequences and gesture support
- React Spring: Similar capabilities but Framer Motion has better DX and documentation
- CSS-in-JS libraries: Runtime overhead and conflicts with Tailwind utility-first approach

**Implementation Notes**:
- Use `<motion.div>` for animated wrappers
- Key patterns:
  - Modal/Drawer: `initial`, `animate`, `exit` with AnimatePresence
  - Accordion: `animate` with height/opacity transitions
  - Toast: `variants` for stacking animations with `layout` prop
  - NavigationBar: Mobile menu slide with `variants`
- Keep animations under 300ms for perceived performance
- Bundle size: ~30KB gzipped (acceptable within 175KB budget)

## 2. TanStack Table v8 Architecture

**Decision**: Use TanStack Table v8 headless API for Table component logic with controlled pattern.

**Rationale**:
- Headless pattern allows full styling control with Tailwind
- Excellent TypeScript support with generic column/data types
- Provides sorting, filtering, pagination logic without prescribing UI
- Active maintenance and React 18 support
- ~14KB gzipped

**Alternatives Considered**:
- React Table v7: Predecessor, less TypeScript-friendly
- Custom implementation: Reinventing wheel, harder to maintain
- AG Grid / MUI DataGrid: Too opinionated, large bundle size

**Implementation Notes**:
```typescript
// Table component structure
interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  pagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
  // ... other controlled state props
}

// Client-side utilities (separate file)
export const sortData = <T>(data: T[], sorting: SortingState) => { ... }
export const filterData = <T>(data: T[], filters: FilterState) => { ... }
export const paginateData = <T>(data: T[], pagination: PaginationState) => { ... }
```

Key hooks: `useReactTable`, `getCoreRowModel`, `getSortedRowModel`, `getFilteredRowModel`, `getPaginationRowModel`

## 3. Lucide React Icon System

**Decision**: Use Lucide React with named imports for tree-shaking.

**Rationale**:
- 1000+ icons, modern design consistent with Tailwind aesthetic
- Excellent tree-shaking - only imported icons bundled
- TypeScript types exported for all icons
- React components (not font icons) - better accessibility and styling control
- ~2KB per icon

**Alternatives Considered**:
- Heroicons: Only ~300 icons, may be limiting
- React Icons: Aggregator, harder to ensure consistent style
- SVG sprites: More setup, less flexible

**Implementation Notes**:
```typescript
import { ChevronDown, X, Check } from 'lucide-react';

// Component prop pattern
interface ButtonProps {
  icon?: React.ComponentType<{ className?: string }>;
  // or for Lucide-specific
  icon?: LucideIcon;
}

// Usage
<Button icon={ChevronDown} />

// Styling with Tailwind
<ChevronDown className="w-5 h-5 text-gray-600" />
```

Accessibility: Icons used decoratively should have `aria-hidden="true"`. Standalone icons need `role="img"` and `aria-label`.

## 4. Accessibility Patterns for Complex Components

**Decision**: Use `focus-trap-react` for Modal/Dialog focus management, follow WAI-ARIA APG patterns for all interactive components.

**Rationale**:
- WAI-ARIA Authoring Practices Guide (APG) provides battle-tested patterns
- `focus-trap-react` handles edge cases (nested traps, focus return)
- Storybook a11y addon catches common issues during development
- Manual keyboard testing validates complex interactions

**Alternatives Considered**:
- Custom focus trap: Hard to get right (portal focus, tab wrapping, nested dialogs)
- @radix-ui primitives: Excellent but may conflict with custom Tailwind styling needs
- Headless UI: Good option but Framer Motion integration less documented

**Implementation Notes**:

### Modal/Dialog
```typescript
import FocusTrap from 'focus-trap-react';

<FocusTrap>
  <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
    {/* content */}
  </div>
</FocusTrap>
```
Keyboard: ESC closes, focus returns to trigger

### Select/Combobox
ARIA pattern: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`
Keyboard: Arrow keys navigate, Enter selects, ESC closes, Type-ahead search

### DatePicker
ARIA pattern: Calendar widget with `role="grid"`, `role="gridcell"`
Keyboard: Arrow keys navigate dates, Enter selects, Page Up/Down changes month

### Menu/Dropdown
ARIA pattern: `role="menu"`, `role="menuitem"`, roving tabindex
Keyboard: Arrow keys navigate, Enter activates, ESC closes

### Toast
ARIA: `role="status"` or `role="alert"` (for urgent), `aria-live="polite"` or `"assertive"`

### Table
ARIA: `role="table"` (implicit), sortable columns have `aria-sort`, selectable rows have `aria-selected`

## 5. Form Component Integration

**Decision**: Controlled components with native HTML validation attributes, compatible with React Hook Form and Formik via standard props.

**Rationale**:
- Controlled pattern is React best practice and matches Table philosophy
- Native HTML validation (`required`, `pattern`, `min`, `max`) provides baseline
- No hard dependency on form library - components work standalone
- React Hook Form and Formik both support controlled components via standard props

**Alternatives Considered**:
- Uncontrolled components: Less flexible, harder to test
- Direct React Hook Form integration: Locks library, reduces reusability
- Custom validation system: Overkill, form libraries handle this well

**Implementation Notes**:

### Standalone Usage
```typescript
const [value, setValue] = useState('');
<Input 
  value={value} 
  onChange={(e) => setValue(e.target.value)} 
  error={value.length < 3 ? 'Too short' : undefined}
/>
```

### React Hook Form
```typescript
<Controller
  name="email"
  control={control}
  render={({ field, fieldState }) => (
    <Input {...field} error={fieldState.error?.message} />
  )}
/>
```

### Formik
```typescript
<Field name="email">
  {({ field, meta }) => (
    <Input {...field} error={meta.touched && meta.error} />
  )}
</Field>
```

## 6. Date Handling Strategy

**Decision**: Native Date API for MVP, with architecture allowing future date library integration.

**Rationale**:
- Native Date API sufficient for basic date selection and formatting
- `Intl.DateTimeFormat` provides locale-aware formatting
- Avoids 10-20KB dependency for MVP
- Component props accept Date objects - easy to swap internals later

**Alternatives Considered**:
- date-fns: Modular (tree-shakeable) but adds ~5KB minimum
- dayjs: Tiny (2KB) but Moment.js-like API may be deprecated
- luxon: Excellent but 20KB+ for full feature set

**Implementation Notes**:
```typescript
interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | null) => void;
  min?: Date;
  max?: Date;
  locale?: string; // for Intl.DateTimeFormat
}

// Internal formatting
const formatDate = (date: Date, locale = 'en-US') => 
  new Intl.DateTimeFormat(locale, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
```

Edge cases documented: Timezone handling (dates are local by default), leap years (native Date handles), invalid dates (return null).

## 7. File Upload Patterns

**Decision**: HTML5 File API with drag-and-drop, consumer-provided upload handler.

**Rationale**:
- HTML5 File API is standard, no library needed
- Component handles UI (drag zone, file list, progress bar), consumer handles actual upload
- Simulated progress for demo purposes, real progress requires consumer's upload implementation

**Alternatives Considered**:
- Full upload library (react-dropzone): Good DX but 15KB and we only need basic UI
- Custom implementation: HTML5 API is straightforward

**Implementation Notes**:
```typescript
interface FileUploadProps {
  accept?: string; // e.g., 'image/*,.pdf'
  maxSize?: number; // bytes
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  onUpload?: (file: File) => Promise<void>; // optional upload handler
}

// Validation
const validateFile = (file: File, accept?: string, maxSize?: number) => {
  if (maxSize && file.size > maxSize) return 'File too large';
  if (accept && !matchesMimeType(file.type, accept)) return 'Invalid file type';
  return null;
};

// Drag and drop
const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files);
  // validate and call onFilesSelected
};
```

Preview generation: For images, use `URL.createObjectURL(file)`.

## 8. Responsive Design Patterns

**Decision**: Mobile-first Tailwind breakpoints, Table uses horizontal scroll on mobile, NavigationBar uses slide-in drawer.

**Rationale**:
- Tailwind's mobile-first approach (sm:, md:, lg:) is standard practice
- Table horizontal scroll preserves all columns on mobile (card mode complicates interactions)
- NavigationBar mobile drawer with Framer Motion animation provides native app feel

**Alternatives Considered**:
- Table card mode: Harder to implement for dynamic columns, loses column alignment
- NavigationBar dropdown menu: Less discoverable, harder to access nested items

**Implementation Notes**:

### Container Breakpoints
```typescript
const containerSizes = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
```

### Table Responsive
```typescript
// Wrapper with horizontal scroll on mobile
<div className="overflow-x-auto md:overflow-visible">
  <table className="min-w-full">
    {/* table content */}
  </table>
</div>
```

### NavigationBar Mobile Menu
```typescript
// Hamburger visible on mobile, hidden on desktop
<button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
  <Menu />
</button>

// Slide-in drawer with Framer Motion
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg lg:hidden"
    >
      {/* menu items */}
    </motion.div>
  )}
</AnimatePresence>
```

Touch targets: Minimum 44x44px per iOS HIG and Material Design guidelines.

## 9. Bundle Size Management

**Decision**: Individual component exports, lazy loading documentation in Storybook, build size CI check.

**Rationale**:
- Tree-shaking requires proper exports from library
- Most apps won't use all 30+ components
- CI check prevents accidental bloat

**Alternatives Considered**:
- Single barrel export: Easier but defeats tree-shaking
- Dynamic imports in library: Adds complexity, consumer can lazy load if needed

**Implementation Notes**:

### Export Structure
```typescript
// packages/ui/src/index.ts
export { Button } from './components/Button/Button';
export { DatePicker } from './components/DatePicker/DatePicker';
// ... individual exports for each component

// packages/ui/src/components/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

### Build Size Monitoring (CI)
```bash
# In CI, after build
size=$(gzip -c dist/secondgen-ui.js | wc -c)
threshold=179200 # 175KB in bytes
if [ $size -gt $threshold ]; then
  echo "Bundle size ($size bytes) exceeds threshold ($threshold bytes)"
  exit 1
fi
```

### Consumer-Side Lazy Loading
```typescript
// In consumer app
const DatePicker = React.lazy(() => 
  import('@secondgen/ui').then(m => ({ default: m.DatePicker }))
);
```

Dependency Analysis:
- framer-motion: ~30KB gzipped
- @tanstack/react-table: ~14KB gzipped  
- lucide-react: ~2KB per icon
- focus-trap-react: ~5KB gzipped
- Total new deps: ~51KB base + components (~100KB estimated) = ~151KB (within 175KB budget)

## 10. Storybook 7.6.x Best Practices

**Decision**: Use autodocs for prop tables, interaction tests with @storybook/test, a11y addon for automated checks.

**Rationale**:
- Autodocs generates documentation from TypeScript types (DRY principle)
- Interaction tests validate component behavior in Storybook UI
- a11y addon catches common issues before manual testing
- Storybook 7.6.x is stable with our stack (React 18, Vite 5)

**Alternatives Considered**:
- Manual MDX documentation: More control but harder to maintain
- Chromatic for visual regression: Good but adds cost, deferred for now
- Storybook 8.x: Had compatibility issues (see feature 002 notes)

**Implementation Notes**:

### Story Structure
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'], // Enables autodocs
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    value: new Date(),
  },
};

// Interaction test
export const KeyboardNavigation: Story = {
  args: { value: new Date() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    
    await userEvent.click(input);
    await userEvent.keyboard('{ArrowDown}');
    // Assertions...
  },
};
```

### a11y Configuration
```typescript
// .storybook/preview.ts
export const parameters = {
  a11y: {
    element: '#storybook-root',
    config: {
      rules: [
        // Customize rules if needed
      ],
    },
  },
};
```

## Summary of Key Decisions

| Area | Decision | Primary Rationale |
|------|----------|-------------------|
| Animation | Framer Motion + Tailwind | Declarative API, gesture support, tree-shakeable |
| Table Logic | TanStack Table v8 | Headless, TypeScript, controlled pattern |
| Icons | Lucide React | 1000+ icons, tree-shakeable, Tailwind-friendly |
| Accessibility | focus-trap-react + WAI-ARIA APG | Battle-tested patterns, manual testing |
| Forms | Controlled components | React best practice, library-agnostic |
| Dates | Native Date API | Sufficient for MVP, upgradable |
| File Upload | HTML5 File API | Standard, no extra deps |
| Responsive | Mobile-first Tailwind | Industry standard |
| Bundle | Individual exports + CI check | Tree-shaking, monitoring |
| Storybook | Autodocs + interaction tests | DRY, automation |

All research tasks complete. Ready to proceed to Phase 1 (Data Model & Contracts).

