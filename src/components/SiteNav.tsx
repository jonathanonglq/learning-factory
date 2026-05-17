import { motion } from 'framer-motion';
import { navItems, type RouteId } from '@/portfolio-data';
import { cn } from '@/lib/utils';

interface SiteNavProps {
  activeRoute: RouteId;
  onNavigate: (route: RouteId) => void;
}

export function SiteNav({ activeRoute, onNavigate }: SiteNavProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-ink/5 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-[900px] items-center justify-center px-4 py-3 sm:h-16 sm:px-6 sm:py-0">
        <ul className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-1 whitespace-nowrap sm:flex-nowrap sm:gap-12">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <a
                href={`#/${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.id);
                }}
                className={cn(
                  'block py-2 text-[10px] font-medium uppercase tracking-0 transition-colors sm:text-sm sm:tracking-[0.12em]',
                  activeRoute === item.id ? 'text-ink' : 'text-ink/45 hover:text-ink',
                )}
              >
                {item.label}
              </a>
              {activeRoute === item.id && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
