/**
 * Settings dictionary for the subagent library (minimal: zh primary, en fallback).
 * The namespace merge into LocaleNamespaceMap is what makes the slot-level
 * `locale` seat and the typed `t` prop work.
 */
import type {} from '@deepseek-ai/dsh-client-ui-slots'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    'subagent-library': SubagentLibraryKey
  }
}

export type SubagentLibraryKey =
  | 'settings.title'
  | 'settings.hint'
  | 'settings.empty'
  | 'settings.missing'
  | 'settings.add'
  | 'settings.addNew'
  | 'settings.delete'
  | 'settings.save'
  | 'settings.saved'
  | 'settings.conflict'
  | 'settings.error'
  | 'settings.id'
  | 'settings.description'
  | 'settings.model'
  | 'settings.persona'
  | 'settings.toolFilter'
  | 'settings.maxDepth'
  | 'settings.background'
  | 'settings.provider'
  | 'settings.sourceHint'

export const zh: Record<SubagentLibraryKey, string> = {
  'settings.title': 'Subagent Library',
  'settings.hint': 'Manage named role subagents. Changes apply live: the model uses them via list_subagents / delegate in any session.',
  'settings.empty': 'Library is empty. Add the first entry to get started.',
  'settings.missing': 'No subagent-library section found (plugin not loaded?).',
  'settings.add': 'Add',
  'settings.addNew': 'New subagent',
  'settings.delete': 'Delete',
  'settings.save': 'Save',
  'settings.saved': 'Saved',
  'settings.conflict': 'Config changed elsewhere; reloaded — please retry.',
  'settings.error': 'Save failed: ',
  'settings.id': 'ID',
  'settings.description': 'Description',
  'settings.model': 'Model',
  'settings.persona': 'Persona',
  'settings.toolFilter': 'Denied tools',
  'settings.maxDepth': 'Max depth',
  'settings.background': 'Background mode',
  'settings.provider': 'Provider',
  'settings.sourceHint': 'Stored at $DSH_HOME/settings.yaml under subagent-library.entries.',
}

export const en: Record<SubagentLibraryKey, string> = {
  'settings.title': 'Subagent Library',
  'settings.hint': 'Manage named role subagents. Changes apply live: models use them via list_subagents / delegate in any session.',
  'settings.empty': 'Library is empty. Add the first entry to get started.',
  'settings.missing': 'No subagent-library section found (plugin not loaded?).',
  'settings.add': 'Add',
  'settings.addNew': 'New subagent',
  'settings.delete': 'Delete',
  'settings.save': 'Save',
  'settings.saved': 'Saved',
  'settings.conflict': 'Config changed elsewhere; reloaded — please retry.',
  'settings.error': 'Save failed: ',
  'settings.id': 'ID',
  'settings.description': 'Description',
  'settings.model': 'Model',
  'settings.persona': 'Persona',
  'settings.toolFilter': 'Denied tools',
  'settings.maxDepth': 'Max depth',
  'settings.background': 'Background',
  'settings.provider': 'Provider',
  'settings.sourceHint': 'Stored at $DSH_HOME/settings.yaml under subagent-library.entries.',
}
