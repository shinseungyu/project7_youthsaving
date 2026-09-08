import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Compass } from 'lucide-react'

/**
 * 404 화면.
 *
 * 루트에 두어 루트 레이아웃만 적용되게 한다. AdSense 로더는 app/(site)/layout.tsx 에
 * 있으므로 이 화면에는 광고 스크립트가 실리지 않는다 — 게시자 정책이
 * "알림이나 네비게이션 목적의 화면"에 광고를 금지하기 때문이다.
 *
 * 검색엔진에도 색인시키지 않는다(noindex).
 */
export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
  description: '요청하신 주소의 페이지가 없습니다. 청년미래적금 정보는 아래 경로에서 확인하실 수 있습니다.',
  robots: { index: false, follow: true },
}

const DESTINATIONS = [
  {
    href: '/',
    title: '만기수령액 계산기',
    desc: '월 납입액과 가입 유형을 넣으면 3년 뒤 원금·이자·정부기여금이 나옵니다.',
  },
  {
    href: '/details',
    title: '상품 조건 총정리',
    desc: '금리 구조, 정부기여금, 비과세가 금액으로 얼마인지 정리했습니다.',
  },
  {
    href: '/eligibility',
    title: '가입 자격',
    desc: '나이·개인소득·가구소득 요건과 우대형 판정 기준입니다.',
  },
  {
    href: '/banks',
    title: '취급기관 비교',
    desc: '14곳의 우대금리 한도와 상황별로 어디를 고를지 정리했습니다.',
  },
  {
    href: '/faq',
    title: '질문과 답',
    desc: '자격·신청·금리·해지까지 자주 막히는 지점을 모았습니다.',
  },
  {
    href: '/board',
    title: '가이드',
    desc: '납입 전략, 해지 판단, 사회초년생 월급 관리까지 20편입니다.',
  },
]

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 lg:py-28">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
        <Compass className="h-7 w-7 text-primary" aria-hidden="true" />
      </div>

      <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        찾으시는 페이지가 없습니다
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
        주소가 바뀌었거나 삭제된 페이지일 수 있습니다. 아래에서 원하시는 내용을 찾아보세요.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {DESTINATIONS.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
          >
            <p className="flex items-center gap-1.5 font-semibold text-foreground group-hover:text-primary">
              {d.title}
              <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-6">
        <h2 className="text-sm font-bold text-foreground">링크가 잘못된 것 같다면</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          다른 사이트에서 넘어오셨는데 이 화면이 떴다면 알려주세요. 어떤 주소로 들어오셨는지 함께
          보내주시면 확인 후 연결하겠습니다.{' '}
          <Link href="/contact" className="text-primary underline underline-offset-2">
            문의하기
          </Link>
        </p>
      </div>
    </main>
  )
}
