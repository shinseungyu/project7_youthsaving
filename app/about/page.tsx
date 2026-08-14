import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "사이트 소개",
  description: "청년 미래적금(fundfinpro.com)은 청년미래적금·청년도약계좌 등 청년 자산형성 제도를 쉽게 이해하고 계산할 수 있도록 돕는 개인 운영 정보 사이트입니다.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[800px] px-4 py-12 md:py-20">
      <h1 className="mb-2 text-3xl font-bold text-foreground">사이트 소개</h1>
      <p className="mb-10 text-sm text-muted-foreground">청년 미래적금 · fundfinpro.com</p>

      <div className="prose prose-gray max-w-none leading-relaxed text-muted-foreground">
        <h2 className="mt-8 mb-4 text-xl font-semibold text-foreground">어떤 사이트인가요?</h2>
        <p>
          청년 미래적금(fundfinpro.com)은 청년미래적금, 청년도약계좌 등 정부가 지원하는 청년 자산형성 제도를
          누구나 쉽게 이해하고 스스로 계산해 볼 수 있도록 만든 정보 제공 사이트입니다. 복잡한 가입 조건과
          정부기여금, 비과세 혜택, 만기 수령액을 직접 계산기로 확인하고, 관련 재테크 정보를 함께 정리해 제공합니다.
        </p>

        <h2 className="mt-8 mb-4 text-xl font-semibold text-foreground">이런 정보를 다룹니다</h2>
        <ul>
          <li>청년미래적금·청년도약계좌의 <strong>가입 자격과 소득 요건</strong> 안내</li>
          <li>납입액·기간에 따른 <strong>만기 수령액 계산</strong> 및 정부기여금 시뮬레이션</li>
          <li>유사 상품 <strong>비교</strong>와 갈아타기(전환) 시 유의사항</li>
          <li>사회초년생을 위한 <strong>월급 관리·저축 습관</strong> 등 실용 재테크 정보</li>
        </ul>

        <h2 className="mt-8 mb-4 text-xl font-semibold text-foreground">정보의 신뢰성</h2>
        <p>
          본 사이트의 모든 콘텐츠는 공개된 정부·금융기관 자료를 바탕으로 이해하기 쉽게 재구성한 것입니다.
          제도와 금리, 지원 금액은 정책에 따라 수시로 바뀔 수 있으므로, 실제 가입 전에는 반드시
          금융기관 또는 정부 공식 채널에서 최신 조건을 확인하시기 바랍니다. 계산기 결과는 참고용 추정치이며
          실제 심사 결과와 다를 수 있습니다.
        </p>

        <h2 className="mt-8 mb-4 text-xl font-semibold text-foreground">운영 주체</h2>
        <p>
          본 사이트는 <strong>개인이 운영</strong>하는 정보 제공 목적의 비영리성 웹사이트입니다. 별도의 회원가입
          없이 무료로 이용할 수 있으며, 운영 비용 충당을 위해 Google AdSense 광고가 게재됩니다. 콘텐츠 오류
          제보나 문의는 언제든 환영합니다.
        </p>
        <ul>
          <li><strong>운영:</strong> 청년 미래적금 운영자 (개인)</li>
          <li><strong>문의:</strong> <a href="mailto:tlsfkaus0711@gmail.com" className="text-primary underline">tlsfkaus0711@gmail.com</a></li>
        </ul>

        <p className="mt-8">
          문의 사항은 <Link href="/contact" className="text-primary underline">연락처 페이지</Link>를,
          개인정보 처리에 관한 내용은 <Link href="/privacy-policy" className="text-primary underline">개인정보 처리방침</Link>을 참고해 주세요.
        </p>
      </div>
    </main>
  )
}
