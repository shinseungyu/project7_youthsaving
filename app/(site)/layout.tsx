import Script from 'next/script'

/**
 * 콘텐츠가 있는 라우트만 감싸는 레이아웃.
 *
 * (site) 는 라우트 그룹이라 URL 에는 나타나지 않는다. 즉 /details, /banks 같은
 * 주소는 그대로 유지되면서, 이 레이아웃이 적용되는 범위만 좁아진다.
 *
 * AdSense 로더를 루트 레이아웃이 아니라 여기에 두는 이유:
 * 루트 레이아웃은 app/not-found.tsx(404)에도 적용된다. 게시자 정책은
 * "게시자 콘텐츠가 없거나 가치가 별로 없는 콘텐츠를 사용한 화면"과
 * "알림이나 네비게이션 목적의 화면"에 광고를 싣는 것을 금지한다.
 * 404 는 정확히 그 화면이므로, 로더 자체가 실리지 않도록 범위를 분리했다.
 *
 * 광고 단위(<ins class="adsbygoogle">)는 아직 두지 않는다.
 * 승인 전에는 슬롯 ID 가 없고, 빈 광고 자리는 오히려 감점 요인이 된다.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5378247298190063"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  )
}
