---
name: ecc-init
tagline: 为 Claude Code 项目快速建立可回滚配置
summary: 轻量级 Claude Code 配置初始化器，识别项目技术栈，按 GSD-first 思路安装技能，并通过备份、合并和回滚保护已有配置。
status: active
category: engineering
featured: false
order: 5
sourceVisibility: public
githubUrl: https://github.com/yuyukosama2004/ecc-init
demoUrl: null
tech: [Claude Code, Shell, Configuration]
flow: [扫描项目, 识别技术栈, 备份配置, 增量合并, 可选回滚]
relatedPosts: []
accent: '#4d6f8d'
---

## 为什么做它

给已有仓库加入 Agent 配置时，最危险的做法是直接覆盖。项目可能已经拥有命令、技能和团队约定，因此初始化工具首先要理解现状，再做最小增量。

ecc-init 会探测常见技术栈，按需安装配置与技能，并在写入前创建备份。合并与回滚是一等能力，使一次自动化配置变更保持可检查、可撤销。

## 使用场景

- 为新项目建立一致的 Claude Code 开发入口。
- 在不破坏已有设置的前提下补充能力。
- 用可回滚过程替代难以审计的手工复制。

这是目前可以直接访问源码的公开项目。
