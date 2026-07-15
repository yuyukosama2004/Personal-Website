import type { Locale } from '@/i18n';

export function formatDate(date: Date, locale: Locale = 'zh'): string {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Shanghai',
  }).format(date);
}

export function byPublishedDesc<T extends { data: { publishedAt: Date } }>(a: T, b: T): number {
  return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
}

export function byProjectOrder<T extends { data: { order: number } }>(a: T, b: T): number {
  return a.data.order - b.data.order;
}

export function uniqueTags<T extends { data: { tags: string[] } }>(entries: T[]): string[] {
  return [...new Set(entries.flatMap((entry) => entry.data.tags))].sort((a, b) =>
    a.localeCompare(b, 'en'),
  );
}
