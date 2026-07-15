# Personal Website 完整开发计划

> 本文档是 `www.execute42.top` 个人网站项目的规划基线，也是 GitHub
> Issues、Milestones、Pull Requests 和发布验收的依据。

| 项目 | 内容 |
| --- | --- |
| 项目负责人 | `yuyukosama2004` |
| GitHub 仓库 | `yuyukosama2004/Personal-Website` |
| 生产域名 | `https://www.execute42.top` |
| 博客路径 | `https://www.execute42.top/blog` |
| 当前状态 | Production / v1.0.0 |
| 文档版本 | v1.0.0 |
| 最后更新 | 2026-07-15 |

---

## 1. 项目摘要

本项目将建设一个以个人品牌、项目展示和 Markdown 博客为核心的个人网站。网站的主要任务不是简单陈列个人信息，而是建立一条可持续的访问与转化路径：

```text
搜索引擎 / 技术社区 / 社交平台 / GitHub
                    ↓
          博客文章或项目案例页
                    ↓
       产品价值、技术细节、截图和演示
                    ↓
            GitHub 仓库与个人主页
                    ↓
       Follow / Star / 使用 / 交流 / 合作
```

首个正式版本采用静态站点架构，不引入数据库、后台管理系统或长期运行的
Node.js 服务。内容通过 Git 和 Markdown 管理，代码合并到 `main` 后由
GitHub Actions 自动构建并部署到云服务器，最终由 Nginx 提供 HTTPS 访问。

### 1.1 核心目标

1. 清晰表达个人技术定位和长期关注方向。
2. 以项目案例页为中间层，将访客引导至 GitHub。
3. 使用 `.md` / `.mdx` 持续发布技术文章和开发记录。
4. 建立 GitHub 驱动的可审查、可回滚、可持续发布流程。
5. 保持良好的性能、移动端体验、SEO 和可访问性。

### 1.2 建议的个人定位

中文定位：

> 构建可控、可验证、local-first 的 AI 应用与 Agent 开发工具。

英文定位：

> Building controllable, auditable and local-first AI tools.

该定位能够覆盖 NovelFlow、GroundedSeek、Guarded Agent Pipeline、ecc-init、
AI RSS Stack 和 PhoneMall AI 等项目，同时比泛化的“全栈开发者”更有辨识度。

### 1.3 MVP 成功标准

- `www.execute42.top` 可通过 HTTPS 稳定访问。
- 首页能够在 15 秒内回答“我是谁、我做什么、应该看哪个项目”。
- 至少展示 3 个高质量项目案例，其中至少 1 个具有可访问的公开 GitHub 仓库。
- 至少发布 2 篇 Markdown 博客文章。
- 所有主要页面具备正确的 SEO、Open Graph、站点地图和 RSS 信息。
- 推送到 `main` 后可以自动构建和部署，并可回滚至上一版本。
- 部署过程不影响服务器上的现有站点和服务。

---

## 2. 产品边界

### 2.1 首版目标用户

| 用户 | 主要诉求 | 网站应提供的内容 |
| --- | --- | --- |
| 开源工具使用者 | 判断项目是否有用、如何安装 | 功能说明、截图、快速开始、GitHub 链接 |
| 开发者与技术同行 | 了解设计思路和工程质量 | 架构、技术文章、测试与取舍 |
| 招聘方或合作方 | 快速判断能力和经历 | 精选项目、职责、技术栈、联系方式 |
| 搜索引擎访客 | 解决某个具体问题 | 可检索的博客文章、代码示例、关联项目 |

### 2.2 MVP 不包含

- 在线注册、登录和用户系统。
- 数据库驱动的博客后台。
- 在线 Markdown 编辑器。
- 实时抓取 GitHub API 数据。
- 自建评论服务。
- 多语言全文版本。
- 邮件订阅和营销自动化。
- 为追求动效而引入大型前端运行时。

这些能力只有在真实访问数据证明有需求时才进入后续阶段。

---

## 3. 流量与转化设计

### 3.1 流量入口

首版重点建设以下入口：

1. **搜索引擎**：通过问题型技术文章获取长期自然流量。
2. **GitHub**：从个人 Profile README、仓库 README 和 Release 反向链接网站。
3. **技术社区**：在掘金、知乎、V2EX、博客园或其他适合的平台发布摘要并链接原文。
4. **社交分享**：每篇文章和项目页具有正确标题、摘要和 Open Graph 图片。
5. **直接访问**：统一使用 `www.execute42.top` 作为个人品牌入口。

### 3.2 站内转化路径

| 落地页 | 主要内容 | 首要 CTA | 次要 CTA |
| --- | --- | --- | --- |
| 首页 | 定位、精选项目、最新文章 | 查看项目 | 访问 GitHub |
| 项目列表 | 全部项目及状态 | 查看项目详情 | GitHub 主页 |
| 项目详情 | 问题、方案、架构、成果 | 查看源码 / 在线演示 | 阅读相关文章 |
| 博客文章 | 可检索的技术内容 | 查看关联项目 | 查看作者 GitHub |
| 关于页 | 经历、关注方向、联系方式 | GitHub Follow | 联系交流 |

