/**
 * Settings section: edit the subagent library document through the plugin's
 * own host routes. A `settings-conflict` (409) reloads instead of clobbering
 * a concurrent change.
 *
 * Each collapsed card separates identity, description, model and execution
 * metadata. Editing stays behind a disclosure so long values never compete
 * with the name or enable switch for the same horizontal space.
 */
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { InjectFace, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type { LibraryView, LibraryWrite, LibraryWriteResult, StoredEntry } from './index.tsx'
import { ACCENT, BANNER, DANGER, MONO, S, SETTINGS_CSS, SUCCESS } from './settings-theme.ts'

export interface LibrarySettingsInjected {
  readView: () => Promise<LibraryView>
  writeView: (write: LibraryWrite) => Promise<LibraryWriteResult>
  /** Re-run the loader on any pushed `settings/document-updated` for this
   *  namespace; the push's revision lets the section skip its own echo. */
  subscribeRefresh: (fn: (revision?: number) => void) => () => void
}

export type LibrarySettingsProps =
  PropsRuntime<'settings.section'>
  & InjectFace<LibrarySettingsInjected>

/** Deep equality for the two entry shapes we compare (server row vs draft).
 *  JSON round-trip is enough: every field is a string, number, boolean, or
 *  array of strings, and key order is stable because both sides are built by
 *  the same spread-from-server path. */
const sameEntry = (a: StoredEntry | undefined, b: StoredEntry | undefined): boolean =>
  JSON.stringify(a) === JSON.stringify(b)

/** Content-adaptive textarea: grows with its text (clamped) so long personas
 *  are readable without dragging while short ones stay compact. Re-measures
 *  after every render (value changes re-render) and on input. */
function AutoTextarea(props: Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> & { style?: React.CSSProperties }): React.ReactElement {
  const { style, ...rest } = props
  const ref = useRef<HTMLTextAreaElement | null>(null)
  const resize = (): void => {
    const el = ref.current
    if (el === null) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(Math.max(el.scrollHeight, 86), 440)}px`
  }
  useEffect(() => { resize() })
  return <textarea {...rest} ref={ref} onInput={resize} style={{ ...style, overflow: 'auto' }} />
}

/** Single-line label + control, so every field in the editor lines up on the
 *  same left edge regardless of how many share a row. */
function Field(props: { label: string; hint?: string; children: React.ReactNode }): React.ReactElement {
  const { label, hint, children } = props
  return (
    <label style={S.field}>
      <span style={S.fieldLabel}>{label}</span>
      {children}
      {hint !== undefined && <span style={{ ...S.hint, marginTop: 3 }}>{hint}</span>}
    </label>
  )
}

/** Chevron that rotates on open — the only motion in the page, and cheap. */
function Chevron(props: { open: boolean }): React.ReactElement {
  return (
    <span style={{ ...S.chevron, transform: props.open ? 'rotate(90deg)' : 'none' }}>
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 2.5L8 6l-3.5 3.5" />
      </svg>
    </span>
  )
}

/** Parse / render the comma-separated deny list without ever dropping a
 *  hand-written allow list the editor does not surface. */
const parseList = (value: string): string[] => value.split(',').map((item) => item.trim()).filter(Boolean)
const listToText = (list: string[] | undefined): string => (list ?? []).join(', ')

/** Draft actions disappear on success. Keep keyboard focus on their card. */
function focusDisclosure(event: React.MouseEvent<HTMLButtonElement>): void {
  if (event.detail === 0) {
    event.currentTarget.closest('[data-entry-id]')?.querySelector<HTMLButtonElement>('[data-row-id]')?.focus()
  }
}

export function LibrarySettings(props: LibrarySettingsProps): React.ReactElement {
  const { readView, writeView, subscribeRefresh } = props
  const sectionId = useId()

  const [view, setView] = useState<LibraryView | null>(null)
  const [entries, setEntries] = useState<Record<string, StoredEntry>>({})
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null)
  const [newId, setNewId] = useState('')
  const [newEntry, setNewEntry] = useState<StoredEntry>({ description: '', provider: '', model: '', agentPreset: '', backgroundMode: 'one-shot' })
  /** Editing is opt-in; newly created entries open to finish configuration. */
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [adding, setAdding] = useState(false)
  const [filter, setFilter] = useState('')

  const alive = useRef(true)
  /** Synchronous busy flag (see applyWrite's re-entry guard). */
  const busyRef = useRef(false)
  useEffect(() => () => { alive.current = false }, [])

  /** True while a write request is in flight: the push and the HTTP response
   *  travel on independent channels, so a push may arrive before the response
   *  commits our state. Pushes in this window are skipped and re-run after. */
  const pendingSelfWrite = useRef(false)
  const skippedWhilePending = useRef(false)

  const load = (): void => {
    void (async () => {
      try {
        const next = await readView()
        if (!alive.current) return
        setView(next)
        setEntries(structuredClone(next.entries))
      } catch (error) {
        if (alive.current) setStatus({ kind: 'error', text: String(error) })
      }
    })()
  }

  useEffect(() => {
    load()
    // File-roster changes carry no push (the roster is read fresh on every
    // load, no watcher by design); this fires only for settings-layer commits
    // such as a legacy-only entry being unset. Reload unless our own write is
    // in flight — a reload here would wipe unsaved drafts in other rows.
    return subscribeRefresh(() => {
      if (pendingSelfWrite.current) {
        skippedWhilePending.current = true
        return
      }
      load()
    })
  }, [subscribeRefresh])

  const applyWrite = async (write: LibraryWrite, touchedId: string): Promise<boolean> => {
    // Synchronous re-entry guard: setBusy is async state, so two clicks in the
    // same frame would both fire applyWrite with one expectedHash and the
    // second would 409 — then reload and wipe drafts in other rows.
    if (busyRef.current) return false
    busyRef.current = true
    setBusy(true)
    setStatus(null)
    pendingSelfWrite.current = true
    try {
      const result = await writeView(write)
      if (!alive.current) return false
      pendingSelfWrite.current = false
      const skipped = skippedWhilePending.current
      skippedWhilePending.current = false
      if (result.ok) {
        setView(result.view)
        // Merge only the row this write touched (fresh server value);
        // unsaved drafts in other rows survive — they are never persisted,
        // because save bases on view.entries.
        setEntries((current) => {
          const next = { ...current }
          const fresh = result.view.entries[touchedId]
          if (fresh !== undefined) next[touchedId] = structuredClone(fresh)
          else delete next[touchedId]
          return next
        })
        setStatus({ kind: 'ok', text: 'Saved' })
        // A push skipped while the write was in flight may have carried an
        // external change; reload to pick it up.
        if (skipped) load()
        return true
      }
      skippedWhilePending.current = false
      if (result.conflict) {
        // The 409 carries the fresh server view: adopt ONLY the view (fresh
        // hash/diagnostics/legacyCount) and KEEP local drafts. Save is a full
        // snapshot anyway, so an informed retry overwrites the concurrent
        // change — silently wiping the user's drafts here would compound the
        // loss instead (red team A3).
        if (result.view !== undefined) {
          setView(result.view)
        } else {
          load()
        }
        setStatus({ kind: 'error', text: 'The roster was changed by another window or externally (switched to the latest baseline). Your unsaved changes are kept; saving again overwrites with your version.' })
      } else {
        if (skipped) load()
        setStatus({ kind: 'error', text: result.message ?? 'Save failed' })
      }
      return false
    } finally {
      pendingSelfWrite.current = false
      busyRef.current = false
      if (alive.current) setBusy(false)
    }
  }

  /** Normalize one entry for persistence: empty optional fields are dropped
   *  (they then fall back to their defaults instead of being stored as '' or
   *  stale values), and toolFilter survives only while it still scopes
   *  something — an allow list alone must NOT be deleted by an editor that
   *  only shows deny. */
  const cleanEntry = (entry: StoredEntry): StoredEntry => {
    const clean: StoredEntry = { ...entry }
    // Provenance markers are wire-only and must never land in a roster file.
    delete clean.source
    delete clean.routeNote
    // `enabled` persists only when explicitly false (true is the default).
    if (clean.enabled === undefined || clean.enabled) delete clean.enabled
    if (clean.provider === '') delete clean.provider
    if (clean.model === '') delete clean.model
    if (clean.subagentProvider === '') delete clean.subagentProvider
    if (clean.reasoningEffort === '') delete clean.reasoningEffort
    if (clean.persona === '') delete clean.persona
    if (clean.agentPreset === '') delete clean.agentPreset
    if (clean.description === '') delete clean.description
    if (clean.maxDepth === undefined) delete clean.maxDepth
    if (clean.maxTokens === undefined) delete clean.maxTokens
    const filter = clean.toolFilter
    if (filter !== undefined
      && (filter.allow === undefined || filter.allow.length === 0)
      && (filter.deny === undefined || filter.deny.length === 0)) {
      delete clean.toolFilter
    }
    return clean
  }

  const updateEntry = (id: string, entry: StoredEntry): void => {
    if ((entry.description ?? '').trim() === '') {
      setStatus({ kind: 'error', text: 'Description must not be empty.' })
      setOpen((current) => ({ ...current, [id]: true }))
      return
    }
    if (entry.maxDepth !== undefined && (!Number.isInteger(entry.maxDepth) || entry.maxDepth < 1)) {
      setStatus({ kind: 'error', text: 'Max depth must be an integer ≥ 1.' })
      setOpen((current) => ({ ...current, [id]: true }))
      return
    }
    if (entry.maxTokens !== undefined && (!Number.isInteger(entry.maxTokens) || entry.maxTokens < 1)) {
      setStatus({ kind: 'error', text: 'Max output must be an integer ≥ 1.' })
      setOpen((current) => ({ ...current, [id]: true }))
      return
    }
    // Save against the server truth, not the local snapshot: an unsaved draft
    // in another row must never be silently persisted by this row's button.
    void applyWrite({ op: 'save', entries: { ...(view?.entries ?? {}), [id]: cleanEntry(entry) }, expectedHash: view?.hash }, id)
  }

  const removeEntry = (id: string): void => {
    if (!window.confirm(`Delete subagent "${id}"? This immediately deletes its roster file.`)) return
    void applyWrite({ op: 'delete', id, expectedHash: view?.hash }, id)
  }

  const addEntry = (): void => {
    const id = newId.trim()
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id) || (newEntry.description ?? '').trim() === '') {
      setStatus({ kind: 'error', text: 'ID must be lowercase letters/digits/hyphens and a description is required.' })
      return
    }
    const serverEntries = view?.entries ?? {}
    if (serverEntries[id] !== undefined) {
      setStatus({ kind: 'error', text: `ID "${id}" already exists.` })
      return
    }
    if (newEntry.maxTokens !== undefined && (!Number.isInteger(newEntry.maxTokens) || newEntry.maxTokens < 1)) {
      setStatus({ kind: 'error', text: 'Max output must be an integer ≥ 1.' })
      return
    }
    if (newEntry.maxDepth !== undefined && (!Number.isInteger(newEntry.maxDepth) || newEntry.maxDepth < 1)) {
      setStatus({ kind: 'error', text: 'Max depth must be an integer ≥ 1.' })
      return
    }
    void applyWrite({ op: 'save', entries: { ...serverEntries, [id]: cleanEntry(newEntry) }, expectedHash: view?.hash }, id).then((ok) => {
      if (alive.current && ok) {
        setNewId('')
        setNewEntry({ description: '', provider: '', model: '', agentPreset: '', backgroundMode: 'one-shot' })
        setAdding(false)
        setOpen((current) => ({ ...current, [id]: true }))
      }
    })
  }

  /** One row's field edit; `patch` merges onto the current draft. */
  const patch = (id: string, changes: Partial<StoredEntry>): void => {
    setEntries((current) => ({ ...current, [id]: { ...current[id], ...changes } }))
  }

  const revertEntry = (id: string): void => {
    const saved = view?.entries[id]
    if (saved !== undefined) {
      setEntries((current) => ({ ...current, [id]: structuredClone(saved) }))
    }
  }

  const setDeny = (id: string, text: string): void => {
    const deny = parseList(text)
    const allow = entries[id]?.toolFilter?.allow
    const keepAllow = allow !== undefined && allow.length > 0
    patch(id, {
      toolFilter: keepAllow || deny.length > 0
        ? {
            ...(keepAllow ? { allow } : {}),
            ...(deny.length > 0 ? { deny } : {}),
          }
        : undefined,
    })
  }

  // ── derived: summary + ordering + filtering ──────────────────────────────
  const ids = useMemo(() => Object.keys(entries), [entries])
  const stats = useMemo(() => {
    let off = 0
    let legacy = 0
    for (const id of ids) {
      const entry = entries[id]
      if (entry.enabled === false) off += 1
      if (entry.source === 'legacy') legacy += 1
    }
    return { total: ids.length, off, legacy }
  }, [ids, entries])

  /** Disabled rows sink to the bottom (they are not what you came to look at),
   *  then plain alphabetical. */
  const orderedIds = useMemo(() => [...ids].sort((a, b) => {
    const offA = entries[a].enabled === false ? 1 : 0
    const offB = entries[b].enabled === false ? 1 : 0
    if (offA !== offB) return offA - offB
    return a.localeCompare(b)
  }), [ids, entries])

  const needle = filter.trim().toLowerCase()
  const visibleIds = useMemo(() => {
    if (needle === '') return orderedIds
    return orderedIds.filter((id) => {
      const entry = entries[id]
      const haystack = [id, entry.description, entry.model, entry.provider, entry.reasoningEffort, entry.persona]
        .filter((value): value is string => typeof value === 'string')
        .join('\n')
        .toLowerCase()
      return haystack.includes(needle)
    })
  }, [orderedIds, entries, needle])

  const dirtyIds = useMemo(() => {
    const set = new Set<string>()
    for (const id of ids) {
      if (!sameEntry(entries[id], view?.entries[id])) set.add(id)
    }
    return set
  }, [ids, entries, view])

  const openCount = visibleIds.filter((id) => open[id] === true).length
  const allOpen = visibleIds.length > 0 && openCount === visibleIds.length
  const toggleAll = (): void => {
    setOpen((current) => {
      const next = { ...current }
      for (const id of visibleIds) next[id] = !allOpen
      return next
    })
  }

  // ── render ───────────────────────────────────────────────────────────────
  if (view === null) {
    return (
      <div className="dsh-library" style={S.root}>
        <style>{SETTINGS_CSS}</style>
        <div style={S.headingRow}>
          <div style={S.heading}>Subagent Library</div>
          <button type="button" onClick={load} style={S.button}>Retry</button>
        </div>
        {status !== null && (
          <div style={status.kind === 'ok' ? BANNER.ok : BANNER.error}>{status.text}</div>
        )}
        {status === null && <div style={S.sub}>Loading… (if it hangs, retry or check whether the plugin loaded)</div>}
      </div>
    )
  }

  return (
    <div className="dsh-library" style={S.root}>
      <style>{SETTINGS_CSS}</style>
      <div style={S.pageHeader}>
        <div style={S.headingRow}>
          <h2 style={S.heading}>Subagent Library</h2>
          <span style={{ flex: 1 }} />
          <button type="button" onClick={load} disabled={busy} style={S.button}>Refresh</button>
        </div>
        <span style={S.sub}>
          Manage roles, models and execution in one place. Expand an entry to edit; changes apply immediately after saving.
        </span>
      </div>

      {(view.diagnostics?.length ?? 0) > 0 && (
        <div style={BANNER.warn}>
          {view.diagnostics!.map((item, index) => (
            <div
              key={index}
              style={{
                fontWeight: item.severity === 'error' ? 600 : 400,
                opacity: item.severity === 'info' ? 0.78 : 1,
              }}
            >
              {item.severity === 'error' ? 'Error' : item.severity === 'warning' ? 'Warning' : 'Info'}{item.id !== undefined ? ` [${item.id}]` : ''}: {item.message}
            </div>
          ))}
        </div>
      )}

      {view.profile !== undefined && view.profile !== '' && (
        <div style={BANNER.info}>
          Current profile: {view.profile}. The Provider / model filled in here is saved to this profile only and never rewrites another profile's route. If a shared-roster model is not registered here, calls fall back to the session model.
        </div>
      )}

      {(view.legacyCount ?? 0) > 0 && (
        <div style={BANNER.info}>
          <span>
            0.2→0.3 migration: {view.legacyCount} legacy entries were exported to roster files and now take precedence; the old copies remain in settings.yaml (rollback fallback only). Once the roster looks correct you can clear them in one click.
          </span>
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              if (window.confirm('Clear the migrated legacy copies in settings.yaml? (roster files are unaffected)')) {
                void applyWrite({ op: 'clear-legacy', expectedHash: view?.hash }, '')
              }
            }}
            style={{ ...S.button, alignSelf: 'flex-start' }}
          >
            Clear legacy entries
          </button>
        </div>
      )}

      {/* Summary band — the "at a glance" answer, before any scrolling. */}
      <div style={S.band}>
        <div style={S.bandStats}>
          <div style={S.bandStat}>
            <span style={S.bandValue}>{stats.total}</span>
            <span style={S.bandLabel}>subagents</span>
          </div>
          <div style={S.bandStat}>
            <span style={{ ...S.bandValue, color: SUCCESS }}>{stats.total - stats.off}</span>
            <span style={S.bandLabel}>enabled</span>
          </div>
          {stats.off > 0 && (
            <div style={S.bandStat}>
              <span style={S.bandValue}>{stats.off}</span>
              <span style={S.bandLabel}>disabled</span>
            </div>
          )}
          {dirtyIds.size > 0 && (
            <div style={S.bandStat}>
              <span style={{ ...S.bandValue, color: DANGER }}>{dirtyIds.size}</span>
              <span style={S.bandLabel}>unsaved</span>
            </div>
          )}
        </div>
        <div style={S.bandDir}>
          <span style={S.bandLabel}>Roster directory</span>
          <span style={S.bandPath} title={view.dir || '~/.dsh/subagents'}>{view.dir || '~/.dsh/subagents'}</span>
        </div>
      </div>

      {stats.total > 0 && (
        <div style={S.bar}>
          <label style={S.search}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: 'inherit', opacity: 0.6, flex: 'none' }} aria-hidden="true">
              <circle cx="5" cy="5" r="3.4" />
              <path d="M7.6 7.6L10.5 10.5" />
            </svg>
            <input
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              placeholder="Filter id, description, model…"
              aria-label="Filter subagents"
              style={S.searchInput}
            />
            {filter !== '' && (
              <button
                type="button"
                onClick={() => setFilter('')}
                title="Clear filter"
                style={{ ...S.ghost, padding: 0, fontSize: 13, lineHeight: 1 }}
              >
                ×
              </button>
            )}
          </label>
          <button type="button" onClick={toggleAll} disabled={visibleIds.length === 0} style={S.button}>{allOpen ? 'Collapse all' : 'Expand all'}</button>
          <button
            type="button"
            onClick={() => setAdding((current) => !current)}
            style={adding ? S.button : S.primary}
          >
            {adding ? 'Cancel' : '＋ New subagent'}
          </button>
        </div>
      )}

      {/* Add-card: default-collapsed behind the bar button so the roster owns
          the screen; it expands into the same field groups an entry row uses. */}
      {(adding || stats.total === 0) && (
        <div className="dsh-library-card" style={{ ...S.row, ...S.rowOpen }}>
          <div style={S.addHead}>
            <div style={S.addIntro}>
              <span style={{ ...S.id, color: ACCENT }}>New subagent</span>
              <span style={S.sub}>Fill in an ID and a role description; the rest can be set later.</span>
            </div>
            <button type="button" disabled={busy} onClick={addEntry} style={S.primary}>Create subagent</button>
          </div>
          <div style={S.body}>
            <div className="dsh-library-grid" style={S.grid}>
              <Field label="ID" hint="lowercase letters / digits / hyphens">
                <input value={newId} onChange={(event) => setNewId(event.target.value)} placeholder="k3-reviewer" style={S.input} />
              </Field>
              <Field label="Model" hint="Empty = default route">
                <input value={newEntry.model ?? ''} onChange={(event) => setNewEntry({ ...newEntry, model: event.target.value })} placeholder="k3-256k" style={S.input} />
              </Field>
            </div>
            <Field label="Description (visible to the model)">
              <textarea
                value={newEntry.description ?? ''}
                onChange={(event) => setNewEntry({ ...newEntry, description: event.target.value })}
                placeholder="One sentence on what this role does — the model picks by it"
                rows={1}
                style={{ ...S.prose, overflow: 'auto' }}
              />
            </Field>
            <div className="dsh-library-grid" style={S.grid}>
              <Field label="Provider">
                <input value={newEntry.provider ?? ''} onChange={(event) => setNewEntry({ ...newEntry, provider: event.target.value })} placeholder="kimi-coding" style={S.input} />
              </Field>
              <Field label="Transport">
                <input value={newEntry.subagentProvider ?? ''} onChange={(event) => setNewEntry({ ...newEntry, subagentProvider: event.target.value })} placeholder="spawn (default)" style={S.input} />
              </Field>
              <Field label="Background mode">
                <select
                  value={newEntry.backgroundMode ?? 'one-shot'}
                  onChange={(event) => setNewEntry({ ...newEntry, backgroundMode: event.target.value as 'one-shot' | 'continuable' })}
                  style={S.input}
                >
                  <option value="one-shot">one-shot</option>
                  <option value="continuable">continuable</option>
                </select>
              </Field>
              <Field label="Max depth">
                <input
                  type="number"
                  min={1}
                  value={newEntry.maxDepth ?? ''}
                  onChange={(event) => setNewEntry({ ...newEntry, maxDepth: event.target.value === '' ? undefined : Number(event.target.value) })}
                  style={S.input}
                />
              </Field>
              <Field label="Max output">
                <input
                  type="number"
                  min={1}
                  value={newEntry.maxTokens ?? ''}
                  onChange={(event) => setNewEntry({ ...newEntry, maxTokens: event.target.value === '' ? undefined : Number(event.target.value) })}
                  placeholder="tokens"
                  style={S.input}
                />
              </Field>
            </div>
            <div className="dsh-library-grid" style={S.grid}>
              <Field label="Reasoning effort">
                <input
                  value={newEntry.reasoningEffort ?? ''}
                  onChange={(event) => setNewEntry({ ...newEntry, reasoningEffort: event.target.value === '' ? undefined : event.target.value.trim() })}
                  placeholder="max / high / medium / low (empty = parent session default)"
                  style={S.input}
                />
              </Field>
              <Field label="Denied tools" hint="Comma-separated; writes only add/remove deny and never touch a hand-written allow">
                <input
                  value={listToText(newEntry.toolFilter?.deny)}
                  onChange={(event) => {
                    const deny = parseList(event.target.value)
                    const allow = newEntry.toolFilter?.allow
                    const keepAllow = allow !== undefined && allow.length > 0
                    setNewEntry({
                      ...newEntry,
                      toolFilter: keepAllow || deny.length > 0
                        ? { ...(keepAllow ? { allow } : {}), ...(deny.length > 0 ? { deny } : {}) }
                        : undefined,
                    })
                  }}
                  placeholder="write, edit, todo_write, …"
                  style={S.input}
                />
              </Field>
              <Field label="Agent preset" hint="DSH ≥0.2.1: the child's persona and tools come from this preset; empty = ignore">
                <input
                  value={newEntry.agentPreset ?? ''}
                  onChange={(event) => setNewEntry({ ...newEntry, agentPreset: event.target.value === '' ? undefined : event.target.value })}
                  placeholder="preset id"
                  style={S.input}
                />
              </Field>
            </div>
            <Field label="Persona (optional)">
              <AutoTextarea
                value={newEntry.persona ?? ''}
                onChange={(event) => setNewEntry({ ...newEntry, persona: event.target.value })}
                placeholder="System prompt for the subagent"
                style={S.prose}
              />
            </Field>
          </div>
        </div>
      )}

      {stats.total === 0 && (
        <div style={S.empty}>
          The library is empty. Fill in an id and a description above to create the first entry, 
          <br />
          or drop a <code>&lt;id&gt;.yaml</code>.
        </div>
      )}

      {stats.total > 0 && visibleIds.length === 0 && (
        <div style={S.empty}>No entries match '{filter}'.</div>
      )}

      {visibleIds.length > 0 && (
        <div style={S.listCaption}>
          <span>{needle === '' ? 'Role roster' : `matching ${visibleIds.length} / ${stats.total} subagents`}</span>
          <span>Click a name to expand settings</span>
        </div>
      )}

      <div style={S.list}>
        {visibleIds.map((id) => {
          const entry = entries[id]
          const isOpen = open[id] === true
          const dirty = dirtyIds.has(id)
          const off = entry.enabled === false
          const model = entry.model || ''
          const provider = entry.provider || ''
          const route = provider !== '' && model !== ''
            ? `${provider}/${model}`
            : model !== '' ? model : provider !== '' ? provider : 'default route'
          return (
            <div key={id} className="dsh-library-card" data-entry-id={id} style={{ ...S.row, ...(isOpen ? S.rowOpen : null), ...(off ? S.rowOff : null) }}>
              <div style={S.head}>
                <button
                  type="button"
                  className="dsh-library-disclosure"
                  style={S.disclosure}
                  aria-expanded={isOpen}
                  aria-controls={`${sectionId}-${id}`}
                  aria-label={`${isOpen ? 'Collapse' : 'Expand'} settings for ${id}`}
                  data-row-id={id}
                  onClick={() => setOpen((current) => ({ ...current, [id]: !isOpen }))}
                >
                  <Chevron open={isOpen} />
                  <span style={S.titleRow}>
                    <span style={S.id}>{id}</span>
                    {entry.source === 'legacy' && <span style={S.chip}>Legacy entries</span>}
                    {dirty && <span style={S.dirtyChip}>unsaved</span>}
                  </span>
                </button>
                <label
                  style={S.headToggle}
                  title="Save this entry for the toggle to take effect"
                >
                  <input
                    className="dsh-library-switch"
                    type="checkbox"
                    role="switch"
                    aria-label={`Enable ${id}`}
                    checked={!off}
                    onChange={(event) => patch(id, { enabled: event.target.checked ? undefined : false })}
                  />
                  <span>{off ? 'disabled' : 'enabled'}</span>
                </label>
              </div>

              <div style={S.overview}>
                <p style={S.excerpt} title={entry.description ?? ''}>
                  {entry.description || 'No role description'}
                </p>
                <div style={S.route} title={`Route: ${route}`}>
                  <span style={S.metaLabel}>Model</span>
                  <span style={S.model}>{model || 'Follow the default model'}</span>
                  {provider !== '' && <span style={S.provider}>{provider}</span>}
                </div>
                <div style={S.glyphs}>
                  <span style={entry.backgroundMode === 'continuable' ? S.modeChip : S.glyph}>
                    {entry.backgroundMode === 'continuable' ? 'Continuable' : 'One-shot'}
                  </span>
                  {entry.reasoningEffort && <span style={S.glyph}>Reasoning <span style={S.metaValue}>{entry.reasoningEffort}</span></span>}
                  {entry.maxDepth !== undefined && <span style={S.glyph}>Depth <span style={S.metaValue}>{entry.maxDepth}</span></span>}
                  {entry.maxTokens !== undefined && <span style={S.glyph}>Output <span style={S.metaValue}>{entry.maxTokens.toLocaleString('en-US')}</span> tokens</span>}
                  {entry.persona && <span style={S.glyph}>Persona</span>}
                  {(entry.toolFilter?.deny?.length ?? 0) > 0 && <span style={S.glyph}>Deny {entry.toolFilter!.deny!.length} tools</span>}
                  {(entry.toolFilter?.allow?.length ?? 0) > 0 && <span style={S.glyph}>Allow {entry.toolFilter!.allow!.length} tools</span>}
                </div>
              </div>

              {dirty && !isOpen && (
                <div style={S.draftActions}>
                  <span style={S.hint}>Save to apply</span>
                  <span style={S.spacer} />
                  <button type="button" disabled={busy} onClick={(event) => { focusDisclosure(event); revertEntry(id) }} style={S.ghost}>Revert</button>
                  <button type="button" disabled={busy} onClick={(event) => { focusDisclosure(event); updateEntry(id, entry) }} style={S.primary}>Save changes</button>
                </div>
              )}

              <div id={`${sectionId}-${id}`} hidden={!isOpen}>
                {isOpen && <div style={S.body}>
                  <div style={S.group}>
                    <span style={S.groupTitle}>Overview</span>
                    <Field label="Description (visible to the model)" hint="This exact text is what list_subagents shows the model — state the role and when to use it">
                      <textarea
                        value={entry.description ?? ''}
                        onChange={(event) => patch(id, { description: event.target.value })}
                        placeholder="Role description"
                        rows={1}
                        style={{ ...S.prose, overflow: 'auto' }}
                      />
                    </Field>
                  </div>

                  <div style={S.group}>
                    <span style={S.groupTitle}>Routing & execution</span>
                    <div className="dsh-library-grid" style={S.grid}>
                      <Field
                        label="Provider"
                        hint={entry.routeNote === 'foreign-ignored'
                          ? 'The shared-roster route is missing in the current profile; calls fall back to the session model. Saving empty will not change the shared route.'
                          : entry.routeNote === 'profile'
                            ? `Saved to profile ${view.profile ?? ''} only`
                            : entry.routeNote === 'inherit'
                              ? 'This profile always uses the session model and ignores the shared-roster route'
                              : entry.routeNote === 'profile-missing'
                                ? 'The Provider saved for this profile is not registered'
                                : undefined}
                      >
                        <input value={entry.provider ?? ''} onChange={(event) => patch(id, { provider: event.target.value })} placeholder="deepseek-official / kimi-coding" style={S.input} />
                      </Field>
                      <Field label="Model">
                        <input value={entry.model ?? ''} onChange={(event) => patch(id, { model: event.target.value })} placeholder="k3-256k" style={S.input} />
                      </Field>
                      <Field label="Transport" hint="Empty = spawn">
                        <input value={entry.subagentProvider ?? ''} onChange={(event) => patch(id, { subagentProvider: event.target.value })} placeholder="spawn (default)" style={S.input} />
                      </Field>
                      <Field label="Background mode">
                        <select
                          value={entry.backgroundMode ?? 'one-shot'}
                          onChange={(event) => patch(id, { backgroundMode: event.target.value as 'one-shot' | 'continuable' })}
                          style={S.input}
                        >
                          <option value="one-shot">one-shot</option>
                          <option value="continuable">continuable</option>
                        </select>
                      </Field>
                    </div>
                    <div className="dsh-library-grid" style={S.grid}>
                      <Field label="Reasoning effort" hint="Empty = parent session default">
                        <input
                          value={entry.reasoningEffort ?? ''}
                          onChange={(event) => patch(id, { reasoningEffort: event.target.value === '' ? undefined : event.target.value.trim() })}
                          placeholder="max / high / medium / low"
                          style={S.input}
                        />
                      </Field>
                      <Field label="Max depth">
                        <input
                          type="number"
                          min={1}
                          value={entry.maxDepth ?? ''}
                          onChange={(event) => patch(id, { maxDepth: event.target.value === '' ? undefined : Number(event.target.value) })}
                          style={S.input}
                        />
                      </Field>
                      <Field label="Max output">
                        <input
                          type="number"
                          min={1}
                          value={entry.maxTokens ?? ''}
                          onChange={(event) => patch(id, { maxTokens: event.target.value === '' ? undefined : Number(event.target.value) })}
                          placeholder="tokens"
                          style={S.input}
                        />
                      </Field>
                    </div>
                  </div>

                  <div style={S.group}>
                    <span style={S.groupTitle}>Tools & prompt</span>
                    <Field label="Denied tools" hint="Comma-separated; empty means no restriction. A hand-written allow list is kept as-is">
                      <input
                        value={listToText(entry.toolFilter?.deny)}
                        onChange={(event) => setDeny(id, event.target.value)}
                        placeholder="write, edit, todo_write, …"
                        style={S.input}
                      />
                    </Field>
                    <Field label="Agent preset" hint="DSH ≥0.2.1: the child's persona and tools come from this preset — persona and denied tools are ignored without it">
                      <input
                        value={entry.agentPreset ?? ''}
                        onChange={(event) => patch(id, { agentPreset: event.target.value === '' ? undefined : event.target.value })}
                        placeholder="preset id"
                        style={S.input}
                      />
                    </Field>
                    <Field label="Persona (optional)">
                      <AutoTextarea
                        value={entry.persona ?? ''}
                        onChange={(event) => patch(id, { persona: event.target.value })}
                        placeholder="System prompt for the subagent"
                        style={S.prose}
                      />
                    </Field>
                  </div>

                  <div style={S.actions}>
                    {dirty
                      ? <span style={{ ...S.hint, color: DANGER }}>This entry has unsaved changes</span>
                      : <span style={S.hint}>{entry.source === 'legacy' ? 'Migrated copy from settings.yaml' : 'In sync with the roster file'}</span>}
                    <span style={S.spacer} />
                    <button
                      type="button"
                      disabled={busy || !dirty}
                      onClick={() => revertEntry(id)}
                      style={{ ...S.ghost, opacity: busy || !dirty ? 0.45 : 1 }}
                      title="Discard this row's unsaved changes and restore the server value"
                    >
                      Revert
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => removeEntry(id)}
                      style={{ ...S.danger, opacity: busy ? 0.55 : 1 }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      disabled={busy || !dirty}
                      onClick={() => updateEntry(id, entry)}
                      style={{ ...S.primary, opacity: busy || !dirty ? 0.5 : 1 }}
                    >
                      Save
                    </button>
                  </div>
                </div>}
              </div>
            </div>
          )
        })}
      </div>

      {status !== null && (
        <div role="status" aria-live="polite" style={status.kind === 'ok' ? BANNER.ok : BANNER.error}>
          {status.text}
        </div>
      )}

      <details style={S.footer}>
        <summary style={S.footerSummary}>Storage & backup notes</summary>
        <div style={S.hint}>
        Config lives in the roster directory <code style={{ fontFamily: MONO }}>{view.dir || '~/.dsh/subagents'}</code> (one per named subagent, <code>&lt;id&gt;.yaml</code> — hand-editable and hot-reloaded; <code>_</code>-prefixed files/dirs are non-roster content, e.g. <code>_backups/</code> backup area).
        Before letting an agent edit entries, copy the originals to <code>_backups/</code>.
        The legacy entries in settings.yaml are read only as a migration fallback; files take precedence.
        </div>
      </details>
    </div>
  )
}
