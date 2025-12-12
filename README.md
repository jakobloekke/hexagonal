## Environment Setup

### Node.js Version
This project requires **Node.js 20.19.0** or later (as required by Storybook 8).

**Automatic Version Switching:**
We recommend using `nvm` (Node Version Manager) to automatically switch to the correct version.
1. Install nvm: [nvm installation guide](https://github.com/nvm-sh/nvm#installing-and-updating)
2. Run `nvm use` in the project root to switch to the version defined in `.nvmrc`.
3. (Optional) To automate this, add the following to your shell config (`.zshrc` or `.bashrc`):
   ```bash
   # Place this after nvm initialization
   autoload -U add-zsh-hook
   load-nvmrc() {
     local node_version="$(nvm version)"
     local nvmrc_path="$(nvm_find_nvmrc)"

     if [ -n "$nvmrc_path" ]; then
       local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

       if [ "$nvmrc_node_version" = "N/A" ]; then
         nvm install
       elif [ "$nvmrc_node_version" != "$node_version" ]; then
         nvm use
       fi
     elif [ "$node_version" != "$(nvm version default)" ]; then
       echo "Reverting to nvm default version"
       nvm use default
     fi
   }
   add-zsh-hook chpwd load-nvmrc
   load-nvmrc
   ```

### Setup

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