### 3.3 内容到 GitHub 的闭环

每个重点项目应形成以下闭环：

```text
博客文章 → 网站项目页 → GitHub README → 在线演示 / 网站项目页
```

执行规则：

- 每篇项目相关文章至少关联一个项目页。
- 每个项目页只在仓库可公开访问时显示“查看源码”。
- 私有项目显示“项目案例”或“开发中”，不提供失效 GitHub 链接。
- 每个公开仓库 README 应反向链接网站项目页和相关文章。
- GitHub 个人主页应把 `www.execute42.top` 作为 Website。

### 3.4 首阶段衡量指标

北极星指标：**从网站进入 GitHub 项目或个人主页的有效点击量**。

辅助指标：

- 项目页访问量及访问深度。
- 博客文章的搜索入口占比。
- 项目页到 GitHub 的点击率。
- 新访客与回访访客比例。
- RSS 入口点击量。
- 404、失效链接和部署失败次数。

MVP 可以先使用 Nginx 访问日志和 GoAccess 生成聚合报告。需要精确统计 GitHub CTA 时，再引入尊重隐私的事件统计方案。

---

## 4. 信息架构与路由

```text
/
├── /projects
│   └── /projects/[slug]
├── /blog
│   └── /blog/[slug]
├── /tags/[tag]
├── /about
├── /links                 # P1，可选
├── /rss.xml
├── /sitemap-index.xml
└── /404
```

### 4.1 全局导航

```text
首页　项目　博客　关于　[ GitHub ↗ ]
```

规则：

- 桌面端和移动端保持相同的信息层级。
- GitHub 是主转化按钮，但不使用弹窗或强制跳转。
- 当前页面必须具有明确的导航状态。
- 所有外部链接清楚标记，并安全地在新标签页打开。

### 4.2 首页

首页从上到下建议包含：

1. Hero：姓名或网名、个人定位、简短说明、主要 CTA。
2. 精选项目：3 至 4 个，按价值而不是更新时间排序。
3. 最新文章：3 至 5 篇。
4. 技术关注方向：AI Application、Agent Workflow、Local-first、Full-stack。
5. 简短的 About 摘要。
6. GitHub 和联系方式。

首版精选项目顺序：

1. NovelFlow
2. GroundedSeek
3. Guarded Agent Pipeline
4. PhoneMall AI

具体展示顺序可以在内容准备阶段调整。项目源码私有时，页面仍可作为公开案例页存在。

### 4.3 项目列表页

项目列表分为两组：

- **Featured Projects**：能够代表当前能力和定位的重点项目。
- **Labs & Experiments**：ecc-init、AI RSS Stack 等实验性工具。

不为了凑数量展示低辨识度项目。汽车租赁管理系统暂不进入首版公开列表。

### 4.4 项目详情页

每个项目页采用统一结构：

1. 项目名称和一句话价值。
2. 当前状态：Active、Beta、Experimental、Archived。
3. 截图、GIF 或短视频。
4. 要解决的问题。
5. 核心设计与功能。
6. 技术架构和技术栈。
7. 关键工程难点与取舍。
8. 测试、可靠性或安全设计。
9. 在线演示、GitHub、Release 链接。
10. 关联博客文章。

### 4.5 博客列表页

- 默认按发布时间倒序。
- 展示标题、摘要、日期、标签和预计阅读时间。
- 支持草稿过滤，草稿不进入生产构建。
- 标签页属于 MVP，全文搜索属于 P1。
- 首页只展示最新且非草稿文章。

### 4.6 博客文章页

- 支持标准 Markdown 和按需使用 MDX。
- 支持语法高亮、标题锚点、目录和代码复制。
- 显示发布时间、更新时间、标签和阅读时间。
- 文章末尾提供关联项目和 GitHub CTA。
- 提供上一篇 / 下一篇导航。
- 自动生成 canonical、Open Graph 和结构化数据。

### 4.7 关于页

首版包括：

- 简短个人介绍。
- 当前技术方向。
- 代表性项目。
- 技术栈概览。
- GitHub 与可公开的联系方式。

不公开家庭住址、私人手机号、服务器信息等不必要的个人数据。

---

## 5. 内容模型

### 5.1 博客 Frontmatter

```yaml
---
title: "为什么 AI 长篇写作工具不能自动修改正史"
description: "从 NovelFlow 的设计出发，讨论人机协作写作中的控制边界。"
publishedAt: 2026-07-13
updatedAt: 2026-07-13
tags:
  - AI
  - NovelFlow
  - Human-in-the-loop
draft: false
featured: true
project: novelflow
cover: ./cover.webp
---
```

字段规则：

