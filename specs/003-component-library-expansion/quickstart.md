# Quickstart: Component Library Expansion

This guide helps developers get started with the expanded `@secondgen/ui` component library.

## Prerequisites

- **Node.js**: Version 20.19.0 or higher (use `nvm use` in project root)
- **Package Manager**: pnpm (installed via `npm install -g pnpm`)
- **Baseline Features**: Features 001 (monorepo foundation) and 002 (initial UI library) must be implemented

## Installation

The UI library is already part of the monorepo workspace. If setting up fresh:

```bash
# From project root
pnpm install

# This installs all dependencies including:
# - framer-motion (animation)
# - lucide-react (icons)
# - @tanstack/react-table (table logic)
# - focus-trap-react (accessibility)
```

## Development Workflow

### 1. Run Storybook

The primary development environment for UI components is Storybook:

```bash
# From project root
pnpm storybook
```

This starts Storybook at `http://localhost:6006` where you can:
- Browse all components and their variants
- Interact with components in isolation
- Test different prop combinations using Controls
- View auto-generated documentation
- Run accessibility checks

### 2. Using Components in Your App

Import components from `@secondgen/ui`:

```typescript
// In apps/frontend/src/App.tsx or any component
import { 
  Button, 
  DatePicker, 
  Table, 
  Modal, 
  Container 
} from '@secondgen/ui';

function MyPage() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container maxWidth="lg">
      <DatePicker value={date} onChange={setDate} />
      <Button onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Hello Modal!</h2>
      </Modal>
    </Container>
  );
}
```

### 3. Form Component Example

Here's a complete form using multiple form components:

```typescript
import { useState } from 'react';
import { 
  Input, 
  DatePicker, 
  Select, 
  Checkbox, 
  Button, 
  Stack 
} from '@secondgen/ui';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    birthdate: null as Date | null,
    country: '',
    terms: false,
  });

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        
        <DatePicker
          label="Date of Birth"
          value={formData.birthdate}
          onChange={(date) => setFormData({ ...formData, birthdate: date })}
          max={new Date()}
        />
        
        <Select
          label="Country"
          options={countryOptions}
          value={formData.country}
          onChange={(value) => setFormData({ ...formData, country: value as string })}
          searchable
        />
        
        <Checkbox
          label="I agree to the terms and conditions"
          checked={formData.terms}
          onChange={(checked) => setFormData({ ...formData, terms: checked })}
        />
        
        <Button type="submit" disabled={!formData.terms}>
          Register
        </Button>
      </Stack>
    </form>
  );
}
```

### 4. Table Component Example

Using the controlled Table component with client-side utilities:

```typescript
import { useMemo, useState } from 'react';
import { Table, type TableColumn } from '@secondgen/ui';
import { sortData, paginateData } from '@secondgen/ui/utils';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

function UserTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // Sample data
  const data: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
    // ... more rows
  ];

  // Define columns
  const columns: TableColumn<User>[] = [
    {
      id: 'id',
      header: 'ID',
      accessorKey: 'id',
      enableSorting: true,
    },
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      enableSorting: true,
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      enableSorting: true,
    },
  ];

  // Process data with utility functions
  const processedData = useMemo(() => {
    let result = data;
    
    // Apply sorting
    if (sorting.length > 0) {
      result = sortData(result, sorting);
    }
    
    // Apply pagination
    const { data: paginatedData, pageCount } = paginateData(result, pagination);
    
    return { data: paginatedData, pageCount, totalRows: result.length };
  }, [data, sorting, pagination]);

  return (
    <Table
      data={processedData.data}
      columns={columns}
      sorting={sorting}
      onSortingChange={setSorting}
      pagination={pagination}
      onPaginationChange={setPagination}
      rowCount={processedData.totalRows}
    />
  );
}
```

### 5. Modal & Toast Example

Combining Modal and Toast for user feedback:

```typescript
import { useState } from 'react';
import { Button, Modal, AlertDialog, useToast } from '@secondgen/ui';

function DeleteUserFlow() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { addToast } = useToast();

  const handleDelete = async () => {
    setIsConfirmOpen(false);
    
    // Simulate API call
    try {
      await deleteUser();
      addToast({
        title: 'User deleted',
        description: 'The user has been successfully removed.',
        severity: 'success',
      });
    } catch (error) {
      addToast({
        title: 'Delete failed',
        description: 'Could not delete user. Please try again.',
        severity: 'error',
      });
    }
  };

  return (
    <>
      <Button 
        variant="destructive" 
        onClick={() => setIsConfirmOpen(true)}
      >
        Delete User
      </Button>

      <AlertDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Delete User"
        description="Are you sure? This action cannot be undone."
        severity="destructive"
        confirmLabel="Delete"
        onConfirm={handleDelete}
      />
    </>
  );
}
```

