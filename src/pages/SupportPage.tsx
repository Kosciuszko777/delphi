import { useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import { Link } from 'react-router-dom';
import { nip19 } from 'nostr-tools';
import { AppLayout } from '@/components/layout/AppLayout';
import { Omphalos } from '@/components/wire/Omphalos';
import { QRCodeCanvas } from '@/components/ui/qrcode';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useBuildersCredit } from '@/hooks/useBuildersCredit';
import { useCouncilStele, useIsCouncillor } from '@/hooks/useCouncil';
import {
  BITCOIN_ONCHAIN_ADDRESS,
  SUPPORT_LIGHTNING_ADDRESS,
  SUPPORT_STRIPE_LINK,
  PLAN_INITIATE_STRIPE,
  PLAN_TEAM_STRIPE,
  ENTERPRISE_CONTACT,
  PLAN_INITIATE_CHF,
  PLAN_TEAM_CHF,
  PLAN_TEAM_SEATS,
  PLAN_ENTERPRISE_CHF,
  PLAN_INITIATE_YEARLY_CHF,
  PLAN_TEAM_YEARLY_CHF,
} from '@/lib/support/config';
import { COUNCIL_PRICE_USD, COUNCIL_SEATS } from '@/lib/council/config';
import { useTranslation } from '@/hooks/useTranslation';
import { Heart, Zap, CreditCard, Copy, Check, Share2, Bitcoin } from 'lucide-react';
import { BitcoinOnchainPanel } from '@/components/payments/BitcoinOnchainPanel';
import { toast } from '@/hooks/useToast';

