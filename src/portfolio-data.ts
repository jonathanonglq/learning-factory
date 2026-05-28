export type RouteId = 'home' | 'brain-dump' | 'rabbit-hole' | 'lab-bench' | 'human-loop';

export interface NavItem {
  id: RouteId;
  label: string;
}

export interface LandingSection {
  id: Exclude<RouteId, 'home' | 'human-loop'>;
  title: string;
  eyebrow: string;
  description: string;
}

export const profile = {
  name: 'Jonathan Ong',
  role: 'AI Research Notes',
  summary:
    'Thinking out loud across machine learning systems, research taste, and the craft of turning ideas into working experiments.',
  location: 'Singapore',
  email: 'hello@example.com',
  socials: {
    github: 'https://github.com/jonathanonglq',
    linkedin: 'https://www.linkedin.com/in/jonong6/',
    x: 'https://x.com/JonOng6',
  },
};

export const navItems: NavItem[] = [
  { id: 'brain-dump', label: 'Brain Dump' },
  { id: 'rabbit-hole', label: 'Rabbit Hole' },
  { id: 'lab-bench', label: 'Lab Bench' },
  { id: 'human-loop', label: 'Human in the Loop' },
];

export const landingSections: LandingSection[] = [
  {
    id: 'brain-dump',
    eyebrow: 'Thoughts',
    title: 'Brain Dump',
    description: 'Reflections on AI as a social and economic force.',
  },
  {
    id: 'rabbit-hole',
    eyebrow: 'Concepts',
    title: 'Rabbit Hole',
    description: 'Learning notes that turn AI and ML concepts.',
  },
  {
    id: 'lab-bench',
    eyebrow: 'Experiments',
    title: 'Lab Bench',
    description: 'Tinkering with models, methods, and setups.',
  },
];

export const humanLoop = {
  title: 'Human in the Loop',
  subtitle: 'The person behind the notes.',
  about: [
    'Hi, I’m Jonathan 👋🏼',
    'I spent six years in Singapore’s aviation sector, working across strategy, data analytics, and recovery planning during one of the industry’s toughest periods.',
    'Now, I’m finding my way back to the field that first got me excited about technology: data and AI.',
    'Growing up, I learned best by writing my own notes. It was how I clarified ideas, uncovered gaps in my understanding, and forced myself to internalise what I was learning. This site is really just an extension of that habit.',
    'I’m currently trying to learn and build as aggressively as I can. So you’ll find a mix of AI/ML concepts, experiments, technical deep dives, and reflections on how AI might reshape society, work, and everyday life.',
    'Hopefully, some of it proves useful or at the very least, interesting.',
  ],
  work: [
    { role: 'Senior Data Analyst (Data and AI)', org: 'QCP Capital', years: '2025 - present' },
    { role: 'Assistant Director (Hub Capacity)', org: 'Civil Aviation Authority of Singapore', years: '2025' },
    { role: 'Senior Manager (Hub Strategy & Connectivity)', org: 'Civil Aviation Authority of Singapore', years: '2023 - 2025' },
    { role: 'Manager (Hub Strategy & Connectivity)', org: 'Civil Aviation Authority of Singapore', years: '2021 - 2023' },
    { role: 'Data Scientist', org: 'Civil Aviation Authority of Singapore', years: '2019 - 2021' },
  ],
  education: [
    { degree: 'M.S. in Operations Research', org: 'University of California Berkeley' },
    { degree: 'B.Eng. in Electrical and Electronics Engineering', org: 'Imperial College London' },
  ],
};
