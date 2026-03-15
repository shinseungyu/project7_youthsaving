import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { EligibilityChecklist } from "@/components/eligibility-checklist"
import { EligibilityFAQ } from "@/components/eligibility-faq"

export const metadata: Metadata = {
  title: "자격 확인",
  description:
    "청년 미래적금 가입 자격을 확인하세요. 나이, 소득 기준, 필요 서류 등 가입 조건을 간편하게 체크할 수 있습니다.",
  openGraph: {
    title: "청년 미래적금 자격 확인",
    description:
      "나이, 소득 기준, 필요 서류 등 가입 조건을 간편하게 체크해보세요.",
  },
}

const eligibilityCriteria = [
  {
    id: "age",
    label: "만 19세 이상 ~ 만 34세 이하",
    description: "가입일 기준 만 나이로 판단합니다.",
  },
  {
    id: "income",
    label: "개인소득 연 7,500만원 이하",
    description: "근로소득, 사업소득, 기타소득을 합산한 총급여 기준입니다.",
  },
  {
    id: "household",
    label: "가구소득 중위 180% 이하",
    description: "건강보험료 납부액을 기준으로 판단합니다.",
  },
  {
    id: "account",
    label: "본인 명의 계좌 개설 가능",
    description: "타인 명의로는 가입이 불가합니다.",
  },
  {
    id: "military",
    label: "병역 이행 시 최대 6년 연장 가능",
    description: "병역의무 이행기간만큼 가입 연령이 연장됩니다.",
  },
]

const faqItems = [
  {
    question: "청년 미래적금은 누가 가입할 수 있나요?",
    answer:
      "가입일 기준 만 19세 이상 ~ 만 34세 이하인 청년이 가입할 수 있습니다. 개인소득이 연 7,500만원 이하이고, 가구소득이 중위 180% 이하인 분이 대상입니다. 병역 이행자는 이행 기간만큼 나이 기준이 연장됩니다.",
  },
  {
    question: "기존에 청년 희망 적금에 가입했어도 가입할 수 있나요?",
    answer:
      "네, 기존 청년 희망 적금, 청년 내일저축 등 다른 청년 정책금융 상품에 가입 이력이 있더라도 청년 미래적금에 신규 가입이 가능합니다. 단, 동시 가입은 불가할 수 있으니 해당 은행에 확인해 주세요.",
  },
  {
    question: "중도해지하면 어떻게 되나요?",
    answer:
      "중도해지 시 우대금리가 적용되지 않으며, 기본금리만 적용됩니다. 또한 정부 매칭 지원금도 지급되지 않을 수 있습니다. 가능하면 만기까지 유지하시는 것을 권장합니다.",
  },
  {
    question: "납입 금액은 변경할 수 있나요?",
    answer:
      "매월 납입 금액은 최소 1,000원부터 최대 70만원까지 자유롭게 설정 가능하며, 매월 다른 금액을 납입할 수도 있습니다. 납입하지 않는 달이 있어도 불이익은 없습니다.",
  },
  {
    question: "어디서 가입할 수 있나요?",
    answer:
      "전국 주요 시중은행의 영업점 또는 모바일 앱을 통해 가입할 수 있습니다. 비대면 가입 시 우대금리 0.3%가 추가 적용됩니다.",
  },
  {
    question: "소득 확인은 어떻게 하나요?",
    answer:
      "국세청 홈택스에서 '소득금액증명원'을 발급받아 제출하시면 됩니다. 직전 과세기간의 총급여액을 기준으로 판단하며, 신규 취업자의 경우 근로계약서와 급여명세서로 대체할 수 있습니다.",
  },
  {
    question: "정부 매칭 지원금은 얼마나 받을 수 있나요?",
    answer:
      "개인소득에 따라 매칭 비율이 달라집니다. 연소득 2,400만원 이하는 납입액의 6%, 3,600만원 이하는 4%, 4,800만원 이하는 3%, 그 이상은 2%가 매칭 지원됩니다.",
  },
]

export default function EligibilityPage() {
  return (
    <main className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
            가입 자격 확인
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            아래 체크리스트로 청년 미래적금 가입 자격을 간편하게 확인해 보세요.
          </p>
        </div>

        {/* Checklist Section */}
        <section className="mx-auto mt-12 max-w-3xl" aria-labelledby="checklist-heading">
          <h2 id="checklist-heading" className="text-2xl font-bold tracking-tight text-foreground">
            자격 요건 체크리스트
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            아래 항목에 모두 해당되면 가입 가능합니다.
          </p>
          <EligibilityChecklist criteria={eligibilityCriteria} />
        </section>

        {/* FAQ Section */}
        <section className="mx-auto mt-16 max-w-3xl" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-foreground">
            자주 묻는 질문
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            청년 미래적금에 대해 자주 묻는 질문과 답변을 확인하세요.
          </p>
          <EligibilityFAQ items={faqItems} />
        </section>

        {/* Bottom CTA */}
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-xl font-bold text-foreground">
              자격 요건을 충족하시나요?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              지금 바로 가까운 은행 또는 모바일 앱에서 가입하세요.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/details"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                상품 상세 보기
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
              >
                메인으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
