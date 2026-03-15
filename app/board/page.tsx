import posts from '@/data/posts.json'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '청년 재테크 게시판 | 청년미래적금 계산기',
  description: '청년미래적금 혜택, 가입 조건, 청년도약계좌 비교 등 재테크 팁을 모아둔 게시판입니다.',
  alternates: { canonical: '/board' },
}

interface Post {
  id: number
  title: string
  date: string
  category: string
  summary: string
  content: string
  tags: string[]
}

interface Props {
  searchParams: Promise<{ id?: string }>
}

export default async function BoardPage({ searchParams }: Props) {
  const { id } = await searchParams
  const allPosts: Post[] = posts as Post[]

  if (id) {
    const post = allPosts.find((p) => p.id === Number(id))

    if (!post) {
      return (
        <main className="mx-auto max-w-[1200px] px-4 py-16">
          <p className="text-muted-foreground">게시글을 찾을 수 없습니다.</p>
          <Link href="/board" className="text-primary mt-4 inline-block">← 목록으로</Link>
        </main>
      )
    }

    return (
      <main className="mx-auto max-w-[1200px] px-4 py-16">
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
                : <p key={i} className="mb-2">{line}</p>
            ))}
          </div>
        </article>

        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-foreground">다른 글 보기</h2>
          <div className="flex flex-col gap-4">
            {allPosts.filter(p => p.id !== post.id).map(p => (
              <Link key={p.id} href={`/board?id=${p.id}`} className="block rounded-xl border border-border bg-background p-5 transition-colors hover:bg-muted/50">
                <span className="mb-2 inline-block text-xs font-semibold text-primary">{p.category}</span>
                <p className="text-base font-semibold text-foreground">{p.title}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-16">
      <Link href="/" className="mb-8 inline-flex items-center text-sm font-medium text-primary hover:underline">
        ← 계산기 홈으로
      </Link>

      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          청년 재테크 게시판
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          청년미래적금, 도약계좌 비교부터 월급 관리까지 유용한 정보를 확인하세요.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {allPosts.map((post) => (
          <Link key={post.id} href={`/board?id=${post.id}`} className="group block rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {post.category}
              </span>
              <span className="text-sm text-muted-foreground">{post.date}</span>
            </div>
            <h2 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
              {post.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
