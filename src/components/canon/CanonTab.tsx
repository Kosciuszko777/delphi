import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWire } from '@/hooks/useWire';
import { useAttestations } from '@/hooks/useAttestations';
import { useTranslation } from '@/hooks/useTranslation';
import { composeAnswer, routeQuestion, DOMAINS } from '@/canon';
import type { Domain, ComposedAnswer } from '@/canon';
import { isWirePopulated, filledChamberCount, TOTAL_CHAMBERS } from '@/lib/wire';
import { Omphalos } from '@/components/wire/Omphalos';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp } from 'lucide-react';

const DOMAIN_LABELS: Record<Domain, string> = {
  purpose: 'Purpose',
  happiness: 'Happiness',
  work: 'Work',
  team: 'Team',
  relationships: 'Relationships',
  conflict: 'Conflict',
  energy: 'Energy',
  growth: 'Growth',
};

const SOURCE_LABELS: Record<string, string> = {
  JUNG: 'JUNG',
  ENNEA: 'ENNEA',
  HD: 'HD',
  NUM: 'NUM',
  FRICTION: 'WHERE YOUR SYSTEMS PULL',
};

/**
 * The Canon tab — deterministic, offline, unmetered answer engine.
 * Composes answers from the Delphi written corpus.
 */
export function CanonTab() {
  const { wire } = useWire();
  const { attestations } = useAttestations();
  const { t } = useTranslation();
  const [answer, setAnswer] = useState<ComposedAnswer | null>(null);
  const [input, setInput] = useState('');
  const [activeDomain, setActiveDomain] = useState<Domain | null>(null);

  const populated = isWirePopulated(wire);
  const filled = filledChamberCount(wire);

  const askDomain = (domain: Domain) => {
    const result = composeAnswer(wire, attestations, domain);
    setAnswer(result);
    setActiveDomain(domain);
  };

  const submitFreeText = () => {
    const text = input.trim();
    if (!text) return;

    const routed = routeQuestion(text);
    if (routed) {
      askDomain(routed);
    } else {
      // No match → answer with purpose + strongest friction, offer domain chips
      askDomain('purpose');
    }
    setInput('');
  };

  if (!populated) {
    return (
      <div className="engraved grain rounded-[2px] bg-card p-8 text-center space-y-3">
        <p className="font-serif text-foreground">{t('canon.unwritten')}</p>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/assess">{t('oracle.beginAssessment')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Positioning line */}
      <p className="text-xs text-muted-foreground text-center leading-relaxed max-w-md mx-auto">
        {t('canon.positioning')}
      </p>

      {/* Chamber count */}
      <p className="text-center font-mono text-[11px] text-ash">
        {t('canon.chambers', { filled: String(filled), total: String(TOTAL_CHAMBERS) })}
      </p>

      {/* Domain chips */}
      <div className="engraved grain rounded-[2px] bg-card p-4">
        <div className="flex flex-wrap justify-center gap-2">
          {DOMAINS.map((domain) => (
            <button
              key={domain}
              onClick={() => askDomain(domain)}
              className={`engraved rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                activeDomain === domain
                  ? 'bg-oracle/10 text-oracle'
                  : 'text-foreground hover:bg-oracle/5'
              }`}
            >
              {DOMAIN_LABELS[domain]}
            </button>
          ))}
        </div>
      </div>

      {/* Free-text input */}
      <div className="engraved rounded-[2px] bg-card p-3 flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submitFreeText();
            }
          }}
          placeholder={t('canon.placeholder')}
          rows={2}
          className="resize-none border-0 bg-transparent focus-visible:ring-0 text-sm"
        />
        <Button
          size="icon"
          onClick={submitFreeText}
          disabled={!input.trim()}
          className="rounded-full bg-oracle text-oracle-foreground hover:bg-oracle/90 shrink-0"
          aria-label="Ask"
        >
          <ArrowUp className="size-4" />
        </Button>
      </div>

      {/* Answer */}
      {answer && (
        <div className="space-y-4">
          {/* Domain badge */}
          <div className="text-center">
            <span className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-oracle">
              {DOMAIN_LABELS[answer.domain]}
            </span>
          </div>

          {/* Sections with provenance labels */}
          <div className="engraved grain rounded-[2px] bg-card p-6 sm:p-8 space-y-6">
            <Omphalos className="size-6 text-oracle mx-auto" />

            {answer.sections.map((section, i) => (
              <div key={i}>
                {section.source === 'FRICTION' ? (
                  /* Friction block — distinct visual treatment */
                  <div className="engraved rounded-[2px] bg-verdigris/5 border border-verdigris/20 p-4 space-y-2">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-verdigris">
                      {SOURCE_LABELS[section.source]}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground">
                      {section.text}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-umbra dark:text-ash mb-1.5">
                      {SOURCE_LABELS[section.source]}
                    </h3>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-foreground">
                      {section.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer line */}
          <p className="text-center text-[11px] text-muted-foreground leading-relaxed max-w-sm mx-auto">
            {t('canon.footer')}
          </p>
        </div>
      )}
    </div>
  );
}
