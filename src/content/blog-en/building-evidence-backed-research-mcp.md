---
title: Building an Evidence-backed Web Research MCP
description: Moving from search results to reviewable conclusions requires source snapshots, claim links, conflict handling, and versioned artifacts—not just a browser tool.
publishedAt: 2026-07-14
tags: [MCP, Web Research, Verifiable AI]
draft: false
featured: true
project: grounded-seek
---

Giving an agent a search tool is easy. Getting it to produce research that another person can review is much harder. Search answers “where might I look?” Research must also answer “what supports this claim, do the sources disagree, and can I reproduce the result later?”

GroundedSeek starts by treating evidence as core system data rather than decoration at the end of an answer.

## From link lists to evidence records

A URL alone is not enough to support a conclusion. Pages change, summaries can remove context, and one source may contain material that both supports and weakens a claim.

Each evidence record therefore contains data such as:

```json
{
  "sourceUrl": "https://example.com/document",
  "title": "Document title",
  "retrievedAt": "2026-07-14T10:00:00Z",
  "excerpt": "The relevant passage...",
  "claimIds": ["claim-12"],
  "contentHash": "sha256:..."
}
```

`retrievedAt` records when the source was observed. `contentHash` helps detect later changes, and `claimIds` connects the evidence to specific conclusions. Every important statement in the final report can be traced down to the material that supports it.

## MCP tools should be small and explicit

Giving an agent a general-purpose browser creates a large and difficult-to-control action space. GroundedSeek exposes operations that correspond to research work: create a project, search, capture a source, register evidence, synthesize a report, and export an artifact.

For example, evidence registration can accept a constrained input:

```ts
type AddEvidenceInput = {
  projectId: string;
  sourceUrl: string;
  excerpt: string;
  supports: string[];
  contradicts?: string[];
};
```

This is easier to validate than a tool that accepts arbitrary scripts, and the resulting log is much easier to understand.

## Search, browsing, and synthesis are different stages

A research pipeline needs at least three distinct stages:

1. **Discovery:** use several queries to build a candidate source set.
2. **Verification:** open primary sources and record dates, authors, context, and relevant passages.
3. **Synthesis:** compare evidence, mark agreement, disagreement, and unknowns, then form a conclusion.

If search snippets flow directly into synthesis, truncated search-engine text is treated as primary evidence. Keeping the stages separate creates more state, but prevents this category of error.

## Conflicting evidence is not an exception

Real research regularly encounters sources that disagree. The system should not erase those conflicts to make the answer read more smoothly. It should preserve the evidence on both sides and explain whether the difference may come from measurement, timing, or incentives.

A claim can therefore have a state such as:

- `supported`: sufficiently strong and independent supporting evidence exists;
- `contested`: reliable sources provide conflicting information;
- `insufficient`: there is not enough information to reach a conclusion.

“I do not know yet” must be a stable output of a research system.

## Versioned artifacts make research resumable

A research run is rarely the end. New software versions, regulatory changes, or newly published primary material can change a conclusion. GroundedSeek stores queries, sources, evidence, and reports as one versioned project and supports both Markdown and JSON export.

Markdown is convenient for people and knowledge bases. JSON supports later programmatic work. Both come from the same structured state so they do not drift apart.

## What local-first means in practice

Local-first is not only a privacy preference. It also means the lifespan of research material is not tied to an online chat window. A user can back up the database, search exported files with their own tools, and decide when a sensitive project should be deleted.

Network services still retrieve information; they simply do not own the resulting research asset.

## Deterministic checks still matter

An agent can summarize evidence, but ordinary code should enforce hard constraints: referenced evidence exists, URLs are valid, important claims have sources, and exports satisfy their schema. These checks do not decide which opinion is correct. They stop structural mistakes from quietly entering the final artifact.

An evidence-backed research MCP is ultimately a state machine and a set of data contracts. Browsing matters, but model-generated research becomes reviewable, updatable, and trustworthy only when sources, claims, and versions remain connected.
