import { getSectionPosts, type ContentSectionId } from '@/content/posts';
import { type RouteId } from '@/portfolio-data';
import { ArticleList } from './ArticleList';
import { BackHomeLink } from './BackHomeLink';
import { PageHeader } from './BrainDumpPage';

export function RabbitHolePage({
  onNavigate,
  onOpenPost,
}: {
  onNavigate: (route: RouteId) => void;
  onOpenPost: (section: ContentSectionId, postId: string) => void;
}) {
  return (
    <main className="mx-auto max-w-[900px] px-6 py-16 sm:py-24">
      <BackHomeLink onNavigate={onNavigate} />
      <PageHeader
        title="Rabbit Hole"
        subtitle="I learn by writing. Rabbit Hole is where I slow down and explain AI/ML concepts to myself, from foundations to frontier ideas, until they become concrete enough to reason with and build on."
      />

      <ArticleList posts={getSectionPosts('rabbit-hole')} onOpenPost={onOpenPost} />
    </main>
  );
}
