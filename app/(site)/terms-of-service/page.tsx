import type { Metadata } from 'next'
import Link from 'next/link'
import { AS_OF_LABEL } from '@/lib/product'
import { breadcrumbLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: '이용약관',
  description:
    'fundfinpro.com 이용약관입니다. 제공 서비스의 범위, 계산 결과의 성격과 한계, 면책 범위, 저작권, 외부 링크와 광고에 관한 사항을 규정합니다.',
  alternates: { canonical: '/terms-of-service' },
}

const CONTACT = 'tlsfkaus0711@gmail.com'

function Article({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 border-b border-border pb-2 text-xl font-bold text-foreground">
        제{n}조 ({title})
      </h2>
      <div className="space-y-4 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd([{ name: '이용약관', path: '/terms-of-service' }])),
        }}
      />

      <h1 className="mb-2 text-3xl font-bold tracking-tight">이용약관</h1>
      <p className="mb-12 text-sm text-muted-foreground">최종 업데이트: {AS_OF_LABEL}</p>

      <div className="space-y-12">
        <Article n={1} title="목적">
          <p>
            본 약관은 <strong className="text-foreground">fundfinpro.com</strong>(이하 &lsquo;본
            사이트&rsquo;)이 제공하는 청년 자산형성 제도 정보 및 계산 서비스의 이용 조건과 절차, 이용자와
            운영자 사이의 권리·의무 및 책임 사항을 정하는 것을 목적으로 합니다.
          </p>
        </Article>

        <Article n={2} title="운영 주체와 사이트의 성격">
          <p>
            본 사이트는 <strong className="text-foreground">개인이 운영하는 정보 제공 사이트</strong>입니다.
            금융위원회, 서민금융진흥원, 청년미래적금 취급 금융기관 등 어떤 기관과도 제휴·위탁·대리 관계가
            없습니다.
          </p>
          <p>
            본 사이트는 금융상품의 가입 신청을 접수하거나 중개·대행하지 않으며, 금융상품 판매업자나
            금융상품자문업자가 아닙니다. 특정 금융기관이나 상품으로부터 대가를 받고 유리하게 서술하지
            않습니다.
          </p>
        </Article>

        <Article n={3} title="제공하는 서비스">
          <ul className="list-inside list-disc space-y-2">
            <li>청년미래적금 등 청년 자산형성 제도의 조건 정리 및 안내</li>
            <li>월 납입액·가입 유형·적용 금리에 따른 만기수령액 계산</li>
            <li>가입 자격 요건 확인용 체크리스트</li>
            <li>취급기관별 우대금리 한도 비교 정보</li>
            <li>납입 전략, 해지 판단 등 관련 가이드</li>
            <li>운영 비용 충당을 위한 광고 게재(Google AdSense)</li>
          </ul>
          <p>
            서비스는 회원가입 없이 무료로 이용할 수 있습니다. 운영자는 서비스의 내용을 변경하거나 중단할
            수 있으며, 중요한 변경이 있을 때는 본 페이지에 게시합니다.
          </p>
        </Article>

        <Article n={4} title="정보의 성격과 한계">
          <p>
            본 사이트에 게재된 제도 정보는 금융위원회 보도자료, 서민금융진흥원 안내 등 공개된 자료를
            바탕으로 정리한 것입니다. 각 페이지에는 정보의 기준일과 출처를 함께 표시합니다.
          </p>
          <p>
            제도의 요건, 금리, 정부기여금, 신청 일정은{' '}
            <strong className="text-foreground">회차마다 조정될 수 있습니다.</strong> 게재 시점 이후 변경된
            내용이 즉시 반영되지 않을 수 있으므로, 실제 가입 전에는 반드시 취급 금융기관 또는 정부 공식
            채널에서 최신 조건을 확인하시기 바랍니다.
          </p>
        </Article>

        <Article n={5} title="계산 결과에 관한 사항">
          <p>
            만기수령액 계산기는 이용자가 입력한 값을 바탕으로 한{' '}
            <strong className="text-foreground">참고용 추정치</strong>를 제공합니다. 단리 기준으로
            산출하며, 정부기여금이 납입액과 함께 적립되는 것으로 가정합니다.
          </p>
          <p>
            실제 지급액은 취급기관의 이자 산정 방식, 정부기여금 적립 시점, 우대금리 조건 충족 여부, 심사
            결과에 따라 달라집니다. 계산 결과는 어떠한 금액도 보장하지 않으며 법적 효력을 갖지 않습니다.
          </p>
          <p>
            계산기와 체크리스트에 입력한 값은 이용자의 브라우저 안에서만 처리되며 서버로 전송되거나
            저장되지 않습니다. 자세한 내용은{' '}
            <Link href="/privacy-policy" className="text-primary underline underline-offset-2">
              개인정보 처리방침
            </Link>
            을 참고해 주세요.
          </p>
        </Article>

        <Article n={6} title="면책">
          <p>
            본 사이트가 제공하는 정보와 계산 결과는 투자 권유나 금융 자문이 아닙니다. 이용자가 본 사이트의
            정보를 근거로 내린 가입·해지·납입액 결정 및 그 결과에 대해 운영자는 책임을 지지 않습니다.
          </p>
          <p>
            다만 운영자는 게재 정보의 정확성을 유지하기 위해 노력하며, 오류를 확인한 경우 수정하고 기준일을
            갱신합니다. 오류 제보는{' '}
            <Link href="/contact" className="text-primary underline underline-offset-2">
              문의 페이지
            </Link>
            로 보내주세요.
          </p>
          <p>
            천재지변, 서버 장애, 호스팅 사업자의 사정 등 운영자가 통제할 수 없는 사유로 서비스가 중단되는
            경우에 대해서도 책임을 지지 않습니다.
          </p>
        </Article>

        <Article n={7} title="이용자의 의무">
          <ul className="list-inside list-disc space-y-2">
            <li>본 서비스를 불법적인 목적으로 이용하지 않을 것</li>
            <li>자동화된 수단으로 과도한 트래픽을 발생시켜 서비스 운영을 방해하지 않을 것</li>
            <li>본 사이트의 콘텐츠를 무단으로 복제·배포·상업적으로 이용하지 않을 것</li>
            <li>본 사이트를 사칭하거나 운영자와의 관계를 사실과 다르게 표시하지 않을 것</li>
          </ul>
        </Article>

        <Article n={8} title="저작권">
          <p>
            본 사이트에 게재된 글, 표, 계산 로직 등 창작물의 저작권은 운영자에게 있습니다. 인용은
            출처(fundfinpro.com)와 원문 링크를 함께 표기하는 조건으로 가능하며, 전문 복제나 재배포는
            사전 동의가 필요합니다.
          </p>
          <p>
            공공기관이 배포한 보도자료·통계 등 제3자의 자료는 해당 기관에 권리가 있으며, 본 사이트는 이를
            근거로 재구성한 내용을 게재합니다.
          </p>
        </Article>

        <Article n={9} title="외부 링크와 광고">
          <p>
            본 사이트는 금융위원회, 서민금융진흥원 등 외부 사이트로 연결되는 링크를 포함합니다. 링크된
            사이트의 내용과 운영에 대해서는 해당 사이트가 책임지며 본 사이트는 책임지지 않습니다.
          </p>
          <p>
            본 사이트는 Google AdSense를 통해 광고를 게재합니다. 광고는 콘텐츠와 구분되어 표시되며, 광고
            내용은 광고주의 책임입니다. 광고 게재로 인한 쿠키 사용에 관한 사항은{' '}
            <Link href="/cookie-policy" className="text-primary underline underline-offset-2">
              쿠키 정책
            </Link>
            에 정리돼 있습니다.
          </p>
        </Article>

        <Article n={10} title="약관의 변경">
          <p>
            운영자는 필요한 경우 본 약관을 변경할 수 있으며, 변경된 약관은 본 페이지에 게시한 시점부터
            적용됩니다. 변경 시 최종 업데이트 일자를 함께 갱신합니다.
          </p>
        </Article>

        <Article n={11} title="준거법 및 분쟁 해결">
          <p>
            본 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련한 분쟁은 관련 법령이 정하는 절차에
            따릅니다. 분쟁이 발생한 경우 우선 아래 연락처를 통해 원만한 해결을 시도합니다.
          </p>
        </Article>

        <Article n={12} title="문의">
          <p>
            본 약관이나 서비스에 관한 문의는 아래로 보내주세요. 영업일 기준 2~3일 이내 답변을 목표로 하고
            있습니다.
          </p>
          <p>
            이메일:{' '}
            <a href={`mailto:${CONTACT}`} className="text-primary underline underline-offset-2">
              {CONTACT}
            </a>
          </p>
        </Article>
      </div>
    </main>
  )
}
