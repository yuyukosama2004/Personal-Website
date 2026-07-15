---
name: Guarded Agent Pipeline
tagline: A multi-model development pipeline with checks and an explicit human boundary
summary: A workflow that coordinates Codex, Claude Code, and DeepSeek with deterministic verification and human-controlled pushing, so model agreement is never mistaken for engineering correctness.
category: engineering
tier: lab
order: 5
sourceVisibility: private
maturity: experimental
activity: active
demoStatus: unavailable
evidence: partial
license: null
githubUrl: null
demoUrl: null
tech: [TypeScript, MCP, PowerShell, Git]
evidenceStats: []
flow:
  [
    Constrain the task,
    Model implementation,
    Independent review,
    Deterministic checks,
    Human approval,
  ]
relatedPosts: []
accent: '#805d48'
---

## The problem

Having several models review one another broadens the search for mistakes, but it does not guarantee correctness. Models can share blind spots or agree without ever running the tests. Development automation needs checks outside the models themselves.

## Design

The pipeline separates implementation, independent review, deterministic verification, and human approval. External scripts run tests, inspect the working tree, and record artifacts. Models propose and explain changes. The final push remains an explicit human decision.

## Current progress

- A limited, structured set of pipeline operations exposed through MCP.
- Auditable inputs and outputs saved for every stage.
- Explicit states for failure, recovery, and cancellation instead of guessing from chat history.
- A PowerShell recovery path that reduces dependence on one orchestration entry point.

The core question is not how to add another agent, but how to let several uncertain components cooperate inside deterministic guardrails.
