import type { Block } from '@/lib/article'

/**
 * 파싱된 본문 블록을 시맨틱 HTML 로 렌더한다.
 * 소제목은 실제 <h2> + 앵커 id 로 나가야 구글 패시지 색인과 목차 링크가 잡힌다.
 */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-base leading-loose text-foreground">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'h2':
            return (
              <h2
                key={i}
                id={block.id}
                className="mt-10 mb-4 scroll-mt-24 text-xl font-bold tracking-tight text-foreground md:text-2xl"
              >
                {block.text}
              </h2>
            )

          case 'ul':
            return (
              <ul key={i} className="mb-5 list-disc space-y-2 pl-5 marker:text-primary">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )

          case 'ol':
            return (
              <ol key={i} className="mb-5 list-decimal space-y-2 pl-5 marker:font-bold marker:text-primary">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            )

          case 'check':
            return (
              <ul key={i} className="mb-5 grid gap-2 rounded-xl border border-border bg-muted/40 p-5 sm:grid-cols-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm font-medium">
                    <span aria-hidden="true" className="mt-0.5 text-primary">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )

          case 'faq':
            return (
              <dl key={i} className="mb-5 divide-y divide-border rounded-xl border border-border bg-card">
                {block.items.map((item, j) => (
                  <div key={j} className="p-5">
                    <dt className="mb-2 font-bold text-foreground">Q. {item.q}</dt>
                    <dd className="text-muted-foreground">A. {item.a}</dd>
                  </div>
                ))}
              </dl>
            )

          default:
            return (
              <p key={i} className="mb-4">
                {block.text}
              </p>
            )
        }
      })}
    </div>
  )
}

/** 글 상단 목차. 체류시간과 내부 앵커 링크를 동시에 확보한다. */
export function ArticleToc({ headings }: { headings: { id: string; text: string }[] }) {
  if (headings.length < 3) return null

  return (
    <nav aria-label="목차" className="mb-10 rounded-xl border border-border bg-muted/40 p-5">
      <p className="mb-3 text-sm font-bold text-foreground">이 글의 목차</p>
      <ol className="list-decimal space-y-1.5 pl-5 text-sm marker:text-muted-foreground">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
