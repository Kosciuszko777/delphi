import { useContext, useCallback } from 'react';
import { LocaleContext, type LocaleContextType } from '@/contexts/LocaleContext';
import { interpolate, type Locale } from '@/lib/i18n';

export interface UseTranslationReturn {
  /** Current locale code */
  locale: Locale;
  /** Switch locale */
  setLocale: (locale: Locale) => void;
  /**
   * Translate a key.
   *
   * Supports `{placeholder}` interpolation:
   * ```ts
   * t('wire.subtitle.hasWire', { filled: '2', total: '4' })
   * ```
   */
  t: (key: string, vars?: Record<string, string | number>) => string;
}

export function useTranslation(): UseTranslationReturn {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useTranslation must be used within a LocaleProvider');

  const { locale, setLocale, dict } = ctx as LocaleContextType;

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const raw = dict[key];
      if (raw === undefined) {
        // Dev-time warning; returns key as fallback so the UI never shows undefined.
        if (import.meta.env.DEV) {
          console.warn(`[i18n] Missing key "${key}" for locale "${locale}"`);
        }
        return key;
      }
      return vars ? interpolate(raw, vars) : raw;
    },
    [dict, locale],
  );

  return { locale, setLocale, t };
}
