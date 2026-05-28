import type { RouteId } from '@/portfolio-data';

export type ContentSectionId = 'brain-dump' | 'rabbit-hole' | 'lab-bench';

export interface ContentPost {
  id: string;
  section: ContentSectionId;
  title: string;
  description: string;
  date: string;
  readTime: string;
  body: string;
  timestamp: number;
}

const rawPosts = import.meta.glob<string>(['./brain-dump/*.md', './rabbit-hole/*.md', './lab-bench/*.md'], {
  eager: true,
  query: '?raw',
  import: 'default',
});

const sectionIds = new Set<ContentSectionId>(['brain-dump', 'rabbit-hole', 'lab-bench']);
const wordsPerMinute = 220;

function parseFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    throw new Error('Content post is missing frontmatter.');
  }

  const metadata = Object.fromEntries(
    match[1]
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.indexOf(':');

        if (separatorIndex === -1) {
          throw new Error(`Invalid frontmatter line: ${line}`);
        }

        return [line.slice(0, separatorIndex).trim(), line.slice(separatorIndex + 1).trim()];
      }),
  );

  return { metadata, body: match[2].trim() };
}

function getStringField(metadata: Record<string, string>, field: string, path: string) {
  const value = metadata[field];

  if (!value) {
    throw new Error(`${path} is missing required frontmatter field "${field}".`);
  }

  return value;
}

function estimateReadTime(body: string) {
  const text = body
    .replace(/---[\s\S]*?---/, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[#*_>\-[\]()]/g, ' ');
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return `${minutes} min read`;
}

function postFromModule(path: string, source: string): ContentPost {
  const parts = path.split('/');
  const section = parts.at(-2);
  const filename = parts.at(-1);

  if (!section || !filename || !sectionIds.has(section as ContentSectionId)) {
    throw new Error(`Invalid content path: ${path}`);
  }

  const { metadata, body } = parseFrontmatter(source);
  const date = getStringField(metadata, 'date', path);

  return {
    id: filename.replace(/\.md$/, ''),
    section: section as ContentSectionId,
    title: getStringField(metadata, 'title', path),
    description: getStringField(metadata, 'description', path),
    date,
    readTime: estimateReadTime(body),
    body,
    timestamp: Date.parse(date),
  };
}

export const contentPosts = Object.entries(rawPosts)
  .map(([path, source]) => postFromModule(path, source))
  .sort((a, b) => b.timestamp - a.timestamp);

export function getSectionPosts(section: ContentSectionId) {
  return contentPosts.filter((post) => post.section === section);
}

export function getLatestSectionPosts(section: ContentSectionId, count = 2) {
  return getSectionPosts(section).slice(0, count);
}

export function getContentPost(section: ContentSectionId, postId: string) {
  return contentPosts.find((post) => post.section === section && post.id === postId);
}

export function isContentSection(route: RouteId): route is ContentSectionId {
  return sectionIds.has(route as ContentSectionId);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('en-SG', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

export function formatLandingMeta(post: ContentPost) {
  return `${formatPostDate(post.date)} / ${post.readTime.replace(/ read$/, '')}`;
}
