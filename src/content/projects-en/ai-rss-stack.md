---
name: AI RSS Stack
tagline: Bringing scattered updates back into a reader I control
summary: A self-hosted reading stack built with FreshRSS, RSSHub, changedetection.io, and GitHub release feeds to follow software releases and website changes from one place.
category: lab
tier: lab
order: 7
sourceVisibility: private
maturity: experimental
activity: maintained
demoStatus: unavailable
evidence: planned
license: null
githubUrl: null
demoUrl: null
tech: [FreshRSS, RSSHub, Docker, changedetection.io]
evidenceStats: []
flow: [Choose sources, Generate or monitor feeds, Aggregate and deduplicate, Read on my terms]
relatedPosts: []
accent: '#a16c37'
---

## Motivation

Algorithmic feeds are good at keeping people scrolling, but poor at helping them follow a deliberate set of sources over time. AI RSS Stack puts source selection, deduplication, and read-later decisions back in the reader's hands.

## Components

FreshRSS provides the reading interface. RSSHub covers sites without native feeds, changedetection.io watches ordinary web pages, and GitHub release feeds track new versions of tools and dependencies directly.

This is an evolving personal experiment. The goal is not to collect more information, but to keep up with the projects that matter while reducing noise.
