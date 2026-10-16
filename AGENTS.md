# AGENTS.md — dsh-subagent-library

Project-scoped rules. Global `~/.dsh/AGENTS.md` applies; `§N` = its sections. Numbering below is canonical.

## 1. Overview

DSH Web GUI plugin that makes subagent roles a persistent named roster: one YAML per entry (`<id>.yaml`, id = file name) in `~/.dsh/subagents` (override `subagent-library.entriesDir`), hot-effective — no restart, no cache. Host plane: tools `list_subagents` (id + description + model) and `delegate` (start an entry by `library_id`), the `/subagent` command, a Settings page. Delegation goes via `ctx.subagents`, so children keep normal harness semantics (approval `never`, inherited sandbox, depth cap, continuable). The 0.2.x inline `subagent-library.entries` doc is a READ-ONLY legacy fallback (files win, one idempotent seeding migration); removed in 0.4.0.

## 2. Stack & toolchain

- Node ≥ 22 (CI 22/24); TypeScript ESM, strict `tsc --noEmit`, explicit `.ts`/`.tsx` import extensions.
- pnpm only, `packageManager: pnpm@11.21.0`, `--frozen-lockfile`; deps `yaml` + `@deepseek-ai/schemastery`, peer `@deepseek-ai/cordis@^4.0.1`, dev DSH `0.1.0-rc.6`.
- `tsdown` ([tsdown.config.ts](tsdown.config.ts)) → `lib/index.js`, `lib/client.js`, `.map`; **`lib/` is committed** — rebuild in every commit. Planes: host = [src/index.ts](src/index.ts), [src/roster.ts](src/roster.ts), [src/profile-route.ts](src/profile-route.ts); client = [src/client/](src/client) (React 18, `platform: web`).

## 3. Verification

Order before handoff: `pnpm install --frozen-lockfile` (once) → `typecheck` → `test` → `build` → `smoke` → `check:pack`.

- `build` must leave `lib/` non-stale: CI diffs rebuilt artifacts vs `HEAD:lib/...` with pnpm virtual-store paths masked; divergence fails.
- `check:pack` = npm whitelist: no sources, no `.map`, no `HANDOFF.md`. Never commit red typecheck/test/build or `lib/` out of sync with `src/`.

## 4. Code conventions

- **English only, project-wide**: code, comments, commits, roster YAML, UI copy and every doc ([README.md](README.md), [CHANGELOG.md](CHANGELOG.md), [MIGRATION.md](MIGRATION.md), [RELEASING.md](RELEASING.md), [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)) — no bilingual mirrors, no Chinese sections. The one exception is shipped product localization: [locale/zh.json](locale/zh.json) plus the `zh` dictionary in [src/client/locales.ts](src/client/locales.ts); English UI copy lives in [locale/en.json](locale/en.json).
- Style: no semicolons, single quotes, 2-space indent, named exports, small single-purpose modules. No linter/formatter — keep diffs consistent by hand.
- Roster shape is a contract: additive changes only, 0.2.x/0.3.x docs keep loading, inline fallback stays read-only. Comment the *why* (invariants, fixes), not the *what*.

## 5. Testing setup

- [tests/](tests) via `tsx --test` (`pnpm run test`: roster, api, tools, client, profile-route); fixtures in [tests/helpers.ts](tests/helpers.ts).
- Bugfix ⇒ regression test failing before the fix; roster parsing/normalization and route changes ⇒ coverage on that plane; wiring or client-bundle changes ⇒ rerun `smoke`.

## 6. Branching & hosting

- **Always work on `main`** — no feature branches, worktrees, or PR-only flow.
- `origin` = `github.com/zumik3-del/dsh-subagent-library` (this fork); upstream `MaRi23333/dsh-subagent-library`. No fetch/rebase/force-push without an explicit request.
- Never `git commit`/`push`/`tag` yourself — the `git` subagent's job (global §Git operations). Releases publish to npm via [.github/workflows/publish.yml](.github/workflows/publish.yml) on a published release.

**Plugin lifecycle (source → installed plugin).** dsh runs this plugin from the git spec, so a source change does nothing until the profile copy is re-resolved:

1. Edit `src/`, rebuild `lib/`, verify (§3) — `src`-only or `lib`-only is not done.
2. Push to `origin/main` (git role).
3. **Ask the user whether to update the plugin in dsh**; wait for an explicit yes. Never update the installed copy unprompted.
4. On yes: `dsh plugin --profile web update dsh-subagent-library` (a plain `pnpm install` reuses the pinned commit and pulls nothing).
5. Check `sha256sum lib/index.js lib/client.js` against the installed `node_modules/dsh-subagent-library/lib/`; remind the user to hard-refresh the GUI (cached client bundle).
6. Print `sudo systemctl restart dsh.service` and stop — **never restart dsh yourself**, it kills this session.

## 7. Memory conventions

- SynaptoMind is cwd-scoped: pass `cwd` for this repo, search before creating.
- Durable decisions only (no diffs/logs/reports): one atomic unit, ≤600 chars, English, identifiers verbatim; `memory_reflect` at breakpoints with task id + final status.

## 8. Known pitfalls

- Local pnpm may be newer than pinned `pnpm@11.21.0` (12.x here): install `--frozen-lockfile`, never regenerate the lockfile to "fix" the drift.
- `lib/` is tracked build output — editing only `src/` silently ships old code (CI catches it); `lib/*.map` stays in git but out of the package (`check:pack` fails either way).
- [.gitignore](.gitignore) drops `HANDOFF.md` and `settings.json` but explicitly keeps `lib/`; Windows vs Linux diffs differ only in pnpm virtual-store paths — never hand-edit generated paths.
- **`ctx.subagents` has two host generations**: DSH ≤0.2.0 exposes `start`/`startContinuable`, DSH ≥0.2.1 replaces both with one `startActivation` (the provider picks the backend; `delivery` decides whether the parent is also notified). [src/index.ts](src/index.ts) probes structurally at runtime and must keep typechecking against the pinned `0.1.0-rc.6` dev types.

## 9. Delegation map

Roles come from the named subagent library (`~/.dsh/subagents/*.yaml`), one row per role.

| Role | When | Notes |
| --- | --- | --- |
| developer | implementation, refactor, bugfix | this repo *is* the roster plugin; its entries live in `~/.dsh/subagents`, not here |
| tester | tests, runs, coverage | batch suite at the batch boundary |
| reviewer | non-trivial diffs | read-only; findings as severity + `path:line` |
| git | commits, pushes, tags, releases | strictly sequential, never a tracker client |

Orchestrator-owned: subagents propose edits via a tracker comment, never by editing it.

## 10. Workspace & communication

- Channel = the ziptask tracker: full English contract in the task description (`get_template("task")` / `("epic")`), outcome in a completion comment; evidence in comments, not files.
- Non-code documents (plans, ADRs, drafts, docs) → the Forgejo artifacts repository `authelia/artifacts` under `dsh-subagent-library/`, through the `forgejo_artifacts` MCP tools (`project: dsh-subagent-library`); handoff → `memory_reflect` with the artifact permalink. Up to 4 subagents concurrently, `git` sequential at the batch end; mutators share the `main` checkout (§6) — keep concurrent tasks on disjoint files.
