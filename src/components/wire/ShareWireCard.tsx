import { useState } from 'react';
import { nip19 } from 'nostr-tools';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useAuthor } from '@/hooks/useAuthor';
import { useUploadFile } from '@/hooks/useUploadFile';
import { useNostrPublish } from '@/hooks/useNostrPublish';
import { toast } from '@/hooks/useToast';
import type { Wire } from '@/lib/wire';
import { formatWire, isWirePopulated } from '@/lib/wire';
import { renderWireCardPng, type ShareFormat } from '@/lib/share/wireCardPng';
import { Download, ImageUp, Loader2, Smartphone } from 'lucide-react';

interface ShareWireCardProps {
  wire: Wire;
}

/**
 * Share controls for the Wire card.
 *
 * - Download the dark share PNG (1080×1080 square or 1080×1920 story)
 * - Post the square card to Nostr as a kind:20 picture event (NIP-68),
 *   uploaded via the user's Blossom servers — Delphi cards as native
 *   citizens of picture-first feeds (Olas et al.)
 */
export function ShareWireCard({ wire }: ShareWireCardProps) {
  const { user } = useCurrentUser();
  const author = useAuthor(user?.pubkey);
  const { mutateAsync: uploadFile } = useUploadFile();
  const { mutateAsync: publish } = useNostrPublish();

  const [busy, setBusy] = useState<'square' | 'story' | 'post' | null>(null);

  if (!isWirePopulated(wire)) return null;

  const npub = user ? nip19.npubEncode(user.pubkey) : undefined;
  const npubShort = npub ? `${npub.slice(0, 10)}…${npub.slice(-4)}` : undefined;
  const displayName = author.data?.metadata?.name;

  const render = (format: ShareFormat) =>
    renderWireCardPng(wire, {
      format,
      displayName,
      npubShort,
      link: npub ? `${location.host}/${npub}` : undefined,
    });

  const download = async (format: ShareFormat) => {
    setBusy(format);
    try {
      const blob = await render(format);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `delphi-wire-${format}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast({ title: 'Export failed', description: String(err), variant: 'destructive' });
    } finally {
      setBusy(null);
    }
  };

  const postKind20 = async () => {
    if (!user) return;
    setBusy('post');
    try {
      const blob = await render('square');
      const file = new File([blob], 'delphi-wire.png', { type: 'image/png' });
      const uploadTags = await uploadFile(file);

      // Compose a NIP-68 imeta tag from the uploader's NIP-94-style tags
      const byName = new Map(uploadTags.map(([name, value]) => [name, value]));
      const url = byName.get('url');
      if (!url) throw new Error('Upload returned no URL');
      const imeta = ['imeta', `url ${url}`, 'm image/png', 'dim 1080x1080'];
      const x = byName.get('x') ?? byName.get('ox');
      if (x) imeta.push(`x ${x}`);

      const wireStr = formatWire(wire);
      await publish({
        kind: 20,
        content: `${wireStr}\n\n\u0393\u039D\u03A9\u0398\u0399 \u03A3\u0395\u0391\u03A5\u03A4\u039F\u039D \u2014 know thyself.`,
        tags: [
          ['title', 'My Delphi Wire'],
          imeta,
          ['t', 'delphi'],
          ['t', 'wire'],
          ['alt', `Delphi Wire card: ${wireStr}`],
          ['client', 'delphi'],
        ],
      });

      toast({
        title: 'Wire card posted',
        description: 'Published as a picture event \u2014 visible in image-first Nostr clients.',
      });
    } catch (err) {
      toast({ title: 'Posting failed', description: String(err), variant: 'destructive' });
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => download('square')}
        disabled={busy !== null}
        className="rounded-full gap-1.5"
      >
        {busy === 'square' ? <Loader2 className="size-3.5 animate-spin" /> : <Download className="size-3.5" />}
        Download card
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => download('story')}
        disabled={busy !== null}
        className="rounded-full gap-1.5"
      >
        {busy === 'story' ? <Loader2 className="size-3.5 animate-spin" /> : <Smartphone className="size-3.5" />}
        Story format
      </Button>
      {user && (
        <Button
          size="sm"
          onClick={postKind20}
          disabled={busy !== null}
          className="rounded-full gap-1.5 bg-oracle text-oracle-foreground hover:bg-oracle/90"
        >
          {busy === 'post' ? <Loader2 className="size-3.5 animate-spin" /> : <ImageUp className="size-3.5" />}
          Post to Nostr
        </Button>
      )}
    </div>
  );
}
