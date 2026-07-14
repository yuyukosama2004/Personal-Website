import { describe, expect, it } from 'vitest';

import { byProjectOrder, byPublishedDesc, formatDate, uniqueTags } from './content';

describe('content utilities', () => {
  it('sorts posts newest first', () => {
    const oldPost = { data: { publishedAt: new Date('2026-01-01') } };
    const newPost = { data: { publishedAt: new Date('2026-07-01') } };

    expect([oldPost, newPost].sort(byPublishedDesc)).toEqual([newPost, oldPost]);
  });

  it('sorts projects by explicit order', () => {
    const second = { data: { order: 20 } };
    const first = { data: { order: 10 } };

    expect([second, first].sort(byProjectOrder)).toEqual([first, second]);
  });

  it('deduplicates tags', () => {
    const posts = [{ data: { tags: ['AI', 'MCP'] } }, { data: { tags: ['AI', 'Research'] } }];

    expect(uniqueTags(posts)).toEqual(['AI', 'MCP', 'Research']);
  });

  it('formats dates in the site timezone', () => {
    expect(formatDate(new Date('2026-07-14T00:00:00+08:00'))).toBe('2026年7月14日');
  });
});
