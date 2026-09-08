import type { Metadata } from 'next'
import Link from 'next/link'
import { AS_OF_LABEL } from '@/lib/product'
import { breadcrumbLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: '쿠키 정책',
  description:
    'fundfinpro.com이 사용하는 쿠키의 종류와 목적, 제3자 서비스(Google AdSense·Analytics)의 쿠키, 브라우저별 차단 방법과 맞춤 광고를 끄는 방법을 안내합니다.',
  alternates: { canonical: '/cookie-policy' },
}

const CONTACT = 'tlsfkaus0711@gmail.com'

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 border-b border-border pb-2 text-xl font-bold text-foreground">
        {n}. {title}
      </h2>
      <div className="space-y-4 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

const COOKIE_TYPES = [
  {
    kind: '필수 쿠키',
    who: '본 사이트',
    why: '페이지가 정상적으로 동작하는 데 필요한 최소한의 정보입니다. 본 사이트는 회원가입이나 로그인 기능이 없어 이 범주의 쿠키를 거의 사용하지 않습니다.',
    optOut: '차단 시 일부 기능이 동작하지 않을 수 있습니다.',
  },
  {
    kind: '분석 쿠키',
    who: 'Google Analytics, Vercel Analytics',
    why: '어떤 페이지가 많이 읽히는지, 어디서 이탈하는지 집계해 콘텐츠를 개선하는 데 씁니다. 개인을 식별하는 용도로는 쓰지 않습니다.',
    optOut: '브라우저 설정에서 차단하거나 Google 애널리틱스 차단 부가기능을 설치할 수 있습니다.',
  },
  {
    kind: '광고 쿠키',
    who: 'Google AdSense 및 제휴 광고 공급업체',
    why: '이용자의 이전 방문 기록을 바탕으로 관련성 높은 광고를 표시하고, 같은 광고가 반복 노출되는 것을 줄이며, 광고 성과를 측정합니다.',
    optOut: 'Google 광고 설정에서 맞춤 광고를 끌 수 있습니다. 끄더라도 광고 자체는 표시되며, 관련성만 낮아집니다.',
  },
]

