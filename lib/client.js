window.__ModuleLoader__.load({ id: "dsh-subagent-library", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let react = require("react");
react = __toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = __toESM(react_jsx_runtime);

//#region src/client/settings-theme.ts
/** Host theme tokens keep the roster at home in both desktop color schemes. */
const TOKEN = {
	primary: "var(--dsw-alias-label-primary, currentColor)",
	secondary: "var(--dsw-alias-label-secondary, #737780)",
	muted: "var(--dsw-alias-label-tertiary, #858993)",
	border: "var(--dsw-alias-border-l2, rgba(128,128,128,0.2))",
	borderStrong: "var(--dsw-alias-border-l3, rgba(128,128,128,0.32))",
	divider: "var(--dsw-alias-border-l1, rgba(128,128,128,0.12))",
	surface: "var(--dsw-alias-bg-layer-2, rgba(128,128,128,0.035))",
	inset: "var(--dsw-alias-bg-module-platform, rgba(128,128,128,0.07))",
	hover: "var(--dsw-alias-interactive-bg-hover, rgba(128,128,128,0.08))",
	accent: "var(--dsw-alias-state-business-primary, #4176e6)",
	accentFill: "var(--dsw-alias-brand-primary-new-colorprimary-new-color, #4176e6)",
	accentSoft: "var(--dsw-alias-state-business-tertiary, rgba(65,118,230,0.12))",
	success: "var(--dsw-alias-state-success-primary, #16a34a)",
	successSoft: "var(--dsw-alias-state-success-tertiary, rgba(22,163,74,0.12))",
	warn: "var(--dsw-alias-state-warn-label, #b45309)",
	warnSoft: "var(--dsw-alias-state-warn-tertiary, rgba(217,119,6,0.12))",
	danger: "var(--dsw-alias-state-error-primary, #dc2626)",
	dangerSoft: "var(--dsw-alias-state-error-secondary, rgba(220,38,38,0.12))"
};
const ACCENT = TOKEN.accent;
const SUCCESS = TOKEN.success;
const DANGER = TOKEN.danger;
const MONO = "ui-monospace, SFMono-Regular, Consolas, \"Liberation Mono\", Menlo, monospace";
const button = {
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	minHeight: 32,
	padding: "5px 12px",
	fontSize: 12.5,
	lineHeight: 1.5,
	fontFamily: "inherit",
	fontWeight: 500,
	borderRadius: 8,
	border: `1px solid ${TOKEN.borderStrong}`,
	background: "transparent",
	color: TOKEN.secondary,
	cursor: "pointer",
	whiteSpace: "nowrap"
};
const chip = {
	display: "inline-flex",
	alignItems: "baseline",
	gap: 4,
	maxWidth: "100%",
	padding: "2px 7px",
	borderRadius: 5,
	fontSize: 11.5,
	lineHeight: 1.5,
	color: TOKEN.secondary,
	background: TOKEN.inset,
	overflowWrap: "anywhere"
};
const S = {
	root: {
		display: "flex",
		flexDirection: "column",
		gap: 16,
		width: "100%",
		minWidth: 0,
		maxWidth: 880,
		boxSizing: "border-box",
		padding: "16px 4px",
		color: TOKEN.primary,
		containerType: "inline-size",
		containerName: "dsh-library"
	},
	pageHeader: {
		display: "flex",
		flexDirection: "column",
		gap: 7
	},
	headingRow: {
		display: "flex",
		alignItems: "center",
		gap: 12,
		flexWrap: "wrap"
	},
	heading: {
		fontSize: 20,
		lineHeight: 1.4,
		fontWeight: 650,
		letterSpacing: "-0.025em",
		margin: 0
	},
	sub: {
		fontSize: 12.5,
		lineHeight: 1.65,
		color: TOKEN.muted,
		margin: 0
	},
	band: {
		display: "flex",
		flexDirection: "column",
		gap: 10,
		padding: "13px 16px",
		background: TOKEN.inset,
		borderRadius: 10
	},
	bandStats: {
		display: "flex",
		alignItems: "baseline",
		gap: "8px 24px",
		flexWrap: "wrap"
	},
	bandStat: {
		display: "flex",
		alignItems: "baseline",
		gap: 6
	},
	bandValue: {
		fontSize: 19,
		fontWeight: 600,
		lineHeight: 1.3,
		fontVariantNumeric: "tabular-nums"
	},
	bandLabel: {
		fontSize: 11.5,
		color: TOKEN.muted,
		flexShrink: 0
	},
	bandDir: {
		display: "flex",
		alignItems: "baseline",
		gap: 10,
		minWidth: 0
	},
	bandPath: {
		fontFamily: MONO,
		fontSize: 11.5,
		color: TOKEN.secondary,
		overflowWrap: "anywhere",
		minWidth: 0
	},
	banner: {
		fontSize: 12.5,
		lineHeight: 1.65,
		padding: "10px 12px",
		borderRadius: 8,
		display: "flex",
		flexDirection: "column",
		gap: 6,
		overflowWrap: "anywhere"
	},
	bar: {
		display: "flex",
		alignItems: "center",
		gap: 8,
		flexWrap: "wrap"
	},
	search: {
		display: "flex",
		alignItems: "center",
		gap: 8,
		flex: "1 1 220px",
		minWidth: 0,
		minHeight: 34,
		padding: "6px 10px",
		border: `1px solid ${TOKEN.borderStrong}`,
		borderRadius: 8
	},
	searchInput: {
		flex: 1,
		minWidth: 0,
		border: "none",
		outline: "none",
		padding: 0,
		background: "transparent",
		color: "inherit",
		fontSize: 13,
		fontFamily: "inherit"
	},
	listCaption: {
		display: "flex",
		justifyContent: "space-between",
		gap: "4px 12px",
		flexWrap: "wrap",
		fontSize: 11.5,
		color: TOKEN.muted,
		marginTop: 2,
		marginBottom: -7
	},
	list: {
		display: "flex",
		flexDirection: "column",
		gap: 10
	},
	row: {
		minWidth: 0,
		border: `1px solid ${TOKEN.border}`,
		borderRadius: 12,
		background: TOKEN.surface,
		overflow: "hidden",
		transition: "border-color 140ms ease, box-shadow 140ms ease"
	},
	rowOpen: {
		borderColor: TOKEN.accent,
		boxShadow: `0 0 0 1px ${TOKEN.accentSoft}`
	},
	rowOff: { background: "transparent" },
	head: {
		display: "flex",
		alignItems: "flex-start",
		gap: 12,
		padding: "12px 16px 0 12px"
	},
	disclosure: {
		display: "flex",
		alignItems: "flex-start",
		flex: 1,
		minWidth: 0,
		gap: 6,
		minHeight: 28,
		padding: "2px 0",
		textAlign: "left",
		font: "inherit",
		border: 0,
		borderRadius: 4,
		color: TOKEN.primary,
		background: "transparent",
		cursor: "pointer"
	},
	titleRow: {
		display: "flex",
		flex: 1,
		minWidth: 0,
		alignItems: "center",
		gap: "5px 8px",
		flexWrap: "wrap"
	},
	chevron: {
		flex: "none",
		width: 18,
		height: 22,
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		color: TOKEN.muted,
		transition: "transform 140ms ease"
	},
	id: {
		fontSize: 14,
		lineHeight: 1.6,
		fontWeight: 650,
		fontFamily: MONO,
		overflowWrap: "anywhere",
		minWidth: 0
	},
	headToggle: {
		display: "flex",
		alignItems: "center",
		flex: "none",
		gap: 7,
		minHeight: 28,
		fontSize: 11.5,
		color: TOKEN.muted,
		cursor: "pointer"
	},
	overview: {
		display: "flex",
		flexDirection: "column",
		gap: 9,
		padding: "2px 16px 13px 36px",
		minWidth: 0
	},
	excerpt: {
		display: "-webkit-box",
		WebkitBoxOrient: "vertical",
		WebkitLineClamp: 2,
		overflow: "hidden",
		margin: 0,
		fontSize: 13,
		lineHeight: 1.65,
		color: TOKEN.secondary,
		overflowWrap: "anywhere"
	},
	route: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "baseline",
		gap: "2px 8px",
		minWidth: 0
	},
	metaLabel: {
		fontSize: 11.5,
		color: TOKEN.muted,
		flexShrink: 0
	},
	model: {
		fontFamily: MONO,
		fontSize: 12.5,
		fontWeight: 500,
		color: TOKEN.primary,
		overflowWrap: "anywhere",
		minWidth: 0,
		maxWidth: "100%"
	},
	provider: {
		fontFamily: MONO,
		fontSize: 11.5,
		color: TOKEN.muted,
		paddingLeft: 8,
		borderLeft: `1px solid ${TOKEN.borderStrong}`,
		overflowWrap: "anywhere",
		minWidth: 0,
		maxWidth: "100%"
	},
	glyphs: {
		display: "flex",
		alignItems: "center",
		gap: 6,
		flexWrap: "wrap",
		minWidth: 0
	},
	glyph: chip,
	metaValue: {
		fontFamily: MONO,
		fontVariantNumeric: "tabular-nums"
	},
	modeChip: {
		...chip,
		color: TOKEN.accent,
		background: TOKEN.accentSoft
	},
	chip: {
		...chip,
		fontSize: 10.5
	},
	dirtyChip: {
		...chip,
		fontSize: 10.5,
		color: TOKEN.warn,
		background: TOKEN.warnSoft
	},
	draftActions: {
		display: "flex",
		alignItems: "center",
		gap: 8,
		flexWrap: "wrap",
		padding: "9px 16px",
		borderTop: `1px solid ${TOKEN.divider}`
	},
	addHead: {
		display: "flex",
		alignItems: "center",
		flexWrap: "wrap",
		gap: 12,
		padding: "16px"
	},
	addIntro: {
		display: "flex",
		flex: "1 1 220px",
		flexDirection: "column",
		gap: 3,
		minWidth: 0
	},
	body: {
		display: "flex",
		flexDirection: "column",
		gap: 20,
		padding: 16,
		borderTop: `1px solid ${TOKEN.divider}`
	},
	group: {
		display: "flex",
		flexDirection: "column",
		gap: 12
	},
	groupTitle: {
		fontSize: 12.5,
		fontWeight: 600,
		color: TOKEN.primary
	},
	fieldLabel: {
		fontSize: 12,
		color: TOKEN.secondary,
		marginBottom: 6,
		display: "block"
	},
	field: {
		display: "flex",
		flexDirection: "column",
		minWidth: 0
	},
	grid: {
		display: "grid",
		gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
		gap: 12,
		alignItems: "start"
	},
	actions: {
		display: "flex",
		alignItems: "center",
		gap: 8,
		flexWrap: "wrap",
		paddingTop: 12,
		borderTop: `1px solid ${TOKEN.divider}`
	},
	spacer: { flex: 1 },
	input: {
		width: "100%",
		minHeight: 35,
		boxSizing: "border-box",
		fontSize: 13,
		fontFamily: MONO,
		lineHeight: 1.5,
		padding: "6px 9px",
		border: `1px solid ${TOKEN.borderStrong}`,
		borderRadius: 7,
		background: "transparent",
		color: "inherit"
	},
	prose: {
		width: "100%",
		minHeight: 64,
		boxSizing: "border-box",
		fontSize: 13,
		fontFamily: "inherit",
		lineHeight: 1.7,
		padding: "8px 10px",
		border: `1px solid ${TOKEN.borderStrong}`,
		borderRadius: 7,
		background: "transparent",
		color: "inherit",
		resize: "vertical",
		whiteSpace: "pre-wrap",
		overflowWrap: "anywhere"
	},
	button,
	primary: {
		...button,
		padding: "5px 13px",
		borderColor: "transparent",
		background: TOKEN.accentFill,
		color: "#fff"
	},
	danger: {
		...button,
		borderColor: TOKEN.dangerSoft,
		color: TOKEN.danger
	},
	ghost: {
		...button,
		borderColor: "transparent",
		color: TOKEN.muted
	},
	hint: {
		fontSize: 11.5,
		lineHeight: 1.65,
		color: TOKEN.muted,
		margin: 0,
		overflowWrap: "anywhere"
	},
	empty: {
		padding: "28px 16px",
		textAlign: "center",
		fontSize: 13,
		lineHeight: 1.7,
		color: TOKEN.muted,
		border: `1px dashed ${TOKEN.border}`,
		borderRadius: 10
	},
	footer: {
		padding: "4px 0",
		color: TOKEN.muted,
		overflowWrap: "anywhere"
	},
	footerSummary: {
		cursor: "pointer",
		fontSize: 11.5,
		paddingBottom: 8
	}
};
const BANNER = {
	ok: {
		...S.banner,
		background: TOKEN.successSoft
	},
	error: {
		...S.banner,
		background: TOKEN.dangerSoft
	},
	warn: {
		...S.banner,
		background: TOKEN.warnSoft
	},
	info: {
		...S.banner,
		background: TOKEN.inset
	}
};
/** Scoped styles travel with the client bundle; no extra host CSS loader. */
const SETTINGS_CSS = `
.dsh-library *, .dsh-library *::before { box-sizing: border-box; }
.dsh-library button:disabled { cursor: default !important; opacity: .5; }
.dsh-library :is(button, input, textarea, select, summary):focus-visible {
  outline: 2px solid ${TOKEN.accent}; outline-offset: 3px;
}
.dsh-library label:has(input[aria-label="Filter subagents"]):focus-within {
  outline: 2px solid ${TOKEN.accent}; outline-offset: 2px;
}
.dsh-library input[aria-label="Filter subagents"]:focus-visible { outline: none; }
.dsh-library select option { background: ${TOKEN.surface}; color: ${TOKEN.primary}; }
.dsh-library-switch {
  appearance: none; position: relative; display: inline-block; flex: none;
  width: 30px; height: 18px; margin: 0; border: 1px solid ${TOKEN.borderStrong};
  border-radius: 999px; background: ${TOKEN.hover}; cursor: pointer;
  transition: background 140ms ease;
}
.dsh-library-switch::before {
  content: ''; position: absolute; top: 2px; left: 2px; width: 12px; height: 12px;
  border-radius: 50%; background: ${TOKEN.muted}; transition: transform 140ms ease;
}
.dsh-library-switch:checked { background: ${TOKEN.accentFill}; border-color: transparent; }
.dsh-library-switch:checked::before { transform: translateX(12px); background: #fff; }
@container dsh-library (max-width: 520px) {
  .dsh-library-grid { grid-template-columns: minmax(0, 1fr) !important; }
}
@media (hover: hover) {
  .dsh-library-card:hover { border-color: ${TOKEN.borderStrong}; }
  .dsh-library-disclosure:hover { color: ${TOKEN.accent} !important; }
  .dsh-library button:not(:disabled):hover { filter: brightness(.96); }
}
@media (prefers-reduced-motion: reduce) {
  .dsh-library *, .dsh-library *::before { transition: none !important; }
}
@media (forced-colors: active) {
  .dsh-library-switch { appearance: auto; }
  .dsh-library-switch::before { display: none; }
}
`;

//#endregion
//#region src/client/LibrarySettings.tsx
/** Deep equality for the two entry shapes we compare (server row vs draft).
*  JSON round-trip is enough: every field is a string, number, boolean, or
*  array of strings, and key order is stable because both sides are built by
*  the same spread-from-server path. */
const sameEntry = (a, b) => JSON.stringify(a) === JSON.stringify(b);
/** Content-adaptive textarea: grows with its text (clamped) so long personas
*  are readable without dragging while short ones stay compact. Re-measures
*  after every render (value changes re-render) and on input. */
function AutoTextarea(props) {
	const { style,...rest } = props;
	const ref = (0, react.useRef)(null);
	const resize = () => {
		const el = ref.current;
		if (el === null) return;
		el.style.height = "auto";
		el.style.height = `${Math.min(Math.max(el.scrollHeight, 86), 440)}px`;
	};
	(0, react.useEffect)(() => {
		resize();
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
		...rest,
		ref,
		onInput: resize,
		style: {
			...style,
			overflow: "auto"
		}
	});
}
/** Single-line label + control, so every field in the editor lines up on the
*  same left edge regardless of how many share a row. */
function Field(props) {
	const { label, hint, children } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
		style: S.field,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				style: S.fieldLabel,
				children: label
			}),
			children,
			hint !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				style: {
					...S.hint,
					marginTop: 3
				},
				children: hint
			})
		]
	});
}
/** Chevron that rotates on open — the only motion in the page, and cheap. */
function Chevron(props) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		style: {
			...S.chevron,
			transform: props.open ? "rotate(90deg)" : "none"
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "11",
			height: "11",
			viewBox: "0 0 12 12",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M4.5 2.5L8 6l-3.5 3.5" })
		})
	});
}
/** Parse / render the comma-separated deny list without ever dropping a
*  hand-written allow list the editor does not surface. */
const parseList = (value) => value.split(",").map((item) => item.trim()).filter(Boolean);
const listToText = (list) => (list ?? []).join(", ");
/** Draft actions disappear on success. Keep keyboard focus on their card. */
function focusDisclosure(event) {
	if (event.detail === 0) event.currentTarget.closest("[data-entry-id]")?.querySelector("[data-row-id]")?.focus();
}
function LibrarySettings(props) {
	const { readView: readView$1, writeView: writeView$1, subscribeRefresh } = props;
	const sectionId = (0, react.useId)();
	const [view, setView] = (0, react.useState)(null);
	const [entries, setEntries] = (0, react.useState)({});
	const [busy, setBusy] = (0, react.useState)(false);
	const [status, setStatus] = (0, react.useState)(null);
	const [newId, setNewId] = (0, react.useState)("");
	const [newEntry, setNewEntry] = (0, react.useState)({
		description: "",
		provider: "",
		model: "",
		backgroundMode: "one-shot"
	});
	/** Editing is opt-in; newly created entries open to finish configuration. */
	const [open, setOpen] = (0, react.useState)({});
	const [adding, setAdding] = (0, react.useState)(false);
	const [filter, setFilter] = (0, react.useState)("");
	const alive = (0, react.useRef)(true);
	/** Synchronous busy flag (see applyWrite's re-entry guard). */
	const busyRef = (0, react.useRef)(false);
	(0, react.useEffect)(() => () => {
		alive.current = false;
	}, []);
	/** True while a write request is in flight: the push and the HTTP response
	*  travel on independent channels, so a push may arrive before the response
	*  commits our state. Pushes in this window are skipped and re-run after. */
	const pendingSelfWrite = (0, react.useRef)(false);
	const skippedWhilePending = (0, react.useRef)(false);
	const load = () => {
		(async () => {
			try {
				const next = await readView$1();
				if (!alive.current) return;
				setView(next);
				setEntries(structuredClone(next.entries));
			} catch (error) {
				if (alive.current) setStatus({
					kind: "error",
					text: String(error)
				});
			}
		})();
	};
	(0, react.useEffect)(() => {
		load();
		return subscribeRefresh(() => {
			if (pendingSelfWrite.current) {
				skippedWhilePending.current = true;
				return;
			}
			load();
		});
	}, [subscribeRefresh]);
	const applyWrite = async (write, touchedId) => {
		if (busyRef.current) return false;
		busyRef.current = true;
		setBusy(true);
		setStatus(null);
		pendingSelfWrite.current = true;
		try {
			const result = await writeView$1(write);
			if (!alive.current) return false;
			pendingSelfWrite.current = false;
			const skipped = skippedWhilePending.current;
			skippedWhilePending.current = false;
			if (result.ok) {
				setView(result.view);
				setEntries((current) => {
					const next = { ...current };
					const fresh = result.view.entries[touchedId];
					if (fresh !== void 0) next[touchedId] = structuredClone(fresh);
					else delete next[touchedId];
					return next;
				});
				setStatus({
					kind: "ok",
					text: "Saved"
				});
				if (skipped) load();
				return true;
			}
			skippedWhilePending.current = false;
			if (result.conflict) {
				if (result.view !== void 0) setView(result.view);
				else load();
				setStatus({
					kind: "error",
					text: "The roster was changed by another window or externally (switched to the latest baseline). Your unsaved changes are kept; saving again overwrites with your version."
				});
			} else {
				if (skipped) load();
				setStatus({
					kind: "error",
					text: result.message ?? "Save failed"
				});
			}
			return false;
		} finally {
			pendingSelfWrite.current = false;
			busyRef.current = false;
			if (alive.current) setBusy(false);
		}
	};
	/** Normalize one entry for persistence: empty optional fields are dropped
	*  (they then fall back to their defaults instead of being stored as '' or
	*  stale values), and toolFilter survives only while it still scopes
	*  something — an allow list alone must NOT be deleted by an editor that
	*  only shows deny. */
	const cleanEntry = (entry) => {
		const clean = { ...entry };
		delete clean.source;
		delete clean.routeNote;
		if (clean.enabled === void 0 || clean.enabled) delete clean.enabled;
		if (clean.provider === "") delete clean.provider;
		if (clean.model === "") delete clean.model;
		if (clean.subagentProvider === "") delete clean.subagentProvider;
		if (clean.reasoningEffort === "") delete clean.reasoningEffort;
		if (clean.persona === "") delete clean.persona;
		if (clean.description === "") delete clean.description;
		if (clean.maxDepth === void 0) delete clean.maxDepth;
		if (clean.maxTokens === void 0) delete clean.maxTokens;
		const filter$1 = clean.toolFilter;
		if (filter$1 !== void 0 && (filter$1.allow === void 0 || filter$1.allow.length === 0) && (filter$1.deny === void 0 || filter$1.deny.length === 0)) delete clean.toolFilter;
		return clean;
	};
	const updateEntry = (id, entry) => {
		if ((entry.description ?? "").trim() === "") {
			setStatus({
				kind: "error",
				text: "Description must not be empty."
			});
			setOpen((current) => ({
				...current,
				[id]: true
			}));
			return;
		}
		if (entry.maxDepth !== void 0 && (!Number.isInteger(entry.maxDepth) || entry.maxDepth < 1)) {
			setStatus({
				kind: "error",
				text: "Max depth must be an integer ≥ 1."
			});
			setOpen((current) => ({
				...current,
				[id]: true
			}));
			return;
		}
		if (entry.maxTokens !== void 0 && (!Number.isInteger(entry.maxTokens) || entry.maxTokens < 1)) {
			setStatus({
				kind: "error",
				text: "Max output must be an integer ≥ 1."
			});
			setOpen((current) => ({
				...current,
				[id]: true
			}));
			return;
		}
		applyWrite({
			op: "save",
			entries: {
				...view?.entries ?? {},
				[id]: cleanEntry(entry)
			},
			expectedHash: view?.hash
		}, id);
	};
	const removeEntry = (id) => {
		if (!window.confirm(`Delete subagent "${id}"? This immediately deletes its roster file.`)) return;
		applyWrite({
			op: "delete",
			id,
			expectedHash: view?.hash
		}, id);
	};
	const addEntry = () => {
		const id = newId.trim();
		if (!/^[a-z0-9][a-z0-9-]*$/.test(id) || (newEntry.description ?? "").trim() === "") {
			setStatus({
				kind: "error",
				text: "ID must be lowercase letters/digits/hyphens and a description is required."
			});
			return;
		}
		const serverEntries = view?.entries ?? {};
		if (serverEntries[id] !== void 0) {
			setStatus({
				kind: "error",
				text: `ID "${id}" already exists.`
			});
			return;
		}
		if (newEntry.maxTokens !== void 0 && (!Number.isInteger(newEntry.maxTokens) || newEntry.maxTokens < 1)) {
			setStatus({
				kind: "error",
				text: "Max output must be an integer ≥ 1."
			});
			return;
		}
		if (newEntry.maxDepth !== void 0 && (!Number.isInteger(newEntry.maxDepth) || newEntry.maxDepth < 1)) {
			setStatus({
				kind: "error",
				text: "Max depth must be an integer ≥ 1."
			});
			return;
		}
		applyWrite({
			op: "save",
			entries: {
				...serverEntries,
				[id]: cleanEntry(newEntry)
			},
			expectedHash: view?.hash
		}, id).then((ok) => {
			if (alive.current && ok) {
				setNewId("");
				setNewEntry({
					description: "",
					provider: "",
					model: "",
					backgroundMode: "one-shot"
				});
				setAdding(false);
				setOpen((current) => ({
					...current,
					[id]: true
				}));
			}
		});
	};
	/** One row's field edit; `patch` merges onto the current draft. */
	const patch = (id, changes) => {
		setEntries((current) => ({
			...current,
			[id]: {
				...current[id],
				...changes
			}
		}));
	};
	const revertEntry = (id) => {
		const saved = view?.entries[id];
		if (saved !== void 0) setEntries((current) => ({
			...current,
			[id]: structuredClone(saved)
		}));
	};
	const setDeny = (id, text) => {
		const deny = parseList(text);
		const allow = entries[id]?.toolFilter?.allow;
		const keepAllow = allow !== void 0 && allow.length > 0;
		patch(id, { toolFilter: keepAllow || deny.length > 0 ? {
			...keepAllow ? { allow } : {},
			...deny.length > 0 ? { deny } : {}
		} : void 0 });
	};
	const ids = (0, react.useMemo)(() => Object.keys(entries), [entries]);
	const stats = (0, react.useMemo)(() => {
		let off = 0;
		let legacy = 0;
		for (const id of ids) {
			const entry = entries[id];
			if (entry.enabled === false) off += 1;
			if (entry.source === "legacy") legacy += 1;
		}
		return {
			total: ids.length,
			off,
			legacy
		};
	}, [ids, entries]);
	/** Disabled rows sink to the bottom (they are not what you came to look at),
	*  then plain alphabetical. */
	const orderedIds = (0, react.useMemo)(() => [...ids].sort((a, b) => {
		const offA = entries[a].enabled === false ? 1 : 0;
		const offB = entries[b].enabled === false ? 1 : 0;
		if (offA !== offB) return offA - offB;
		return a.localeCompare(b);
	}), [ids, entries]);
	const needle = filter.trim().toLowerCase();
	const visibleIds = (0, react.useMemo)(() => {
		if (needle === "") return orderedIds;
		return orderedIds.filter((id) => {
			const entry = entries[id];
			return [
				id,
				entry.description,
				entry.model,
				entry.provider,
				entry.reasoningEffort,
				entry.persona
			].filter((value) => typeof value === "string").join("\n").toLowerCase().includes(needle);
		});
	}, [
		orderedIds,
		entries,
		needle
	]);
	const dirtyIds = (0, react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		for (const id of ids) if (!sameEntry(entries[id], view?.entries[id])) set.add(id);
		return set;
	}, [
		ids,
		entries,
		view
	]);
	const openCount = visibleIds.filter((id) => open[id] === true).length;
	const allOpen = visibleIds.length > 0 && openCount === visibleIds.length;
	const toggleAll = () => {
		setOpen((current) => {
			const next = { ...current };
			for (const id of visibleIds) next[id] = !allOpen;
			return next;
		});
	};
	if (view === null) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "dsh-library",
		style: S.root,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("style", { children: SETTINGS_CSS }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: S.headingRow,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					style: S.heading,
					children: "Subagent Library"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: load,
					style: S.button,
					children: "Retry"
				})]
			}),
			status !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				style: status.kind === "ok" ? BANNER.ok : BANNER.error,
				children: status.text
			}),
			status === null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				style: S.sub,
				children: "Loading… (if it hangs, retry or check whether the plugin loaded)"
			})
		]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: "dsh-library",
		style: S.root,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("style", { children: SETTINGS_CSS }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: S.pageHeader,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: S.headingRow,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
							style: S.heading,
							children: "Subagent Library"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: load,
							disabled: busy,
							style: S.button,
							children: "Refresh"
						})
					]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					style: S.sub,
					children: "Manage roles, models and execution in one place. Expand an entry to edit; changes apply immediately after saving."
				})]
			}),
			(view.diagnostics?.length ?? 0) > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				style: BANNER.warn,
				children: view.diagnostics.map((item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: {
						fontWeight: item.severity === "error" ? 600 : 400,
						opacity: item.severity === "info" ? .78 : 1
					},
					children: [
						item.severity === "error" ? "Error" : item.severity === "warning" ? "Warning" : "Info",
						item.id !== void 0 ? ` [${item.id}]` : "",
						": ",
						item.message
					]
				}, index))
			}),
			view.profile !== void 0 && view.profile !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: BANNER.info,
				children: [
					"Current profile: ",
					view.profile,
					". The Provider / model filled in here is saved to this profile only and never rewrites another profile's route. If a shared-roster model is not registered here, calls fall back to the session model."
				]
			}),
			(view.legacyCount ?? 0) > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: BANNER.info,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
					"0.2→0.3 migration: ",
					view.legacyCount,
					" legacy entries were exported to roster files and now take precedence; the old copies remain in settings.yaml (rollback fallback only). Once the roster looks correct you can clear them in one click."
				] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: busy,
					onClick: () => {
						if (window.confirm("Clear the migrated legacy copies in settings.yaml? (roster files are unaffected)")) applyWrite({
							op: "clear-legacy",
							expectedHash: view?.hash
						}, "");
					},
					style: {
						...S.button,
						alignSelf: "flex-start"
					},
					children: "Clear legacy entries"
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: S.band,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: S.bandStats,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: S.bandStat,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: S.bandValue,
								children: stats.total
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: S.bandLabel,
								children: "subagents"
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: S.bandStat,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: {
									...S.bandValue,
									color: SUCCESS
								},
								children: stats.total - stats.off
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: S.bandLabel,
								children: "enabled"
							})]
						}),
						stats.off > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: S.bandStat,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: S.bandValue,
								children: stats.off
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: S.bandLabel,
								children: "disabled"
							})]
						}),
						dirtyIds.size > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: S.bandStat,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: {
									...S.bandValue,
									color: DANGER
								},
								children: dirtyIds.size
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: S.bandLabel,
								children: "unsaved"
							})]
						})
					]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: S.bandDir,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						style: S.bandLabel,
						children: "Roster directory"
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						style: S.bandPath,
						title: view.dir || "~/.dsh/subagents",
						children: view.dir || "~/.dsh/subagents"
					})]
				})]
			}),
			stats.total > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: S.bar,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
						style: S.search,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
								width: "12",
								height: "12",
								viewBox: "0 0 12 12",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round",
								style: {
									color: "inherit",
									opacity: .6,
									flex: "none"
								},
								"aria-hidden": "true",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
									cx: "5",
									cy: "5",
									r: "3.4"
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M7.6 7.6L10.5 10.5" })]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								value: filter,
								onChange: (event) => setFilter(event.target.value),
								placeholder: "Filter id, description, model…",
								"aria-label": "Filter subagents",
								style: S.searchInput
							}),
							filter !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setFilter(""),
								title: "Clear filter",
								style: {
									...S.ghost,
									padding: 0,
									fontSize: 13,
									lineHeight: 1
								},
								children: "×"
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: toggleAll,
						disabled: visibleIds.length === 0,
						style: S.button,
						children: allOpen ? "Collapse all" : "Expand all"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setAdding((current) => !current),
						style: adding ? S.button : S.primary,
						children: adding ? "Cancel" : "＋ New subagent"
					})
				]
			}),
			(adding || stats.total === 0) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "dsh-library-card",
				style: {
					...S.row,
					...S.rowOpen
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: S.addHead,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: S.addIntro,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: {
								...S.id,
								color: ACCENT
							},
							children: "New subagent"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: S.sub,
							children: "Fill in an ID and a role description; the rest can be set later."
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy,
						onClick: addEntry,
						style: S.primary,
						children: "Create subagent"
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: S.body,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "dsh-library-grid",
							style: S.grid,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
								label: "ID",
								hint: "lowercase letters / digits / hyphens",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									value: newId,
									onChange: (event) => setNewId(event.target.value),
									placeholder: "k3-reviewer",
									style: S.input
								})
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
								label: "Model",
								hint: "Empty = default route",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									value: newEntry.model ?? "",
									onChange: (event) => setNewEntry({
										...newEntry,
										model: event.target.value
									}),
									placeholder: "k3-256k",
									style: S.input
								})
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
							label: "Description (visible to the model)",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
								value: newEntry.description ?? "",
								onChange: (event) => setNewEntry({
									...newEntry,
									description: event.target.value
								}),
								placeholder: "One sentence on what this role does — the model picks by it",
								rows: 1,
								style: {
									...S.prose,
									overflow: "auto"
								}
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "dsh-library-grid",
							style: S.grid,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
									label: "Provider",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										value: newEntry.provider ?? "",
										onChange: (event) => setNewEntry({
											...newEntry,
											provider: event.target.value
										}),
										placeholder: "kimi-coding",
										style: S.input
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
									label: "Transport",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										value: newEntry.subagentProvider ?? "",
										onChange: (event) => setNewEntry({
											...newEntry,
											subagentProvider: event.target.value
										}),
										placeholder: "spawn (default)",
										style: S.input
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
									label: "Background mode",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
										value: newEntry.backgroundMode ?? "one-shot",
										onChange: (event) => setNewEntry({
											...newEntry,
											backgroundMode: event.target.value
										}),
										style: S.input,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: "one-shot",
											children: "one-shot"
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: "continuable",
											children: "continuable"
										})]
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
									label: "Max depth",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										type: "number",
										min: 1,
										value: newEntry.maxDepth ?? "",
										onChange: (event) => setNewEntry({
											...newEntry,
											maxDepth: event.target.value === "" ? void 0 : Number(event.target.value)
										}),
										style: S.input
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
									label: "Max output",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										type: "number",
										min: 1,
										value: newEntry.maxTokens ?? "",
										onChange: (event) => setNewEntry({
											...newEntry,
											maxTokens: event.target.value === "" ? void 0 : Number(event.target.value)
										}),
										placeholder: "tokens",
										style: S.input
									})
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "dsh-library-grid",
							style: S.grid,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
								label: "Reasoning effort",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									value: newEntry.reasoningEffort ?? "",
									onChange: (event) => setNewEntry({
										...newEntry,
										reasoningEffort: event.target.value === "" ? void 0 : event.target.value.trim()
									}),
									placeholder: "max / high / medium / low (empty = parent session default)",
									style: S.input
								})
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
								label: "Denied tools",
								hint: "Comma-separated; writes only add/remove deny and never touch a hand-written allow",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									value: listToText(newEntry.toolFilter?.deny),
									onChange: (event) => {
										const deny = parseList(event.target.value);
										const allow = newEntry.toolFilter?.allow;
										const keepAllow = allow !== void 0 && allow.length > 0;
										setNewEntry({
											...newEntry,
											toolFilter: keepAllow || deny.length > 0 ? {
												...keepAllow ? { allow } : {},
												...deny.length > 0 ? { deny } : {}
											} : void 0
										});
									},
									placeholder: "write, edit, todo_write, …",
									style: S.input
								})
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
							label: "Persona (optional)",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AutoTextarea, {
								value: newEntry.persona ?? "",
								onChange: (event) => setNewEntry({
									...newEntry,
									persona: event.target.value
								}),
								placeholder: "System prompt for the subagent",
								style: S.prose
							})
						})
					]
				})]
			}),
			stats.total === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: S.empty,
				children: [
					"The library is empty. Fill in an id and a description above to create the first entry,",
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("br", {}),
					"or drop a ",
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: "<id>.yaml" }),
					"."
				]
			}),
			stats.total > 0 && visibleIds.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: S.empty,
				children: [
					"No entries match '",
					filter,
					"'."
				]
			}),
			visibleIds.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: S.listCaption,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: needle === "" ? "Role roster" : `matching ${visibleIds.length} / ${stats.total} subagents` }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Click a name to expand settings" })]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				style: S.list,
				children: visibleIds.map((id) => {
					const entry = entries[id];
					const isOpen = open[id] === true;
					const dirty = dirtyIds.has(id);
					const off = entry.enabled === false;
					const model = entry.model || "";
					const provider = entry.provider || "";
					const route = provider !== "" && model !== "" ? `${provider}/${model}` : model !== "" ? model : provider !== "" ? provider : "default route";
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "dsh-library-card",
						"data-entry-id": id,
						style: {
							...S.row,
							...isOpen ? S.rowOpen : null,
							...off ? S.rowOff : null
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								style: S.head,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "dsh-library-disclosure",
									style: S.disclosure,
									"aria-expanded": isOpen,
									"aria-controls": `${sectionId}-${id}`,
									"aria-label": `${isOpen ? "Collapse" : "Expand"} settings for ${id}`,
									"data-row-id": id,
									onClick: () => setOpen((current) => ({
										...current,
										[id]: !isOpen
									})),
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Chevron, { open: isOpen }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										style: S.titleRow,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: S.id,
												children: id
											}),
											entry.source === "legacy" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: S.chip,
												children: "Legacy entries"
											}),
											dirty && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: S.dirtyChip,
												children: "unsaved"
											})
										]
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									style: S.headToggle,
									title: "Save this entry for the toggle to take effect",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										className: "dsh-library-switch",
										type: "checkbox",
										role: "switch",
										"aria-label": `Enable ${id}`,
										checked: !off,
										onChange: (event) => patch(id, { enabled: event.target.checked ? void 0 : false })
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: off ? "disabled" : "enabled" })]
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								style: S.overview,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										style: S.excerpt,
										title: entry.description ?? "",
										children: entry.description || "No role description"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										style: S.route,
										title: `Route: ${route}`,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: S.metaLabel,
												children: "Model"
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: S.model,
												children: model || "Follow the default model"
											}),
											provider !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: S.provider,
												children: provider
											})
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										style: S.glyphs,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: entry.backgroundMode === "continuable" ? S.modeChip : S.glyph,
												children: entry.backgroundMode === "continuable" ? "Continuable" : "One-shot"
											}),
											entry.reasoningEffort && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												style: S.glyph,
												children: ["Reasoning ", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: S.metaValue,
													children: entry.reasoningEffort
												})]
											}),
											entry.maxDepth !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												style: S.glyph,
												children: ["Depth ", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: S.metaValue,
													children: entry.maxDepth
												})]
											}),
											entry.maxTokens !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												style: S.glyph,
												children: [
													"Output ",
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														style: S.metaValue,
														children: entry.maxTokens.toLocaleString("en-US")
													}),
													" tokens"
												]
											}),
											entry.persona && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: S.glyph,
												children: "Persona"
											}),
											(entry.toolFilter?.deny?.length ?? 0) > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												style: S.glyph,
												children: [
													"Deny ",
													entry.toolFilter.deny.length,
													" tools"
												]
											}),
											(entry.toolFilter?.allow?.length ?? 0) > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												style: S.glyph,
												children: [
													"Allow ",
													entry.toolFilter.allow.length,
													" tools"
												]
											})
										]
									})
								]
							}),
							dirty && !isOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								style: S.draftActions,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										style: S.hint,
										children: "Save to apply"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: S.spacer }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: busy,
										onClick: (event) => {
											focusDisclosure(event);
											revertEntry(id);
										},
										style: S.ghost,
										children: "Revert"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: busy,
										onClick: (event) => {
											focusDisclosure(event);
											updateEntry(id, entry);
										},
										style: S.primary,
										children: "Save changes"
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								id: `${sectionId}-${id}`,
								hidden: !isOpen,
								children: isOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									style: S.body,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											style: S.group,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: S.groupTitle,
												children: "Overview"
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
												label: "Description (visible to the model)",
												hint: "This exact text is what list_subagents shows the model — state the role and when to use it",
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
													value: entry.description ?? "",
													onChange: (event) => patch(id, { description: event.target.value }),
													placeholder: "Role description",
													rows: 1,
													style: {
														...S.prose,
														overflow: "auto"
													}
												})
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											style: S.group,
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: S.groupTitle,
													children: "Routing & execution"
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: "dsh-library-grid",
													style: S.grid,
													children: [
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
															label: "Provider",
															hint: entry.routeNote === "foreign-ignored" ? "The shared-roster route is missing in the current profile; calls fall back to the session model. Saving empty will not change the shared route." : entry.routeNote === "profile" ? `Saved to profile ${view.profile ?? ""} only` : entry.routeNote === "inherit" ? "This profile always uses the session model and ignores the shared-roster route" : entry.routeNote === "profile-missing" ? "The Provider saved for this profile is not registered" : void 0,
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
																value: entry.provider ?? "",
																onChange: (event) => patch(id, { provider: event.target.value }),
																placeholder: "deepseek-official / kimi-coding",
																style: S.input
															})
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
															label: "Model",
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
																value: entry.model ?? "",
																onChange: (event) => patch(id, { model: event.target.value }),
																placeholder: "k3-256k",
																style: S.input
															})
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
															label: "Transport",
															hint: "Empty = spawn",
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
																value: entry.subagentProvider ?? "",
																onChange: (event) => patch(id, { subagentProvider: event.target.value }),
																placeholder: "spawn (default)",
																style: S.input
															})
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
															label: "Background mode",
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
																value: entry.backgroundMode ?? "one-shot",
																onChange: (event) => patch(id, { backgroundMode: event.target.value }),
																style: S.input,
																children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
																	value: "one-shot",
																	children: "one-shot"
																}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
																	value: "continuable",
																	children: "continuable"
																})]
															})
														})
													]
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: "dsh-library-grid",
													style: S.grid,
													children: [
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
															label: "Reasoning effort",
															hint: "Empty = parent session default",
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
																value: entry.reasoningEffort ?? "",
																onChange: (event) => patch(id, { reasoningEffort: event.target.value === "" ? void 0 : event.target.value.trim() }),
																placeholder: "max / high / medium / low",
																style: S.input
															})
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
															label: "Max depth",
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
																type: "number",
																min: 1,
																value: entry.maxDepth ?? "",
																onChange: (event) => patch(id, { maxDepth: event.target.value === "" ? void 0 : Number(event.target.value) }),
																style: S.input
															})
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
															label: "Max output",
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
																type: "number",
																min: 1,
																value: entry.maxTokens ?? "",
																onChange: (event) => patch(id, { maxTokens: event.target.value === "" ? void 0 : Number(event.target.value) }),
																placeholder: "tokens",
																style: S.input
															})
														})
													]
												})
											]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											style: S.group,
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: S.groupTitle,
													children: "Tools & prompt"
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
													label: "Denied tools",
													hint: "Comma-separated; empty means no restriction. A hand-written allow list is kept as-is",
													children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
														value: listToText(entry.toolFilter?.deny),
														onChange: (event) => setDeny(id, event.target.value),
														placeholder: "write, edit, todo_write, …",
														style: S.input
													})
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Field, {
													label: "Persona (optional)",
													children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AutoTextarea, {
														value: entry.persona ?? "",
														onChange: (event) => patch(id, { persona: event.target.value }),
														placeholder: "System prompt for the subagent",
														style: S.prose
													})
												})
											]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											style: S.actions,
											children: [
												dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: {
														...S.hint,
														color: DANGER
													},
													children: "This entry has unsaved changes"
												}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: S.hint,
													children: entry.source === "legacy" ? "Migrated copy from settings.yaml" : "In sync with the roster file"
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: S.spacer }),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													disabled: busy || !dirty,
													onClick: () => revertEntry(id),
													style: {
														...S.ghost,
														opacity: busy || !dirty ? .45 : 1
													},
													title: "Discard this row's unsaved changes and restore the server value",
													children: "Revert"
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													disabled: busy,
													onClick: () => removeEntry(id),
													style: {
														...S.danger,
														opacity: busy ? .55 : 1
													},
													children: "Delete"
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													disabled: busy || !dirty,
													onClick: () => updateEntry(id, entry),
													style: {
														...S.primary,
														opacity: busy || !dirty ? .5 : 1
													},
													children: "Save"
												})
											]
										})
									]
								})
							})
						]
					}, id);
				})
			}),
			status !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				role: "status",
				"aria-live": "polite",
				style: status.kind === "ok" ? BANNER.ok : BANNER.error,
				children: status.text
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
				style: S.footer,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", {
					style: S.footerSummary,
					children: "Storage & backup notes"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: S.hint,
					children: [
						"Config lives in the roster directory ",
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
							style: { fontFamily: MONO },
							children: view.dir || "~/.dsh/subagents"
						}),
						" (one per named subagent, ",
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: "<id>.yaml" }),
						" — hand-editable and hot-reloaded; ",
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: "_" }),
						"-prefixed files/dirs are non-roster content, e.g. ",
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: "_backups/" }),
						" backup area). Before letting an agent edit entries, copy the originals to ",
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", { children: "_backups/" }),
						". The legacy entries in settings.yaml are read only as a migration fallback; files take precedence."
					]
				})]
			})
		]
	});
}

