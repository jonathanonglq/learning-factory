import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { formatLandingMeta, getLatestSectionPosts, type ContentSectionId } from '@/content/posts';
import { landingSections, profile, type RouteId } from '@/portfolio-data';
import { PredictiveText } from './PredictiveText';

interface LandingPageProps {
  onNavigate: (route: RouteId) => void;
  onOpenPost: (section: ContentSectionId, postId: string) => void;
}

export function LandingPage({ onNavigate, onOpenPost }: LandingPageProps) {
  return (
    <main className="mx-auto max-w-[900px] px-6">
      <section className="flex min-h-[46vh] flex-col justify-center py-12 text-center sm:min-h-[52vh] sm:py-16">
        <h1 className="font-serif text-[clamp(1.25rem,5.8vw,2rem)] leading-none whitespace-nowrap text-ink sm:text-[clamp(2.3rem,6.4vw,4.4rem)]">
          <PredictiveText
            text="Thinking with Machines"
            replayable
            label="Replay headline animation"
          />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46, duration: 0.5 }}
          className="mt-8 text-lg uppercase tracking-[0.24em] text-gold/70 sm:mt-10 sm:text-2xl"
        >
          {profile.name.toUpperCase()}
        </motion.p>
      </section>

      <section className="space-y-12 pb-16 pt-8 sm:space-y-14 sm:pb-24 sm:pt-12">
        {landingSections.map((section, index) => (
          <motion.article
            key={section.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.05 }}
            className="grid gap-8 border-b border-ink/5 pb-12 last:border-b-0 sm:grid-cols-[0.86fr_1.14fr] sm:gap-12 sm:pb-14"
          >
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.22em] text-gold">{section.eyebrow}</p>
              <h2 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">{section.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-ink/62">{section.description}</p>
              <a
                href={`#/${section.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(section.id);
                }}
                className="group/link mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold transition-all duration-200 hover:translate-x-1 hover:text-ink"
              >
                View full {section.title.toLowerCase()}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
              </a>
            </div>
            <div className="space-y-5">
              {getLatestSectionPosts(section.id).map((post) => (
                <div key={`${post.section}-${post.id}`} className="border-l border-ink/10 pl-5">
                  <div className="mb-2 text-xs uppercase tracking-[0.18em] text-ink/35">{formatLandingMeta(post)}</div>
                  <h3 className="font-serif text-xl leading-snug text-ink">
                    <a
                      href={`#/${post.section}/${post.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        onOpenPost(post.section, post.id);
                      }}
                      className="group/title inline-flex items-baseline gap-2 transition-transform duration-200 hover:translate-x-1 focus:outline-none focus-visible:rounded-sm focus-visible:ring-1 focus-visible:ring-gold/40"
                    >
                      <span>{post.title}</span>
                      <ArrowRight className="h-4 w-4 translate-x-[-3px] opacity-0 text-gold transition-all duration-200 group-hover/title:translate-x-0 group-hover/title:opacity-100" />
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/62">{post.description}</p>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
