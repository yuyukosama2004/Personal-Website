# Portfolio and GitHub redesign

Decision date: 2026-07-15 (Asia/Shanghai)

Status: **P0A and bilingual copy complete; media-gated promotion remains pending.**

## Positioning

Chinese:

> 我主要做全栈 AI 应用和开发者工具，也会认真处理数据、测试、部署和回滚。

Short version:

> 我做能真正跑起来的 AI 产品。

English:

> I build full-stack AI products and developer tools, with equal attention to data, testing, deployment, and recovery.

## Fact, proposal and gate

- **Fact** is verified from the repository, CI, production site or a reproducible local check.
- **Proposal** is intended copy, layout, metadata or a future public artifact.
- **Gate** must pass before increasing a project's prominence or making a stronger public claim.

Every public number records its value, measurement date and source. Numbers without a current source do not appear on the homepage or GitHub Profile.

## Project hierarchy

| Project                | Current tier | Public evidence                         |
| ---------------------- | ------------ | --------------------------------------- |
| ecc-init               | Featured 1   | Public repository, tests and CI         |
| GroundedSeek           | Featured 2   | Partial case-study evidence             |
| PhoneMall              | Featured 3   | Private repository audit; media pending |
| NovelFlow              | More work    | Partial case-study evidence             |
| Guarded Agent Pipeline | Labs         | Experimental record                     |
| AI RSS Stack           | Labs         | Experimental record                     |

PhoneMall moves to Featured 1 only after it has at least four sanitized screenshots, one architecture diagram and a dated, reproducible test summary. Until then the site must not imply that a public demo exists.

## Project state model

Project content separates:

```yaml
sourceVisibility: public | private
maturity: alpha | beta | experimental
activity: active | maintained | paused
demoStatus: public | internal | unavailable
evidence: verified | partial | planned
license: SPDX identifier | null
```

A public repository without an open-source license is labelled `PUBLIC REPOSITORY`, not `OPEN SOURCE`. The repository owner must choose a license before the label changes.

## Canonical URL

The PhoneMall case-study canonical URL is `/projects/phonemall/`. The previous `/projects/phonemall-ai/` path returns a permanent redirect after the new release exists. Profile, Sitemap, Open Graph and internal links use only the canonical URL.

## Current implementation scope

P0A includes:

- positioning, navigation, SEO and About copy;
- evidence-gated featured order;
- explicit visibility and maturity labels;
- canonical URL migration and link validation;
- GitHub Profile README, Bio, descriptions and topics;
- existing Astro, GitHub Actions, Nginx and self-hosted deployment.

P0B is the real media package required to promote PhoneMall. Fake screenshots or generated product interfaces are not acceptable substitutes.

## Non-goals

- selecting a license without the repository owner's decision;
- changing repository visibility or publishing private source;
- publishing PyPI, npm or other packages;
- renaming internal Java packages during a portfolio change;
- adding tests only to improve a marketing number;
- moving the site to a second hosting platform.

## GitHub execution boundary

Within this approved scope, routine `codex/*` branches, commits, pushes, pull requests, CI waits and green merges may proceed without repeated confirmation.

Separate confirmation is required before changing repository visibility, choosing a license, deleting or renaming repositories, publishing private material, releasing external packages, or changing domains, secrets, default branches or security policy.

Each repository uses its own branch and pull request. Website presentation, product engineering changes and software publishing are not combined in one PR.

## Baseline snapshot

As reviewed on 2026-07-15:

- PhoneMall: private, 109 default-branch commits, 11 tags, 11 releases, latest `v0.7.0-alpha.1`; 4 services and 39 backend tests in the dated project audit.
- ecc-init: public, 25 default-branch commits, no GitHub Release, 149 tests passed and 2 skipped in the dated local audit, no standard open-source license.
- The website contains six project entries and keeps private repository links hidden.
- GitHub Profile README and Website are enabled.
