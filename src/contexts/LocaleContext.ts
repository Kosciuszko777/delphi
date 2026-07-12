import { createContext } from 'react';
import type { Locale, TranslationDict } from '@/lib/i18n';

export interface LocaleContextType {
  /** Current locale code */
  locale: Locale;
  /** Switch to a different locale (persisted via AppConfig) */
  setLocale: (locale: Locale) => void;
  /** The active translation dictionary */
  dict: TranslationDict;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);
