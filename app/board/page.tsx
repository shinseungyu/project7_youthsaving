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

export default function BoardPage() {
  const allPosts: Post[] = posts as Post[]

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
          <Link key={post.id} href={`/board/${post.id}`} className="group block rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
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
