import { ReactNode, useMemo } from 'react';
import { useAppContext } from '@/hooks/useAppContext';
import { LocaleContext, type LocaleContextType } from '@/contexts/LocaleContext';
import { getDictionary, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const { config, updateConfig } = useAppContext();
  const locale: Locale = config.locale ?? DEFAULT_LOCALE;
  const dict = useMemo(() => getDictionary(locale), [locale]);

  const setLocale = (next: Locale) => {
    updateConfig((c) => ({ ...c, locale: next }));
  };

  const value: LocaleContextType = useMemo(
    () => ({ locale, setLocale, dict }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale, dict],
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}
