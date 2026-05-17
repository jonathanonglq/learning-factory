import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { landingSections, profile, type RouteId } from '@/portfolio-data';

interface LandingPageProps {
  onNavigate: (route: RouteId) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <main className="mx-auto max-w-[900px] px-6">
      <section className="flex min-h-[54vh] flex-col justify-center py-16 text-center sm:min-h-[62vh] sm:py-20">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.26em] text-gold"
        >
          {profile.role}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-serif text-[clamp(3.2rem,12vw,6.8rem)] leading-[0.9] text-ink"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-ink/65 sm:text-2xl"
        >
          {profile.summary}
        </motion.p>
      </section>

      <section className="border-y border-ink/5 py-10 sm:py-14">
        <div className="grid gap-5 sm:grid-cols-3">
          <Stat label="Current Mode" value="Research Notes" />
          <Stat label="Base" value={profile.location} />
          <Stat label="Focus" value="AI Systems" />
        </div>
      </section>

      <section className="space-y-20 py-16 sm:py-24">
        {landingSections.map((section, index) => (
          <motion.article
            key={section.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.05 }}
            className="grid gap-8 border-b border-ink/5 pb-16 last:border-b-0 sm:grid-cols-[0.86fr_1.14fr] sm:gap-12"
          >
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{section.eyebrow}</p>
              <h2 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">{section.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-ink/62">{section.description}</p>
              <a
                href={`#/${section.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(section.id);
                }}
                className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold transition-colors hover:text-ink"
              >
                View full {section.title.toLowerCase()}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="space-y-5">
              {section.entries.map((entry) => (
                <div key={entry.title} className="border-l border-ink/10 pl-5">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/35">{entry.meta}</div>
                  <h3 className="font-serif text-xl font-bold leading-snug text-ink">{entry.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/62">{entry.summary}</p>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center sm:text-left">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/35">{label}</p>
      <p className="mt-2 font-serif text-2xl text-ink">{value}</p>
    </div>
  );
}
