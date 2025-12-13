# Data Model: Component Library Expansion

**Feature**: Component Library Expansion
**Date**: 2025-12-12

## Overview

This feature is a UI component library - there is no persistent storage or backend data model. This document describes the **TypeScript interfaces and type definitions** that form the "data model" for component props and state management.

## Core Entities

### 1. FormField (Base)

Represents common properties for form input components.

```typescript
interface BaseFormFieldProps {
  /** Field identifier for form libraries */
  id?: string;
  /** Field name for form submission */
  name?: string;
  /** Label text displayed above the field */
  label?: string;
  /** Placeholder text shown when empty */
  placeholder?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Error message to display */
  error?: string;
  /** Helper text displayed below the field */
  helperText?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
}
```

**Usage**: Extended by all form components (Input, DatePicker, Select, etc.)

**Validation Rules**: 
- `error` overrides `helperText` when present
- `disabled` prevents all interactions
- `required` adds visual indicator (typically asterisk)

---

### 2. TableColumn

Defines the structure and behavior of a table column.

```typescript
interface TableColumn<TData> {
  /** Unique column identifier */
  id: string;
  /** Column header text */
  header: string | ((column: Column<TData>) => React.ReactNode);
  /** Accessor function to extract cell value from row data */
  accessorKey?: keyof TData;
  accessorFn?: (row: TData) => any;
  /** Custom cell renderer */
  cell?: (info: CellContext<TData, any>) => React.ReactNode;
  /** Whether this column is sortable */
  enableSorting?: boolean;
  /** Whether this column is filterable */
  enableFiltering?: boolean;
  /** Whether this column can be hidden */
  enableHiding?: boolean;
  /** Whether this column can be resized */
  enableResizing?: boolean;
  /** Minimum column width */
  minSize?: number;
  /** Maximum column width */
  maxSize?: number;
  /** Initial column width */
  size?: number;
  /** Footer content */
  footer?: string | ((column: Column<TData>) => React.ReactNode);
}
```

**Relationships**: Used by `TableProps<TData>`

**State Transitions**: Columns can be sorted (ascending/descending/none), hidden/shown, resized

---

### 3. TableData & TableState

Container for table data and its associated state.

```typescript
interface TableProps<TData> {
  /** Array of data objects to display */
  data: TData[];
  /** Column definitions */
  columns: ColumnDef<TData>[];
  
  // Controlled Sorting State
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  
  // Controlled Filtering State
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
  globalFilter?: string;
  onGlobalFilterChange?: (filter: string) => void;
  
  // Controlled Pagination State
  pagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
  
  // Controlled Row Selection State
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  
  // Controlled Column Visibility State
  columnVisibility?: ColumnVisibilityState;
  onColumnVisibilityChange?: (visibility: ColumnVisibilityState) => void;
  
  /** Total row count (for server-side pagination) */
  rowCount?: number;
  
  /** Enable row selection */
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  
  /** Enable multi-row selection */
  enableMultiRowSelection?: boolean;
  
  /** Loading state */
  isLoading?: boolean;
  
  /** Empty state message */
  emptyMessage?: string;
}

// State Types (from TanStack Table)
type SortingState = Array<{ id: string; desc: boolean }>;
type ColumnFiltersState = Array<{ id: string; value: any }>;
type PaginationState = { pageIndex: number; pageSize: number };
type RowSelectionState = Record<string, boolean>;
type ColumnVisibilityState = Record<string, boolean>;
```

**Validation Rules**:
- `data` can be empty array (shows empty state)
- `columns` must have at least one column
- Pagination `pageIndex` is zero-based
- Row selection state keys are row IDs

**State Transitions**:
- Sorting: none → ascending → descending → none
- Row selection: unselected → selected (multi-select toggles)
- Column visibility: visible → hidden (toggled by user)

---

### 4. ModalState

Manages the open/close state and data payload for Modal and Dialog components.

