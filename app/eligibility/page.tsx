import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Info } from 'lucide-react'
import { EligibilityChecklist } from '@/components/eligibility-checklist'
import { EligibilityFAQ } from '@/components/eligibility-faq'
import { SiteDisclaimer, SourceNote } from '@/components/site-disclaimer'
import { AS_OF_LABEL, PRODUCT, SCHEDULE } from '@/lib/product'
import { SITE_TITLE, SITE_URL, breadcrumbLd, faqLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: '청년미래적금 가입 자격 — 나이·소득·가구소득 기준과 우대형 판정',
  description:
    '청년미래적금 가입 자격을 요건별로 정리했습니다. 만 19~34세 나이 계산, 총급여 7,500만원·종합소득 6,300만원 기준, 기준 중위소득 200% 가구 요건, 우대형(12%) 판정 기준까지 확인하세요.',
  alternates: { canonical: '/eligibility' },
  openGraph: {
    title: `청년미래적금 가입 자격 — 나이·소득·가구소득 기준 | ${SITE_TITLE}`,
    description:
      '나이·개인소득·가구소득 세 축으로 나눠 본 청년미래적금 자격 요건과 우대형 판정 기준.',
    url: `${SITE_URL}/eligibility`,
  },
}

const 만원 = (n: number) => `${(n / 10000).toLocaleString()}만원`

const eligibilityCriteria = [
  {
    id: 'age',
    label: `만 ${PRODUCT.ageMin}세 이상 ~ 만 ${PRODUCT.ageMax}세 이하`,
    description: `가입 신청일 기준 만 나이입니다. 병역을 이행했다면 복무 기간만큼 상한이 늘어나 최대 만 ${PRODUCT.ageMaxWithMilitary}세까지 가능합니다.`,
  },
  {
    id: 'income',
    label: `총급여 ${만원(PRODUCT.salaryMax)} 이하 (또는 종합소득금액 ${만원(PRODUCT.comprehensiveIncomeMax)} 이하)`,
    description:
      '직전 과세기간 소득이 기준입니다. 근로소득자는 총급여, 사업·프리랜서 소득자는 종합소득금액으로 봅니다.',
  },
  {
    id: 'household',
    label: `가구소득 기준 중위소득 ${PRODUCT.householdMedianPct}% 이하`,
    description: `주민등록등본상 가구원의 소득을 합산합니다. 맞벌이 2인 가구는 ${PRODUCT.householdMedianPctDualIncome}% 이하까지 인정됩니다.`,
  },
  {
    id: 'duplicate',
    label: '청년도약계좌 등 유사 상품에 가입 중이 아닐 것',
    description:
      '청년 자산형성 상품은 1인 1계좌가 원칙이라 중복 가입이 불가합니다. 갈아타려면 정해진 순서를 지켜야 합니다.',
  },
  {
    id: 'account',
    label: '본인 명의로 취급기관 앱에서 직접 신청',
    description: '타인 명의 가입이나 대리 신청은 불가합니다. 신청은 비대면으로만 이뤄집니다.',
  },
]

