# AGENTS.md — dsh-subagent-library

Project-scoped rules. The global `~/.dsh/AGENTS.md` still applies; where it uses `§N`, `§N` means the section of that file. Sections below follow the canonical numbering.

## 1. Overview

DeepSeek Harness Web GUI plugin that turns subagent roles into a persistent named roster: one YAML file per entry (`<id>.yaml`, id = file name) under a roster directory (default `~/.dsh/subagents`, override `subagent-library.entriesDir`), hot-effective with no restart and no cache. The host plane registers two model-facing tools — `list_subagents` (catalog: id + description + model) and `delegate` (start one entry by `library_id`) — plus the `/subagent` slash command and a Settings page. Delegation goes through `ctx.subagents`, so children keep ordinary harness semantics (approval pinned to `never`, inherited sandbox, depth cap, continuable). The 0.2.x inline `subagent-library.entries` settings document stays a READ-ONLY legacy fallback (files win, one idempotent seeding migration) and is scheduled for removal in 0.4.0.

## 2. Stack & toolchain

- Node ≥ 22 (CI matrix 22/24); TypeScript ESM, strict `tsc --noEmit`; imports keep explicit `.ts`/`.tsx` extensions (`allowImportingTsExtensions`).
- pnpm only; `package.json` pins `packageManager: pnpm@11.21.0` and CI installs with `--frozen-lockfile`. Runtime deps: `yaml`, `@deepseek-ai/schemastery`; peer: `@deepseek-ai/cordis@^4.0.1`; dev DSH packages pinned to `0.1.0-rc.6`.
- Build: `tsdown` ([tsdown.config.ts](tsdown.config.ts)) → `lib/index.js` + `lib/client.js` (and `.map`). **`lib/` is committed**: always rebuild before committing and include the artifacts.
- Planes: host = [src/index.ts](src/index.ts), [src/roster.ts](src/roster.ts), [src/profile-route.ts](src/profile-route.ts); client = [src/client/](src/client) (React 18, `platform: web`).

## 3. Verification

In this order before handing work off:

1. `pnpm install --frozen-lockfile` (once per checkout)
2. `pnpm run typecheck`
3. `pnpm run test`
4. `pnpm run build` — then confirm `lib/` is not stale. CI diffs rebuilt artifacts against `HEAD:lib/...` with pnpm virtual-store paths masked (`node_modules/.pnpm/<pkg>`); a stale or divergent `lib/` fails the build.
5. `pnpm run smoke` (host + client bundle smoke)
6. `pnpm run check:pack` — npm-tarball whitelist: no sources, no `.map`, no `HANDOFF.md` in the package.

Never commit with a red step 2–4, and never leave `lib/` out of sync with `src/`.

## 4. Code conventions

- English only in code, comments, roster YAML, commit messages, and locale keys; user-facing copy is localized through [locale/en.json](locale/en.json) + [locale/zh.json](locale/zh.json).
- Match the existing style: no semicolons, single quotes, 2-space indent, named exports, small single-purpose modules. No linter/formatter is configured — keep diffs consistent by hand.
- The roster file shape is a contract: changes stay additive so existing 0.2.x/0.3.x documents keep loading; the legacy inline fallback stays read-only.
- Comment the *why*, not the *what* (this codebase documents invariants and fixes inline, e.g. idempotent migration, profile-route preservation on roster read failure).

## 5. Testing setup

- Tests live in [tests/](tests) and run via `tsx --test` (`pnpm run test`: roster, api, tools, client, profile-route); shared fixtures in [tests/helpers.ts](tests/helpers.ts).
- A bugfix needs a regression test that fails before the fix; new roster parsing/normalization and route behaviour need coverage on the affected plane.
- `pnpm run smoke` exercises a real host/client bundle — run it whenever `src/index.ts` wiring or the client bundle changes.

## 6. Branching & hosting

- **Always work on `main`.** It is the only working branch: no feature branches, no per-task worktrees, no PR-only flow.
- `origin` = `github.com/zumik3-del/dsh-subagent-library` (this fork); upstream is `MaRi23333/dsh-subagent-library`. Do not fetch, rebase, or force-push without an explicit request.
- Never run `git commit`/`push`/`tag` yourself — that is the `git` subagent's job (global §Git operations). Releases publish to npm via [.github/workflows/publish.yml](.github/workflows/publish.yml) on a published release.

## 7. Memory conventions

- SynaptoMind is cwd-scoped: always pass `cwd` for this repo and search before creating.
- Store durable decisions only (no diffs, logs, or reports): one atomic unit, ≤600 chars, English, identifiers verbatim; `memory_reflect` at natural breakpoints with task id + final status.

## 8. Known pitfalls

- The local pnpm can be newer than the pinned `pnpm@11.21.0` (12.x on this machine). Install with `--frozen-lockfile`; do not "fix" the drift by regenerating the lockfile.
- `lib/` is git-tracked build output — editing only `src/` silently ships old code; CI catches it via the normalized artifact diff.
- Keep `lib/*.map` in git but out of the published package; `check:pack` fails on either direction.
- [.gitignore](.gitignore) deliberately drops `HANDOFF.md` and `settings.json` (local paths, review records) while explicitly keeping `lib/` — preserve that distinction.
- Windows vs Linux builds differ only in pnpm virtual-store paths; never hand-edit generated bundle paths to make a diff pass.

## 9. Delegation map

Roles come from the named subagent library (`~/.dsh/subagents/*.yaml`); one row per role.

| Role | When | Notes |
| --- | --- | --- |
| developer | implementation, refactor, bugfix | this repo *is* the roster plugin; entries it manages live in `~/.dsh/subagents`, not here |
| tester | tests, runs, coverage | batch suite at the batch boundary |
| reviewer | non-trivial diffs | read-only; findings as severity + `path:line` |
| git | commits, pushes, tags, releases | strictly sequential, never a tracker client |

This `AGENTS.md` is orchestrator-owned: subagents propose changes through a tracker comment, never by editing it.

## 10. Workspace & communication

- Channel = the ziptask tracker: the full English contract goes in the task description (`get_template("task")` / `("epic")`), the outcome in a completion comment; evidence lives in comments, not files.
- Non-code artifacts go to the ai-workdir; handoff is `memory_reflect`. Up to 4 subagents run concurrently with `git` sequential at the end of a batch; mutators work in the shared `main` checkout (§6), so keep concurrent tasks on disjoint files.
