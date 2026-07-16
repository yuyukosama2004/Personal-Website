---
name: NovelFlow
tagline: 让 AI 帮忙写长篇，但故事仍由作者决定
summary: 一个面向长篇小说的本地优先 AI 写作工具。它把模型建议、待修改草稿和作者确认的故事事实分开，让作者始终掌握最终决定权。
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
flow: [作者提出写作目标, 查找相关设定, AI 生成候选草稿, 作者审阅确认, 更新故事设定]
relatedPosts: [why-ai-writing-needs-canon-boundaries]
accent: '#71834a'
---

## 问题

长篇创作不是连续调用几次模型。人物关系、时间线、世界规则和伏笔会在数十万字里相互影响；如果模型生成的每句话都自动进入上下文，错误也会被不断放大。

## 设计

NovelFlow 把写作流程拆成“提出建议、审阅、接受”三个阶段。模型可以生成章节草稿、补充设定或提醒冲突，但只有作者确认的内容才会成为故事正史。SQLite 保存本地项目和版本，FastAPI 提供后端接口，React 工作台则在确认之前展示改动及其可能影响。

## 当前成果

- 完成单用户、本地优先的端到端创作工作台。
- 在数据层面分开草稿和作者确认的故事事实。
- 写作前只取回相关人物、事件和限制，不把所有资料一股脑塞进上下文。

下一步会继续改善长篇一致性检查，以及让作者更快理解一次修改会影响哪些既有设定。