- `title`、`description`、`publishedAt`、`tags` 和 `draft` 必填。
- `updatedAt` 只在有实质性修改时更新。
- `project` 关联项目 slug，不保存完整 URL。
- `cover` 使用仓库内资源，构建时优化。
- Frontmatter 通过 schema 校验，错误时 CI 失败。

### 5.2 项目数据模型

```yaml
name: NovelFlow
slug: novelflow
tagline: 面向本地单用户的 AI 长篇小说创作工作台
summary: 将 AI 草稿、作者批准和故事正史严格分离。
status: active
featured: true
order: 10
sourceVisibility: private
githubUrl: null
demoUrl: null
tech:
  - FastAPI
  - React
  - TypeScript
  - SQLite
relatedPosts: []
```

项目字段由 Astro Content Collections schema 统一验证。页面不得直接依赖构建时
GitHub API；需要展示的描述、状态和链接存放在仓库内容中，避免 API 限流或网络失败
导致构建不稳定。

### 5.3 推荐的首批博客主题

1. 为什么 AI 长篇写作工具不能自动修改“正史”。
2. 构建 evidence-backed、本地优先的 Web Research MCP。
3. 多模型开发流水线如何隔离凭据并验证模型输出。
4. 在 Spring Cloud 电商平台中集成 RAG 智能导购。
5. FreshRSS、RSSHub 与 changedetection.io 的组合实践。
6. Claude Code 项目配置初始化器的设计与取舍。

MVP 至少完成前两篇，其他文章进入发布队列。

---

## 6. 功能范围与优先级

### 6.1 P0：MVP 必须完成

- 响应式首页、项目、博客和关于页。
- 统一导航、页脚和移动端菜单。
- 深色 / 浅色主题，遵循系统偏好并记住用户选择。
- Markdown / MDX 文章构建。
- 博客 Frontmatter schema 校验。
- 代码语法高亮、标题锚点和目录。
- 项目列表与项目详情页。
- 标签页。
- RSS、Sitemap、robots.txt。
- canonical、Open Graph、Twitter Card 和结构化数据。
- 自定义 404 页面。
- 图片优化和延迟加载。
- GitHub CTA 与外部链接安全属性。
- CI 质量检查。
- GitHub Actions 自动部署与回滚说明。
- Nginx、DNS 和 HTTPS 上线。

### 6.2 P1：上线后增强

- Pagefind 或等价的静态全文搜索。
- 项目与博客的关联推荐。
- 隐私友好的访问与 CTA 统计。
- 自动生成文章 Open Graph 图片。
- GitHub Profile README 与仓库 README 反向链接自动检查。
- Giscus 评论，启用前评估访问性和维护成本。
- `/links` 或 `/uses` 页面。

### 6.3 P2：仅在需求成立后实施

- 中英文多语言。
- Newsletter / 邮件订阅。
- Headless CMS 或网页编辑后台。
- 动态 GitHub 活动、贡献图和 Star 数据。
- 自建评论、登录或用户系统。
- 项目在线 Playground。

---

## 7. 技术方案

### 7.1 技术栈

| 层级 | 方案 | 用途 |
| --- | --- | --- |
| 框架 | Astro | 静态页面、内容集合、按需交互 |
| 语言 | TypeScript strict mode | 类型安全和内容 schema |
| 样式 | Tailwind CSS + CSS variables | 响应式布局、设计 token 和主题 |
| 内容 | Markdown / MDX | 博客与项目内容 |
| 代码高亮 | Astro / Shiki | 构建时语法高亮 |
| 包管理器 | pnpm | 确定性依赖安装 |
| 格式化 | Prettier | 统一代码和 Markdown 格式 |
| 静态检查 | `astro check`、ESLint | 类型和代码质量 |
| 测试 | Vitest、Playwright | 单元测试与关键页面 smoke test |
| 搜索 | Pagefind（P1） | 静态全文搜索 |
| Web 服务 | Nginx | HTTPS、缓存、静态文件服务 |
| CI/CD | GitHub Actions | 检查、构建、部署 |

实施时使用当时的稳定版本，并通过 `pnpm-lock.yaml`、Node 版本文件和精确的 CI
版本固定结果。除非组件确实需要客户端状态，不引入 React、Vue 等额外运行时。

### 7.2 架构

```text
Markdown / MDX + 项目数据
             ↓
      Astro 静态构建
             ↓
          dist/
             ↓
 GitHub Actions 通过 SSH/rsync 发布
             ↓
  /var/www/personal-website/releases/<commit>
             ↓
     current 符号链接
             ↓
        Nginx + HTTPS
```

### 7.3 架构原则

- 构建阶段生成 HTML，生产环境不运行 Node.js 应用服务。
- 内容和代码共同版本化。
- 不在浏览器暴露 GitHub Token、模型 Key 或服务器凭据。
- 部署产物不可变；切换 `current` 链接完成原子发布。
- 服务器保留最近若干版本，回滚只切换符号链接。
- 静态内容更新不需要重启 Nginx。

