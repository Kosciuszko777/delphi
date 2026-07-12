import { useSeoMeta } from '@unhead/react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { WireCard } from '@/components/wire/WireCard';
import { useWire } from '@/hooks/useWire';
import { useTranslation } from '@/hooks/useTranslation';
import { isWirePopulated } from '@/lib/wire';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, Shield, Fingerprint } from 'lucide-react';

const HowItWorksPage = () => {
  const { wire } = useWire();
  const hasWire = isWirePopulated(wire);
  const { t } = useTranslation();

  useSeoMeta({
    title: 'How It Works — Delphi',
    description: 'Four ancient and modern typology systems, one sovereign Wire. Learn how Delphi helps you know yourself.',
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
            {t('home.inscription')}
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
            {t('home.title')}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('home.subtitle')}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {hasWire ? (
              <>
                <Button asChild size="lg" className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-8">
                  <Link to="/wire">
                    {t('home.viewWire')}
                    <ArrowRight className="size-4 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link to="/assess">{t('home.continueAssessments')}</Link>
                </Button>
              </>
            ) : (
              <Button asChild size="lg" className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-8">
                <Link to="/assess">
                  {t('home.beginAssessment')}
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
            title={t('home.principle.sovereign')}
            description={t('home.principle.sovereign.desc')}
          />
          <PrincipleCard
            icon={<Fingerprint className="size-5" />}
            title={t('home.principle.pseudonymous')}
            description={t('home.principle.pseudonymous.desc')}
          />
          <PrincipleCard
            icon={<Eye className="size-5" />}
            title={t('home.principle.selfAttested')}
            description={t('home.principle.selfAttested.desc')}
          />
        </div>
      </section>

      {/* Systems overview */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center mb-4">
          {t('home.systems.title')}
        </h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
          {t('home.systems.subtitle')}
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <SystemCard
            letter="M"
            name={t('home.systems.millman')}
            description={t('home.systems.millman.desc')}
            available
            to="/assess/millman"
          />
          <SystemCard
            letter="J"
            name={t('home.systems.jung')}
            description={t('home.systems.jung.desc')}
            available
            to="/assess/jung"
          />
          <SystemCard
            letter="E"
            name={t('home.systems.enneagram')}
            description={t('home.systems.enneagram.desc')}
            available
            to="/assess/enneagram"
          />
          <SystemCard
            letter="H"
            name={t('home.systems.hd')}
            description={t('home.systems.hd.desc')}
            available
            to="/assess/human-design"
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
  const { t } = useTranslation();
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
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{t('home.comingSoon')}</span>
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

export default HowItWorksPage;
