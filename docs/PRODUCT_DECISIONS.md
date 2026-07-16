# Product decisions after launch

## Portfolio positioning: evidence-gated full-stack AI

The site now positions the owner as a full-stack AI application and agent tooling developer. Project prominence follows public evidence rather than repository size alone: ecc-init remains first while PhoneMall lacks its sanitized media package. PhoneMall can move to first only after the gate recorded in `PORTFOLIO_REDESIGN.md` passes.

Repository visibility, maturity, activity, demo availability and evidence level are separate facts. A public repository without a chosen open-source license must not be labelled Open Source.

## Comments: defer

Comments are not part of the first public release. The current two articles are technical case
studies, and there is no production evidence yet that a discussion surface would improve them.
Adding a third-party widget would introduce moderation work, tracking and another availability
dependency. Questions and corrections can use the linked GitHub repositories for now.

Reconsider comments when at least one of these signals appears for two consecutive months:

- readers repeatedly request an article-level discussion channel;
- article traffic is high enough to sustain useful discussion;
- a privacy-preserving, low-maintenance option can be operated with clear moderation ownership.

## Bilingual site: implemented

Direct user feedback on 2026-07-15 superseded the earlier decision to defer English content. Chinese
remains on the root routes and the complete English site lives under `/en/`. Home, projects, project
details, articles, tags, search, About and RSS all have language-specific content.

Every paired page exposes canonical and `hreflang` links. Shared route IDs keep the language switch on
the equivalent project or article. New project pages and posts should ship in both languages unless a
documented content decision explicitly marks one translation as pending.
