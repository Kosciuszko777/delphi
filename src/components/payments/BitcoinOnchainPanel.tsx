import { useState } from 'react';
import { QRCodeCanvas } from '@/components/ui/qrcode';
import { BITCOIN_ONCHAIN_ADDRESS } from '@/lib/support/config';
import { Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/useToast';

interface BitcoinOnchainPanelProps {
  /** Extra instruction under the address (e.g. seat-claim note). */
  note?: string;
}

/**
 * On-chain Bitcoin payment panel — QR (BIP-21 URI) + copyable address.
 * On-chain carries no comment field, so identification instructions
 * are passed in via `note` where a claim is involved.
 */
export function BitcoinOnchainPanel({ note }: BitcoinOnchainPanelProps) {
  const [copied, setCopied] = useState(false);

  if (!BITCOIN_ONCHAIN_ADDRESS) return null;

  const copyAddress = async () => {
    await navigator.clipboard.writeText(BITCOIN_ONCHAIN_ADDRESS);
    setCopied(true);
    toast({ title: 'Bitcoin address copied' });
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="engraved rounded-[2px] bg-background/40 p-5 max-w-sm mx-auto text-center space-y-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-umbra dark:text-ash">
        On-chain Bitcoin
      </p>
      <QRCodeCanvas value={`bitcoin:${BITCOIN_ONCHAIN_ADDRESS}`} size={176} className="mx-auto rounded-sm" />
      <button
        onClick={copyAddress}
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground break-all"
      >
        {copied ? <Check className="size-3 text-verdigris shrink-0" /> : <Copy className="size-3 shrink-0" />}
        {BITCOIN_ONCHAIN_ADDRESS}
      </button>
      {note && (
        <p className="text-xs text-muted-foreground leading-relaxed">{note}</p>
      )}
    </div>
  );
}