const BROWSER_STEPS = [
  {
    name: 'Chrome',
    path: '설정 → 개인 정보 보호 및 보안 → 서드 파티 쿠키 (또는 주소창에 chrome://settings/cookies 입력)',
  },
  {
    name: 'Safari (macOS)',
    path: 'Safari → 설정 → 개인 정보 보호 → 웹사이트 추적 방지 / 쿠키 차단',
  },
  {
    name: 'Safari (iOS)',
    path: '설정 앱 → Safari → 개인 정보 보호 및 보안 → 모든 쿠키 차단',
  },
  {
    name: 'Edge',
    path: '설정 → 쿠키 및 사이트 권한 → 쿠키 및 사이트 데이터 관리 및 삭제',
  },
  {
    name: 'Firefox',
    path: '설정 → 개인 정보 및 보안 → 쿠키 및 사이트 데이터',
  },
  {
    name: 'Android Chrome',
    path: 'Chrome 앱 → 우측 상단 메뉴 → 설정 → 사이트 설정 → 쿠키',
  },
]

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd([{ name: '쿠키 정책', path: '/cookie-policy' }])),
        }}
      />

      <h1 className="mb-2 text-3xl font-bold tracking-tight">쿠키 정책</h1>
      <p className="mb-12 text-sm text-muted-foreground">최종 업데이트: {AS_OF_LABEL}</p>

      <div className="space-y-12">
        <Section n={1} title="쿠키란 무엇인가요">
          <p>
            쿠키(Cookie)는 웹사이트가 이용자의 브라우저에 저장하는 작은 텍스트 파일입니다. 다시 방문했을
            때 이전 상태를 기억하거나, 방문 통계를 집계하거나, 광고 관련성을 높이는 데 사용됩니다.
          </p>
          <p>
            쿠키에는 사이트가 직접 저장하는 <strong className="text-foreground">퍼스트파티 쿠키</strong>와,
            사이트에 삽입된 외부 서비스가 저장하는{' '}
            <strong className="text-foreground">서드파티 쿠키</strong>가 있습니다. 본 사이트에서 실제로
            의미 있게 작동하는 것은 대부분 서드파티 쿠키(분석·광고)입니다.
          </p>
        </Section>

        <Section n={2} title="본 사이트가 사용하는 쿠키">
          <p>본 사이트는 회원가입 기능이 없어 로그인 상태나 개인 설정을 저장하지 않습니다.</p>
          <div className="mt-6 flex flex-col gap-4">
            {COOKIE_TYPES.map((c) => (
              <div key={c.kind} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-semibold text-foreground">{c.kind}</h3>
                  <span className="text-xs text-muted-foreground">{c.who}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.why}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">거부 방법:</span> {c.optOut}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section n={3} title="Google AdSense와 광고 쿠키">
          <p>
            본 사이트는 운영 비용을 충당하기 위해 Google AdSense 광고를 게재합니다. Google을 포함한 제3자
            공급업체는 쿠키를 사용해 이용자의 이전 방문 기록을 바탕으로 광고를 제공할 수 있습니다.
          </p>
          <p>
            Google이 광고 쿠키를 사용하는 방식과, 이를 이용자가 직접 제어하는 방법은 아래에서 확인하실 수
            있습니다.
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Google 광고 및 쿠키 사용 안내
              </a>
            </li>
            <li>
              <a
                href="https://myadcenter.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Google 광고 설정 — 맞춤 광고 사용 중지
              </a>
            </li>
            <li>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Google 개인정보처리방침
              </a>
            </li>
            <li>
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                광고 업계 공동 옵트아웃 페이지 (aboutads.info)
              </a>
            </li>
          </ul>
        </Section>

        <Section n={4} title="분석 쿠키">
          <p>
            방문자 수와 페이지별 조회 수를 집계하기 위해 Google Analytics와 Vercel Analytics를 사용합니다.
            어떤 글이 실제로 읽히는지 파악해 콘텐츠를 보완하는 데 씁니다.
          </p>
          <p>
            Google Analytics 수집을 원하지 않으시면{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Google 애널리틱스 차단 브라우저 부가기능
            </a>
            을 설치하시면 됩니다.
          </p>
        </Section>

        <Section n={5} title="브라우저에서 쿠키 차단하기">
          <p>
            브라우저 설정에서 쿠키를 차단하거나 이미 저장된 쿠키를 삭제할 수 있습니다. 브라우저별 경로는
            아래와 같습니다. 버전에 따라 메뉴 이름이 조금씩 다를 수 있습니다.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[480px] text-left text-sm">
              <caption className="sr-only">브라우저별 쿠키 설정 경로</caption>
              <thead>
                <tr className="border-b border-border bg-secondary text-secondary-foreground">
                  <th scope="col" className="px-5 py-3.5 font-semibold">브라우저</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">설정 경로</th>
                </tr>
              </thead>
              <tbody>
                {BROWSER_STEPS.map((b, i) => (
                  <tr key={b.name} className={i < BROWSER_STEPS.length - 1 ? 'border-b border-border' : ''}>
                    <th scope="row" className="whitespace-nowrap px-5 py-3.5 text-left font-medium text-foreground">
                      {b.name}
                    </th>
                    <td className="px-5 py-3.5 text-muted-foreground">{b.path}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            쿠키를 전면 차단해도 본 사이트의 글과 계산기는 정상적으로 이용할 수 있습니다. 다만 광고의
            관련성이 낮아지고, 방문 통계에는 잡히지 않게 됩니다.
          </p>
        </Section>

        <Section n={6} title="계산기 입력값은 쿠키에 저장되지 않습니다">
          <p>
            만기수령액 계산기와 자격 체크리스트에 입력하는 금액·유형·체크 항목은{' '}
            <strong className="text-foreground">쿠키에 저장되지 않고 서버로도 전송되지 않습니다.</strong>{' '}
            브라우저 안에서만 계산되며 페이지를 벗어나면 사라집니다. 자세한 내용은{' '}
            <Link href="/privacy-policy" className="text-primary underline underline-offset-2">
              개인정보 처리방침
            </Link>
            을 참고해 주세요.
          </p>
        </Section>

        <Section n={7} title="정책 변경">
          <p>
            사용하는 서비스가 바뀌거나 관련 법령이 개정되면 본 정책을 갱신하고, 이 페이지에 변경 내용과
            최종 업데이트 일자를 게시합니다.
          </p>
        </Section>

        <Section n={8} title="문의">
          <p>
            쿠키 사용에 관한 문의는 아래로 보내주세요.
          </p>
          <p>
            이메일:{' '}
            <a href={`mailto:${CONTACT}`} className="text-primary underline underline-offset-2">
              {CONTACT}
            </a>
          </p>
        </Section>
      </div>
    </main>
  )
}
