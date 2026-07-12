import { useSeoMeta } from '@unhead/react';
import { Link } from 'react-router-dom';
import { nip19 } from 'nostr-tools';
import { AppLayout } from '@/components/layout/AppLayout';
import { WireCard } from '@/components/wire/WireCard';
import { ShareWireCard } from '@/components/wire/ShareWireCard';
import { MirrorSection } from '@/components/mirror/MirrorSection';
import { PublishWireFlow } from '@/components/publish/PublishWireFlow';
import { SelfAttestationFlow } from '@/components/publish/SelfAttestationFlow';
import { BackupRestoreFlow } from '@/components/publish/BackupRestoreFlow';
import { useWire } from '@/hooks/useWire';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { usePublishedWire } from '@/hooks/usePublishedWire';
import { isWirePopulated, filledChamberCount, TOTAL_CHAMBERS } from '@/lib/wire';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ExternalLink, Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';

export default function WirePage() {
  const { wire } = useWire();
  const { t } = useTranslation();
  const { user } = useCurrentUser();
  const { data: publishedEvent } = usePublishedWire(user?.pubkey);
  const hasWire = isWirePopulated(wire);
  const filled = filledChamberCount(wire);

  useSeoMeta({
    title: 'My Wire — Delphi',
    description: 'View your psychometric Wire — your sovereign identity signature across multiple typology systems.',
  });

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            {t('wire.title')}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            {hasWire
              ? t('wire.subtitle.hasWire', { filled: String(filled), total: String(TOTAL_CHAMBERS) })
              : t('wire.subtitle.empty')
            }
          </p>
        </div>

        {hasWire ? (
          <div className="space-y-8">
            {/* Wire card */}
            <WireCard wire={wire} />
            <ShareWireCard wire={wire} />

            {/* The Mirror — four-chamber synthesis */}
            <MirrorSection />

            {/* Completed chambers detail */}
            <div className="space-y-4">
              {wire.millman && (
                <ChamberDetail
                  letter="M"
                  name="Millman Life-Purpose"
                  value={wire.millman.number}
                  to="/assess/millman"
                />
              )}
              {wire.jung && (
                <ChamberDetail
                  letter="J"
                  name="16-Type Jungian"
                  value={wire.jung.type}
                  to="/assess/jung"
                />
              )}
              {wire.enneagram && (
                <ChamberDetail
                  letter="E"
                  name="Enneagram"
                  value={`${wire.enneagram.core}w${wire.enneagram.wing}`}
                  to="/assess/enneagram"
                />
              )}
              {wire.humanDesign && (
                <ChamberDetail
                  letter="H"
                  name="Human Design"
                  value={`${wire.humanDesign.type} ${wire.humanDesign.profile}`}
                  to="/assess/human-design"
                />
              )}
            </div>

            {/* Remaining chambers */}
            {filled < TOTAL_CHAMBERS && (
              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {t('wire.chambersRemaining', { count: String(TOTAL_CHAMBERS - filled) })}
                </p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/assess">
                    {t('wire.continueAssessments')}
                    <ArrowRight className="size-4 ml-1" />
                  </Link>
                </Button>
              </div>
            )}

            {/* Publish Wire to Nostr */}
            <PublishWireFlow wire={wire} />

            {/* Shareable Wire link — only show when published & logged in */}
            {user && publishedEvent && (
              <ShareableWireLink pubkey={user.pubkey} />
            )}

            {/* Self-Attestation: confirm/deny/weight individual traits */}
            <SelfAttestationFlow wire={wire} />

            {/* Encrypted backup of raw assessment data */}
            <BackupRestoreFlow />
          </div>
        ) : (
          /* Empty state */
          <Card className="border-dashed">
            <CardContent className="py-16 px-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="flex gap-2">
                  {Array.from({ length: TOTAL_CHAMBERS }).map((_, i) => (
                    <div key={i} className="size-3 rounded-full bg-border" />
                  ))}
                </div>
              </div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
                {t('wire.noChambers')}
              </h2>
              <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                {t('wire.noChambers.desc')}
              </p>
              <Button asChild className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-8">
                <Link to="/assess">
                  {t('wire.beginAssessment')}
                  <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}

function ShareableWireLink({ pubkey }: { pubkey: string }) {
  const [copied, setCopied] = useState(false);
  const npub = nip19.npubEncode(pubkey);
  const profilePath = `/${npub}`;

  const handleCopy = useCallback(() => {
    const fullUrl = `${window.location.origin}${profilePath}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [profilePath]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
      <div className="flex items-center gap-2 min-w-0">
        <ExternalLink className="size-4 text-oracle shrink-0" />
        <p className="text-sm text-muted-foreground truncate">
          Your public Wire is visible at{' '}
          <Link to={profilePath} className="text-oracle hover:underline font-medium">
            /{npub.slice(0, 16)}…
          </Link>
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="rounded-full px-4 gap-1.5 shrink-0"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {copied ? 'Copied' : 'Copy Link'}
      </Button>
    </div>
  );
}

function ChamberDetail({ letter, name, value, to }: {
  letter: string;
  name: string;
  value: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-oracle/20 hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-center size-10 rounded-full bg-oracle/15 text-oracle text-sm font-bold shrink-0">
        {letter}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground">{name}</p>
        <p className="font-serif text-lg font-semibold text-foreground">{value}</p>
      </div>
      <ArrowRight className="size-4 text-muted-foreground shrink-0" />
    </Link>
  );
}