//#endregion
//#region src/client/nav-icon.ts
/**
* Settings-nav icon decoration for this plugin's own row (Subagent Library).
*
* The official settings shell's navIcon(id) table is closed — official ids
* get drawn icons and everything else falls back to a generic gear. This
* replaces that fallback <svg> inside OUR nav button (matched by our own
* registered label text) with the drawn robot-head icon. A MutationObserver
* re-applies the icon when the panel re-renders; gated on the settings
* dialog being present so idle chat streams never pay the query cost.
*/
const NAV_ICON_INNER = "<path d=\"M8 6.5V3.9\"/><circle cx=\"8\" cy=\"2.6\" r=\"0.85\"/><rect x=\"3.25\" y=\"6.5\" width=\"9.5\" height=\"6.5\" rx=\"1.5\"/><path d=\"M5.75 9.25v1.25\"/><path d=\"M10.25 9.25v1.25\"/><path d=\"M1.75 9.25h1.5\"/><path d=\"M12.75 9.25h1.5\"/>";
const NAV_LABELS = new Set(["Subagent Library"]);
function decorateSettingsNavIcon(ctx) {
	ctx.effect(() => {
		const decorate = () => {
			if (document.querySelector("[role=\"dialog\"]") === null) return;
			for (const button$1 of Array.from(document.querySelectorAll("button"))) {
				const label = button$1.querySelector(":scope > span");
				if (label === null || !NAV_LABELS.has(label.textContent ?? "")) continue;
				const existing = button$1.firstElementChild;
				if (existing instanceof SVGElement) {
					if (existing.dataset.navIcon === "1") continue;
					const template = document.createElement("template");
					template.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-nav-icon="1">${NAV_ICON_INNER}</svg>`;
					existing.replaceWith(template.content.firstElementChild);
				}
			}
		};
		const observer = new MutationObserver(() => decorate());
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
		decorate();
		return () => observer.disconnect();
	}, "subagent-library: nav icon decoration");
}

//#endregion
//#region src/client/locales.ts
const zh = {
	"settings.title": "Subagent Library",
	"settings.hint": "Manage named role subagents. Changes apply live: the model uses them via list_subagents / delegate in any session.",
	"settings.empty": "Library is empty. Add the first entry to get started.",
	"settings.missing": "No subagent-library section found (plugin not loaded?).",
	"settings.add": "Add",
	"settings.addNew": "New subagent",
	"settings.delete": "Delete",
	"settings.save": "Save",
	"settings.saved": "Saved",
	"settings.conflict": "Config changed elsewhere; reloaded — please retry.",
	"settings.error": "Save failed: ",
	"settings.id": "ID",
	"settings.description": "Description",
	"settings.model": "Model",
	"settings.persona": "Persona",
	"settings.toolFilter": "Denied tools",
	"settings.maxDepth": "Max depth",
	"settings.background": "Background mode",
	"settings.provider": "Provider",
	"settings.sourceHint": "Stored at $DSH_HOME/settings.yaml under subagent-library.entries."
};
const en = {
	"settings.title": "Subagent Library",
	"settings.hint": "Manage named role subagents. Changes apply live: models use them via list_subagents / delegate in any session.",
	"settings.empty": "Library is empty. Add the first entry to get started.",
	"settings.missing": "No subagent-library section found (plugin not loaded?).",
	"settings.add": "Add",
	"settings.addNew": "New subagent",
	"settings.delete": "Delete",
	"settings.save": "Save",
	"settings.saved": "Saved",
	"settings.conflict": "Config changed elsewhere; reloaded — please retry.",
	"settings.error": "Save failed: ",
	"settings.id": "ID",
	"settings.description": "Description",
	"settings.model": "Model",
	"settings.persona": "Persona",
	"settings.toolFilter": "Denied tools",
	"settings.maxDepth": "Max depth",
	"settings.background": "Background",
	"settings.provider": "Provider",
	"settings.sourceHint": "Stored at $DSH_HOME/settings.yaml under subagent-library.entries."
};

//#endregion
//#region src/client/index.tsx
const NS = "subagent-library";
const API_PATH = "/subagent-library/api";
/** Host error codes that carry no `message`; map them to user-facing text. */
const ERROR_TEXT = {
	"not-ready": "Settings service not ready yet; try again shortly.",
	"readonly": "Settings service is read-only; cannot complete the operation.",
	"content-type-json-required": "Request rejected: writes accept JSON only.",
	"cross-origin-forbidden": "Request rejected: cross-origin write.",
	"body-too-large": "Request body exceeds the 1 MiB limit.",
	"bad-json": "Request body is not valid JSON.",
	"entries-object-required": "Missing the entries object.",
	"invalid-id": "Invalid entry ID.",
	"unknown-op": "Unknown operation.",
	"roster-unreadable": "Failed to read the roster directory.",
	"write-failed": "Failed to write the roster file.",
	"profile-path": "The current profile name cannot store an independent model route."
};
/** Map a wire view onto the UI model. Exported for the wire-contract tests —
*  a dropped field here silently kills UI features (k3 review: legacyCount). */
const parseView = (value) => ({
	writable: value.writable ?? true,
	dir: value.dir ?? "",
	hash: value.hash ?? "",
	entries: value.entries ?? {},
	diagnostics: value.diagnostics ?? [],
	legacyCount: value.legacyCount ?? 0,
	...typeof value.profile === "string" && value.profile !== "" ? { profile: value.profile } : {}
});
async function readView() {
	const response = await fetch(API_PATH, { cache: "no-store" });
	const body = await response.json();
	if (!response.ok || typeof body !== "object" || body === null || body.ok !== true) {
		const error = body?.error;
		const message = body?.message;
		throw new Error(message ?? (error !== void 0 ? ERROR_TEXT[error] : void 0) ?? "Subagent library API unavailable (plugin not loaded?)");
	}
	return parseView(body);
}
async function writeView(write) {
	try {
		const response = await fetch(API_PATH, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(write),
			cache: "no-store"
		});
		const body = await response.json();
		const wire = typeof body === "object" && body !== null ? body : {};
		if (response.status === 409) return {
			ok: false,
			conflict: true,
			view: wire.view !== void 0 ? parseView(wire.view) : void 0
		};
		if (!response.ok || wire.ok !== true) return {
			ok: false,
			message: wire.message ?? (wire.error !== void 0 ? ERROR_TEXT[wire.error] : void 0) ?? "Save failed"
		};
		return {
			ok: true,
			view: parseView(wire)
		};
	} catch (error) {
		return {
			ok: false,
			message: String(error)
		};
	}
}
const inject = [
	"slots",
	"locale",
	"remote"
];
function apply(ctx) {
	ctx.effect(() => ctx.locale.register(NS, {
		zh,
		en
	}), "subagent-library: dictionaries");
	const listeners = /* @__PURE__ */ new Set();
	const subscribeRefresh = (fn) => {
		listeners.add(fn);
		return () => {
			listeners.delete(fn);
		};
	};
	const refresh = (revision) => {
		for (const fn of listeners) try {
			fn(revision);
		} catch {}
	};
	ctx.effect(() => ctx.remote.$on("settings/document-updated", (ns, revision) => {
		if (ns === NS) refresh(revision);
	}), "subagent-library: settings invalidation");
	ctx.slots.inject("settings.section", () => ctx.slots.register({
		name: "settings.section",
		id: NS,
		order: 40,
		label: () => "Subagent Library",
		inject: () => ({
			readView,
			writeView,
			subscribeRefresh
		})
	}, LibrarySettings));
	decorateSettingsNavIcon(ctx);
}

//#endregion
exports.apply = apply;
exports.inject = inject;
exports.parseView = parseView;
return module.exports; } });
//# sourceMappingURL=client.js.map