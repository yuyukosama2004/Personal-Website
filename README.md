# Personal Website

[`www.execute42.top`](https://www.execute42.top) 的中英双语个人网站与 Markdown 博客项目。中文使用根路径，英文页面统一位于 `/en/`。

网站用于展示全栈 AI 应用和开发者工具，记录项目解决的问题、技术取舍、验证情况与后续计划，并把开发笔记、项目案例和 GitHub 仓库连接起来。

## Development

```bash
corepack pnpm install
corepack pnpm dev
```

完整质量检查：

```bash
corepack pnpm verify
corepack pnpm test:e2e
```

构建会依次生成 Astro 静态页面与 Pagefind 全文索引。博客文章放在
`src/content/blog`，项目案例放在 `src/content/projects`；Frontmatter 会由 Content
Collections schema 在构建时校验。

## Content routes

- `/projects/`：项目列表与详情
- `/projects/phonemall/`：PhoneMall canonical 案例页；旧路径由 Nginx 301 跳转
- `/blog/`：Markdown 博客、标签和相关文章
- `/search/`：浏览器本地全文搜索
- `/rss.xml`：文章订阅

## Project management

- [完整开发计划](./DEVELOPMENT_PLAN.md)
- [GitHub Issues](https://github.com/yuyukosama2004/Personal-Website/issues)
- [生产部署与回滚](./docs/DEPLOYMENT.md)
- [上线审计](./docs/LAUNCH_AUDIT.md)
- [隐私友好的流量统计](./docs/ANALYTICS.md)
- [发布后产品决策](./docs/PRODUCT_DECISIONS.md)
- [作品集与 GitHub 展示改造决策](./docs/PORTFOLIO_REDESIGN.md)
- 代码通过分支、Pull Request 和 GitHub Actions 管理。
- `main` 始终保持可构建，并由部署工作流原子发布到生产服务器。
