import posts from '@/data/posts.json'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Post } from '@/lib/article'
import { parseArticle, extractFaqs, extractHeadings, relatedPosts, lastModifiedOf } from '@/lib/article'
import { ArticleBody, ArticleToc } from '@/components/article-body'
import { SITE_TITLE, SITE_URL, OG_IMAGE, articleLd, breadcrumbLd, faqLd } from '@/lib/seo'
import { WebtoonDokgoBanner } from '@/components/tenping-banner'

const allPosts: Post[] = posts as Post[]

/** 글 주제에 맞는 도구/안내 페이지로 내보내는 CTA. 글 → 계산기 딥링크가 없어 게시판이 고립돼 있었다. */
function ctaFor(post: Post): { href: string; label: string; desc: string } {
  const text = `${post.category} ${post.title} ${(post.tags || []).join(' ')}`

  if (/가입 조건|자격|소득|우대형|체크리스트/.test(text)) {
    return {
      href: '/eligibility',
      label: '내 가입 자격 확인하기',
      desc: '소득 조건과 우대형 해당 여부를 먼저 확인해보세요.',
    }
  }
  if (/도약계좌|비교|해지|상품/.test(text)) {
    return {
      href: '/details',
      label: '청년미래적금 상세 정보 보기',
      desc: '정부기여금·비과세 등 상품 조건을 자세히 확인하세요.',
    }
  }
  return {
    href: '/',
    label: '만기수령액 계산해보기',
    desc: '월 납입액을 넣으면 3년 뒤 원금·이자·정부기여금이 한번에 나옵니다.',
  }
}

export function generateStaticParams() {
  return allPosts.map((p) => ({ id: String(p.id) }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = allPosts.find((p) => p.id === Number(id))
  if (!post) return {}

  const url = `${SITE_URL}/board/${post.id}`
  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    alternates: { canonical: `/board/${post.id}` },
    openGraph: {
      title: `${post.title} | ${SITE_TITLE}`,
      description: post.summary,
      url,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: lastModifiedOf(post),
      section: post.category,
      tags: post.tags,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [OG_IMAGE],
    },
  }
}

export default async function BoardPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = allPosts.find((p) => p.id === Number(id))
  if (!post) notFound()

  const blocks = parseArticle(post.content)
  const headings = extractHeadings(blocks)
  const faqs = extractFaqs(blocks)
  const related = relatedPosts(allPosts, post, 6)
  const cta = ctaFor(post)
  const updated = lastModifiedOf(post)

  const schemas: object[] = [
    articleLd(post),
    breadcrumbLd([
      { name: '청년미래적금 가이드', path: '/board' },
      { name: post.title, path: `/board/${post.id}` },
    ]),
  ]
  if (faqs.length > 0) schemas.push(faqLd(faqs))

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <nav aria-label="breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">홈</Link>
        <span aria-hidden="true">/</span>
        <Link href="/board" className="hover:text-primary">청년미래적금 가이드</Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground">{post.category}</span>
      </nav>

      <article className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-10">
        <div className="mb-4">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {post.category}
          </span>
        </div>
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {post.title}
        </h1>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">{post.summary}</p>
        <div className="mb-8 flex flex-wrap gap-4 border-b border-border pb-6 text-sm text-muted-foreground">
          <span>작성 <time dateTime={post.date}>{post.date}</time></span>
          {updated !== post.date && (
            <span>최종 수정 <time dateTime={updated}>{updated}</time></span>
          )}
          <span>{post.tags.join(', ')}</span>
        </div>

        <ArticleToc headings={headings} />
        <ArticleBody blocks={blocks} />

        <aside className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <p className="mb-1 text-sm font-bold text-primary">직접 확인해보기</p>
          <p className="mb-4 text-sm text-muted-foreground">{cta.desc}</p>
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {cta.label} →
          </Link>
        </aside>
      </article>

      {/* 텐핑 제휴 배너 — 웹툰 독고 */}
      <WebtoonDokgoBanner className="mt-10" />

      <section className="mt-16">
        <h2 className="mb-6 text-xl font-bold text-foreground">함께 보면 좋은 글</h2>
        <div className="flex flex-col gap-4">
          {related.map((p) => (
            <Link key={p.id} href={`/board/${p.id}`} className="block rounded-xl border border-border bg-background p-5 transition-colors hover:bg-muted/50">
              <span className="mb-2 inline-block text-xs font-semibold text-primary">{p.category}</span>
              <p className="text-base font-semibold text-foreground">{p.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <Link href="/board" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
          ← 청년미래적금 가이드 전체 보기
        </Link>
      </div>
    </main>
  )
}