```typescript
interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Footer content (typically action buttons) */
  footer?: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether clicking backdrop closes modal */
  closeOnBackdropClick?: boolean;
  /** Whether pressing ESC closes modal */
  closeOnEscape?: boolean;
  /** Callback when modal is fully opened (after animation) */
  onOpenComplete?: () => void;
  /** Callback when modal is fully closed (after animation) */
  onCloseComplete?: () => void;
}

interface AlertDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Callback when dialog should close */
  onClose: () => void;
  /** Dialog title */
  title: string;
  /** Dialog description/content */
  description: string;
  /** Confirm button text */
  confirmLabel?: string;
  /** Cancel button text */
  cancelLabel?: string;
  /** Callback when confirm is clicked */
  onConfirm: () => void;
  /** Callback when cancel is clicked */
  onCancel?: () => void;
  /** Severity/intent of the action */
  severity?: 'info' | 'warning' | 'destructive';
  /** Loading state (disables buttons) */
  isLoading?: boolean;
}
```

**State Transitions**:
- closed → opening (animation) → open → closing (animation) → closed
- Confirm/cancel actions trigger `onConfirm`/`onCancel` then `onClose`

---

### 5. NotificationMessage (Toast)

Represents a toast notification with content, severity, and display configuration.

```typescript
interface ToastProps {
  /** Unique toast ID (for dismissal) */
  id?: string;
  /** Toast content */
  title: string;
  /** Optional description */
  description?: string;
  /** Severity/type */
  severity?: 'success' | 'error' | 'warning' | 'info';
  /** Auto-dismiss duration in milliseconds (0 = no auto-dismiss) */
  duration?: number;
  /** Position on screen */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Optional action button */
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Toast Context for managing multiple toasts
interface ToastContextValue {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => string;
  dismissToast: (id: string) => void;
  dismissAll: () => void;
}
```

**Validation Rules**:
- Maximum 5 toasts visible simultaneously (oldest dismissed)
- `duration` default: 5000ms
- Position default: 'top-right'

**State Transitions**: added → visible → (auto-dismiss or user-dismiss) → animating out → removed

---

### 6. MenuItem

Represents a navigation or action item in menus, dropdowns, and navigation bars.

```typescript
interface MenuItem {
  /** Unique item identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional badge/count */
  badge?: string | number;
  /** Item variant/intent */
  variant?: 'default' | 'destructive';
  /** Whether item is disabled */
  disabled?: boolean;
  /** Navigation link (if item is a link) */
  href?: string;
  /** Click handler (if item is a button) */
  onClick?: () => void;
  /** Nested submenu items */
  children?: MenuItem[];
  /** Keyboard shortcut display */
  shortcut?: string;
}

interface MenuProps {
  /** Menu items */
  items: MenuItem[];
  /** Trigger element (button/link) */
  trigger: React.ReactNode;
  /** Menu position relative to trigger */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right';
  /** Whether menu is open (controlled) */
  isOpen?: boolean;
  /** Callback when menu open state changes */
  onOpenChange?: (isOpen: boolean) => void;
}
```

**Relationships**: Used by Menu/Dropdown, NavigationBar

**State Transitions**: closed → opening → open (with focus on first item) → closing → closed

---

### 7. NavigationItem

Top-level navigation link used in NavigationBar.

```typescript
interface NavigationItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Navigation destination */
  href: string;
  /** Whether this item is currently active/selected */
  active?: boolean;
  /** Optional icon */
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional badge */
  badge?: string | number;
  /** Nested dropdown menu items */
  children?: MenuItem[];
}

interface NavigationBarProps {
  /** Logo element (typically image or text) */
  logo?: React.ReactNode;
  /** Navigation items */
  items: NavigationItem[];
  /** Action buttons (typically on the right) */
  actions?: React.ReactNode;
  /** Whether to stick to top on scroll */
  sticky?: boolean;
  /** Mobile breakpoint for hamburger menu (default: 1024px / 'lg') */
  mobileBreakpoint?: 'sm' | 'md' | 'lg' | 'xl';
}
```