### 6. Layout Example

Building a complete page layout:

```typescript
import { 
  NavigationBar, 
  Container, 
  Stack, 
  Divider 
} from '@secondgen/ui';

function AppLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { id: '1', label: 'Dashboard', href: '/dashboard', active: true },
    { id: '2', label: 'Users', href: '/users' },
    { id: '3', label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar
        logo={<img src="/logo.png" alt="Logo" className="h-8" />}
        items={navItems}
        actions={
          <Button variant="primary" size="sm">
            Logout
          </Button>
        }
        sticky
      />
      
      <Container maxWidth="xl" padding="lg" className="py-8">
        <Stack gap="lg" direction="vertical">
          <h1 className="text-3xl font-bold">Page Title</h1>
          <Divider />
          {children}
        </Stack>
      </Container>
    </div>
  );
}
```

## Common Patterns

### React Hook Form Integration

```typescript
import { useForm, Controller } from 'react-hook-form';
import { Input, DatePicker, Select } from '@secondgen/ui';

interface FormData {
  name: string;
  birthdate: Date;
  country: string;
}

function HookFormExample() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Name"
            error={fieldState.error?.message}
          />
        )}
      />
      
      <Controller
        name="birthdate"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Date of Birth"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Responsive Design

All components are mobile-responsive. Use Tailwind utilities for custom responsive behavior:

```typescript
<Container maxWidth="xl">
  <Stack 
    direction="vertical" 
    className="md:flex-row" // horizontal on medium+ screens
    gap="md"
  >
    <Card className="w-full md:w-1/2">Content 1</Card>
    <Card className="w-full md:w-1/2">Content 2</Card>
  </Stack>
</Container>
```

### Custom Styling

Extend component styles with className:

```typescript
<Button 
  variant="primary"
  className="shadow-lg hover:shadow-xl transition-shadow"
>
  Custom Styled Button
</Button>
```

All components accept `className` prop for Tailwind utility overrides.

## Testing Components

### In Storybook

1. Navigate to component in Storybook sidebar
2. Use Controls panel to adjust props
3. Click "Accessibility" tab to run a11y checks
4. Manually test keyboard navigation

### In Consumer App Tests

```typescript
import { render, screen, userEvent } from '@testing-library/react';
import { Button } from '@secondgen/ui';

test('Button calls onClick when clicked', async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  const button = screen.getByRole('button', { name: /click me/i });
  await userEvent.click(button);
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## Building the Library

To build the `@secondgen/ui` package for distribution:

```bash
# From project root
pnpm build --filter @secondgen/ui
```

This generates:
- `packages/ui/dist/secondgen-ui.js` (ESM)
- `packages/ui/dist/secondgen-ui.mjs` (CJS)
- `packages/ui/dist/index.d.ts` (TypeScript types)

## Troubleshooting

### Component not found

Ensure the component is exported from `packages/ui/src/index.ts`:

```typescript
export { DatePicker } from './components/DatePicker/DatePicker';
```

### Styles not applied

Ensure your app imports the global CSS:

```typescript
// In your app's entry point (e.g., main.tsx)
import '@secondgen/ui/styles/globals.css';
```

### TypeScript errors

Ensure `@secondgen/ui` is listed in your `tsconfig.json` paths:

```json
{
  "compilerOptions": {
    "paths": {
      "@secondgen/ui": ["../../packages/ui/src"]
    }
  }
}
```

### Framer Motion animations not working

Ensure `AnimatePresence` wraps components that animate in/out:

```typescript
import { AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isOpen && <Modal ... />}
</AnimatePresence>
```

## Next Steps

- **Explore Storybook**: Review all FR-001..FR-030 components (30 components) and their variants
- **Read API Docs**: See `contracts/component-api.md` for detailed prop interfaces
- **Check Examples**: See `data-model.md` for TypeScript type definitions
- **Accessibility**: Review `research.md` for WCAG compliance patterns

## Support

- **Documentation**: See `specs/003-component-library-expansion/` for complete specification
- **Issues**: Report bugs or request features via project issue tracker
- **Storybook**: `pnpm storybook` for interactive component documentation

