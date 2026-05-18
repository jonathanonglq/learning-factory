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
import type { RouteId } from '@/portfolio-data';

const routes = new Set<RouteId>(['home', 'brain-dump', 'rabbit-hole', 'lab-bench', 'human-loop']);

function getRouteFromHash(): RouteId {
  const hash = window.location.hash.replace(/^#\/?/, '') as RouteId;
  return routes.has(hash) ? hash : 'home';
}

export default function App() {
  const [activeRoute, setActiveRoute] = React.useState<RouteId>(getRouteFromHash);
  const [activePostId, setActivePostId] = React.useState<string | null>(() => {
    const match = window.location.hash.match(/^#\/brain-dump\/(.+)$/);
    return match?.[1] ?? null;
  });

  React.useEffect(() => {
    const handleHashChange = () => {
      const postMatch = window.location.hash.match(/^#\/brain-dump\/(.+)$/);
      setActivePostId(postMatch?.[1] ?? null);
      setActiveRoute(postMatch ? 'brain-dump' : getRouteFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [activeRoute, activePostId]);

  function navigate(route: RouteId) {
    setActivePostId(null);
    setActiveRoute(route);
    window.location.hash = route === 'home' ? '#/' : `#/${route}`;
  }

  function openPost(postId: string) {
    setActiveRoute('brain-dump');
    setActivePostId(postId);
    window.location.hash = `#/brain-dump/${postId}`;
  }

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-gold/25">
      <SiteNav activeRoute={activeRoute} onNavigate={navigate} />
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeRoute}-${activePostId ?? 'index'}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          {activeRoute === 'home' && <LandingPage onNavigate={navigate} />}
          {activeRoute === 'brain-dump' &&
            (activePostId ? (
              <PostDetailPage postId={activePostId} onBack={() => navigate('brain-dump')} />
            ) : (
              <BrainDumpPage onNavigate={navigate} onOpenPost={openPost} />
            ))}
          {activeRoute === 'rabbit-hole' && <RabbitHolePage onNavigate={navigate} />}
          {activeRoute === 'lab-bench' && <LabBenchPage onNavigate={navigate} />}
          {activeRoute === 'human-loop' && <HumanLoopPage onNavigate={navigate} />}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
