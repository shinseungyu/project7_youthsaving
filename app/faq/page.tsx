import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SiteDisclaimer, SourceNote } from '@/components/site-disclaimer'
import { AS_OF_LABEL } from '@/lib/product'
import { FAQ_COUNT, FAQ_GROUPS, faqHubLd } from '@/lib/faqs'
import { SITE_TITLE, SITE_URL, breadcrumbLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: `청년미래적금 질문과 답 ${FAQ_COUNT}가지 — 자격·신청·금리·해지 총정리`,
  description:
    '청년미래적금에 대해 실제로 많이 막히는 질문을 자격, 신청 일정, 금리와 은행, 정부기여금, 납입 관리, 해지·갈아타기 여섯 갈래로 나눠 정리했습니다.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: `청년미래적금 질문과 답 ${FAQ_COUNT}가지 | ${SITE_TITLE}`,
    description:
      '나이 계산, 소득 지표, 가구원 판단, 우대형 판정, 해지 순서까지 헷갈리는 지점을 모았습니다.',
    url: `${SITE_URL}/faq`,
  },
}

export default function FaqPage() {
  const schemas = [faqHubLd, breadcrumbLd([{ name: '질문과 답', path: '/faq' }])]

  return (
    <main className="bg-background py-14 lg:py-20">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <nav aria-label="breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">홈</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">질문과 답</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
          청년미래적금 질문과 답
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          제도 설명을 읽고도 막히는 지점은 대개 경계선에 있는 사례입니다. 생일이 신청 기간에 걸쳐
          있거나, 이직해서 회사가 두 곳이거나, 등본은 부모님 주소인데 따로 사는 경우 같은 것들입니다.
          그런 질문 {FAQ_COUNT}가지를 모았습니다.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">기준일 {AS_OF_LABEL}</p>

        <SiteDisclaimer className="mt-8" />

        {/* 목차 */}
        <nav aria-label="질문 분류" className="mt-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm font-bold text-foreground">무엇이 궁금하신가요</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2" role="list">
            {FAQ_GROUPS.map((group) => (
              <li key={group.slug}>
                <a
                  href={`#${group.slug}`}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <span>{group.title}</span>
                  <span className="text-xs text-muted-foreground">{group.items.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 그룹별 Q&A */}
        {FAQ_GROUPS.map((group) => (
          <section key={group.slug} id={group.slug} className="mt-16 scroll-mt-24" aria-labelledby={`${group.slug}-heading`}>
            <h2 id={`${group.slug}-heading`} className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {group.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{group.intro}</p>

            <div className="mt-8 flex flex-col gap-4">
              {group.items.map((item) => (
                <article key={item.q} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="flex items-start gap-2.5 text-base font-semibold text-foreground">
                    <span className="font-bold text-primary">Q.</span>
                    {item.q}
                  </h3>
                  <p className="mt-3 flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-bold text-accent">A.</span>
                    <span>{item.a}</span>
                  </p>
                  {item.more && (
                    <Link
                      href={item.more.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      {item.more.label}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* 여기서 답을 못 찾았다면 */}
        <section className="mt-16" aria-labelledby="next-heading">
          <h2 id="next-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            여기서 답을 못 찾으셨다면
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            제도 자체가 회차마다 조금씩 바뀌고, 개인 사정에 따라 갈리는 부분도 많습니다. 아래 순서로
            확인하시면 대부분 해결됩니다.
          </p>
          <ol className="mt-8 flex flex-col gap-4">
            {[
              {
                title: '해당 주제의 상세 페이지를 확인합니다',
                body: '금리와 은행은 상품 조건과 취급기관 비교, 자격은 가입 자격 페이지, 갈아타기는 전환 가이드에 더 자세히 정리돼 있습니다.',
              },
              {
                title: '공식 안내에서 원문을 확인합니다',
                body: '금융위원회 보도자료와 서민금융진흥원 상품 안내가 1차 자료입니다. 회차별 공고는 여기서 확정됩니다.',
              },
              {
                title: '취급기관에 직접 문의합니다',
                body: '소득이 여러 종류이거나 가구 구성이 단순하지 않은 경우처럼 개별 판단이 필요한 사안은, 추정하지 말고 가입하려는 기관에 확인하는 편이 정확합니다.',
              },
              {
                title: '내용에 오류가 있다면 알려주세요',
                body: '잘못된 수치나 오래된 내용을 발견하시면 문의 페이지로 알려주시면 확인 후 수정하고 기준일을 갱신합니다.',
              },
            ].map((step, i) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-16 rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-xl font-bold text-foreground">주제별로 더 자세히</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { href: '/details', label: '상품 조건 총정리' },
              { href: '/banks', label: '취급기관 비교' },
              { href: '/eligibility', label: '가입 자격' },
              { href: '/switch-from-dooyak', label: '갈아타기 순서' },
              { href: '/board', label: '가이드 전체' },
              { href: '/contact', label: '문의하기' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <SourceNote className="mt-12" />
      </div>
    </main>
  )
}
