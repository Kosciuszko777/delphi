import { cn } from '@/lib/utils';

interface OmphalosProps {
  className?: string;
}

/**
 * The omphalos mark — the navel-stone of Delphi.
 * A half-ellipse dome crossed by three engraved bands, drawn in
 * currentColor per the double-line engraving convention.
 * App mark, seal on share cards, loading mark.
 */
export function Omphalos({ className }: OmphalosProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-5', className)}
      aria-hidden="true"
    >
      {/* Dome — half ellipse on a base */}
      <path
        d="M4 19c0-6.075 3.582-13 8-13s8 6.925 8 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M3 19h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Three carved bands */}
      <path d="M6.2 15.5h11.6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M5.4 12.2h13.2M7.4 9h9.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M7.4 9h9.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}
