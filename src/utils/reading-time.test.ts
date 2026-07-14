import { describe, expect, it } from 'vitest';

import { getReadingTime } from './reading-time';

describe('getReadingTime', () => {
  it('returns at least one minute for empty content', () => {
    expect(getReadingTime('')).toBe(1);
  });

  it('counts Chinese characters and Latin words', () => {
    const chinese = '测'.repeat(260);
    const english = Array.from({ length: 260 }, () => 'word').join(' ');

    expect(getReadingTime(chinese)).toBe(1);
    expect(getReadingTime(`${chinese}${english}`)).toBe(2);
  });
});
