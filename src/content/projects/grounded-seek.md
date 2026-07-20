---
name: GroundedSeek
tagline: 让研究结论有出处，也能重新核对
summary: 一个本地优先的 Web Research 服务和 MCP 工作台，把搜索、浏览、引用整理、版本记录与导出串成一套可以回头核对的研究流程。
category: research
tier: featured
order: 2
sourceVisibility: public
maturity: alpha
activity: active
demoStatus: unavailable
evidence: partial
license: null
githubUrl: https://github.com/yuyukosama2004/grounded-seek
demoUrl: null
tech: [FastAPI, MCP, Playwright, SQLite]
evidenceStats: []
flow: [提出研究问题, 搜索与浏览, 整理引用材料, 对照冲突信息, 生成版本化报告]
relatedPosts: [building-evidence-backed-research-mcp]
accent: '#386d63'
---

## 问题

一个“看起来合理”的答案不等于研究结果。真正可复用的研究需要知道信息来自哪里、何时获取、哪些结论存在冲突，以及后续能否重新验证。

## 设计

GroundedSeek 把一次研究保存成可以持续更新的项目。搜索只是入口，浏览记录、引用片段、来源信息和最终结论都会放在一起。它既提供浏览器工作台，也通过 stdio MCP 给 Agent 一组范围明确的研究工具。

## 当前成果

- 按项目管理研究任务和历史版本。
- 支持导出 JSON 与 Markdown，方便复核和后续处理。
- 直接关联引用与结论，而不是只在答案末尾堆一组链接。
- 本地保存研究资料，减少对第三方托管工作区的依赖。

目前还在继续完善来源质量判断、冲突信息展示，以及重复执行同一研究任务的能力。
