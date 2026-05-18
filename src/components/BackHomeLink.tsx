import { ArrowLeft } from 'lucide-react';
import type { RouteId } from '@/portfolio-data';

interface BackHomeLinkProps {
  onNavigate: (route: RouteId) => void;
}

export function BackHomeLink({ onNavigate }: BackHomeLinkProps) {
  return (
    <a
      href="#/"
      onClick={(event) => {
        event.preventDefault();
        onNavigate('home');
      }}
      className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold transition-all duration-200 hover:-translate-x-1 hover:text-ink"
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-200" />
      Back to main page
    </a>
  );
}
