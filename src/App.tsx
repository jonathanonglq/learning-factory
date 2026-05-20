import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Footer } from '@/components/Footer';
import { BrainDumpPage } from '@/components/BrainDumpPage';
import { HumanLoopPage } from '@/components/HumanLoopPage';
import { LabBenchPage } from '@/components/LabBenchPage';
import { LandingPage } from '@/components/LandingPage';
import { PostDetailPage } from '@/components/PostDetailPage';
import { RabbitHolePage } from '@/components/RabbitHolePage';
import { SiteNav } from '@/components/SiteNav';
import { isContentSection, type ContentSectionId } from '@/content/posts';
import type { RouteId } from '@/portfolio-data';

const routes = new Set<RouteId>(['home', 'brain-dump', 'rabbit-hole', 'lab-bench', 'human-loop']);
export type ThemeMode = 'light' | 'dark';

function getRouteFromHash(): RouteId {
  const hash = window.location.hash.replace(/^#\/?/, '').split('/')[0] as RouteId;
  return routes.has(hash) ? hash : 'home';
}

export default function App() {
  const [theme, setTheme] = React.useState<ThemeMode>(() => {
    const stored = window.localStorage.getItem('theme');

    if (stored === 'light' || stored === 'dark') return stored;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [activeRoute, setActiveRoute] = React.useState<RouteId>(getRouteFromHash);
  const [activePostSection, setActivePostSection] = React.useState<ContentSectionId | null>(() => {
    const route = getRouteFromHash();
    const match = window.location.hash.match(/^#\/([^/]+)\/(.+)$/);
    return match && isContentSection(route) ? route : null;
  });
  const [activePostId, setActivePostId] = React.useState<string | null>(() => {
    const match = window.location.hash.match(/^#\/([^/]+)\/(.+)$/);
    return match?.[2] ?? null;
  });

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  React.useEffect(() => {
    const handleHashChange = () => {
      const route = getRouteFromHash();
      const postMatch = window.location.hash.match(/^#\/([^/]+)\/(.+)$/);
      const postSection = postMatch && isContentSection(route) ? route : null;
      setActivePostSection(postSection);
      setActivePostId(postSection ? (postMatch?.[2] ?? null) : null);
      setActiveRoute(route);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [activeRoute, activePostId]);

  function navigate(route: RouteId) {
    setActivePostSection(null);
    setActivePostId(null);
    setActiveRoute(route);
    window.location.hash = route === 'home' ? '#/' : `#/${route}`;
  }

  function openPost(section: ContentSectionId, postId: string) {
    setActiveRoute(section);
    setActivePostSection(section);
    setActivePostId(postId);
    window.location.hash = `#/${section}/${postId}`;
  }

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-gold/25">
      <SiteNav activeRoute={activeRoute} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeRoute}-${activePostId ?? 'index'}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          {activeRoute === 'home' && <LandingPage onNavigate={navigate} onOpenPost={openPost} />}
          {activeRoute === 'brain-dump' &&
            (activePostSection === 'brain-dump' && activePostId ? (
              <PostDetailPage section="brain-dump" postId={activePostId} onBack={() => navigate('brain-dump')} />
            ) : (
              <BrainDumpPage onNavigate={navigate} onOpenPost={openPost} />
            ))}
          {activeRoute === 'rabbit-hole' &&
            (activePostSection === 'rabbit-hole' && activePostId ? (
              <PostDetailPage section="rabbit-hole" postId={activePostId} onBack={() => navigate('rabbit-hole')} />
            ) : (
              <RabbitHolePage onNavigate={navigate} onOpenPost={openPost} />
            ))}
          {activeRoute === 'lab-bench' &&
            (activePostSection === 'lab-bench' && activePostId ? (
              <PostDetailPage section="lab-bench" postId={activePostId} onBack={() => navigate('lab-bench')} />
            ) : (
              <LabBenchPage onNavigate={navigate} onOpenPost={openPost} />
            ))}
          {activeRoute === 'human-loop' && <HumanLoopPage onNavigate={navigate} />}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
