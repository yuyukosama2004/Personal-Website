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

## Project management

- [完整开发计划](./DEVELOPMENT_PLAN.md)
- [GitHub Issues](https://github.com/yuyukosama2004/Personal-Website/issues)
- 代码通过分支、Pull Request 和 GitHub Actions 管理。
- `main` 保持可构建，并由后续部署工作流发布到生产服务器。
