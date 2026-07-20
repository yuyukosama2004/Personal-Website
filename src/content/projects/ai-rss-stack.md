---
name: AI RSS Stack
tagline: 用自己的订阅系统跟踪真正关心的更新
summary: 用 FreshRSS、RSSHub、changedetection.io 和 GitHub Release Feed 搭建自托管订阅系统，在一个地方跟踪软件发布与网页变化。
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
flow: [选择信息源, 生成或监测订阅, 聚合去重, 集中阅读]
relatedPosts: []
accent: '#a16c37'
---

## 动机

算法推荐很擅长让人一直刷下去，却不适合长期跟踪一组明确的信息源。AI RSS Stack 让我自己决定订阅什么、怎样去重，以及什么时候阅读。

## 组成

FreshRSS 负责集中阅读，RSSHub 为没有原生订阅的站点生成 Feed，changedetection.io 监测普通网页的变化，GitHub Release Feed 则直接跟踪依赖和工具的新版本。

这是一个还在调整的个人实验。目标不是收集更多信息，而是减少噪声，持续了解真正重要的项目。