### 7.4 推荐目录结构

```text
Personal-Website/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── pull_request_template.md
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   │   ├── blog/
│   │   └── projects/
│   ├── layouts/
│   ├── pages/
│   │   ├── blog/
│   │   ├── projects/
│   │   ├── about.astro
│   │   └── index.astro
│   ├── styles/
│   ├── utils/
│   └── content.config.ts
├── tests/
│   ├── unit/
│   └── e2e/
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── README.md
└── DEVELOPMENT_PLAN.md
```

---

## 8. 设计与体验原则

### 8.1 视觉方向

首版建议采用“克制的技术感”：

- 内容优先，减少装饰性噪声。
- 清晰的排版层级和足够留白。
- 使用单一主色和少量状态色。
- 项目截图比技术 Badge 更重要。
- 动效只用于状态反馈和层级过渡。
- 深色主题不是单纯反色，需要独立验证对比度。

最终字体、主色和品牌图形在 UI 实施前通过一个设计决策 Issue 确认。

### 8.2 响应式与可访问性

- 以移动端优先方式实现。
- 所有交互可使用键盘完成。
- 保留清晰的焦点状态。
- 使用语义化 HTML 和正确的标题层级。
- 图像具有有意义的 `alt`，装饰图像使用空 `alt`。
- 正文宽度、字号和行高适合中英文长文阅读。
- 动画遵循 `prefers-reduced-motion`。
- 目标达到 WCAG 2.2 AA。

### 8.3 上线前需要准备的素材

- 头像或统一的个人视觉标识。
- 中英文个人简介。
- 每个精选项目至少 1 张高质量截图。
- 每个主项目可选 1 个短 GIF 或视频。
- 网站默认 Open Graph 图片。
- Favicon 和应用图标。

---

## 9. GitHub 项目管理规范

### 9.1 单一事实来源

- 需求和任务：GitHub Issues。
- 阶段目标：GitHub Milestones。
- 工作状态：GitHub Projects 看板。
- 技术和产品决策：Issue 或仓库内 ADR。
- 代码审查：Pull Requests。
- 发布记录：GitHub Releases 和部署记录。
- 长期开发范围：本文档。

聊天记录不是正式需求来源；新的决定需要同步到 Issue、PR 或本文档。

### 9.2 分支策略

| 分支 | 用途 |
| --- | --- |
| `main` | 始终保持可构建、可部署 |
| `codex/*` | Codex 实施的任务 |
| `feat/*` | 人工开发的新功能 |
| `fix/*` | 缺陷修复 |
| `content/*` | 博客和项目内容 |
| `chore/*` | 工具、依赖和维护工作 |

规则：

- 禁止在日常开发中直接提交到 `main`。
- 每个分支对应一个明确 Issue 或小型目标。
- PR 合并前必须通过 CI。
- 首选 Squash Merge，保持主分支历史清晰。
- 分支合并后自动删除。

### 9.3 Commit 规范

建议使用简化的 Conventional Commits：

```text
feat: add project detail pages
fix: correct canonical URL generation
content: publish grounded-seek article
docs: update deployment runbook
chore: upgrade Astro dependencies
```

### 9.4 标签体系

类型标签：

- `type:feature`
- `type:bug`
- `type:content`
- `type:design`
- `type:docs`
- `type:chore`
- `type:security`

领域标签：

- `area:home`
- `area:projects`
- `area:blog`
- `area:seo`
- `area:accessibility`
- `area:ci`
- `area:deploy`
- `area:content`

优先级标签：

- `priority:P0`
- `priority:P1`
- `priority:P2`

状态辅助标签：

- `status:blocked`
- `status:needs-decision`
- `good-first-issue`

### 9.5 GitHub Projects 看板

推荐字段：

- Status：Backlog、Ready、In Progress、In Review、Done。
- Priority：P0、P1、P2。
- Area：Home、Projects、Blog、Content、SEO、CI、Deploy。
- Milestone：M0 至 M5。

任务只有满足以下条件才能进入 Ready：

- 目标明确。
- 验收标准明确。
- 依赖已经完成或已知。
- 不存在阻塞性的产品决策。

### 9.6 Pull Request 要求

每个 PR 应说明：

- 改了什么。
- 为什么改。
- 对用户或开发流程有什么影响。
- 如何验证。
- 截图或录屏（涉及 UI 时）。
- 关联 Issue。
- 风险和回滚方式（涉及部署时）。

### 9.7 Definition of Done

一个任务只有同时满足以下条件才算完成：

- 实现符合 Issue 验收标准。
- 相关代码、内容和配置已进入 PR。
- 格式、类型检查、测试和构建通过。
- 新页面完成桌面端和移动端检查。
- 无新增控制台错误和明显无效链接。
- 必要文档已更新。
- PR 已审查并合并。
- 如已部署，生产环境 smoke test 通过。

---

