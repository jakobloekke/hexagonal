# Quickstart: Repository Baseline Foundation

**Target Audience**: Developers
**Prerequisites**:
- Node.js 20+
- Python 3.12+
- pnpm (`npm install -g pnpm`)
- uv (`curl -LsSf https://astral.sh/uv/install.sh | sh`)

## Setup

1. **Install Dependencies**:
   ```bash
   pnpm install
   cd apps/backend && uv sync
   ```

2. **Run Development Server**:
   ```bash
   pnpm dev
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000

## Creating a New Feature

Use the scaffolding script to create a new capability:

```bash
./scripts/scaffold-capability.sh my-new-feature
```

This will create:
- `apps/frontend/src/features/my-new-feature/`
- `apps/backend/app/modules/my-new-feature/`
- `packages/ui/src/components/my-new-feature/`

## Running Tests

```bash
pnpm test      # Runs frontend tests
pnpm test:api  # Runs backend tests (via uv)
```

## Linting

```bash
pnpm lint      # Lints frontend (ESLint/Prettier) and backend (Ruff)
```

