# Changelog

This file documents user-facing changes. Format loosely follows [Keep a Changelog]; versions follow [SemVer].

## [0.3.5] — 2026-10-15

### Fixed

- **Adapts delegation to the DSH 0.2.1-alpha.2 subagent seam**: the new host removed `ctx.subagents.start` / `startContinuable` in favor of one `startActivation` call (the provider picks the backend; `delivery` only decides whether the parent is also notified). The plugin now detects the host generation structurally at runtime: ≥0.2.1 uses the activation seam (a continuable entry with `delivery: 'parent'`; foreground and background entries with `delivery: 'caller'`, the plugin settling the result itself and disposing the activation on cancellation), while ≤0.2.0 keeps the original `start`/`startContinuable` channel. Roster, both tools and Settings behave identically on either generation. Before 0.3.5, delegation on these hosts failed with `ctx.subagents.startContinuable is not a function`.
- A background one-shot delegation now registers its job owner as the SESSION ID (`exec.agent.id`, matching dsh-tool-bash / dsh-tool-terminal) on the activation seam; the legacy host keeps receiving the Agent object.

### Docs

- **The project is English-only now.** `README.md`, `CHANGELOG.md`, `MIGRATION.md` and `THIRD_PARTY_NOTICES.md` lost their Chinese halves, and the `README.en.md` mirror is gone — `README.md` is the English document (the shipped Chinese *UI* locale is unaffected). `AGENTS.md` §4 records the rule for future changes.

## [0.3.4] — 2026-10-14

### Fixed

- A failed roster read (unreadable directory, unreadable file, or broken YAML) does not delete any profile's route overlay. Overlays are removed on read only after a successful listing and a confirmed ENOENT re-check; an explicit settings delete still cleans them.
- Desktop and web no longer call each other's model routes. Roster files stay in `~/.dsh/subagents/` (role, persona, and tool scope remain shared), but `provider` / `model` resolve against the current profile. A provider that is not registered here is not sent; the child inherits this session's model. Only a route the user changed relative to what this profile displayed is stored in `_profiles/<profile>/<id>.yaml`. Saving a description, or echoing a hidden foreign route, does not pin `inherit`, so a later registration of that provider still uses the shared route. It does not overwrite the other profile's route.

## [0.3.3] — 2026-10-09

### Changed

- **Reworked Settings as layered, collapsible cards**: identity and enable state, description, model/provider, and execution tags each have their own space. Long names and routes wrap; descriptions show up to two lines without competing with tags. The grouped editor uses two columns in wide panels and one in narrow panels.
- Added a summary band (entry / enabled / disabled / unsaved counts + roster directory), a filter box (matches id, description, model…), expand/collapse all, and a collapsed add-entry card.
- Toggling enable state exposes an unsaved badge and Revert / Save changes directly on the collapsed card. Changes take effect on save and other drafts are preserved; disabled entries appear last.
- Host theme tokens with fallbacks support light/dark modes; spacing, typography and tags are consistent, with storage and backup details in a footer disclosure.
- A failed field validation now opens the offending row so the problem is visible.
- Separate native disclosure and switch controls improve keyboard operation and field labeling. Revert now removes newly added optional fields.
- Changes are confined to Settings presentation and interaction: roster YAML, delegation, migration, storage location, and the API are unchanged.

## [0.3.2] — 2026-10-04

### Changed

- Added localized English and Chinese names and descriptions for the plugin list and detail page.
- Display metadata only; YAML roster, delegation, migration, and Settings behavior are unchanged.

## [0.3.1] — 2026-09-29 (DSH 0.1.7-rc.2 adaptation)

### Fixed

- Adapts to DSH 0.1.7-rc.2: 0.3.0's legacy settings seam called `register()`, which the new host does not provide, so startup failed with an overall 503; the direct cause was not a named `settingsNamespace` import from the bundle. The plugin now detects the host generation at runtime: ≤0.1.6 keeps the `register()` channel; ≥0.1.7 uses the Loader live config plus the official `ctx.configEditor` for legacy cleanup. Roster files behave identically on both.
- Fixed a convergence deadlock for unchanged `.yml` rows: they now converge to generated `.yaml` even when their content is unchanged, losing hand-written comments from the `.yml` file.
- Convergence failures now return HTTP 500 and may be partial; a failed `.yml` sweep on the canonical `.yaml` skip path returns 200 with a warning and can be retried after the fault clears.
- Fixed a legacy-host regression introduced in this unreleased compatibility candidate: `describe()` retains its receiver, preventing swallowed errors, a false zero legacy count, and cleanup that reports success without removing legacy copies.
- Fixed SUB-COMPAT-017-004 exposed by this unreleased compatibility candidate: the raw ConfigEditor layer carries no schema defaults, so a wholesale reconcile dropped the default provider (delegation then failed with "provider not registered"); reconcile now restores defaults for the fields defined by the configuration into the live instance only (never the raw patch) and reflects the result immediately after the edit.

