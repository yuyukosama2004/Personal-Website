---
name: AI RSS Stack
tagline: 自己决定看什么，也自己决定什么时候看
summary: 一套自托管的订阅系统，用 FreshRSS、RSSHub 和 changedetection.io 把软件更新、网页变化集中到一个地方。
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
flow: [挑选想长期关注的信息源, 生成订阅或监测页面变化, 汇总并去掉重复内容, 找时间集中阅读]
relatedPosts: []
accent: '#a16c37'
---

## 动机

算法推荐很会让人一直往下刷，但我想要的是另一种方式：列出自己真正关心的信息源，有更新时收到提醒，没更新时也不用反复去看。

## 怎么搭的

FreshRSS 是统一的阅读入口；没有 RSS 的网站交给 RSSHub；普通网页的变化由 changedetection.io 监测；软件版本则直接订阅 GitHub Release Feed。

这套东西还在边用边调。我的目标不是收集更多内容，而是少刷一点推荐流，同时别错过真正关心的更新。
