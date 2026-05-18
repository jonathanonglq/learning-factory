import { ArrowLeft } from 'lucide-react';
import { thoughtPosts, type ThoughtPost } from '@/portfolio-data';

interface PostDetailPageProps {
  postId: string;
  onBack: () => void;
}

export function PostDetailPage({ postId, onBack }: PostDetailPageProps) {
  const post = thoughtPosts.find((item) => item.id === postId) ?? thoughtPosts[0];

  return (
    <main className="mx-auto max-w-[780px] px-6 py-14 sm:py-20">
      <button
        onClick={onBack}
        className="mb-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to brain dump
      </button>

      <article>
        <header className="mb-12 border-b border-ink/5 pb-10">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{post.category}</p>
          <h1 className="font-serif text-4xl leading-tight text-ink sm:text-6xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/35">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <ArticleBody post={post} />
      </article>
    </main>
  );
}

function ArticleBody({ post }: { post: ThoughtPost }) {
  return (
    <div className="post-body">
      {post.body.map((paragraph, index) => (
        <p key={paragraph} className={index === 0 ? 'with-dropcap' : undefined}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
