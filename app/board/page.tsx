import posts from '@/data/posts.json'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Post } from '@/lib/article'
import { lastModifiedOf } from '@/lib/article'
import { SITE_TITLE, SITE_URL, breadcrumbLd } from '@/lib/seo'
import { CATEGORIES, CATEGORY_BY_NAME, slugForCategory } from '@/lib/categories'

export const metadata: Metadata = {
  title: '청년미래적금 가이드 — 가입 조건·상품 비교·납입 전략 총정리',
  description:
    '청년미래적금 우대형 가입 조건, 청년도약계좌와의 차이, 월 납입액 배분 전략, 중도 해지 대처법까지. 가입 전후로 꼭 알아야 할 정보를 모았습니다.',
  alternates: { canonical: '/board' },
  openGraph: {
    title: `청년미래적금 가이드 — 가입 조건·상품 비교·납입 전략 총정리 | ${SITE_TITLE}`,
    description:
      '청년미래적금 우대형 가입 조건, 청년도약계좌와의 차이, 월 납입액 배분 전략, 중도 해지 대처법까지 한 곳에 정리했습니다.',
    url: `${SITE_URL}/board`,
  },
}


export default function BoardPage() {
  const allPosts: Post[] = (posts as Post[]).slice().sort((a, b) => b.date.localeCompare(a.date))

  const defined = CATEGORIES.map((c) => c.name)
  const categories = [
    ...defined.filter((c) => allPosts.some((p) => p.category === c)),
    ...Array.from(new Set(allPosts.map((p) => p.category))).filter((c) => !defined.includes(c)),
  ]

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '청년미래적금 가이드',
    numberOfItems: allPosts.length,
    itemListElement: allPosts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/board/${p.id}`,
      name: p.title,
    })),
  }

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '청년미래적금 가이드',
    description: '청년미래적금 가입 조건·상품 비교·납입 전략 가이드 모음',
    url: `${SITE_URL}/board`,
    inLanguage: 'ko',
    isPartOf: { '@type': 'WebSite', name: SITE_TITLE, url: SITE_URL },
  }

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-16">
      {[collectionLd, itemListLd, breadcrumbLd([{ name: '청년미래적금 가이드', path: '/board' }])].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <nav aria-label="breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">홈</Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground">청년미래적금 가이드</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          청년미래적금 가이드
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          가입 조건 확인부터 청년도약계좌 비교, 월 납입액 배분, 중도 해지 대처까지. 청년미래적금을
          제대로 활용하기 위해 필요한 정보를 단계별로 정리했습니다.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
          <Link href="/" className="rounded-full border border-border px-4 py-2 hover:border-primary/50 hover:text-primary">
            만기수령액 계산기
          </Link>
          <Link href="/eligibility" className="rounded-full border border-border px-4 py-2 hover:border-primary/50 hover:text-primary">
            가입 자격 확인
          </Link>
          <Link href="/details" className="rounded-full border border-border px-4 py-2 hover:border-primary/50 hover:text-primary">
            상품 상세 정보
          </Link>
          <Link href="/switch-from-dooyak" className="rounded-full border border-border px-4 py-2 hover:border-primary/50 hover:text-primary">
            도약계좌에서 갈아타기
          </Link>
        </div>
      </div>

      {categories.map((category) => {
        const items = allPosts.filter((p) => p.category === category)
        const intro = CATEGORY_BY_NAME.get(category)?.intro
        return (
          <section key={category} id={slugForCategory(category)} className="mb-14 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{category}</h2>
            {intro && <p className="mt-2 text-sm text-muted-foreground">{intro}</p>}
            <div className="mt-6 flex flex-col gap-6">
              {items.map((post) => (
                <Link
                  key={post.id}
                  href={`/board/${post.id}`}
                  className="group block rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {post.category}
                    </span>
                    <time dateTime={lastModifiedOf(post)} className="text-sm text-muted-foreground">
                      {lastModifiedOf(post)}
                    </time>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                    {post.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </main>
  )
}
