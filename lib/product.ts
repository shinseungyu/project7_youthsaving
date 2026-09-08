/**
 * 청년미래적금 제도 사실(fact) 단일 소스.
 *
 * 이 파일이 생기기 전에는 홈/상세/자격/전환 페이지가 각자 다른 숫자를 하드코딩하고 있었다.
 * (월 한도 50만 vs 70만, 만기 3년 vs 5년, 기여금 6~12% vs 6/4/3/2%, 금리 5% vs 3.5% 등)
 * 같은 사이트 안에서 숫자가 서로 어긋나면 검색엔진과 광고 심사 양쪽에서 신뢰도를 잃으므로,
 * 제도 수치는 반드시 여기서만 정의하고 각 페이지는 import 해서 쓴다.
 *
 * 수치를 고칠 때는 SOURCES 의 1차 자료(금융위원회 보도자료·서민금융진흥원)를 먼저 확인하고,
 * AS_OF 날짜를 함께 갱신한다.
 */

/** 이 페이지에 실린 제도 정보의 기준일. 화면에 그대로 노출한다. */
export const AS_OF = '2026-09-08'
export const AS_OF_LABEL = '2026년 9월 8일'

export const PRODUCT = {
  name: '청년미래적금',

  /** 만기: 3년(36개월) 고정 */
  termMonths: 36,
  termLabel: '3년(36개월)',

  /** 납입: 자유적립식, 월 최대 50만원 */
  monthlyMax: 500_000,
  monthlyMaxLabel: '월 50만원',

  /** 금리: 전 취급기관 공통 기본금리 연 5%(3년 고정) + 기관별 우대금리 2~3%p */
  baseRate: 5.0,
  bankBonusMin: 2.0,
  bankBonusMax: 3.0,
  rateMin: 5.0,
  rateMax: 8.0,
  rateLabel: '기본 연 5% + 기관별 우대 2~3%p (최대 연 7~8%)',

  /** 정부기여금: 납입액 대비 일반형 6% / 우대형 12% */
  matchGeneral: 0.06,
  matchPreferred: 0.12,
  matchCapGeneral: 30_000,
  matchCapPreferred: 60_000,

  /** 나이: 만 19~34세. 병역 이행 기간만큼 상한 연장(최대 만 39세) */
  ageMin: 19,
  ageMax: 34,
  ageMaxWithMilitary: 39,

  /** 개인소득: 총급여 7,500만원 이하 또는 종합소득금액 6,300만원 이하 */
  salaryMax: 75_000_000,
  comprehensiveIncomeMax: 63_000_000,

  /** 우대형 자동 적용 기준: 총급여 3,600만원 이하 재직 청년 */
  preferredSalaryMax: 36_000_000,

  /** 가구소득: 기준 중위소득 200% 이하 (맞벌이 2인 가구 250% 이하) */
  householdMedianPct: 200,
  householdMedianPctDualIncome: 250,

  /** 이자소득 비과세 (일반 적금은 15.4% 과세) */
  taxFree: true,
  normalTaxRate: 15.4,

  /** 정부 발표 기준 최대 만기 수령액 */
  maturityMaxLabel: '약 2,255만원',

  /** 가입 창구: 취급기관 앱 비대면 */
  applyChannel: '취급기관 모바일 앱(비대면)',
} as const

/** 취급기관. 토스뱅크는 2026년 12월 회차부터 예정. */
export const BANKS = [
  'IBK기업은행',
  'NH농협은행',
  '신한은행',
  '우리은행',
  '하나은행',
  'KB국민은행',
  'iM뱅크',
  '부산은행',
  '경남은행',
  '광주은행',
  '전북은행',
  'Sh수협은행',
  '카카오뱅크',
  '우체국(우정사업본부)',
] as const

export const BANKS_UPCOMING = ['토스뱅크(2026년 12월 예정)'] as const

