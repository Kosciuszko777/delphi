import { Link, useLocation } from 'react-router-dom';
import { LoginArea } from '@/components/auth/LoginArea';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { LOCALES, type Locale } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, Heart, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { t, locale, setLocale } = useTranslation();
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
              <NavLink to="/how-it-works" active={location.pathname === '/how-it-works'}>{t('nav.howItWorks')}</NavLink>
              <NavLink to="/assess" active={location.pathname.startsWith('/assess')}>{t('nav.assess')}</NavLink>
              <NavLink to="/wire" active={location.pathname === '/wire'}>{t('nav.wire')}</NavLink>
              <NavLink to="/oracle" active={location.pathname === '/oracle'}>{t('nav.oracle')}</NavLink>
              <NavLink to="/explore" active={location.pathname === '/explore'}>{t('nav.explore')}</NavLink>
              <NavLink to="/council" active={location.pathname === '/council'}>{t('nav.council')}</NavLink>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="ghost"
                size="icon"
                aria-label={t('nav.support')}
                className={location.pathname === '/support' ? 'text-oracle' : 'text-muted-foreground'}
              >
                <Link to="/support">
                  <Heart className="size-4" fill={location.pathname === '/support' ? 'currentColor' : 'none'} />
                </Link>
              </Button>

              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Language"
                    className="text-muted-foreground"
                  >
                    <Globe className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[140px]">
                  {LOCALES.map((loc) => (
                    <DropdownMenuItem
                      key={loc.code}
                      onClick={() => setLocale(loc.code as Locale)}
                      className={cn(
                        'cursor-pointer',
                        locale === loc.code && 'font-semibold text-oracle',
                      )}
                    >
                      <span className="mr-2">{loc.flag}</span>
                      {loc.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

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
          <div className="mx-auto max-w-4xl px-4 flex gap-1 py-1 overflow-x-auto">
            <NavLink to="/how-it-works" active={location.pathname === '/how-it-works'} mobile>{t('nav.howItWorks')}</NavLink>
            <NavLink to="/assess" active={location.pathname.startsWith('/assess')} mobile>{t('nav.assess')}</NavLink>
            <NavLink to="/wire" active={location.pathname === '/wire'} mobile>Wire</NavLink>
            <NavLink to="/oracle" active={location.pathname === '/oracle'} mobile>{t('nav.oracle')}</NavLink>
            <NavLink to="/explore" active={location.pathname === '/explore'} mobile>{t('nav.explore')}</NavLink>
            <NavLink to="/council" active={location.pathname === '/council'} mobile>{t('nav.council')}</NavLink>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border/40 py-8 mt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="font-serif italic">{t('footer.motto')}</p>
          <div className="flex items-center gap-4">
            <Link to="/support" className="transition-colors hover:text-foreground inline-flex items-center gap-1">
              <Heart className="size-3" /> {t('nav.support')}
            </Link>
            <a
              href="https://shakespeare.diy"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {t('footer.vibed')}
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
