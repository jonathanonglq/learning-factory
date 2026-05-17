import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { experiments, type Experiment, type RouteId, type Status } from '@/portfolio-data';
import { cn } from '@/lib/utils';
import { PageHeader } from './BrainDumpPage';
import { BackHomeLink } from './BackHomeLink';

const statusStyles: Record<Status, string> = {
  Active: 'border-green-200 bg-green-50 text-green-700',
  Reading: 'border-blue-200 bg-blue-50 text-blue-700',
  Shipped: 'border-stone-200 bg-stone-50 text-stone-700',
  Draft: 'border-orange-200 bg-orange-50 text-orange-700',
};

export function LabBenchPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [featured, ...rest] = experiments;

  return (
    <main className="mx-auto max-w-[900px] px-6 py-16 sm:py-24">
      <BackHomeLink onNavigate={onNavigate} />
      <PageHeader title="Lab Bench" subtitle="Experiments, prototypes, and implementation notes." />

      <section className="mb-12 rounded-lg border border-ink/10 bg-white/35 p-6 sm:p-8">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Active experiment</p>
        <ExperimentPreview experiment={featured} featured />
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-serif text-3xl text-ink">Recent prototypes</h2>
          <p className="text-xs font-medium text-ink/42">{experiments.length} total</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((experiment, index) => (
            <motion.div
              key={experiment.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <ExperimentPreview experiment={experiment} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

function ExperimentPreview({ experiment, featured = false }: { experiment: Experiment; featured?: boolean }) {
  const Icon = experiment.icon;
  return (
    <article className={cn('group flex h-full flex-col', featured && 'sm:grid sm:grid-cols-[0.8fr_1.2fr] sm:gap-8')}>
      <div
        className={cn(
          'relative flex min-h-36 items-center justify-center overflow-hidden rounded-md bg-paper-strong',
          featured && 'min-h-48',
        )}
      >
        <div className="grid-pattern absolute inset-0 opacity-45" />
        <Icon className={cn('relative text-gold', featured ? 'h-12 w-12' : 'h-8 w-8')} />
      </div>
      <div className={cn('flex flex-1 flex-col', featured ? 'pt-6 sm:pt-0' : 'pt-5')}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={cn('rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]', statusStyles[experiment.status])}>
            {experiment.status}
          </span>
          {experiment.stack.map((item) => (
            <span key={item} className="rounded-full border border-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink/40">
              {item}
            </span>
          ))}
        </div>
        <h3 className={cn('font-serif font-bold leading-tight text-ink group-hover:text-gold', featured ? 'text-3xl' : 'text-xl')}>
          {experiment.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">{experiment.description}</p>
        <button className="mt-auto flex items-center gap-1 pt-6 text-xs font-semibold text-gold transition-colors hover:text-ink">
          Open notes
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </article>
  );
}
