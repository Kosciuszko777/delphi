import { useSeoMeta } from '@unhead/react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PublicWireCard } from '@/components/wire/PublicWireCard';
import { PublicAttestationList } from '@/components/wire/PublicAttestationList';
import { useAuthor } from '@/hooks/useAuthor';
import { usePublishedWire, parseWireEvent } from '@/hooks/usePublishedWire';
import { usePublishedAttestations } from '@/hooks/useAttestations';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { sanitizeUrl } from '@/lib/sanitize';
import { nip19 } from 'nostr-tools';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

interface NaddrWirePageProps {
  pubkey: string;
  identifier: string;
}

/**
 * View a Wire via its naddr (kind 31400 addressable event).
 * Essentially the same as ProfileWirePage, but arrived at via naddr routing.
 */
export default function NaddrWirePage({ pubkey }: NaddrWirePageProps) {
  const author = useAuthor(pubkey);
  const { data: wireEvent, isLoading: wireLoading } = usePublishedWire(pubkey);
  const { data: attestationEvent, isLoading: attestLoading } = usePublishedAttestations(pubkey);

  const metadata = author.data?.metadata;
  const npub = nip19.npubEncode(pubkey);
  const shortNpub = `${npub.slice(0, 12)}…${npub.slice(-6)}`;
  const displayName = metadata?.name || metadata?.display_name || shortNpub;
  const parsedWire = wireEvent ? parseWireEvent(wireEvent) : null;

  useSeoMeta({
    title: parsedWire?.wireString
      ? `${displayName} — ${parsedWire.wireString} — Delphi`
      : `${displayName}'s Wire — Delphi`,
    description: parsedWire?.wireString
      ? `${displayName}'s psychometric Wire: ${parsedWire.wireString}`
      : `View ${displayName}'s Wire on Delphi.`,
  });

  const isLoading = wireLoading || author.isLoading;

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Compact author header linking to full profile */}
        <Link
          to={`/${npub}`}
          className="flex items-center gap-3 mb-8 group transition-opacity hover:opacity-80"
        >
          <Avatar className="size-12 border-2 border-background shadow-sm">
            {metadata?.picture ? (
              <AvatarImage src={sanitizeUrl(metadata.picture) ?? undefined} alt={displayName} />
            ) : null}
            <AvatarFallback>
              <User className="size-5 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-serif text-lg font-semibold text-foreground group-hover:text-oracle transition-colors">
              {displayName}
            </p>
            <p className="text-xs text-muted-foreground font-mono">{shortNpub}</p>
          </div>
        </Link>

        {/* Wire */}
        <div className="space-y-6">
          {isLoading ? (
            <WireSkeleton />
          ) : parsedWire ? (
            <PublicWireCard parsed={parsedWire} />
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-12 px-8 text-center">
                <p className="text-muted-foreground max-w-sm mx-auto">
                  This Wire has not been published yet.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Attestations */}
          {attestLoading ? (
            <AttestationSkeleton />
          ) : attestationEvent ? (
            <PublicAttestationList event={attestationEvent} />
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
}

function WireSkeleton() {
  return (
    <Card>
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="size-2 rounded-full" />
            ))}
          </div>
        </div>
        <Skeleton className="h-12 w-full rounded-lg" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AttestationSkeleton() {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-64" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
