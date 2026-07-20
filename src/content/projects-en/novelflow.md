---
name: NovelFlow
tagline: A local writing workspace where the author stays in charge
summary: A local-first AI workspace for long-form fiction that separates model suggestions from accepted story canon, giving the author final authority over every lasting change.
category: product
tier: more
order: 5
sourceVisibility: public
maturity: alpha
activity: active
demoStatus: unavailable
evidence: partial
license: null
githubUrl: https://github.com/yuyukosama2004/novelflow
demoUrl: null
tech: [FastAPI, React, TypeScript, SQLite]
evidenceStats: []
flow: [Author intent, Retrieve relevant canon, AI draft candidates, Author review, Update canon]
relatedPosts: [why-ai-writing-needs-canon-boundaries]
accent: '#71834a'
---

## The problem

Long-form writing is not a chain of isolated model calls. Character relationships, timelines, world rules, and planted clues interact across hundreds of thousands of words. If every generated sentence automatically becomes context, mistakes are amplified too.

## Design

NovelFlow separates proposal, review, and acceptance. The model can draft scenes, suggest world details, and flag conflicts, but only author-approved material enters canon. SQLite stores local projects and versions, FastAPI provides a clear domain interface, and the React workspace shows differences and likely impact before a decision is made.

## Current progress

- An end-to-end, single-user, local-first writing workspace.
- A data boundary between drafts and accepted canon.
- Retrieval of relevant characters, events, and constraints before writing instead of expanding context without limit.

Next steps focus on long-range consistency checks and helping authors understand which established details a proposed change may affect.
