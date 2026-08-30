---
title: 把沉浸式翻译接回本地：从 Qwen3.5 折腾到 Hy-MT2
description: 用 Ollama 本地模型替换网页翻译云服务：先解决 Qwen3.5 的 thinking 模式、OpenAI 接口兼容与编码问题，再用翻译专用模型 Hy-MT2 去掉代理，最后复盘一次扩展配置被清空的排查。
publishedAt: 2026-08-14
tags: [Ollama, 本地模型, 网页翻译, 排障]
draft: false
featured: false
---

我常读英文技术文档，一直希望沉浸式翻译能用本地模型，把网页翻译从云端 API 搬回自己的电脑：不消耗 API 额度、内容不出本机、提示词和参数都可控。真正做下来才发现，这不是填一个接口地址就能结束的事。

## 第一个坑：接口通了，但一直超时

沉浸式翻译支持 OpenAI 兼容接口，Ollama 也提供 `/v1/chat/completions`，理论上直接连 `http://localhost:11434` 就行。结果测试服务报 `Request timeout after 101000ms`。

命令行的现象是模型先输出一大段：

```text
Thinking...
1. Analyze the Request
2. Draft Translation
```

Qwen3.5 默认进入 thinking 模式，译文塞进了 `reasoning` 字段，而沉浸式翻译需要的 `content` 是空的。提示词里写“不要思考”不解决问题——**提示词是行为引导，不是底层开关**。真正可靠的是在 Ollama 原生 `/api/chat` 里传 `"think": false`。

## 解法：一个本地代理做协议转换

沉浸式翻译只能走 OpenAI 风格接口，不方便传 Ollama 特有参数，所以我写了一个 FastAPI 代理：

```text
沉浸式翻译 → http://127.0.0.1:8008/v1/chat/completions
→ 代理转换请求并强制 think:false
→ Ollama /api/chat → 译文
→ 代理包装回 OpenAI 格式
```

代理不是为了“提升模型能力”，而是解决协议和参数不一致。顺带修掉了两个小坑：中文乱码（用 `json.dumps(..., ensure_ascii=True)` 加 `charset=utf-8`），以及 `keep_alive: 5m` 在冷启动和内存占用之间取平衡。

## 整页慢，往往不是模型单次太慢

单次翻译其实很快，真正慢的是整页请求排队：页面被切成很多段，每段都要重复携带 prompt。但也不能一次塞太多段——技术文档会被翻乱，因为译文要插回原网页，段落合并会破坏 Markdown 层级和对应关系。最终参数是：每秒最多 2 个请求、每次 800–1000 字、2–3 段，技术文档更保守。

## 换模型：让专业模型干专业的事

Qwen3.5 方案能跑，但 thinking、提示词调优和结构保持一直有成本。后来换成 **Hy-MT2（hymt2-q4-fixed）**：一个 1.8B 的翻译专用模型（Apache 2.0），没有 thinking 模式，输出接近纯翻译 API，术语一致性更好。

关键收益是链路变短——不再需要代理：

```text
沉浸式翻译 → http://127.0.0.1:11434/v1/chat/completions → Ollama → hymt2-q4-fixed
```

通用聊天模型做翻译是“兼职”，专用翻译模型做翻译才是“本职”。1.1GB 的 Q4 量化版在 8GB 显存上毫无压力。

## 一次配置被清空的排查

有一天打开沉浸式翻译，本地服务配置不见了，回到了默认免费服务。扩展没更新也没重装，我用 Firefox profile 下扩展的 IndexedDB 还原了证据链：当天 20:46 重新登录、20:49 重新同意用户协议、20:56 配置被重写。结论是**扩展 storage 被清除后重新初始化**——最可能是在 Firefox 里清了浏览数据，连带清掉了扩展存储。

教训有三条：浏览器扩展的 storage 属于站点数据的一部分；重要扩展配置要定期导出备份；本地服务不是常驻自启的，排查前先分清“配置丢了、服务没起，还是模型没加载”。

## 学到的

API 兼容不等于行为完全兼容；本地模型能 `ollama run` 不代表能接进真实应用；thinking 模型不适合直接做翻译服务；结构保持比单句翻译更难。最终方案：

```text
沉浸式翻译 + Ollama + hymt2-q4-fixed
关键检查：Ollama 运行？模型存在？扩展配置在？端口活着？
```
