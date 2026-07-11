import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestApp } from '@/test/TestApp';
import SupportPage from './SupportPage';

describe('SupportPage — the Hearth', () => {
  it('carries the exact header and the three sections', async () => {
    render(
      <TestApp>
        <SupportPage />
      </TestApp>,
    );
    expect(
      await screen.findByText('Do you like what you just experienced?'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Support our mission for better understanding/i),
    ).toBeInTheDocument();
    expect(await screen.findByText('Plans')).toBeInTheDocument();
    expect(await screen.findByText('The 777 Club')).toBeInTheDocument();
  });

  it('renders the plan ladder with exact prices', async () => {
    render(
      <TestApp>
        <SupportPage />
      </TestApp>,
    );
    expect(await screen.findByText('CHF 9 / month')).toBeInTheDocument();
    expect(await screen.findByText('CHF 29 / month')).toBeInTheDocument();
    expect(await screen.findByText(/founding team rate/i)).toBeInTheDocument();
    expect(await screen.findByText(/CHF 1.900 \/ month|CHF 1'900 \/ month/)).toBeInTheDocument();
    expect(await screen.findByText(/USD 777 · once/)).toBeInTheDocument();
  });

  it('keeps the gift/sale line clean and degrades gracefully unarmed', async () => {
    render(
      <TestApp>
        <SupportPage />
      </TestApp>,
    );
    expect(
      await screen.findByText(/Donations are gifts, not purchases/i),
    ).toBeInTheDocument();
    // Lightning + on-chain donation rails are armed
    expect(await screen.findByText('Lightning')).toBeInTheDocument();
    expect(await screen.findByText('On-chain')).toBeInTheDocument();
    // Signed out: referral identity nudge
    expect(
      await screen.findByText(/your key is your referral identity/i),
    ).toBeInTheDocument();
    // The enterprise sovereignty line
    expect(
      await screen.findByText(/Employee Wires remain employee-owned/i),
    ).toBeInTheDocument();
  });
});
