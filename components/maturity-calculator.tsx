'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Calculator } from 'lucide-react'
import { PRODUCT, estimateMaturity } from '@/lib/product'

/**
 * 만기수령액 계산기.
 *
 * 원래 app/page.tsx 안에 있었고, 그 탓에 홈 전체가 "use client" 였다.
 * 계산기만 클라이언트로 떼어내면 나머지 본문(비교표·FAQ·가이드)은 서버에서 렌더되고
 * 페이지에 metadata 를 붙일 수 있다.
 *
 * 계산식은 lib/product.ts 의 estimateMaturity 하나만 쓴다.
 * 상세 페이지의 예시 표와 이 계산기가 다른 식을 쓰면 같은 조건에 다른 답이 나온다.
 */
export function MaturityCalculator() {
  const [monthlyPayment, setMonthlyPayment] = useState<number>(PRODUCT.monthlyMax)
  const [accountType, setAccountType] = useState<'general' | 'preferred'>('general')
  const [interestRate, setInterestRate] = useState<number>(PRODUCT.baseRate)

  const result = useMemo(
    () => estimateMaturity(monthlyPayment, accountType, interestRate),
    [monthlyPayment, accountType, interestRate],
  )

  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-xl lg:p-8">
      <div className="mb-2 flex items-center gap-3 border-b border-border pb-4">
        <div className="rounded-lg bg-primary/10 p-2">
          <Calculator className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold text-foreground">만기수령액 계산</h2>
      </div>
      <p className="mb-5 text-xs text-muted-foreground">
        월 납입액·가입 유형·적용 금리를 넣으면 3년({PRODUCT.termMonths}개월) 만기 기준으로 계산합니다.
      </p>

      <div className="space-y-6">
        {/* 월 납입액 */}
        <div>
          <label htmlFor="monthly" className="mb-3 block text-sm font-semibold text-foreground">
            월 납입 금액
          </label>
          <div className="flex items-center gap-3">
            <input
              id="monthly"
              type="number"
              min={1000}
              max={PRODUCT.monthlyMax}
              step={1000}
              value={monthlyPayment}
              onChange={(e) => {
                const v = Math.min(PRODUCT.monthlyMax, Math.max(1000, Number(e.target.value) || 1000))
                setMonthlyPayment(v)
              }}
              className="w-36 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground [appearance:textfield] focus:outline-none focus:ring-2 focus:ring-primary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="shrink-0 text-sm text-muted-foreground">원</span>
            <span className="ml-auto text-sm font-semibold text-primary">
              {monthlyPayment.toLocaleString()}원
            </span>
          </div>
          <input
            type="range"
            aria-label="월 납입 금액 슬라이더"
            min={10000}
            max={PRODUCT.monthlyMax}
            step={10000}
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(Number(e.target.value))}
            className="mt-3 w-full accent-primary"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>1만원</span>
            <span>{(PRODUCT.monthlyMax / 10000).toLocaleString()}만원(한도)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* 가입 유형 */}
          <div>
            <label htmlFor="type" className="mb-2 block text-sm font-semibold text-foreground">
              가입 유형
            </label>
            <select
              id="type"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as 'general' | 'preferred')}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="general">일반형 (기여금 6%)</option>
              <option value="preferred">우대형 (기여금 12%)</option>
            </select>
            <p className="mt-2 rounded-md bg-secondary/50 p-2 text-xs leading-relaxed text-muted-foreground">
              {accountType === 'preferred' ? (
                <>
                  납입액의 <strong className="text-foreground">12%</strong>, 월 최대{' '}
                  {PRODUCT.matchCapPreferred.toLocaleString()}원. 총급여{' '}
                  {(PRODUCT.preferredSalaryMax / 10000).toLocaleString()}만원 이하 재직 청년이 해당합니다.
                </>
              ) : (
                <>
                  납입액의 <strong className="text-foreground">6%</strong>, 월 최대{' '}
                  {PRODUCT.matchCapGeneral.toLocaleString()}원이 정부기여금으로 붙습니다.
                </>
              )}
            </p>
          </div>

          {/* 적용 금리 */}
          <div>
            <label htmlFor="rate" className="mb-2 block text-sm font-semibold text-foreground">
              적용 금리 (연 %)
            </label>
            <div className="relative">
              <input
                id="rate"
                type="number"
                value={interestRate}
                onChange={(e) => {
                  const v = Math.min(PRODUCT.rateMax, Math.max(PRODUCT.rateMin, Number(e.target.value) || PRODUCT.rateMin))
                  setInterestRate(v)
                }}
                step={0.1}
                min={PRODUCT.rateMin}
                max={PRODUCT.rateMax}
                className="w-full rounded-md border border-input bg-background py-2 pl-3 pr-8 text-sm text-foreground [appearance:textfield] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="absolute right-3 top-2 text-sm font-medium text-muted-foreground">%</span>
            </div>
            <p className="mt-2 rounded-md bg-secondary/50 p-2 text-xs leading-relaxed text-muted-foreground">
              기본금리 연 {PRODUCT.baseRate.toFixed(2)}%는 전 기관 동일. 우대 조건을 채우면 기관에 따라 최고
              연 7~8%까지 올라갑니다.
            </p>
          </div>
        </div>
      </div>

      {/* 결과 */}
      <div className="mt-8 rounded-xl border border-border bg-secondary/50 p-5">
        <h3 className="mb-4 text-sm font-bold text-foreground">3년 뒤 예상 수령액</h3>
        <dl className="mb-4 space-y-3">
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">원금 합계 ({PRODUCT.termMonths}개월)</dt>
            <dd className="font-semibold text-foreground">{result.totalPrincipal.toLocaleString()}원</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">
              + 정부기여금 (월 {result.monthlyMatch.toLocaleString()}원)
            </dt>
            <dd className="font-semibold text-accent">{result.totalMatch.toLocaleString()}원</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-muted-foreground">+ 은행이자 (비과세)</dt>
            <dd className="font-semibold text-primary">{result.totalInterest.toLocaleString()}원</dd>
          </div>
        </dl>

        <div className="flex flex-col justify-between gap-2 border-t border-border pt-4 sm:flex-row sm:items-end">
          <span className="text-base font-bold text-foreground">최종 수령액</span>
          <span className="text-3xl font-bold tracking-tight text-primary">
            {result.finalAmount.toLocaleString()}
            <span className="ml-1 text-lg text-foreground">원</span>
          </span>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          일반 적금이었다면 이자에서 세금 {result.taxSaved.toLocaleString()}원을 뗐을 금액입니다. 비과세라
          그대로 남습니다.
        </p>
      </div>

      <p className="mt-4 rounded-lg border border-border bg-muted/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        단리 기준 추정치이며 실제 지급액은 취급기관의 이자 산정 방식과 심사 결과에 따라 달라집니다. 계산
        전제는{' '}
        <Link href="/details" className="text-primary underline underline-offset-2">
          상품 조건 총정리
        </Link>
        에서 확인하세요.
      </p>
    </div>
  )
}
