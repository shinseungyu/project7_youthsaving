import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, ArrowLeftRight } from "lucide-react"

export const metadata: Metadata = {
  title: "청년도약계좌 → 청년미래적금 전환 가능할까?",
  description:
    "청년도약계좌를 해지하고 청년미래적금으로 전환할 수 있는지 알아보세요. 동시 가입 여부, 중도해지 손해, 전환 시 유의사항을 정리했습니다.",
  openGraph: {
    title: "청년도약계좌 → 청년미래적금 전환 가능할까?",
    description:
      "청년도약계좌에서 청년미래적금으로 전환 가능 여부와 주의사항을 확인하세요.",
  },
}

const comparisonItems = [
  { label: "만기", dooyak: "5년", mirae: "3년" },
  { label: "월 납입한도", dooyak: "최대 70만원", mirae: "최대 70만원" },
  { label: "정부기여금", dooyak: "최대 6%", mirae: "최대 12% (우대형)" },
  { label: "비과세 혜택", dooyak: "O", mirae: "O" },
  { label: "중복 가입", dooyak: "—", mirae: "불가 (택1)" },
]

const faqs = [
  {
    q: "청년도약계좌와 청년미래적금 동시 가입이 되나요?",
    a: "안됩니다. 두 상품은 중복 가입이 불가능합니다. 청년도약계좌에 가입된 상태에서는 청년미래적금에 신규 가입할 수 없으며, 반대의 경우도 마찬가지입니다.",
    type: "bad",
  },
  {
    q: "청년도약계좌를 중도해지하면 정부기여금을 받을 수 있나요?",
    a: "원칙적으로 중도해지 시 정부기여금은 지급되지 않습니다. 다만 혼인·출산·사망·해외이주·천재지변·실직·장기입원 등 특별 사유에 해당하는 경우 일부 기여금을 수령할 수 있습니다.",
    type: "bad",
  },
  {
    q: "청년도약계좌 만기 후 청년미래적금에 가입할 수 있나요?",
    a: "가능합니다. 청년도약계좌를 만기까지 유지하고 수령한 뒤, 청년미래적금 가입 자격(나이·소득 기준)을 충족한다면 신규 가입이 가능합니다. 단, 청년미래적금 가입 가능 기간을 놓치지 않도록 미리 확인하세요.",
    type: "good",
  },
  {
    q: "전환이 유리한 경우는 언제인가요?",
    a: "청년도약계좌 가입 기간이 짧고 정부기여금 손실이 적은 초기라면, 더 높은 정부기여금(우대형 12%)을 제공하는 청년미래적금으로 전환하는 것이 유리할 수 있습니다. 반면 청년도약계좌를 3년 이상 유지했다면 만기까지 채우는 게 유리한 경우가 많습니다.",
    type: "info",
  },
  {
    q: "전환 시 어떤 절차를 밟아야 하나요?",
    a: "① 청년도약계좌 가입 은행에 중도해지 의사 전달 → ② 해지 후 원금 수령 → ③ 청년미래적금 가입 가능 은행에서 신규 가입 신청. 중도해지 전 반드시 손실 금액(정부기여금, 우대금리 소멸)을 계산해보세요.",
    type: "info",
  },
]

export default function SwitchPage() {
  return (
    <main className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        <div>

          {/* 헤더 */}
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground mb-6">
            <ArrowLeftRight className="h-4 w-4" />
            전환 가이드
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
            청년도약계좌 →<br />
            <span className="text-primary">청년미래적금 전환</span> 가능할까?
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            두 상품의 핵심 차이와 전환 시 반드시 알아야 할 주의사항을 정리했습니다.
          </p>

          {/* 결론 요약 박스 */}
          <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-amber-800">핵심 요약</p>
                <p className="mt-1 text-sm text-amber-700 leading-relaxed">
                  청년도약계좌와 청년미래적금은 <strong>동시 가입 불가</strong>입니다.
                  전환하려면 청년도약계좌를 <strong>중도해지</strong>해야 하며, 이 경우
                  <strong> 정부기여금 손실</strong>이 발생합니다. 만기 후 신규 가입은 가능합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 상품 비교표 */}
          {/* 비교표 + FAQ 2컬럼 */}
          <div className="mt-14 lg:grid lg:grid-cols-2 lg:gap-12">
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">상품 핵심 비교</h2>
              <p className="mt-2 text-sm text-muted-foreground">전환 전 두 상품을 비교해보세요.</p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-5 py-3 text-left font-semibold text-foreground">구분</th>
                      <th className="px-5 py-3 text-center font-semibold text-foreground">청년도약계좌</th>
                      <th className="px-5 py-3 text-center font-semibold text-primary">청년미래적금</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonItems.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                        <td className="px-5 py-3.5 font-medium text-foreground">{row.label}</td>
                        <td className="px-5 py-3.5 text-center text-muted-foreground">{row.dooyak}</td>
                        <td className="px-5 py-3.5 text-center font-semibold text-primary">{row.mirae}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 체크리스트 */}
              <h2 className="mt-10 text-2xl font-bold tracking-tight text-foreground">중도 전환 시 체크리스트</h2>
              <div className="mt-6 flex flex-col gap-3">
                {[
                  "청년도약계좌 가입 기간이 짧을수록 손실이 적다",
                  "중도해지 전 정부기여금 손실 금액을 반드시 계산해본다",
                  "특별 해지 사유(혼인·출산 등)에 해당하는지 먼저 확인한다",
                  "청년미래적금 가입 가능 연령(만 34세 이하) 기준을 충족하는지 확인한다",
                  "청년미래적금 납입 계획(월 납입액, 우대형/일반형)을 미리 시뮬레이션해본다",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <p className="text-sm text-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-foreground mt-14 lg:mt-0">자주 묻는 질문</h2>
              <div className="mt-6 flex flex-col gap-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex gap-3">
                      {faq.type === "good" && <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />}
                      {faq.type === "bad" && <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />}
                      {faq.type === "info" && <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />}
                      <div>
                        <p className="font-semibold text-foreground">{faq.q}</p>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="text-xl font-bold text-foreground">
              청년미래적금으로 바꾸면 얼마나 받을까?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              만기수령액 계산기로 직접 확인해보세요.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                만기수령액 계산하기
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

        </div>
      </div>
    </main>
  )
}
