import type { MetadataRoute } from 'next';
import posts from '@/data/posts.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fundfinpro.com';
  const now = new Date();

  const postUrls: MetadataRoute.Sitemap = (posts as { id: number; date: string }[]).map((p) => ({
    url: `${baseUrl}/board/${p.id}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/details`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/eligibility`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/board`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    ...postUrls,
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms-of-service`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/cookie-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];
}
