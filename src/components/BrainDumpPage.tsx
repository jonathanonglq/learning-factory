import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { thoughtPosts, type RouteId } from '@/portfolio-data';
import { BackHomeLink } from './BackHomeLink';
import { PredictiveText } from './PredictiveText';

interface BrainDumpPageProps {
  onNavigate: (route: RouteId) => void;
  onOpenPost: (postId: string) => void;
}

export function BrainDumpPage({ onNavigate, onOpenPost }: BrainDumpPageProps) {
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
            className="group relative"
          >
            <motion.div
              className="pointer-events-none absolute -inset-x-3 -inset-y-5 rounded-lg bg-white/25 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.22 }}
            />
            <div className="relative">
              <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-baseline">
                <h2 className="max-w-2xl flex-1 font-serif text-2xl leading-snug sm:text-3xl">
                  <button
                    type="button"
                    onClick={() => onOpenPost(post.id)}
                    className="group/title inline-flex items-baseline gap-2 text-left text-ink transition-transform duration-200 hover:translate-x-1 focus:outline-none focus-visible:rounded-sm focus-visible:ring-1 focus-visible:ring-gold/40"
                  >
                    <span>{post.title}</span>
                    <ArrowRight className="h-4 w-4 translate-x-[-3px] opacity-0 text-gold transition-all duration-200 group-hover/title:translate-x-0 group-hover/title:opacity-100" />
                  </button>
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.16em] text-ink/38">
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
              <div className="mt-6 flex justify-end">
                <span className="rounded-full border border-ink/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-ink/35">
                  #{post.category.toLowerCase()}
                </span>
              </div>
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
        <PredictiveText text={title} replayable label={`Replay title animation for ${title}`} />
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-ink/58 sm:text-xl"
      >
        {subtitle}
      </motion.p>
    </header>
  );
}
