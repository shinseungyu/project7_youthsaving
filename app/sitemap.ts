import type { MetadataRoute } from 'next';
import posts from '@/data/posts.json';
import { lastModifiedOf } from '@/lib/article';
import { AS_OF } from '@/lib/product';

/**
 * lastModified 는 "실제 콘텐츠가 바뀐 날"만 넣는다.
 * 이전에는 전부 new Date() 라서 배포할 때마다 모든 URL 이 수정된 것처럼 나갔고,
 * 그렇게 되면 구글은 이 사이트의 lastmod 를 신뢰하지 않고 통째로 무시한다.
 * 날짜를 모르는 정책 페이지는 아예 값을 넣지 않는다(잘못된 값보다 없는 편이 낫다).
 */
const CONTENT_UPDATED = new Date(AS_OF);

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fundfinpro.com';

  const postUrls: MetadataRoute.Sitemap = (posts as { id: number; date: string; updated?: string }[]).map((p) => ({
    url: `${baseUrl}/board/${p.id}`,
    lastModified: new Date(lastModifiedOf(p)),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: CONTENT_UPDATED, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/details`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/eligibility`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/banks`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/faq`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    // 헤더에는 있는데 사이트맵에서 빠져 있던 페이지
    { url: `${baseUrl}/switch-from-dooyak`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/board`, lastModified: CONTENT_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    ...postUrls,
    { url: `${baseUrl}/about`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/contact`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