## 10. CI/CD 与发布方案

### 10.1 Pull Request CI

所有面向 `main` 的 PR 执行：

1. Checkout。
2. 安装固定 Node 和 pnpm 版本。
3. `pnpm install --frozen-lockfile`。
4. 格式检查。
5. ESLint。
6. `astro check`。
7. 单元测试。
8. `pnpm build`。
9. 检查内部链接和关键外部链接。
10. 对关键路由执行 Playwright smoke test。

### 10.2 生产部署

触发条件：

- PR 合并到 `main` 后自动部署。
- 支持 `workflow_dispatch` 手动重试或回滚。
- 使用 `concurrency` 防止两个生产部署并行。

部署步骤：

1. 在 GitHub Actions 构建，而不是在低配服务器构建。
2. 保存 `dist/` 为工作流产物。
3. 使用专用部署用户通过 SSH 上传到新 release 目录。
4. 验证产物包含 `index.html`、404 和静态资源。
5. 原子切换 `current` 符号链接。
6. 请求首页、博客和项目页执行 smoke test。
7. 失败时恢复上一 release。
8. 保留最近 5 个版本，清理更旧版本。

### 10.3 GitHub Secrets

建议使用：

```text
DEPLOY_HOST
DEPLOY_PORT
DEPLOY_USER
DEPLOY_SSH_KEY
DEPLOY_PATH
```

安全要求：

- 不把现有 root SSH 密钥放入 GitHub。
- 创建权限受限的专用部署用户。
- 部署用户只写网站目录，不具有任意 sudo 权限。
- Workflow 默认权限设置为 `contents: read`。
- Secret 不写入日志、Markdown、`.env.example` 或构建产物。
- 可用时使用 GitHub Environment 管理生产部署和审批规则。

### 10.4 回滚

回滚不重新构建旧代码，而是选择已有 release：

```text
/var/www/personal-website/
├── current -> releases/<current-commit>
└── releases/
    ├── <previous-commit>
    └── <current-commit>
```

切换前后都执行本地文件校验和 HTTP smoke test，并在部署日志中记录 commit SHA。

---

## 11. 域名、服务器与 Nginx

### 11.1 域名策略

- 个人网站和博客统一使用 `www.execute42.top`。
- 博客位于 `/blog`，不单独维护 `blog.execute42.top`。
- 如未来需要，可将 `blog.execute42.top` 301 跳转到 `www.execute42.top/blog`。
- 现有根域名和其他子域名保持不变。

### 11.2 DNS 与证书

上线任务包括：

1. 为 `www.execute42.top` 创建指向云服务器的 DNS 记录。
2. 等待 DNS 解析生效。
3. 创建独立 Nginx `server` 配置。
4. 签发并自动续期 `www.execute42.top` HTTPS 证书。
5. 将 HTTP 301 跳转到 HTTPS。
6. 验证证书续期任务。

### 11.3 Nginx 原则

- 新增独立虚拟主机，不覆盖已有站点配置。
- 修改前备份相关配置。
- 每次修改执行 `nginx -t`。
- 只有配置测试成功才 reload。
- HTML 使用较短缓存，带 hash 的静态资源使用长期不可变缓存。
- 开启 Brotli（可用时）或 Gzip。
- 设置合理的安全响应头和自定义 404。
- 不公开目录列表、源码文件、Git 元数据和环境文件。

### 11.4 合规检查

如果服务器位于中国大陆，域名解析和公开访问前需要根据云服务商及主管部门要求确认备案与相关合规状态。该项作为上线 Gate 处理，不在代码中硬编码任何备案信息。

---

## 12. SEO 与内容发布

### 12.1 技术 SEO

- 每个页面具有唯一 `title` 和 `description`。
- 使用绝对 canonical URL。
- 自动生成 Sitemap 和 RSS。
- `robots.txt` 指向 Sitemap。
- 使用语义化 URL，不在 URL 中使用日期和无意义 ID。
- 文章使用 `BlogPosting` 结构化数据。
- 项目页使用适合的 `SoftwareApplication` 或 `SoftwareSourceCode` 数据。
- 关于页提供 `Person` 数据。
- 草稿、预览页和错误页不得进入索引。
- 页面标题和描述变更需要在 PR 中审查。

### 12.2 内容质量要求

每篇技术文章至少包含：

- 明确的问题或目标。
- 可复现的背景和环境。
- 核心方案与必要代码。
- 取舍、限制或失败经验。
- 可执行的结论。
- 关联项目或 GitHub 链接。

不发布只有 AI 生成、未经实际验证的教程。

### 12.3 发布流程

```text
创建 content/* 分支
        ↓
新增 Markdown + 图片
        ↓
本地预览与链接检查
        ↓
Pull Request 内容审阅
        ↓
合并 main
        ↓
自动部署、RSS 和 Sitemap 更新
        ↓
技术社区发布摘要并链接原文
```

---

## 13. 性能、质量与测试标准