const faqItems = [
  {
    question: `나이는 언제를 기준으로 계산하나요? 만 ${PRODUCT.ageMax}세 생일이 곧 지나는데요.`,
    answer: `가입 신청일 기준 만 나이로 판단합니다. 신청 기간 안에 만 ${PRODUCT.ageMax}세라면 가입할 수 있고, 신청 기간이 시작되기 전에 만 ${PRODUCT.ageMax + 1}세가 되면 해당 회차에는 신청할 수 없습니다. 청년미래적금은 연 2회(6월·12월) 회차로 운영되므로, 생일이 임박했다면 다음 회차를 기다리기보다 이번 회차에 신청하는 편이 안전합니다. 병역을 이행했다면 복무 기간만큼 상한이 늘어나 최대 만 ${PRODUCT.ageMaxWithMilitary}세까지 가능합니다.`,
  },
  {
    question: '소득 기준의 총급여와 종합소득금액은 무엇이 다른가요?',
    answer: `총급여는 근로소득자의 연간 급여 총액에서 비과세 소득(식대, 일부 수당 등)을 뺀 금액으로, 회사에서 받는 근로소득 원천징수영수증에 표시됩니다. 종합소득금액은 사업·프리랜서·임대 등 소득이 있는 사람이 필요경비를 뺀 뒤의 금액으로, 종합소득세 신고 결과에 나옵니다. 근로소득자는 총급여 ${만원(PRODUCT.salaryMax)} 이하, 그 외 소득자는 종합소득금액 ${만원(PRODUCT.comprehensiveIncomeMax)} 이하가 기준입니다. 기준선이 다른 이유는 종합소득금액이 이미 경비를 뺀 값이라 총급여보다 낮게 잡히기 때문입니다.`,
  },
  {
    question: '우대형(정부기여금 12%)은 어떻게 정해지나요? 직접 신청하는 건가요?',
    answer: `신청자가 고르는 것이 아니라 심사 과정에서 자동으로 분류됩니다. 총급여 ${만원(PRODUCT.preferredSalaryMax)} 이하인 재직 청년은 소득 요건만으로 우대형에 해당합니다. 일반형은 납입액의 6%(월 최대 ${PRODUCT.matchCapGeneral.toLocaleString()}원), 우대형은 12%(월 최대 ${PRODUCT.matchCapPreferred.toLocaleString()}원)가 정부기여금으로 붙습니다. 월 50만원을 3년간 넣는다면 두 유형의 기여금 차이는 약 ${((PRODUCT.matchCapPreferred - PRODUCT.matchCapGeneral) * PRODUCT.termMonths / 10000).toLocaleString()}만원으로, 은행별 금리 차이보다 훨씬 큽니다.`,
  },
  {
    question: '가구소득은 누구까지 합산하나요? 부모님과 따로 사는데도 포함되나요?',
    answer:
      '원칙적으로 주민등록등본을 기준으로 가구원을 판단하고 그 소득을 합산합니다. 따라서 세대분리가 되어 있고 등본상 별도 가구라면 부모님 소득은 합산되지 않는 것이 일반적입니다. 반대로 부모님과 같은 등본에 올라 있다면 합산 대상이 됩니다. 다만 가구원 판단에는 예외 규정이 있고 회차마다 세부 기준이 조정될 수 있으므로, 애매하다면 신청 전 서민금융진흥원 안내로 확인하는 것이 정확합니다.',
  },
  {
    question: '소득이 아예 없거나 이제 막 취업했으면 가입할 수 있나요?',
    answer:
      '직전 과세기간에 확인되는 소득이 있어야 하는 것이 원칙이라, 소득이 전혀 없으면 자격 확인이 어렵습니다. 다만 신규 취업자처럼 직전 과세기간 소득 자료가 아직 확정되지 않은 경우에는 회차별로 별도 기준이 적용될 수 있습니다. 소득 자료가 국세청에 잡히는 시점과 회차 일정이 엇갈릴 수 있으니, 이런 상황이라면 신청 전에 취급기관이나 서민금융진흥원에 본인 사례를 직접 문의하는 편이 확실합니다.',
  },
  {
    question: '자격 조회에서 떨어지면 다시 신청할 수 있나요?',
    answer: `청년미래적금은 ${SCHEDULE.roundLabel} 회차로 운영되므로 다음 회차에 다시 신청할 수 있습니다. 소득이나 가구 구성이 바뀌면 결과도 달라질 수 있습니다. 직전 과세기간 소득으로 심사하므로, 예를 들어 소득이 줄어든 해가 반영되는 회차에는 우대형으로 분류될 수도 있습니다.`,
  },
  {
    question: '중간에 소득이 올라가면 계좌가 해지되나요?',
    answer:
      '가입 자격은 가입 시점에 판단하므로, 가입 이후 소득이 늘었다고 계좌가 해지되지는 않습니다. 다만 정부기여금 유형(일반형·우대형)은 유지 심사에서 재산정될 수 있는 항목이므로, 소득 변동이 큰 경우 가입 기관 안내를 확인하세요.',
  },
  {
    question: '가입 신청은 어디서 하나요? 이 사이트에서 신청되나요?',
    answer: `아닙니다. 본 사이트는 정보를 정리해 제공할 뿐 가입을 접수하거나 대행하지 않습니다. 신청은 ${PRODUCT.applyChannel}으로만 가능하며, 취급기관은 14곳입니다. 가입을 대신 해주겠다며 개인정보나 수수료를 요구하는 곳이 있다면 응하지 마세요.`,
  },
]

