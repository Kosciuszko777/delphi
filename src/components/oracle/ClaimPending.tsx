import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Omphalos } from '@/components/wire/Omphalos';
import { useTranslation } from '@/hooks/useTranslation';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

/**
 * Shown after payment while the Initiate seal is being inscribed.
 * "Check again" invalidates the seal query; once entitlement upgrades
 * the parent unmounts this and shows the chat.
 */
export function ClaimPending() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [checking, setChecking] = useState(false);

  const handleCheck = async () => {
    setChecking(true);
    // Invalidate all seal-related queries so useIsCouncillor / useHasSeal refetch
    await queryClient.invalidateQueries({ queryKey: ['seal'] });
    await queryClient.invalidateQueries({ queryKey: ['council'] });
    // Small delay to show the spinner
    setTimeout(() => setChecking(false), 1500);
  };

  return (
    <div className="engraved grain rounded-[2px] bg-card p-6 sm:p-8 text-center space-y-4">
      <Omphalos className="size-7 text-oracle mx-auto" />
      <p className="font-serif text-foreground leading-relaxed max-w-md mx-auto">
        {t('oracle.pending.message')}
      </p>
      <p className="text-xs text-muted-foreground">
        {t('oracle.pending.canonNote')}
      </p>
      <Button
        onClick={handleCheck}
        variant="outline"
        className="rounded-full gap-1.5"
        disabled={checking}
      >
        {checking && <Loader2 className="size-3.5 animate-spin" />}
        {t('oracle.pending.check')}
      </Button>
    </div>
  );
}