### 13.1 性能预算

- 关键页面 Lighthouse Performance、Accessibility、Best Practices、SEO 目标均不低于 95。
- LCP 目标低于 2.5 秒。
- CLS 目标低于 0.1。
- INP 目标低于 200 毫秒。
- 首页不因装饰性功能引入大型客户端 JavaScript。
- 图片优先输出 AVIF / WebP，并提供尺寸属性避免布局偏移。
- 字体数量和字重保持克制，优先使用系统字体或本地托管字体。

### 13.2 测试层级

| 层级 | 覆盖内容 |
| --- | --- |
| Schema | 博客和项目 Frontmatter |
| Unit | URL、日期、排序、阅读时间等工具函数 |
| Build | Astro 完整生产构建 |
| Link | 内部链接、图片路径和关键外部链接 |
| E2E | 首页、项目列表、项目详情、博客、404 |
| Accessibility | 键盘导航、标题结构、对比度和自动扫描 |
| Production smoke | HTTPS、首页、文章页、静态资源、响应头 |

### 13.3 支持范围

- 当前稳定版 Chrome、Edge、Firefox、Safari。
- iOS Safari 和 Android Chrome 的常见屏幕尺寸。
- JavaScript 禁用时，核心内容仍应可阅读和导航。

---

## 14. 安全与隐私

- 仓库中不提交 API Key、SSH Key、Token、真实 `.env` 和生产配置。
- 启用 Dependabot 或等价的依赖更新机制。
- 定期执行依赖审计和 secret scan。
- Markdown 内容来自受信仓库，不允许未经处理的访客 HTML 输入。
- 外部链接使用必要的 `rel` 属性。
- 配置 Content Security Policy，并按实际第三方资源逐项放行。
- 不在前端调用需要私密 Token 的 GitHub API。
- 评论、统计和第三方脚本启用前完成隐私评估。
- 项目截图、字体和商品图片在公开前确认使用权。
- 联系方式采用专用公开邮箱，避免暴露私人信息。

---

## 15. 里程碑与 Issue Backlog

下列编号用于创建 GitHub Issues。Issue 创建后，以 GitHub 编号为准，并在本文档或 Project 中建立对应关系。

### M0：Planning & Repository Foundation

| ID | Issue | 优先级 | 依赖 | 验收标准 |
| --- | --- | --- | --- | --- |
| WEB-001 | 确认个人名称、简介、头像和公开联系方式 | P0 | 无 | 首页所需身份文案已确认 |
| WEB-002 | 确认视觉方向、主色和字体方案 | P0 | WEB-001 | 形成可执行设计决策 |
| WEB-003 | 初始化 Astro、TypeScript 和 pnpm | P0 | 规划批准 | 本地可运行、可构建 |
| WEB-004 | 建立格式、Lint、类型和测试命令 | P0 | WEB-003 | 单一质量命令可执行 |
| WEB-005 | 创建 Issue、PR 模板和标签体系 | P0 | 无 | GitHub 工作流可用 |
| WEB-006 | 配置 GitHub Actions CI | P0 | WEB-003、WEB-004 | PR 自动检查通过 |

### M1：Design System & Core Layout

| ID | Issue | 优先级 | 依赖 | 验收标准 |
| --- | --- | --- | --- | --- |
| WEB-101 | 建立颜色、排版、间距和圆角 token | P0 | WEB-002 | Light/Dark token 完整 |
| WEB-102 | 实现全局 Layout、Header 和 Footer | P0 | WEB-101 | 桌面和移动端导航可用 |
| WEB-103 | 实现主题切换 | P0 | WEB-101 | 遵循系统偏好并持久化 |
| WEB-104 | 建立 SEO 和社交分享基础组件 | P0 | WEB-102 | 页面可设置完整元信息 |
| WEB-105 | 实现自定义 404 | P0 | WEB-102 | 无效路由返回正确页面 |

### M2：Home & Projects

| ID | Issue | 优先级 | 依赖 | 验收标准 |
| --- | --- | --- | --- | --- |
| WEB-201 | 建立项目 Content Collection schema | P0 | WEB-003 | 无效数据使构建失败 |
| WEB-202 | 实现首页 Hero 和 CTA | P0 | WEB-001、WEB-102 | 定位和主 CTA 清晰 |
| WEB-203 | 实现首页精选项目区域 | P0 | WEB-201 | 可配置项目顺序和状态 |
| WEB-204 | 实现项目列表页 | P0 | WEB-201 | Featured 与 Labs 分组正确 |
| WEB-205 | 实现项目详情页 | P0 | WEB-201 | 包含案例结构和关联内容 |
| WEB-206 | 实现 About 页面 | P0 | WEB-001 | 信息完整且无敏感数据 |

### M3：Markdown Blog

