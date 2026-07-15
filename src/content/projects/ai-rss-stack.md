---
name: AI RSS Stack
tagline: 把分散更新收回自己的订阅系统
summary: 组合 FreshRSS、RSSHub、changedetection.io 与 GitHub Release feeds 的本地订阅栈，用统一入口追踪项目发布和网页变化。
category: lab
tier: lab
order: 6
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
flow: [选择来源, 生成或监测 Feed, 聚合去重, 自主阅读]
relatedPosts: []
accent: '#a16c37'
---

## 动机

算法信息流擅长制造停留，却不擅长让人稳定追踪一组明确来源。AI RSS Stack 将主动选择来源、去重和稍后阅读重新放回使用者手中。

## 组成

FreshRSS 提供阅读入口，RSSHub 补充没有原生 feed 的站点，changedetection.io 监测普通网页变化，GitHub Release feeds 则直接跟踪依赖和工具的新版本。

这是一个持续演化的个人实验：目标不是收集更多信息，而是用更少噪声维持对真正重要项目的了解。
