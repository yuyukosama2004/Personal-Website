---
name: Guarded Agent Pipeline
tagline: 可验证、可审计的多模型研发流水线
summary: 将 Codex、Claude Code 与 DeepSeek 组织成带确定性验证和人工推送边界的研发流程，避免把模型共识误当作工程正确性。
status: experimental
category: engineering
featured: true
order: 3
sourceVisibility: private
githubUrl: null
demoUrl: null
tech: [TypeScript, MCP, PowerShell, Git]
flow: [任务约束, 模型实现, 独立复核, 确定性验证, 人工批准]
relatedPosts: []
accent: '#805d48'
---

## 问题

多个模型互相审查可以扩大观察面，却不能天然保证正确。模型可能共享盲点，也可能在没有运行测试的情况下形成一致意见。研发自动化需要模型之外的裁判。

## 设计

流水线把任务拆成实现、独立复核、确定性验证和人工批准。外部脚本负责运行测试、检查工作树与记录产物；模型负责提出和解释变更；最终 push 保留为清晰的人工边界。

## 当前成果

- 用 MCP 暴露有限、结构化的流水线操作。
- 将每阶段输入输出保存为可审计 artifact。
- 对失败、恢复和取消设计明确状态，而不是依赖聊天上下文猜测。
- 支持 PowerShell 恢复路径，降低单一编排入口故障的影响。

这个项目探索的核心不是“再加一个 Agent”，而是如何让多个不确定组件在确定性护栏里协作。
