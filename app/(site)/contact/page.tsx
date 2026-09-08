import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertCircle, Mail } from 'lucide-react'
import { AS_OF_LABEL, SOURCES } from '@/lib/product'
import { breadcrumbLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: '문의하기 — 오류 제보와 정보 수정 요청',
  description:
    'fundfinpro.com 문의 안내입니다. 콘텐츠 오류 제보, 다뤄줬으면 하는 주제 요청, 제휴 문의를 이메일로 받습니다. 가입 신청이나 자격 심사 문의는 취급기관으로 연락하셔야 합니다.',
  alternates: { canonical: '/contact' },
}

const CONTACT = 'tlsfkaus0711@gmail.com'

const ACCEPTED = [
  {
    title: '정보 오류 제보',
    body: '잘못된 수치나 오래된 내용을 발견하셨다면 알려주세요. 어느 페이지의 어느 부분인지와, 가능하면 근거 자료를 함께 보내주시면 확인이 빠릅니다. 확인 후 수정하고 기준일을 갱신합니다.',
  },
  {
    title: '다뤄줬으면 하는 주제',
    body: '찾아봤는데 정리된 곳이 없더라 하는 주제가 있으면 알려주세요. 실제로 막혔던 상황일수록 도움이 됩니다.',
  },
  {
    title: '설명이 부족한 부분',
    body: '읽었는데 이해가 안 되거나 앞뒤가 안 맞는 대목이 있으면 그대로 보내주세요. 대개 저희 설명이 부족한 경우입니다.',
  },
  {
    title: '깨진 링크·표시 오류',
    body: '없는 페이지로 연결되거나 화면이 깨져 보이는 곳이 있으면, 사용하신 기기와 브라우저를 함께 알려주시면 재현하기 쉽습니다.',
  },
  {
    title: '제휴·광고 문의',
    body: '다만 특정 금융기관이나 상품을 유리하게 서술하는 조건의 제안은 받지 않습니다.',
  },
]

const NOT_ACCEPTED = [
  {
    title: '가입 신청 및 자격 심사',
    where: '취급 금융기관 앱',
    body: '본 사이트는 가입을 접수하거나 대행하지 않습니다. 신청은 취급기관 앱에서 직접 진행하셔야 하고, 자격 심사 결과에 관한 문의도 해당 기관이 답변합니다.',
  },
  {
    title: '내 소득으로 가입이 되는지 판정',
    where: '취급기관 또는 서민금융진흥원',
    body: '개인의 소득 자료와 가구 구성은 저희가 확인할 수 없습니다. 소득이 여러 종류이거나 가구 구성이 단순하지 않은 경우처럼 개별 판단이 필요한 사안은 공식 창구에서 확인하셔야 정확합니다.',
  },
  {
    title: '계좌·이체·해지 처리',
    where: '가입하신 금융기관',
    body: '계좌와 관련된 모든 처리는 가입 기관 소관입니다. 특히 중도 해지는 되돌리기 어려우므로 반드시 해당 기관에 먼저 확인하세요.',
  },
]

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd([{ name: '문의하기', path: '/contact' }])),
        }}
      />

      <nav aria-label="breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">홈</Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground">문의하기</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">문의하기</h1>
      <p className="mb-10 text-lg leading-relaxed text-muted-foreground text-pretty">
        제도 정보는 회차마다 바뀌고, 혼자 정리하다 보면 놓치는 부분이 생깁니다. 잘못된 내용을 발견하셨다면
        알려주세요. 확인 후 고치고 기준일을 갱신합니다.
      </p>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-secondary p-3">
            <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">이메일</p>
            <a
              href={`mailto:${CONTACT}`}
              className="text-xl font-bold text-primary underline underline-offset-4"
            >
              {CONTACT}
            </a>
            <p className="mt-2 text-sm text-muted-foreground">
              영업일 기준 2~3일 이내 답변을 목표로 하고 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 받는 문의 */}
      <section className="mt-16" aria-labelledby="accept-heading">
        <h2 id="accept-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          이런 문의를 받습니다
        </h2>
        <div className="mt-8 flex flex-col gap-4">
          {ACCEPTED.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 답변할 수 없는 문의 */}
      <section className="mt-16" aria-labelledby="reject-heading">
        <h2 id="reject-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          여기서는 답변할 수 없는 문의
        </h2>
        <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
          <p className="m-0">
            본 사이트는 정부·금융기관과 무관한 개인 운영 정보 사이트이며,{' '}
            <strong className="font-semibold">가입 신청을 접수하거나 대행하지 않습니다.</strong> 아래
            사안은 저희가 확인할 수 있는 범위를 벗어나므로 공식 창구로 문의하셔야 합니다.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {NOT_ACCEPTED.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-muted/40 p-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  → {item.where}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h3 className="text-sm font-bold text-foreground">공식 안내 창구</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {SOURCES.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-sm text-primary underline underline-offset-2"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 오류 제보 요령 */}
      <section className="mt-16" aria-labelledby="howto-heading">
        <h2 id="howto-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          오류를 제보하실 때
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          아래 내용을 함께 보내주시면 확인과 수정이 훨씬 빠릅니다.
        </p>
        <ul className="mt-8 flex flex-col gap-3" role="list">
          {[
            '어느 페이지인지 (주소를 그대로 붙여넣어 주시면 가장 좋습니다)',
            '어느 문장 또는 어느 표의 어느 항목인지',
            '무엇이 잘못됐다고 보시는지',
            '근거가 되는 자료나 링크가 있다면 함께',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border text-xs text-muted-foreground"
                aria-hidden="true"
              >
                □
              </span>
              <span className="text-sm leading-relaxed text-foreground">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          현재 사이트에 실린 제도 정보의 기준일은 <strong className="text-foreground">{AS_OF_LABEL}</strong>
          입니다. 그 이후 바뀐 내용이라면 알려주시는 것만으로도 큰 도움이 됩니다.
        </p>
      </section>

      <section className="mt-16" aria-labelledby="privacy-heading">
        <h2 id="privacy-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          개인정보 관련 요청
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          본 사이트는 회원가입 기능이 없어 개인 식별 정보를 직접 보관하지 않습니다. 열람·정정·삭제 등
          개인정보에 관한 요청은{' '}
          <Link href="/privacy-policy" className="text-primary underline underline-offset-2">
            개인정보 처리방침
          </Link>
          의 안내에 따라 처리되며, 광고·분석 서비스가 수집한 자료는{' '}
          <Link href="/cookie-policy" className="text-primary underline underline-offset-2">
            쿠키 정책
          </Link>
          에 안내된 방법으로 직접 관리하실 수 있습니다.
        </p>
      </section>

      <div className="mt-16 rounded-2xl border border-border bg-card p-8 text-center">
        <h2 className="text-xl font-bold text-foreground">보내주시기 전에</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          자주 나오는 질문은 아래에 정리돼 있습니다. 답이 있는지 먼저 확인해보셔도 좋습니다.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {[
            { href: '/faq', label: '질문과 답 42가지' },
            { href: '/eligibility', label: '가입 자격' },
            { href: '/about', label: '사이트 소개' },
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
    </main>
  )
}
