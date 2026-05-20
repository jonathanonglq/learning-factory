import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { formatPostDate, type ContentPost, type ContentSectionId } from '@/content/posts';

interface ArticleListProps {
  posts: ContentPost[];
  onOpenPost: (section: ContentSectionId, postId: string) => void;
}

export function ArticleList({ posts, onOpenPost }: ArticleListProps) {
  return (
    <div className="space-y-12">
      {posts.map((post, index) => (
        <ArticleListItem
          key={`${post.section}-${post.id}`}
          post={post}
          index={index}
          showDivider={index !== posts.length - 1}
          onOpenPost={onOpenPost}
        />
      ))}
    </div>
  );
}

function ArticleListItem({
  post,
  index,
  showDivider,
  onOpenPost,
}: {
  post: ContentPost;
  index: number;
  showDivider: boolean;
  onOpenPost: (section: ContentSectionId, postId: string) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group relative"
    >
      <motion.div
        className="pointer-events-none absolute -inset-x-3 -inset-y-5 rounded-lg bg-paper-strong/65 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.22 }}
      />
      <div className="relative">
        <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-baseline">
          <h2 className="max-w-2xl flex-1 font-serif text-2xl leading-snug sm:text-3xl">
            <button
              type="button"
              onClick={() => onOpenPost(post.section, post.id)}
              className="group/title inline-flex items-baseline gap-2 text-left text-ink transition-transform duration-200 hover:translate-x-1 focus:outline-none focus-visible:rounded-sm focus-visible:ring-1 focus-visible:ring-gold/40"
            >
              <span>{post.title}</span>
              <ArrowRight className="h-4 w-4 translate-x-[-3px] opacity-0 text-gold transition-all duration-200 group-hover/title:translate-x-0 group-hover/title:opacity-100" />
            </button>
          </h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.16em] text-ink/38">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatPostDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>
        </div>
        <p className="text-lg leading-relaxed text-ink/75">{post.description}</p>
      </div>
      {showDivider && <hr className="mt-12 border-ink/5" />}
    </motion.article>
  );
}
