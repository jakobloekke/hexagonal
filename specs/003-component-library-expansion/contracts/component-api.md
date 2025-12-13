# Component API Contracts

**Feature**: Component Library Expansion  
**Date**: 2025-12-12  
**Package**: `@secondgen/ui`

This document defines the public API contracts for all components required by **FR-001..FR-030** (30 components). Since this is a UI component library (not a REST/GraphQL API), "contracts" refer to the TypeScript interfaces and expected behavior.

---

## Import Contract

All components are exported as named exports from the package root:

```typescript
import { 
  // Forms
  DatePicker, MaskedInput, Select, FileUpload,
  Checkbox, Radio, Switch, Slider, Textarea,
  
  // Data Display
  Table,
  
  // UI Patterns
  Modal, AlertDialog, Drawer, Tabs, Accordion,
  Menu, Dropdown, Toast, Badge, Tag, Avatar,
  Tooltip, Spinner, Skeleton, ProgressBar,
  Breadcrumb, Pagination,
  
  // Layout
  Container, Stack, Divider, NavigationBar,
  
  // Types
  type DatePickerProps,
  type TableColumn,
  type MenuItem,
  // ... all prop types
} from '@secondgen/ui';
```

**Versioning**: Semantic versioning (semver). Breaking changes to props = major version bump.

---

## Form Components

### DatePicker

```typescript
interface DatePickerProps {
  /** Current selected date */
  value?: Date | null;
  /** Callback when date changes */
  onChange: (date: Date | null) => void;
  /** Minimum selectable date */
  min?: Date;
  /** Maximum selectable date */
  max?: Date;
  /** Date format display (locale-aware) */
  locale?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Label */
  label?: string;
  /** Whether to show time picker */
  showTime?: boolean;
  /** Whether to enable date range selection */
  range?: boolean;
  /** Start date for range mode */
  rangeStart?: Date;
  /** End date for range mode */
  rangeEnd?: Date;
}
```

**Behavior Contract**:
- Clicking input opens calendar popup
- Arrow keys navigate dates in calendar
- Enter selects focused date
- ESC closes calendar
- Clicking outside closes calendar
- Dates outside `min`/`max` range are disabled
- Invalid dates return `null` to `onChange`

---

### MaskedInput

```typescript
interface MaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Current value */
  value: string;
  /** Callback when value changes */
  onChange: (value: string, rawValue: string) => void;
  /** Mask pattern */
  mask: string | Array<string | RegExp>;
  /** Placeholder character for mask */
  maskChar?: string;
  /** Whether to show mask while typing */
  showMask?: boolean;
  /** Label */
  label?: string;
  /** Error message */
  error?: string;
}
```

**Mask Pattern Examples**:
- Phone: `['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]`
- Credit Card: `[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]`
- SSN: `[/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]`

**Behavior Contract**:
- Input is formatted as user types
- `onChange` receives both formatted and raw (unmasked) values
- Backspace/Delete respect mask structure
- Copy/paste is normalized to mask

---

### Select

```typescript
interface SelectOption {
  value: string | number;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

interface SelectProps {
  /** Current selected value(s) */
  value?: string | number | Array<string | number>;
  /** Callback when selection changes */
  onChange: (value: string | number | Array<string | number>) => void;
  /** Available options */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Enable search/filter */
  searchable?: boolean;
  /** Enable multi-select */
  multiple?: boolean;
  /** Async options loading */
  onSearch?: (query: string) => Promise<SelectOption[]>;
  /** Loading state */
  isLoading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Label */
  label?: string;
  /** Maximum items to display before scrolling */
  maxMenuHeight?: number;
  /** Custom option renderer */
  renderOption?: (option: SelectOption) => React.ReactNode;
}
```

**Behavior Contract**:
- Click opens dropdown
- Arrow keys navigate options (roving tabindex)
- Enter selects focused option
- ESC closes dropdown
- Type-ahead: typing filters options (if `searchable`)
- Multi-select: Selected options shown as tags
- Async: Calls `onSearch` with debounced query

---

### FileUpload

```typescript
interface FileUploadProps {
  /** Accepted file types (MIME types or extensions) */
  accept?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Enable multiple file selection */
  multiple?: boolean;
  /** Callback when files are selected */
  onFilesSelected: (files: File[]) => void;
  /** Optional upload handler (returns promise for progress) */
  onUpload?: (file: File) => Promise<void>;
  /** Current files (controlled) */
  files?: File[];
  /** Disabled state */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Label */
  label?: string;
  /** Helper text */
  helperText?: string;
}
```

