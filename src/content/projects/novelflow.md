---
name: NovelFlow
tagline: 把 AI 长篇创作变成由作者掌舵的本地工作台
summary: 面向长篇小说创作的 local-first AI 工作台，用明确的审批边界区分模型建议与故事正史，让作者始终拥有最终决定权。
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
flow: [作者意图, 相关正史检索, AI 候选草稿, 作者审批, 正史更新]
relatedPosts: [why-ai-writing-needs-canon-boundaries]
accent: '#71834a'
---

## 问题

长篇创作不是连续调用几次模型。人物关系、时间线、世界规则和伏笔会在数十万字里相互影响；如果模型生成的每句话都自动进入上下文，错误也会被不断放大。

## 设计

NovelFlow 把工作流拆成“提议、审阅、接受”三个阶段。模型可以给出章节草稿、设定补充和冲突提示，但只有作者确认的内容才进入 canon。SQLite 保存本地项目与版本，FastAPI 提供清晰的领域接口，React 工作台则把差异和影响范围放到决策之前。

## 当前成果

- 完成单用户、本地优先的端到端创作工作台。
- 建立草稿与正史分离的数据边界。
- 支持在写作前回看相关人物、事件和约束，而不是无条件扩张上下文。

下一步会继续改善长篇一致性检查，以及让作者更快理解一次修改会影响哪些既有设定。
