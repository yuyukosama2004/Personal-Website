---
name: ecc-init
tagline: 给项目补上 Claude Code 配置，又不弄乱原来的文件
summary: 一个 Claude Code 配置初始化工具。它会先看项目用了什么技术，再按需添加配置和技能；写入前会备份，改错了也能回滚。
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
    label: 项测试通过
    measuredAt: 2026-07-15
  - value: '3'
    label: 个系统环境
    measuredAt: 2026-07-15
flow: [查看现有项目, 识别技术栈, 备份原有配置, 只写入需要的改动, 必要时一键回滚]
relatedPosts: []
accent: '#4d6f8d'
---

## 为什么做它

给已有项目加入 Claude Code 配置时，最麻烦的不是生成几个文件，而是不能破坏原来的设置。仓库里可能已经有命令、技能和团队约定，初始化工具必须先看清现状再动手。

ecc-init 会识别常见技术栈，只添加当前项目需要的配置和技能。写入前会自动备份，每一步改了什么都能看到，也可以撤销，不需要手动复制文件再祈祷没有覆盖错东西。

## 使用场景

- 给新项目快速准备一套能用的 Claude Code 配置。
- 在保留原有设置的前提下补充命令和技能。
- 用有记录、能回滚的操作替代手动复制文件。

这个项目已经开源，可以直接查看代码和使用说明。
