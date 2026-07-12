/** Supported locales. German is the default. */
export type Locale = 'de' | 'en' | 'es' | 'fr' | 'zh' | 'ru' | 'el';

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'el', label: 'Ελληνικά', flag: '🇬🇷' },
];

export const DEFAULT_LOCALE: Locale = 'de';

/** A flat dictionary of translation keys to strings. */
export type TranslationDict = Record<string, string>;
