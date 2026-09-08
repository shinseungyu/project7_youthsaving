import { AlertCircle, ExternalLink } from 'lucide-react'
import { AS_OF_LABEL, DISCLAIMER, SOURCES } from '@/lib/product'

/**
 * 제도 정보를 싣는 페이지 상단에 붙이는 고지 배너.
 *
 * 이 사이트는 정부·은행 어디와도 관계가 없는데 상품명·가입절차를 그대로 싣고 있어서,
 * 처음 들어온 사람이 공식 창구로 오해할 여지가 있었다(헤더의 "가입 신청" 버튼이 대표적).
 * 오해를 남긴 채 광고를 붙이면 "잘못 표시된 콘텐츠"로 걸린다 — 그래서 첫 화면에서 성격을 밝힌다.
 */
export function SiteDisclaimer({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 ${className}`}
      role="note"
    >
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
        <p className="m-0">
          <strong className="font-semibold">{DISCLAIMER.short}</strong>{' '}
          아래 정보는 {AS_OF_LABEL} 기준 공개 자료를 정리한 참고 자료이며, 실제 조건은 취급 금융기관
          심사 결과에 따라 달라질 수 있습니다.
        </p>
      </div>
    </div>
  )
}

/**
 * 본문 하단 출처 표기. 금융 주제라 수치의 출처를 독자가 직접 확인할 수 있어야 한다.
 */
export function SourceNote({ className = '' }: { className?: string }) {
  return (
    <aside className={`rounded-2xl border border-border bg-muted/40 p-6 ${className}`}>
      <h2 className="text-sm font-bold text-foreground">정보 출처 및 기준일</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        이 페이지의 제도 수치(금리·정부기여금·가입 요건·일정)는 아래 공개 자료를 근거로 정리했으며,
        <strong className="text-foreground"> {AS_OF_LABEL}</strong> 기준입니다. 정책은 회차마다 바뀔 수
        있으므로 가입 전 원문을 함께 확인해 주세요.
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {SOURCES.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-start gap-1.5 text-sm text-primary underline underline-offset-2 hover:opacity-80"
            >
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{s.name}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{DISCLAIMER.long}</p>
    </aside>
  )
}
