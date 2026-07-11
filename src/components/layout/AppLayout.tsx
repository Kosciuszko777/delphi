import { Link, useLocation } from 'react-router-dom';
import { LoginArea } from '@/components/auth/LoginArea';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            {/* Logo / Wordmark */}
            <Link
              to="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <DelphiMark className="size-7" />
              <span className="font-serif text-xl font-semibold tracking-wide text-foreground">
                Delphi
              </span>
            </Link>

            {/* Nav */}
            <nav className="hidden sm:flex items-center gap-1">
              <NavLink to="/" active={isHome}>Home</NavLink>
              <NavLink to="/assess" active={location.pathname.startsWith('/assess')}>Assess</NavLink>
              <NavLink to="/wire" active={location.pathname === '/wire'}>My Wire</NavLink>
              <NavLink to="/explore" active={location.pathname === '/explore'}>Explore</NavLink>
              <NavLink to="/council" active={location.pathname === '/council'}>Council</NavLink>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="text-muted-foreground"
              >
                {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
              <LoginArea className="max-w-48" />
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="sm:hidden border-t border-border/30">
          <div className="mx-auto max-w-4xl px-4 flex gap-1 py-1">
            <NavLink to="/" active={isHome} mobile>Home</NavLink>
            <NavLink to="/assess" active={location.pathname.startsWith('/assess')} mobile>Assess</NavLink>
            <NavLink to="/wire" active={location.pathname === '/wire'} mobile>Wire</NavLink>
            <NavLink to="/explore" active={location.pathname === '/explore'} mobile>Explore</NavLink>
            <NavLink to="/council" active={location.pathname === '/council'} mobile>Council</NavLink>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border/40 py-8 mt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="font-serif italic">γνῶθι σεαυτόν — Know Thyself</p>
          <div className="flex items-center gap-4">
            <a
              href="https://shakespeare.diy"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Vibed with Shakespeare
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, active, mobile, children }: { to: string; active: boolean; mobile?: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={cn(
        'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
        mobile ? 'flex-1 text-center' : '',
        active
          ? 'bg-oracle/10 text-oracle-foreground dark:text-oracle'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
      )}
    >
      {children}
    </Link>
  );
}

/** The Delphi mark — a triangle with a center dot (all-seeing / oracle). */
function DelphiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 3L25 23H3L14 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-oracle"
      />
      <circle cx="14" cy="16" r="2.5" fill="currentColor" className="text-oracle" />
    </svg>
  );
}
