import type { LucideIcon } from 'lucide-react';
import { Atom, BookOpen, Brain, Cpu, FlaskConical, Layers, Network, PenLine, Sparkles, Workflow, Zap } from 'lucide-react';

export type RouteId = 'home' | 'brain-dump' | 'rabbit-hole' | 'lab-bench' | 'human-loop';
export type Depth = 'Beginner' | 'Intermediate' | 'Deep Dive';
export type Status = 'Active' | 'Reading' | 'Shipped' | 'Draft';

export interface NavItem {
  id: RouteId;
  label: string;
}

export interface LandingSection {
  id: RouteId;
  title: string;
  eyebrow: string;
  description: string;
  entries: Array<{
    title: string;
    meta: string;
    summary: string;
  }>;
}

export interface ThoughtPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

export interface ConceptNote {
  id: string;
  title: string;
  description: string;
  depth: Depth;
  category: string;
  icon: LucideIcon;
}

export interface Experiment {
  id: string;
  title: string;
  description: string;
  status: Status;
  stack: string[];
  icon: LucideIcon;
}

export const profile = {
  name: 'Jonathan Ong',
  role: 'Aspiring AI Research Engineer',
  summary:
    'Thinking out loud across machine learning systems, research taste, and the craft of turning ideas into working experiments.',
  location: 'Singapore',
  email: 'hello@example.com',
  socials: {
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    x: 'https://x.com/',
  },
};

export const navItems: NavItem[] = [
  { id: 'brain-dump', label: 'Brain Dump' },
  { id: 'rabbit-hole', label: 'Rabbit Hole' },
  { id: 'lab-bench', label: 'Lab Bench' },
  { id: 'human-loop', label: 'Human Loop' },
];

export const landingSections: LandingSection[] = [
  {
    id: 'brain-dump',
    eyebrow: 'Thoughts',
    title: 'Brain Dump',
    description: 'Short notes on AI, research culture, and the questions I keep returning to.',
    entries: [
      {
        title: "Why Scaling Alone Won't Get Us to AGI",
        meta: 'Architecture / 5 min',
        summary: 'Bigger models matter, but useful reasoning needs memory, retrieval, and better evaluation loops.',
      },
      {
        title: 'The Reproducibility Crisis in ML Research',
        meta: 'Culture / 8 min',
        summary: 'A note on benchmarks, random seeds, and why good research needs stronger defaults.',
      },
    ],
  },
  {
    id: 'rabbit-hole',
    eyebrow: 'Concepts',
    title: 'Rabbit Hole',
    description: 'Technical concepts explained to myself first, then shaped into notes others can read.',
    entries: [
      {
        title: 'Attention Is All You Need, Unpacked',
        meta: 'Transformers / Intermediate',
        summary: 'A ground-up visual path through attention heads, positional encodings, and residual streams.',
      },
      {
        title: 'FlashAttention and GPU Kernels',
        meta: 'Systems / Deep Dive',
        summary: 'How hardware-aware algorithms reduce memory traffic and unlock longer context windows.',
      },
    ],
  },
  {
    id: 'lab-bench',
    eyebrow: 'Experiments',
    title: 'Lab Bench',
    description: 'Small implementation projects, model probes, and prototypes that turn reading into practice.',
    entries: [
      {
        title: 'Sparse Attention Toy Model',
        meta: 'Active',
        summary: 'A small simulator for comparing attention patterns, cache pressure, and interpretability hooks.',
      },
      {
        title: 'Whisper-to-Graph',
        meta: 'Draft',
        summary: 'Turning long spoken explanations into concept maps with timestamps and evidence links.',
      },
    ],
  },
];

export const thoughtPosts: ThoughtPost[] = [
  {
    id: 'scaling-agi',
    title: "Why Scaling Alone Won't Get Us to AGI",
    excerpt:
      'We are hitting the limits of compute-first intelligence. True reasoning requires more than bigger clusters and more tokens.',
    date: 'Oct 12, 2026',
    readTime: '5 min read',
    category: 'Architecture',
  },
  {
    id: 'ml-reproducibility',
    title: 'The Reproducibility Crisis in ML Research',
    excerpt:
      'Random seeds, cherry-picked baselines, and the pressure to publish SOTA results are distorting how we validate progress.',
    date: 'Sep 28, 2026',
    readTime: '8 min read',
    category: 'Culture',
  },
  {
    id: 'reading-vs-building',
    title: 'On Reading Papers vs. Building Things',
    excerpt:
      'The trap of infinite consumption. Why implementation is the only way to understand a new architecture deeply.',
    date: 'Aug 15, 2026',
    readTime: '4 min read',
    category: 'Praxis',
  },
  {
    id: 'cultural-mirrors',
    title: 'Language Models as Cultural Mirrors',
    excerpt:
      'What training sets tell us about ourselves, and why alignment is philosophical before it is only technical.',
    date: 'Jul 22, 2026',
    readTime: '6 min read',
    category: 'Ethics',
  },
];

