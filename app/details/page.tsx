import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  FileText,
  CreditCard,
  CheckCircle2,
  Smartphone,
} from "lucide-react"

export const metadata: Metadata = {
  title: "상품 상세",
  description:
    "청년 미래적금의 가입 기간, 금리, 납입 한도 등 상세 조건과 가입 절차를 확인하세요.",
  openGraph: {
    title: "청년 미래적금 상품 상세",
    description:
      "가입 기간, 금리 안내, 납입 한도 등 청년 미래적금의 모든 상세 조건을 확인하세요.",
  },
}

const productConditions = [
  { label: "상품명", value: "청년 미래적금" },
  { label: "가입 대상", value: "만 19세 ~ 34세 청년" },
  { label: "가입 기간", value: "3년 / 5년 선택" },
  { label: "기본 금리", value: "연 3.5% (3년) / 연 4.5% (5년)" },
  { label: "우대 금리", value: "최대 연 1.5% 추가 (조건 충족 시)" },
  { label: "최고 금리", value: "연 6.0%" },
  { label: "월 납입 한도", value: "최소 1,000원 ~ 최대 70만원" },
  { label: "정부 매칭", value: "소득 구간별 최대 6% 매칭 지원" },
  { label: "이자 과세", value: "비과세 (조건 충족 시)" },
  { label: "중도해지", value: "중도해지 시 우대금리 미적용" },
]

const interestRates = [
  {
    period: "3년",
    base: "3.5%",
    bonus: "최대 1.5%",
    total: "최대 5.0%",
  },
  {
    period: "5년",
    base: "4.5%",
    bonus: "최대 1.5%",
    total: "최대 6.0%",
  },
]

const bonusConditions = [
  "급여이체 실적 보유: +0.5%",
  "카드 결제 실적 30만원 이상: +0.3%",
  "자동이체 설정 및 유지: +0.2%",
  "비대면 가입: +0.3%",
  "청년 정책 참여 이력: +0.2%",
]

const steps = [
  {
    step: 1,
    icon: Smartphone,
    title: "자격 확인",
    description: "온라인으로 간편하게 나이, 소득 기준 등 가입 자격을 확인합니다.",
  },
  {
    step: 2,
    icon: FileText,
    title: "서류 준비",
    description:
      "신분증, 소득확인증명서 등 필요 서류를 준비합니다. 비대면 가입 시 모바일 촬영으로 제출 가능합니다.",
  },
  {
    step: 3,
    icon: CreditCard,
    title: "계좌 개설",
    description:
      "모바일 앱 또는 영업점 방문을 통해 적금 계좌를 개설하고 자동이체를 설정합니다.",
  },
  {
    step: 4,
    icon: CheckCircle2,
    title: "가입 완료",
    description:
      "가입이 완료되면 매월 납입이 시작됩니다. 앱을 통해 잔액과 이자를 실시간으로 확인할 수 있습니다.",
  },
]

function ProductConditionsTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <table className="w-full text-left">
        <caption className="sr-only">청년 미래적금 상품 상세 조건</caption>
        <thead>
          <tr className="border-b border-border bg-secondary">
            <th
              scope="col"
              className="px-6 py-4 text-sm font-semibold text-secondary-foreground"
            >
              항목
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-sm font-semibold text-secondary-foreground"
            >
              내용
            </th>
          </tr>
        </thead>
        <tbody>
          {productConditions.map((item, index) => (
            <tr
              key={item.label}
              className={
                index < productConditions.length - 1
                  ? "border-b border-border"
                  : ""
              }
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">
                {item.label}
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function InterestRateSection() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        금리 안내
      </h2>
      <p className="mt-2 text-base text-muted-foreground">
        가입 기간에 따른 기본금리와 우대금리를 확인하세요.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {interestRates.map((rate) => (
          <article
            key={rate.period}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {rate.period} 가입
            </p>
            <p className="mt-2 text-3xl font-bold text-primary">{rate.total}</p>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">기본 금리</span>
                <span className="font-medium text-foreground">{rate.base}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">우대 금리</span>
                <span className="font-medium text-foreground">
                  {rate.bonus}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-secondary/50 p-6">
        <h3 className="text-base font-semibold text-foreground">
          우대금리 조건
        </h3>
        <ul className="mt-4 flex flex-col gap-2">
          {bonusConditions.map((condition) => (
            <li key={condition} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="text-muted-foreground">{condition}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function StepsSection() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        가입 절차
      </h2>
      <p className="mt-2 text-base text-muted-foreground">
        4단계로 간편하게 청년 미래적금에 가입하세요.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <article
            key={step.step}
            className="relative rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {step.step}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <step.icon className="h-5 w-5 text-primary" />
              <h3 className="text-base font-semibold text-foreground">
                {step.title}
              </h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default function DetailsPage() {
  return (
    <main className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
            상품 상세 안내
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            청년 미래적금의 가입 조건, 금리, 납입 한도 등 상세 정보를 한눈에
            확인하세요.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="sr-only">상품 기본 조건</h2>
          <ProductConditionsTable />
        </div>

        <div className="mx-auto max-w-3xl">
          <InterestRateSection />
        </div>

        <div className="mx-auto max-w-6xl">
          <StepsSection />
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <Link
            href="/eligibility"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            가입 자격 확인하기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
