import type { Metadata } from "next"
import { Noto_Sans_KR } from "next/font/google"
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
})

export const metadata: Metadata = {
  title: {
    default: "청년 미래적금 | 2026 정부지원 청년 우대 적금",
    template: "%s | 청년 미래적금",
  },
  description:
    "청년 미래적금으로 최대 연 6% 금리와 정부 지원금 혜택을 받으세요. 만 19~34세 청년이라면 누구나 가입 가능한 청년 우대 적금 상품입니다.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fundfinpro.com'),
  alternates: {
    canonical: '/',
  },
  keywords: [
    "청년 미래적금",
    "청년 적금",
    "정부지원 적금",
    "청년 우대 금리",
    "청년 재테크",
    "적금 추천",
  ],
  openGraph: {
    title: "청년 미래적금 | 정부지원 청년 우대 적금",
    description:
      "최대 연 6% 금리와 정부 지원금 혜택. 만 19~34세 청년이라면 지금 바로 가입하세요.",
    url: '/',
    type: "website",
    locale: "ko_KR",
    siteName: "FundFinPro",
    images: [
      {
        url: 'https://fundfinpro.com/thumb.webp',
        width: 1200,
        height: 630,
        alt: '청년 미래적금 썸네일',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "청년 미래적금 | 정부지원 청년 우대 적금",
    description:
      "최대 연 6% 금리와 정부 지원금 혜택. 만 19~34세 청년이라면 지금 바로 가입하세요.",
    images: ['https://fundfinpro.com/thumb.webp'],
  },
  robots: {
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  verification: {
    google: '여기에_구글_인증코드_입력',
  },
  other: {
    "google-adsense-account": "ca-pub-5378247298190063"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '청년 미래적금 | 정부지원 청년 우대 적금',
    description: '최대 연 6% 금리와 정부 지원금 혜택. 만 19~34세 청년이라면 누구나 가입 가능한 청년 우대 적금 상품입니다.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fundfinpro.com',
  };

  return (
    <html lang="ko">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
        <meta name="naver-site-verification" content="120e4d4a2c794503ebfed7f8b7a5a48fe3c5da1f" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5378247298190063"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${notoSansKR.variable} font-sans antialiased`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
