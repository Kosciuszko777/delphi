import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestApp } from '@/test/TestApp';
import { WireCard } from './WireCard';
import type { Wire } from '@/lib/wire';

const fullWire = {
  jung: { type: 'INTJ' },
  humanDesign: { type: 'Generator', profile: '3/5', authority: 'Sacral' },
  millman: { number: '29/11' },
  enneagram: { core: 8, wing: 7 },
} as unknown as Wire;

/**
 * TestApp mounts its Nostr providers asynchronously, so the card
 * appears one tick after render — all queries must be findBy*.
 */
function renderCard(props: Parameters<typeof WireCard>[0]) {
  return render(
    <TestApp>
      <WireCard {...props} />
    </TestApp>,
  );
}

describe('WireCard — the votive tablet', () => {
  it('renders all four chamber labels', async () => {
    renderCard({ wire: {} as Wire });
    expect(await screen.findByText('Jung')).toBeInTheDocument();
    expect(await screen.findByText('HD')).toBeInTheDocument();
    expect(await screen.findByText('Num')).toBeInTheDocument();
    expect(await screen.findByText('Ennea')).toBeInTheDocument();
  });

  it('empty chambers are prepared niches captioned "unwritten"', async () => {
    renderCard({ wire: {} as Wire });
    expect(await screen.findAllByText('unwritten')).toHaveLength(4);
  });

  it('partial wires show remaining niches as unwritten', async () => {
    renderCard({ wire: { millman: { number: '30/3' } } as Wire });
    expect(await screen.findByText('30/3')).toBeInTheDocument();
    expect(await screen.findAllByText('unwritten')).toHaveLength(3);
  });

  it('renders the full Wire string in the corrected Millman notation', async () => {
    renderCard({ wire: fullWire });
    expect(
      await screen.findByText('INTJ \u00B7 Generator 3/5 \u00B7 Millman 29/11 \u00B7 Enneagram 8w7'),
    ).toBeInTheDocument();
    expect(screen.queryByText('unwritten')).not.toBeInTheDocument();
  });

  it('carries the header seal count and the Delphic motto', async () => {
    renderCard({ wire: fullWire });
    expect(await screen.findByText(/Delphi · 4\/4/)).toBeInTheDocument();
    expect(await screen.findByText('\u0393\u039D\u03A9\u0398\u0399 \u03A3\u0395\u0391\u03A5\u03A4\u039F\u039D')).toBeInTheDocument();
  });

  it('inscribes displayName and npub when provided', async () => {
    renderCard({ wire: fullWire, displayName: 'Eleanor', npubShort: 'npub1qy3\u2026x0f4' });
    expect(await screen.findByText('Eleanor')).toBeInTheDocument();
    expect(await screen.findByText('npub1qy3\u2026x0f4')).toBeInTheDocument();
  });

  it('stamps the verdigris seal only on attested chambers', async () => {
    renderCard({ wire: fullWire, attested: { jung: true, enneagram: true } });
    expect(await screen.findAllByTitle('Attested by peers')).toHaveLength(2);
  });

  it('shows no seal without attestations — verdigris must be earned', async () => {
    renderCard({ wire: fullWire });
    // Await the card itself first so absence is asserted against a rendered tablet
    await screen.findByText('\u0393\u039D\u03A9\u0398\u0399 \u03A3\u0395\u0391\u03A5\u03A4\u039F\u039D');
    expect(screen.queryByTitle('Attested by peers')).not.toBeInTheDocument();
  });

  it('compact mode renders the signature line only', async () => {
    renderCard({ wire: fullWire, compact: true });
    expect(
      await screen.findByText('INTJ \u00B7 Generator 3/5 \u00B7 Millman 29/11 \u00B7 Enneagram 8w7'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Jung')).not.toBeInTheDocument();
  });

  it('each chamber links to its assessment', async () => {
    renderCard({ wire: {} as Wire });
    const links = await screen.findAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/assess/jung');
    expect(hrefs).toContain('/assess/human-design');
    expect(hrefs).toContain('/assess/millman');
    expect(hrefs).toContain('/assess/enneagram');
  });
});
