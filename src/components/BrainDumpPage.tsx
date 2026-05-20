import { motion } from 'framer-motion';
import { getSectionPosts, type ContentSectionId } from '@/content/posts';
import { type RouteId } from '@/portfolio-data';
import { ArticleList } from './ArticleList';
import { BackHomeLink } from './BackHomeLink';
import { PredictiveText } from './PredictiveText';

interface BrainDumpPageProps {
  onNavigate: (route: RouteId) => void;
  onOpenPost: (section: ContentSectionId, postId: string) => void;
}

export function BrainDumpPage({ onNavigate, onOpenPost }: BrainDumpPageProps) {
  return (
    <main className="mx-auto max-w-[900px] px-6 py-16 sm:py-24">
      <BackHomeLink onNavigate={onNavigate} />
      <PageHeader
        title="Brain Dump"
        subtitle="Less technical reflections on AI as a social, economic, and cultural force: how it changes work, shifts power, shapes research incentives, and reopens questions about openness, safety, and progress."
      />

      <ArticleList posts={getSectionPosts('brain-dump')} onOpenPost={onOpenPost} />
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
        className="mt-5 w-full text-justify text-lg leading-relaxed text-ink/75"
      >
        {subtitle}
      </motion.p>
    </header>
  );
}
