"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, PiggyBank } from "lucide-react"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8"
        aria-label="메인 내비게이션"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground"
          aria-label="청년 미래적금 홈"
        >
          <img src="/logo.ico" alt="로고" className="h-7 w-7" />
          <span className="text-lg font-bold tracking-tight">
            청년 미래적금
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex" role="list">
          <li>
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              홈
            </Link>
          </li>
          <li>
            <Link
              href="/details"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              상품 상세
            </Link>
          </li>
          <li>
            <Link
              href="/eligibility"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              자격 확인
            </Link>
          </li>
        </ul>

        <div className="hidden md:block">
          <Link
            href="/eligibility"
            className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            가입 신청
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="메뉴 열기"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card px-4 pb-6 pt-4 md:hidden">
          <ul className="flex flex-col gap-4" role="list">
            <li>
              <Link
                href="/"
                className="block text-base font-medium text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                홈
              </Link>
            </li>
            <li>
              <Link
                href="/details"
                className="block text-base font-medium text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                상품 상세
              </Link>
            </li>
            <li>
              <Link
                href="/eligibility"
                className="block text-base font-medium text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                자격 확인
              </Link>
            </li>
            <li>
              <Link
                href="/eligibility"
                className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                onClick={() => setMobileMenuOpen(false)}
              >
                가입 신청
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
