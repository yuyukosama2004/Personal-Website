import type { Locale } from '@/i18n';

type ProjectState = {
  sourceVisibility: 'public' | 'private';
  maturity: 'alpha' | 'beta' | 'experimental';
  tier: 'featured' | 'more' | 'lab';
  license: string | null;
};

export function projectStatusLabel(project: ProjectState, locale: Locale = 'zh'): string {
  if (locale === 'zh') {
    const visibility =
      project.sourceVisibility === 'public'
        ? project.license
          ? '开源项目'
          : '公开仓库'
        : project.tier === 'lab'
          ? '个人实验'
          : '私有项目';
    const maturity = {
      alpha: 'Alpha',
      beta: 'Beta',
      experimental: 'Experimental',
    }[project.maturity];
    return `${visibility} · ${maturity}`;
  }

  const visibility =
    project.sourceVisibility === 'public'
      ? project.license
        ? 'OPEN SOURCE'
        : 'PUBLIC REPOSITORY'
      : project.tier === 'lab'
        ? 'PRIVATE LAB'
        : 'PRIVATE CASE STUDY';

  return `${visibility} · ${project.maturity.toUpperCase()}`;
}
