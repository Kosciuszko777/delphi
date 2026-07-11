import { useSeoMeta } from '@unhead/react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { WireCard } from '@/components/wire/WireCard';
import { useWire } from '@/hooks/useWire';
import { isWirePopulated } from '@/lib/wire';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, Shield, Fingerprint } from 'lucide-react';

const Index = () => {
  const { wire } = useWire();
  const hasWire = isWirePopulated(wire);

  useSeoMeta({
    title: 'Delphi — Know Thyself',
    description: 'A sovereign self-knowledge application. Take personality assessments, build your psychometric Wire, and understand yourself on your own terms.',
  });

  return (
    <AppLayout>
      {/* Hero section */}
      <section className="relative isolate overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-oracle/5 via-transparent to-transparent" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">
          {/* Greek inscription */}
          <p className="font-serif italic text-oracle text-sm sm:text-base tracking-widest mb-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700">
            γνῶθι σεαυτόν
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
            Know Thyself
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Build your psychometric fingerprint across four ancient and modern typology systems. 
            Your identity, your data, sovereign on Nostr.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {hasWire ? (
              <>
                <Button asChild size="lg" className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-8">
                  <Link to="/wire">
                    View My Wire
                    <ArrowRight className="size-4 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link to="/assess">Continue Assessments</Link>
                </Button>
              </>
            ) : (
              <Button asChild size="lg" className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-8">
                <Link to="/assess">
                  Begin Your Assessment
                  <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Wire card (if any results exist) */}
      {hasWire && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-12">
          <WireCard wire={wire} />
        </section>
      )}

      {/* Principles */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid sm:grid-cols-3 gap-8">
          <PrincipleCard
            icon={<Shield className="size-5" />}
            title="Sovereign"
            description="Your data stays on your device until you choose to publish. Raw answers never leave unencrypted. You control what the world sees."
          />
          <PrincipleCard
            icon={<Fingerprint className="size-5" />}
            title="Pseudonymous"
            description="No names, no email, no accounts. Only your Nostr key. Your Wire is a psychometric fingerprint attached to a cryptographic identity."
          />
          <PrincipleCard
            icon={<Eye className="size-5" />}
            title="Self-Attested"
            description="You confirm, deny, or weight every trait in your profile. The Wire reflects how you see yourself — not how a test scores you."
          />
        </div>
      </section>

      {/* Systems overview */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center mb-4">
          Four Systems, One Wire
        </h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
          Each assessment fills a chamber in your Wire — building a multi-dimensional map of who you are.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <SystemCard
            letter="M"
            name="Millman Life-Purpose"
            description="Your birth date reveals a life-purpose number — the core themes and lessons your path is oriented around."
            available
            to="/assess/millman"
          />
          <SystemCard
            letter="J"
            name="16-Type Jungian"
            description="A cognitive-function assessment mapping how you perceive, decide, and orient your energy in the world."
            available={false}
          />
          <SystemCard
            letter="E"
            name="Enneagram"
            description="Nine fundamental character structures — your core motivation, your fear, and the pattern you return to under stress."
            available={false}
          />
          <SystemCard
            letter="H"
            name="Human Design"
            description="Your energetic type, profile, and decision-making authority — how you're designed to interact with the world."
            available={false}
          />
        </div>
      </section>
    </AppLayout>
  );
};

function PrincipleCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center sm:text-left">
      <div className="inline-flex items-center justify-center size-10 rounded-full bg-oracle/10 text-oracle mb-4">
        {icon}
      </div>
      <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function SystemCard({ letter, name, description, available, to }: {
  letter: string;
  name: string;
  description: string;
  available: boolean;
  to?: string;
}) {
  const content = (
    <div className={`flex gap-4 p-4 sm:p-5 rounded-xl border transition-all ${
      available
        ? 'border-oracle/20 bg-card hover:border-oracle/40 hover:shadow-sm cursor-pointer'
        : 'border-border/50 bg-muted/30 opacity-60'
    }`}>
      <div className={`flex items-center justify-center size-10 rounded-full text-sm font-bold shrink-0 ${
        available ? 'bg-oracle/15 text-oracle' : 'bg-muted text-muted-foreground'
      }`}>
        {letter}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-serif font-semibold text-foreground">{name}</h3>
          {!available && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Coming soon</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );

  if (available && to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
}

export default Index;
