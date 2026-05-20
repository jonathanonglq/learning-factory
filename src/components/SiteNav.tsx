import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { navItems, type RouteId } from '@/portfolio-data';
import { cn } from '@/lib/utils';

interface SiteNavProps {
  activeRoute: RouteId;
  onNavigate: (route: RouteId) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function SiteNav({ activeRoute, onNavigate, theme, onToggleTheme }: SiteNavProps) {
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <nav className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[900px] items-center justify-center overflow-x-auto px-4 sm:px-6">
        <ul className="flex min-w-max items-center justify-start gap-8 whitespace-nowrap px-10 sm:gap-12 sm:px-0">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <a
                href={`#/${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.id);
                }}
                className={cn(
                  'block py-2 text-[13px] tracking-0 transition-colors sm:text-base',
                  activeRoute === item.id ? 'text-ink' : 'text-ink/45 hover:text-ink',
                )}
              >
                {item.label}
              </a>
              {activeRoute === item.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-1 left-0 right-0 h-px bg-gold"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={onToggleTheme}
          className="fixed right-3 top-3 z-[60] inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/80 text-ink/45 backdrop-blur-md transition-colors hover:text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 sm:right-4 sm:top-4"
        >
          <ThemeIcon className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}
