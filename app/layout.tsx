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
    default: "2026 청년미래적금 - 만기수령계산기",
    template: "%s | 청년미래적금 계산기",
  },
  description:
    "청년미래적금(청년도약계좌) 만기수령액을 실시간으로 확인하세요. 내 월급과 납입액에 따른 기본금리, 매칭지원금, 비과세 혜택까지 한번에 계산해 드립니다.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fundfinpro.com'),
  alternates: {
    canonical: '/',
  },
  keywords: [
    "청년미래적금",
    "청년도약계좌",
    "만기수령액 계산기",
    "청년적금 계산기",
    "정부지원금 계산기",
    "청년재테크",
  ],
  openGraph: {
    title: "청년미래적금 - 만기수령액 계산기",
    description:
      "매월 얼마씩 넣으면 정부지원금은 얼마일까요? 내 만기수령액을 지금 바로 계산해보세요.",
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
    title: "청년미래적금 - 만기수령계산기",
    description:
      "매월 얼마씩 넣으면 5년 뒤 내 돈은 얼마일까? 청년 미래적금 만기수령액을 지금 바로 계산해보세요.",
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
    name: '청년미래적금 - 만기수령계산기 | 2026 청년도약계좌',
    description: '청년미래적금(청년도약계좌) 만기수령액을 실시간으로 확인하세요. 납입액에 따른 금리, 정부지원금, 비과세 혜택까지 한번에 계산해 드립니다.',
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
