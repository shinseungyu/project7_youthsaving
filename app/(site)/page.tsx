import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Clock, Gift, Shield, TrendingUp, X } from 'lucide-react'
import postsData from '@/data/posts.json'
import { HOME_FAQS, homeFaqLd } from '@/lib/home-faqs'
import { AS_OF_LABEL, PRODUCT, SCHEDULE } from '@/lib/product'
import { SourceNote } from '@/components/site-disclaimer'
import { MaturityCalculator } from '@/components/maturity-calculator'
import { WebtoonDokgoBanner } from '@/components/tenping-banner'
import type { Post } from '@/lib/article'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const 만원 = (n: number) => `${(n / 10000).toLocaleString()}만원`

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-card py-14 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)_0%,_transparent_50%)] opacity-[0.04]" />
      <div className="relative mx-auto max-w-[1200px] px-4 lg:px-8">
        <div className="items-start lg:grid lg:grid-cols-12 lg:gap-12">
          {/* 타이틀 (Left) */}
          <div className="mb-12 text-center lg:col-span-5 lg:mb-0 lg:text-left">
            <p className="inline-flex items-center rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              2026 청년 정책금융상품
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-5xl">
              청년미래적금
              <br />
              <span className="mt-2 block text-primary">만기수령액 계산기</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              기본금리 연 {PRODUCT.baseRate.toFixed(0)}%에 정부기여금과 비과세까지. 월 납입액을 넣으면
              3년 뒤 원금·이자·정부기여금이 각각 얼마인지 바로 나옵니다.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
              <div>
                <p className="text-xl font-bold text-primary">연 {PRODUCT.baseRate.toFixed(0)}%</p>
                <p className="mt-1 text-xs text-muted-foreground">기본금리(전 기관 동일)</p>
              </div>
              <div className="border-x border-border">
                <p className="text-xl font-bold text-primary">6~12%</p>
                <p className="mt-1 text-xs text-muted-foreground">정부기여금 비율</p>
              </div>
              <div>
                <p className="text-xl font-bold text-primary">3년</p>
                <p className="mt-1 text-xs text-muted-foreground">만기</p>
              </div>
            </div>

            <p className="mt-6 rounded-xl border border-border bg-muted/40 px-4 py-3 text-left text-xs leading-relaxed text-muted-foreground">
              본 사이트는 정부·금융기관과 무관한 개인 운영 정보 사이트이며,{' '}
              <strong className="text-foreground">가입 신청을 대행하지 않습니다.</strong> 계산 결과는
              참고용 추정치입니다. ({AS_OF_LABEL} 기준)
            </p>
          </div>

          {/* 계산기 (Right) */}
          <div className="lg:col-span-7">
            <MaturityCalculator />
          </div>
        </div>
      </div>
    </section>
  )
}

const comparisonRows: { label: string; future: string | boolean; leap: string | boolean }[] = [
  { label: '가입 연령', future: `만 ${PRODUCT.ageMin}~${PRODUCT.ageMax}세`, leap: `만 ${PRODUCT.ageMin}~${PRODUCT.ageMax}세` },
  { label: '개인소득 요건', future: `총급여 ${만원(PRODUCT.salaryMax)} 이하`, leap: `총급여 ${만원(PRODUCT.salaryMax)} 이하` },
  { label: '월 납입한도', future: `월 ${만원(PRODUCT.monthlyMax)}`, leap: '월 70만원' },
  { label: '만기', future: '3년', leap: '5년' },
  { label: '기본금리', future: `연 ${PRODUCT.baseRate.toFixed(2)}% (전 기관 동일·고정)`, leap: '기관별 상이' },
  { label: '정부기여금', future: '일반형 6% / 우대형 12%', leap: '소득 구간별 차등' },
  { label: '비과세 혜택', future: true, leap: true },
  { label: '중복 가입', future: '불가 (택1)', leap: '불가 (택1)' },
]

