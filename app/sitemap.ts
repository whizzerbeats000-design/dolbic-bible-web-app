import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dolbic-bible.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/$/, '');
  const now = new Date();
  const routes = ['/', '/bible', '/daily', '/plans', '/prayer', '/saved', '/profile'];

  // Core bible books for crawler (top 10 most searched)
  const coreBooks = ['jhn', 'psa', 'gen', 'mat', 'rom', 'isa', 'luk', 'pro', 'act', 'ep'];
  const bibleRoutes = coreBooks.map((book) => ({
    url: `${base}/bible/${book}/1`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    ...routes.map((route) => ({
      url: `${base}${route}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: route === '/' ? 1 : 0.9,
    })),
    ...bibleRoutes,
  ];
}
