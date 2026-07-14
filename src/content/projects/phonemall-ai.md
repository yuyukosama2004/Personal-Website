---
name: PhoneMall AI
tagline: 带 RAG 导购能力的微服务电商实践
summary: 基于 Spring Cloud 与 Vue 3 的移动电商系统，覆盖用户、商品和订单领域，并探索 RAG、流式回答与消息驱动业务的结合。
status: beta
category: application
featured: false
order: 4
sourceVisibility: private
githubUrl: null
demoUrl: null
tech: [Spring Cloud, Vue 3, Redis, RabbitMQ, RAG]
flow: [移动商城, 网关与治理, 领域服务, 检索增强, 流式回答]
relatedPosts: []
accent: '#6e6591'
---

## 项目范围

PhoneMall AI 是一个完整业务场景中的全栈练习：前端承载移动商城体验，后端按用户、商品和订单拆分服务，并通过 Nacos、Sentinel、Redis 与 RabbitMQ 处理服务治理、缓存和异步业务。

## AI 能力

项目把商品知识接入 RAG 检索，并使用 SSE 返回连续回答。重点不只是生成文案，而是让回答能够使用当前商品资料，为导购、比较和售后问题提供更贴近业务的数据基础。

它也用于验证一个现实问题：AI 功能进入现有系统时，数据一致性、超时、降级和可观察性往往比提示词本身更重要。
