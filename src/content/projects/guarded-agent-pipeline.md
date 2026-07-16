---
name: Guarded Agent Pipeline
tagline: 让几个模型一起写代码，也给它们加上护栏
summary: 一套由 Codex、Claude Code 和 DeepSeek 共同参与的开发流程。模型可以实现和复核代码，但测试、过程记录与最终确认不会交给它们自己决定。
category: engineering
tier: lab
order: 5
sourceVisibility: private
maturity: experimental
activity: active
demoStatus: unavailable
evidence: partial
license: null
githubUrl: null
demoUrl: null
tech: [TypeScript, MCP, PowerShell, Git]
evidenceStats: []
flow: [明确这次要改什么, 一个模型动手实现, 另一个模型独立检查, 脚本运行测试, 由人决定是否接受]
relatedPosts: []
accent: '#805d48'
---

## 问题

让多个模型互相检查，确实有机会多发现一些问题，但“它们都觉得没问题”不等于代码真的没问题。几个模型可能正好共享同一种误解，也可能在没有跑过测试的情况下互相认可。因此，流程里还需要模型之外的硬检查。

## 怎么做的

我把一次任务拆成实现、独立复核、自动检查和人工确认四段。模型负责写代码、找问题和解释改动；外部脚本负责跑测试、检查工作区并保存过程；最后要不要接受和推送，仍然由人决定。

## 现在做到哪里了

- 通过 MCP 提供数量有限、格式明确的操作，不让模型随意控制整个环境。
- 保存每个阶段的输入和输出，之后可以回头检查发生过什么。
- 失败、恢复和取消都有明确状态，不必根据聊天记录猜任务进行到哪一步。
- 主流程出问题时，还可以通过 PowerShell 继续恢复任务。

这个实验不是为了凑更多 Agent，而是想看看：几个并不总是可靠的模型，能不能在测试和人工确认的约束下完成一次相对可控的协作。
