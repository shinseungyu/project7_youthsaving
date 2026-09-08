import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Info, TriangleAlert, X } from 'lucide-react'
import { SiteDisclaimer, SourceNote } from '@/components/site-disclaimer'
import { AS_OF_LABEL, PRODUCT } from '@/lib/product'
import { BANK_RATES, BASE_RATE, UPCOMING_BANKS, interestAt } from '@/lib/banks'
import { SITE_TITLE, SITE_URL, breadcrumbLd, faqLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: '청년미래적금 은행 비교 — 취급기관 14곳 우대금리 한도와 고르는 순서',
  description:
    '기본금리 연 5%는 14개 취급기관이 모두 같습니다. 갈리는 것은 우대금리 한도(2~3%p)뿐입니다. 그룹별 비교표, 금리 차이의 실제 금액, 상황별로 어디를 골라야 하는지 정리했습니다.',
  alternates: { canonical: '/banks' },
  openGraph: {
    title: `청년미래적금 은행 비교 — 취급기관 14곳 | ${SITE_TITLE}`,
    description:
      '최고금리 8% 은행이 항상 정답은 아닙니다. 우대 조건 달성 가능성까지 넣어 비교하는 법.',
    url: `${SITE_URL}/banks`,
  },
}

const TIER3 = BANK_RATES.filter((b) => b.bonusMax >= 3)
const TIER2 = BANK_RATES.filter((b) => b.bonusMax < 3)

/** 우대형 월 50만원(납입 50 + 기여금 6) 기준, 금리별 3년 이자 */
const RATE_ROWS = [5.0, 6.0, 7.0, 8.0].map((rate) => ({
  rate,
  interest: interestAt(PRODUCT.monthlyMax + PRODUCT.matchCapPreferred, rate),
}))

const spread = RATE_ROWS[3].interest - RATE_ROWS[0].interest

/** 우대 항목 유형별 성격. 기관마다 배점은 다르지만 항목 종류는 대체로 겹친다. */
const CONDITION_TYPES = [
  {
    name: '급여이체',
    weight: '배점이 큰 편',
    cost: '급여 계좌를 옮겨야 하면 회사 절차 필요',
    verdict: 'good',
    note: '이미 그 은행으로 급여를 받고 있다면 비용 없이 얻는 금리입니다. 반대로 이직하면 끊기므로, 이직 가능성이 있다면 이 항목 배점이 큰 곳은 위험합니다.',
  },
  {
    name: '카드 결제 실적',
    weight: '중간',
    cost: '실적을 만들려고 소비를 늘리면 손해',
    verdict: 'caution',
    note: '이미 그 카드로 기준 금액을 쓰고 있다면 그냥 받는 금리입니다. 일부 기관은 결제 금액이 아니라 결제 횟수를 보므로, 소액 결제가 잦다면 그쪽이 채우기 쉽습니다.',
  },
  {
    name: '자동이체 등록·유지',
    weight: '작음',
    cost: '거의 없음 (이체처만 옮기면 됨)',
    verdict: 'good',
    note: '공과금·통신비 자동이체를 옮기는 것만으로 충족됩니다. 비용 대비 효율이 가장 좋은 항목입니다. 옮기는 과정에서 연체가 나지 않도록 이체일과 잔액만 확인하세요.',
  },
  {
    name: '마케팅 수신 동의',
    weight: '작음',
    cost: '광고 알림이 늘어남',
    verdict: 'good',
    note: '금전적 비용은 없습니다. 알림이 부담스럽지 않다면 챙기는 편이 낫습니다.',
  },
  {
    name: '첫 거래·신규 고객',
    weight: '기관마다 다름',
    cost: '이미 계좌가 있으면 해당 없음',
    verdict: 'caution',
    note: '해당되면 받고 아니면 못 받는 항목이라 조정할 여지가 없습니다. 다만 이 항목이 큰 기관은 기존 고객에게 불리하다는 뜻이므로 비교에 반영하세요.',
  },
]

