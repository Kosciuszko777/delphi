import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useNostrPublish } from '@/hooks/useNostrPublish';
import { useAttestations, usePublishedAttestations, parseAttestationEvent } from '@/hooks/useAttestations';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/useToast';
import type { Wire } from '@/lib/wire';
import { getTraitsForWire, type Trait, type TraitAttestation } from '@/lib/publish/traits';
import { buildAttestationTags, ATTESTATION_KIND } from '@/lib/publish/wireEvent';
import {
  Fingerprint,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Check,
  Loader2,
  Globe,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelfAttestationFlowProps {
  wire: Wire;
}

export function SelfAttestationFlow({ wire }: SelfAttestationFlowProps) {
  const { user } = useCurrentUser();
  const { mutateAsync: publish, isPending } = useNostrPublish();
  const queryClient = useQueryClient();
  const { attestations, setAttestation } = useAttestations();
  const { data: publishedEvent } = usePublishedAttestations(user?.pubkey);
  const [expanded, setExpanded] = useState(false);

  const traits = getTraitsForWire(wire);

  if (traits.length === 0) return null;

  // Merge published attestations with local
  const publishedAttestations = publishedEvent ? parseAttestationEvent(publishedEvent) : {};
  const mergedAttestations = { ...publishedAttestations, ...attestations };

  const attestedCount = Object.keys(mergedAttestations).length;
  const totalTraits = traits.length;
  const isFullyAttested = attestedCount >= totalTraits;
  const hasLocalChanges = Object.keys(attestations).length > 0;
  const isPublished = !!publishedEvent;

  const handlePublish = async () => {
    if (!user) return;
    try {
      const tags = buildAttestationTags(user.pubkey, mergedAttestations);
      await publish({
        kind: ATTESTATION_KIND,
        content: '',
        tags,
      });
      await queryClient.invalidateQueries({ queryKey: ['delphi', 'attestations'] });
      toast({ title: 'Attestations published', description: 'Your trait weightings are now on Nostr.' });
    } catch (err) {
      toast({ title: 'Publishing failed', description: String(err), variant: 'destructive' });
    }
  };

  if (!user) {
    return (
      <Card className="border-dashed border-border/60">
        <CardContent className="py-8 px-6 text-center">
          <Fingerprint className="size-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-serif text-lg text-foreground mb-2">Self-Attestations</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Log in to weight and confirm individual traits in your Wire.
            Self-attestations let you refine how well each trait describes you.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Group traits by system
  const groupedTraits = groupBySystem(traits);

  return (
    <Card className="border-border">
      <CardContent className="py-6 px-6 space-y-5">
        {/* Header */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center gap-2">
            <Fingerprint className="size-5 text-oracle" />
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Self-Attestations
            </h3>
            <Badge variant="outline" className="font-mono text-xs">
              {attestedCount}/{totalTraits}
            </Badge>
          </div>
          {expanded ? (
            <ChevronUp className="size-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-4 text-muted-foreground" />
          )}
        </button>

        {!expanded && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isFullyAttested
              ? 'All traits attested. Publish to make your weightings visible on Nostr.'
              : 'Rate how strongly each trait describes you. Your attestations refine the raw type codes into a personal signal.'}
          </p>
        )}

        {expanded && (
          <>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For each trait derived from your assessments, indicate whether it describes you — 
              <strong> confirm</strong>, <strong>deny</strong>, or <strong>partial</strong> — and 
              how strongly (0–100%). This becomes your published self-attestation.
            </p>

            <Separator />

            {/* Trait groups */}
            <div className="space-y-6">
              {groupedTraits.map(({ system, label, traits: groupTraits }) => (
                <div key={system} className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {label}
                  </h4>
                  <div className="space-y-2">
                    {groupTraits.map((trait) => (
                      <TraitRow
                        key={trait.id}
                        trait={trait}
                        attestation={mergedAttestations[trait.id]}
                        onAttest={(att) => setAttestation(trait.id, att)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Publish button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Button
                onClick={handlePublish}
                disabled={isPending || (!hasLocalChanges && isPublished)}
                className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-6 gap-1.5"
              >
                {isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : isPublished ? (
                  <Check className="size-4" />
                ) : (
                  <Globe className="size-4" />
                )}
                {isPublished ? 'Update Attestations' : 'Publish Attestations'}
              </Button>
              {isPublished && !hasLocalChanges && (
                <span className="text-xs text-muted-foreground">
                  Published — make changes above to update.
                </span>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

/** A single trait row with confirm/deny/partial toggles and a weight slider. */
function TraitRow({
  trait,
  attestation,
  onAttest,
}: {
  trait: Trait;
  attestation?: TraitAttestation;
  onAttest: (att: TraitAttestation) => void;
}) {
  const verb = attestation?.verb;
  const weight = attestation?.weight ?? 0.7;

  const setVerb = useCallback(
    (v: TraitAttestation['verb']) => {
      const w = v === 'confirm' ? 0.9 : v === 'deny' ? 0.0 : 0.5;
      onAttest({ traitId: trait.id, verb: v, weight: attestation ? attestation.weight : w });
    },
    [trait.id, attestation, onAttest],
  );

  const setWeight = useCallback(
    (values: number[]) => {
      const w = (values[0] ?? 70) / 100;
      onAttest({
        traitId: trait.id,
        verb: attestation?.verb ?? 'confirm',
        weight: Math.round(w * 10) / 10,
      });
    },
    [trait.id, attestation?.verb, onAttest],
  );

  return (
    <div className="rounded-lg border border-border bg-card p-3 sm:p-4 space-y-3">
      {/* Trait info */}
      <div>
        <p className="text-sm font-medium text-foreground">{trait.label}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{trait.description}</p>
      </div>

      {/* Verb toggles */}
      <div className="flex items-center gap-2">
        <VerbButton
          active={verb === 'confirm'}
          onClick={() => setVerb('confirm')}
          icon={<ThumbsUp className="size-3.5" />}
          label="Confirm"
          activeClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
        />
        <VerbButton
          active={verb === 'partial'}
          onClick={() => setVerb('partial')}
          icon={<Minus className="size-3.5" />}
          label="Partial"
          activeClass="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
        />
        <VerbButton
          active={verb === 'deny'}
          onClick={() => setVerb('deny')}
          icon={<ThumbsDown className="size-3.5" />}
          label="Deny"
          activeClass="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30"
        />
      </div>

      {/* Weight slider — only show once a verb is selected */}
      {verb && (
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-12 shrink-0">Weight</span>
          <Slider
            value={[Math.round(weight * 100)]}
            onValueChange={setWeight}
            min={0}
            max={100}
            step={10}
            className="flex-1"
          />
          <span className="text-xs font-mono text-muted-foreground w-10 text-right">
            {Math.round(weight * 100)}%
          </span>
        </div>
      )}
    </div>
  );
}

function VerbButton({
  active,
  onClick,
  icon,
  label,
  activeClass,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  activeClass: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
        active
          ? activeClass
          : 'border-border text-muted-foreground hover:border-oracle/30 hover:text-foreground',
      )}
    >
      {icon}
      {label}
    </button>
  );
}

interface SystemGroup {
  system: string;
  label: string;
  traits: Trait[];
}

function groupBySystem(traits: Trait[]): SystemGroup[] {
  const systemLabels: Record<string, string> = {
    jung: 'Jungian Type',
    enneagram: 'Enneagram',
    millman: 'Millman Life-Purpose',
    hd: 'Human Design',
  };

  const groups: Record<string, Trait[]> = {};
  for (const trait of traits) {
    if (!groups[trait.system]) {
      groups[trait.system] = [];
    }
    groups[trait.system].push(trait);
  }

  return Object.entries(groups).map(([system, systemTraits]) => ({
    system,
    label: systemLabels[system] ?? system,
    traits: systemTraits,
  }));
}
