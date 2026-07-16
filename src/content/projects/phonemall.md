---
name: PhoneMall
tagline: 先查真实商品，再让 AI 帮用户挑选
summary: 一套用 Spring Cloud 和 Vue 3 开发的商城系统，包含商品、库存、订单和商家后台。AI 导购只根据当前在售商品给出建议，不会凭空编造商品或库存。
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
flow:
  [了解用户想买什么, 查找当前在售商品, 挑出符合条件的候选, 逐步生成对比建议, 用户自己决定买哪一款]
relatedPosts: []
accent: '#b66b36'
---

## 问题

买手机时，用户往往得先看懂一大堆参数；如果直接问普通聊天模型，它又可能推荐根本不存在的型号，或者给出过时的价格和库存。PhoneMall 想做的是把导购放进商城自己的数据和交易流程里，让回答以当前真实商品为准。

## 怎么做的

系统会先根据用户的预算和需求，从当前可售商品里筛出候选，再把这些商品的真实信息交给模型做比较，并通过 SSE 逐步返回结果。模型负责解释“为什么更合适”，商品、库存和订单状态仍然由普通业务服务管理。

## 已经跑通的功能

- 用户可以浏览商品、选择 SKU、加入购物车、下单、支付、取消和退款。
- 商家可以管理商品、处理订单，也可以调整 AI 导购配置。
- 后端使用 Spring Cloud，数据保存在 MySQL，Redis 用于缓存，整套系统可以通过 Docker 自托管。

## 目前做过的检查

截至 2026-07-15，项目包含 4 个后端服务和 39 项后端测试。CI 会检查后端测试、前端构建、Compose/Nginx 配置，以及源码和镜像的安全扫描。仓库目前还是私有的，所以这里只展示不涉及敏感信息的项目说明。

## 取舍与限制

现在还是 Alpha 版本。内存向量检索只适合中小规模的商品数据；前端端到端测试、检索效果评测、真实负载下的性能数据和完整演示材料都还没有补齐。它目前是一个已经跑通主要流程、但还不能直接拿去生产使用的项目。

## 下一步

- 补充处理过敏感信息的界面截图、架构图和完整演示视频。
- 建立一套检索效果评测和性能基线。
- 增加前端端到端测试。
- 评估是否改用持久化向量索引。
