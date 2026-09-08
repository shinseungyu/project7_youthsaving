import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import { SiteDisclaimer, SourceNote } from '@/components/site-disclaimer'
import { AS_OF_LABEL, PRODUCT } from '@/lib/product'
import { SITE_TITLE, SITE_URL, breadcrumbLd, faqLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: '청년도약계좌 → 청년미래적금 갈아타기 순서 (먼저 해지하면 안 됩니다)',
  description:
    '청년도약계좌에서 청년미래적금으로 갈아타는 정확한 순서를 정리했습니다. 도약계좌를 먼저 해지하면 연계 갈아타기로 인정받지 못해 정부기여금과 비과세 혜택을 잃습니다.',
  alternates: { canonical: '/switch-from-dooyak' },
  openGraph: {
    title: `청년도약계좌 → 청년미래적금 갈아타기 순서 | ${SITE_TITLE}`,
    description:
      '순서를 거꾸로 하면 혜택을 잃습니다. 연계가입 특별중도해지의 정확한 절차와 판단 기준.',
    url: `${SITE_URL}/switch-from-dooyak`,
  },
}

const comparisonItems = [
  { label: '만기', dooyak: '5년', mirae: '3년' },
  { label: '월 납입한도', dooyak: '최대 70만원', mirae: `최대 ${(PRODUCT.monthlyMax / 10000).toLocaleString()}만원` },
  { label: '기본금리', dooyak: '기관별 상이', mirae: '전 기관 연 5% (3년 고정)' },
  { label: '정부기여금', dooyak: '소득 구간별 차등', mirae: '일반형 6% / 우대형 12%' },
  { label: '비과세', dooyak: 'O', mirae: 'O' },
  { label: '중복 가입', dooyak: '불가 (택1)', mirae: '불가 (택1)' },
]

const faqs = [
  {
    q: '청년도약계좌와 청년미래적금 동시 가입이 되나요?',
    a: '되지 않습니다. 청년 자산형성 지원 상품은 1인 1계좌가 원칙이라 두 상품을 동시에 보유할 수 없습니다. 청년미래적금에 가입하려면 기존 청년도약계좌를 정리해야 하는데, 이때 정리하는 순서에 따라 혜택을 지킬 수도 있고 잃을 수도 있습니다.',
  },
  {
    q: '갈아타려면 청년도약계좌부터 해지하면 되나요?',
    a: '아닙니다. 이 순서가 가장 흔한 실수입니다. 청년도약계좌를 먼저 해지해버리면 연계 갈아타기 대상으로 인정받지 못해, 일반 중도 해지로 처리됩니다. 반드시 청년미래적금 심사를 통과해 계좌를 먼저 개설한 뒤, 그 다음에 도약계좌를 연계가입 특별중도해지해야 합니다.',
  },
  {
    q: '연계가입 특별중도해지로 처리되면 무엇이 달라지나요?',
    a: '일반 중도 해지는 우대금리가 빠지고 정부기여금과 비과세 혜택도 받지 못하는 것이 원칙입니다. 반면 청년미래적금 가입을 위한 연계 갈아타기로 인정되면 그동안 쌓인 정부기여금과 비과세 혜택을 지킨 채 해지할 수 있습니다. 같은 "해지"라도 결과가 완전히 다릅니다.',
  },
  {
    q: '도약계좌를 오래 유지했는데도 갈아타는 게 유리한가요?',
    a: '일률적으로 말하기 어렵습니다. 도약계좌 만기가 얼마 남지 않았다면 그대로 채우는 편이 나을 수 있고, 가입 초기라면 만기가 3년으로 짧고 기여금 비율이 높은 청년미래적금이 유리할 수 있습니다. 특히 총급여 3,600만원 이하로 우대형(12%)에 해당한다면 갈아타기 이점이 큽니다. 남은 기간, 우대형 해당 여부, 3년을 더 유지할 여력 세 가지를 함께 놓고 판단하세요.',
  },
  {
    q: '갈아타면 도약계좌에 넣었던 원금은 어떻게 되나요?',
    a: '해지 시점에 원금과 그동안의 이자, 조건을 충족한 정부기여금이 정산되어 지급됩니다. 이 돈이 자동으로 청년미래적금에 옮겨지는 것은 아니며, 새 계좌에는 새로 납입해야 합니다. 다만 목돈이 생기므로 비상금으로 둘지, 매달 납입 재원으로 쓸지 미리 정해두는 편이 좋습니다.',
  },
  {
    q: '갈아타기를 아무 때나 신청할 수 있나요?',
    a: '아닙니다. 청년미래적금은 연 2회(6월·12월) 회차로 신청을 받으므로, 갈아타기도 그 회차 일정 안에서만 진행됩니다. 회차가 아닌 시기에 도약계좌를 해지하면 갈아탈 대상이 없는 상태에서 그냥 해지한 것이 되므로 주의하세요.',
  },
]

