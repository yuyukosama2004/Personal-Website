# Personal Website

[`www.execute42.top`](https://www.execute42.top) 的个人网站与 Markdown 博客项目。

网站用于展示可控、可验证、local-first 的 AI 应用与 Agent 开发工具，并把博客、项目案例和 GitHub 仓库连接成一条持续的内容与访问路径。

## Development

```bash
corepack pnpm install
corepack pnpm dev
```

完整质量检查：

```bash
corepack pnpm verify
```

构建会依次生成 Astro 静态页面与 Pagefind 全文索引。博客文章放在
`src/content/blog`，项目案例放在 `src/content/projects`；Frontmatter 会由 Content
Collections schema 在构建时校验。

## Content routes

- `/projects/`：项目列表与详情
- `/blog/`：Markdown 博客、标签和相关文章
- `/search/`：浏览器本地全文搜索
- `/rss.xml`：文章订阅

## Project management

- [完整开发计划](./DEVELOPMENT_PLAN.md)
- [GitHub Issues](https://github.com/yuyukosama2004/Personal-Website/issues)
- [生产部署与回滚](./docs/DEPLOYMENT.md)
- 代码通过分支、Pull Request 和 GitHub Actions 管理。
- `main` 始终保持可构建，并由部署工作流原子发布到生产服务器。
