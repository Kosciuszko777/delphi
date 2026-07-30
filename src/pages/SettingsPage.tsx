import { useSeoMeta } from '@unhead/react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useOracleEntitlement } from '@/hooks/useOracleEntitlement';
import {
  RESIDENT_MODEL_SIZE_GB,
  RESIDENT_CPU_MODEL_SIZE_GB,
  RESIDENT_INSTALLED_KEY,
  RESIDENT_MODE_PREF_KEY,
  isResidentInstalled,
  installedRuntime,
  removeResidentModel,
} from '@/lib/resident';
import { Trash2, Check, X } from 'lucide-react';
import { toast } from '@/hooks/useToast';
import { useCallback } from 'react';

export default function SettingsPage() {
  const { t } = useTranslation();
  const { entitlement } = useOracleEntitlement();
  const [, setInstalled] = useLocalStorage<boolean>(RESIDENT_INSTALLED_KEY, false);
  const [modePref, setModePref] = useLocalStorage<string>(RESIDENT_MODE_PREF_KEY, 'hosted');

  const installed = isResidentInstalled();
  const runtime = installedRuntime();
  const modelSizeGb = runtime === 'wllama' ? RESIDENT_CPU_MODEL_SIZE_GB : RESIDENT_MODEL_SIZE_GB;

  useSeoMeta({
    title: 'Settings — Delphi',
  });

  const handleRemove = useCallback(async () => {
    await removeResidentModel();
    setInstalled(false);
    setModePref('hosted');
    toast({ title: t('resident.removeConfirm') });
  }, [setInstalled, setModePref, t]);

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="font-serif text-3xl font-medium text-foreground mb-8">
          Settings
        </h1>

        {/* Oracle section */}
        <section className="space-y-4">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-umbra dark:text-ash">
            {t('settings.oracle.title')}
          </h2>

          <div className="engraved grain rounded-[2px] bg-card p-6 space-y-5">
            {/* Resident model status */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t('settings.oracle.modelInstalled')}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {installed
                    ? t('settings.oracle.modelSize', { size: String(modelSizeGb) })
                      + (runtime === 'wllama' ? ' · CPU' : '')
                    : t('settings.oracle.modelNotInstalled')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {installed ? (
                  <>
                    <Check className="size-4 text-verdigris" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemove}
                      className="text-muted-foreground hover:text-destructive gap-1"
                    >
                      <Trash2 className="size-3.5" />
                      {t('settings.oracle.removeModel')}
                    </Button>
                  </>
                ) : (
                  <X className="size-4 text-ash" />
                )}
              </div>
            </div>

            {/* Mode preference */}
            {installed && entitlement !== 'free' && (
              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <p className="text-sm font-medium text-foreground">
                  {t('settings.oracle.modePreference')}
                </p>
                <div className="inline-flex rounded-full bg-background border border-border/50 p-0.5">
                  <button
                    onClick={() => setModePref('resident')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      modePref === 'resident'
                        ? 'bg-verdigris/10 text-verdigris'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t('settings.oracle.mode.resident')}
                  </button>
                  <button
                    onClick={() => setModePref('hosted')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      modePref === 'hosted' || modePref === 'high-oracle'
                        ? 'bg-oracle/10 text-oracle'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t('settings.oracle.mode.hosted')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
