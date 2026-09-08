/**
 * 가이드 카테고리 정의.
 *
 * 게시판 허브와 푸터가 같은 목록을 공유해야, 푸터의 카테고리 링크가 실제로 존재하는
 * 섹션으로 연결된다. (푸터에서 임의의 쿼리스트링을 걸면 아무 데도 가지 않는 링크가 된다)
 */

export interface CategoryDef {
  /** posts.json 의 category 값과 정확히 일치해야 한다 */
  name: string
  /** URL 앵커용 슬러그 */
  slug: string
  /** 허브 페이지에서 카테고리 아래에 노출할 안내문 */
  intro: string
}

export const CATEGORIES: CategoryDef[] = [
  {
    name: '상품 안내',
    slug: 'product',
    intro: '청년미래적금이 어떤 상품이고 기존 제도와 무엇이 다른지부터 확인하세요.',
  },
  {
    name: '가입 조건',
    slug: 'eligibility',
    intro: '나이·소득·가구 요건과 우대형 판정 등 신청 전에 반드시 확인할 조건입니다.',
  },
  {
    name: '상품 비교',
    slug: 'compare',
    intro: '청년도약계좌·일반 적금·파킹통장과 견줘 어디에 얼마를 넣을지 정합니다.',
  },
  {
    name: '납입 전략',
    slug: 'strategy',
    intro: '월급에서 얼마를, 어떤 순서로 넣어야 3년을 끝까지 유지할 수 있는지 다룹니다.',
  },
  {
    name: '해지·변경',
    slug: 'terminate',
    intro: '중도 해지가 고민될 때 확인해야 할 사유와 손실을 줄이는 방법입니다.',
  },
  {
    name: '자산 설계',
    slug: 'planning',
    intro: '적금으로 토대를 만든 뒤 다음 단계로 넘어가는 순서를 정리했습니다.',
  },
]

export const CATEGORY_BY_NAME = new Map(CATEGORIES.map((c) => [c.name, c]))

/** 정의에 없는 카테고리가 생겨도 앵커가 깨지지 않도록 대비한다. */
export function slugForCategory(name: string): string {
  return CATEGORY_BY_NAME.get(name)?.slug ?? encodeURIComponent(name)
}