const faqs = [
  {
    q: '기본금리가 은행마다 다른가요?',
    a: `다르지 않습니다. 기본금리 연 ${BASE_RATE.toFixed(2)}%는 14개 취급기관이 전부 동일하며 3년 고정입니다. 은행 비교가 의미를 갖는 지점은 우대금리 한도뿐입니다.`,
  },
  {
    q: '최고금리 8% 은행을 고르면 무조건 유리한가요?',
    a: `아닙니다. 8%는 우대 조건을 전부 채웠을 때의 상한이고, 못 채우면 기본금리 5%만 적용됩니다. 한도 3%p 은행에서 조건을 절반만 채우는 것보다 한도 2%p 은행에서 다 채우는 편이 나을 수 있습니다. 표시된 최고금리가 아니라 내가 실제로 도달할 금리로 비교해야 합니다.`,
  },
  {
    q: '금리 1%p 차이가 금액으로 얼마인가요?',
    a: `우대형으로 월 ${(PRODUCT.monthlyMax / 10000).toLocaleString()}만원을 3년간 넣는 기준으로 약 ${Math.round(spread / 3 / 10000).toLocaleString()}만원입니다. 5%에서 8%까지 3%p를 다 끌어올려도 3년간 늘어나는 이자는 약 ${Math.round(spread / 10000).toLocaleString()}만원입니다.`,
  },
  {
    q: '우대 조건을 채우려고 카드를 새로 만들 만한가요?',
    a: `계산해보면 대개 맞지 않습니다. 0.3%p는 3년에 약 9만원인데, 실적을 채우려고 매달 10만원씩 더 쓰면 3년에 360만원을 더 쓰게 됩니다. 우대 조건은 어차피 하고 있던 일과 겹칠 때만 이득입니다.`,
  },
  {
    q: '중간에 다른 은행으로 옮길 수 있나요?',
    a: '계좌를 다른 기관으로 이전하는 절차는 일반적이지 않습니다. 해지 후 재가입은 회차 일정과 자격 심사를 다시 거쳐야 하고 그 사이 혜택이 끊깁니다. 처음 고를 때 신중해야 하는 이유입니다.',
  },
  {
    q: '지방은행이라 영업점이 멀어도 괜찮을까요?',
    a: '신청과 관리가 모두 앱 기반 비대면으로 이뤄지므로 영업점 접근성은 큰 변수가 아닙니다. 다만 3년간 쓸 앱이므로 사용성이 본인에게 맞는지는 확인해보는 편이 좋습니다.',
  },
]

