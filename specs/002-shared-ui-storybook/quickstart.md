# Quickstart: Shared UI Component Library

**Target Audience**: Frontend Developers
**Prerequisites**: `pnpm install` in root.
**Node Version**: v20.19.0+ (Required by Storybook) - Run `nvm use`

## Running Storybook

Start the component explorer:

```bash
pnpm storybook
```
- URL: http://localhost:6006

## Using Components in App

Import directly from the package:

```tsx
import { Button, Card } from '@secondgen/ui';

function MyFeature() {
  return (
    <Card title="Feature Action">
      <Button variant="primary" onClick={() => console.log('click')}>
        Do Action
      </Button>
    </Card>
  );
}
```

## Adding a New Component

1. Create directory: `packages/ui/src/components/MyNewComponent/`
2. Create implementation: `MyNewComponent.tsx`
3. Create stories: `MyNewComponent.stories.tsx`
4. Export in `packages/ui/src/index.ts`

## Building the Library

To generate the distribution files (ESM/CJS):

```bash
pnpm build
```
(Runs `pnpm --filter @secondgen/ui build`)
