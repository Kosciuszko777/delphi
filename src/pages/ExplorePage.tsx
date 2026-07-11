import { useSeoMeta } from '@unhead/react';
import { Link } from 'react-router-dom';
import { nip19 } from 'nostr-tools';
import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuthor } from '@/hooks/useAuthor';
import { parseWireEvent, type ParsedWireEvent } from '@/hooks/usePublishedWire';
import { WIRE_KIND } from '@/lib/publish/wireEvent';
import { sanitizeUrl } from '@/lib/sanitize';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, User, ArrowRight } from 'lucide-react';

export default function ExplorePage() {
  const { nostr } = useNostr();

  useSeoMeta({
    title: 'Explore Wires — Delphi',
    description: 'Discover published psychometric Wires from the Nostr network.',
  });

  const { data: wireEvents, isLoading } = useQuery<NostrEvent[]>({
    queryKey: ['delphi', 'explore', 'wires'],
    queryFn: async (c) => {
      const events = await nostr.query(
        [{ kinds: [WIRE_KIND], '#d': ['wire'], limit: 50 }],
        { signal: c.signal },
      );
      // Deduplicate by pubkey (keep latest per pubkey)
      const byPubkey = new Map<string, NostrEvent>();
      for (const event of events) {
        const existing = byPubkey.get(event.pubkey);
        if (!existing || event.created_at > existing.created_at) {
          byPubkey.set(event.pubkey, event);
        }
      }
      // Sort by most recent first
      return Array.from(byPubkey.values()).sort(
        (a, b) => b.created_at - a.created_at,
      );
    },
    staleTime: 60_000,
  });

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Explore
          </h1>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Published Wires from the Nostr network. Click any Wire to view the full profile.
          </p>
        </div>

        {/* Wire feed */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <WirePreviewSkeleton key={i} />
            ))}
          </div>
        ) : wireEvents && wireEvents.length > 0 ? (
          <div className="space-y-4">
            {wireEvents.map((event) => (
              <WirePreviewCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-12 px-8 text-center">
              <Sparkles className="size-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground max-w-sm mx-auto">
                No published Wires found yet. Be the first — complete your assessments 
                and publish your Wire to appear here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}

/** A compact preview card for a Wire in the discovery feed. */
function WirePreviewCard({ event }: { event: NostrEvent }) {
  const parsed = parseWireEvent(event);
  const npub = nip19.npubEncode(event.pubkey);

  return (
    <Link
      to={`/${npub}`}
      className="block group"
    >
      <div className="flex items-center gap-4 p-4 sm:p-5 rounded-xl border border-border bg-card hover:border-oracle/30 hover:shadow-sm transition-all">
        <AuthorAvatar pubkey={event.pubkey} />

        <div className="flex-1 min-w-0">
          <AuthorName pubkey={event.pubkey} />
          {parsed.wireString && (
            <p className="font-serif text-sm sm:text-base font-medium text-foreground mt-0.5 truncate">
              {parsed.wireString}
            </p>
          )}
          <WireChamberDots parsed={parsed} />
        </div>

        <ArrowRight className="size-4 text-muted-foreground shrink-0 group-hover:text-oracle transition-colors" />
      </div>
    </Link>
  );
}

function AuthorAvatar({ pubkey }: { pubkey: string }) {
  const author = useAuthor(pubkey);
  const metadata = author.data?.metadata;
  const safeAvatar = metadata?.picture ? sanitizeUrl(metadata.picture) : null;

  return (
    <Avatar className="size-12 shrink-0">
      {safeAvatar ? (
        <AvatarImage src={safeAvatar} alt={metadata?.name ?? ''} />
      ) : null}
      <AvatarFallback>
        <User className="size-5 text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
  );
}

function AuthorName({ pubkey }: { pubkey: string }) {
  const author = useAuthor(pubkey);
  const metadata = author.data?.metadata;
  const npub = nip19.npubEncode(pubkey);
  const displayName = metadata?.name || metadata?.display_name || `${npub.slice(0, 12)}…`;

  return (
    <p className="text-sm text-muted-foreground truncate">
      {displayName}
    </p>
  );
}

function WireChamberDots({ parsed }: { parsed: ParsedWireEvent }) {
  const filled = [
    !!parsed.jung,
    !!parsed.hdType,
    !!parsed.millman,
    !!parsed.enneagramCore,
  ];
  const filledCount = filled.filter(Boolean).length;

  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex items-center gap-0.5">
        {filled.map((f, i) => (
          <div
            key={i}
            className={`size-1.5 rounded-full ${f ? 'bg-oracle' : 'bg-border'}`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground/60">
        {filledCount}/4
      </span>
    </div>
  );
}

function WirePreviewSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 sm:p-5 rounded-xl border border-border bg-card">
      <Skeleton className="size-12 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-48" />
        <div className="flex gap-0.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="size-1.5 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