function BankGroupTable({
  title,
  subtitle,
  banks,
  highlight,
}: {
  title: string
  subtitle: string
  banks: typeof BANK_RATES
  highlight: boolean
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border ${
        highlight ? 'border-primary/30 bg-primary/[0.03]' : 'border-border bg-card'
      }`}
    >
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <ul className="divide-y divide-border" role="list">
        {banks.map((bank) => (
          <li key={bank.name} className="px-6 py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-semibold text-foreground">{bank.name}</span>
              <span className="text-sm text-muted-foreground">
                {BASE_RATE.toFixed(2)}% + {bank.bonusMax.toFixed(1)}%p ={' '}
                <strong className="text-primary">최대 {bank.totalMax.toFixed(1)}%</strong>
              </span>
            </div>
            {bank.note && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{bank.note}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function BanksPage() {
  const schemas = [
    breadcrumbLd([{ name: '취급기관 비교', path: '/banks' }]),
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
          <span className="text-foreground">취급기관 비교</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
          청년미래적금 은행 비교
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          어디서 가입할지 고민된다면 먼저 알아둘 것이 있습니다.{' '}
          <strong className="text-foreground">기본금리는 어느 기관을 가도 똑같습니다.</strong> 비교가
          의미를 갖는 지점은 우대금리 한도 하나뿐입니다.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">기준일 {AS_OF_LABEL}</p>

        <SiteDisclaimer className="mt-8" />

        {/* 금리 구조 */}
        <section className="mt-12" aria-labelledby="structure-heading">
          <h2 id="structure-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            은행마다 갈리는 건 두 번째 층뿐
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                1층 · 14곳 모두 같음
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">연 {BASE_RATE.toFixed(2)}%</p>
              <p className="mt-1 text-sm font-medium text-foreground">기본금리 (3년 고정)</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                가입 후 3년간 변하지 않습니다. 여기서는 은행 간 차이가 아예 없습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">2층 · 여기서 갈림</p>
              <p className="mt-2 text-3xl font-bold text-primary">
                + {PRODUCT.bankBonusMin}~{PRODUCT.bankBonusMax}%p
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">기관별 우대금리 (조건부)</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                급여이체·카드 실적·자동이체 같은 조건을 채워야 붙습니다. 못 채우면 0입니다.
              </p>
            </div>
          </div>
        </section>

        {/* 그룹별 목록 */}
        <section className="mt-16" aria-labelledby="group-heading">
          <h2 id="group-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            취급기관 14곳, 두 그룹으로 나뉩니다
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            우대금리 한도가 3%p인 곳과 2%p인 곳입니다. 기본금리가 같으므로 아래 &lsquo;최대&rsquo;가 곧
            그 기관에서 받을 수 있는 금리의 천장입니다.
          </p>

          <div className="mt-8 flex flex-col gap-6">
            <BankGroupTable
              title={`우대 한도 ${PRODUCT.bankBonusMax}%p · 최고 연 8%`}
              subtitle={`${TIER3.length}곳 — 시중은행 중심`}
              banks={TIER3}
              highlight
            />
            <BankGroupTable
              title={`우대 한도 ${PRODUCT.bankBonusMin}%p · 최고 연 7%`}
              subtitle={`${TIER2.length}곳 — 지방은행·인터넷은행 중심`}
              banks={TIER2}
              highlight={false}
            />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {UPCOMING_BANKS.map((b) => `${b.name}은 ${b.note}입니다.`).join(' ')} 개별 우대 항목의 배점은
            기관마다 다르고 회차마다 조정되므로, 가입 직전 해당 기관 앱의 상품설명서와 금융위원회 금리
            공시를 함께 확인하는 것이 안전합니다.
          </p>
        </section>

        {/* 금액 환산 */}
        <section className="mt-16" aria-labelledby="impact-heading">
          <h2 id="impact-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            그 차이는 금액으로 얼마인가
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            은행을 고민하는 시간이 아깝지 않으려면 차이를 금액으로 봐야 합니다. 우대형으로 월{' '}
            {(PRODUCT.monthlyMax / 10000).toLocaleString()}만원을 3년간 넣는 경우(납입{' '}
            {(PRODUCT.monthlyMax / 10000).toLocaleString()}만원 + 정부기여금{' '}
            {(PRODUCT.matchCapPreferred / 10000).toLocaleString()}만원)입니다.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[480px] text-left text-sm">
              <caption className="sr-only">적용 금리별 3년 이자 비교</caption>
              <thead>
                <tr className="border-b border-border bg-secondary text-secondary-foreground">
                  <th scope="col" className="px-5 py-3.5 font-semibold">적용 금리</th>
                  <th scope="col" className="px-5 py-3.5 text-right font-semibold">3년 이자(비과세)</th>
                  <th scope="col" className="px-5 py-3.5 text-right font-semibold">기본금리 대비</th>
                </tr>
              </thead>
              <tbody>
                {RATE_ROWS.map((row, i) => (
                  <tr key={row.rate} className={i < RATE_ROWS.length - 1 ? 'border-b border-border' : ''}>
                    <th scope="row" className="px-5 py-3.5 text-left font-medium text-foreground">
                      연 {row.rate.toFixed(1)}%
                      {row.rate === BASE_RATE && (
                        <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                          기본
                        </span>
                      )}
                    </th>
                    <td className="px-5 py-3.5 text-right font-semibold text-foreground">
                      {row.interest.toLocaleString()}원
                    </td>
                    <td className="px-5 py-3.5 text-right text-muted-foreground">
                      {row.rate === BASE_RATE ? '—' : `+${(row.interest - RATE_ROWS[0].interest).toLocaleString()}원`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex gap-3 rounded-xl border border-border bg-muted/40 p-5">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">읽는 법.</strong> 5%에서 8%까지 3%p를 다 끌어올려도
              3년간 늘어나는 이자는 약 {spread.toLocaleString()}원입니다. 같은 기간 원금{' '}
              {((PRODUCT.monthlyMax * PRODUCT.termMonths) / 10000).toLocaleString()}만원과 정부기여금{' '}
              {((PRODUCT.matchCapPreferred * PRODUCT.termMonths) / 10000).toLocaleString()}만원에 비하면
              작은 몫입니다. 은행 고르기보다{' '}
              <Link href="/eligibility" className="text-primary underline underline-offset-2">
                우대형 해당 여부
              </Link>
              와 3년 완주가 수령액에 훨씬 크게 작용합니다.
            </p>
          </div>
        </section>

        {/* 우대 항목 유형 */}
        <section className="mt-16" aria-labelledby="condition-heading">
          <h2 id="condition-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            우대 항목은 어떤 것들인가
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            배점은 기관마다 다르지만 항목 종류는 대체로 겹칩니다. 각 항목을 채우는 데 드는 비용이 얻는
            금리보다 작은지가 판단 기준입니다.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {CONDITION_TYPES.map((c) => (
              <article key={c.name} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center gap-3">
                  {c.verdict === 'good' ? (
                    <Check className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                  ) : (
                    <Info className="h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
                  )}
                  <h3 className="text-base font-semibold text-foreground">{c.name}</h3>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    {c.weight}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.note}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">드는 비용:</span> {c.cost}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-6">
            <h3 className="text-sm font-bold text-foreground">판단 공식</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              간단합니다. 조건을 채우는 데 드는 추가 비용이 얻는 금리보다 작으면 하고, 크면 하지
              않습니다.
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>이미 하고 있던 일 → 무조건 챙깁니다</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>옮기기만 하면 되는 일(자동이체 이전 등) → 대체로 이득입니다</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
                <span>새로 돈을 쓰게 만드는 일 → 대부분 손해입니다</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 상황별 */}
        <section className="mt-16" aria-labelledby="case-heading">
          <h2 id="case-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            상황별로 어디를 고를까
          </h2>
          <div className="mt-8 flex flex-col gap-4">
            {[
              {
                who: '급여통장이 3%p 그룹에 있는 경우',
                what: '그 은행을 그대로 쓰는 것이 대체로 정답입니다. 배점이 큰 급여이체 항목을 비용 없이 충족한 상태에서 시작하기 때문입니다. 여기에 자동이체 두어 개만 옮기면 상당 부분이 채워집니다.',
              },
              {
                who: '카드를 거의 안 쓰는 경우',
                what: '카드 실적 배점이 큰 기관은 피하는 편이 낫습니다. 상한이 8%여도 실제 도달 금리는 5%대에 머물 수 있습니다. 조건 구조가 단순한 2%p 그룹에서 확실히 채우는 쪽이 결과가 나을 수 있습니다.',
              },
              {
                who: '이직 가능성이 있는 경우',
                what: '급여이체 배점이 큰 곳은 위험합니다. 3년 안에 회사를 옮기면 그 항목이 끊깁니다. 자동이체·마케팅 동의처럼 이직과 무관한 항목 비중이 큰 곳이 안전합니다.',
              },
              {
                who: '청년도약계좌를 이미 갖고 있는 경우',
                what: '기존 은행의 조건을 먼저 확인하세요. 자사 도약계좌에서 갈아타는 경우 우대 폭을 더 주는 기관이 있습니다. 다만 갈아타기는 순서를 지켜야 하므로 절차를 먼저 확인해야 합니다.',
                link: { href: '/switch-from-dooyak', label: '갈아타기 순서 보기' },
              },
              {
                who: '실적 관리를 번거로워하는 경우',
                what: '조건이 단순한 기관이 낫습니다. 우대 한도가 1%p 낮아도 3년에 약 31만원 차이인데, 조건을 맞추느라 소비가 늘면 그 이상을 잃습니다.',
              },
            ].map((c) => (
              <article key={c.who} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold text-foreground">{c.who}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.what}</p>
                {c.link && (
                  <Link
                    href={c.link.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    {c.link.label}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* 체크리스트 */}
        <section className="mt-16" aria-labelledby="check-heading">
          <h2 id="check-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            고르기 전 체크리스트
          </h2>
          <ul className="mt-8 flex flex-col gap-3" role="list">
            {[
              '급여통장 은행이 취급기관 14곳에 들어 있는가',
              '그 은행의 우대 항목 중 지금 상태로 충족되는 것이 몇 개인가',
              '새로 만들어야 하는 조건이 있다면 드는 비용은 얼마인가',
              '그 조건을 3년 내내 유지할 수 있는가 (이직·소비 습관 변화 포함)',
              '조건을 절반만 채운다고 가정하면 어느 기관이 유리한가',
              '3년간 쓸 앱의 사용성이 본인에게 맞는가',
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
        </section>

        {/* FAQ */}
        <section className="mt-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            은행 선택 자주 묻는 질문
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
          <h2 className="text-xl font-bold text-foreground">은행을 정했다면</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            적용 금리를 넣어 3년 뒤 수령액을 확인하고, 우대형 해당 여부를 함께 점검해보세요.
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
