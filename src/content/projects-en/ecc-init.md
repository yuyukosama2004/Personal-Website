---
name: ecc-init
tagline: Set up rollback-friendly Claude Code configuration in an existing project
summary: A lightweight Claude Code configuration initializer that detects the project stack, installs GSD-first skills, and protects existing configuration through backups, incremental merges, and rollback.
category: engineering
tier: featured
order: 1
sourceVisibility: public
maturity: alpha
activity: active
demoStatus: unavailable
evidence: verified
license: null
githubUrl: https://github.com/yuyukosama2004/ecc-init
demoUrl: null
tech: [Python, Claude Code, CLI, Rollback]
evidenceStats:
  - value: '149'
    label: tests passed
    measuredAt: 2026-07-15
  - value: '3'
    label: OS CI matrix
    measuredAt: 2026-07-15
flow:
  [
    Scan the project,
    Detect the stack,
    Back up configuration,
    Merge incrementally,
    Roll back if needed,
  ]
relatedPosts: []
accent: '#4d6f8d'
---

## Why I built it

Blindly overwriting files is the riskiest way to add agent configuration to an existing repository. A project may already have commands, skills, and team conventions, so an initializer should understand what is there before making the smallest necessary change.

ecc-init detects common technology stacks, installs relevant configuration and skills, and creates a backup before writing. Merge and rollback are first-class operations, keeping an automated configuration change reviewable and reversible.

## Where it helps

- Give a new project a consistent Claude Code entry point.
- Add capabilities without destroying existing settings.
- Replace hard-to-audit manual copying with a reversible process.

This is currently the main project in the portfolio with a publicly accessible source repository.
