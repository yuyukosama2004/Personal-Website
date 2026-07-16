import { describe, expect, it } from 'vitest';

import { alternateLocalePath, localeFromPath, localizePath } from './index';

describe('localized paths', () => {
  it('detects the locale from the route prefix', () => {
    expect(localeFromPath('/projects/')).toBe('zh');
    expect(localeFromPath('/en/projects/')).toBe('en');
  });

  it('adds and removes the English prefix without changing the content path', () => {
    expect(localizePath('/projects/ecc-init/', 'en')).toBe('/en/projects/ecc-init/');
    expect(localizePath('/en/projects/ecc-init/', 'zh')).toBe('/projects/ecc-init/');
    expect(localizePath('/', 'en')).toBe('/en/');
  });

  it('creates the matching language switch route', () => {
    expect(alternateLocalePath('/blog/example/')).toBe('/en/blog/example/');
    expect(alternateLocalePath('/en/blog/example/')).toBe('/blog/example/');
  });
});
