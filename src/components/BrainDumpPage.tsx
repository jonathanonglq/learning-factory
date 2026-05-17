import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { thoughtPosts, type RouteId } from '@/portfolio-data';
import { BackHomeLink } from './BackHomeLink';

export function BrainDumpPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <main className="mx-auto max-w-[900px] px-6 py-16 sm:py-24">
      <BackHomeLink onNavigate={onNavigate} />
      <PageHeader title="Brain Dump" subtitle="Unfiltered thoughts on AI, research culture, and what it all means." />

      <div className="space-y-12">
        {thoughtPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="group"
          >
            <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-baseline">
              <h2 className="max-w-2xl flex-1 font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-gold sm:text-3xl">
                {post.title}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/38">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
            </div>
            <p className="max-w-3xl text-lg leading-relaxed text-ink/75">{post.excerpt}</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-ink">
                Read full thought
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="rounded-full border border-ink/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/35">
                #{post.category.toLowerCase()}
              </span>
            </div>
            {index !== thoughtPosts.length - 1 && <hr className="mt-12 border-ink/5" />}
          </motion.article>
        ))}
      </div>
    </main>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-16 sm:mb-20">
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-5xl leading-tight text-ink sm:text-7xl"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="mt-5 max-w-2xl font-serif text-xl italic leading-relaxed text-ink/65 sm:text-2xl"
      >
        {subtitle}
      </motion.p>
    </header>
  );
}
