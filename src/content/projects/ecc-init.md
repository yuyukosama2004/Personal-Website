---
name: ecc-init
tagline: 给 Claude Code 项目安全地补上配置和技能
summary: 一个轻量的 Claude Code 配置初始化工具。它会识别项目技术栈，按需安装配置与技能，并通过备份、增量合并和回滚保护原有设置。
category: engineering
tier: featured
order: 1
sourceVisibility: public
maturity: alpha
activity: active
demoStatus: unavailable
evidence: verified
license: null
githubUrl: https://github.com/yuyukosama2004/ecc-init
demoUrl: null
tech: [Python, Claude Code, CLI, Rollback]
evidenceStats:
  - value: '149'
    label: tests passed
    measuredAt: 2026-07-15
  - value: '3'
    label: OS CI matrix
    measuredAt: 2026-07-15
flow: [扫描现有项目, 识别技术栈, 备份原有配置, 只合并必要改动, 随时可以回滚]
relatedPosts: []
accent: '#4d6f8d'
---

## 为什么做它

给已有仓库加入 Agent 配置时，最怕工具直接覆盖文件。项目里可能已经有命令、技能和团队约定，所以初始化工具应该先了解现状，只改真正需要改的部分。

ecc-init 会识别常见技术栈，按需安装配置与技能，并在写入前创建备份。每次改动都能检查，也能撤销，不需要靠手工复制文件碰运气。

## 使用场景

- 为新项目建立一致的 Claude Code 开发入口。
- 在不破坏已有设置的前提下补充能力。
- 用有记录、能回滚的流程替代手工复制。

这是目前可以直接访问源码的公开项目。
