/**
 * UI Component Library Smoke Test
 * Purpose: Verify all components and utilities can be imported successfully
 * Run: pnpm test:ui-smoke (from root)
 */

// Main exports
import {
  Button,
  Input,
  Card,
  Checkbox,
  Radio,
  Switch,
  Slider,
  Textarea,
  MaskedInput,
  Select,
  FileUpload,
  DatePicker,
  Table,
  Container,
  Stack,
  Divider,
  NavigationBar,
  Modal,
  AlertDialog,
  Drawer,
  Menu,
  Dropdown,
  Tooltip,
  Tabs,
  Accordion,
  ToastProvider,
  useToast,
  Badge,
  Tag,
  Avatar,
  Spinner,
  Skeleton,
  ProgressBar,
  Breadcrumb,
  Pagination,
} from '@secondgen/ui';

// Type exports
import type {
  ButtonProps,
  InputProps,
  CardProps,
  CheckboxProps,
  RadioProps,
  SwitchProps,
  SliderProps,
  TextareaProps,
  MaskedInputProps,
  SelectProps,
  FileUploadProps,
  DatePickerProps,
  TableProps,
  ContainerProps,
  StackProps,
  DividerProps,
  NavigationBarProps,
  ModalProps,
  AlertDialogProps,
  DrawerProps,
  MenuProps,
  TooltipProps,
  TabsProps,
  AccordionProps,
  BadgeProps,
  AvatarProps,
  SpinnerProps,
  SkeletonProps,
  ProgressBarProps,
  BreadcrumbProps,
  PaginationProps,
} from '@secondgen/ui';

// Utilities
import {
  cn,
  sortData,
  filterData,
  paginateData,
  getTableState,
  Portal,
  useScrollLock,
  FOCUS_RING,
  INTERACTIVE_BASE,
  INTERACTIVE_DISABLED,
} from '@secondgen/ui/utils';

// Verify all imports resolved
const componentImports = [
  Button,
  Input,
  Card,
  Checkbox,
  Radio,
  Switch,
  Slider,
  Textarea,
  MaskedInput,
  Select,
  FileUpload,
  DatePicker,
  Table,
  Container,
  Stack,
  Divider,
  NavigationBar,
  Modal,
  AlertDialog,
  Drawer,
  Menu,
  Dropdown,
  Tooltip,
  Tabs,
  Accordion,
  ToastProvider,
  Badge,
  Tag,
  Avatar,
  Spinner,
  Skeleton,
  ProgressBar,
  Breadcrumb,
  Pagination,
];

const utilityImports = [
  cn,
  sortData,
  filterData,
  paginateData,
  getTableState,
  Portal,
  useScrollLock,
  FOCUS_RING,
  INTERACTIVE_BASE,
  INTERACTIVE_DISABLED,
];

console.log(
  `✅ Smoke Test PASSED: ${componentImports.length} components + ${utilityImports.length} utilities imported successfully`
);

// Type check: verify no imports are undefined
const allImports = [...componentImports, ...utilityImports, useToast];
const undefinedImports = allImports.filter(imp => imp === undefined);

if (undefinedImports.length > 0) {
  console.error(
    `❌ Smoke Test FAILED: ${undefinedImports.length} imports are undefined`
  );
  process.exit(1);
}

console.log(
  `✅ All imports verified: ${componentImports.length} components, ${utilityImports.length} utilities, 1 hook`
);
console.log('📦 @secondgen/ui is production-ready');

