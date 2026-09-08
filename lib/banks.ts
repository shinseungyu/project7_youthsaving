/**
 * 취급기관별 금리 구조.
 *
 * 기본금리 연 5%는 전 취급기관 공통(3년 고정)이고, 기관별로 우대금리 한도가 2%p 또는 3%p로 갈린다.
 * 즉 "어느 은행이 유리한가"는 기본금리가 아니라 우대금리 한도와 그 조건을 채울 수 있느냐로 결정된다.
 *
 * 개별 우대 항목(급여이체 몇 %p, 카드 몇 회 등)은 기관마다 다르고 회차마다 바뀌므로,
 * 확인된 사례만 note 에 적고 나머지는 단정하지 않는다. 근거 없는 수치를 채워 넣는 것보다
 * "각 기관 공시를 확인하라"고 안내하는 편이 정확하다.
 */

export interface BankRate {
  name: string
  /** 우대금리 한도(%p) */
  bonusMax: number
  /** 기본 5% + 우대 한도 */
  totalMax: number
  type: '시중은행' | '지방은행' | '인터넷은행' | '특수기관'
  /** 확인된 우대 조건 사례. 없으면 빈 문자열 */
  note?: string
}

export const BASE_RATE = 5.0

/** 우대금리 한도 3%p 그룹 — 최대 연 8% */
const TIER3: BankRate[] = [
  {
    name: 'NH농협은행',
    bonusMax: 3.0,
    totalMax: 8.0,
    type: '시중은행',
    note: '급여·자동이체 실적 문턱이 월 평균 20만원 수준으로 낮은 편이라, 사회초년생이 조건을 채우기 쉬운 곳으로 자주 꼽힙니다.',
  },
  {
    name: '신한은행',
    bonusMax: 3.0,
    totalMax: 8.0,
    type: '시중은행',
    note: '청년도약계좌에서 같은 은행으로 갈아타는 경우에 붙는 우대 폭이 큰 편입니다.',
  },
  { name: '우리은행', bonusMax: 3.0, totalMax: 8.0, type: '시중은행' },
  {
    name: '하나은행',
    bonusMax: 3.0,
    totalMax: 8.0,
    type: '시중은행',
    note: '카드 실적을 결제 "금액"이 아니라 "횟수"(24회차 이상 등)로 보는 항목이 있어, 소액 결제가 잦은 사람에게 유리할 수 있습니다.',
  },
  { name: 'IBK기업은행', bonusMax: 3.0, totalMax: 8.0, type: '시중은행' },
  { name: 'KB국민은행', bonusMax: 3.0, totalMax: 8.0, type: '시중은행' },
  { name: '우체국(우정사업본부)', bonusMax: 3.0, totalMax: 8.0, type: '특수기관' },
]

/** 우대금리 한도 2%p 그룹 — 최대 연 7% */
const TIER2: BankRate[] = [
  { name: 'Sh수협은행', bonusMax: 2.0, totalMax: 7.0, type: '특수기관' },
  { name: 'iM뱅크', bonusMax: 2.0, totalMax: 7.0, type: '지방은행' },
  { name: '부산은행', bonusMax: 2.0, totalMax: 7.0, type: '지방은행' },
  { name: '광주은행', bonusMax: 2.0, totalMax: 7.0, type: '지방은행' },
  { name: '전북은행', bonusMax: 2.0, totalMax: 7.0, type: '지방은행' },
  { name: '경남은행', bonusMax: 2.0, totalMax: 7.0, type: '지방은행' },
  {
    name: '카카오뱅크',
    bonusMax: 2.0,
    totalMax: 7.0,
    type: '인터넷은행',
    note: '우대 한도는 낮지만 조건 구조가 단순해, 실적 조건을 채우기 번거로운 사람은 실수령 기준으로 오히려 유리할 수 있습니다.',
  },
]

export const BANK_RATES: BankRate[] = [...TIER3, ...TIER2]

/** 아직 취급을 시작하지 않은 기관 */
export const UPCOMING_BANKS = [
  { name: '토스뱅크', note: '2026년 12월 회차부터 취급 예정' },
] as const

/**
 * 금리 차이가 만기 수령액에서 실제로 얼마나 벌어지는지.
 * "8% 은행을 무조건 골라라"가 아니라 "차이가 이 정도이니 조건 달성 가능성과 견줘보라"는 뜻으로 쓴다.
 */
export function interestAt(monthlyTotal: number, annualRate: number, months = 36): number {
  return Math.floor((monthlyTotal * ((months * (months + 1)) / 2) * (annualRate / 100)) / 12)
}
