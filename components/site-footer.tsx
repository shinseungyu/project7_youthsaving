import Link from 'next/link'
import { AS_OF_LABEL, DISCLAIMER, SOURCES } from '@/lib/product'

/**
 * 푸터.
 *
 * 이전에는 바로가기에 홈/상세/자격 3개만 있어서 게시판(가이드) 12편이 푸터에서 닿지 않았고,
 * 사이트 성격 고지도 "계산기 결과는 참고용" 한 줄뿐이었다.
 * 정부 상품명을 그대로 쓰는 사이트라 운영 주체와 무관함을 분명히 밝히고,
 * 수치 출처를 전 페이지에서 확인할 수 있게 링크를 상시 노출한다.
 */

const navGroups = [
  {
    heading: '상품 정보',
    links: [
      { href: '/', label: '만기수령액 계산기' },
      { href: '/details', label: '상품 조건 총정리' },
      { href: '/eligibility', label: '가입 자격 확인' },
      { href: '/banks', label: '취급기관 비교' },
      { href: '/switch-from-dooyak', label: '도약계좌 갈아타기' },
    ],
  },
  {
    heading: '가이드',
    links: [
      { href: '/faq', label: '질문과 답' },
      { href: '/board', label: '전체 글 보기' },
      { href: '/board#eligibility', label: '가입 조건' },
      { href: '/board#strategy', label: '납입 전략' },
      { href: '/board#terminate', label: '해지·변경' },
    ],
  },
  {
    heading: '사이트',
    links: [
      { href: '/about', label: '사이트 소개' },
      { href: '/contact', label: '문의' },
      { href: '/privacy-policy', label: '개인정보 처리방침' },
      { href: '/terms-of-service', label: '이용약관' },
      { href: '/cookie-policy', label: '쿠키 정책' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-foreground" aria-label="청년미래적금 가이드 홈">
              <img src="/logo.ico" alt="" aria-hidden="true" className="h-6 w-6" />
              <span className="text-lg font-bold tracking-tight">청년미래적금 가이드</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              청년미래적금·청년도약계좌 등 청년 자산형성 제도를 정리하고 계산해보는 개인 운영 정보
              사이트입니다.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">정보 기준일 {AS_OF_LABEL}</p>
          </div>

          {navGroups.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h3 className="text-sm font-semibold text-foreground">{group.heading}</h3>
              <ul className="mt-3 flex flex-col gap-2" role="list">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs font-semibold text-foreground">{DISCLAIMER.short}</p>
          <p className="mt-2 max-w-4xl text-xs leading-relaxed text-muted-foreground">{DISCLAIMER.long}</p>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">출처</span>
            {SOURCES.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {s.name}
              </a>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-1 text-xs text-muted-foreground">
            <p>운영: 개인 운영 정보 사이트 (fundfinpro.com)</p>
            <p>
              문의:{' '}
              <a href="mailto:tlsfkaus0711@gmail.com" className="underline underline-offset-2 hover:text-foreground">
                tlsfkaus0711@gmail.com
              </a>
            </p>
            <p className="mt-2">© 2026 fundfinpro.com</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
