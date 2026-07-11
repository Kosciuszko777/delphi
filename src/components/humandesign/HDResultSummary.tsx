import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { HumanDesignResult } from '@/lib/wire';
import { HD_TYPES, HD_PROFILES, HD_AUTHORITIES } from '@/lib/humandesign/data';

interface HDResultSummaryProps {
  result: HumanDesignResult;
}

export function HDResultSummary({ result }: HDResultSummaryProps) {
  const typeData = HD_TYPES.find(t => t.value === result.type);
  const profileData = HD_PROFILES.find(p => p.value === result.profile);
  const authorityData = HD_AUTHORITIES.find(a => a.value === result.authority);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl border border-oracle/20 bg-gradient-to-br from-card via-card to-oracle-muted/20 p-8 sm:p-10 text-center">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-oracle/40 to-transparent" />

        <p className="text-sm text-muted-foreground mb-2">Human Design</p>

        <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-oracle tracking-wide">
          {result.type}
        </div>
        <p className="font-serif text-xl sm:text-2xl font-semibold text-foreground mt-2">
          {result.profile}
        </p>
        {typeData && (
          <p className="text-muted-foreground mt-1 italic font-serif">
            Strategy: {typeData.strategy}
          </p>
        )}
      </div>

      {/* Three key elements */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-oracle/15 bg-oracle/5 p-5">
          <h3 className="font-serif font-semibold text-foreground mb-1 text-sm">Type</h3>
          <p className="font-serif text-lg font-bold text-oracle">{result.type}</p>
          {typeData && (
            <p className="text-xs text-muted-foreground mt-1">{typeData.frequency} of population</p>
          )}
        </div>
        <div className="rounded-xl border border-oracle/15 bg-oracle/5 p-5">
          <h3 className="font-serif font-semibold text-foreground mb-1 text-sm">Profile</h3>
          <p className="font-serif text-lg font-bold text-oracle">{result.profile}</p>
          {profileData && (
            <p className="text-xs text-muted-foreground mt-1">{profileData.label.split(' — ')[1]}</p>
          )}
        </div>
        <div className="rounded-xl border border-oracle/15 bg-oracle/5 p-5">
          <h3 className="font-serif font-semibold text-foreground mb-1 text-sm">Authority</h3>
          <p className="font-serif text-lg font-bold text-oracle">{result.authority}</p>
        </div>
      </div>

      {/* Type description */}
      {typeData && (
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
            {typeData.label}
          </h3>
          <p className="text-sm text-oracle font-medium italic mb-4">
            Strategy: {typeData.strategy}
          </p>
          <p className="text-[0.95rem] text-foreground/90 leading-relaxed">
            {typeData.description}
          </p>
        </div>
      )}

      {/* Profile description */}
      {profileData && (
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <h3 className="font-serif font-semibold text-foreground mb-2">
            Profile: {profileData.label}
          </h3>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {profileData.description}
          </p>
        </div>
      )}

      {/* Authority description */}
      {authorityData && (
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <h3 className="font-serif font-semibold text-foreground mb-2">
            Authority: {authorityData.label}
          </h3>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {authorityData.description}
          </p>
        </div>
      )}

      <Separator />

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground mr-1">Summary:</span>
        <Badge variant="secondary" className="font-normal">{result.type}</Badge>
        <Badge variant="secondary" className="font-normal">{result.profile}</Badge>
        <Badge variant="secondary" className="font-normal">{result.authority} Authority</Badge>
      </div>
    </div>
  );
}
