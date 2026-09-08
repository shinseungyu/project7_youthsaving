'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

/**
 * 사이트 헤더.
 *
 * 링크 목록을 배열 하나로 두고 데스크톱/모바일이 함께 쓴다.
 * 예전에는 두 곳에 같은 <li> 를 복붙해두어서, 한쪽에만 항목을 추가하다
 * 데스크톱에서 '도약계좌 갈아타기'가 빠지는 식의 어긋남이 생겼다.
 *
 * 데스크톱 목록에 '홈'은 넣지 않는다 — 왼쪽 로고가 이미 홈 링크다.
 */
const NAV_LINKS = [
  { href: '/details', label: '상품 조건' },
  { href: '/banks', label: '은행 비교' },
  { href: '/eligibility', label: '가입 자격' },
  { href: '/switch-from-dooyak', label: '갈아타기' },
  { href: '/faq', label: '질문과 답' },
  { href: '/board', label: '가이드' },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const close = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 lg:px-8"
        aria-label="메인 내비게이션"
      >
        <Link href="/" className="flex items-center gap-2 text-foreground" aria-label="청년미래적금 가이드 홈">
          <img src="/logo.ico" alt="" aria-hidden="true" className="h-7 w-7" />
          <span className="text-lg font-bold tracking-tight">청년 미래적금</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-5 lg:gap-6 md:flex" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/eligibility"
            className="inline-flex items-center whitespace-nowrap rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            내 자격 확인
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="text-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card px-4 pb-6 pt-4 md:hidden">
          <ul className="flex flex-col gap-4" role="list">
            <li>
              <Link href="/" className="block text-base font-medium text-foreground" onClick={close}>
                홈
              </Link>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block text-base font-medium text-foreground" onClick={close}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/eligibility"
                className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                onClick={close}
              >
                내 자격 확인
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
