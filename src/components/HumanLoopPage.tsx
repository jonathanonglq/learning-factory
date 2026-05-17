import { motion } from 'framer-motion';
import { humanLoop, profile, type RouteId } from '@/portfolio-data';
import { PageHeader } from './BrainDumpPage';
import { BackHomeLink } from './BackHomeLink';

export function HumanLoopPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const Icon = humanLoop.icon;

  return (
    <main className="mx-auto max-w-[900px] px-6 py-16 sm:py-24">
      <BackHomeLink onNavigate={onNavigate} />
      <PageHeader title={humanLoop.title} subtitle={humanLoop.subtitle} />

      <section className="grid gap-10 sm:grid-cols-[0.8fr_1.2fr] sm:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-ink/10 bg-white/35 p-6"
        >
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-paper-strong text-gold">
            <Icon className="h-8 w-8" />
          </div>
          <p className="font-serif text-2xl leading-tight text-ink">{profile.name}</p>
          <p className="mt-2 text-sm text-ink/55">{profile.role}</p>
          <p className="mt-6 text-sm leading-relaxed text-ink/62">{profile.location}</p>
        </motion.div>

        <div className="space-y-8">
          {humanLoop.paragraphs.map((paragraph) => (
            <p key={paragraph} className="font-serif text-2xl leading-relaxed text-ink/75">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-5 sm:grid-cols-3">
        {humanLoop.principles.map((principle, index) => (
          <motion.article
            key={principle.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="border-l border-ink/10 pl-5"
          >
            <h2 className="font-serif text-2xl text-ink">{principle.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/62">{principle.description}</p>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
