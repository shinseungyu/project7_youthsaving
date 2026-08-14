import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "연락처",
  description: "청년 미래적금(fundfinpro.com) 문의 안내. 콘텐츠 오류 제보, 정보 수정 요청, 제휴 및 일반 문의를 이메일로 받고 있습니다.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[800px] px-4 py-12 md:py-20">
      <h1 className="mb-2 text-3xl font-bold text-foreground">연락처</h1>
      <p className="mb-10 text-sm text-muted-foreground">문의 및 제보 안내</p>

      <div className="prose prose-gray max-w-none leading-relaxed text-muted-foreground">
        <p>
          청년 미래적금(fundfinpro.com)을 이용해 주셔서 감사합니다. 아래 이메일로 문의를 보내주시면
          확인 후 순차적으로 답변드립니다.
        </p>

        <div className="my-8 rounded-2xl border border-border bg-card p-6">
          <p className="m-0 text-sm text-muted-foreground">이메일 문의</p>
          <a href="mailto:tlsfkaus0711@gmail.com" className="text-xl font-bold text-primary underline">
            tlsfkaus0711@gmail.com
          </a>
        </div>

        <h2 className="mt-8 mb-4 text-xl font-semibold text-foreground">이런 문의를 받습니다</h2>
        <ul>
          <li><strong>정보 오류 제보</strong> — 잘못된 수치나 오래된 정보를 발견하셨다면 알려주세요. 확인 후 신속히 수정합니다.</li>
          <li><strong>내용 요청</strong> — 다뤄줬으면 하는 주제나 추가 설명이 필요한 부분</li>
          <li><strong>제휴·광고 문의</strong></li>
          <li><strong>기타 일반 문의</strong></li>
        </ul>

        <h2 className="mt-8 mb-4 text-xl font-semibold text-foreground">답변 안내</h2>
        <p>
          문의는 보통 영업일 기준 2~3일 이내에 답변드리도록 노력하고 있습니다. 개인 운영 사이트 특성상
          답변이 다소 늦어질 수 있는 점 양해 부탁드립니다. 개인정보 열람·정정·삭제 등
          개인정보 관련 요청은 <Link href="/privacy-policy" className="text-primary underline">개인정보 처리방침</Link>의 안내에 따라 처리됩니다.
        </p>

        <p className="mt-8">
          사이트에 대한 더 자세한 내용은 <Link href="/about" className="text-primary underline">사이트 소개</Link>를 참고해 주세요.
        </p>
      </div>
    </main>
  )
}
