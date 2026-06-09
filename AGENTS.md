# AGENTS.md

## 语言

使用简体中文交流、书写文档和注释，除非明确要求其他语言。代码本身保持原始语言。

## Runtime

- **Bun** only — `bun run <script>`, `bun <file.ts>`, `bun install`
- `bun.lock` is the lockfile; no `pnpm-lock.yaml` / `package-lock.json`
- TypeScript is a **peerDependency**, not bundled

## Project structure

- `index.ts` — OpenCode plugin entrypoint (also the `module` in package.json)
- `action.yaml` — GitHub composite action for CI/CD model resolution
- `docs/` — plugin & action documentation

## Build & verify

- No build step (`noEmit: true`)
- No tests, no linter, no formatter config
- To typecheck: `bun run tsc --noEmit` (or just `tsc --noEmit`)

## How the plugin works

- Entrypoint: `index.ts` exports `OpenCodeFreeModelsPlugin` as a `Plugin`
- Resolves the `"free-models"` alias (or custom `alias`) to a real model ID from `models.dev/api.json`
- Falls back to `fallbackModel` if no free model is found or the API call fails
- Also resolves aliases in `config.small_model`, `config.agent.*.model`, `config.command.*.model`

## GitHub Action

- Composite action; runs `bash` + `jq` to query `models.dev/api.json`
- Output: `model_id`