| ID | Issue | 优先级 | 依赖 | 验收标准 |
| --- | --- | --- | --- | --- |
| WEB-301 | 建立 Blog Content Collection schema | P0 | WEB-003 | 草稿和字段验证正确 |
| WEB-302 | 实现博客列表和文章页 | P0 | WEB-301 | Markdown 正常生成页面 |
| WEB-303 | 实现代码高亮、目录和标题锚点 | P0 | WEB-302 | 长文章阅读体验完整 |
| WEB-304 | 实现标签页和文章关联 | P0 | WEB-302 | 标签路由和关联项目正确 |
| WEB-305 | 生成 RSS、Sitemap 和 robots.txt | P0 | WEB-302 | 输出可验证且 URL 正确 |
| WEB-306 | 添加文章结构化数据和社交卡片 | P0 | WEB-104、WEB-302 | 分享预览和 schema 正确 |
| WEB-307 | 实现静态全文搜索 | P1 | WEB-302 | 可检索标题和正文 |

### M4：Content Preparation

| ID | Issue | 优先级 | 依赖 | 验收标准 |
| --- | --- | --- | --- | --- |
| WEB-401 | 完成 NovelFlow 项目案例 | P0 | WEB-205 | 文案、架构和截图齐全 |
| WEB-402 | 完成 GroundedSeek 项目案例 | P0 | WEB-205 | 文案、架构和截图齐全 |
| WEB-403 | 完成 Guarded Agent Pipeline 项目案例 | P0 | WEB-205 | 文案、架构和截图齐全 |
| WEB-404 | 完成 PhoneMall AI 项目案例 | P1 | WEB-205 | 文案、架构和截图齐全 |
| WEB-405 | 发布首篇 NovelFlow 文章 | P0 | WEB-302、WEB-401 | 生产构建中可访问 |
| WEB-406 | 发布首篇 GroundedSeek 文章 | P0 | WEB-302、WEB-402 | 生产构建中可访问 |
| WEB-407 | 准备头像、Favicon 和默认 OG 图片 | P0 | WEB-002 | 所有核心视觉资源可用 |

### M5：Deployment & Launch

| ID | Issue | 优先级 | 依赖 | 验收标准 |
| --- | --- | --- | --- | --- |
| WEB-501 | 创建受限部署用户和目录结构 | P0 | 无 | 无需 root 即可发布网站 |
| WEB-502 | 配置 `www` DNS 和 HTTPS | P0 | 合规确认 | 域名证书有效 |
| WEB-503 | 新增独立 Nginx Virtual Host | P0 | WEB-501、WEB-502 | 不影响已有站点 |
| WEB-504 | 创建 GitHub Actions 部署流程 | P0 | WEB-006、WEB-501 | main 合并后自动发布 |
| WEB-505 | 实现 release 保留与回滚 | P0 | WEB-504 | 可回滚到上一版本 |
| WEB-506 | 执行性能、SEO、安全和无障碍审计 | P0 | M1-M4 | 发布 Gate 全部通过 |
| WEB-507 | 完成生产 smoke test 和正式发布 | P0 | WEB-506 | 域名和核心页面稳定 |

### M6：Growth & Iteration

| ID | Issue | 优先级 | 依赖 | 验收标准 |
| --- | --- | --- | --- | --- |
| WEB-601 | 建立匿名访问和 GitHub CTA 统计 | P1 | WEB-507 | 可形成月度流量报告 |
| WEB-602 | 完善 GitHub Profile README | P1 | WEB-507 | 主页链接网站和主项目 |
| WEB-603 | 为公开仓库增加网站反向链接 | P1 | WEB-507 | 链接检查通过 |
| WEB-604 | 评估并接入评论系统 | P2 | 有真实需求 | 隐私和维护成本可接受 |
| WEB-605 | 评估中英文多语言 | P2 | 有海外访问数据 | 范围和翻译流程明确 |

---

## 16. 预计节奏

估算以“有效开发日”为单位，不代表固定发布日期：

| 阶段 | 预计工作量 | 主要产物 |
| --- | ---: | --- |
| M0 | 1–2 天 | 仓库、框架、CI、决策 |
| M1 | 2–3 天 | 设计系统、布局、主题、SEO 基础 |
| M2 | 3–4 天 | 首页、项目和 About |
| M3 | 3–4 天 | Markdown 博客、标签、RSS、Sitemap |
| M4 | 3–6 天 | 项目文案、截图、首批文章 |
| M5 | 2–3 天 | DNS、HTTPS、部署、审计、上线 |
| M6 | 持续迭代 | 搜索、统计、评论、多语言 |

技术实现和内容准备可以部分并行。若目标是尽快上线，应优先完成 3 个项目案例和 2 篇文章，其他内容在上线后补充。

---

## 17. 风险清单

