---
name: Eval42
tagline: Reproducible CI quality gates for AI applications
summary: A standalone, CI-first evaluation tool that runs versioned JSONL cases through declarative HTTP adapters, computes deterministic metrics, compares reviewed baselines, and writes reports.
category: engineering
tier: more
order: 4
sourceVisibility: public
maturity: alpha
activity: active
demoStatus: unavailable
evidence: verified
license: MIT
githubUrl: https://github.com/yuyukosama2004/eval42
demoUrl: null
tech: [Python, JSONL, HTTP, CI]
evidenceStats:
  - value: '85%+'
    label: Test coverage
    measuredAt: 2026-07-18
  - value: '3.11–3.14'
    label: Python CI
    measuredAt: 2026-07-18
flow:
  [
    Load versioned cases,
    Call the target system,
    Compute deterministic metrics,
    Compare baselines and gates,
    Write JSON and Markdown reports,
  ]
relatedPosts: []
accent: '#536f91'
---

## Problem

AI features are often evaluated by trying a few prompts manually. Those checks are difficult to reproduce and cannot reliably answer whether a code change degraded quality, which cases regressed, or whether a release should be blocked.

## Design

Eval42 stores evaluation definitions as version-controlled configuration and JSONL datasets. A constrained HTTP Adapter or an in-process Adapter calls the target, deterministic metrics measure the result, and reviewed baselines feed stable CI exit codes. PhoneMall and GroundedSeek can consume the tool for validation without becoming runtime dependencies.

## Current result

- Ships an installable Alpha CLI and a Python library interface.
- Includes offline fixtures so examples and CI do not depend on external networks or model services.
- Writes JSON and Markdown reports and distinguishes gate failures, startup errors, and unreliable partial execution.
- Verifies Python 3.11–3.14 on Linux CI, with additional Windows and macOS coverage.
- Uses the MIT License and provides an installable wheel through a GitHub prerelease.

## Boundaries

Eval42 does not use an LLM judge by default, upload evaluation data, or decide how the evaluated system should change. It remains Alpha; package-index publication and broader real-system adapters will follow only after the deterministic baseline is stable.
