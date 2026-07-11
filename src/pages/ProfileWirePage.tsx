import { useSeoMeta } from '@unhead/react';
import { nip19 } from 'nostr-tools';
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
import { User } from 'lucide-react';

interface ProfileWirePageProps {
  pubkey: string;
}

export default function ProfileWirePage({ pubkey }: ProfileWirePageProps) {
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
      : `${displayName} — Delphi`,
    description: parsedWire?.wireString
      ? `${displayName}'s psychometric Wire: ${parsedWire.wireString}`
      : `View ${displayName}'s profile on Delphi.`,
  });

  const isLoading = wireLoading || author.isLoading;

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Profile header */}
        <ProfileHeader
          metadata={metadata}
          displayName={displayName}
          shortNpub={shortNpub}
          isLoading={author.isLoading}
        />

        {/* Wire */}
        <div className="mt-8 space-y-6">
          {isLoading ? (
            <WireSkeleton />
          ) : parsedWire ? (
            <PublicWireCard parsed={parsedWire} />
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-12 px-8 text-center">
                <p className="text-muted-foreground max-w-sm mx-auto">
                  This person hasn't published their Wire yet.
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

function ProfileHeader({
  metadata,
  displayName,
  shortNpub,
  isLoading,
}: {
  metadata: import('@nostrify/nostrify').NostrMetadata | undefined;
  displayName: string;
  shortNpub: string;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center text-center">
        <Skeleton className="size-20 rounded-full" />
        <Skeleton className="h-6 w-40 mt-4" />
        <Skeleton className="h-4 w-32 mt-2" />
      </div>
    );
  }

  const safeAvatar = metadata?.picture ? sanitizeUrl(metadata.picture) : null;
  const safeBanner = metadata?.banner ? sanitizeUrl(metadata.banner) : null;

  return (
    <div className="relative">
      {/* Banner */}
      {safeBanner && (
        <div className="relative h-32 sm:h-40 -mx-4 sm:-mx-6 -mt-8 sm:-mt-12 mb-0 overflow-hidden rounded-b-xl">
          <img
            src={safeBanner}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      <div className={`flex flex-col items-center text-center ${safeBanner ? '-mt-10 relative z-10' : ''}`}>
        {/* Avatar */}
        <Avatar className="size-20 border-4 border-background shadow-md">
          {safeAvatar ? (
            <AvatarImage src={safeAvatar} alt={displayName} />
          ) : null}
          <AvatarFallback className="text-lg">
            <User className="size-8 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>

        {/* Name */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-3">
          {displayName}
        </h1>

        {/* npub */}
        <p className="text-sm text-muted-foreground font-mono mt-1">
          {shortNpub}
        </p>

        {/* About */}
        {metadata?.about && (
          <p className="text-sm text-muted-foreground mt-3 max-w-lg leading-relaxed">
            {metadata.about}
          </p>
        )}

        {/* NIP-05 */}
        {metadata?.nip05 && (
          <p className="text-xs text-oracle mt-1 font-medium">
            {metadata.nip05}
          </p>
        )}
      </div>
    </div>
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