const steps = [
  {
    n: 1,
    title: '청년도약계좌는 그대로 둔 채, 청년미래적금 자격 조회 신청',
    body: '신청 회차 기간에 취급기관 앱에서 청년미래적금 가입 자격 조회를 신청합니다. 이 단계에서는 기존 도약계좌를 건드리지 않습니다. 심사 과정에서 일반형·우대형 분류도 함께 이뤄집니다.',
    warn: false,
  },
  {
    n: 2,
    title: '가입 가능 통보 확인',
    body: '심사 결과 가입이 가능하다는 통보를 받습니다. 여기서 탈락했다면 도약계좌를 해지할 이유가 없습니다. 결과를 확인하기 전에 미리 해지하는 일이 없어야 하는 이유입니다.',
    warn: false,
  },
  {
    n: 3,
    title: '청년미래적금 계좌를 먼저 개설',
    body: '통보받은 기간 안에 청년미래적금 계좌를 개설합니다. 이 계좌가 존재해야 기존 도약계좌 해지가 "연계가입"으로 연결됩니다. 순서가 뒤집히면 안 되는 지점이 바로 여기입니다.',
    warn: true,
  },
  {
    n: 4,
    title: '그 다음에 청년도약계좌를 연계가입 특별중도해지',
    body: '청년미래적금 계좌 개설이 끝난 뒤 도약계좌 취급 은행에서 연계가입 특별중도해지를 신청합니다. 이렇게 해야 그동안 쌓인 정부기여금과 비과세 혜택을 유지한 채 정리할 수 있습니다.',
    warn: false,
  },
  {
    n: 5,
    title: '자동이체 재설정',
    body: '도약계좌로 나가던 자동이체를 끄고, 새 계좌로 급여일 직후 자동이체를 겁니다. 납입 한도가 70만원에서 50만원으로 줄어드는 만큼 남는 금액을 어디에 둘지도 함께 정하세요.',
    warn: false,
  },
]

