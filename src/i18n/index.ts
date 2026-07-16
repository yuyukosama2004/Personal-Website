export type Locale = 'zh' | 'en';

export const defaultLocale: Locale = 'zh';

export const localeMeta = {
  zh: {
    language: 'zh-CN',
    openGraphLocale: 'zh_CN',
    label: '中文',
  },
  en: {
    language: 'en',
    openGraphLocale: 'en_US',
    label: 'English',
  },
} as const;

export function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh';
}

export function localizePath(pathname: string, locale: Locale): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (locale === 'zh') {
    const withoutEnglishPrefix = normalized.replace(/^\/en(?=\/|$)/, '');
    return withoutEnglishPrefix || '/';
  }
  if (normalized === '/en' || normalized.startsWith('/en/')) return normalized;
  return normalized === '/' ? '/en/' : `/en${normalized}`;
}

export function alternateLocalePath(pathname: string): string {
  return localizePath(pathname, localeFromPath(pathname) === 'zh' ? 'en' : 'zh');
}

export const sharedUi = {
  zh: {
    skipToContent: '跳到正文',
    navigationLabel: '主导航',
    navigation: [
      { path: '/', label: '首页' },
      { path: '/projects', label: '项目' },
      { path: '/blog', label: '文章' },
      { path: '/about', label: '关于我' },
    ],
    searchLabel: '搜索本站',
    themeLabel: '切换明暗主题',
    languageLabel: 'Read in English',
    languageShort: 'EN',
    footerLine: '这里记录项目，也记录那些没那么顺利的部分。',
    about: '关于我',
    socialImageAlt: 'execute42 — 全栈 AI 应用与工程实践',
  },
  en: {
    skipToContent: 'Skip to content',
    navigationLabel: 'Main navigation',
    navigation: [
      { path: '/', label: 'Home' },
      { path: '/projects', label: 'Projects' },
      { path: '/blog', label: 'Writing' },
      { path: '/about', label: 'About' },
    ],
    searchLabel: 'Search this site',
    themeLabel: 'Toggle light or dark theme',
    languageLabel: '切换到中文',
    languageShort: '中',
    footerLine: 'Building full-stack AI products with care for testing, deployment, and recovery.',
    about: 'About',
    socialImageAlt: 'execute42 — full-stack AI products and engineering',
  },
} as const;
