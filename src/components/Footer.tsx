import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { profile } from '@/portfolio-data';

export function Footer() {
  return (
    <footer className="border-t border-ink/5 py-10 sm:py-12">
      <div className="mx-auto flex max-w-[900px] flex-col items-center justify-between gap-6 px-6 text-center text-sm text-ink/45 sm:flex-row sm:text-left">
        <div>
          <p className="font-serif text-lg font-bold text-ink">{profile.role}</p>
          <p className="mt-1">Curiosity is the primary heuristic.</p>
        </div>
        <div className="flex items-center gap-5">
          <a aria-label="GitHub" href={profile.socials.github} className="transition-colors hover:text-gold">
            <Github className="h-5 w-5" />
          </a>
          <a aria-label="X" href={profile.socials.x} className="transition-colors hover:text-gold">
            <Twitter className="h-5 w-5" />
          </a>
          <a aria-label="LinkedIn" href={profile.socials.linkedin} className="transition-colors hover:text-gold">
            <Linkedin className="h-5 w-5" />
          </a>
          <a aria-label="Email" href={`mailto:${profile.email}`} className="transition-colors hover:text-gold">
            <Mail className="h-5 w-5" />
          </a>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em]">Built with intent</p>
      </div>
    </footer>
  );
}
