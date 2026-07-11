import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { captureReferrer } from '@/lib/support/referral';

/**
 * Captures ?ref=<npub> on any route into localStorage
 * (first referrer wins, 90-day validity). Renders nothing.
 */
export function ReferralCapture() {
  const location = useLocation();

  useEffect(() => {
    captureReferrer(location.search);
  }, [location.search]);

  return null;
}
