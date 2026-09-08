/**
 * 홈 화면에 실제로 렌더되는 Q&A.
 * FAQPage 스키마는 화면에 보이는 내용과 일치해야 하므로 UI 와 스키마가 이 배열 하나를 공유한다.
 *
 * 수치는 lib/product.ts 의 값과 어긋나면 안 된다.
 * (예전에는 이 파일이 "기본금리 5.0%, 최대 6.0%"라고 적고 있었는데
 *  상세 페이지는 "3.5%/4.5%"라고 적고 있어서 같은 사이트 안에서 답이 두 개였다)
 */
import { PRODUCT } from './product'

const 만원 = (n: number) => `${(n / 10000).toLocaleString()}만원`

export const HOME_FAQS = [
  {
    question: '청년미래적금과 청년도약계좌는 무엇이 다른가요?',
    answer: `가장 큰 차이는 만기입니다. 청년도약계좌가 5년인 반면 청년미래적금은 ${PRODUCT.termLabel}입니다. 대신 월 납입 한도는 도약계좌 70만원, 미래적금 ${만원(PRODUCT.monthlyMax)}으로 미래적금이 더 작습니다. 정부기여금은 납입액 대비 일반형 6%, 우대형 12%가 적용됩니다. 두 상품은 중복 가입이 되지 않으므로 하나를 선택해야 합니다.`,
  },
  {
    question: '금리는 몇 %인가요? 은행마다 다른가요?',
    answer: `기본금리 연 ${PRODUCT.baseRate.toFixed(2)}%는 14개 취급기관이 모두 같고 3년 고정입니다. 은행마다 갈리는 것은 우대금리 한도로, 농협·신한·우리·하나·기업·국민·우체국은 최대 ${PRODUCT.bankBonusMax}%p, 수협·iM·부산·광주·전북·경남·카카오뱅크는 최대 ${PRODUCT.bankBonusMin}%p입니다. 따라서 최고금리는 각각 연 8%와 연 7%가 됩니다. 다만 우대금리는 급여이체·카드 실적 같은 조건을 충족해야 붙습니다.`,
  },
  {
    question: '정부기여금은 얼마나 받나요?',
    answer: `내가 넣은 납입액의 6%(일반형) 또는 12%(우대형)가 매달 더해집니다. 월 한도는 일반형 ${PRODUCT.matchCapGeneral.toLocaleString()}원, 우대형 ${PRODUCT.matchCapPreferred.toLocaleString()}원입니다. 월 ${만원(PRODUCT.monthlyMax)}을 3년간 넣는 우대형이라면 정부기여금만 ${만원(PRODUCT.matchCapPreferred * PRODUCT.termMonths)}이 됩니다. 총급여 ${만원(PRODUCT.preferredSalaryMax)} 이하 재직 청년은 소득 요건만으로 우대형에 해당합니다.`,
  },
  {
    question: '가입 자격은 어떻게 되나요?',
    answer: `만 ${PRODUCT.ageMin}~${PRODUCT.ageMax}세(병역 이행 시 최대 만 ${PRODUCT.ageMaxWithMilitary}세)이면서, 직전 과세기간 총급여 ${만원(PRODUCT.salaryMax)} 이하 또는 종합소득금액 ${만원(PRODUCT.comprehensiveIncomeMax)} 이하여야 합니다. 여기에 가구소득이 기준 중위소득 ${PRODUCT.householdMedianPct}% 이하(맞벌이 2인 가구는 ${PRODUCT.householdMedianPctDualIncome}% 이하)라는 조건도 함께 충족해야 합니다.`,
  },
  {
    question: '월 납입액을 매달 다르게 넣어도 되나요?',
    answer: `됩니다. 자유적립식이라 월 ${만원(PRODUCT.monthlyMax)} 한도 안에서 형편에 맞게 넣으면 되고, 넣지 않는 달이 있어도 계좌는 유지됩니다. 다만 정부기여금이 납입액에 비례하므로 적게 넣으면 기여금도 함께 줄어듭니다. 무리해서 한도를 채우다 중도 해지하는 것보다, 3년간 유지 가능한 금액을 정하는 편이 낫습니다.`,
  },
  {
    question: '중도 해지하면 혜택을 못 받나요?',
    answer:
      '일반 중도 해지는 우대금리가 빠지고 정부기여금과 비과세 혜택도 받지 못하는 것이 원칙입니다. 다만 혼인·출산·사망·해외이주·천재지변·장기입원·퇴직 등 정해진 특별중도해지 사유에 해당하면 혜택을 유지할 수 있습니다. 청년도약계좌에서 청년미래적금으로 갈아타기 위한 해지도 특별중도해지로 인정됩니다.',
  },
  {
    question: '신청은 언제, 어디서 하나요?',
    answer: `신청은 연 2회(6월·12월) 회차로 진행되며, ${PRODUCT.applyChannel}으로만 가능합니다. 2026년 상반기 회차는 6월 22일부터 7월 3일까지 진행됐고, 하반기 회차는 12월로 예정돼 있습니다. 본 사이트를 포함해 어떤 정보 사이트도 가입을 접수하거나 대행하지 않습니다.`,
  },
]

export const homeFaqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOME_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}
