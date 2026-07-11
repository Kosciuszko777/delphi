import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useIsCouncillor, useHasSeal } from '@/hooks/useCouncil';
import { INITIATE_BADGE_D_TAG } from '@/lib/support/config';
import type { Entitlement } from '@/lib/oracle/meter';

/** The Oracle entitlement ladder: council > initiate > free. */
export function useOracleEntitlement(): { entitlement: Entitlement } {
  const { user } = useCurrentUser();
  const { data: council } = useIsCouncillor(user?.pubkey);
  const { data: hasInitiate } = useHasSeal(user?.pubkey, INITIATE_BADGE_D_TAG);

  if (council?.isCouncillor) return { entitlement: 'council' };
  if (hasInitiate) return { entitlement: 'initiate' };
  return { entitlement: 'free' };
}