**Validation Rules**:
- At least one of `items` or `actions` should be provided
- Only one item should have `active: true`

**State Transitions**: Mobile menu: closed → opening (slide animation) → open → closing → closed

---

### 8. LayoutContainer

Configuration for responsive container components.

```typescript
interface ContainerProps {
  /** Content */
  children: React.ReactNode;
  /** Maximum width breakpoint */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Whether to center content */
  center?: boolean;
  /** Additional CSS classes */
  className?: string;
}

interface StackProps {
  /** Content */
  children: React.ReactNode;
  /** Stack direction */
  direction?: 'horizontal' | 'vertical';
  /** Gap size between children */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Alignment along main axis */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Alignment along cross axis */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  /** Whether to wrap on overflow */
  wrap?: boolean;
  /** Additional CSS classes */
  className?: string;
}

interface DividerProps {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Optional label text */
  label?: string;
  /** Label position (only for horizontal) */
  labelPosition?: 'left' | 'center' | 'right';
  /** Divider style */
  variant?: 'solid' | 'dashed' | 'dotted';
  /** Additional CSS classes */
  className?: string;
}
```

**Validation Rules**:
- Container `maxWidth: 'full'` disables max-width constraint
- Stack `direction: 'vertical'` is default
- Divider label only supported for horizontal orientation

---

## Client-Side Utility Functions

These utilities help consumers perform common operations without server-side logic:

```typescript
// packages/ui/src/utils/tableHelpers.ts

export function sortData<T>(
  data: T[],
  sorting: SortingState
): T[] {
  // Implementation: Multi-column sort with accessor functions
}

export function filterData<T>(
  data: T[],
  filters: ColumnFiltersState,
  columns: ColumnDef<T>[]
): T[] {
  // Implementation: Per-column and global filtering
}

export function paginateData<T>(
  data: T[],
  pagination: PaginationState
): { data: T[]; pageCount: number } {
  // Implementation: Slice data for current page
}

export function getTableState<T>(
  data: T[],
  sorting?: SortingState,
  filters?: ColumnFiltersState,
  pagination?: PaginationState
): {
  processedData: T[];
  totalRows: number;
  pageCount: number;
} {
  // Implementation: Combines sort, filter, paginate
}
```

---

## Type System Summary

| Category | Primary Types | Exported From |
|----------|---------------|---------------|
| Form Components | `BaseFormFieldProps`, `DatePickerProps`, `SelectProps`, etc. | `@secondgen/ui` |
| Table | `TableProps<TData>`, `TableColumn<TData>`, `SortingState`, etc. | `@secondgen/ui` |
| Modal/Dialog | `ModalProps`, `AlertDialogProps`, `ModalState` | `@secondgen/ui` |
| Toast | `ToastProps`, `ToastContextValue` | `@secondgen/ui` |
| Menu | `MenuItem`, `MenuProps`, `NavigationItem`, `NavigationBarProps` | `@secondgen/ui` |
| Layout | `ContainerProps`, `StackProps`, `DividerProps` | `@secondgen/ui` |
| Utilities | `sortData`, `filterData`, `paginateData` | `@secondgen/ui/utils` |

All types are fully exported with JSDoc comments for IDE auto-completion.

---

## Notes

- **No Runtime Validation**: Components use TypeScript for compile-time validation. Runtime validation (e.g., Zod) is consumer's responsibility for form submissions.
- **Generic Data**: Table component uses TypeScript generics (`<TData>`) for type-safe column definitions.
- **Controlled Pattern**: All stateful components are controlled - state lives in consumer code, not component internals.
- **Extensibility**: All component props extend native HTML attributes (e.g., `InputProps extends React.InputHTMLAttributes<HTMLInputElement>`).

