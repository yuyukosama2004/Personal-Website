---
name: GroundedSeek
tagline: 不只给出答案，还要说清楚答案从哪里来
summary: 一个在本地运行的资料研究工作台，把搜索、网页浏览、引用整理和报告导出串在一起，方便以后回头核对结论。
category: research
tier: featured
order: 2
sourceVisibility: private
maturity: alpha
activity: active
demoStatus: unavailable
evidence: partial
license: null
githubUrl: null
demoUrl: null
tech: [FastAPI, MCP, Playwright, SQLite]
evidenceStats: []
flow:
  [写下研究问题, 搜索并阅读原始资料, 摘录与结论相关的内容, 对照互相矛盾的信息, 保存这一次的研究报告]
relatedPosts: [building-evidence-backed-research-mcp]
accent: '#386d63'
---

## 问题

一个答案读起来很顺，不代表它就是可靠的。做资料研究时，我更想知道每个判断来自哪里、材料是什么时候看到的、不同来源有没有互相矛盾，以及过一段时间能不能重新检查。

## 怎么做的

GroundedSeek 会把一次研究完整保存下来。搜索只是第一步，之后看过哪些网页、摘录了哪些内容、它们支持哪条结论，都会放进同一个项目。人可以在浏览器工作台里整理资料，Agent 也可以通过 stdio MCP 使用一组边界明确的工具。

## 现在做到哪里了

- 按项目保存研究过程，也保留每次更新的版本。
- 可以导出 JSON 和 Markdown，方便自己检查或交给其他工具处理。
- 每段引用都能对应到具体结论，而不是只在文末放一排链接。
- 资料默认保存在本地，不必依赖某个在线聊天窗口长期托管。

目前还在改进三件事：怎样判断来源是否可靠、怎样把互相冲突的信息展示清楚，以及怎样在资料更新后重新运行同一个研究任务。
