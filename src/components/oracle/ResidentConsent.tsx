import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Omphalos } from '@/components/wire/Omphalos';
import { useTranslation } from '@/hooks/useTranslation';
import { useOracleEntitlement } from '@/hooks/useOracleEntitlement';
import {
  RESIDENT_MODEL_SIZE_GB,
  loadResidentModel,
  isResidentInstalled,
  detectResidentSupport,
  type LoadProgress,
} from '@/lib/resident';
import { Download, RefreshCw } from 'lucide-react';

interface ResidentConsentProps {
  /** Called when download completes — parent should flip to resident mode. */
  onInstalled: () => void;
  /** Called when user chooses "not now" — parent stays on hosted. */
  onDecline: () => void;
}

/**
 * The Resident Oracle consent flow — shown on the AI tab for entitled
 * users whose device supports WebGPU and who haven't installed the model.
 */
export function ResidentConsent({ onInstalled, onDecline }: ResidentConsentProps) {
  const { t } = useTranslation();
  const { entitlement } = useOracleEntitlement();
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState<LoadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runtime = detectResidentSupport();

  const startDownload = useCallback(async () => {
    setError(null);
    setDownloading(true);
    setProgress({ text: '', progress: 0 });

    try {
      await loadResidentModel(entitlement, (p) => {
        setProgress(p);
      });
      onInstalled();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setDownloading(false);
    }
  }, [entitlement, onInstalled]);

  // Unsupported device — calm one-liner
  if (runtime === 'none') {
    return (
      <div className="engraved grain rounded-[2px] bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('resident.unsupported')}
        </p>
      </div>
    );
  }

  // Already installed — shouldn't render, but guard
  if (isResidentInstalled()) {
    return null;
  }

  return (
    <div className="engraved grain rounded-[2px] bg-card p-6 sm:p-8 space-y-5">
      {/* Eyebrow */}
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-umbra dark:text-ash text-center">
        {t('resident.eyebrow')}
      </p>

      {/* Icon */}
      <Omphalos className="size-7 text-oracle mx-auto" />

      {/* Heading */}
      <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground text-center max-w-md mx-auto leading-snug">
        {t('resident.heading')}
      </h2>

      {/* Body */}
      <p className="text-sm text-muted-foreground leading-relaxed text-center max-w-md mx-auto">
        {t('resident.body')}
      </p>

      {/* Download progress */}
      {downloading && progress && (
        <div className="space-y-2 max-w-sm mx-auto">
          <Progress
            value={Math.round(progress.progress * 100)}
            className="h-2"
          />
          <div className="flex items-center justify-between text-[11px] font-mono text-ash">
            <span>{t('resident.downloading')}</span>
            <span>
              {Math.round(progress.progress * 100)}% ·{' '}
              {(progress.progress * RESIDENT_MODEL_SIZE_GB * 1024).toFixed(0)} /{' '}
              {(RESIDENT_MODEL_SIZE_GB * 1024).toFixed(0)} MB
            </span>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center space-y-2">
          <p className="text-xs text-destructive">{t('resident.downloadError')}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={startDownload}
            className="rounded-full gap-1.5"
          >
            <RefreshCw className="size-3.5" />
            {t('resident.retry')}
          </Button>
        </div>
      )}

      {/* Buttons */}
      {!downloading && !error && (
        <div className="flex flex-col items-center gap-3">
          <Button
            onClick={startDownload}
            className="rounded-full gap-1.5 bg-oracle text-oracle-foreground hover:bg-oracle/90 px-6"
          >
            <Download className="size-4" />
            {t('resident.install')}
          </Button>
          <button
            onClick={onDecline}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 decoration-dotted"
          >
            {t('resident.notNow')}
          </button>
        </div>
      )}
    </div>
  );
}
