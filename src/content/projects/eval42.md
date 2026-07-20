---
name: Eval42
tagline: 把 AI 应用评测变成可复现的 CI 质量门禁
summary: 一个独立的 CI-first AI 评测工具，使用版本化 JSONL 用例、声明式 HTTP 适配器和确定性指标，对照已审阅基线执行质量门禁并生成报告。
category: engineering
tier: more
order: 4
sourceVisibility: public
maturity: alpha
activity: active
demoStatus: unavailable
evidence: verified
license: MIT
githubUrl: https://github.com/yuyukosama2004/eval42
demoUrl: null
tech: [Python, JSONL, HTTP, CI]
evidenceStats:
  - value: '85%+'
    label: 测试覆盖率
    measuredAt: 2026-07-18
  - value: '3.11–3.14'
    label: Python CI
    measuredAt: 2026-07-18
flow: [加载版本化用例, 调用目标系统, 计算确定性指标, 对照基线与门禁, 输出 JSON 和 Markdown 报告]
relatedPosts: []
accent: '#536f91'
---

## 问题

AI 功能很容易停留在“挑几个问题试试看”。这种检查无法稳定复现，也很难在代码变更后回答：质量究竟有没有下降、哪些样例退化、当前结果是否足以阻止发布。

## 设计

Eval42 把评测定义保存为可版本控制的配置和 JSONL 数据集。它通过范围明确的 HTTP Adapter 或应用内 Adapter 调用目标系统，计算确定性指标，对照人工审阅过的基线，并用稳定退出码把结果交给 CI。PhoneMall 与 GroundedSeek 可以作为验证对象，但不是 Eval42 的运行时依赖。

## 当前成果

- 提供可安装的 Alpha CLI，也可以作为 Python 库接入应用。
- 支持离线 fixture，让示例和 CI 不依赖外部网络或模型服务。
- 输出 JSON 与 Markdown 报告，区分质量门禁失败、配置错误和不可靠的部分执行。
- 在 Python 3.11–3.14 的 Linux CI 上验证，并覆盖 Windows 与 macOS 基础运行。
- 以 MIT License 发布，GitHub Prerelease 提供可直接安装的 wheel。

## 边界

Eval42 默认不使用 LLM Judge，不上传评测数据，也不会替用户决定如何修改被测系统。当前版本仍处于 Alpha，公开包索引发布和更多真实系统适配会在已有确定性基线稳定后推进。