function ComparisonSection() {
  const cell = (v: string | boolean, accent: string) =>
    typeof v === 'boolean' ? (
      v ? (
        <Check className={`mx-auto h-5 w-5 ${accent}`} />
      ) : (
        <X className="mx-auto h-5 w-5 text-muted-foreground/50" />
      )
    ) : (
      v
    )

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            청년미래적금 vs 청년도약계좌
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            두 상품은 중복 가입이 되지 않아 하나를 골라야 합니다. 만기와 납입 한도가 서로 반대 방향이라,
            내 상황에 맞는 쪽이 갈립니다.
          </p>
        </div>

        {/* Desktop table */}
        <div className="mt-12 hidden overflow-hidden rounded-2xl border border-border md:block">
          <table className="w-full text-sm">
            <caption className="sr-only">청년미래적금과 청년도약계좌 조건 비교</caption>
            <thead>
              <tr className="bg-secondary">
                <th scope="col" className="px-6 py-4 text-left font-semibold text-foreground">비교 항목</th>
                <th scope="col" className="px-6 py-4 text-center font-semibold text-primary">청년미래적금</th>
                <th scope="col" className="px-6 py-4 text-center font-semibold text-foreground">청년도약계좌</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr key={row.label} className={idx % 2 === 0 ? 'bg-card' : 'bg-muted/40'}>
                  <th scope="row" className="px-6 py-3.5 text-left font-medium text-foreground">{row.label}</th>
                  <td className="px-6 py-3.5 text-center text-foreground">{cell(row.future, 'text-primary')}</td>
                  <td className="px-6 py-3.5 text-center text-muted-foreground">{cell(row.leap, 'text-accent')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-12 flex flex-col gap-3 md:hidden">
          {comparisonRows.map((row) => (
            <div key={row.label} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs font-medium text-muted-foreground">{row.label}</p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-secondary/60 px-3 py-2 text-center">
                  <p className="mb-1 text-[10px] font-semibold text-primary">미래적금</p>
                  <p className="text-sm font-medium text-foreground">{cell(row.future, 'text-primary')}</p>
                </div>
                <div className="rounded-lg bg-muted/50 px-3 py-2 text-center">
                  <p className="mb-1 text-[10px] font-semibold text-muted-foreground">도약계좌</p>
                  <p className="text-sm font-medium text-muted-foreground">{cell(row.leap, 'text-accent')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          {AS_OF_LABEL} 기준입니다. 세부 조건은 회차마다 조정될 수 있습니다.{' '}
          <Link href="/switch-from-dooyak" className="text-primary underline underline-offset-2">
            갈아타기를 고민 중이라면 순서를 먼저 확인하세요
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

const benefits = [
  {
    icon: Gift,
    title: '정부기여금 6~12%',
    description:
      '내가 넣은 납입액의 6%(일반형) 또는 12%(우대형)가 매달 더해집니다. 금리와 달리 시장 상황과 무관한 확정 몫이라, 이 상품에서 가장 큰 혜택입니다.',
  },
  {
    icon: TrendingUp,
    title: '기본금리 연 5% 고정',
    description:
      '14개 취급기관 모두 기본금리가 같고 3년간 고정입니다. 여기에 기관별 우대금리가 2~3%p 붙어 최고 연 7~8%까지 올라갑니다.',
  },
  {
    icon: Shield,
    title: `이자소득세 ${PRODUCT.normalTaxRate}% 비과세`,
    description:
      '일반 적금은 만기에 이자에서 15.4%를 원천징수합니다. 청년미래적금은 이 세금이 붙지 않아, 같은 금리라도 손에 쥐는 돈이 더 큽니다.',
  },
  {
    icon: Clock,
    title: '만기 3년',
    description:
      '청년도약계좌의 5년보다 짧아 중간에 깨질 위험이 줄었습니다. 대신 월 납입 한도는 50만원으로 도약계좌(70만원)보다 작습니다.',
  },
]

function BenefitsSection() {
  return (
    <section className="bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            혜택은 세 겹으로 쌓입니다
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            은행이자, 정부기여금, 비과세. 이 셋이 합쳐진 결과라 표면 금리만 보면 실제 혜택을 놓칩니다.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="rounded-2xl border border-border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl rounded-xl border border-border bg-muted/40 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">자주 오해되는 지점.</strong> &ldquo;연 19% 적금 효과&rdquo;
          같은 표현은 통장에 찍히는 금리가 아니라, 정부기여금과 비과세까지 돈으로 환산했을 때 같은
          결과를 내려면 일반 과세 적금이 몇 %여야 하는지를 역산한 값입니다. 실제 표시 금리는 최고 연{' '}
          {PRODUCT.rateMax.toFixed(0)}%입니다.{' '}
          <Link href="/details" className="text-primary underline underline-offset-2">
            금리 구조 자세히 보기
          </Link>
        </p>
      </div>
    </section>
  )
}

function ScheduleSection() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">신청 일정</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            상시 가입이 아니라 연 2회 회차로 운영됩니다. 회차를 놓치면 다음 회차까지 기다려야 합니다.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-muted/40 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">지난 회차</p>
            <p className="mt-2 text-lg font-bold text-foreground">{SCHEDULE.firstRound.label}</p>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{SCHEDULE.firstRound.period}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{SCHEDULE.firstRound.note}</p>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">다음 회차</p>
            <p className="mt-2 text-lg font-bold text-foreground">{SCHEDULE.nextRound.label}</p>
            <p className="mt-1 text-sm font-medium text-primary">{SCHEDULE.nextRound.period}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{SCHEDULE.nextRound.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function SwitchGuideSection() {
  return (
    <section className="bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        <div className="items-center lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              전환 가이드
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
              도약계좌를 먼저 해지하면
              <br />
              <span className="text-primary">혜택을 잃습니다</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              갈아타기는 가능하지만 순서가 정해져 있습니다. 청년미래적금 계좌를 먼저 개설한 뒤 도약계좌를
              연계가입 특별중도해지해야, 그동안 쌓인 정부기여금과 비과세 혜택을 지킬 수 있습니다.
            </p>
            <Link
              href="/switch-from-dooyak"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              갈아타기 순서 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 flex flex-col gap-4 lg:mt-0">
            {[
              { icon: '❌', title: '중복 가입 불가', desc: '청년 자산형성 상품은 1인 1계좌가 원칙입니다.' },
              { icon: '⚠️', title: '순서를 지켜야 함', desc: '미래적금 계좌 개설이 먼저, 도약계좌 해지가 나중입니다.' },
              { icon: '✅', title: '특별중도해지로 인정', desc: '순서를 지키면 기존 정부기여금과 비과세가 유지됩니다.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-border bg-background p-5">
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function BoardPreviewSection() {
  const posts = (postsData as Post[]).slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4)

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">청년미래적금 가이드</h2>
            <p className="mt-4 text-base text-muted-foreground">
              가입 조건부터 납입 전략, 해지 판단까지 단계별로 정리한 글입니다.
            </p>
          </div>
          <Link href="/board" className="text-sm font-semibold text-primary hover:underline">
            전체 글 보기 →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/board/${post.id}`}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {post.category}
                </span>
                <time dateTime={post.date} className="text-sm text-muted-foreground">{post.date}</time>
              </div>
              <h3 className="text-lg font-bold text-foreground">{post.title}</h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  return (
    <section className="bg-muted/30 py-16 lg:py-24">
      <div className="mx-auto max-w-[900px] px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">자주 묻는 질문</h2>
          <p className="mt-4 text-base text-muted-foreground">
            청년미래적금에 대해 가장 많이 나오는 질문을 모았습니다.
          </p>
          <Link
            href="/faq"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            질문과 답 전체 보기
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-4">
          {HOME_FAQS.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-border bg-background p-6">
              <h3 className="flex items-start gap-3 text-lg font-semibold text-foreground">
                <span className="font-bold text-primary">Q.</span>
                {faq.question}
              </h3>
              <p className="mt-3 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="font-bold text-accent">A.</span>
                <span>{faq.answer}</span>
              </p>
            </div>
          ))}
        </div>

        <SourceNote className="mt-12" />
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqLd) }} />
      <HeroSection />

      {/* 텐핑 제휴 배너 — 웹툰 독고 */}
      <section className="bg-background pt-10">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <WebtoonDokgoBanner />
        </div>
      </section>

      <ComparisonSection />
      <BenefitsSection />
      <ScheduleSection />
      <SwitchGuideSection />
      <BoardPreviewSection />
      <FAQSection />
    </main>
  )
}
