import { Github, Linkedin } from 'lucide-react';
import { profile } from '@/portfolio-data';

export function Footer() {
  return (
    <footer className="border-t border-ink/5 py-10 sm:py-12">
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6 px-6 text-center text-sm text-ink/45">
        <div>
          <p className="mt-1">Curiosity is the primary heuristic.</p>
        </div>
        <div className="flex items-center gap-5">
          <a aria-label="GitHub" href={profile.socials.github} className="transition-colors hover:text-gold">
            <Github className="h-5 w-5" />
          </a>
          <a aria-label="X" href={profile.socials.x} className="transition-colors hover:text-gold">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M18.9 2h3.3l-7.2 8.2L23.5 22h-6.6l-5.2-6.8L5.8 22H2.5l7.7-8.8L2 2h6.8l4.7 6.2L18.9 2Zm-1.2 17.9h1.8L7.8 4H5.9l11.8 15.9Z" />
            </svg>
          </a>
          <a aria-label="LinkedIn" href={profile.socials.linkedin} className="transition-colors hover:text-gold">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