| 风险 | 影响 | 应对 |
| --- | --- | --- |
| 多数 GitHub 仓库仍为私有 | 访客无法进入源码 | 私有项目只展示案例；至少准备一个高质量公开仓库 |
| 项目缺少截图和演示 | 转化率低 | 把截图作为 M4 必须交付物 |
| README 与网站信息不一致 | 访客困惑 | 维护反向链接和发布检查清单 |
| 过早添加搜索、评论、CMS | 延迟上线 | 严格遵守 P0 / P1 / P2 范围 |
| GitHub Actions 凭据权限过高 | 服务器安全风险 | 使用受限部署用户和最小权限密钥 |
| Nginx 修改影响已有站点 | 生产事故 | 独立配置、备份、`nginx -t` 和回滚 |
| 服务器资源有限 | 构建或运行不稳定 | GitHub Actions 构建，服务器只提供静态文件 |
| 第三方统计或字体不可达 | 页面变慢 | 减少第三方依赖，本地托管核心资源 |
| 内容长期不更新 | 搜索流量无法增长 | 建立文章 Backlog 和固定发布节奏 |
| 合规或备案未确认 | 无法按期公开访问 | 在 DNS 和上线前设置合规 Gate |

---

## 18. 正式发布验收清单

### 产品与内容

- [x] 首页定位、CTA 和项目顺序已确认。
- [x] 至少 3 个项目案例完整。
- [x] 至少 2 篇非草稿文章已发布。
- [x] About 和联系方式准确。
- [x] 所有项目源码链接都可公开访问。

### 功能与质量

- [x] 桌面端和移动端导航正常。
- [x] Light / Dark 主题正常。
- [x] Markdown、代码块、目录和标签正常。
- [x] RSS、Sitemap、robots.txt 正常。
- [x] 404 和失效链接检查通过。
- [x] 键盘导航和自动无障碍检查通过。
- [x] Lighthouse 与性能预算达标或有记录的例外。

### 部署与安全

- [x] `www.execute42.top` DNS 正确。
- [x] HTTPS 证书有效且自动续期。
- [x] HTTP 正确跳转 HTTPS。
- [x] GitHub Actions CI 和 Deploy 成功。
- [x] 部署使用非 root 用户。
- [x] 回滚已实际演练。
- [x] Nginx 配置测试通过且未影响已有站点。
- [x] 仓库与构建产物没有 Secret。
- [x] 合规状态已确认。

### 发布后

- [x] GitHub Profile 添加网站链接。
- [x] 公开仓库 README 添加网站反向链接。
- [x] 完成一次真实生产 smoke test。
- [x] 创建首月内容发布 Backlog。
- [x] 记录上线版本和已知限制。

---

## 19. 已落地决策

1. 公开身份使用 `yuyukosama2004`，站点品牌使用 `execute42`，不披露未经确认的真实姓名。
2. 首版内容以中文为主，保留简短英文定位；完整英文版等待真实海外需求。
3. 使用克制的系统字体、亮暗主题、绿色强调色和 `42` 身份视觉，避免大型前端动效运行时。
4. 首版以 GitHub 作为公开联系入口，不公开未经确认的私人邮箱。
5. 私有项目只展示公开案例、系统图和工程取舍，不显示失效或不可访问的源码按钮。
6. 评论系统暂缓；匿名 Nginx 聚合日志先用于验证内容与 GitHub CTA 需求。

评论和多语言的复评条件记录在 [`docs/PRODUCT_DECISIONS.md`](./docs/PRODUCT_DECISIONS.md)，
上线证据与仍未通过的 Gate 记录在 [`docs/LAUNCH_AUDIT.md`](./docs/LAUNCH_AUDIT.md)。
6. 哪些项目能够提供在线演示。
7. 是否需要在 MVP 中显示个人经历或教育信息。
8. 首版是否启用匿名访问统计。
9. 服务器和域名的备案 / 合规状态。

决策结果应记录在 GitHub Issue 或 ADR 中，不只保留在聊天记录。

---

## 20. 本计划批准后的立即行动

1. 将本文档从 Draft 标记为 Approved。
2. 创建 M0–M6 Milestones。
3. 创建标签和 GitHub Projects 看板。
4. 将 M0、M1 的条目转换为 GitHub Issues。
5. 完成 WEB-001 和 WEB-002 两个产品决策。
6. 开始 WEB-003：初始化 Astro 项目。
7. 同步准备项目截图、个人简介和首篇文章素材。

---

## 21. 计划维护规则

- 范围、架构、里程碑或发布标准发生变化时更新本文档。
- 普通实现细节留在 Issue 和 PR，不把本文档变成每日开发日志。
- 每完成一个 Milestone，检查风险、优先级和下一阶段范围。
- 文档中的任务表与 GitHub Issues 冲突时，以最新批准的 GitHub Issue 为准，并及时回写本文档。
- 发布正式版本时更新文档版本、日期和状态。

## 22. 参考文档

- [Astro Documentation](https://docs.astro.build/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Deployments and Environments](https://docs.github.com/en/actions/concepts/workflows-and-actions/deployment-environments)
- [Nginx Documentation](https://nginx.org/en/docs/)
