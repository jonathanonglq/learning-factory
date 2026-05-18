import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { experiments, type Experiment, type RouteId } from '@/portfolio-data';
import { PageHeader } from './BrainDumpPage';
import { BackHomeLink } from './BackHomeLink';

export function LabBenchPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [featured, ...rest] = experiments;

  return (
    <main className="mx-auto max-w-[900px] px-6 py-16 sm:py-24">
      <BackHomeLink onNavigate={onNavigate} />
      <PageHeader title="Lab Bench" subtitle="Experiments, prototypes, and implementation notes." />

      <section className="mb-14 border-y border-ink/10 py-8">
        <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-gold">Current log</p>
        <ExperimentEntry experiment={featured} featured />
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-serif text-3xl text-ink">Recent prototypes</h2>
          <p className="text-xs text-ink/42">{experiments.length} total</p>
        </div>
        <div className="border-t border-ink/10">
          {rest.map((experiment, index) => (
            <motion.article
              key={experiment.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="border-b border-ink/10 py-7"
            >
              <ExperimentEntry experiment={experiment} />
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ExperimentEntry({ experiment, featured = false }: { experiment: Experiment; featured?: boolean }) {
  return (
    <div className="group grid gap-4 sm:grid-cols-[140px_1fr]">
      <div className="space-y-2 text-[10px] uppercase tracking-[0.18em] text-ink/38">
        <p className="text-gold">{experiment.status}</p>
        <p>{experiment.stack.join(' / ')}</p>
      </div>
      <div>
        <h3 className={featured ? 'font-serif text-3xl leading-tight text-ink sm:text-4xl' : 'font-serif text-2xl leading-tight text-ink'}>
          <span className="inline-flex items-baseline gap-2 transition-transform duration-200 group-hover:translate-x-1">
            <span>{experiment.title}</span>
            <ArrowRight className="h-4 w-4 translate-x-[-3px] opacity-0 text-gold transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/62">{experiment.description}</p>
      </div>
    </div>
  );
}
