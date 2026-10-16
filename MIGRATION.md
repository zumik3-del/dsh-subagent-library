# Migration Guide: 0.2.x → 0.3.x (directory-backed roster)

**TL;DR (3 steps)**

1. **Upgrade and restart dsh web** — nothing to change by hand; your legacy config migrates automatically.
2. **Verify**: run `/subagent` or open the settings page — all old entries are listed, and the roster directory now holds one `<id>.yaml` per entry.
3. **Clean up (optional but recommended)**: click “Clear legacy entries” on the settings card, or delete only the legacy `entries` key from the host-specific config shape, keeping the other keys on the same config row.

**Config location depends on the host version.** Use the matching shape:

**DSH ≤0.1.6:** `~/.dsh/settings.yaml`

```yaml
subagent-library:
  entriesDir: ~/.dsh/subagents
  subagentProvider: spawn
  # entries: optional legacy 0.2.x map; remove only this key after verification
```

**DSH ≥0.1.7:** the current profile's (`web` or `desktop`) `cordis.patch.yml`, under `config` on `- id: subagent-library`. Model routes are per profile: a shared-roster provider that is not registered here is not called, and a route saved on the settings page is stored only for this profile.

```yaml
- id: subagent-library
  config:
    entriesDir: ~/.dsh/subagents
    subagentProvider: spawn
    # entries: optional legacy 0.2.x map; remove only this key after verification
```

On the newer host, `settings.yaml.imported` is a migration backup, not a verified active configuration or rollback procedure.

**What changed** — on the old host the roster was the inline `subagent-library.entries` map in `~/.dsh/settings.yaml`; on the newer host that legacy map is under the profile patch row shown above. It now lives as **one YAML file per named subagent** under `~/.dsh/subagents/` (configurable via `subagent-library.entriesDir`). Files are hot-reloaded. Entry DATA is equivalent between the settings page and hand-edited files, but saving an entry from the settings page **when its content has changed** writes that entry as canonical `<id>.yaml` and removes the same-id `<id>.yml` (hand-written comments in that file are lost); an unchanged canonical `.yaml` row is skipped, so its original file and comments stay intact, while an unchanged `.yml` row is still rewritten as generated `.yaml` and loses its comments.

**File-name lifecycle** — A roster id is the file name: lowercase, matching `[a-z0-9][a-z0-9-]*`, at most 64 characters, and never a Windows reserved device name (invalid ids are skipped with a diagnostic). Both `<id>.yaml` and `<id>.yml` are read. If both spellings already exist for one id, fix that conflict (keep one) before using the settings page. Deleting an entry removes both suffixes. Writes and deletes run per file, not as a directory-wide multi-file transaction: a write or convergence failure returns HTTP 500 and may leave a partial result. If the unchanged canonical `.yaml` skip path cannot sweep a same-id `.yml`, the save returns 200 with a warning and the duplicate diagnostic remains until a retry succeeds; inspect the roster before retrying.

**Automatic migration** — on the first roster use after upgrading, each legacy entry is exported to `<id>.yaml` **only when neither `<id>.yaml` nor `<id>.yml` exists** (if either spelling exists, hand-written files are never overwritten; re-runs are idempotent). The legacy settings copies are **kept** as a rollback fallback; files take precedence. Migration is idempotent and per entry: a failed export affects only that entry (it keeps using the legacy fallback, with a diagnostic) and is retried on the next roster read instead of latching for the process lifetime. Legacy reading stays working throughout 0.3.x and is **removed in 0.4**. Deleting an entry from the settings page removes both its `<id>.yaml` and `<id>.yml` roster files **and** its legacy copy; the one-click cleanup only removes legacy copies that files already shadow and never touches roster files. Legacy copies persist after automatic migration until you clear them.

**Rollback** — the 0.2.8 legacy `entries` fallback is for DSH ≤0.1.6 only; on DSH ≥0.1.7 the plugin cannot be downgraded by itself, and the old settings seam may return 503. Host downgrade and restoration of `settings.yaml.imported` data are unverified, so no downgrade sequence is prescribed. Legacy copies are the rollback data source: editing or deleting them (including deleting entries or one-click cleanup) makes rollback return to the snapshot as of that moment. To restore roster content, use your own `_backups/` copies and verify them manually.

**Syncing across machines** — put the roster directory into your dotfiles or a git repository: one file per role makes diffs readable. Do not sync the legacy `entries` map.

**New in 0.3** — per-entry `enabled` (disable without deleting) and `reasoningEffort` (adapter-owned thinking-effort id such as `max`, passed through the official `agentOptions` override); broken roster files are skipped with visible diagnostics instead of breaking the roster.

## On DSH ≥0.2.1: persona / toolFilter → agentPreset

DSH 0.2.1-alpha.3 introduced preset-owned subagent composition (upstream notes `.agents/notes/implemented/simplification/2026-10-09-preset-owned-subagent-composition.md` and the guide `docs/upgrade-guide/v0.2.1-alpha.1/subagent-preset-composition/guide.md` in the deepseek-harness repo): new `SubagentStartRequest` values no longer expose `persona`/`toolFilter`, and a child's persona and tools come from the Agent Preset selected through the entry's new `agentPreset` field. Historical child descriptors keep restoring both fields on cold resume, which is why the loss on the new-child path is invisible. No automatic migration is performed, and the legacy fields stay accepted:

- **DSH ≤0.2.0 hosts** — nothing to change: `persona`/`toolFilter` are honored as before, and an entry that sets `agentPreset` is refused there (these hosts have no presets).
- **DSH ≥0.2.1 hosts** — create an Agent Preset carrying the role's persona and tool scope (see the upstream guide named above), then set `agentPreset: <preset-id>` on the entry. The legacy fields may stay on the entry (they are simply ignored on this generation) or be removed; when `persona`/`toolFilter` are declared without `agentPreset`, `delegate` names the ignored fields in its result note and logs a warning, so the loss is never silent.

See [CHANGELOG.md](./CHANGELOG.md) for the full list of changes.
