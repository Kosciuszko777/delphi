import { useEffect, useRef, useState, useCallback } from 'react';
import { useSeoMeta } from '@unhead/react';
import { Link, useSearchParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Omphalos } from '@/components/wire/Omphalos';
import { CanonTab } from '@/components/canon/CanonTab';
import { OracleGate } from '@/components/oracle/OracleGate';
import { ClaimPending } from '@/components/oracle/ClaimPending';
import { ResidentConsent } from '@/components/oracle/ResidentConsent';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useWire } from '@/hooks/useWire';
import { useTranslation } from '@/hooks/useTranslation';
import { useOracleChat } from '@/hooks/useOracleChat';
import { useResidentChat } from '@/hooks/useResidentChat';
import { useClaimPending } from '@/hooks/useClaimPending';
import { useOracleEntitlement } from '@/hooks/useOracleEntitlement';
import { ORACLE_PRESETS } from '@/lib/oracle/prompt';
import { isWirePopulated } from '@/lib/wire';
import {
  RESIDENT_ENABLED,
  RESIDENT_INSTALLED_KEY,
  RESIDENT_MODE_PREF_KEY,
  isResidentInstalled,
  removeResidentModel,
  detectResidentSupport,
} from '@/lib/resident';
import { ArrowUp, Loader2, BookOpen, Sparkles, Trash2, Monitor, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/useToast';

type OracleMode = 'canon' | 'ai';
type AiMode = 'resident' | 'hosted' | 'high-oracle';
const DISCLAIMER_KEY = 'delphi:oracle-disclaimer-accepted';

export default function OraclePage() {
  const { wire } = useWire();
  const { t } = useTranslation();
  const [mode, setMode] = useState<OracleMode>('canon');
  const { entitlement } = useOracleEntitlement();
  const hostedChat = useOracleChat();
  const residentChat = useResidentChat();
  const { isPending, setPending, clearPending } = useClaimPending();
  const [accepted, setAccepted] = useLocalStorage<boolean>(DISCLAIMER_KEY, false);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Resident state
  const [installed, setInstalled] = useLocalStorage<boolean>(RESIDENT_INSTALLED_KEY, false);
  const [modePref, setModePref] = useLocalStorage<AiMode>(RESIDENT_MODE_PREF_KEY, 'hosted');

  // Determine actual AI mode: resident if installed + pref is resident, otherwise hosted
  const capable = detectResidentSupport() === 'webgpu';
  const isEntitled = entitlement !== 'free';
  const showResidentOffer = RESIDENT_ENABLED && isEntitled && capable && !installed;

  // The active AI mode
  const aiMode: AiMode = (() => {
    if (modePref === 'high-oracle' && entitlement === 'council') return 'high-oracle';
    if (installed && modePref === 'resident') return 'resident';
    return 'hosted';
  })();

  // Pick the active chat based on mode
  const isResident = aiMode === 'resident';
  const activeTurns = isResident ? residentChat.turns : hostedChat.turns;
  const activeSend = isResident ? residentChat.send : hostedChat.send;
  const activeThinking = isResident ? residentChat.isThinking : hostedChat.isThinking;
  const activeError = isResident ? residentChat.error : hostedChat.error;
  const activeAllowed = isResident ? true : hostedChat.allowed; // Resident is always allowed (unmetered)

  useSeoMeta({
    title: 'The Oracle — Delphi',
    description: 'Ask the Oracle — deterministic answers from the Delphi canon, or open AI conversation grounded in your Soulgraph.',
  });

  // Handle Stripe redirect: ?paid=1
  useEffect(() => {
    if (searchParams.get('paid') === '1') {
      setPending();
      searchParams.delete('paid');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setPending, setSearchParams]);

  // Clear pending when entitlement upgrades
  useEffect(() => {
    if (entitlement !== 'free' && isPending) {
      clearPending();
    }
  }, [entitlement, isPending, clearPending]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [activeTurns, activeThinking]);

  const populated = isWirePopulated(wire);

  const submit = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    void activeSend(text);
  };

  const handleRemoveModel = useCallback(async () => {
    await removeResidentModel();
    residentChat.resetEngine();
    setInstalled(false);
    setModePref('hosted');
    toast({ title: t('resident.removeConfirm') });
  }, [residentChat, setInstalled, setModePref, t]);

  const handleResidentInstalled = useCallback(() => {
    setInstalled(true);
    setModePref('resident');
  }, [setInstalled, setModePref]);

  const handleResidentDecline = useCallback(() => {
    setModePref('hosted');
  }, [setModePref]);

  // Determine if the gate should show (free + trial exhausted + not pending)
  const showGate = entitlement === 'free' && hostedChat.trialRemaining <= 0 && !isPending;
  const showPending = entitlement === 'free' && isPending;

  // Mode line text
  const modeLineText = (() => {
    if (aiMode === 'resident') return t('resident.modeLine.resident');
    if (aiMode === 'high-oracle') return t('resident.highOracle.modeLine');
    return t('resident.modeLine.hosted');
  })();

  const modeLineColor = aiMode === 'resident' ? 'text-verdigris' : 'text-ash';

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-6">
          <Omphalos className="size-8 text-oracle mx-auto mb-4" />
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
            {t('oracle.title')}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            {t('oracle.subtitle')}
          </p>
        </div>

        {/* Mode tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-full bg-card border border-border/50 p-1">
            <button
              onClick={() => setMode('canon')}
              className={cn(
                'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                mode === 'canon'
                  ? 'bg-oracle/10 text-oracle'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <BookOpen className="size-3.5" />
              {t('canon.tab')}
            </button>
            <button
              onClick={() => setMode('ai')}
              className={cn(
                'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                mode === 'ai'
                  ? 'bg-oracle/10 text-oracle'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Sparkles className="size-3.5" />
              {t('canon.aiTab')}
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* Canon tab */}
        {/* ═══════════════════════════════════════════ */}
        {mode === 'canon' && <CanonTab />}

        {/* ═══════════════════════════════════════════ */}
        {/* AI Oracle tab */}
        {/* ═══════════════════════════════════════════ */}
        {mode === 'ai' && (
          <>
            {!populated ? (
              <div className="engraved grain rounded-[2px] bg-card p-8 text-center space-y-3">
                <p className="font-serif text-foreground">{t('oracle.unwritten')}</p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/assess">{t('oracle.beginAssessment')}</Link>
                </Button>
              </div>
            ) : !hostedChat.isAuthenticated ? (
              <div className="engraved grain rounded-[2px] bg-card p-8 text-center">
                <p className="font-serif text-foreground">{t('oracle.signIn')}</p>
                <p className="text-xs text-muted-foreground mt-2">{t('oracle.signInNote')}</p>
              </div>
            ) : showGate ? (
              <OracleGate />
            ) : showPending ? (
              <ClaimPending />
            ) : !accepted ? (
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
            ) : showResidentOffer && modePref !== 'hosted' ? (
              /* ─── Resident Consent ─── */
              <ResidentConsent
                onInstalled={handleResidentInstalled}
                onDecline={handleResidentDecline}
              />
            ) : (
              <div className="space-y-4">
                {/* Council mode toggle: Resident / High Oracle */}
                {entitlement === 'council' && installed && (
                  <div className="flex justify-center">
                    <div className="inline-flex rounded-full bg-card border border-border/50 p-0.5">
                      <button
                        onClick={() => setModePref('resident')}
                        className={cn(
                          'flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors',
                          aiMode === 'resident'
                            ? 'bg-verdigris/10 text-verdigris'
                            : 'text-muted-foreground hover:text-foreground',
                        )}
                      >
                        <Smartphone className="size-3" />
                        {t('resident.modeToggle.resident')}
                      </button>
                      <button
                        onClick={() => setModePref('high-oracle')}
                        className={cn(
                          'flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors',
                          aiMode === 'high-oracle'
                            ? 'bg-oracle/10 text-oracle'
                            : 'text-muted-foreground hover:text-foreground',
                        )}
                      >
                        <Monitor className="size-3" />
                        {t('resident.modeToggle.highOracle')}
                      </button>
                    </div>
                  </div>
                )}

                {/* Turns */}
                {activeTurns.length === 0 ? (
                  <div className="engraved grain rounded-[2px] bg-card p-6 space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                      {t('oracle.askPrompt')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {ORACLE_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          onClick={() => void activeSend(preset)}
                          disabled={activeThinking || !activeAllowed}
                          className="engraved rounded-full px-4 py-2 text-xs text-foreground hover:bg-oracle/5 transition-colors disabled:opacity-50"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeTurns.map((turn, i) => (
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

                {activeError && <p className="text-xs text-destructive text-center">{activeError}</p>}

                {/* Composer or exhausted state */}
                {activeAllowed ? (
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
                      disabled={activeThinking}
                    />
                    <Button
                      size="icon"
                      onClick={submit}
                      disabled={activeThinking || !input.trim()}
                      className="rounded-full bg-oracle text-oracle-foreground hover:bg-oracle/90 shrink-0"
                      aria-label="Send"
                    >
                      {activeThinking ? <Loader2 className="size-4 animate-spin" /> : <ArrowUp className="size-4" />}
                    </Button>
                  </div>
                ) : (
                  <div className="engraved rounded-[2px] bg-oracle/5 p-5 text-center space-y-3">
                    <p className="font-serif text-foreground">
                      {t('oracle.exhausted', { limit: String(hostedChat.monthlyLimit) })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('oracle.exhausted.note')}
                    </p>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => setMode('canon')}
                    >
                      {t('canon.crossLink')}
                    </Button>
                    <div className="flex flex-col items-center gap-2 pt-1">
                      <Button asChild variant="outline" className="rounded-full">
                        <Link to="/council">The Council of the Temple</Link>
                      </Button>
                      <p className="text-[11px]">
                        <Link to="/support" className="text-muted-foreground hover:text-foreground underline underline-offset-2 decoration-dotted">
                          {t('oracle.exhausted.support')}
                        </Link>
                      </p>
                    </div>
                  </div>
                )}

                {/* Mode line + remove model action */}
                <div className="flex items-center justify-center gap-3">
                  <p className={cn('text-center font-mono text-[11px]', modeLineColor)}>
                    {modeLineText}
                  </p>
                  {installed && !isResident && (
                    <button
                      onClick={handleRemoveModel}
                      className="text-[11px] text-muted-foreground hover:text-destructive transition-colors inline-flex items-center gap-1"
                      title={t('resident.remove')}
                    >
                      <Trash2 className="size-3" />
                    </button>
                  )}
                </div>

                {/* Hosted meter line (only in hosted/high-oracle mode) */}
                {!isResident && (
                  <p className="text-center font-mono text-[11px] text-ash">
                    {hostedChat.isCouncillor
                      ? t('oracle.meter.council')
                      : entitlement === 'initiate'
                        ? t('oracle.meter.initiate', { remaining: String(hostedChat.freeRemaining), limit: String(hostedChat.monthlyLimit) })
                        : t('oracle.meter.trial', { remaining: String(hostedChat.trialRemaining), limit: String(hostedChat.trialLimit) })}
                  </p>
                )}

                {/* Offer resident install for entitled users who haven't installed */}
                {showResidentOffer && modePref === 'hosted' && activeTurns.length === 0 && (
                  <div className="text-center pt-2">
                    <button
                      onClick={() => setModePref('resident')}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 decoration-dotted"
                    >
                      {t('resident.install')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
