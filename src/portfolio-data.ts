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
    'Hi there, I\'m Jonathan! 👋🏼 Here is a brief introduction about my journey thus far:',
    'I stumbled upon data science in university and knew quite early on it was what I wanted to do. That fascination took me to an internship in Silicon Valley, where I relished the energy of the tech world and even toyed with the idea of staying on.',
    'Ultimately, I decided to return to Singapore to serve out my bond with the Civil Aviation Authority of Singapore (CAAS). Part of it was personal. After being away for four years, I missed my family. The other part of it was a sense that I should not write off CAAS without at least giving it a fair try.',
    'It turned out to be a rewarding chapter. I learned from brilliant colleagues, made lasting friendships, and worked on meaningful projects like the Vaccinated Travel Lanes. It was a gruelling but worthwhile experience, and somewhere along the way, I also met my wife, which made the entire journey priceless.',
    'Now, it feels like the right time to turn the page. I am diving back into data science - a little rusty, perhaps, but eager. This site is my way of refreshing myself on the basics of AI and ML, while documenting what I learn. If it helps others on the same journey, all the better. Beyond the algorithms and models, I also jot down key themes of books I find interesting, with the help of AI of course.',
    'Hope you enjoy the read!',
  ],
  work: [
    { role: 'Senior Data Analyst', org: 'QCP Capital', years: '2025 - present' },
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
