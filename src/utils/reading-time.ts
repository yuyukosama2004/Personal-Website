const WORDS_PER_MINUTE = 260;

export function getReadingTime(content: string): number {
  const chineseCharacters = content.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const latinWords = content
    .replace(/[\u3400-\u9fff]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const equivalentWords = chineseCharacters + latinWords;

  return Math.max(1, Math.ceil(equivalentWords / WORDS_PER_MINUTE));
}
