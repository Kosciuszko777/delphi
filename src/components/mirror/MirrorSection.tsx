import { useWire } from '@/hooks/useWire';
import { useMirror } from '@/hooks/useMirror';
import { useTranslation } from '@/hooks/useTranslation';
import { filledChamberCount, TOTAL_CHAMBERS } from '@/lib/wire';
import type { MirrorReading } from '@/lib/mirror/schema';
import { Button } from '@/components/ui/button';
import { Omphalos } from '@/components/wire/Omphalos';
import { Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * The Mirror — "Do you recognize yourself?"
 * A one-shot synthesis of all four chambers across the main sections
 * of a life: purpose, happiness, work, relationships, team, joys,
 * aversions — and the four fives.
 */
export function MirrorSection() {
  const { wire } = useWire();
  const { t } = useTranslation();
  const { reading, isStale, isGenerating, error, generate, isAuthenticated } = useMirror();

  const filled = filledChamberCount(wire);
  const complete = filled === TOTAL_CHAMBERS;

  return (
    <section className="mt-4">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-umbra dark:text-ash mb-2">
          {t('mirror.title')}
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground">
          {t('mirror.subtitle')}
        </h2>
      </div>

      {/* Locked: the mirror is ground from four chambers */}
      {!complete && (
        <div className="engraved grain rounded-[2px] bg-card p-6 text-center">
          <p className="font-serif text-foreground">
            {t('mirror.locked')}
          </p>
          <p className="font-mono text-xs text-ash mt-2">
            {t('mirror.remaining', { count: String(TOTAL_CHAMBERS - filled), total: String(TOTAL_CHAMBERS) })}
          </p>
        </div>
      )}

      {/* Ready, not yet consulted */}
      {complete && !reading && (
        <div className="engraved grain rounded-[2px] bg-card p-8 text-center space-y-4">
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed text-sm">
            {t('mirror.ready')}
          </p>
          {!isAuthenticated ? (
            <p className="text-xs text-muted-foreground">{t('mirror.signIn')}</p>
          ) : (
            <Button
              onClick={generate}
              disabled={isGenerating}
              className="rounded-full gap-1.5 bg-oracle text-oracle-foreground hover:bg-oracle/90 px-6"
            >
              {isGenerating ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              {isGenerating ? t('mirror.polishing') : t('mirror.consult')}
            </Button>
          )}
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      )}

      {/* The reading */}
      {complete && reading && (
        <div className="space-y-4">
          {isStale && (
            <div className="engraved rounded-[2px] bg-oracle/5 px-4 py-3 flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                {t('mirror.stale')}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={generate}
                disabled={isGenerating}
                className="rounded-full gap-1.5 shrink-0"
              >
                {isGenerating ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
                {t('mirror.regenerate')}
              </Button>
            </div>
          )}

          <Reading reading={reading} />

          {/* The Mirror shows; the Oracle answers */}
          <div className="text-center pt-2">
            <Link
              to="/oracle"
              className="font-serif text-sm text-oracle hover:underline underline-offset-4"
            >
              {t('mirror.oracleLink')}
            </Link>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] text-muted-foreground leading-relaxed max-w-md">
              {t('mirror.disclaimer')}
            </p>
            {!isStale && (
              <Button
                variant="ghost"
                size="sm"
                onClick={generate}
                disabled={isGenerating}
                className="rounded-full gap-1.5 text-muted-foreground shrink-0"
              >
                {isGenerating ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
                {t('mirror.regenerate')}
              </Button>
            )}
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      )}
    </section>
  );
}

function Reading({ reading }: { reading: MirrorReading }) {
  const { t } = useTranslation();

  const prose: Array<{ title: string; text: string }> = [
    { title: t('mirror.purpose'), text: reading.purpose },
    { title: t('mirror.happiness'), text: reading.happiness },
    { title: t('mirror.work'), text: reading.work },
    { title: t('mirror.relationships'), text: reading.relationships },
    { title: t('mirror.team'), text: reading.team },
    { title: t('mirror.enjoys'), text: reading.enjoys },
    { title: t('mirror.hates'), text: reading.hates },
  ];

  const lists: Array<{ title: string; items: string[]; tone?: 'gold' | 'shadow' | 'verdigris' }> = [
    { title: t('mirror.positiveTraits'), items: reading.positiveTraits, tone: 'gold' },
    { title: t('mirror.negativeTraits'), items: reading.negativeTraits, tone: 'shadow' },
    { title: t('mirror.superpowers'), items: reading.superpowers, tone: 'gold' },
    { title: t('mirror.improvements'), items: reading.improvements, tone: 'verdigris' },
  ];

  return (
    <div className="engraved grain rounded-[2px] bg-card p-6 sm:p-8 space-y-8">
      <Omphalos className="size-6 text-oracle mx-auto" />

      {/* Prose sections */}
      <div className="space-y-6">
        {prose.map((s) => (
          <div key={s.title}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-umbra dark:text-ash mb-1.5">
              {s.title}
            </h3>
            <p className="text-sm sm:text-[15px] leading-relaxed text-foreground">
              {s.text}
            </p>
          </div>
        ))}
      </div>

      {/* The four fives */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {lists.map((l) => (
          <div key={l.title} className="engraved rounded-[2px] bg-background/40 p-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-umbra dark:text-ash mb-3">
              {l.title}
            </h3>
            <ul className="space-y-1.5">
              {l.items.map((item, i) => (
                <li key={i} className="flex items-baseline gap-2 text-sm text-foreground">
                  <span
                    className={
                      l.tone === 'gold'
                        ? 'font-mono text-oracle shrink-0'
                        : l.tone === 'verdigris'
                          ? 'font-mono text-verdigris shrink-0'
                          : 'font-mono text-ash shrink-0'
                    }
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
