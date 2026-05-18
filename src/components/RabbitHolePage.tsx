import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Filter, Search } from 'lucide-react';
import { concepts, type ConceptNote, type RouteId } from '@/portfolio-data';
import { cn } from '@/lib/utils';
import { PageHeader } from './BrainDumpPage';
import { BackHomeLink } from './BackHomeLink';

const categories = ['All', ...Array.from(new Set(concepts.map((concept) => concept.category)))];

export function RabbitHolePage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredConcepts = concepts.filter((concept) => {
    const matchesCategory = selectedCategory === 'All' || concept.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      concept.title.toLowerCase().includes(query) ||
      concept.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="mx-auto max-w-[900px] px-6 py-16 sm:py-24">
      <BackHomeLink onNavigate={onNavigate} />
      <PageHeader title="Rabbit Hole" subtitle="Technical concepts, explained to myself first." />

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <label className="relative block w-full md:w-72">
          <span className="sr-only">Search concepts</span>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
          <input
            type="text"
            placeholder="Search concepts..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full rounded-full border border-ink/10 bg-white/35 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </label>
        <p className="text-xs text-ink/42">Showing {filteredConcepts.length} deep dives</p>
      </div>

      <div className="mb-10 flex items-center gap-3 overflow-x-auto pb-3">
        <Filter className="h-4 w-4 flex-none text-gold" />
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-xs transition whitespace-nowrap active:scale-[0.98]',
              selectedCategory === category
                ? 'border-gold bg-gold text-white'
                : 'border-ink/10 bg-transparent text-ink/55 hover:border-gold/50 hover:text-ink',
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="border-t border-ink/10"
          transition={{ layout: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } }}
        >
          {filteredConcepts.map((concept, index) => (
            <ConceptEntry key={concept.id} concept={concept} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredConcepts.length === 0 && (
        <div className="py-24 text-center">
          <h2 className="font-serif text-2xl text-ink/60">No rabbit holes found.</h2>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-5 text-xs uppercase tracking-[0.18em] text-gold hover:text-ink"
          >
            Reset filters
          </button>
        </div>
      )}
    </main>
  );
}

function ConceptEntry({ concept, index }: { concept: ConceptNote; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], layout: { duration: 0.36 } }}
      className="group grid gap-4 border-b border-ink/10 py-8 sm:grid-cols-[64px_1fr]"
    >
      <div className="font-serif text-2xl leading-none text-ink/18 sm:pt-1">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.18em] text-ink/38">
          <span className="text-gold">{concept.category}</span>
          <span>{concept.depth}</span>
        </div>
        <h2 className="font-serif text-2xl leading-snug text-ink sm:text-3xl">
          <span className="inline-flex items-baseline gap-2 transition-transform duration-200 group-hover:translate-x-1">
            <span>{concept.title}</span>
            <ArrowRight className="h-4 w-4 translate-x-[-3px] opacity-0 text-gold transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/62">{concept.description}</p>
      </div>
    </motion.article>
  );
}
