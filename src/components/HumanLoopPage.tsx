import { motion } from 'framer-motion';
import profilePhoto from '@/public/profile3_watercolor.png';
import { humanLoop, type RouteId } from '@/portfolio-data';
import { BackHomeLink } from './BackHomeLink';

const groupedWork = humanLoop.work.reduce<Array<{ org: string; roles: Array<{ role: string; years: string }> }>>(
  (groups, item) => {
    const currentGroup = groups.at(-1);

    if (currentGroup?.org === item.org) {
      currentGroup.roles.push({ role: item.role, years: item.years });
    } else {
      groups.push({ org: item.org, roles: [{ role: item.role, years: item.years }] });
    }

    return groups;
  },
  [],
);

export function HumanLoopPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <main className="mx-auto max-w-[900px] px-6 py-16 sm:py-24">
      <BackHomeLink onNavigate={onNavigate} />

      <div className="text-center">
        <motion.img
          src={profilePhoto}
          alt="Jonathan Ong"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto h-56 w-56 rounded-full border border-ink/10 object-cover shadow-sm sm:h-72 sm:w-72"
        />
      </div>

      <section className="mx-auto mt-10 max-w-2xl space-y-4 text-justify sm:mt-12">
        {humanLoop.about.map((paragraph) => (
          <p key={paragraph} className="text-base leading-relaxed text-ink/70 sm:text-lg">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mx-auto mt-12 max-w-2xl sm:mt-14">
        <h2 className="text-xs uppercase tracking-[0.22em] text-gold">Work</h2>
        <div className="mt-5 border-t border-ink/10">
          {groupedWork.map((group, index) => (
            <motion.article
              key={group.org}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="grid gap-2 border-b border-ink/10 py-4 text-left sm:grid-cols-[0.85fr_1.15fr] sm:gap-8"
            >
              <p className="font-serif text-base leading-snug text-ink sm:text-lg">{group.org}</p>
              <div className="space-y-3">
                {group.roles.map((item) => (
                  <div key={`${item.role}-${item.years}`}>
                    <p className="text-sm leading-snug text-ink/72">{item.role}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-ink/38">{item.years}</p>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-2xl sm:mt-14">
        <h2 className="text-xs uppercase tracking-[0.22em] text-gold">Education</h2>
        <div className="mt-5 border-t border-ink/10">
          {humanLoop.education.map((item, index) => (
            <motion.article
              key={item.degree}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="grid gap-2 border-b border-ink/10 py-4 text-left sm:grid-cols-[0.85fr_1.15fr] sm:gap-8"
            >
              <p className="font-serif text-base leading-snug text-ink sm:text-lg">{item.org}</p>
              <p className="text-sm leading-snug text-ink/72">{item.degree}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
