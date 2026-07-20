---
name: Guarded Agent Pipeline
tagline: 让多个模型协作，但不让它们替人做最终决定
summary: 把 Codex、Claude Code 与 DeepSeek 组织成一套有自动检查、过程记录和人工确认的开发流程，避免把“几个模型都同意”误当成代码一定正确。
category: engineering
tier: lab
order: 6
sourceVisibility: public
maturity: experimental
activity: active
demoStatus: unavailable
evidence: partial
license: null
githubUrl: https://github.com/yuyukosama2004/Guarded-Multi-Model-Development-Pipeline
demoUrl: null
tech: [TypeScript, MCP, PowerShell, Git]
evidenceStats: []
flow: [明确任务范围, 模型实现, 独立复核, 运行自动检查, 人工确认]
relatedPosts: []
accent: '#805d48'
---

## 问题

多个模型互相审查可以发现更多问题，但不能保证结果一定正确。它们可能有相同的盲点，也可能在根本没有运行测试时得出一致意见。因此，开发自动化还需要模型之外的检查机制。

## 设计

这套流程把任务拆成实现、独立复核、自动检查和人工确认。外部脚本负责运行测试、检查工作区并保存过程记录；模型负责提出和解释改动；最终推送仍然由人确认。

## 当前成果

- 用 MCP 暴露有限、结构化的流水线操作。
- 保存每个阶段的输入和输出，方便之后检查。
- 为失败、恢复和取消设置明确状态，而不是靠聊天上下文猜测进度。
- 支持 PowerShell 恢复路径，降低单一编排入口故障的影响。

这个实验的重点不是“再加一个 Agent”，而是让几个不够稳定的模型在自动检查和人工确认之下协作。
