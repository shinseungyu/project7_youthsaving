import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Info, Smartphone, TriangleAlert } from 'lucide-react'
import { SiteDisclaimer, SourceNote } from '@/components/site-disclaimer'
import { AS_OF_LABEL, PRODUCT, SCHEDULE, estimateMaturity } from '@/lib/product'
import { BANK_RATES, BASE_RATE, UPCOMING_BANKS, interestAt } from '@/lib/banks'
import { SITE_TITLE, SITE_URL, breadcrumbLd, faqLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: '청년미래적금 상품 조건 총정리 — 금리 구조·은행별 비교·정부기여금',
  description:
    '청년미래적금 기본금리 연 5%에 은행별 우대금리 2~3%p가 붙는 구조를 뜯어봤습니다. 14개 취급기관 우대 한도 비교, 금리 1%p 차이의 실제 금액, 정부기여금·비과세 계산까지 정리했습니다.',
  alternates: { canonical: '/details' },
  openGraph: {
    title: `청년미래적금 상품 조건 총정리 — 금리 구조·은행별 비교 | ${SITE_TITLE}`,
    description:
      '기본금리 5% + 우대 2~3%p 구조 해부, 14개 취급기관 비교표, 금리 차이가 만기에 만드는 실제 금액까지.',
    url: `${SITE_URL}/details`,
  },
}

const overviewRows: { label: string; value: string; note?: string }[] = [
  { label: '상품명', value: PRODUCT.name },
  { label: '가입 대상', value: `만 ${PRODUCT.ageMin}~${PRODUCT.ageMax}세`, note: `병역 이행 기간만큼 상한 연장(최대 만 ${PRODUCT.ageMaxWithMilitary}세)` },
  { label: '만기', value: PRODUCT.termLabel, note: '중간에 기간을 늘리거나 줄일 수 없습니다' },
  { label: '납입 방식', value: '자유적립식', note: '매달 다른 금액을 넣거나, 넣지 않는 달이 있어도 계좌는 유지됩니다' },
  { label: '월 납입 한도', value: PRODUCT.monthlyMaxLabel, note: '한도이지 의무액이 아닙니다' },
  { label: '기본금리', value: `연 ${BASE_RATE.toFixed(2)}% (3년 고정)`, note: '전 취급기관 동일' },
  { label: '우대금리', value: `기관별 연 ${PRODUCT.bankBonusMin}~${PRODUCT.bankBonusMax}%p`, note: '조건 충족 시에만 적용' },
  { label: '최고금리', value: `연 ${PRODUCT.rateMax.toFixed(1)}%`, note: '3%p 그룹에서 우대 조건을 모두 채웠을 때' },
  { label: '정부기여금', value: '일반형 6% / 우대형 12%', note: '내가 넣은 납입액 대비' },
  { label: '이자 과세', value: '비과세', note: `일반 적금은 이자에서 ${PRODUCT.normalTaxRate}%를 뗍니다` },
  { label: '가입 창구', value: PRODUCT.applyChannel, note: '취급기관 14곳' },
  { label: '신청 주기', value: SCHEDULE.roundLabel },
]

/** 금리 차이가 실제 금액으로 얼마인지. 월 50만원 + 우대형 기여금 6만원을 3년 넣었다고 가정. */
const RATE_ROWS = [5.0, 6.0, 7.0, 8.0].map((rate) => ({
  rate,
  interest: interestAt(PRODUCT.monthlyMax + PRODUCT.matchCapPreferred, rate),
}))

/** 정부기여금이 납입액에 따라 실제로 얼마 붙는지 */
const MATCH_ROWS = [100_000, 200_000, 300_000, 400_000, 500_000].map((m) => ({
  monthly: m,
  general: Math.min(Math.floor(m * PRODUCT.matchGeneral), PRODUCT.matchCapGeneral),
  preferred: Math.min(Math.floor(m * PRODUCT.matchPreferred), PRODUCT.matchCapPreferred),
}))

