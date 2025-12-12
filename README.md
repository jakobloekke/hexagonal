# SecondGen Platform

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

## Architecture

- `apps/frontend`: React + Vite (pnpm)
- `apps/backend`: FastAPI (uv)
- `packages/ui`: Shared UI components
- `packages/sdk`: Generated API client
