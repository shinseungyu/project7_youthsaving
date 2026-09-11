/**
 * 텐핑(Tenping) 제휴 배너 — 캠페인별 링크·크리에이티브를 props 로 받는 공용 컴포넌트.
 *
 * - 성과는 텐핑 추적 URL(iryan.kr) 을 통해서만 잡힌다. 자체 폼 수집 금지(캠페인 규정).
 * - 제휴 링크라 rel="sponsored" (AdSense·검색엔진 가이드).
 * - 이미지는 https 로 불러야 혼합 콘텐츠 차단을 피한다. 텐핑 큰 형태 크리에이티브는 1200×628.
 */

type TenpingBannerProps = {
  href: string
  image: string
  caption: string
  cta?: string
  label?: string
  alt?: string
  className?: string
}

export function TenpingBanner({
  href,
  image,
  caption,
  cta = '자세히 보기',
  label,
  alt = caption,
  className = '',
}: TenpingBannerProps) {
  return (
    <aside aria-label={`${label ?? '제휴'} 광고`} className={`flex w-full justify-center ${className}`}>
      <div className="w-full max-w-[800px] rounded-xl border bg-white p-4" style={{ borderColor: '#dae2e3' }}>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wide text-gray-400">{label ?? '제휴 콘텐츠'}</span>
          <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-gray-400">AD</span>
        </div>

        <a href={href} target="_blank" rel="noopener noreferrer sponsored" className="block overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={alt}
            width={1200}
            height={628}
            className="block h-auto w-full"
            loading="lazy"
            decoding="async"
          />
        </a>

        <p className="mt-3 line-clamp-2 text-[15px] leading-snug text-gray-700">{caption}</p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-4 flex items-center justify-between rounded-lg px-5 py-4 no-underline transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#dcf3ff', color: '#234f83' }}
        >
          <span className="text-lg font-medium">{cta}</span>
          <span className="text-2xl leading-none" aria-hidden="true">
            »
          </span>
        </a>
      </div>
    </aside>
  )
}

/** 웹툰 '독고' 캠페인 프리셋. 텐핑 기본 문구("상담 신청하기")는 웹툰과 안 맞아 CTA 를 바꿨다. */
export function WebtoonDokgoBanner({ className = '' }: { className?: string }) {
  return (
    <TenpingBanner
      href="https://iryan.kr/t8g3qeosn7"
      image="https://img.tenping.kr/Content/Upload/Images/2019032616220001_Dis_20190326162247.png"
      caption="웹툰 '독고' — 쌍둥이 형의 복수를 위해 일진회를 박살낸다."
      cta="웹툰 보러가기"
      label="웹툰 · 독고"
      alt="웹툰 독고"
      className={className}
    />
  )
}

export default TenpingBanner
