# Data Model: Repository Baseline Foundation

**Status**: Baseline (Infrastructure)
**Date**: 2025-12-12

> **Note**: As this is an infrastructure foundation feature, there are no business entities or database schemas. The "Data Model" here refers to the configuration entities and file structures.

## Configuration Entities

### Workspace Configuration (`pnpm-workspace.yaml`)
```yaml
packages:
  - 'apps/frontend'
  - 'packages/*'
```

### Backend Configuration (`pyproject.toml`)
Managed by `uv`.
- `[project]`: Name, version, dependencies.
- `[tool.ruff]`: Linter configuration.
- `[tool.pytest.ini_options]`: Test configuration.

## Directory Structure (The "Schema" of the Repo)

### Capability Structure (Generated)
Each capability consists of these "tables" (directories):

| Location | Purpose |
| :--- | :--- |
| `apps/frontend/src/features/[name]/` | React components, hooks, state. |
| `apps/backend/app/modules/[name]/` | FastAPI routes, SQLModel models, services. |
| `packages/ui/src/components/[name]/` | Shared, reusable UI atoms/molecules. |
| `packages/sdk/src/[name]/` | Generated TypeScript client (future). |

