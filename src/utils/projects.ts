type ProjectState = {
  sourceVisibility: 'public' | 'private';
  maturity: 'alpha' | 'beta' | 'experimental';
  tier: 'featured' | 'more' | 'lab';
  license: string | null;
};

export function projectStatusLabel(project: ProjectState): string {
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
