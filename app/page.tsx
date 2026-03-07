"use client";

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowRight, TrendingUp, Shield, Clock, Gift, Check, X, Calculator } from "lucide-react"
import postsData from "@/data/posts.json"

function HeroSection() {
  const [monthlyPayment, setMonthlyPayment] = useState<number>(500000); // 월 납입액 (원)
  const [accountType, setAccountType] = useState<string>("general"); // 일반형 | 우대형
  const [interestRate, setInterestRate] = useState<number>(5.0); // 총 금리 (%)
  const duration = 36; // 3년 고정

  const result = useMemo(() => {
    // 1. 내가 넣은 총 원금
    const totalPrincipal = monthlyPayment * duration;

    // 2. 정부 매칭 지원금
    let monthlySupport = 0;
    if (accountType === "preferred") {
      // 우대형: 납입액의 12% (월 최대 6만원)
      monthlySupport = Math.min(monthlyPayment * 0.12, 60000);
    } else {
      // 일반형: 납입액의 6% (월 최대 3만원)
      monthlySupport = Math.min(monthlyPayment * 0.06, 30000);
    }

    const totalGovernmentSupport = monthlySupport * duration;

    // 3. 은행 이자 (연 이율 5% 단리 적용, (매달 납입되는 원금+지원금)에 대해 이자 계산)
    const totalMonthlyDeposit = monthlyPayment + monthlySupport;
    const totalInterest =
      totalMonthlyDeposit * (duration * (duration + 1) / 2) * (interestRate / 100) * (1 / 12);

    // 4. 최종 만기 수령액
    const finalAmount = totalPrincipal + totalInterest + totalGovernmentSupport;

    return {
      totalPrincipal: Math.floor(totalPrincipal),
      totalInterest: Math.floor(totalInterest),
      totalGovernmentSupport: Math.floor(totalGovernmentSupport),
      finalAmount: Math.floor(finalAmount)
    };
  }, [monthlyPayment, accountType, interestRate]);

  return (
    <section className="relative overflow-hidden bg-card py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)_0%,_transparent_50%)] opacity-[0.04]" />
      <div className="relative mx-auto max-w-6xl px-4 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* 타이틀 및 텍스트 영역 (Left) */}
          <div className="lg:col-span-5 text-center lg:text-left mb-12 lg:mb-0">
            <p className="inline-flex items-center rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              2026 청년 정책금융상품
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-5xl">
              {"청년미래적금"}
              <br />
              <span className="text-primary mt-2 block">만기수령액 계산기</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              최대 연 16.9% 수준의 파격 혜택! 3년만 유지해도 최대 2,200만원 달성. 내 조건으로 가입하면 3년 뒤 내 돈은 과연 얼마일까요?
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/details"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                상품 상세보기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8">
              <div>
                <p className="text-xl font-bold text-primary">약 16.9%</p>
                <p className="mt-1 text-xs text-muted-foreground">최고 적금효과</p>
              </div>
              <div className="border-x border-border">
                <p className="text-xl font-bold text-primary">50만</p>
                <p className="mt-1 text-xs text-muted-foreground">월 최대 납입</p>
              </div>
              <div>
                <p className="text-xl font-bold text-primary">3년</p>
                <p className="mt-1 text-xs text-muted-foreground">짧아진 만기</p>
              </div>
            </div>
          </div>

          {/* 계산기 영역 (Right) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-xl lg:p-8">
              <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">만기 수령액 미리보기</h2>
              </div>

              <div className="space-y-6">
                {/* 월 납입금 배열 */}
                <div>
                  <label className="text-sm font-semibold text-foreground flex justify-between">
                    <span>월 납입 금액</span>
                    <span className="text-primary">{monthlyPayment.toLocaleString()}원</span>
                  </label>
                  <input 
                    type="range" 
                    min="1000" 
                    max="500000" 
                    step="1000"
                    value={monthlyPayment} 
                    onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                    className="w-full mt-3 accent-primary" 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1천원</span>
                    <span>50만원</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 가입 유형 (소득 조건) */}
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">가입 유형 (소득기준)</label>
                    <select 
                      value={accountType} 
                      onChange={(e) => setAccountType(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="general">일반형 (연소득 6천만원 이하 등)</option>
                      <option value="preferred">우대형 (연소득 3,600만원 이하 등)</option>
                    </select>
                    {accountType === "general" && (
                      <div className="mt-2 rounded-md bg-secondary/50 p-2 text-xs text-muted-foreground">
                        💡 매달 납입하는 금액의 <strong className="text-foreground">6%</strong>를 정부가 더 내줘요!<br />
                        (월 최대 3만원 지원)
                      </div>
                    )}
                    {accountType === "preferred" && (
                      <div className="mt-2 rounded-md bg-primary/10 p-2 text-xs text-primary">
                        ✨ 매달 납입하는 금액의 <strong>12%</strong>를 정부가 팍팍 더 내줘요!<br />
                        (월 최대 6만원 특별 지원)
                      </div>
                    )}
                  </div>

                  {/* 적용 금리 */}
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">
                      적용 은행금리 (%)
                    </label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={interestRate} 
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        step="0.1"
                        min="3.5"
                        max="6.0"
                        className="w-full rounded-md border border-input bg-background pl-3 pr-8 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-3 top-2 text-muted-foreground text-sm font-medium">%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 결과 박스 */}
              <div className="mt-8 rounded-xl bg-secondary/50 p-5 border border-border">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">[원금 합계] ({duration}개월)</span>
                    <span className="font-semibold text-foreground">{result.totalPrincipal.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">+ [정부지원금 합계]</span>
                    <span className="font-semibold text-accent">{result.totalGovernmentSupport.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">+ [은행이자 합계] (비과세)</span>
                    <span className="font-semibold text-primary">{result.totalInterest.toLocaleString()}원</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <span className="text-base font-bold text-foreground">[최종 수령액]</span>
                  <span className="text-3xl font-bold tracking-tight text-primary">
                    {result.finalAmount.toLocaleString()}<span className="text-lg ml-1 text-foreground">원</span>
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

const comparisonRows = [
  { label: "가입 연령", future: "만 19~34세", leap: "만 19~34세" },
  { label: "소득 조건", future: "연소득 6,000만원 이하 (일반/우대형)", leap: "총급여 7,500만원 이하" },
  { label: "월 납입한도", future: "월 최대 50만원", leap: "월 최대 70만원" },
  { label: "가입 기간", future: "단 3년", leap: "5년" },
  { label: "정부 기여금", future: "납입액의 6~12%", leap: "소득에 따라 최대 6%" },
  { label: "실질 수익률", future: "최고 연 16.9% 수준", leap: "최고 연 8~9% 수준" },
  { label: "비과세 혜택", future: true, leap: true },
]

function ComparisonSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            청년미래적금 vs 청년도약계좌
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            두 상품의 핵심 조건을 한눈에 비교하고, 나에게 맞는 상품을
            선택하세요.
          </p>
        </div>

        {/* Desktop table */}
        <div className="mt-14 hidden overflow-hidden rounded-2xl border border-border md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary">
                <th className="px-6 py-4 text-left font-semibold text-foreground">
                  비교 항목
                </th>
                <th className="px-6 py-4 text-center font-semibold text-primary">
                  <span className="inline-flex items-center gap-1.5">
                    청년 미래적금
                    <span className="rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                      추천
                    </span>
                  </span>
                </th>
                <th className="px-6 py-4 text-center font-semibold text-foreground">
                  청년도약계좌
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr
                  key={row.label}
                  className={
                    idx % 2 === 0 ? "bg-card" : "bg-muted/40"
                  }
                >
                  <td className="px-6 py-3.5 font-medium text-foreground">
                    {row.label}
                  </td>
                  <td className="px-6 py-3.5 text-center text-foreground">
                    {typeof row.future === "boolean" ? (
                      row.future ? (
                        <Check className="mx-auto h-5 w-5 text-primary" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-muted-foreground/50" />
                      )
                    ) : (
                      row.future
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-center text-muted-foreground">
                    {typeof row.leap === "boolean" ? (
                      row.leap ? (
                        <Check className="mx-auto h-5 w-5 text-accent" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-muted-foreground/50" />
                      )
                    ) : (
                      row.leap
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-14 flex flex-col gap-3 md:hidden">
          {comparisonRows.map((row) => (
            <div
              key={row.label}
              className="rounded-xl border border-border bg-card p-4"
            >
              <p className="text-xs font-medium text-muted-foreground">
                {row.label}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-secondary/60 px-3 py-2 text-center">
                  <p className="mb-1 text-[10px] font-semibold text-primary">
                    미래적금
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {typeof row.future === "boolean" ? (
                      row.future ? (
                        <Check className="mx-auto h-4 w-4 text-primary" />
                      ) : (
                        <X className="mx-auto h-4 w-4 text-muted-foreground/50" />
                      )
                    ) : (
                      row.future
                    )}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 px-3 py-2 text-center">
                  <p className="mb-1 text-[10px] font-semibold text-muted-foreground">
                    도약계좌
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">
                    {typeof row.leap === "boolean" ? (
                      row.leap ? (
                        <Check className="mx-auto h-4 w-4 text-accent" />
                      ) : (
                        <X className="mx-auto h-4 w-4 text-muted-foreground/50" />
                      )
                    ) : (
                      row.leap
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          * 위 정보는 2026년 3월 기준이며, 세부 조건은 변경될 수 있습니다.
        </p>
      </div>
    </section>
  )
}

const benefits = [
  {
    icon: TrendingUp,
    title: "연 16.9% 강력한 혜택",
    description:
      "일반 적금 기준 연 12.0~16.9% 수준의 이자 효과를 볼 수 있는 압도적인 최고 수익률을 자랑합니다.",
  },
  {
    icon: Gift,
    title: "최대 12% 정부 기여금",
    description:
      "조건에 따라 내가 넣은 돈의 최소 6%(최대 3만원)에서 12%(최대 6만원)까지 정부가 추가로 얹어줍니다.",
  },
  {
    icon: Clock,
    title: "단 3년, 짧은 만기",
    description:
      "기존 5년 만기의 부담을 덜어내고, 3년만 유지해도 최대 2,200만원 수준의 든든한 목돈을 쉽게 모을 수 있습니다.",
  },
  {
    icon: Shield,
    title: "15.4% 전면 비과세",
    description:
      "일반 적금에서 떼어가는 15.4%의 이자 소득세를 전액 면제받아, 모든 이익을 100% 내 통장으로 가져옵니다.",
  },
]

function BenefitsSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            왜 청년 미래적금인가요?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            청년의 자산 형성을 위해 설계된 정부지원 적금 상품의 핵심 혜택을
            확인하세요.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const faqs = [
    {
      question: "청년미래적금과 청년도약계좌의 차이점은 무엇인가요?",
      answer: "청년미래적금은 기존 청년도약계좌의 긴 만기(5년) 부담을 덜기 위해 3년 만기로 설계된 상품입니다. 가입 기간은 짧아졌지만 정부 기여금 혜택은 더욱 강화되었습니다."
    },
    {
      question: "소득이 없어도 가입이 가능한가요?",
      answer: "기본적으로 소득이 있는 청년을 대상으로 하지만, 직종이나 고용 형태에 상관없이 일정 수준 이하의 소득 증빙이 가능하다면 가입할 수 있습니다. 세부 자격은 가입 시점의 공고를 확인해주세요."
    },
    {
      question: "중도 해지하면 정부 지원금을 받을 수 없나요?",
      answer: "특별한 사유(특별중도해지 사유 등) 없이 중도 해지할 경우 정부 지원금과 비과세 혜택을 전액 받지 못할 수 있습니다. 하지만 2026년 상품 기준에 따라 일정 기간 이상 유지 시 부분 지급 옵션이 검토되고 있습니다."
    },
    {
      question: "가입 기간 중 월 납입액을 변경할 수 있나요?",
      answer: "네, 자유적립식 상품이므로 월 최대 50만원 한도 내에서 자유롭게 납입 금액을 변경하거나 일시적으로 납입하지 않아도 계좌는 유지됩니다."
    }
  ];

  return (
    <section className="bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            자주 묻는 질문 (Q&A)
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            청년미래적금에 대해 가장 궁금해하시는 점들을 모았습니다.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-foreground flex items-start gap-3">
                <span className="text-primary font-bold">Q.</span>
                {faq.question}
              </h3>
              <div className="mt-3 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="text-accent font-bold">A.</span>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="rounded-3xl bg-primary px-6 py-16 text-center lg:px-16 lg:py-20">
          <h2 className="text-2xl font-bold text-primary-foreground text-balance md:text-3xl lg:text-4xl">
            가장 빠른 목돈 마련의 길
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-primary-foreground/80">
            연 16.9% 수준의 파격적인 혜택과 비과세까지.
            지금 바로 청년미래적금 가입 대상을 확인하세요.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/eligibility"
              className="inline-flex items-center gap-2 rounded-lg bg-card px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              자격 확인하기
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/details"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              상품 상세보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function BoardPreviewSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              청년 재테크 게시판
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              청년미래적금과 목돈 마련을 위한 유용한 팁
            </p>
          </div>
          <Link href="/board" className="text-sm font-semibold text-primary hover:underline">
            전체 글 보기 →
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {(postsData as any[]).slice(0, 3).map((post: any) => (
            <Link 
              key={post.id} 
              href={`/board?id=${post.id}`} 
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-all hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {post.category}
                  </span>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ComparisonSection />
      <BenefitsSection />
      <BoardPreviewSection />
      <FAQSection />
      <CTASection />
    </main>
  )
}