const incomeTable = [
  {
    type: '근로소득자 (직장인)',
    metric: '총급여',
    limit: 만원(PRODUCT.salaryMax),
    where: '근로소득 원천징수영수증 · 홈택스 지급명세서',
  },
  {
    type: '사업·프리랜서 소득자',
    metric: '종합소득금액',
    limit: 만원(PRODUCT.comprehensiveIncomeMax),
    where: '종합소득세 신고서 · 홈택스 소득금액증명',
  },
]

export default function EligibilityPage() {
  const schemas = [
    breadcrumbLd([{ name: '가입 자격 확인', path: '/eligibility' }]),
    faqLd(faqItems.map((f) => ({ q: f.question, a: f.answer }))),
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
          <span className="text-foreground">가입 자격 확인</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
          청년미래적금 가입 자격
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          자격 요건은 <strong className="text-foreground">나이 · 개인소득 · 가구소득</strong> 세 축으로
          나뉩니다. 셋을 모두 충족해야 하며, 이 중 개인소득 수준이 정부기여금 유형(일반형 6% / 우대형
          12%)까지 함께 결정합니다.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">기준일 {AS_OF_LABEL}</p>

        <SiteDisclaimer className="mt-8" />

        {/* 체크리스트 */}
        <section className="mt-12" aria-labelledby="checklist-heading">
          <h2 id="checklist-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            자격 요건 체크리스트
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            아래 항목을 눌러 해당 여부를 표시해보세요. 모두 해당하면 신청 요건을 갖춘 것으로 볼 수
            있습니다. 다만 최종 판단은 취급기관 심사 결과에 따릅니다.
          </p>
          <EligibilityChecklist criteria={eligibilityCriteria} />
        </section>

        {/* 소득 기준 상세 */}
        <section className="mt-16" aria-labelledby="income-heading">
          <h2 id="income-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            개인소득 기준: 내 소득은 어느 쪽으로 보나
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            소득 종류에 따라 보는 지표와 기준선이 다릅니다. 직장인은 총급여, 사업·프리랜서 소득자는
            필요경비를 뺀 종합소득금액으로 판단합니다.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">소득 유형별 청년미래적금 소득 기준</caption>
              <thead>
                <tr className="border-b border-border bg-secondary text-secondary-foreground">
                  <th scope="col" className="px-5 py-3.5 font-semibold">소득 유형</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">보는 지표</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">기준선</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">확인 방법</th>
                </tr>
              </thead>
              <tbody>
                {incomeTable.map((row, i) => (
                  <tr key={row.type} className={i < incomeTable.length - 1 ? 'border-b border-border' : ''}>
                    <th scope="row" className="px-5 py-3.5 text-left align-top font-medium text-foreground">
                      {row.type}
                    </th>
                    <td className="px-5 py-3.5 align-top text-muted-foreground">{row.metric}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 align-top font-semibold text-primary">{row.limit}</td>
                    <td className="px-5 py-3.5 align-top text-muted-foreground">{row.where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex gap-3 rounded-xl border border-border bg-muted/40 p-5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">기준선이 다른 이유.</strong> 종합소득금액은 매출에서
              필요경비를 이미 뺀 값이라 같은 벌이라도 총급여보다 작게 잡힙니다. 그래서 기준선도 총급여
              {만원(PRODUCT.salaryMax)}보다 낮은 {만원(PRODUCT.comprehensiveIncomeMax)}으로 정해져
              있습니다. 두 소득이 함께 있다면 어떤 기준이 적용되는지 신청 전에 확인하세요.
            </p>
          </div>
        </section>

        {/* 우대형 판정 */}
        <section className="mt-16" aria-labelledby="preferred-heading">
          <h2 id="preferred-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            일반형과 우대형은 어떻게 갈리나
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            신청자가 유형을 고르는 것이 아니라, 심사 과정에서 소득 자료를 보고 자동으로 분류됩니다. 이
            분류가 3년 동안 받는 정부기여금 총액을 결정하므로 자격 요건 중 금액 영향이 가장 큽니다.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-semibold text-foreground">일반형</p>
              <p className="mt-2 text-3xl font-bold text-foreground">6%</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                가입 요건은 충족하지만 우대형 소득 기준을 넘는 경우입니다. 월 최대{' '}
                {PRODUCT.matchCapGeneral.toLocaleString()}원, 3년이면 최대{' '}
                {(PRODUCT.matchCapGeneral * PRODUCT.termMonths).toLocaleString()}원을 받습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <p className="text-sm font-semibold text-primary">우대형</p>
              <p className="mt-2 text-3xl font-bold text-primary">12%</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                총급여 {만원(PRODUCT.preferredSalaryMax)} 이하 재직 청년은 소득 요건만으로 해당됩니다. 월
                최대 {PRODUCT.matchCapPreferred.toLocaleString()}원, 3년이면 최대{' '}
                {(PRODUCT.matchCapPreferred * PRODUCT.termMonths).toLocaleString()}원입니다.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            두 유형의 3년 기여금 차이는 최대{' '}
            <strong className="text-foreground">
              {((PRODUCT.matchCapPreferred - PRODUCT.matchCapGeneral) * PRODUCT.termMonths).toLocaleString()}원
            </strong>
            입니다.{' '}
            <Link href="/details" className="text-primary underline underline-offset-2">
              은행별 금리 차이(최대 3%p)로 벌어지는 금액
            </Link>
            보다 훨씬 크기 때문에, 은행을 고르기 전에 내가 어느 유형인지부터 확인하는 것이 순서입니다.
          </p>
        </section>

        {/* 중복 가입 */}
        <section className="mt-16" aria-labelledby="dup-heading">
          <h2 id="dup-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            청년도약계좌에 가입 중이라면
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            두 상품은 중복 가입이 되지 않습니다. 다만 갈아타기 자체는 가능하며,{' '}
            <strong className="text-foreground">순서를 지켜야 기존 혜택을 지킬 수 있습니다.</strong> 도약계좌를
            먼저 해지해버리면 연계 갈아타기로 인정받지 못해 손해를 볼 수 있습니다.
          </p>
          <Link
            href="/switch-from-dooyak"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            갈아타기 순서 확인하기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* FAQ */}
        <section className="mt-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            자격 요건 자주 묻는 질문
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            나이 계산, 소득 지표, 가구원 판단처럼 헷갈리기 쉬운 지점을 모았습니다.
          </p>
          <EligibilityFAQ items={faqItems} />
        </section>

        <div className="mt-16 rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-xl font-bold text-foreground">요건을 확인했다면</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            내 납입액으로 3년 뒤 얼마가 되는지 계산해보고, 상품 조건을 자세히 살펴보세요.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              만기수령액 계산기
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/details"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              상품 조건 총정리
            </Link>
          </div>
        </div>

        <SourceNote className="mt-12" />
      </div>
    </main>
  )
}
