import * as React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { formatPostDate, getContentPost, getSectionPosts, type ContentPost, type ContentSectionId } from '@/content/posts';
import { landingSections } from '@/portfolio-data';

interface PostDetailPageProps {
  section: ContentSectionId;
  postId: string;
  onBack: () => void;
}

export function PostDetailPage({ section, postId, onBack }: PostDetailPageProps) {
  const post = getContentPost(section, postId) ?? getSectionPosts(section)[0];
  const sectionTitle = landingSections.find((item) => item.id === section)?.title ?? 'section';
  const articleRef = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start start', 'end end'],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });

  return (
    <main className="mx-auto max-w-[780px] px-6 py-14 sm:py-20">
      <motion.div className="fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-gold" style={{ scaleX }} />
      <button
        onClick={onBack}
        className="mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {sectionTitle.toLowerCase()}
      </button>

      <article ref={articleRef}>
        <header className="mb-12 border-b border-ink/5 pb-10">
          <h1 className="font-serif text-4xl leading-tight text-ink sm:text-6xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.16em] text-ink/35">
            <span>{formatPostDate(post.date)}</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <ArticleBody post={post} />
      </article>
    </main>
  );
}

function ArticleBody({ post }: { post: ContentPost }) {
  let paragraphIndex = 0;

  return (
    <div className="post-body">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p({ children }) {
            const className = paragraphIndex === 0 ? 'with-dropcap dropcap-enter' : undefined;
            paragraphIndex += 1;

            return <p className={className}>{children}</p>;
          },
        }}
      >
        {post.body}
      </ReactMarkdown>
    </div>
  );
}