### Docs

- Config-location and rollback docs now distinguish host versions: 0.2.8 requires an older host; host downgrade and `settings.yaml.imported` restoration are unverified, so no downgrade sequence is prescribed.

## [0.3.0] — 2026-09-24

### Changed (important: storage location changed)

- **The roster now lives as one YAML file per named subagent** (default `~/.dsh/subagents/`), replacing the inline `entries` map in settings.yaml.
- On first use the legacy `entries` are exported entry-by-entry (never overwriting hand-written files); the legacy copies are kept as a rollback fallback and win nothing — files take precedence. Legacy reading is removed in 0.4.
- The settings page gains a migration banner with a one-click "clear legacy copies" action. See [MIGRATION.md](./MIGRATION.md).
- Settings-page restyle: aligned with the personal-instruction editor (theme-neutral rgba palette, 8px rounded cards, blue primary / red danger buttons, tinted banners, chip badges), card widened to 860px; the persona textarea auto-sizes to its content (clamped 110-440px); description/persona body text is back to the UI face at a larger size; the description field is a one-line textarea you can drag taller; background mode moved next to reasoning effort so fixed-width controls stop getting squeezed.

### Added

- New per-entry `reasoningEffort` field (adapter-owned id, e.g. `max`), passed through the official `agentOptions.reasoningEffort` override; inherited efforts are auto-dropped by the harness when the child's route differs.
- New `enabled` flag to disable an entry without deleting its file.
- Broken roster files are skipped and surfaced as diagnostics instead of breaking the roster.
- Settings page: migration banner, legacy badge, diagnostics panel; a 409 conflict keeps your unsaved draft and only switches to the latest baseline (the response carries the fresh view) — saving again overwrites.
- Roster-directory `_backups/` convention: the plugin never auto-backs up — by convention, agents (or humans) copy the original file into `_backups/` before editing; anything `_`-prefixed (files or directories) is treated as non-roster content and silently ignored (no more diagnostic noise).

### Fixed

- **`.yml` roster lifecycle fixed**: the roster reads both `.yaml` and `.yml`; saving changed content through the settings page converges to `<id>.yaml` and removes the same-id `.yml`; deleting an entry removes both suffixes, preventing an old `.yml` from resurrecting after `.yaml` is deleted.
- **Duplicate HTTP responses fixed**: delete/save handlers now return after sending their response, so each request is answered exactly once and the real server avoids `ERR_HTTP_HEADERS_SENT`.
- Dual-review hardening (K3 implementation review + GLM red team): settings-page saves **skip unchanged entries** (untouched hand-written YAML files are no longer rewritten into generated format, preserving comments); a broken roster file with a same-id legacy copy now surfaces an **error-level** diagnostic saying delegation is using the old config (no more silent fallback); a 409 conflict **keeps the unsaved draft** (only the baseline switches — saving again overwrites); failed migration (whole-batch or per-entry) **retries automatically** instead of latching for the process lifetime; `reasoningEffort` is validated as an effort id on save (alphanumerics and `._-`); the read-only settings page refuses "clear legacy" loudly with 403 instead of faking success; client wire-contract tests added (parseView previously dropped legacyCount, which was exactly where the migration banner failed to render).

### Internal

- Fresh directory reads per operation; atomic per-file writes with rename retries; id length cap + Windows reserved-name blacklist; BOM tolerance; loud unknown-field rejection.

## [0.2.8] — 2026-09-09

- Settings-page navigation icon decoration (decorateSettingsNavIcon).

## [0.2.7] — 2026-09-09

- Fixed: `toolFilter` now resolves against the **calling session's restrictable set** (previously visibility — scope-local tools such as `subagent` made a whole delegation fail); ignored names are annotated with a reason; a delegation is refused when no `allow` name applies; the `list_subagents` catalog shows the effective filter summary.

## [0.2.6] — 2026-09-06

- DSH 0.1.2-rc.1 compatibility verified and documented (devDependencies still pinned to rc.6).

## [0.2.5] — 2026-09-05

- Fixed the settings-page save 400 (removed save-time tool-name prevalidation; `tools.restrict` at delegation time is authoritative); the new-entry card now carries the missing fields.

[Unreleased]: https://github.com/MaRi23333/dsh-subagent-library/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/MaRi23333/dsh-subagent-library/compare/v0.2.8...v0.3.0
[0.2.8]: https://github.com/MaRi23333/dsh-subagent-library/compare/v0.2.7...v0.2.8
[0.2.7]: https://github.com/MaRi23333/dsh-subagent-library/compare/v0.2.6...v0.2.7
[0.2.6]: https://github.com/MaRi23333/dsh-subagent-library/compare/v0.2.5...v0.2.6
[0.2.5]: https://github.com/MaRi23333/dsh-subagent-library/compare/v0.2.4...v0.2.5