**Behavior Contract**:
- Click zone or "Browse" button opens file picker
- Drag and drop files over zone
- Validates file type and size
- Shows file list with preview (for images)
- Shows upload progress if `onUpload` provided
- Remove button for each file
- Rejected files show error messages

---

### Checkbox, Radio, Switch

```typescript
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Checked state */
  checked?: boolean;
  /** Callback when checked state changes */
  onChange?: (checked: boolean) => void;
  /** Indeterminate state (checkbox only) */
  indeterminate?: boolean;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
}

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Radio value */
  value: string | number;
  /** Whether this radio is selected */
  checked?: boolean;
  /** Label text */
  label?: string;
}

interface SwitchProps {
  /** Enabled state */
  checked: boolean;
  /** Callback when state changes */
  onChange: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}
```

**Behavior Contract**:
- Click toggles state
- Space key toggles when focused
- Label click toggles input
- Indeterminate state overrides checked (visual only)

---

### Slider

```typescript
interface SliderProps {
  /** Current value (or [min, max] for range) */
  value: number | [number, number];
  /** Callback when value changes */
  onChange: (value: number | [number, number]) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Label */
  label?: string;
  /** Whether to show value label */
  showValue?: boolean;
  /** Disabled state */
  disabled?: boolean;
}
```

**Behavior Contract**:
- Drag handle to change value
- Arrow keys increment/decrement by `step`
- Home/End keys jump to min/max
- Range mode has two handles

---

### Textarea

```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Maximum character count */
  maxLength?: number;
  /** Whether to show character count */
  showCount?: boolean;
  /** Auto-resize to content */
  autoResize?: boolean;
}
```

**Behavior Contract**:
- Character count updates as user types
- Auto-resize adjusts height to fit content
- Max length prevents additional input

---

## Data Display Components

### Table

```typescript
interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  
  // Controlled states (all optional)
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
  globalFilter?: string;
  onGlobalFilterChange?: (filter: string) => void;
  pagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  columnVisibility?: ColumnVisibilityState;
  onColumnVisibilityChange?: (visibility: ColumnVisibilityState) => void;
  
  rowCount?: number;
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  enableMultiRowSelection?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
}
```

**Behavior Contract**:
- Click column header to sort (if `enableSorting`)
- Checkbox column for row selection (if `enableRowSelection`)
- "Select All" checkbox in header
- Horizontal scroll on mobile if content exceeds viewport
- Skeleton rows when `isLoading`
- Empty state message when `data.length === 0`

**Performance Contract**:
- < 100ms render time for single page (any page size)
- < 50ms sort time for 1,000 rows (client-side)

---

## UI Pattern Components

### Modal

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  onOpenComplete?: () => void;
  onCloseComplete?: () => void;
}
```

**Behavior Contract**:
- Focus trapped within modal when open
- ESC key closes (if `closeOnEscape`)
- Backdrop click closes (if `closeOnBackdropClick`)
- Focus returns to trigger element on close
- Body scroll disabled when open
- Animated entrance/exit with Framer Motion

---

### AlertDialog

```typescript
interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmLabel?: string; // default: "Confirm"
  cancelLabel?: string; // default: "Cancel"
  onConfirm: () => void;
  onCancel?: () => void;
  severity?: 'info' | 'warning' | 'destructive';
  isLoading?: boolean;
}
```

**Behavior Contract**:
- Confirm button auto-focused on open
- Enter key triggers confirm
- ESC key triggers cancel
- Buttons disabled when `isLoading`
- Color scheme matches severity (destructive = red)

---

### Drawer

```typescript
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'full';
  overlay?: boolean;
  children: React.ReactNode;
}
```

**Behavior Contract**:
- Slides in from specified position
- ESC closes drawer
- Backdrop click closes (if `overlay`)
- Focus trapped within drawer
- Body scroll disabled when open (if `overlay`)

---

### Tabs

```typescript
interface TabItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  value?: string; // controlled active tab
  onChange?: (tabId: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'line' | 'enclosed' | 'pills';
  lazy?: boolean; // lazy-load tab content
}
```

**Behavior Contract**:
- Arrow keys navigate tabs (Home/End for first/last)
- Enter/Space activates focused tab
- Lazy tabs render content only when activated
- Disabled tabs skip in keyboard navigation

---

### Accordion

```typescript
interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  value?: string | string[]; // controlled expanded item(s)
  onChange?: (value: string | string[]) => void;
  allowMultiple?: boolean;
  defaultExpanded?: string | string[];
}
```

**Behavior Contract**:
- Click header to toggle expand/collapse
- Enter/Space on focused header toggles
- Smooth height animation with Framer Motion
- Single mode: Opening one collapses others
- Multiple mode: Multiple items can be open

---

### Menu / Dropdown

```typescript
interface MenuItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  children?: MenuItem[]; // submenu
  shortcut?: string;
}

