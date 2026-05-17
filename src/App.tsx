import * as React from 'react';
import { Footer } from '@/components/Footer';
import { BrainDumpPage } from '@/components/BrainDumpPage';
import { HumanLoopPage } from '@/components/HumanLoopPage';
import { LabBenchPage } from '@/components/LabBenchPage';
import { LandingPage } from '@/components/LandingPage';
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

  React.useEffect(() => {
    const handleHashChange = () => setActiveRoute(getRouteFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [activeRoute]);

  function navigate(route: RouteId) {
    setActiveRoute(route);
    window.location.hash = route === 'home' ? '#/' : `#/${route}`;
  }

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-gold/25">
      <SiteNav activeRoute={activeRoute} onNavigate={navigate} />
      {activeRoute === 'home' && <LandingPage onNavigate={navigate} />}
      {activeRoute === 'brain-dump' && <BrainDumpPage onNavigate={navigate} />}
      {activeRoute === 'rabbit-hole' && <RabbitHolePage onNavigate={navigate} />}
      {activeRoute === 'lab-bench' && <LabBenchPage onNavigate={navigate} />}
      {activeRoute === 'human-loop' && <HumanLoopPage onNavigate={navigate} />}
      <Footer />
    </div>
  );
}
