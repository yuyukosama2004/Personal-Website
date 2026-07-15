---
name: GroundedSeek
tagline: Keep every research conclusion traceable to its evidence
summary: A local-first web research service and MCP workspace that organizes search, browsing, evidence capture, version history, and export into a traceable research workflow.
category: research
tier: featured
order: 2
sourceVisibility: private
maturity: alpha
activity: active
demoStatus: unavailable
evidence: partial
license: null
githubUrl: null
demoUrl: null
tech: [FastAPI, MCP, Playwright, SQLite]
evidenceStats: []
flow: [Research question, Search and browse, Evidence records, Resolve conflicts, Versioned report]
relatedPosts: [building-evidence-backed-research-mcp]
accent: '#386d63'
---

## The problem

An answer that sounds plausible is not the same as a research result. Reusable research needs to record where information came from, when it was retrieved, which sources disagree, and whether the conclusion can be checked again later.

## Design

GroundedSeek models a research project as a versioned artifact. Search is only the entry point: browsing history, quoted passages, source metadata, and the final synthesis are stored together. It provides both a browser workspace and a constrained stdio MCP interface for agents.

## Current progress

- Project-based research tasks with version history.
- JSON and Markdown export for review and further processing.
- Direct links between claims and evidence instead of a loose list of sources at the end.
- Local storage for research material, reducing dependence on a hosted chat workspace.

Work continues on source-quality assessment, conflicting-evidence views, and reproducible research runs.
