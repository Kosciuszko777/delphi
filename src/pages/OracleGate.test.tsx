import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestApp } from '@/test/TestApp';
import { OracleGate } from '@/components/oracle/OracleGate';
import { ClaimPending } from '@/components/oracle/ClaimPending';
import { PLAN_INITIATE_STRIPE, SUPPORT_LIGHTNING_ADDRESS } from '@/lib/support/config';

describe('OracleGate', () => {
  it('renders the gate heading and body copy (German default)', async () => {
    render(
      <TestApp>
        <OracleGate />
      </TestApp>,
    );
    // Eyebrow
    expect(await screen.findByText('DAS ORAKEL')).toBeInTheDocument();
    // Heading (German)
    expect(
      await screen.findByText(/Der Kanon antwortet aus den geschriebenen Lehren/i),
    ).toBeInTheDocument();
    // Body (German)
    expect(
      await screen.findByText(/Gegründet auf deinem Soulgraph/i),
    ).toBeInTheDocument();
    // Fine print (German)
    expect(
      await screen.findByText(/Initianten-Siegel.*eingeschrieben/i),
    ).toBeInTheDocument();
    // Council cross-link
    expect(
      await screen.findByText(/Ratssitz beinhaltet das Orakel für immer/i),
    ).toBeInTheDocument();
  });

  it('shows card button when Stripe link is armed', async () => {
    render(
      <TestApp>
        <OracleGate />
      </TestApp>,
    );
    if (PLAN_INITIATE_STRIPE) {
      expect(await screen.findByText(/Per Karte bezahlen/i)).toBeInTheDocument();
    }
  });

  it('shows lightning button when LN address is armed', async () => {
    render(
      <TestApp>
        <OracleGate />
      </TestApp>,
    );
    if (SUPPORT_LIGHTNING_ADDRESS) {
      expect(await screen.findByText(/Mit Lightning bezahlen/i)).toBeInTheDocument();
    }
  });

  it('shows "opens shortly" when both checkouts are empty', async () => {
    // This test validates the fallback; when both configs are armed
    // it verifies the checkout is available instead
    render(
      <TestApp>
        <OracleGate />
      </TestApp>,
    );
    if (!PLAN_INITIATE_STRIPE && !SUPPORT_LIGHTNING_ADDRESS) {
      expect(await screen.findByText(/öffnet in Kürze/i)).toBeInTheDocument();
    } else {
      // Checkout is visible — verify price line
      expect(await screen.findByText(/CHF 9/)).toBeInTheDocument();
    }
  });
});

describe('ClaimPending', () => {
  it('renders the pending message and check button (German default)', async () => {
    render(
      <TestApp>
        <ClaimPending />
      </TestApp>,
    );
    expect(
      await screen.findByText(/Zahlung erhalten.*Siegel wird eingeschrieben/i),
    ).toBeInTheDocument();
    expect(await screen.findByText(/Erneut prüfen/i)).toBeInTheDocument();
  });
});
