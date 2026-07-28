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
    // Hero — 777-seats line (German default)
    expect(
      await screen.findByText('Siebenhundertsiebenundsiebzig Sitze.'),
    ).toBeInTheDocument();
    expect(await screen.findByText(/Was ein Sitz beinhaltet/i)).toBeInTheDocument();
    // Themis boundaries present verbatim (German default)
    expect(
      await screen.findByText(/keine Investition, keine Umsatzbeteiligung/i),
    ).toBeInTheDocument();
    expect(await screen.findByText(/Ein Sitz pro Person/i)).toBeInTheDocument();
    expect(await screen.findByText(/innerhalb von 14 Tagen/i)).toBeInTheDocument();
    // Price line — $777 is rendered from config constant
    expect(await screen.findByText(/\$777/)).toBeInTheDocument();
    expect(await screen.findByText(/Äquivalent in Lightning/i)).toBeInTheDocument();
  });

  it('shows the pre-launch state while checkout config is unarmed', async () => {
    render(
      <TestApp>
        <CouncilPage />
      </TestApp>,
    );
    if (!COUNCIL_LIGHTNING_ADDRESS && !COUNCIL_STRIPE_LINK) {
      expect(
        await screen.findByText(/Der Rat tagt in Kürze/i),
      ).toBeInTheDocument();
    }
    expect(
      await screen.findByText(/der erste Sitz ist noch nicht gemeisselt/i),
    ).toBeInTheDocument();
  });
});
