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
    // Header (German default)
    expect(
      await screen.findByText('Gefällt dir, was du gerade erlebt hast?'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Unsere Mission für besseres Verständnis unterstützen/i),
    ).toBeInTheDocument();
    // Sections (German)
    expect(await screen.findByText('Pläne')).toBeInTheDocument();
    expect(await screen.findByText('Der 777 Club')).toBeInTheDocument();
  });

  it('renders the plan ladder with exact prices', async () => {
    render(
      <TestApp>
        <SupportPage />
      </TestApp>,
    );
    expect(await screen.findByText('CHF 9 / month')).toBeInTheDocument();
    expect(await screen.findByText('CHF 29 / month')).toBeInTheDocument();
    // Founding rate (German)
    expect(await screen.findByText(/Gründungsrate/i)).toBeInTheDocument();
    // Enterprise price — locale formatting may vary (1'900 or 1.900)
    expect(await screen.findByText(/CHF 1[.'']?900 \/ month/)).toBeInTheDocument();
    // Club price (German)
    expect(await screen.findByText(/USD 777 · einmalig/)).toBeInTheDocument();
  });

  it('keeps the gift/sale line clean and degrades gracefully unarmed', async () => {
    render(
      <TestApp>
        <SupportPage />
      </TestApp>,
    );
    // Gifts note (German)
    expect(
      await screen.findByText(/Spenden sind Geschenke, nicht Käufe/i),
    ).toBeInTheDocument();
    // Lightning + on-chain donation rails are armed
    expect(await screen.findByText('Lightning')).toBeInTheDocument();
    expect(await screen.findByText('On-chain')).toBeInTheDocument();
    // Signed out: referral identity nudge (German)
    expect(
      await screen.findByText(/dein Schlüssel ist deine Empfehlungsidentität/i),
    ).toBeInTheDocument();
    // The enterprise sovereignty line (German)
    expect(
      await screen.findByText(/Mitarbeiter-Wires bleiben Eigentum der Mitarbeiter/i),
    ).toBeInTheDocument();
  });
});
