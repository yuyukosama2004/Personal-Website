# Production deployment

Production is a static Astro build served by the dedicated Nginx virtual host for
`www.execute42.top`. GitHub Actions builds the site and uploads an immutable archive over SSH; the
server never installs Node dependencies or builds application code.

## Server layout

```text
/var/www/personal-website/
├── bin/
│   ├── deploy-release
│   ├── rollback-release
│   └── monthly-traffic-report
├── incoming/
├── releases/<commit-sha>/
├── reports/<yyyy-mm>.md
├── current -> releases/<commit-sha>
└── deployments.log
```

The `webdeploy` account owns this tree, has no sudo access, and cannot modify Nginx or other sites.
Each successful deployment switches `current` atomically and keeps the five most recent releases.

## GitHub Environment secrets

The `production` Environment holds `DEPLOY_HOST`, `DEPLOY_PORT`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`,
`DEPLOY_KNOWN_HOSTS`, and `DEPLOY_PATH`. The workflow has only `contents: read` repository
permissions.

## Deploy and rollback

- A merge to `main` verifies, builds and deploys automatically.
- `Deploy production` can be re-run with `workflow_dispatch` and action `deploy`.
- Select action `rollback` and leave the release blank to select the previous immutable release.
- To choose an explicit retained version, enter its full 40-character commit SHA.

The deploy script validates the archive, switches the symlink, and requests `/`, `/blog/`,
`/projects/`, and `/rss.xml`. A failed smoke test restores the previous symlink.

## DNS and TLS

`www.execute42.top` must resolve to `8.153.98.251`. The independent Nginx vhost reuses the existing
certificate only while it remains valid and includes the `www.execute42.top` SAN. Once DNS resolves,
replace it with an automatically renewed certificate and verify the renewal timer before launch.

## Anonymous traffic reports

Nginx records a minimal analytics log without IP, Cookie or User-Agent fields. A monthly cron job
generates aggregate page-view, 404 and fixed GitHub CTA counts under `reports/`. See
[`ANALYTICS.md`](./ANALYTICS.md) for the log format, retention and manual report command.
