# Quickstart: Replit & Agent Integration

This guide explains how to use the Replit and Agent support features.

## For Humans: Starting on Replit

1.  **Open Replit**: Go to [replit.com/new](https://replit.com/new).
2.  **Import Repo**: Select "Import from GitHub" and paste this repository URL.
3.  **Wait for Nix**: Watch the console. You will see "Updating Nix environment...".
4.  **Click Run**: Once the "Run" button turns green, click it.
    -   This executes `pnpm dev`.
    -   The Webview should open showing the frontend.

## For Agents: Using the Context

When using an AI Agent (Replit Agent, Cursor, etc.), explicitly point it to the guide:

**Prompt Example**:
> "I want to create a new login form. Please read `docs/AI_GUIDE.md` first to understand the project architecture and component usage constraints."

## Verification

To verify the integration works locally (simulated):

1.  Check that `replit.nix` exists in root.
2.  Check that `.replit` exists in root.
3.  Read `docs/AI_GUIDE.md` and confirm it lists `@secondgen/ui` as the primary component source.

