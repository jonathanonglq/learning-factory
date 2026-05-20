import { getSectionPosts, type ContentSectionId } from '@/content/posts';
import { type RouteId } from '@/portfolio-data';
import { ArticleList } from './ArticleList';
import { BackHomeLink } from './BackHomeLink';
import { PageHeader } from './BrainDumpPage';

export function LabBenchPage({
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
        title="Lab Bench"
        subtitle="A more technical workspace for turning papers and ideas into working experiments: reproductions, small implementations, ablations, setup comparisons, and notes on what changes when theory meets code."
      />

      <ArticleList posts={getSectionPosts('lab-bench')} onOpenPost={onOpenPost} />
    </main>
  );
}
