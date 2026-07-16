import { describe, expect, it } from 'vitest';

import { projectStatusLabel } from './projects';

describe('projectStatusLabel', () => {
  it('does not call an unlicensed public repository open source', () => {
    expect(
      projectStatusLabel(
        {
          sourceVisibility: 'public',
          maturity: 'alpha',
          tier: 'featured',
          license: null,
        },
        'en',
      ),
    ).toBe('PUBLIC REPOSITORY · ALPHA');
  });

  it('labels licensed repositories as open source', () => {
    expect(
      projectStatusLabel(
        {
          sourceVisibility: 'public',
          maturity: 'beta',
          tier: 'featured',
          license: 'MIT',
        },
        'en',
      ),
    ).toBe('OPEN SOURCE · BETA');
  });

  it('distinguishes private case studies from private labs', () => {
    expect(
      projectStatusLabel(
        {
          sourceVisibility: 'private',
          maturity: 'alpha',
          tier: 'more',
          license: null,
        },
        'en',
      ),
    ).toBe('PRIVATE CASE STUDY · ALPHA');
    expect(
      projectStatusLabel(
        {
          sourceVisibility: 'private',
          maturity: 'experimental',
          tier: 'lab',
          license: null,
        },
        'en',
      ),
    ).toBe('PRIVATE LAB · EXPERIMENTAL');
  });

  it('uses natural Chinese labels on the Chinese site', () => {
    expect(
      projectStatusLabel({
        sourceVisibility: 'private',
        maturity: 'experimental',
        tier: 'lab',
        license: null,
      }),
    ).toBe('个人实验 · Experimental');
  });
});
