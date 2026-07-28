import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nip19 } from 'nostr-tools';
import { Button } from '@/components/ui/button';
import { QRCodeCanvas } from '@/components/ui/qrcode';
import { Omphalos } from '@/components/wire/Omphalos';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useTranslation } from '@/hooks/useTranslation';
import { useClaimPending } from '@/hooks/useClaimPending';
import {
  PLAN_INITIATE_STRIPE,
  PLAN_INITIATE_CHF,
  PLAN_INITIATE_YEARLY_CHF,
  SUPPORT_LIGHTNING_ADDRESS,
} from '@/lib/support/config';
import { CreditCard, Zap, Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/useToast';

/**
 * The Oracle Gate — shown to free-tier users whose trial is exhausted.
 * Presents the Initiate subscription as the path to the AI Oracle.
 */
export function OracleGate() {
  const { t } = useTranslation();
  const { user } = useCurrentUser();
  const { setPending } = useClaimPending();
  const [showLightning, setShowLightning] = useState(false);
  const [copied, setCopied] = useState(false);

  const npub = user ? nip19.npubEncode(user.pubkey) : undefined;
  const lnurl = SUPPORT_LIGHTNING_ADDRESS;
  const stripeHref = PLAN_INITIATE_STRIPE
    ? `${PLAN_INITIATE_STRIPE}${npub ? `?client_reference_id=${npub}` : ''}`
    : undefined;

  const hasCheckout = !!(lnurl || stripeHref);

  const copyAddress = async () => {
    if (!lnurl) return;
    await navigator.clipboard.writeText(lnurl);
    setCopied(true);
    toast({ title: t('common.lightningCopied') });
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="engraved grain rounded-[2px] bg-card p-6 sm:p-8 space-y-6">
      <div className="text-center space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-umbra dark:text-ash">
          {t('oracle.gate.eyebrow')}
        </p>
        <Omphalos className="size-7 text-oracle mx-auto" />
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground max-w-md mx-auto leading-snug">
          {t('oracle.gate.heading')}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          {t('oracle.gate.body')}
        </p>
      </div>

      {/* Price line */}
      <p className="text-center font-mono text-sm text-oracle">
        {t('oracle.gate.price', {
          chf: String(PLAN_INITIATE_CHF),
          yearly: String(PLAN_INITIATE_YEARLY_CHF),
        })}
      </p>

      {hasCheckout ? (
        <div className="space-y-4">
          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {stripeHref && (
              <Button asChild className="rounded-full gap-1.5 bg-oracle text-oracle-foreground hover:bg-oracle/90 px-6">
                <a href={stripeHref} target="_blank" rel="noopener noreferrer">
                  <CreditCard className="size-4" />
                  {t('oracle.gate.card')}
                </a>
              </Button>
            )}
            {lnurl && (
              <Button
                onClick={() => setShowLightning((s) => !s)}
                variant={stripeHref ? 'outline' : 'default'}
                className={`rounded-full gap-1.5 px-6 ${!stripeHref ? 'bg-oracle text-oracle-foreground hover:bg-oracle/90' : ''}`}
              >
                <Zap className="size-4" />
                {t('oracle.gate.lightning')}
              </Button>
            )}
          </div>

          {/* LN QR panel */}
          {showLightning && lnurl && (
            <div className="engraved rounded-[2px] bg-background/40 p-6 max-w-sm mx-auto text-center space-y-4">
              <QRCodeCanvas value={`lightning:${lnurl}`} size={208} className="mx-auto rounded-sm" />
              <button
                onClick={copyAddress}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? <Check className="size-3 text-verdigris" /> : <Copy className="size-3" />}
                {lnurl}
              </button>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('oracle.gate.lnNote', { chf: String(PLAN_INITIATE_CHF) })}{' '}
                {npub ? (
                  <>
                    {t('oracle.gate.lnNpubNote')}
                    <span className="block font-mono mt-1 break-all text-foreground">{npub}</span>
                  </>
                ) : (
                  t('oracle.gate.lnNpubNoteNoAuth')
                )}
              </p>
              <button
                onClick={() => { setPending(); setShowLightning(false); }}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 decoration-dotted"
              >
                {t('oracle.gate.lnPaid')}
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          {t('oracle.gate.opensShortly')}
        </p>
      )}

      {/* Council cross-link */}
      <p className="text-center text-xs text-muted-foreground">
        <Link to="/council" className="hover:text-foreground underline underline-offset-2 decoration-dotted">
          {t('oracle.gate.councilLink')}
        </Link>
      </p>

      {/* Fine print */}
      <p className="text-[11px] text-muted-foreground leading-relaxed text-center max-w-sm mx-auto">
        {t('oracle.gate.finePrint')}
      </p>

      {/* Canon fallback */}
      {!hasCheckout && (
        <div className="text-center pt-2">
          <Button variant="outline" className="rounded-full" asChild>
            <Link to="/oracle">{t('canon.crossLink')}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
