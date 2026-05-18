import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { landingSections, profile, type RouteId } from '@/portfolio-data';
import { PredictiveText } from './PredictiveText';

interface LandingPageProps {
  onNavigate: (route: RouteId) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <main className="mx-auto max-w-[900px] px-6">
      <section className="flex min-h-[54vh] flex-col justify-center py-16 text-center sm:min-h-[62vh] sm:py-20">
        <h1 className="font-serif text-[clamp(3.2rem,12vw,6.8rem)] leading-[0.9] text-ink">
          <PredictiveText
            text={profile.name}
            replayable
            label={`Replay name animation for ${profile.name}`}
          />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.5 }}
          className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-ink/58 sm:text-xl"
        >
          {profile.summary}
        </motion.p>
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
              <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-gold">{section.eyebrow}</p>
              <h2 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">{section.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-ink/62">{section.description}</p>
              <a
                href={`#/${section.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(section.id);
                }}
                className="group/link mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold transition-all duration-200 hover:translate-x-1 hover:text-ink"
              >
                View full {section.title.toLowerCase()}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
              </a>
            </div>
            <div className="space-y-5">
              {section.entries.map((entry) => (
                <div key={entry.title} className="border-l border-ink/10 pl-5">
                  <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-ink/35">{entry.meta}</div>
                  <h3 className="font-serif text-xl leading-snug text-ink">{entry.title}</h3>
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
