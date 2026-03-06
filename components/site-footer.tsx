import Link from "next/link"
import { PiggyBank } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-foreground"
              aria-label="청년 미래적금 홈"
            >
              <img src="/logo.ico" alt="로고" className="h-6 w-6" />
              <span className="text-lg font-bold tracking-tight">
                청년 미래적금
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              청년의 안정적인 미래를 위한
              <br />
              정부지원 우대 적금 상품
            </p>
          </div>

          <nav aria-label="바로가기 링크">
            <h3 className="text-sm font-semibold text-foreground">
              바로가기
            </h3>
            <ul className="mt-3 flex flex-col gap-2" role="list">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  href="/details"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  상품 상세
                </Link>
              </li>
              <li>
                <Link
                  href="/eligibility"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  자격 확인
                </Link>
              </li>
            </ul>
          </nav>

        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            {"© 2026 FundFinPro. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
