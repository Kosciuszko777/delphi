import { ExternalLink, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

const SHAKESPEARE_SETTINGS_URL = 'https://shakespeare.diy/settings/ai';

/** Detects whether an error message is a credits-related API error. */
export function isCreditsError(error: string | null): boolean {
  if (!error) return false;
  const lower = error.toLowerCase();
  return (
    lower.includes('credits') ||
    lower.includes('insufficient') ||
    lower.includes('run out of') ||
    lower.includes('insufficient_quota')
  );
}

/**
 * A styled error card shown when Shakespeare AI credits are exhausted.
 * Links directly to Shakespeare settings where users can add credits.
 */
export function CreditsError() {
  const { t } = useTranslation();

  return (
    <div className="engraved grain rounded-[2px] bg-oracle/5 p-5 sm:p-6 text-center space-y-4">
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center size-10 rounded-full bg-oracle/10 text-oracle">
          <Zap className="size-5" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-serif text-lg font-medium text-foreground">
          {t('credits.exhausted.title')}
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          {t('credits.exhausted.desc')}
        </p>
      </div>

      <Button
        asChild
        className="rounded-full gap-2 bg-oracle text-oracle-foreground hover:bg-oracle/90 px-6"
      >
        <a href={SHAKESPEARE_SETTINGS_URL} target="_blank" rel="noopener noreferrer">
          {t('credits.exhausted.addCredits')}
          <ExternalLink className="size-3.5" />
        </a>
      </Button>

      <p className="text-[11px] text-muted-foreground leading-relaxed max-w-sm mx-auto">
        {t('credits.exhausted.note')}
      </p>
    </div>
  );
}
