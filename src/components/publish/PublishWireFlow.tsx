import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useNostrPublish } from '@/hooks/useNostrPublish';
import { usePublishedWire } from '@/hooks/usePublishedWire';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/useToast';
import type { Wire } from '@/lib/wire';
import { formatWire } from '@/lib/wire';
import { buildWireTags, buildWireDeletionTags, buildAttestationDeletionTags, WIRE_KIND } from '@/lib/publish/wireEvent';
import { getStoredReferrer } from '@/lib/support/referral';
import { Globe, Shield, AlertTriangle, Check, Loader2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PublishWireFlowProps {
  wire: Wire;
}

export function PublishWireFlow({ wire }: PublishWireFlowProps) {
  const { user } = useCurrentUser();
  const { mutateAsync: publish, isPending } = useNostrPublish();
  const queryClient = useQueryClient();
  const { data: publishedEvent } = usePublishedWire(user?.pubkey);
  const isPublished = !!publishedEvent;

  const [showPreview, setShowPreview] = useState(false);
  const [showUnpublish, setShowUnpublish] = useState(false);

  if (!user) {
    return (
      <Card className="border-dashed border-oracle/20">
        <CardContent className="py-8 px-6 text-center">
          <Globe className="size-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-serif text-lg text-foreground mb-2">
            Publish Your Wire
          </p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Log in with your Nostr identity to publish your Wire — making your 
            psychometric fingerprint visible on the Nostr network while keeping 
            raw assessment data private.
          </p>
        </CardContent>
      </Card>
    );
  }

  const wireString = formatWire(wire);
  const tags = buildWireTags(wire, getStoredReferrer());

  const handlePublish = async () => {
    try {
      await publish({
        kind: WIRE_KIND,
        content: '',
        tags,
      });
      await queryClient.invalidateQueries({ queryKey: ['delphi', 'wire'] });
      setShowPreview(false);
      toast({ title: 'Wire published', description: 'Your Wire is now visible on Nostr.' });
    } catch (err) {
      toast({ title: 'Publishing failed', description: String(err), variant: 'destructive' });
    }
  };

  const handleUnpublish = async () => {
    try {
      // Send deletion request (NIP-09 kind 5) for the Wire event
      await publish({
        kind: 5,
        content: 'Wire unpublished by user',
        tags: buildWireDeletionTags(user.pubkey),
      });
      // Also delete self-attestations
      await publish({
        kind: 5,
        content: 'Self-attestations deleted with Wire',
        tags: buildAttestationDeletionTags(user.pubkey),
      });
      await queryClient.invalidateQueries({ queryKey: ['delphi', 'wire'] });
      setShowUnpublish(false);
      toast({ title: 'Wire unpublished', description: 'Deletion request sent to relays.' });
    } catch (err) {
      toast({ title: 'Unpublish failed', description: String(err), variant: 'destructive' });
    }
  };

  // Published state
  if (isPublished && !showPreview) {
    return (
      <Card className="border-oracle/20 bg-oracle/5">
        <CardContent className="py-6 px-6">
          <div className="flex items-center gap-2 mb-3">
            <Check className="size-4 text-oracle" />
            <p className="font-serif font-semibold text-foreground">Wire Published</p>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Your Wire is live on Nostr. Anyone can view it via your npub.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setShowPreview(true)}
              className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-5"
              size="sm"
            >
              Update Wire
            </Button>
            {showUnpublish ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleUnpublish}
                  disabled={isPending}
                  className="rounded-full px-5 gap-1.5"
                >
                  {isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                  Confirm Unpublish
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUnpublish(false)}
                  className="rounded-full"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUnpublish(true)}
                className="rounded-full text-muted-foreground"
              >
                Unpublish
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Preview / consent screen
  if (showPreview) {
    return (
      <Card className="border-oracle/20">
        <CardContent className="py-6 px-6 space-y-5">
          <div className="flex items-center gap-2">
            <Globe className="size-5 text-oracle" />
            <h3 className="font-serif text-lg font-semibold text-foreground">
              {isPublished ? 'Update' : 'Publish'} Your Wire
            </h3>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            This will make the following information <strong>publicly visible</strong> on the Nostr network,
            attached to your cryptographic identity.
          </p>

          {/* Preview of what gets published */}
          <div className="rounded-lg border border-border bg-background p-4 space-y-3">
            <p className="font-serif text-base font-medium text-foreground text-center">
              {wireString}
            </p>
            <Separator />
            <div className="flex flex-wrap gap-2 justify-center">
              {tags.filter(([name]) => !['d', 'published_at', 'alt', 'client', 'wire'].includes(name)).map((tag, i) => (
                <Badge key={i} variant="outline" className="font-mono text-xs">
                  {tag[0]}: {tag.slice(1).join(', ')}
                </Badge>
              ))}
            </div>
            <details className="group">
              <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors text-center list-none select-none">
                <span className="underline underline-offset-2 decoration-dotted">
                  Show the exact event that will be signed
                </span>
              </summary>
              <pre className="mt-3 max-h-56 overflow-auto rounded-md border border-border bg-muted/40 p-3 text-[11px] leading-relaxed font-mono text-muted-foreground whitespace-pre-wrap break-all">
                {JSON.stringify({ kind: WIRE_KIND, content: '', tags }, null, 2)}
              </pre>
            </details>
          </div>

          {/* What's NOT published */}
          <div className="flex gap-3 rounded-lg border border-border/60 bg-muted/30 p-3">
            <Shield className="size-4 text-oracle shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">What stays private:</strong> Raw questionnaire answers, 
              birth date/time/place, individual item responses, and scoring details are 
              <strong> never published</strong>. Only the derived type codes shown above become public.
            </div>
          </div>

          {/* Warning */}
          <div className="flex gap-3 rounded-lg border border-oracle/20 bg-oracle/5 p-3">
            <AlertTriangle className="size-4 text-oracle shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Published events are broadcast to Nostr relays. While you can send a deletion request
              (unpublish), relays are not required to honor it. Publish only what you're comfortable 
              having permanently associated with your npub.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <Button
              onClick={handlePublish}
              disabled={isPending}
              className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-6 gap-1.5"
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Globe className="size-4" />
              )}
              {isPublished ? 'Update Wire' : 'Publish Wire'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowPreview(false)}
              className="rounded-full"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default: unpublished, show CTA
  return (
    <Card className={cn('border-dashed border-oracle/20')}>
      <CardContent className="py-8 px-6 text-center">
        <Globe className="size-8 text-oracle mx-auto mb-3" />
        <p className="font-serif text-lg text-foreground mb-2">
          Publish Your Wire
        </p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
          Make your psychometric fingerprint visible on Nostr. Only type codes are published — 
          raw answers stay private on your device.
        </p>
        <Button
          onClick={() => setShowPreview(true)}
          className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-8"
        >
          Preview &amp; Publish
        </Button>
      </CardContent>
    </Card>
  );
}
