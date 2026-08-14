import posts from '@/data/posts.json'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Post {
  id: number
  title: string
  date: string
  category: string
  summary: string
  content: string
  tags: string[]
}

const allPosts: Post[] = posts as Post[]

export function generateStaticParams() {
  return allPosts.map((p) => ({ id: String(p.id) }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = allPosts.find((p) => p.id === Number(id))
  if (!post) return {}
  return {
    title: `${post.title} | 청년미래적금 계산기`,
    description: post.summary,
    keywords: post.tags,
    alternates: { canonical: `/board/${post.id}` },
    openGraph: {
      title: `${post.title} | 청년미래적금 계산기`,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function BoardPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = allPosts.find((p) => p.id === Number(id))
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    keywords: post.tags.join(', '),
    inLanguage: 'ko',
    author: { '@type': 'Organization', name: '청년 미래적금' },
    publisher: { '@type': 'Organization', name: '청년 미래적금' },
  }

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/board" className="mb-8 inline-flex items-center text-sm font-medium text-primary hover:underline">
        ← 목록으로
      </Link>

      <article className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-10">
        <div className="mb-4">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {post.category}
          </span>
        </div>
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {post.title}
        </h1>
        <div className="mb-8 flex flex-wrap gap-4 border-b border-border pb-6 text-sm text-muted-foreground">
          <span>📅 {post.date}</span>
          <span>🏷️ {post.tags.join(', ')}</span>
        </div>

        <div className="prose prose-gray max-w-none text-base leading-loose text-foreground">
          {post.content.split('\n').map((line, i) => (
            line.trim() === ''
              ? <br key={i} />
              : <p key={i} className="mb-2 whitespace-pre-wrap">{line}</p>
          ))}
        </div>
      </article>

      <section className="mt-16">
        <h2 className="mb-6 text-xl font-bold text-foreground">다른 글 보기</h2>
        <div className="flex flex-col gap-4">
          {allPosts.filter(p => p.id !== post.id).slice(0, 6).map(p => (
            <Link key={p.id} href={`/board/${p.id}`} className="block rounded-xl border border-border bg-background p-5 transition-colors hover:bg-muted/50">
              <span className="mb-2 inline-block text-xs font-semibold text-primary">{p.category}</span>
              <p className="text-base font-semibold text-foreground">{p.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
