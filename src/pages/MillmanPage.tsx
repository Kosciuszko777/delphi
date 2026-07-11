import { useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWire } from '@/hooks/useWire';
import { computeMillmanNumber, isValidBirthDate } from '@/lib/millman';
import { MillmanResult } from '@/components/millman/MillmanResult';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MillmanPage() {
  const { wire, updateWire } = useWire();
  const navigate = useNavigate();
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [result, setResult] = useState<string | null>(wire.millman?.number ?? null);
  const [birthDateStr, setBirthDateStr] = useState<string>(wire.millman?.birthDate ?? '');
  const [error, setError] = useState('');

  useSeoMeta({
    title: 'Millman Life-Purpose — Delphi',
    description: 'Enter your birth date to discover your Millman Life-Purpose number — the core themes and lessons encoded in your path.',
  });

  const handleCalculate = () => {
    setError('');

    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);

    if (!year || !month || !day || isNaN(y) || isNaN(m) || isNaN(d)) {
      setError('Please enter a complete birth date.');
      return;
    }

    if (!isValidBirthDate(y, m, d)) {
      setError('Please enter a valid birth date.');
      return;
    }

    const number = computeMillmanNumber(y, m, d);
    const dateStr = `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;

    setResult(number);
    setBirthDateStr(dateStr);

    // Save to Wire
    updateWire((current) => ({
      ...current,
      millman: { number, birthDate: dateStr },
    }));
  };

  const handleReset = () => {
    setResult(null);
    setBirthDateStr('');
    setYear('');
    setMonth('');
    setDay('');
    updateWire((current) => {
      const next = { ...current };
      delete next.millman;
      return next;
    });
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
              M
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Millman Life-Purpose
            </h1>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            Your birth date encodes a life-purpose number — a map of the core themes, 
            strengths, and challenges your path is oriented around.
          </p>
        </div>

        {/* Calculator or Result */}
        {!result ? (
          <Card className="border-border">
            <CardContent className="pt-6">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
                Enter Your Birth Date
              </h2>

              <div className="grid grid-cols-3 gap-3 max-w-sm">
                <div>
                  <label htmlFor="birth-month" className="block text-xs text-muted-foreground mb-1.5 font-medium">
                    Month
                  </label>
                  <input
                    id="birth-month"
                    type="number"
                    inputMode="numeric"
                    placeholder="MM"
                    min={1}
                    max={12}
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="h-12 w-full rounded-lg border border-input bg-background px-3 text-center text-lg font-medium tabular-nums outline-none focus-visible:border-oracle focus-visible:ring-2 focus-visible:ring-oracle/20 transition-all"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCalculate();
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="birth-day" className="block text-xs text-muted-foreground mb-1.5 font-medium">
                    Day
                  </label>
                  <input
                    id="birth-day"
                    type="number"
                    inputMode="numeric"
                    placeholder="DD"
                    min={1}
                    max={31}
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="h-12 w-full rounded-lg border border-input bg-background px-3 text-center text-lg font-medium tabular-nums outline-none focus-visible:border-oracle focus-visible:ring-2 focus-visible:ring-oracle/20 transition-all"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCalculate();
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="birth-year" className="block text-xs text-muted-foreground mb-1.5 font-medium">
                    Year
                  </label>
                  <input
                    id="birth-year"
                    type="number"
                    inputMode="numeric"
                    placeholder="YYYY"
                    min={1900}
                    max={new Date().getFullYear()}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="h-12 w-full rounded-lg border border-input bg-background px-3 text-center text-lg font-medium tabular-nums outline-none focus-visible:border-oracle focus-visible:ring-2 focus-visible:ring-oracle/20 transition-all"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCalculate();
                    }}
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive mt-3" role="alert">{error}</p>
              )}

              <div className="mt-6 flex gap-3">
                <Button
                  onClick={handleCalculate}
                  className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-8"
                >
                  Calculate
                </Button>
              </div>

              <p className="mt-4 text-xs text-muted-foreground/70">
                Your birth date is stored locally on this device only. It is never published or sent to any server.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <MillmanResult
              number={result}
              birthDate={birthDateStr}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate('/wire')}
                className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-6"
              >
                View My Wire
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="rounded-full"
              >
                Recalculate
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
