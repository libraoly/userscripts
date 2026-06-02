# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a userscript collection for Tampermonkey/Greasemonkey. Each script is authored in TypeScript, bundled with `tsdown`, and distributed as `dist/*.user.js` files hosted on the `release` branch.

## Package Manager

Use `pnpm`. The lockfile is `pnpm-lock.yaml` and Node >=20.19.0 is required.

## Common Commands

- `pnpm run build` — Bundle all scripts to `dist/*.user.js`.
- `pnpm run dev` — Build in watch mode.
- `pnpm run lint` — Run ESLint with caching.
- `pnpm run lint:fix` — Run ESLint with auto-fix.
- `pnpm run typecheck` — Run `tsgo --noEmit` for fast type checking.
- `pnpm run format` — Format all files with `oxfmt` (not Prettier).

## Adding a Userscript

1. Create a new TypeScript file at `src/<id>.ts`.
2. Register the script in `tsdown.config.ts` by adding a new entry to the `scripts` array with the `id` and Tampermonkey metadata (banner fields such as `name`, `description`, `match`, `grant`, `run-at`).
3. Run `pnpm run build` to generate `dist/<id>.user.js`.
4. Commit and push to `main`. The GitHub Actions release workflow deploys `dist/` to the `release` branch automatically.

## Build Architecture

- **Entry**: `tsdown.config.ts` exports an array of `UserConfig` objects, one per script.
- **Source**: `src/<id>.ts` — each file is a standalone script.
- **Output**: `dist/<id>.user.js` — IIFE format with a `// ==UserScript==` banner injected by `tsdown`.
- **Config conventions**: `platform: 'browser'`, `format: 'iife'`, `minify: 'dce-only'`. Use `bundled` in the `ScriptConfig` to inline specific dependencies.
- **Shared metadata**: `sharedBanner` in `tsdown.config.ts` contains common fields like `author`, `license`, and `homepage`. Each script's `banner` is merged with it.

## Tooling Notes

- **Formatter**: `oxfmt` is used instead of Prettier. Configuration is in `.oxfmtrc.json`.
- **Linter**: `@antfu/eslint-config` via `eslint.config.js`. The VS Code settings auto-fix ESLint rules on save.
- **TypeScript**: Strict mode, targets `esnext`, includes `DOM` and `tampermonkey` types. `verbatimModuleSyntax` and `isolatedDeclarations` are enabled.
- **Type checker**: `tsgo` is used for fast type checking instead of `tsc`.
