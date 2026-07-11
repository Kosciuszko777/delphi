import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestApp } from '@/test/TestApp';
import CouncilPage from './CouncilPage';
import { COUNCIL_LIGHTNING_ADDRESS, COUNCIL_STRIPE_LINK } from '@/lib/council/config';

describe('CouncilPage', () => {
  it('renders the council hero and the seat terms', async () => {
    render(
      <TestApp>
        <CouncilPage />
      </TestApp>,
    );
    expect(
      await screen.findByText('Seven hundred seventy-seven seats.'),
    ).toBeInTheDocument();
    expect(await screen.findByText(/What a seat carries/i)).toBeInTheDocument();
    // Themis boundaries present verbatim
    expect(
      await screen.findByText(/not an investment, not a revenue share/i),
    ).toBeInTheDocument();
    expect(await screen.findByText(/One seat per person/i)).toBeInTheDocument();
    expect(await screen.findByText(/within 14 days/i)).toBeInTheDocument();
    // Price line
    expect(await screen.findByText(/\$777/)).toBeInTheDocument();
    expect(await screen.findByText(/equivalent in lightning/i)).toBeInTheDocument();
  });

  it('shows the pre-launch state while checkout config is unarmed', async () => {
    render(
      <TestApp>
        <CouncilPage />
      </TestApp>,
    );
    if (!COUNCIL_LIGHTNING_ADDRESS && !COUNCIL_STRIPE_LINK) {
      expect(
        await screen.findByText(/The council convenes shortly/i),
      ).toBeInTheDocument();
    }
    expect(
      await screen.findByText(/the first seat is not yet carved/i),
    ).toBeInTheDocument();
  });
});
