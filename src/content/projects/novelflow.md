---
name: NovelFlow
tagline: AI 可以帮忙续写，但不能擅自改掉故事设定
summary: 一个在本地运行的长篇写作工具。它把 AI 的建议、正在修改的草稿和作者已经确认的故事设定分开，避免模型说过的话自动变成“正史”。
category: product
tier: more
order: 4
sourceVisibility: private
maturity: alpha
activity: active
demoStatus: unavailable
evidence: partial
license: null
githubUrl: null
demoUrl: null
tech: [FastAPI, React, TypeScript, SQLite]
evidenceStats: []
flow:
  [
    作者说明这一段想写什么,
    找出相关人物和设定,
    AI 给出候选草稿,
    作者修改并确认,
    把确认后的变化写回设定,
  ]
relatedPosts: [why-ai-writing-needs-canon-boundaries]
accent: '#71834a'
---

## 问题

写长篇不是连续让模型“再写一点”就够了。人物关系、时间线、世界规则和伏笔会在几十万字里互相影响；如果模型每次随口补充的内容都会自动进入后续上下文，一个小错误很快就会越滚越大。

## 怎么做的

NovelFlow 把流程分成建议、审阅和确认三个阶段。模型可以写章节草稿、补充设定或提醒冲突，但只有作者亲自确认的内容才会进入正式设定。项目和历史版本保存在本地 SQLite 中；FastAPI 提供后端接口；React 工作台则会在确认前列出这次改动可能影响什么。

## 现在做到哪里了

- 已经跑通单用户的完整写作流程，资料默认保存在本地。
- 草稿和作者确认过的故事事实分别保存，不会互相混在一起。
- 每次写作只取回相关人物、事件和限制，不把全部资料一股脑塞进上下文。

接下来会继续改进长篇一致性检查，也会让“这次修改会影响哪些旧设定”变得更容易看懂。
