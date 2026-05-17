import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Filter, Search } from 'lucide-react';
import { concepts, type ConceptNote, type Depth, type RouteId } from '@/portfolio-data';
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
        <p className="text-xs font-medium text-ink/42">Showing {filteredConcepts.length} deep dives</p>
      </div>

      <div className="mb-10 flex items-center gap-3 overflow-x-auto pb-3">
        <Filter className="h-4 w-4 flex-none text-gold" />
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-xs font-medium transition whitespace-nowrap',
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
        <motion.div layout className="grid gap-6 md:grid-cols-2">
          {filteredConcepts.map((concept) => (
            <ConceptCard key={concept.id} concept={concept} />
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
            className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-gold hover:text-ink"
          >
            Reset filters
          </button>
        </div>
      )}
    </main>
  );
}

function ConceptCard({ concept }: { concept: ConceptNote }) {
  const Icon = concept.icon;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -4 }}
      className="group flex min-h-[310px] flex-col overflow-hidden rounded-lg border border-ink/10 bg-white/35 transition hover:border-gold/40 hover:shadow-xl hover:shadow-gold/5"
    >
      <div className="relative flex h-24 items-center justify-center overflow-hidden bg-paper-strong transition-colors group-hover:bg-[#ebe5db]">
        <div className="grid-pattern absolute inset-0 opacity-40" />
        <Icon className="relative h-6 w-6 text-gold transition-transform group-hover:scale-110" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">{concept.category}</span>
          <DepthBadge depth={concept.depth} />
        </div>
        <h2 className="font-serif text-xl font-bold leading-snug text-ink transition-colors group-hover:text-gold">
          {concept.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/65">{concept.description}</p>
        <button className="mt-auto flex items-center gap-1 pt-6 text-xs font-semibold text-ink/42 transition-colors group-hover:text-ink">
          Read the dive
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.article>
  );
}

function DepthBadge({ depth }: { depth: Depth }) {
  return (
    <span
      className={cn(
        'rounded border px-2 py-0.5 text-[10px] font-medium',
        depth === 'Beginner' && 'border-green-200 bg-green-50 text-green-700',
        depth === 'Intermediate' && 'border-orange-200 bg-orange-50 text-orange-700',
        depth === 'Deep Dive' && 'border-red-200 bg-red-50 text-red-700',
      )}
    >
      {depth}
    </span>
  );
}
