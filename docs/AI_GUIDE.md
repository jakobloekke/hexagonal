# AI Agent Integration Guide

**Purpose**: This guide provides AI agents (Replit Agent, Cursor, Claude, etc.) with explicit context to generate code that correctly integrates with the SecondGen platform architecture and component library.

**Read This If**: You are an AI agent being asked to scaffold, generate, or modify code for the SecondGen project.

---

## Polyglot Monorepo Structure

The SecondGen project is a **polyglot monorepo** with clear separation between frontend and backend:

### Frontend (`/apps/frontend` and `/packages/ui`)

- **Language**: TypeScript/JavaScript (React)
- **Package Manager**: `pnpm` (NOT npm or yarn)
- **Build Tool**: Vite
- **Entry Point**: `/apps/frontend/` (Vite app)
- **Shared Components**: `/packages/ui/` (React component library)
- **Build Command**: `pnpm build`
- **Dev Command**: `pnpm dev:frontend`

**Key Principle**: All UI components must be imported from `@secondgen/ui`. Do NOT create new component files; always use existing components from the library.

### Backend (`/apps/backend`)

- **Language**: Python 3.11+
- **Package Manager**: `uv` (NOT pip, poetry, or conda)
- **Framework**: FastAPI
- **Database**: PostgreSQL (managed separately)
- **Entry Point**: `/apps/backend/` (FastAPI app)
- **Build Command**: `uv sync`
- **Dev Command**: `pnpm dev:backend`

### Communication

- **Frontend ↔ Backend**: Via REST API (typed OpenAPI contracts)
- **No Cross-Language Imports**: JavaScript cannot import Python; Python cannot import JavaScript
- **Monorepo Linking**: Handled by `pnpm workspaces`

---

## Preferred Stack

When generating new features, use **only** these technologies:

### UI & Styling

- **Component Library**: `@secondgen/ui` (primary source of truth for all UI components)
- **CSS Framework**: Tailwind CSS (utility-first only; NO custom `.css` files or CSS modules)
- **Icons**: Lucide React (`lucide-react` package)
- **Animations**: Framer Motion (`framer-motion` package)
- **Form State Management**: React Hook Form (if needed)
- **Table Logic**: TanStack Table v8 (for complex tables)

### Example: Preferred Stack

```typescript
import { Button, Input, Modal } from '@secondgen/ui';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function LoginForm() {
  return (
    <motion.div animate={{ opacity: 1 }}>
      <Input type="email" placeholder="Email" />
      <Button variant="primary">
        <Zap size={16} />
        Login
      </Button>
    </motion.div>
  );
}
```

### Backend

- **API Framework**: FastAPI (with async/await)
- **ORM**: SQLAlchemy or direct SQL (project-specific)
- **Validation**: Pydantic
- **Testing**: pytest

---

## Component Usage

### Importing from `@secondgen/ui`

All UI components are exported from the primary package:

```typescript
// ✅ CORRECT: Import from @secondgen/ui
import {
  Button,
  Input,
  Modal,
  Toast,
  Tabs,
  Accordion,
  Table,
  Card,
  Badge,
  Avatar,
  Spinner,
} from '@secondgen/ui';

// ✅ CORRECT: Import utilities from @secondgen/ui/utils
import { sortData, filterData, paginateData } from '@secondgen/ui/utils';
```

### Example: Form Component

```typescript
import { Button, Input } from '@secondgen/ui';
import { useToast } from '@secondgen/ui';

export function RegistrationForm() {
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Submit to backend API
      addToast({ message: 'Registration successful!', severity: 'success' });
    } catch (error) {
      addToast({ message: 'Registration failed', severity: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button type="submit">Register</Button>
    </form>
  );
}
```

### Example: Table Component

```typescript
import { Table } from '@secondgen/ui';

export function UserList() {
  const [data, setData] = React.useState([
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
  ]);

  return (
    <Table
      data={data}
      columns={[
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'role', header: 'Role' },
      ]}
    />
  );
}
```

### Component Variants

All components support common variants:

- `Button`: `primary`, `secondary`, `outline`, `ghost`, `danger`
- `Input`: Various sizes and states (focused, disabled, error)
- `Modal`: Sizes `sm`, `md`, `lg`, `xl`
- `Badge`: Color variants (`blue`, `green`, `red`, `yellow`, `gray`)

