---
name: GroundedSeek
tagline: 让每个研究结论都能回到证据
summary: 本地优先的 Web Research 服务与 MCP 工作台，把搜索、浏览、证据整理、版本记录和导出组织成可追溯的研究流程。
status: active
category: research
featured: true
order: 2
sourceVisibility: private
githubUrl: null
demoUrl: null
tech: [FastAPI, MCP, Playwright, SQLite]
flow: [研究问题, 搜索与浏览, 证据单元, 冲突综合, 版本化报告]
relatedPosts: [building-evidence-backed-research-mcp]
accent: '#386d63'
---

## 问题

一个“看起来合理”的答案不等于研究结果。真正可复用的研究需要知道信息来自哪里、何时获取、哪些结论存在冲突，以及后续能否重新验证。

## 设计

GroundedSeek 将研究对象建模为可版本化的 artifact。搜索只是入口，浏览记录、引用片段、来源元数据和最终综合结论会被共同保存。它既提供浏览器工作台，也通过 stdio MCP 向 Agent 暴露受约束的研究能力。

## 当前成果

- 项目化管理研究任务与历史版本。
- 支持 JSON 与 Markdown 导出，便于审计和二次加工。
- 把引用与结论关联，避免只在答案末尾堆一组链接。
- 本地保存研究资料，减少对第三方托管工作区的依赖。

系统仍在持续完善来源质量判断、冲突证据展示和可重复研究能力。
