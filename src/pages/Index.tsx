import { useSeoMeta } from '@unhead/react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { useWire } from '@/hooks/useWire';
import { isWirePopulated } from '@/lib/wire';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, EyeOff, Lock, Landmark } from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();
  const { wire } = useWire();
  const hasWire = isWirePopulated(wire);

  useSeoMeta({
    title: 'Delphi — Know Thyself',
    description: 'The self-sovereign app for human development and better mutual understanding. Built on Nostr. No trackers, no cookies. Join the temple.',
  });

  return (
    <AppLayout>
      {/* ─── Hero ─── */}
      <section className="relative isolate overflow-hidden">
        {/* Layered background: radial gold glow + gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-oracle/[0.06] via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-oracle/[0.04] blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-32 pb-16 sm:pb-24 text-center">
          {/* Temple illustration */}
          <TempleIllustration className="mx-auto mb-10 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000" />

          {/* Greek inscription */}
          <p className="font-serif italic text-oracle text-sm sm:text-base tracking-[0.25em] mb-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700 motion-safe:delay-200">
            {t('landing.inscription')}
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
            {t('landing.title')}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('landing.subtitle')}
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            {hasWire ? (
              <>
                <Button asChild size="lg" className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-8 text-base">
                  <Link to="/wire">
                    {t('home.viewWire')}
                    <ArrowRight className="size-4 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base">
                  <Link to="/assess">{t('home.continueAssessments')}</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg" className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-8 text-base">
                  <Link to="/assess">
                    {t('landing.cta')}
                    <ArrowRight className="size-4 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base">
                  <Link to="/how-it-works">{t('nav.howItWorks')}</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ─── Promise strip ─── */}
      <section className="border-y border-border/40 bg-card/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <PromiseItem icon={<ShieldCheck className="size-5" />} text={t('landing.promise.noTrackers')} />
            <PromiseItem icon={<EyeOff className="size-5" />} text={t('landing.promise.noCookies')} />
            <PromiseItem icon={<Lock className="size-5" />} text={t('landing.promise.private')} />
            <PromiseItem icon={<Landmark className="size-5" />} text={t('landing.promise.nostr')} />
          </div>
        </div>
      </section>

      {/* ─── What is the Temple ─── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            {t('landing.temple.title')}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t('landing.temple.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <TempleCard
            step="I"
            title={t('landing.temple.step1.title')}
            description={t('landing.temple.step1.desc')}
          />
          <TempleCard
            step="II"
            title={t('landing.temple.step2.title')}
            description={t('landing.temple.step2.desc')}
          />
          <TempleCard
            step="III"
            title={t('landing.temple.step3.title')}
            description={t('landing.temple.step3.desc')}
          />
        </div>
      </section>

      {/* ─── Discover your uniqueness ─── */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-oracle/[0.03] to-transparent" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="engraved grain rounded-[2px] bg-card p-8 sm:p-12 text-center">
            <DelphiPyramid className="mx-auto mb-6" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
              {t('landing.unique.title')}
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed mb-8">
              {t('landing.unique.desc')}
            </p>
            <Button asChild size="lg" className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-8 text-base">
              <Link to="/assess">
                {t('landing.cta')}
                <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

/* ═══════════════════════════════════════════════════════
   Decorative SVG components — Delphi temple style
   ═══════════════════════════════════════════════════════ */

/** A stylised Delphi temple front with the pyramid/triangle at its heart. */
function TempleIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 180" fill="none" className={`w-64 sm:w-80 h-auto ${className ?? ''}`} aria-hidden="true">
      {/* Steps / base platform */}
      <rect x="30" y="155" width="260" height="6" rx="1" className="fill-border/60" />
      <rect x="40" y="148" width="240" height="6" rx="1" className="fill-border/40" />
      <rect x="50" y="141" width="220" height="6" rx="1" className="fill-border/30" />

      {/* Columns — six Doric columns */}
      {[70, 110, 140, 180, 210, 250].map((x) => (
        <g key={x}>
          {/* Capital */}
          <rect x={x - 8} y="58" width="16" height="4" rx="1" className="fill-muted-foreground/25" />
          {/* Shaft with subtle fluting */}
          <rect x={x - 5} y="62" width="10" height="79" rx="1" className="fill-muted-foreground/15" />
          <line x1={x - 2} y1="64" x2={x - 2} y2="140" className="stroke-muted-foreground/10" strokeWidth="0.5" />
          <line x1={x + 2} y1="64" x2={x + 2} y2="140" className="stroke-muted-foreground/10" strokeWidth="0.5" />
          {/* Base */}
          <rect x={x - 7} y="141" width="14" height="3" rx="0.5" className="fill-muted-foreground/20" />
        </g>
      ))}

      {/* Entablature — the beam across the top */}
      <rect x="55" y="52" width="210" height="6" rx="1" className="fill-muted-foreground/20" />
      {/* Frieze line */}
      <rect x="55" y="49" width="210" height="3" rx="0.5" className="fill-muted-foreground/10" />

      {/* Pediment — the triangle at the top */}
      <path
        d="M60 49 L160 8 L260 49"
        className="stroke-oracle"
        strokeWidth="2"
        fill="none"
      />
      {/* Inner pediment fill — very subtle */}
      <path
        d="M65 49 L160 12 L255 49 Z"
        className="fill-oracle/[0.06]"
      />

      {/* The all-seeing eye / oracle dot — inside the pediment triangle */}
      <circle cx="160" cy="34" r="5" className="fill-oracle" />
      <circle cx="160" cy="34" r="8" className="stroke-oracle/40" strokeWidth="1" fill="none" />

      {/* Acroterion ornaments — small triangles at pediment corners */}
      <path d="M56 49 L60 42 L64 49" className="fill-oracle/20" />
      <path d="M256 49 L260 42 L264 49" className="fill-oracle/20" />
      <path d="M156 8 L160 1 L164 8" className="fill-oracle/30" />
    </svg>
  );
}

/** The Delphi pyramid — a larger decorative mark. */
function DelphiPyramid({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={`size-16 ${className ?? ''}`} aria-hidden="true">
      {/* Outer triangle */}
      <path
        d="M40 8L72 64H8L40 8Z"
        className="stroke-oracle"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner triangle — concentric */}
      <path
        d="M40 20L60 56H20L40 20Z"
        className="stroke-oracle/30"
        strokeWidth="1"
        fill="none"
      />
      {/* Eye */}
      <circle cx="40" cy="42" r="4" className="fill-oracle" />
      <circle cx="40" cy="42" r="7" className="stroke-oracle/25" strokeWidth="0.75" fill="none" />
    </svg>
  );
}

function PromiseItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center size-10 rounded-full bg-oracle/10 text-oracle">
        {icon}
      </div>
      <p className="text-sm font-medium text-foreground">{text}</p>
    </div>
  );
}

function TempleCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="engraved grain rounded-[2px] bg-card p-6 text-center">
      <span className="font-mono text-oracle text-sm tracking-wider">{step}</span>
      <h3 className="font-serif text-lg font-semibold text-foreground mt-2 mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export default Index;