/** 가입 신청 일정. 연 2회(6월·12월) 운영된다. */
export const SCHEDULE = {
  roundLabel: '연 2회(6월·12월)',
  firstRound: {
    label: '2026년 상반기 1회차',
    period: '2026년 6월 22일 ~ 7월 3일',
    note: '첫 주(6월 22~26일)는 출생연도 끝자리 5부제, 6월 29일부터는 출생연도와 관계없이 신청 가능했습니다.',
    done: true,
  },
  nextRound: {
    label: '2026년 하반기 2회차',
    period: '2026년 12월 (예정)',
    note: '정확한 신청 기간과 5부제 적용 여부는 금융위원회·서민금융진흥원 공지로 확정됩니다.',
    done: false,
  },
} as const

/**
 * 출처. YMYL(금융) 주제라 화면에 링크를 그대로 노출한다.
 * 사이트가 직접 만든 수치가 아니라는 점을 독자와 심사자 모두가 확인할 수 있어야 한다.
 */
export const SOURCES = [
  {
    name: '금융위원회 — 청년미래적금 취급기관별 금리 공시 보도자료',
    url: 'https://www.fsc.go.kr/no010101/87005',
  },
  {
    name: '서민금융진흥원 — 청년미래적금 상품 안내',
    url: 'https://www.kinfa.or.kr/financialProduct/youthFutureSavings.do',
  },
] as const

/** 사이트 성격 고지. 헤더/푸터/본문에서 같은 문구를 재사용한다. */
export const DISCLAIMER = {
  short:
    '본 사이트는 정부·금융기관과 무관한 개인 운영 정보 사이트이며, 가입 신청을 대행하지 않습니다.',
  long:
    '본 사이트(fundfinpro.com)는 청년미래적금 가입을 접수하거나 대행하지 않는 개인 운영 정보 사이트입니다. 금융위원회, 서민금융진흥원, 취급 금융기관 등 어떤 기관과도 제휴·위탁 관계가 없습니다. 게재된 제도 정보는 공개된 정부 보도자료와 취급기관 공시를 정리한 것이며, 계산기 결과는 참고용 추정치입니다. 실제 가입 자격과 적용 금리, 수령액은 취급기관 심사 결과에 따라 달라지므로 가입 전 반드시 해당 금융기관 앱 또는 서민금융진흥원 공식 안내에서 최신 조건을 확인하시기 바랍니다.',
} as const

/** 월 납입액과 유형으로 계산한 월 정부기여금. 계산기와 본문 예시가 같은 함수를 쓴다. */
export function monthlyMatch(monthlyPayment: number, type: 'general' | 'preferred'): number {
  const rate = type === 'preferred' ? PRODUCT.matchPreferred : PRODUCT.matchGeneral
  const cap = type === 'preferred' ? PRODUCT.matchCapPreferred : PRODUCT.matchCapGeneral
  return Math.min(Math.floor(monthlyPayment * rate), cap)
}

/**
 * 만기 수령액 추정.
 *
 * 적금 단리 이자 = 월 적립액 × (n(n+1)/2) × 연이율 / 12.
 * 정부기여금도 매월 함께 적립되는 것으로 보아 이자 계산에 포함한다
 * (이 가정으로 계산해야 정부가 발표한 최대 수령액 약 2,255만원과 근사한 값이 나온다).
 */
export function estimateMaturity(
  monthlyPayment: number,
  type: 'general' | 'preferred',
  annualRate: number,
) {
  const n = PRODUCT.termMonths
  const match = monthlyMatch(monthlyPayment, type)

  const totalPrincipal = monthlyPayment * n
  const totalMatch = match * n
  const totalInterest = Math.floor(
    (monthlyPayment + match) * ((n * (n + 1)) / 2) * (annualRate / 100) / 12,
  )

  return {
    monthlyMatch: match,
    totalPrincipal,
    totalMatch,
    totalInterest,
    /** 비과세라 이자에서 15.4%를 떼지 않는다. 일반 적금 대비 이득을 보여주기 위한 값. */
    taxSaved: Math.floor(totalInterest * (PRODUCT.normalTaxRate / 100)),
    finalAmount: totalPrincipal + totalMatch + totalInterest,
  }
}
