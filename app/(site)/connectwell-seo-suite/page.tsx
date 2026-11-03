import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { absolute: 'connectwell-seo-suite | 커넥트웰 내부 마케팅 분석 도구' },
  description:
    'connectwell-seo-suite는 커넥트웰 임직원이 업무에 사용하는 내부 마케팅 분석 도구입니다. 주요 기능과 이용 대상, 운영 정보, 개인정보 처리 안내를 확인할 수 있습니다.',
  alternates: { canonical: '/connectwell-seo-suite' },
}

const CONTACT = 'shinsy711@gmail.com'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 border-b border-border pb-2 text-xl font-bold">{title}</h2>
      <div className="space-y-4 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

export default function ConnectwellSeoSuitePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-foreground">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">connectwell-seo-suite</h1>
      <p className="mb-12 leading-relaxed text-muted-foreground">
        커넥트웰 임직원이 업무에 사용하는 내부 마케팅 분석 도구입니다.
      </p>

      <div className="space-y-12">
        <Section title="주요 기능">
          <ul className="list-inside list-disc space-y-2">
            <li>Google Ads 광고 계정 정보와 캠페인 실적 조회</li>
            <li>Google Ads 키워드 검색량 조회와 키워드 조사</li>
            <li>Google Search Console 사이트 목록과 검색 실적 조회</li>
            <li>광고 성과와 검색 성과 분석 자료 작성</li>
          </ul>
        </Section>

        <Section title="이용 대상">
          <p>이 도구는 일반 공개 서비스가 아닙니다. 권한을 받은 커넥트웰 담당자만 사용합니다.</p>
        </Section>

        <Section title="운영 정보">
          <p>
            이 도구는 커넥트웰의 내부 도구이며, 이 안내 페이지는 커넥트웰 직원이 운영하는
            fundfinpro.com에 게시되어 있습니다. fundfinpro.com의 청년미래적금 정보 서비스와 이 도구는
            별개입니다.
          </p>
        </Section>

        <Section title="개인정보 처리">
          <p>
            Google 사용자 데이터 처리 방식은{' '}
            <Link href="/privacy-policy#google-user-data" className="text-primary underline underline-offset-2">
              개인정보 처리방침
            </Link>
            에서 확인할 수 있습니다.
          </p>
        </Section>

        <Section title="문의">
          <p>
            <a href={`mailto:${CONTACT}`} className="text-primary underline underline-offset-2">
              {CONTACT}
            </a>
          </p>
        </Section>
      </div>
    </main>
  )
}
