# Components Structure

## Directory Layout

### Frontend (`apps/frontend`)
- `src/features/[feature-name]`: Domain-specific UI logic
- `src/App.tsx`: App Shell

### Backend (`apps/backend`)
- `app/modules/[feature-name]`: Domain-specific API/logic
- `app/main.py`: Entry point

### Shared (`packages/`)
- `ui/`: Design system components
- `sdk/`: Generated API clients

