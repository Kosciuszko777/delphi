import type { Locale, TranslationDict } from './types';
export type { Locale, TranslationDict } from './types';
export { LOCALES, DEFAULT_LOCALE } from './types';

// Eagerly import all translation dictionaries.
// The files are small key-value maps so tree-shaking / code-splitting
// would add latency with negligible size savings.
import de from './de';
import en from './en';
import es from './es';
import fr from './fr';
import zh from './zh';
import ru from './ru';
import el from './el';

const dictionaries: Record<Locale, TranslationDict> = { de, en, es, fr, zh, ru, el };

/** Return the dictionary for a locale. Falls back to German (default). */
export function getDictionary(locale: Locale): TranslationDict {
  return dictionaries[locale] ?? dictionaries.de;
}

/**
 * Interpolate `{placeholder}` tokens in a translated string.
 *
 * ```ts
 * interpolate('Hello {name}, you have {count} items', { name: 'Max', count: '3' })
 * // → 'Hello Max, you have 3 items'
 * ```
 */
export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}
