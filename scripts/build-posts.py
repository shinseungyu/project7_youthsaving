# -*- coding: utf-8 -*-
"""
scripts/content/batch*.py 에 나눠 쓴 글을 모아 data/posts.json 을 만든다.

본문을 JSON 에 직접 쓰면 \n 이스케이프 때문에 읽기도 고치기도 어려워서,
파이썬 삼중따옴표로 쓰고 여기서 한 번에 직렬화한다.
"""
import importlib.util
import json
import pathlib
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / 'scripts' / 'content'
OUT = ROOT / 'data' / 'posts.json'

REQUIRED = ('id', 'title', 'date', 'category', 'summary', 'content', 'tags')


def load(path: pathlib.Path):
    spec = importlib.util.spec_from_file_location(path.stem, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod.POSTS


def main() -> int:
    posts = []
    for path in sorted(CONTENT_DIR.glob('batch*.py')):
        posts.extend(load(path))

    seen = set()
    errors = []
    for p in posts:
        for key in REQUIRED:
            if key not in p or not p[key]:
                errors.append(f"id={p.get('id')} 에 {key} 가 없습니다")
        if p['id'] in seen:
            errors.append(f"id 중복: {p['id']}")
        seen.add(p['id'])
        # 본문이 너무 짧으면 "가치 없는 콘텐츠" 판정의 원인이 된다. 최소선을 강제한다.
        if len(p['content']) < 1500:
            errors.append(f"id={p['id']} 본문이 {len(p['content'])}자로 너무 짧습니다")

    if errors:
        print('\n'.join(errors), file=sys.stderr)
        return 1

    posts.sort(key=lambda p: p['id'])
    OUT.write_text(json.dumps(posts, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

    total = sum(len(p['content']) for p in posts)
    print(f'{len(posts)}편, 본문 합계 {total:,}자, 평균 {total // len(posts):,}자')
    for p in posts:
        print(f"  {p['id']:>2}. [{p['category']}] {p['title'][:38]} — {len(p['content']):,}자")
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
