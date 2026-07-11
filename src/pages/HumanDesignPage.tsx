import { useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import { useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWire } from '@/hooks/useWire';
import { useHDBirthData } from '@/hooks/useHDBirthData';
import { HD_TYPES, HD_PROFILES, HD_AUTHORITIES, EXTERNAL_CALCULATORS } from '@/lib/humandesign/data';
import { HDResultSummary } from '@/components/humandesign/HDResultSummary';
import { ArrowLeft, ExternalLink, RotateCcw, Shield } from 'lucide-react';

type Phase = 'intro' | 'entry' | 'results';

export default function HumanDesignPage() {
  const { wire, updateWire } = useWire();
  const { birthData, updateBirthData, clearBirthData } = useHDBirthData();
  const navigate = useNavigate();

  const hasExistingResult = !!wire.humanDesign;

  const initialPhase: Phase = hasExistingResult ? 'results' : 'intro';
  const [phase, setPhase] = useState<Phase>(initialPhase);

  // Entry form state
  const [hdType, setHdType] = useState(wire.humanDesign?.type ?? '');
  const [hdProfile, setHdProfile] = useState(wire.humanDesign?.profile ?? '');
  const [hdAuthority, setHdAuthority] = useState(wire.humanDesign?.authority ?? '');
  const [birthDate, setBirthDate] = useState(birthData.date ?? '');
  const [birthTime, setBirthTime] = useState(birthData.time ?? '');
  const [birthPlace, setBirthPlace] = useState(birthData.place ?? '');
  const [error, setError] = useState('');

  useSeoMeta({
    title: 'Human Design — Delphi',
    description: 'Enter your Human Design type, profile, and authority to add the fourth chamber to your Wire.',
  });

  const canSave = hdType && hdProfile && hdAuthority;

  const handleSave = () => {
    if (!canSave) {
      setError('Please select your Type, Profile, and Authority.');
      return;
    }

    setError('');

    updateWire((current) => ({
      ...current,
      humanDesign: {
        type: hdType,
        profile: hdProfile,
        authority: hdAuthority,
      },
    }));

    // Save optional birth data locally
    if (birthDate || birthTime || birthPlace) {
      updateBirthData({
        date: birthDate || undefined,
        time: birthTime || undefined,
        place: birthPlace || undefined,
      });
    }

    setPhase('results');
  };

  const handleReset = () => {
    setHdType('');
    setHdProfile('');
    setHdAuthority('');
    setBirthDate('');
    setBirthTime('');
    setBirthPlace('');
    clearBirthData();
    updateWire((current) => {
      const next = { ...current };
      delete next.humanDesign;
      return next;
    });
    setPhase('intro');
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Back link */}
        <Link
          to="/assess"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="size-3.5" />
          Back to Assessments
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center size-10 rounded-full bg-oracle/15 text-oracle text-sm font-bold">
              H
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Human Design
            </h1>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            {phase === 'results'
              ? 'Your Human Design configuration — type, profile, and authority.'
              : 'Enter your Human Design parameters from an external chart. This version uses manual entry — automated chart calculation is a future goal.'
            }
          </p>
        </div>

        {/* Intro */}
        {phase === 'intro' && (
          <div className="space-y-6">
            {/* External calculators */}
            <Card className="border-border">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-serif text-lg font-semibold text-foreground">
                  Step 1: Get Your Chart
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Human Design requires your exact birth date, time, and location to calculate. 
                  Use one of these free calculators to generate your chart, then enter the key 
                  parameters below.
                </p>

                <div className="space-y-2">
                  {EXTERNAL_CALCULATORS.map((calc) => (
                    <a
                      key={calc.name}
                      href={calc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:border-oracle/30 hover:bg-oracle/5 transition-all group"
                    >
                      <ExternalLink className="size-4 text-muted-foreground group-hover:text-oracle shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{calc.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{calc.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                onClick={() => setPhase('entry')}
                className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-8"
              >
                I Have My Chart — Enter Details
              </Button>
            </div>
          </div>
        )}

        {/* Entry form */}
        {phase === 'entry' && (
          <div className="space-y-6">
            <Card className="border-border">
              <CardContent className="pt-6 space-y-6">
                <h2 className="font-serif text-lg font-semibold text-foreground">
                  Step 2: Enter Your Design
                </h2>

                {/* Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Type <span className="text-destructive">*</span>
                  </label>
                  <Select value={hdType} onValueChange={setHdType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your type" />
                    </SelectTrigger>
                    <SelectContent>
                      {HD_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label} ({type.frequency})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {hdType && (
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      {HD_TYPES.find(t => t.value === hdType)?.strategy
                        ? `Strategy: ${HD_TYPES.find(t => t.value === hdType)!.strategy}`
                        : ''}
                    </p>
                  )}
                </div>

                {/* Profile */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Profile <span className="text-destructive">*</span>
                  </label>
                  <Select value={hdProfile} onValueChange={setHdProfile}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your profile" />
                    </SelectTrigger>
                    <SelectContent>
                      {HD_PROFILES.map((profile) => (
                        <SelectItem key={profile.value} value={profile.value}>
                          {profile.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Authority */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Authority <span className="text-destructive">*</span>
                  </label>
                  <Select value={hdAuthority} onValueChange={setHdAuthority}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your authority" />
                    </SelectTrigger>
                    <SelectContent>
                      {HD_AUTHORITIES.map((auth) => (
                        <SelectItem key={auth.value} value={auth.value}>
                          {auth.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {hdAuthority && (
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      {HD_AUTHORITIES.find(a => a.value === hdAuthority)?.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Optional birth data */}
            <Card className="border-border/60">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="size-4 text-oracle" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Birth Data (Optional & Sensitive)
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Birth data is stored <strong>locally on this device only</strong> and is 
                  <strong> never published or sent to any server</strong>. It is stored separately 
                  from your Wire and flagged as sensitive. It may be used in a future version 
                  for automated chart calculation.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="hd-birth-date" className="block text-xs text-muted-foreground mb-1.5 font-medium">
                      Birth Date
                    </label>
                    <input
                      id="hd-birth-date"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-oracle focus-visible:ring-2 focus-visible:ring-oracle/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="hd-birth-time" className="block text-xs text-muted-foreground mb-1.5 font-medium">
                      Birth Time
                    </label>
                    <input
                      id="hd-birth-time"
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-oracle focus-visible:ring-2 focus-visible:ring-oracle/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="hd-birth-place" className="block text-xs text-muted-foreground mb-1.5 font-medium">
                    Birth Place
                  </label>
                  <input
                    id="hd-birth-place"
                    type="text"
                    placeholder="City, Country"
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-oracle focus-visible:ring-2 focus-visible:ring-oracle/20 transition-all"
                  />
                </div>
              </CardContent>
            </Card>

            {error && (
              <p className="text-sm text-destructive" role="alert">{error}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSave}
                disabled={!canSave}
                className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-8 disabled:opacity-50"
              >
                Save to My Wire
              </Button>
              <Button
                variant="ghost"
                onClick={() => setPhase('intro')}
                className="rounded-full"
              >
                Back to Calculators
              </Button>
            </div>
          </div>
        )}

        {/* Results */}
        {phase === 'results' && wire.humanDesign && (
          <div className="space-y-6">
            <HDResultSummary result={wire.humanDesign} />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate('/wire')}
                className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-6"
              >
                View My Wire
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPhase('entry');
                }}
                className="rounded-full"
              >
                Edit Details
              </Button>
              <Button
                variant="ghost"
                onClick={handleReset}
                className="rounded-full gap-1.5 text-muted-foreground"
              >
                <RotateCcw className="size-3.5" />
                Clear & Start Over
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