export const concepts: ConceptNote[] = [
  {
    id: 'attention',
    title: 'Attention Is All You Need, Unpacked',
    description: 'A ground-up visualization of multi-head attention and why positional encoding matters.',
    depth: 'Intermediate',
    category: 'Transformers',
    icon: Layers,
  },
  {
    id: 'rlhf',
    title: 'RLHF from Scratch',
    description: 'Implementing the PPO loop for alignment and understanding the reward model bottleneck.',
    depth: 'Deep Dive',
    category: 'RL',
    icon: Zap,
  },
  {
    id: 'diffusion',
    title: 'Why Diffusion Models Work',
    description: 'The bridge between denoising objectives, score matching, and useful generative priors.',
    depth: 'Intermediate',
    category: 'Theory',
    icon: Network,
  },
  {
    id: 'flashattention',
    title: 'FlashAttention and GPU Kernels',
    description: 'How hardware-aware algorithms unlock long-context windows by minimizing memory access.',
    depth: 'Deep Dive',
    category: 'Systems',
    icon: Cpu,
  },
  {
    id: 'tokenization',
    title: 'Introduction to Tokenization',
    description: 'Byte-pair encoding, weird edge cases, and why representation choices leak into behavior.',
    depth: 'Beginner',
    category: 'Theory',
    icon: BookOpen,
  },
  {
    id: 'moe',
    title: 'Mixture of Experts',
    description: 'Sparse routing, load balancing, and the appeal of scaling parameters without scaling active compute.',
    depth: 'Deep Dive',
    category: 'Transformers',
    icon: Brain,
  },
];

export const experiments: Experiment[] = [
  {
    id: 'sparse-attention',
    title: 'Sparse Attention Viz',
    description: 'A toy environment for comparing attention layouts, memory movement, and interpretability affordances.',
    status: 'Active',
    stack: ['React', 'Canvas', 'Transformers'],
    icon: Atom,
  },
  {
    id: 'whisper-graph',
    title: 'Whisper-to-Graph',
    description: 'A pipeline for turning spoken research notes into a linked concept map with source timestamps.',
    status: 'Draft',
    stack: ['Whisper', 'Embeddings', 'Graphs'],
    icon: Workflow,
  },
  {
    id: 'paper-summarizer',
    title: 'Research Summarizer',
    description: 'A reading assistant that separates paper claims, evidence, assumptions, and follow-up experiments.',
    status: 'Reading',
    stack: ['RAG', 'PDF parsing', 'Eval sets'],
    icon: PenLine,
  },
  {
    id: 'eval-sandbox',
    title: 'Auto-Eval Sandbox',
    description: 'A minimal harness for writing model evals against generated traces and hand-scored rubrics.',
    status: 'Shipped',
    stack: ['TypeScript', 'LLM evals', 'SQLite'],
    icon: FlaskConical,
  },
];

export const humanLoop = {
  title: 'Human Loop',
  subtitle: 'The person behind the research notes.',
  paragraphs: [
    'I am building toward research engineering work: reading deeply, implementing ideas from scratch, and learning how systems behave when theory meets constraints.',
    'This portfolio is organized around how I learn. Brain Dump captures broad thoughts, Rabbit Hole turns concepts into explanations, Lab Bench collects experiments, and Human Loop keeps the personal context visible.',
  ],
  principles: [
    { title: 'Implementation first', description: 'Ideas become clearer when they have to compile, run, and fail in specific ways.' },
    { title: 'Taste through notes', description: 'Writing is how I track what feels promising, brittle, overclaimed, or worth testing.' },
    { title: 'Small loops', description: 'I prefer small experiments with observable behavior over large vague plans.' },
  ],
  icon: Sparkles,
};