export default function SwitchPage() {
  const schemas = [
    breadcrumbLd([{ name: '도약계좌 갈아타기', path: '/switch-from-dooyak' }]),
    faqLd(faqs.map((f) => ({ q: f.q, a: f.a }))),
  ]

  return (
    <main className="bg-background py-14 lg:py-20">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <nav aria-label="breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">홈</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">도약계좌 갈아타기</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
          청년도약계좌에서 청년미래적금으로 갈아타기
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          갈아타기 자체는 가능합니다. 문제는 순서입니다. 도약계좌를 먼저 해지하면 연계 갈아타기로
          인정받지 못해 그동안 쌓은 정부기여금과 비과세 혜택을 잃을 수 있습니다.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">기준일 {AS_OF_LABEL}</p>

        {/* 핵심 경고 */}
        <div className="mt-8 rounded-2xl border-2 border-amber-300 bg-amber-50 p-6">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
            <div>
              <p className="font-bold text-amber-900">가장 많이 하는 실수</p>
              <p className="mt-2 text-sm leading-relaxed text-amber-800">
                &ldquo;도약계좌를 해지해야 미래적금에 가입할 수 있다&rdquo;고 생각해서{' '}
                <strong>도약계좌부터 먼저 해지하는 것</strong>입니다. 이렇게 하면 일반 중도 해지로
                처리되어 정부기여금과 비과세 혜택을 받지 못하고, 연계 갈아타기 신청 자체가 불가능해집니다.
              </p>
              <p className="mt-3 rounded-lg bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-900">
                올바른 순서 → ① 청년미래적금 심사 통과 ② 새 계좌 개설 ③ 그 다음에 도약계좌 특별중도해지
              </p>
            </div>
          </div>
        </div>

        <SiteDisclaimer className="mt-6" />

        {/* 절차 */}
        <section className="mt-16" aria-labelledby="steps-heading">
          <h2 id="steps-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            갈아타기 순서
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            아래 순서를 그대로 따르면 기존 혜택을 지킨 채 이동할 수 있습니다.
          </p>

          <ol className="mt-8 flex flex-col gap-4">
            {steps.map((step) => (
              <li
                key={step.n}
                className={`flex gap-4 rounded-2xl border p-5 ${
                  step.warn ? 'border-primary/40 bg-primary/5' : 'border-border bg-card'
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    step.warn
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {step.n}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 해지 종류 비교 */}
        <section className="mt-16" aria-labelledby="terminate-heading">
          <h2 id="terminate-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            같은 &lsquo;해지&rsquo;라도 결과가 다릅니다
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            도약계좌를 정리하는 방법은 크게 두 가지인데, 결과 차이가 큽니다.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-red-200 bg-red-50/60 p-6">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                <p className="font-bold text-red-900">일반 중도 해지</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-red-800">
                미래적금 가입 전에 그냥 해지한 경우입니다.
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-red-800">
                <li>· 우대금리 적용 안 됨</li>
                <li>· 정부기여금 미지급이 원칙</li>
                <li>· 비과세 혜택 상실</li>
                <li>· 연계 갈아타기 신청 불가</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <p className="font-bold text-emerald-900">연계가입 특별중도해지</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-emerald-800">
                미래적금 계좌를 개설한 뒤 해지한 경우입니다.
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-emerald-800">
                <li>· 그동안의 정부기여금 유지</li>
                <li>· 비과세 혜택 유지</li>
                <li>· 청년미래적금으로 정상 이동</li>
                <li>· 새 계좌에서 3년 다시 시작</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            혼인·출산·사망·해외이주·천재지변·장기입원·퇴직 등 정해진 사유에 해당하는 경우에도 특별중도해지가
            인정됩니다. 갈아타기 목적의 해지는 여기에 더해 별도로 인정되는 사유입니다.
          </p>
        </section>

        {/* 상품 비교 */}
        <section className="mt-16" aria-labelledby="compare-heading">
          <h2 id="compare-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            두 상품 조건 비교
          </h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[520px] text-left text-sm">
              <caption className="sr-only">청년도약계좌와 청년미래적금 조건 비교</caption>
              <thead>
                <tr className="border-b border-border bg-secondary text-secondary-foreground">
                  <th scope="col" className="px-5 py-3.5 font-semibold">항목</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">청년도약계좌</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold text-primary">청년미래적금</th>
                </tr>
              </thead>
              <tbody>
                {comparisonItems.map((row, i) => (
                  <tr key={row.label} className={i < comparisonItems.length - 1 ? 'border-b border-border' : ''}>
                    <th scope="row" className="px-5 py-3.5 text-left font-medium text-foreground">{row.label}</th>
                    <td className="px-5 py-3.5 text-muted-foreground">{row.dooyak}</td>
                    <td className="px-5 py-3.5 font-medium text-foreground">{row.mirae}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            납입 한도는 도약계좌가 더 큽니다. 월 70만원을 꾸준히 넣을 여력이 있고 만기가 얼마 남지
            않았다면 그대로 채우는 선택도 합리적입니다. 반대로 5년이 부담스러웠거나 우대형(12%)에
            해당한다면 갈아타기 이점이 커집니다.
          </p>
        </section>

        {/* 판단 기준 */}
        <section className="mt-16" aria-labelledby="decide-heading">
          <h2 id="decide-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            갈아탈지 판단하는 세 가지 질문
          </h2>
          <div className="mt-8 flex flex-col gap-4">
            {[
              {
                q: '도약계좌 만기가 얼마나 남았나?',
                a: '1년 안쪽이라면 채우는 쪽이 대체로 낫습니다. 남은 기간이 짧을수록 이미 쌓인 조건을 포기하고 3년을 새로 시작하는 부담이 커집니다. 반대로 이제 막 시작한 단계라면 갈아타기 부담이 작습니다.',
              },
              {
                q: '우대형(정부기여금 12%)에 해당하나?',
                a: `총급여 ${(PRODUCT.preferredSalaryMax / 10000).toLocaleString()}만원 이하 재직 청년이라면 우대형입니다. 월 50만원 기준 3년 기여금이 ${(PRODUCT.matchCapPreferred * PRODUCT.termMonths / 10000).toLocaleString()}만원으로, 갈아타기의 가장 큰 이유가 됩니다. 일반형(6%)이라면 이점이 줄어듭니다.`,
              },
              {
                q: '앞으로 3년을 더 유지할 수 있나?',
                a: '갈아타면 만기가 3년 새로 시작됩니다. 결혼·이직·독립처럼 목돈이 필요한 일이 2년 안에 예정돼 있다면, 중간에 깨질 가능성을 먼저 따져야 합니다. 중도 해지하면 어느 상품이든 혜택이 사라집니다.',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold text-foreground">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            갈아타기 자주 묻는 질문
          </h2>
          <div className="mt-8 flex flex-col gap-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="flex items-start gap-2.5 text-base font-semibold text-foreground">
                  <span className="font-bold text-primary">Q.</span>
                  {faq.q}
                </h3>
                <p className="mt-3 flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-bold text-accent">A.</span>
                  <span>{faq.a}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-xl font-bold text-foreground">갈아타기 전에 확인할 것</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            우대형 해당 여부와 3년 뒤 수령액을 먼저 확인하면 판단이 쉬워집니다.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/eligibility"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              가입 자격 확인
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              만기수령액 계산기
            </Link>
          </div>
        </div>

        <SourceNote className="mt-12" />
      </div>
    </main>
  )
}