const faqs = [
  {
    q: '기본금리 5%는 은행마다 다른가요?',
    a: '다르지 않습니다. 기본금리 연 5%는 14개 취급기관 전부 동일하며 3년 고정입니다. 은행마다 갈리는 것은 우대금리 한도로, 농협·신한·우리·하나·기업·국민·우체국은 최대 3%p, 수협·iM·부산·광주·전북·경남·카카오뱅크는 최대 2%p입니다. 따라서 최고금리는 각각 연 8%와 연 7%가 됩니다.',
  },
  {
    q: '최고금리 8% 은행을 고르면 무조건 유리한가요?',
    a: '아닙니다. 8%는 우대 조건을 전부 채웠을 때의 상한이고, 조건을 못 채우면 기본금리 5%만 적용됩니다. 우대 항목은 보통 급여이체, 카드 실적, 자동이체 유지처럼 3년 내내 유지해야 하는 것들이라, 조건을 채우지 못할 것 같으면 한도 2%p짜리 은행에서 조건을 확실히 채우는 편이 실수령액이 큽니다. 금리 1%p 차이는 3년 만기 기준 약 34만원이므로, 조건 달성 가능성을 먼저 따지는 것이 순서입니다.',
  },
  {
    q: '정부기여금도 이자가 붙나요?',
    a: '정부기여금은 납입액과 함께 계좌에 적립되어 만기에 이자와 함께 지급되는 구조입니다. 정부가 발표한 최대 만기 수령액 약 2,255만원도 기여금에 이자가 함께 계산된 값에 가깝습니다. 다만 적립 시점과 산정 방식은 취급기관 약관에 따르므로, 정확한 금액은 가입 기관에서 확인하세요.',
  },
  {
    q: '월 50만원을 꼭 채워야 하나요?',
    a: '아닙니다. 50만원은 상한이고 자유적립식이라 형편에 맞춰 넣으면 됩니다. 다만 정부기여금이 "납입액의 몇 %" 구조라 적게 넣으면 기여금도 그만큼 줄어듭니다. 월 20만원을 넣는 우대형이라면 기여금은 월 2.4만원입니다. 무리해서 50만원을 넣다가 중도 해지하는 것보다, 3년간 유지 가능한 금액을 정하는 편이 낫습니다.',
  },
  {
    q: '비과세는 얼마나 이득인가요?',
    a: `일반 적금은 이자에서 ${PRODUCT.normalTaxRate}%를 이자소득세로 뗍니다. 청년미래적금은 이 세금이 면제됩니다. 월 50만원을 연 7%로 3년 넣어 이자가 약 218만원 나왔다면, 일반 적금이었으면 약 33만원을 세금으로 냈을 돈이 그대로 남는 셈입니다.`,
  },
  {
    q: '중도 해지하면 어떻게 되나요?',
    a: '일반 중도 해지의 경우 우대금리가 적용되지 않고 정부기여금과 비과세 혜택도 받지 못하는 것이 원칙입니다. 다만 혼인·출산·사망·해외이주·천재지변·장기입원·퇴직 등 정해진 특별중도해지 사유에 해당하면 혜택을 유지한 채 해지할 수 있습니다. 청년도약계좌에서 청년미래적금으로 갈아타기 위한 해지도 특별중도해지로 인정됩니다.',
  },
]

function OverviewTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full min-w-[560px] text-left text-sm">
        <caption className="sr-only">청년미래적금 상품 기본 조건</caption>
        <thead>
          <tr className="border-b border-border bg-secondary">
            <th scope="col" className="px-5 py-3.5 font-semibold text-secondary-foreground">항목</th>
            <th scope="col" className="px-5 py-3.5 font-semibold text-secondary-foreground">내용</th>
          </tr>
        </thead>
        <tbody>
          {overviewRows.map((row, i) => (
            <tr key={row.label} className={i < overviewRows.length - 1 ? 'border-b border-border' : ''}>
              <th scope="row" className="whitespace-nowrap px-5 py-3.5 text-left align-top font-medium text-foreground">
                {row.label}
              </th>
              <td className="px-5 py-3.5 align-top text-muted-foreground">
                <span className="font-medium text-foreground">{row.value}</span>
                {row.note && <span className="mt-1 block text-xs leading-relaxed">{row.note}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RateStructure() {
  return (
    <section className="mt-16" aria-labelledby="rate-heading">
      <h2 id="rate-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        금리는 어떻게 만들어지나
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        광고에서 보이는 &ldquo;최대 연 8%&rdquo;는 하나의 숫자가 아니라 두 층이 쌓인 결과입니다. 이
        구조를 이해해야 은행을 제대로 고를 수 있습니다.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">1층 · 모두 같음</p>
          <p className="mt-2 text-3xl font-bold text-primary">연 {BASE_RATE.toFixed(2)}%</p>
          <p className="mt-1 text-sm font-medium text-foreground">기본금리 (3년 고정)</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            14개 취급기관이 전부 동일합니다. 여기서는 은행 간 차이가 발생하지 않으며, 가입 후 3년간
            변하지 않는 고정금리입니다.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">2층 · 여기서 갈림</p>
          <p className="mt-2 text-3xl font-bold text-primary">+ 연 2~3%p</p>
          <p className="mt-1 text-sm font-medium text-foreground">기관별 우대금리 (조건부)</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            급여이체, 카드 실적, 자동이체 유지 같은 조건을 채워야 붙습니다. 못 채우면 0입니다. 은행
            선택이 의미를 갖는 지점은 오직 이 층입니다.
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-3 rounded-xl border border-border bg-muted/40 p-5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">헷갈리기 쉬운 지점.</strong> 흔히 이야기되는 &ldquo;연
          19% 수준의 적금 효과&rdquo;는 통장에 찍히는 금리가 아닙니다. 은행이자에 정부기여금(납입액의
          6~12%)과 비과세 혜택까지 모두 돈으로 환산해, 같은 결과를 내려면 일반 과세 적금이 몇 %여야
          하는지를 역산한 값입니다. 통장에 표시되는 금리는 최대 연 {PRODUCT.rateMax.toFixed(0)}%입니다.
        </p>
      </div>
    </section>
  )
}

function BankTable() {
  return (
    <section className="mt-16" aria-labelledby="bank-heading">
      <h2 id="bank-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        취급기관 14곳 우대금리 한도 비교
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        우대금리 한도를 기준으로 두 그룹으로 나뉩니다. 기본금리는 어디든 같으므로, 아래 표의
        &lsquo;최대&rsquo; 열이 곧 그 기관에서 받을 수 있는 금리의 천장입니다.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">청년미래적금 취급기관별 우대금리 한도 및 최고금리</caption>
          <thead>
            <tr className="border-b border-border bg-secondary text-secondary-foreground">
              <th scope="col" className="px-5 py-3.5 font-semibold">취급기관</th>
              <th scope="col" className="px-5 py-3.5 font-semibold">구분</th>
              <th scope="col" className="px-5 py-3.5 text-right font-semibold">기본</th>
              <th scope="col" className="px-5 py-3.5 text-right font-semibold">우대 한도</th>
              <th scope="col" className="px-5 py-3.5 text-right font-semibold">최대</th>
            </tr>
          </thead>
          <tbody>
            {BANK_RATES.map((bank, i) => (
              <tr
                key={bank.name}
                className={`${i < BANK_RATES.length - 1 ? 'border-b border-border' : ''} ${
                  bank.bonusMax >= 3 ? 'bg-primary/[0.03]' : ''
                }`}
              >
                <th scope="row" className="px-5 py-3.5 text-left align-top font-medium text-foreground">
                  {bank.name}
                  {bank.note && (
                    <span className="mt-1 block max-w-xs text-xs font-normal leading-relaxed text-muted-foreground">
                      {bank.note}
                    </span>
                  )}
                </th>
                <td className="whitespace-nowrap px-5 py-3.5 align-top text-muted-foreground">{bank.type}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-right align-top text-muted-foreground">
                  {BASE_RATE.toFixed(2)}%
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-right align-top text-muted-foreground">
                  +{bank.bonusMax.toFixed(1)}%p
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-right align-top font-bold text-primary">
                  {bank.totalMax.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {UPCOMING_BANKS.map((b) => `${b.name}은 ${b.note}입니다.`).join(' ')} 개별 우대 항목(급여이체
        몇 %p, 카드 몇 회 등)은 기관마다 다르고 회차마다 조정되므로, 가입 직전 해당 기관 앱의 상품
        설명서와 금융위원회 금리 공시를 함께 확인하는 것이 안전합니다.
      </p>

      <Link
        href="/banks"
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
      >
        우대 항목별 판단 기준과 상황별 선택까지 보기
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  )
}

function RateImpact() {
  const principal = PRODUCT.monthlyMax * PRODUCT.termMonths
  const match = PRODUCT.matchCapPreferred * PRODUCT.termMonths

  return (
    <section className="mt-16" aria-labelledby="impact-heading">
      <h2 id="impact-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        금리 1%p 차이는 실제로 얼마인가
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        은행을 고민하는 시간이 아깝지 않으려면, 그 차이가 금액으로 얼마인지 먼저 봐야 합니다. 월 50만원을
        우대형으로 3년간 넣었다고 가정했을 때(월 납입 50만원 + 정부기여금 6만원)의 이자입니다.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[520px] text-left text-sm">
          <caption className="sr-only">적용 금리별 3년 만기 이자 비교</caption>
          <thead>
            <tr className="border-b border-border bg-secondary text-secondary-foreground">
              <th scope="col" className="px-5 py-3.5 font-semibold">적용 금리</th>
              <th scope="col" className="px-5 py-3.5 text-right font-semibold">3년 이자(비과세)</th>
              <th scope="col" className="px-5 py-3.5 text-right font-semibold">연 5% 대비</th>
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
          <strong className="text-foreground">읽는 법.</strong> 5%에서 8%로 3%p를 끌어올려도 3년간
          늘어나는 이자는 약 {(RATE_ROWS[3].interest - RATE_ROWS[0].interest).toLocaleString()}원입니다.
          같은 기간 원금 {(principal / 10000).toLocaleString()}만원과 정부기여금 {(match / 10000).toLocaleString()}만원에
          비하면 작은 몫입니다. 즉 <strong className="text-foreground">은행 고르기보다 3년을 끝까지
          유지하는 것</strong>이 수령액에 훨씬 크게 작용합니다. 우대 조건을 맞추려고 쓰지 않을 카드를
          만들거나 소비를 늘린다면 이득이 상쇄될 수 있습니다.
        </p>
      </div>
    </section>
  )
}

function MatchSection() {
  return (
    <section className="mt-16" aria-labelledby="match-heading">
      <h2 id="match-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        정부기여금: 납입액에 비례해 붙는 돈
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        이 상품의 핵심은 금리가 아니라 정부기여금입니다. 내가 넣은 금액의 6%(일반형) 또는
        12%(우대형)가 매달 더해집니다. 시중 적금에는 없는, 시장 상황과 무관한 확정 몫입니다.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm font-semibold text-foreground">일반형</p>
          <p className="mt-2 text-3xl font-bold text-foreground">6%</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            월 최대 {PRODUCT.matchCapGeneral.toLocaleString()}원. 소득 요건은 충족하지만 우대형 기준에는
            해당하지 않는 경우입니다.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
          <p className="text-sm font-semibold text-primary">우대형</p>
          <p className="mt-2 text-3xl font-bold text-primary">12%</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            월 최대 {PRODUCT.matchCapPreferred.toLocaleString()}원. 총급여{' '}
            {(PRODUCT.preferredSalaryMax / 10000).toLocaleString()}만원 이하 재직 청년은 소득 요건만으로
            해당됩니다.
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">월 납입액별 정부기여금 및 3년 누적액</caption>
          <thead>
            <tr className="border-b border-border bg-secondary text-secondary-foreground">
              <th scope="col" className="px-5 py-3.5 font-semibold">월 납입액</th>
              <th scope="col" className="px-5 py-3.5 text-right font-semibold">일반형 월</th>
              <th scope="col" className="px-5 py-3.5 text-right font-semibold">일반형 3년</th>
              <th scope="col" className="px-5 py-3.5 text-right font-semibold">우대형 월</th>
              <th scope="col" className="px-5 py-3.5 text-right font-semibold">우대형 3년</th>
            </tr>
          </thead>
          <tbody>
            {MATCH_ROWS.map((row, i) => (
              <tr key={row.monthly} className={i < MATCH_ROWS.length - 1 ? 'border-b border-border' : ''}>
                <th scope="row" className="px-5 py-3.5 text-left font-medium text-foreground">
                  {row.monthly.toLocaleString()}원
                </th>
                <td className="px-5 py-3.5 text-right text-muted-foreground">{row.general.toLocaleString()}원</td>
                <td className="px-5 py-3.5 text-right font-medium text-foreground">
                  {(row.general * PRODUCT.termMonths).toLocaleString()}원
                </td>
                <td className="px-5 py-3.5 text-right text-muted-foreground">{row.preferred.toLocaleString()}원</td>
                <td className="px-5 py-3.5 text-right font-bold text-primary">
                  {(row.preferred * PRODUCT.termMonths).toLocaleString()}원
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        표에서 보이듯 우대형으로 월 50만원을 3년간 넣으면 정부기여금만{' '}
        {(PRODUCT.matchCapPreferred * PRODUCT.termMonths).toLocaleString()}원입니다. 앞선 금리 표에서 3%p를
        더 받아 얻는 금액보다 훨씬 큽니다. 그래서{' '}
        <Link href="/eligibility" className="text-primary underline underline-offset-2">
          우대형에 해당하는지 확인하는 일
        </Link>
        이 은행 고르기보다 먼저입니다.
      </p>
    </section>
  )
}

function TaxSection() {
  const sample = estimateMaturity(PRODUCT.monthlyMax, 'preferred', 7.0)

  return (
    <section className="mt-16" aria-labelledby="tax-heading">
      <h2 id="tax-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        비과세: 눈에 잘 안 띄는 세 번째 혜택
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        일반 적금은 만기에 이자를 줄 때 {PRODUCT.normalTaxRate}%를 이자소득세로 원천징수합니다.
        청년미래적금은 이 세금이 붙지 않습니다. 금리표에는 드러나지 않지만 실수령액에서는 분명히
        차이가 납니다.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <p className="text-sm font-semibold text-foreground">
          예시 · 우대형, 월 {PRODUCT.monthlyMax.toLocaleString()}원, 연 7.0% 적용
        </p>
        <dl className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">3년 이자</dt>
            <dd className="font-semibold text-foreground">{sample.totalInterest.toLocaleString()}원</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">일반 적금이었다면 냈을 세금 ({PRODUCT.normalTaxRate}%)</dt>
            <dd className="font-semibold text-muted-foreground line-through">{sample.taxSaved.toLocaleString()}원</dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
            <dt className="font-semibold text-foreground">비과세로 지켜지는 금액</dt>
            <dd className="text-lg font-bold text-primary">{sample.taxSaved.toLocaleString()}원</dd>
          </div>
        </dl>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        비과세는 만기까지 유지하고 자격 요건을 계속 충족했을 때 적용됩니다. 일반 중도 해지 시에는
        혜택이 사라집니다.
      </p>
    </section>
  )
}

function ApplySection() {
  const steps = [
    {
      title: '자격 조회 신청',
      body: '취급기관 앱에서 신청하면 소득·가구 요건 심사가 진행됩니다. 이 단계에서 일반형인지 우대형인지 자동으로 분류됩니다. 지원자가 직접 유형을 고르는 것이 아닙니다.',
    },
    {
      title: '심사 결과 통보',
      body: '국세청·건강보험 자료를 바탕으로 심사가 이뤄지며, 결과는 앱 또는 알림으로 안내됩니다. 서류를 따로 준비해 제출하는 절차는 원칙적으로 없습니다.',
    },
    {
      title: '계좌 개설',
      body: '가입 가능 통보를 받은 뒤 정해진 기간 안에 계좌를 개설합니다. 이때 어느 기관에서 열지가 곧 우대금리 한도를 정합니다.',
    },
    {
      title: '자동이체 설정',
      body: '3년을 유지해야 하는 상품이라 급여일 직후로 자동이체를 걸어두는 편이 안전합니다. 자동이체 유지 자체가 우대 조건인 기관도 있습니다.',
    },
  ]

  return (
    <section className="mt-16" aria-labelledby="apply-heading">
      <h2 id="apply-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        신청 일정과 절차
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
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

      <ol className="mt-8 flex flex-col gap-4">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-foreground">{step.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex gap-3 rounded-xl border border-border bg-muted/40 p-5">
        <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          신청은 <strong className="text-foreground">취급기관 앱에서 직접</strong> 진행합니다. 본 사이트를
          포함해 어떤 정보 사이트도 가입을 접수하거나 대행하지 않습니다. 가입을 대신 해주겠다며 개인정보나
          수수료를 요구하는 곳이 있다면 응하지 마세요.
        </p>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="mt-16" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        상품 조건에 대해 자주 묻는 질문
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
  )
}

export default function DetailsPage() {
  const schemas = [
    breadcrumbLd([{ name: '상품 조건 총정리', path: '/details' }]),
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
          <span className="text-foreground">상품 조건 총정리</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
          청년미래적금 상품 조건 총정리
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          기본금리 연 5%에 은행별 우대금리 2~3%p가 붙는 구조, 취급기관 14곳 비교, 정부기여금과 비과세가
          실제 금액으로 얼마인지까지 한 번에 정리했습니다.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">기준일 {AS_OF_LABEL}</p>

        <SiteDisclaimer className="mt-8" />

        <section className="mt-12" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="mb-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            한눈에 보기
          </h2>
          <OverviewTable />
        </section>

        <RateStructure />
        <BankTable />
        <RateImpact />
        <MatchSection />
        <TaxSection />
        <ApplySection />
        <FaqSection />

        <div className="mt-16 rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-xl font-bold text-foreground">내 조건으로 계산해보기</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            위 조건을 내 납입액에 대입하면 3년 뒤 얼마가 되는지, 우대형에 해당하는지 확인해보세요.
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
              href="/eligibility"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              가입 자격 확인
            </Link>
          </div>
        </div>

        <SourceNote className="mt-12" />
      </div>
    </main>
  )
}
