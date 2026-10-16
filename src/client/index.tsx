/**
 * dsh-subagent-library — browser half.
 *
 * A Settings section card ("Subagent Library") that reads and edits the
 * `subagent-library` settings namespace through the plugin's own host routes
 * (`/subagent-library/api`). The standard `api.settings.*` wire face cannot
 * serve a third-party namespace in this harness build (the gateway only
 * exposes its own allowlist), so the editor talks to the host directly,
 * exactly like dsh-plugin-fish-tts does.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-api-remotes/client'
import { LibrarySettings, type LibrarySettingsInjected } from './LibrarySettings.tsx'
import { decorateSettingsNavIcon } from './nav-icon.ts'
import { en, zh } from './locales.ts'

const NS = 'subagent-library'
const API_PATH = '/subagent-library/api'

/** Wire view of one library entry as stored in a roster file (or legacy). */
export interface StoredEntry {
  description?: string
  provider?: string
  model?: string
  subagentProvider?: string
  reasoningEffort?: string
  maxTokens?: number
  persona?: string
  toolFilter?: { allow?: string[]; deny?: string[] }
  /** DSH ≥0.2.1: the child composes from this Agent Preset (persona/toolFilter
   *  are ignored there without it). Wire-only like the rest of the entry. */
  agentPreset?: string
  maxDepth?: number
  backgroundMode?: 'one-shot' | 'continuable'
  /** Present only when the entry is disabled (`enabled: false`). */
  enabled?: boolean
  /** Present only for rows still served from the legacy settings document. */
  source?: 'legacy'
  /** How this profile resolved the model route. Wire-only; never stored. */
  routeNote?: 'profile' | 'inherit' | 'foreign-ignored' | 'profile-missing' | 'overlay-broken'
}

export interface LibraryDiagnostic {
  severity: 'error' | 'warning' | 'info'
  id?: string
  file?: string
  message: string
}

export interface LibraryView {
  writable: boolean
  /** Roster directory the files live in (informational, shown in the UI). */
  dir: string
  /** Stable content hash of the roster rows — the write guard. */
  hash: string
  entries: Record<string, StoredEntry>
  diagnostics?: LibraryDiagnostic[]
  /** Legacy settings copies currently shadowed by a roster file — the safe
   *  one-click cleanup set for the 0.2→0.3 transition. */
  legacyCount?: number
  /** Profile this view was resolved for (`desktop`, `web`, …). */
  profile?: string
}

export type LibraryWrite =
  | { op: 'save'; entries: Record<string, StoredEntry>; expectedHash?: string }
  | { op: 'delete'; id: string; expectedHash?: string }
  | { op: 'clear-legacy'; expectedHash?: string }

export type LibraryWriteResult =
  | { ok: true; view: LibraryView }
  // A conflict carries the fresh view so the editor can merge and let the
  // user retry instead of staring at a bare error (v0.3.0 design review).
  | { ok: false; conflict?: boolean; message?: string; view?: LibraryView }

/** Host error codes that carry no `message`; map them to user-facing text. */
const ERROR_TEXT: Record<string, string> = {
  'not-ready': 'Settings service not ready yet; try again shortly.',
  'readonly': 'Settings service is read-only; cannot complete the operation.',
  'content-type-json-required': 'Request rejected: writes accept JSON only.',
  'cross-origin-forbidden': 'Request rejected: cross-origin write.',
  'body-too-large': 'Request body exceeds the 1 MiB limit.',
  'bad-json': 'Request body is not valid JSON.',
  'entries-object-required': 'Missing the entries object.',
  'invalid-id': 'Invalid entry ID.',
  'unknown-op': 'Unknown operation.',
  'roster-unreadable': 'Failed to read the roster directory.',
  'write-failed': 'Failed to write the roster file.',
  'profile-path': 'The current profile name cannot store an independent model route.',
}

interface WireView {
  ok?: boolean
  writable?: boolean
  dir?: string
  hash?: string
  entries?: Record<string, StoredEntry>
  diagnostics?: LibraryDiagnostic[]
  legacyCount?: number
  profile?: string
  error?: string
  message?: string
  view?: WireView
}

/** Map a wire view onto the UI model. Exported for the wire-contract tests —
 *  a dropped field here silently kills UI features (k3 review: legacyCount). */
export const parseView = (value: WireView): LibraryView => ({
  writable: value.writable ?? true,
  dir: value.dir ?? '',
  hash: value.hash ?? '',
  entries: value.entries ?? {},
  diagnostics: value.diagnostics ?? [],
  // MUST be mapped explicitly: this drives the migration banner + clear button
  // (k3 review round 2 finding #1 — a dropped field here killed the feature).
  legacyCount: value.legacyCount ?? 0,
  ...(typeof value.profile === 'string' && value.profile !== '' ? { profile: value.profile } : {}),
})

async function readView(): Promise<LibraryView> {
  const response = await fetch(API_PATH, { cache: 'no-store' })
  const body: unknown = await response.json()
  if (!response.ok || typeof body !== 'object' || body === null || (body as WireView).ok !== true) {
    const error = (body as WireView | null)?.error
    // A diagnostic `message` (e.g. settings-seam registration failure) wins
    // over the generic per-code text.
    const message = (body as WireView | null)?.message
    throw new Error(message ?? (error !== undefined ? ERROR_TEXT[error] : undefined) ?? 'Subagent library API unavailable (plugin not loaded?)')
  }
  return parseView(body as WireView)
}

async function writeView(write: LibraryWrite): Promise<LibraryWriteResult> {
  try {
    const response = await fetch(API_PATH, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(write),
      cache: 'no-store',
    })
    const body: unknown = await response.json()
    const wire = (typeof body === 'object' && body !== null ? body : {}) as WireView
    if (response.status === 409) {
      // The fresh view rides along: the editor merges it so the user sees the
      // concurrent change and can re-apply theirs instead of blind-retrying.
      return { ok: false, conflict: true, view: wire.view !== undefined ? parseView(wire.view) : undefined }
    }
    if (!response.ok || wire.ok !== true) {
      return { ok: false, message: wire.message ?? (wire.error !== undefined ? ERROR_TEXT[wire.error] : undefined) ?? 'Save failed' }
    }
    return { ok: true, view: parseView(wire) }
  } catch (error) {
    return { ok: false, message: String(error) }
  }
}

export const inject = ['slots', 'locale', 'remote']

export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'subagent-library: dictionaries')

  // Pushed invalidation: any committed change to the subagent-library
  // namespace re-reads the document. The push carries the new revision so a
  // subscriber can tell its own write's echo (≤ last committed) from an
  // external change without racing the write response.
  const listeners = new Set<(revision?: number) => void>()
  const subscribeRefresh = (fn: (revision?: number) => void): (() => void) => {
    listeners.add(fn)
    return () => { listeners.delete(fn) }
  }
  const refresh = (revision?: number): void => {
    for (const fn of listeners) {
      try {
        fn(revision)
      } catch {
        // one stale subscriber must not break the others
      }
    }
  }
  ctx.effect(() => ctx.remote.$on('settings/document-updated', (ns: string, revision?: number) => {
    if (ns === NS) refresh(revision)
  }), 'subagent-library: settings invalidation')

  // ── settings section card ──────────────────────────────────────────────────
  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section',
    id: NS,
    order: 40,
    label: () => 'Subagent Library',
    inject: (): LibrarySettingsInjected => ({ readView, writeView, subscribeRefresh }),
  }, LibrarySettings))

  decorateSettingsNavIcon(ctx)
}
