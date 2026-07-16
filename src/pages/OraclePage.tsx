import { useEffect, useRef, useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Omphalos } from '@/components/wire/Omphalos';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useWire } from '@/hooks/useWire';
import { useTranslation } from '@/hooks/useTranslation';
import { useOracleChat } from '@/hooks/useOracleChat';
import { ORACLE_PRESETS } from '@/lib/oracle/prompt';
import { isWirePopulated } from '@/lib/wire';
import { CreditsError, isCreditsError } from '@/components/CreditsError';
import { ArrowUp, Loader2 } from 'lucide-react';

const DISCLAIMER_KEY = 'delphi:oracle-disclaimer-accepted';

export default function OraclePage() {
  const { wire } = useWire();
  const { t } = useTranslation();
  const {
    turns, send, isThinking, error,
    entitlement, isCouncillor, monthlyLimit, freeRemaining, allowed, isAuthenticated,
  } = useOracleChat();
  const [accepted, setAccepted] = useLocalStorage<boolean>(DISCLAIMER_KEY, false);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useSeoMeta({
    title: 'The Oracle — Delphi',
    description: 'Ask the Oracle — applied guidance grounded in your self-verified Wire across four systems.',
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [turns, isThinking]);

  const populated = isWirePopulated(wire);

  const submit = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    void send(text);
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Omphalos className="size-8 text-oracle mx-auto mb-4" />
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
            {t('oracle.title')}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            {t('oracle.subtitle')}
          </p>
        </div>

        {/* Gates */}
        {!populated ? (
          <div className="engraved grain rounded-[2px] bg-card p-8 text-center space-y-3">
            <p className="font-serif text-foreground">{t('oracle.unwritten')}</p>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/assess">{t('oracle.beginAssessment')}</Link>
            </Button>
          </div>
        ) : !isAuthenticated ? (
          <div className="engraved grain rounded-[2px] bg-card p-8 text-center">
            <p className="font-serif text-foreground">{t('oracle.signIn')}</p>
            <p className="text-xs text-muted-foreground mt-2">{t('oracle.signInNote')}</p>
          </div>
        ) : !accepted ? (
          /* Disclaimer — shown once, before the first message */
          <div className="engraved grain rounded-[2px] bg-card p-6 sm:p-8 space-y-5">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-umbra dark:text-ash">
              {t('oracle.disclaimer.title')}
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-foreground">
              <p>{t('oracle.disclaimer.p1')}</p>
              <p>{t('oracle.disclaimer.p2')}</p>
              <p className="text-muted-foreground text-xs">{t('oracle.disclaimer.p3')}</p>
            </div>
            <Button
              onClick={() => setAccepted(true)}
              className="rounded-full bg-oracle text-oracle-foreground hover:bg-oracle/90 px-6"
            >
              {t('oracle.disclaimer.accept')}
            </Button>
          </div>
        ) : (
          /* The chamber */
          <div className="space-y-4">
            {/* Turns */}
            {turns.length === 0 ? (
              <div className="engraved grain rounded-[2px] bg-card p-6 space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  {t('oracle.askPrompt')}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {ORACLE_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => void send(preset)}
                      disabled={isThinking || !allowed}
                      className="engraved rounded-full px-4 py-2 text-xs text-foreground hover:bg-oracle/5 transition-colors disabled:opacity-50"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {turns.map((turn, i) => (
                  <div key={i} className={turn.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                    {turn.role === 'user' ? (
                      <div className="max-w-[85%] rounded-[2px] bg-secondary px-4 py-3 text-sm text-foreground leading-relaxed">
                        {turn.content}
                      </div>
                    ) : (
                      <div className="max-w-[92%] flex gap-3">
                        <Omphalos className="size-4 text-oracle shrink-0 mt-1.5" />
                        <div className="engraved rounded-[2px] bg-card px-4 py-3 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                          {turn.content || (
                            <Loader2 className="size-4 animate-spin text-oracle" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            )}

            {error && (
              isCreditsError(error)
                ? <CreditsError />
                : <p className="text-xs text-destructive text-center">{error}</p>
            )}

            {/* Composer or exhausted state */}
            {allowed ? (
              <div className="engraved rounded-[2px] bg-card p-3 flex items-end gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      submit();
                    }
                  }}
                  placeholder={t('oracle.placeholder')}
                  rows={2}
                  className="resize-none border-0 bg-transparent focus-visible:ring-0 text-sm"
                  disabled={isThinking}
                />
                <Button
                  size="icon"
                  onClick={submit}
                  disabled={isThinking || !input.trim()}
                  className="rounded-full bg-oracle text-oracle-foreground hover:bg-oracle/90 shrink-0"
                  aria-label="Send"
                >
                  {isThinking ? <Loader2 className="size-4 animate-spin" /> : <ArrowUp className="size-4" />}
                </Button>
              </div>
            ) : (
              <div className="engraved rounded-[2px] bg-oracle/5 p-5 text-center space-y-3">
                <p className="font-serif text-foreground">
                  {t('oracle.exhausted', { limit: String(monthlyLimit) })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('oracle.exhausted.note')}
                </p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/council">The Council of the Temple</Link>
                </Button>
                <p className="text-[11px]">
                  <Link to="/support" className="text-muted-foreground hover:text-foreground underline underline-offset-2 decoration-dotted">
                    {t('oracle.exhausted.support')}
                  </Link>
                </p>
              </div>
            )}

            {/* Meter line */}
            <p className="text-center font-mono text-[11px] text-ash">
              {isCouncillor
                ? t('oracle.meter.council')
                : entitlement === 'initiate'
                  ? t('oracle.meter.initiate', { remaining: String(freeRemaining), limit: String(monthlyLimit) })
                  : t('oracle.meter.free', { remaining: String(freeRemaining), limit: String(monthlyLimit) })}
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
