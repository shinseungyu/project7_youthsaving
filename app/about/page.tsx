import type { Metadata } from 'next'
import Link from 'next/link'
import { AS_OF_LABEL, DISCLAIMER, SOURCES } from '@/lib/product'
import { SITE_URL, breadcrumbLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: '사이트 소개 — 무엇을 어떻게 정리하는 곳인가',
  description:
    'fundfinpro.com은 청년미래적금·청년도약계좌 등 청년 자산형성 제도를 정리하고 계산해보는 개인 운영 정보 사이트입니다. 다루는 범위, 콘텐츠 제작 방식, 정보 출처와 한계를 밝힙니다.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: '사이트 소개',
    url: `${SITE_URL}/about`,
    inLanguage: 'ko',
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      {[orgLd, breadcrumbLd([{ name: '사이트 소개', path: '/about' }])].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <nav aria-label="breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">홈</Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground">사이트 소개</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-foreground">사이트 소개</h1>
      <p className="mb-12 text-sm text-muted-foreground">청년미래적금 가이드 · fundfinpro.com</p>

      <div className="space-y-12 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">어떤 사이트인가요</h2>
          <p>
            청년미래적금, 청년도약계좌처럼 정부가 지원하는 청년 자산형성 제도는 조건이 여러 겹으로
            얽혀 있습니다. 나이 요건과 소득 요건이 따로 있고, 소득도 총급여와 종합소득금액으로 갈리며,
            정부기여금 비율은 또 다른 기준으로 정해집니다. 여기에 은행별 우대금리까지 붙으면 무엇부터
            봐야 할지 알기 어렵습니다.
          </p>
          <p className="mt-4">
            이 사이트는 그 조건들을 한 번에 정리하고, 내 납입액을 넣었을 때 3년 뒤 얼마가 되는지 직접
            계산해볼 수 있게 만든 곳입니다.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">다루는 내용</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <Link href="/details" className="text-primary underline underline-offset-2">상품 조건</Link>
              {' '}— 금리 구조, 취급기관 14곳 비교, 정부기여금과 비과세가 금액으로 얼마인지
            </li>
            <li>
              <Link href="/eligibility" className="text-primary underline underline-offset-2">가입 자격</Link>
              {' '}— 나이·개인소득·가구소득 요건과 우대형 판정 기준
            </li>
            <li>
              <Link href="/switch-from-dooyak" className="text-primary underline underline-offset-2">갈아타기</Link>
              {' '}— 청년도약계좌에서 옮길 때의 순서와 판단 기준
            </li>
            <li>
              <Link href="/" className="text-primary underline underline-offset-2">만기수령액 계산기</Link>
              {' '}— 납입액·유형·금리를 넣어 3년 뒤 금액 확인
            </li>
            <li>
              <Link href="/board" className="text-primary underline underline-offset-2">가이드</Link>
              {' '}— 납입 전략, 해지 판단, 사회초년생 월급 관리 등
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">콘텐츠를 만드는 방식</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>
              제도 수치는 금융위원회 보도자료와 서민금융진흥원 안내 등 <strong className="text-foreground">1차 자료를
              근거</strong>로 정리합니다.
            </li>
            <li>
              사이트 전체가 <strong className="text-foreground">하나의 기준값 파일을 공유</strong>합니다. 한 페이지에서
              &lsquo;월 50만원&rsquo;이라고 쓰고 다른 페이지에서 &lsquo;70만원&rsquo;이라고 쓰는 일이
              생기지 않도록 만든 구조입니다.
            </li>
            <li>
              확인되지 않은 항목은 <strong className="text-foreground">쓰지 않습니다.</strong> 은행별 개별 우대 항목처럼
              기관마다 다르고 회차마다 바뀌는 내용은, 확인된 사례만 밝히고 나머지는 각 기관 공시를
              확인하도록 안내합니다.
            </li>
            <li>
              모든 제도 페이지에 <strong className="text-foreground">기준일과 출처 링크</strong>를 함께 싣습니다. 현재
              기준일은 {AS_OF_LABEL}입니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">정보의 한계</h2>
          <p>{DISCLAIMER.long}</p>
          <p className="mt-4">
            특히 청년미래적금은 연 2회(6월·12월) 회차로 운영되며 회차마다 세부 기준과 취급기관이
            조정될 수 있습니다. 본인 상황이 경계선에 있다면 추정하지 마시고, 취급기관이나 서민금융진흥원에
            직접 확인하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">주요 출처</h2>
          <ul className="list-inside list-disc space-y-2">
            {SOURCES.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary underline underline-offset-2"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">운영 및 수익</h2>
          <p>
            본 사이트는 개인이 운영합니다. 회원가입 없이 무료로 이용할 수 있으며, 운영 비용을 충당하기
            위해 Google AdSense 광고를 게재합니다. 광고는 콘텐츠와 분리해 표시하며, 특정 금융기관이나
            상품으로부터 대가를 받고 유리하게 서술하지 않습니다.
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li>운영: 개인 (fundfinpro.com)</li>
            <li>
              문의:{' '}
              <a href="mailto:tlsfkaus0711@gmail.com" className="text-primary underline underline-offset-2">
                tlsfkaus0711@gmail.com
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">오류를 발견하셨다면</h2>
          <p>
            제도 정보는 자주 바뀝니다. 잘못된 수치나 오래된 내용을 발견하셨다면{' '}
            <Link href="/contact" className="text-primary underline underline-offset-2">문의 페이지</Link>를 통해
            알려주세요. 확인 후 수정하고 기준일을 갱신합니다. 개인정보 처리에 관한 내용은{' '}
            <Link href="/privacy-policy" className="text-primary underline underline-offset-2">개인정보 처리방침</Link>을
            참고해 주세요.
          </p>
        </section>
      </div>
    </main>
  )
}