interface MenuProps {
  items: MenuItem[];
  trigger: React.ReactNode;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right';
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}
```

**Behavior Contract**:
- Click trigger opens menu
- Arrow keys navigate items
- Enter activates item
- ESC closes menu
- Hover shows submenu (if nested)
- Menu stays within viewport (flip/shift positioning)

---

### Toast

```typescript
interface ToastProps {
  id?: string;
  title: string;
  description?: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // default 5000ms, 0 = no auto-dismiss
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  showCloseButton?: boolean;
  onDismiss?: () => void;
  action?: { label: string; onClick: () => void };
}

// Context API for managing toasts
const { addToast, dismissToast, dismissAll } = useToast();
```

**Behavior Contract**:
- Toasts stack in specified position
- Maximum 5 visible (oldest dismissed when exceeded)
- Auto-dismiss after `duration` (unless `duration: 0`)
- Hover pauses auto-dismiss timer
- Screen reader announcement via `aria-live`

---

### Badge, Tag, Avatar, Tooltip, Spinner, Skeleton, ProgressBar, Breadcrumb, Pagination

(Abbreviated for brevity - these follow similar patterns with props for variants, sizes, content, and callbacks)

---

## Layout Components

### Container

```typescript
interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  center?: boolean; // horizontally center
  className?: string;
}
```

**Behavior Contract**:
- Responsive max-width based on Tailwind breakpoints
- Centers content if `center={true}`
- Applies padding on x-axis

---

### Stack

```typescript
interface StackProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical'; // default: vertical
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  className?: string;
}
```

**Behavior Contract**:
- Uses flexbox for layout
- Gap applies spacing between children
- Responsive: Can change direction at breakpoints via className

---

### Divider

```typescript
interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  labelPosition?: 'left' | 'center' | 'right';
  variant?: 'solid' | 'dashed' | 'dotted';
  className?: string;
}
```

**Behavior Contract**:
- Horizontal divider: Full width, optional centered label
- Vertical divider: Full height (requires parent with defined height)

---

### NavigationBar

```typescript
interface NavigationItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: MenuItem[]; // dropdown menu
}

interface NavigationBarProps {
  logo?: React.ReactNode;
  items: NavigationItem[];
  actions?: React.ReactNode;
  sticky?: boolean;
  mobileBreakpoint?: 'sm' | 'md' | 'lg' | 'xl';
}
```

**Behavior Contract**:
- Desktop: Horizontal nav items, actions on right
- Mobile: Hamburger menu, slide-in drawer with Framer Motion
- Sticky: Stays at top on scroll with `position: sticky`
- Active item highlighted
- Dropdown items on hover (desktop) or nested list (mobile)

---

## Accessibility Contract

All components MUST meet WCAG 2.1 Level AA:

- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Focus Management**: Visible focus indicators, logical tab order
- **ARIA Attributes**: Proper roles, states, and properties
- **Screen Reader**: Meaningful labels and announcements
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Touch Targets**: Minimum 44x44px on mobile

---

## Breaking Change Policy

**Major Version** (e.g., 1.0.0 → 2.0.0):
- Renamed or removed props
- Changed prop types (e.g., string → number)
- Changed callback signatures

**Minor Version** (e.g., 1.0.0 → 1.1.0):
- New components
- New optional props (backwards compatible)
- New prop values for existing string unions

**Patch Version** (e.g., 1.0.0 → 1.0.1):
- Bug fixes
- Documentation updates
- Internal refactors (no API changes)

---

## Testing Contract

All components include:
- **Storybook Stories**: Demonstrating all variants and states
- **Interaction Tests**: Verifying keyboard navigation and user interactions
- **Accessibility Tests**: Automated a11y addon checks
- **Visual Regression**: (future) Chromatic integration for visual changes

Consumers can test components via:
- Importing from `@secondgen/ui` in their test files
- Using `@testing-library/react` for component testing
- Mocking callbacks and asserting they're called with correct arguments

