import { useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import { nip19 } from 'nostr-tools';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Omphalos } from '@/components/wire/Omphalos';
import { QRCodeCanvas } from '@/components/ui/qrcode';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useCouncilStele, useIsCouncillor } from '@/hooks/useCouncil';
import {
  COUNCIL_LIGHTNING_ADDRESS,
  COUNCIL_STRIPE_LINK,
  COUNCIL_PRICE_USD,
  COUNCIL_SEATS,
} from '@/lib/council/config';
import { useTranslation } from '@/hooks/useTranslation';
import { Zap, CreditCard, Copy, Check, ScrollText, Bitcoin } from 'lucide-react';
import { BitcoinOnchainPanel } from '@/components/payments/BitcoinOnchainPanel';
import { BITCOIN_ONCHAIN_ADDRESS } from '@/lib/support/config';
import { toast } from '@/hooks/useToast';

/**
 * The Council of the Temple — 777 seats, one inscription each.
 * Communication rule: name the seat taken, never progress toward
 * the count. 777 is the shape of the council, not a sales target.
 */
export default function CouncilPage() {
  const { t } = useTranslation();
  const { user } = useCurrentUser();
  const { data: stele } = useCouncilStele();
  const { data: councilStatus } = useIsCouncillor(user?.pubkey);
  const [copied, setCopied] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const [showOnchain, setShowOnchain] = useState(false);

  useSeoMeta({
    title: 'The Council of the Temple — Delphi',
    description: 'Seven hundred seventy-seven seats. A one-time seat in the council: early access across the venture portfolio, the Oracle for life, your seat on the stele.',
  });

  const npub = user ? nip19.npubEncode(user.pubkey) : undefined;
  const taken = stele?.count ?? 0;
  const isCouncillor = councilStatus?.isCouncillor ?? false;

  const lnurl = COUNCIL_LIGHTNING_ADDRESS;
  const stripeHref = COUNCIL_STRIPE_LINK
    ? `${COUNCIL_STRIPE_LINK}${npub ? `?client_reference_id=${npub}` : ''}`
    : undefined;

  const copyAddress = async () => {
    await navigator.clipboard.writeText(lnurl);
    setCopied(true);
    toast({ title: t('common.lightningCopied') });
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">

        {/* ─── Hero ─── */}
        <div className="text-center mb-12">
          <Omphalos className="size-9 text-oracle mx-auto mb-5" />
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-umbra dark:text-ash mb-3">
            {t('council.header')}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
            {t('council.title')}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t('council.subtitle', { seats: String(COUNCIL_SEATS) })}
          </p>
          <p className="mt-3 text-xs">
            <Link to="/support" className="text-muted-foreground hover:text-foreground underline underline-offset-2 decoration-dotted">
              {t('council.plansLink')}
            </Link>
          </p>
          {taken > 0 && (
            <p className="mt-4 font-mono text-sm text-oracle">
              {t('council.lastInscribed', { seat: String(taken).padStart(3, '0'), seats: String(COUNCIL_SEATS) })}
            </p>
          )}
        </div>

        {/* ─── Already seated ─── */}
        {isCouncillor && (
          <div className="engraved rounded-[2px] bg-verdigris/10 p-5 text-center mb-10">
            <p className="font-serif text-lg text-foreground">
              {t('council.seated')}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t('council.seated.note')}
            </p>
          </div>
        )}

        {/* ─── What a seat carries ─── */}
        <div className="engraved grain rounded-[2px] bg-card p-6 sm:p-8 mb-10">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-umbra dark:text-ash mb-5">
            {t('council.whatCarries')}
          </h2>
          <ul className="space-y-4 text-sm sm:text-[15px] leading-relaxed text-foreground">
            <li>
              <strong className="font-medium">{t('council.carry.access')}</strong>{' '}
              {t('council.carry.access.desc')}
            </li>
            <li>
              <strong className="font-medium">{t('council.carry.oracle')}</strong>{' '}
              {t('council.carry.oracle.desc')}
            </li>
            <li>
              <strong className="font-medium">{t('council.carry.seal')}</strong>{' '}
              {t('council.carry.seal.desc')}
            </li>
            <li>
              <strong className="font-medium">{t('council.carry.chair')}</strong>{' '}
              {t('council.carry.chair.desc')}
            </li>
          </ul>
          <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
            {t('council.terms')}
          </p>
        </div>

        {/* ─── Checkout ─── */}
        <div className="text-center mb-4">
          <p className="font-serif text-2xl text-foreground">
            ${COUNCIL_PRICE_USD} <span className="text-base text-muted-foreground">{t('council.price')}</span>
          </p>
        </div>

        {(lnurl || stripeHref || BITCOIN_ONCHAIN_ADDRESS) ? (
          <div className="space-y-4 mb-12">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {lnurl && (
                <Button
                  onClick={() => { setShowLightning((s) => !s); setShowOnchain(false); }}
                  className="rounded-full gap-1.5 bg-oracle text-oracle-foreground hover:bg-oracle/90 px-6"
                >
                  <Zap className="size-4" />
                  {t('council.lightning')}
                </Button>
              )}
              {BITCOIN_ONCHAIN_ADDRESS && (
                <Button
                  onClick={() => { setShowOnchain((s) => !s); setShowLightning(false); }}
                  variant="outline"
                  className="rounded-full gap-1.5 px-6"
                >
                  <Bitcoin className="size-4" />
                   {t('council.onchain')}
                </Button>
              )}
              {stripeHref && (
                <Button asChild variant="outline" className="rounded-full gap-1.5 px-6">
                  <a href={stripeHref} target="_blank" rel="noopener noreferrer">
                    <CreditCard className="size-4" />
                    {t('council.card')}
                  </a>
                </Button>
              )}
            </div>

            {showOnchain && (
              <BitcoinOnchainPanel
                note={`Send the equivalent of $${COUNCIL_PRICE_USD}. On-chain carries no message field — keep your transaction ID and send it together with your npub${npub ? ` (${npub.slice(0, 12)}…)` : ''} through the contact on this site to claim your seat.`}
              />
            )}

            {showLightning && lnurl && (
              <div className="engraved rounded-[2px] bg-card p-6 max-w-sm mx-auto text-center space-y-4">
                <QRCodeCanvas value={`lightning:${lnurl}`} size={208} className="mx-auto rounded-sm" />
                <button
                  onClick={copyAddress}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied ? <Check className="size-3 text-verdigris" /> : <Copy className="size-3" />}
                  {lnurl}
                </button>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Send the equivalent of ${COUNCIL_PRICE_USD}.{' '}
                  {npub ? (
                    <>Include your npub in the payment comment so your seal finds you:
                    <span className="block font-mono mt-1 break-all text-foreground">{npub}</span></>
                  ) : (
                    'Include your npub in the payment comment — or sign in first and it appears here.'
                  )}
                </p>
              </div>
            )}

            {!npub && stripeHref && (
              <p className="text-center text-xs text-muted-foreground">
                No Nostr key yet? Pay by card with your email — claiming your seat
                walks you through creating your key. The payment is also the onboarding.
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground mb-12">
            {t('council.convening')}
          </p>
        )}

        {/* ─── The Stele ─── */}
        <div className="mb-4 flex items-center gap-2 justify-center">
          <ScrollText className="size-4 text-umbra dark:text-ash" />
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-umbra dark:text-ash">
            {t('council.stele')}
          </h2>
        </div>
        {stele && stele.members.length > 0 ? (
          <div className="engraved grain rounded-[2px] bg-card p-6">
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {stele.members.map((m) => (
                <li key={m.pubkey} className="flex items-baseline gap-3 text-sm">
                  <span className="font-mono text-oracle shrink-0">
                    seat&nbsp;{String(m.seat).padStart(3, '0')}
                  </span>
                  <span className="font-serif text-foreground truncate">
                    {m.name ?? `${nip19.npubEncode(m.pubkey).slice(0, 12)}…`}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p className="text-center text-sm text-ash font-mono">{t('council.uncarved')}</p>
        )}
      </div>
    </AppLayout>
  );
}
