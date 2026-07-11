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
    toast({ title: 'Lightning address copied' });
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">

        {/* ─── Hero ─── */}
        <div className="text-center mb-12">
          <Omphalos className="size-9 text-oracle mx-auto mb-5" />
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-umbra dark:text-ash mb-3">
            The Council of the Temple
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
            Seven hundred seventy-seven seats.
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            The temple at Delphi had its keepers. This one has a council: {COUNCIL_SEATS} seats,
            taken once, held for life. A seat is a signed Nostr credential — a numbered seal
            no platform can revoke, including this one.
          </p>
          <p className="mt-3 text-xs">
            <Link to="/support" className="text-muted-foreground hover:text-foreground underline underline-offset-2 decoration-dotted">
              Looking for monthly plans instead? → Support &amp; Plans
            </Link>
          </p>
          {taken > 0 && (
            <p className="mt-4 font-mono text-sm text-oracle">
              seat № {String(taken).padStart(3, '0')} was the last inscribed · {COUNCIL_SEATS} chairs in the council
            </p>
          )}
        </div>

        {/* ─── Already seated ─── */}
        {isCouncillor && (
          <div className="engraved rounded-[2px] bg-verdigris/10 p-5 text-center mb-10">
            <p className="font-serif text-lg text-foreground">
              Your seat is held. Welcome to the council.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Beta invitations arrive by Nostr DM to this key.
            </p>
          </div>
        )}

        {/* ─── What a seat carries ─── */}
        <div className="engraved grain rounded-[2px] bg-card p-6 sm:p-8 mb-10">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-umbra dark:text-ash mb-5">
            What a seat carries
          </h2>
          <ul className="space-y-4 text-sm sm:text-[15px] leading-relaxed text-foreground">
            <li>
              <strong className="font-medium">First access, portfolio-wide.</strong>{' '}
              The council enters every beta shipped by the venture lab behind Delphi
              before anyone else — publishing, messaging, and identity tools built
              on the same principles.
            </li>
            <li>
              <strong className="font-medium">The Oracle, for life.</strong>{' '}
              Unlimited access to Delphi&rsquo;s Oracle tier under fair personal use,
              from the day it opens.
            </li>
            <li>
              <strong className="font-medium">A numbered seal.</strong>{' '}
              A council seal (NIP-58) signed to your key, and — if you wish —
              your name inscribed on the public Council Stele. Pseudonymous by default.
            </li>
            <li>
              <strong className="font-medium">A chair at the table.</strong>{' '}
              The council chamber with the builders, and a vote when product canon
              is decided. Seven hundred seventy-seven voices, no more.
            </li>
          </ul>
          <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
            A seat is access and standing — not an investment, not a revenue share,
            and not a tradable instrument. One seat per person.
            Refundable on request within 14 days of purchase.
          </p>
        </div>

        {/* ─── Checkout ─── */}
        <div className="text-center mb-4">
          <p className="font-serif text-2xl text-foreground">
            ${COUNCIL_PRICE_USD} <span className="text-base text-muted-foreground">· once · or the equivalent in lightning</span>
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
                  Take a seat with Lightning
                </Button>
              )}
              {BITCOIN_ONCHAIN_ADDRESS && (
                <Button
                  onClick={() => { setShowOnchain((s) => !s); setShowLightning(false); }}
                  variant="outline"
                  className="rounded-full gap-1.5 px-6"
                >
                  <Bitcoin className="size-4" />
                  On-chain
                </Button>
              )}
              {stripeHref && (
                <Button asChild variant="outline" className="rounded-full gap-1.5 px-6">
                  <a href={stripeHref} target="_blank" rel="noopener noreferrer">
                    <CreditCard className="size-4" />
                    Pay by card
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
            The council convenes shortly. The stele is being carved.
          </p>
        )}

        {/* ─── The Stele ─── */}
        <div className="mb-4 flex items-center gap-2 justify-center">
          <ScrollText className="size-4 text-umbra dark:text-ash" />
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-umbra dark:text-ash">
            The Council Stele
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
          <p className="text-center text-sm text-ash font-mono">— the first seat is not yet carved —</p>
        )}
      </div>
    </AppLayout>
  );
}
