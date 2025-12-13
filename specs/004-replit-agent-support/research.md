# Research: Replit & Agent Integration Support

**Status**: Complete
**Date**: 2025-12-13

## 1. Replit Nix Configuration for Polyglot Monorepos

**Decision**: Use `pkgs.nodejs-20_x`, `pkgs.python311`, and `pkgs.nodePackages.pnpm` in `replit.nix`.

**Rationale**:
- **Node.js**: Version 20 matches local dev (`package.json` engines).
- **Python**: Version 3.11 matches local dev (`pyproject.toml` requires >=3.11).
- **pnpm**: Must be explicitly included via `pkgs.nodePackages.pnpm` as it's not default in all Replit images.
- **Postgres**: Not adding `pkgs.postgresql` yet as backend persistence isn't fully scoped for Replit execution in this feature (SC-001 focuses on dev server start).

**Alternatives Considered**:
- *Docker*: Replit supports Docker but it's heavier and slower to start than Nix.
- *Default Image*: The default "Node.js" image doesn't have Python 3.11 pre-installed or manageable via `replit.nix` as cleanly as a Blank Repl with a custom Nix file.

## 2. Replit Run Command

**Decision**: Set `run = "pnpm dev"` in `.replit`.

**Rationale**:
- `pnpm dev` is the existing root script that runs `turbo run dev`.
- It starts both frontend (Vite) and backend (FastAPI).
- This provides the "Full Stack" experience requested in Clarification Q1.

**Risk**: If backend fails due to missing DB/Env, frontend might still run if `turbo` is configured to continue on error, or it might block.
**Mitigation**: We accept this risk for "Full Stack" default. Users can manually run `pnpm dev:frontend` if they only want UI vibe coding.

## 3. AI Guide Structure

**Decision**: Structured Markdown with "Do's" and "Don'ts".

**Rationale**:
- "Negative Constraints" (Don'ts) are proven to reduce hallucinations in LLMs (e.g., "Do not use CSS modules").
- "Stack Preferred" list aligns the Agent with our tech choices.
- "Directory Map" helps the Agent navigate the monorepo structure.

**Location**: `docs/AI_GUIDE.md` (from Clarification Q3).

