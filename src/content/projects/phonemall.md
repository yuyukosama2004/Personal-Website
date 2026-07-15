---
name: PhoneMall
tagline: 带 RAG 智能导购的自托管商城
summary: 基于 Spring Cloud 与 Vue 3 的商城系统，覆盖交易、库存和商家运营，并通过基于真实商品数据的检索增强生成提供 AI 导购。
category: application
tier: featured
order: 3
sourceVisibility: private
maturity: alpha
activity: active
demoStatus: unavailable
evidence: verified
license: null
githubUrl: null
demoUrl: null
tech: [Spring Cloud, Vue 3, RAG, MySQL, Docker]
evidenceStats:
  - value: '4'
    label: 后端服务
    measuredAt: 2026-07-15
  - value: '39'
    label: 后端测试
    measuredAt: 2026-07-15
flow: [用户需求, 商品检索, 候选约束, 流式回答, 交易决策]
relatedPosts: []
accent: '#b66b36'
---

## 问题

传统商品筛选要求用户先理解大量参数，普通聊天模型却可能编造商品、价格或库存。PhoneMall 将完整商城交易流程与 RAG 智能导购放在同一套系统中，让模型建议建立在当前商品数据之上。

## 解决方案

系统从当前可售商品中检索候选，再把候选商品和约束交给模型生成建议，并通过 SSE 返回连续回答。模型负责帮助用户理解差异，商品、库存和交易状态仍由业务服务决定。

## 业务闭环

- 用户、商品、SKU、购物车、订单、库存、支付、取消与退款。
- 商家商品管理、履约处理和 AI 配置。
- Spring Cloud 服务治理、MySQL 持久化、Redis 缓存与 Docker 自托管部署。

## 验证证据

截至 2026-07-15 的审查快照包含 4 个后端服务和 39 个后端测试。仓库 CI 还验证后端、前端构建、Compose/Nginx 配置以及源码和镜像安全扫描。仓库目前保持私有，因此页面只展示经过脱敏的案例信息。

## 取舍与限制

当前版本仍处于 Alpha。内存向量检索更适合中小商品集；前端 E2E、检索评测、真实负载基线和统一演示素材仍需补充。页面不把项目描述为公开演示或生产级系统。

## 下一步

- 补充脱敏界面截图、架构图和完整流程视频。
- 建立检索评测与性能基线。
- 增加前端端到端测试。
- 评估持久化向量索引。
