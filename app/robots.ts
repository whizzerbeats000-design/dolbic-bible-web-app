import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dolbic-bible.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/bible', '/daily', '/plans', '/prayer', '/saved'],
        disallow: ['/admin', '/api', '/_next', '/notifications'],
      },
    ],
    sitemap: `${siteUrl.replace(/\/$/, '')}/sitemap.xml`,
    host: siteUrl.replace(/\/$/, ''),
  };
}