Refer to Storybook (run `pnpm storybook`) for interactive component documentation.

---

## Negative Constraints

### DO NOT...

1. **Create new component files** in any directory.
   - ✅ Use existing components from `@secondgen/ui`
   - ❌ Do not create `src/components/MyButton.tsx`

2. **Install Material-UI, shadcn/ui, or other component libraries**.
   - ✅ Use `@secondgen/ui`
   - ❌ Do not run `npm install @mui/material`

3. **Use CSS modules or custom `.css` files**.
   - ✅ Use Tailwind CSS utility classes
   - ❌ Do not create `Button.module.css` or `Button.css`

4. **Import from backend directories into frontend code**.
   - ✅ Call backend REST APIs via typed SDK
   - ❌ Do not `import { getUserData } from '../../backend/services/users'`

5. **Use npm or yarn for JavaScript packages**.
   - ✅ Use `pnpm add <package>`
   - ❌ Do not run `npm install` or `yarn add`

6. **Use pip, poetry, or conda for Python packages**.
   - ✅ Use `uv add <package>`
   - ❌ Do not run `pip install` or `poetry add`

7. **Create CSS-in-JS solutions (styled-components, emotion, etc.)**.
   - ✅ Use Tailwind CSS
   - ❌ Do not use `const StyledButton = styled.button\`...\``

8. **Skip accessibility (a11y) concerns**.
   - ✅ Use semantic HTML, ARIA attributes, keyboard navigation
   - ❌ Do not create components without keyboard support or focus management

---

## Directory Map

Use this map to understand where code belongs:

```
/
├── apps/
│   ├── frontend/          ← Vite React app (primary UI)
│   │   └── src/
│   │       ├── components/  (Use @secondgen/ui; don't create here)
│   │       ├── pages/       (Route pages)
│   │       ├── hooks/       (Custom React hooks)
│   │       └── services/    (API client, utilities)
│   │
│   └── backend/           ← FastAPI Python app (backend logic)
│       └── app/
│           ├── models/     (Pydantic/SQLAlchemy models)
│           ├── routes/     (API endpoints)
│           ├── services/   (Business logic)
│           └── db/         (Database configuration)
│
├── packages/
│   ├── ui/                ← Shared React component library
│   │   └── src/components/ (Components live HERE)
│   │
│   ├── sdk/               ← TypeScript SDK for API (generated)
│   │
│   └── contrib/           ← Experimental/prototype code
│
└── docs/
    └── AI_GUIDE.md        ← This file!
```

---

## Task Templates

When asked to scaffold a feature, follow these templates:

### New Form

```typescript
// ✅ CORRECT TEMPLATE
import { Button, Input, Form } from '@secondgen/ui';
import { useForm } from 'react-hook-form';

export function MyForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(async (data) => {
      // Call backend API
      const response = await fetch('/api/submit', { method: 'POST', body: JSON.stringify(data) });
    })}>
      <Input {...register('fieldName')} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### New Data Display (Table)

```typescript
// ✅ CORRECT TEMPLATE
import { Table } from '@secondgen/ui';

export function DataTable() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    // Fetch from backend
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);

  return (
    <Table
      data={data}
      columns={[
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'name', header: 'Name' },
      ]}
    />
  );
}
```

### New Page/Route

```typescript
// ✅ CORRECT TEMPLATE
import { Container, Stack, Button } from '@secondgen/ui';

export function MyPage() {
  return (
    <Container>
      <Stack gap="lg">
        <h1>Page Title</h1>
        <p>Use @secondgen/ui components here</p>
        <Button>Action</Button>
      </Stack>
    </Container>
  );
}
```

---

## Storybook Reference

All components are documented in Storybook:

```bash
cd /Users/jakobloekkemadsen/Dokumenter/projekter/SecondGen/hexagonal
pnpm storybook
```

Then open `http://localhost:6006` to browse all available components with interactive examples.

---

## Questions?

- **Architecture**: See `/specs/` for feature specifications
- **Components**: Run `pnpm storybook` for interactive documentation
- **Backend**: See `apps/backend/README.md`
- **Frontend**: See `apps/frontend/README.md`


