import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '개인정보 처리방침',
  description:
    'fundfinpro.com이 수집하는 정보의 범위, 이용 목적, 보유 기간과 이용자 권리, Google AdSense·Analytics 등 제3자 쿠키 사용에 관한 안내입니다.',
  alternates: { canonical: '/privacy-policy' },
}

const CONTACT = 'tlsfkaus0711@gmail.com'

function Section({ n, title, id, children }: { n: number; title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="mb-4 border-b border-border pb-2 text-xl font-bold">
        {n}. {title}
      </h2>
      <div className="space-y-4 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-foreground">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">개인정보 처리방침</h1>
      <p className="mb-12 text-sm text-muted-foreground">최종 업데이트: 2026년 11월 3일</p>

      <div className="space-y-12">
        <Section n={1} title="개요">
          <p>
            본 방침은 <strong className="text-foreground">fundfinpro.com</strong>(이하 &lsquo;본
            사이트&rsquo;)이 이용자의 정보를 어떻게 수집·이용·보관·파기하는지 설명합니다. 본 사이트는
            정부·금융기관과 무관한 개인 운영 정보 사이트이며, 금융상품 가입을 접수하거나 대행하지
            않습니다.
          </p>
        </Section>

        <Section n={2} title="수집하지 않는 정보">
          <p>
            본 사이트는 회원가입 절차가 없습니다. 따라서 이름, 주민등록번호, 연락처, 계좌번호 등
            개인을 식별할 수 있는 정보를 직접 수집하지 않습니다.
          </p>
          <p>
            만기수령액 계산기와 자격 체크리스트에 입력하는 금액·소득·체크 항목은{' '}
            <strong className="text-foreground">이용자 브라우저 안에서만 계산되며 서버로 전송되거나
            저장되지 않습니다.</strong> 페이지를 벗어나면 입력값은 사라집니다.
          </p>
        </Section>

        <Section n={3} title="자동으로 수집되는 정보">
          <p>웹사이트 운영과 통계 분석을 위해 아래 정보가 자동으로 수집될 수 있습니다.</p>
          <ul className="list-inside list-disc space-y-2">
            <li>방문 페이지, 방문 일시, 체류 시간, 유입 경로</li>
            <li>IP 주소(일부 또는 익명화된 형태), 브라우저 종류, 운영체제, 기기 유형</li>
            <li>쿠키 및 유사 기술로 저장되는 식별자</li>
          </ul>
        </Section>

        <Section n={4} title="이용 목적">
          <ul className="list-inside list-disc space-y-2">
            <li>사이트 운영 및 오류 개선</li>
            <li>방문자 통계 분석(Google Analytics, Vercel Analytics)</li>
            <li>광고 게재 및 성과 측정(Google AdSense)</li>
          </ul>
          <p>수집된 정보는 위 목적 외의 용도로 이용하지 않습니다.</p>
        </Section>

        <Section n={5} title="제3자 서비스와 쿠키">
          <p>본 사이트는 아래 외부 서비스를 이용하며, 각 서비스는 자체 쿠키를 사용할 수 있습니다.</p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong className="text-foreground">Google AdSense</strong> — 광고 게재. Google을 포함한
              제3자 공급업체는 쿠키를 사용해 이용자의 이전 방문 기록을 바탕으로 광고를 제공할 수
              있습니다.
            </li>
            <li>
              <strong className="text-foreground">Google Analytics</strong> — 방문 통계 분석.
            </li>
            <li>
              <strong className="text-foreground">Vercel Analytics</strong> — 페이지 성능 및 방문 통계
              측정.
            </li>
          </ul>
          <p>이용자는 아래 경로에서 개인 맞춤 광고를 직접 제어할 수 있습니다.</p>
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
                Google 광고 설정(맞춤 광고 사용 중지)
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
          </ul>
        </Section>

        <Section n={6} title="쿠키 거부 방법">
          <p>
            이용자는 브라우저 설정에서 쿠키 저장을 거부하거나 삭제할 수 있습니다. 다만 쿠키를 모두
            차단하면 일부 기능이 정상적으로 동작하지 않을 수 있습니다. 설정 경로는{' '}
            <Link href="/cookie-policy" className="text-primary underline underline-offset-2">
              쿠키 정책
            </Link>{' '}
            페이지에 정리돼 있습니다.
          </p>
        </Section>

        <Section n={7} title="보유 기간 및 파기">
          <p>
            본 사이트는 개인을 식별할 수 있는 정보를 직접 보관하지 않습니다. 통계·광고 목적으로
            수집되는 자료는 각 제3자 서비스의 정책에 따라 보관되며, 해당 서비스에서 정한 기간이 지나면
            삭제되거나 익명 처리됩니다.
          </p>
        </Section>

        <Section n={8} title="제3자 제공">
          <p>
            본 사이트는 이용자의 정보를 판매하거나 대여하지 않습니다. 법령에 따른 요구가 있는 경우를
            제외하고 제3자에게 제공하지 않습니다.
          </p>
        </Section>

        <Section n={9} title="이용자의 권리">
          <p>
            이용자는 자신의 정보에 대한 열람·정정·삭제·처리정지를 요청할 수 있습니다. 다만 본 사이트는
            개인 식별 정보를 보관하지 않으므로, 광고·분석 서비스가 수집한 자료에 대해서는 해당 서비스의
            설정 페이지를 통해 직접 관리하실 수 있습니다. 그 밖의 요청은 아래 이메일로 접수해 주세요.
          </p>
        </Section>

        <Section n={10} title="아동의 개인정보">
          <p>
            본 사이트는 만 14세 미만 아동을 대상으로 하지 않으며, 아동의 개인정보를 의도적으로 수집하지
            않습니다.
          </p>
        </Section>

        <Section n={11} title="외부 링크">
          <p>
            본 사이트는 금융위원회, 서민금융진흥원 등 외부 사이트로 연결되는 링크를 포함합니다. 링크된
            사이트의 개인정보 처리에 대해서는 해당 사이트의 방침이 적용되며 본 사이트는 책임지지
            않습니다.
          </p>
        </Section>

        <Section n={12} title="방침 변경">
          <p>
            본 방침이 변경되는 경우 이 페이지에 변경 내용과 최종 업데이트 일자를 게시합니다. 중요한
            변경이 있을 때는 변경 사항이 시행되기 전에 안내합니다.
          </p>
        </Section>

        <Section n={13} title="Google 사용자 데이터 처리 (connectwell-seo-suite)" id="google-user-data">
          <p>
            이 섹션은 사이트 방문자가 아니라, 커넥트웰의 내부 마케팅 분석 도구 connectwell-seo-suite에
            Google 계정 접근 권한을 부여한 사용자에게 적용됩니다. 이 도구는 커넥트웰의 내부 도구이며, 이
            안내는 커넥트웰 직원이 운영하는 본 사이트에 게시되어 있습니다. 이 방침의 다른 조항 중
            &quot;개인 운영 정보 사이트&quot;와 &quot;개인 식별 정보를 보관하지 않음&quot;에 관한 내용은
            사이트 방문자에게 적용되는 내용이며, 이 도구에는 이 섹션이 적용됩니다.
          </p>
          <p>connectwell-seo-suite는 권한을 받은 Google 계정으로 다음 데이터에 접근합니다.</p>
          <ul className="list-inside list-disc space-y-2">
            <li>Google Ads: 광고 계정 정보, 캠페인 실적, 키워드 검색량 등 관련 데이터</li>
            <li>Google Search Console: 사이트 목록, 검색 실적 데이터</li>
          </ul>
          <p>이용 목적: 광고 성과 분석, 키워드 조사, 검색 성과 분석에만 이용합니다.</p>
          <p>저장: 조회한 데이터는 분석 업무를 위해 저장될 수 있으며, 최대 1년간 보관한 후 삭제합니다.</p>
          <p>
            공유: 법령상 의무가 있는 경우를 제외하고 Google 사용자 데이터를 제3자에게 판매하거나 제공하지
            않습니다. 광고 목적으로도 이용하지 않습니다.
          </p>
          <p>
            권한 철회: Google 계정 권한 페이지(
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              https://myaccount.google.com/permissions
            </a>
            )에서 언제든 접근 권한을 철회할 수 있습니다. 데이터 삭제 요청은{' '}
            <a href="mailto:shinsy711@gmail.com" className="text-primary underline underline-offset-2">
              shinsy711@gmail.com
            </a>
            으로 보내 주십시오.
          </p>
          <p>
            커넥트웰의 Google API 데이터 사용은 제한적 사용(Limited Use) 요건을 포함한 Google API 서비스
            사용자 데이터 정책(
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              https://developers.google.com/terms/api-services-user-data-policy
            </a>
            )을 따릅니다.
          </p>
        </Section>

        <Section n={14} title="문의처">
          <p>
            개인정보 처리와 관련한 문의는 아래로 보내주세요. 영업일 기준 2~3일 이내 답변을 목표로 하고
            있습니다.
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