export default function SupportPage() {
  const { t: tr } = useTranslation();
  const { user } = useCurrentUser();
  const npub = user ? nip19.npubEncode(user.pubkey) : undefined;
  const { data: credit } = useBuildersCredit(user?.pubkey);
  const { data: stele } = useCouncilStele();
  const { data: council } = useIsCouncillor(user?.pubkey);
  const [copied, setCopied] = useState<string | null>(null);
  const [showDonateLn, setShowDonateLn] = useState(false);
  const [showDonateBtc, setShowDonateBtc] = useState(false);

  useSeoMeta({
    title: 'Support — Delphi',
    description: 'Do you like what you just experienced? Support the mission, spread the message, or take a plan.',
  });

  const referralLink = npub ? `${location.origin}/?ref=${npub}` : undefined;

  const copy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    toast({ title: tr('common.copied') });
    setTimeout(() => setCopied(null), 1500);
  };

  const shareTargets = referralLink
    ? [
        { name: 'Nostr', href: `https://njump.me/?text=${encodeURIComponent(`Know thyself — without being known. ${referralLink} #delphi`)}` },
        { name: 'X', href: `https://x.com/intent/post?text=${encodeURIComponent(`Know thyself — without being known.`)}&url=${encodeURIComponent(referralLink)}` },
        { name: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`Know thyself — without being known. ${referralLink}`)}` },
        { name: 'Telegram', href: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Know thyself — without being known.')}` },
        { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}` },
      ]
    : [];

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16 space-y-12">

        {/* ─── Header ─── */}
        <div className="text-center">
          <Heart className="size-8 text-oracle mx-auto mb-5" fill="currentColor" strokeWidth={1.5} />
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
            {tr('support.title')}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {tr('support.subtitle')}
          </p>
        </div>

        {/* ─── Tier 1 — Support the mission ─── */}
        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-umbra dark:text-ash text-center mb-5">
            {tr('support.mission')}
          </h2>
          <div className="engraved grain rounded-[2px] bg-card p-6 sm:p-8 space-y-8">

            {/* Donate */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-foreground">{tr('support.donate')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tr('support.donate.desc')}
              </p>
              {(SUPPORT_LIGHTNING_ADDRESS || SUPPORT_STRIPE_LINK || BITCOIN_ONCHAIN_ADDRESS) ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {SUPPORT_LIGHTNING_ADDRESS && (
                      <Button
                        onClick={() => { setShowDonateLn((s) => !s); setShowDonateBtc(false); }}
                        size="sm"
                        className="rounded-full gap-1.5 bg-oracle text-oracle-foreground hover:bg-oracle/90"
                      >
                        <Zap className="size-3.5" /> Lightning
                      </Button>
                    )}
                    {BITCOIN_ONCHAIN_ADDRESS && (
                      <Button
                        onClick={() => { setShowDonateBtc((s) => !s); setShowDonateLn(false); }}
                        size="sm"
                        variant="outline"
                        className="rounded-full gap-1.5"
                      >
                        <Bitcoin className="size-3.5" /> On-chain
                      </Button>
                    )}
                    {SUPPORT_STRIPE_LINK && (
                      <Button asChild size="sm" variant="outline" className="rounded-full gap-1.5">
                        <a href={SUPPORT_STRIPE_LINK} target="_blank" rel="noopener noreferrer">
                          <CreditCard className="size-3.5" /> Card
                        </a>
                      </Button>
                    )}
                  </div>
                  {showDonateBtc && <BitcoinOnchainPanel />}
                  {showDonateLn && SUPPORT_LIGHTNING_ADDRESS && (
                    <div className="engraved rounded-[2px] bg-background/40 p-5 max-w-xs text-center space-y-3">
                      <QRCodeCanvas value={`lightning:${SUPPORT_LIGHTNING_ADDRESS}`} size={176} className="mx-auto rounded-sm" />
                      <button
                        onClick={() => copy(SUPPORT_LIGHTNING_ADDRESS, 'donate')}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground"
                      >
                        {copied === 'donate' ? <Check className="size-3 text-verdigris" /> : <Copy className="size-3" />}
                        {SUPPORT_LIGHTNING_ADDRESS}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-ash font-mono">{tr('support.donate.unarmed')}</p>
              )}
              <p className="text-[11px] text-muted-foreground">
                {tr('support.donate.giftsNote')}
              </p>
            </div>

            <div className="h-px bg-umbra/20 dark:bg-ash/15" />

            {/* Spread the message */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-foreground">{tr('support.spread')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tr('support.spread.desc')}
              </p>

              {referralLink ? (
                <div className="space-y-4">
                  <button
                    onClick={() => copy(referralLink, 'ref')}
                    className="engraved w-full rounded-[2px] bg-background/40 px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-oracle/5 transition-colors"
                  >
                    <span className="font-mono text-xs text-foreground truncate">{referralLink}</span>
                    {copied === 'ref' ? <Check className="size-3.5 text-verdigris shrink-0" /> : <Copy className="size-3.5 text-muted-foreground shrink-0" />}
                  </button>

                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="engraved rounded-[2px] bg-background/40 px-4 py-2.5">
                      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-umbra dark:text-ash">
                        Builders&rsquo; Credit —{' '}
                      </span>
                      <span className="font-mono text-oracle">{credit ?? 0}</span>
                      <span className="font-mono text-[11px] text-umbra dark:text-ash"> souls wired</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-[11px] text-ash mr-1 inline-flex items-center gap-1">
                        <Share2 className="size-3" /> your tree of links:
                      </span>
                      {shareTargets.map((t) => (
                        <a
                          key={t.name}
                          href={t.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="engraved rounded-full px-3 py-1 text-[11px] text-foreground hover:bg-oracle/5 transition-colors"
                        >
                          {t.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    When someone you bring publishes their Wire, it carries your mark —
                    a public ref tag anyone can verify. No database, no tracking, just the protocol.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {tr('support.spread.signIn')}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ─── Tier 2 — Plans ─── */}
        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-umbra dark:text-ash text-center mb-5">
            {tr('support.plans')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <PlanCard
              name={tr('support.plan.initiate')}
              price={`CHF ${PLAN_INITIATE_CHF} / month`}
              lines={[
                tr('support.plan.initiate.oracle'),
                tr('support.plan.initiate.mirror'),
                tr('support.plan.initiate.relays'),
                tr('support.plan.initiate.seal'),
              ]}
              stripe={PLAN_INITIATE_STRIPE}
              lightningNote={`or CHF ${PLAN_INITIATE_YEARLY_CHF} / year in lightning — two months free`}
            />

            <PlanCard
              name={tr('support.plan.team')}
              price={`CHF ${PLAN_TEAM_CHF} / month`}
              priceNote={tr('support.plan.foundingRate')}
              lines={[
                tr('support.plan.team.all', { seats: String(PLAN_TEAM_SEATS) }),
                tr('support.plan.team.invite'),
                tr('support.plan.team.room'),
                tr('support.plan.team.overview'),
              ]}
              stripe={PLAN_TEAM_STRIPE}
              lightningNote={`or CHF ${PLAN_TEAM_YEARLY_CHF} / year in lightning`}
            />

            <PlanCard
              name={tr('support.plan.enterprise')}
              price={`CHF ${PLAN_ENTERPRISE_CHF.toLocaleString('de-CH')} / month`}
              lines={[
                tr('support.plan.enterprise.ai'),
                tr('support.plan.enterprise.people'),
                tr('support.plan.enterprise.dashboard'),
                tr('support.plan.enterprise.onboarding'),
              ]}
              contact={ENTERPRISE_CONTACT}
              footnote={tr('support.plan.enterprise.sovereignty')}
            />
          </div>
        </section>

        {/* ─── The 777 Club ─── */}
        <section>
          <div className="engraved rounded-[2px] bg-basalt p-8 sm:p-10 text-center relative overflow-hidden grain">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash mb-3">
              {tr('support.club.earlyBackers')}
            </p>
            <Omphalos className="size-8 mx-auto mb-4 text-oracle" />
            <h2 className="font-serif text-2xl sm:text-3xl font-medium" style={{ color: '#EFE9DC' }}>
              {tr('support.club.title')}
            </h2>
            <p className="mt-4 text-sm leading-relaxed max-w-lg mx-auto" style={{ color: '#B8B0A1' }}>
              {tr('support.club.desc', { seats: String(COUNCIL_SEATS) })}
            </p>
            <p className="mt-5 font-mono text-sm" style={{ color: '#C9A227' }}>
              {tr('support.club.price', { price: String(COUNCIL_PRICE_USD) })}
            </p>
            {stele && stele.count > 0 && (
              <p className="mt-2 font-mono text-xs" style={{ color: '#6B6558' }}>
                seat № {String(stele.count).padStart(3, '0')} was the last inscribed
              </p>
            )}
            <div className="mt-6">
              {council?.isCouncillor ? (
                <p className="font-serif" style={{ color: '#5E7466' }}>{tr('support.club.seated')}</p>
              ) : (
                <Button asChild className="rounded-full bg-oracle text-oracle-foreground hover:bg-oracle/90 px-8">
                  <Link to="/council">{tr('support.club.enter')}</Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

interface PlanCardProps {
  name: string;
  price: string;
  priceNote?: string;
  lines: string[];
  stripe?: string;
  lightningNote?: string;
  contact?: string;
  footnote?: string;
}

function PlanCard({ name, price, priceNote, lines, stripe, lightningNote, contact, footnote }: PlanCardProps) {
  return (
    <div className="engraved grain rounded-[2px] bg-card p-6 flex flex-col">
      <h3 className="font-serif text-xl text-foreground">{name}</h3>
      <p className="font-mono text-sm text-oracle mt-1">{price}</p>
      {priceNote && <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-verdigris mt-0.5">{priceNote}</p>}
      <ul className="mt-4 space-y-2 flex-1">
        {lines.map((line) => (
          <li key={line} className="text-sm text-foreground leading-relaxed flex gap-2">
            <span className="text-oracle shrink-0">·</span>{line}
          </li>
        ))}
      </ul>
      <div className="mt-5 space-y-2">
        {stripe ? (
          <Button asChild size="sm" className="w-full rounded-full bg-oracle text-oracle-foreground hover:bg-oracle/90 gap-1.5">
            <a href={stripe} target="_blank" rel="noopener noreferrer">
              <CreditCard className="size-3.5" /> Subscribe
            </a>
          </Button>
        ) : contact ? (
          <Button asChild size="sm" variant="outline" className="w-full rounded-full">
            <a href={contact.startsWith('mailto:') || contact.startsWith('nostr:') ? contact : `mailto:${contact}`}>
              Start the conversation
            </a>
          </Button>
        ) : (
          <p className="text-center text-xs text-ash font-mono">— opens shortly —</p>
        )}
        {lightningNote && (stripe || contact) && (
          <p className="text-center font-mono text-[10px] text-ash flex items-center justify-center gap-1">
            <Zap className="size-2.5" /> {lightningNote}
          </p>
        )}
      </div>
      {footnote && (
        <p className="mt-4 text-[11px] text-muted-foreground leading-relaxed">{footnote}</p>
      )}
    </div>
  );
}
