# Privacy-friendly analytics

Operational status: **enabled in production**

Last reviewed: 2026-07-20 (Asia/Shanghai)

The production Nginx virtual host writes two tab-separated logs:

- `/var/log/personal-website/analytics.log`: timestamp, status, method, path and referrer.
- `/var/log/personal-website/github.log`: timestamp, tracked GitHub target and referrer.

Neither log contains an IP address, Cookie header or User-Agent. The design can count page views,
404 responses and GitHub CTA clicks, but intentionally cannot identify unique or returning visitors.

All website-to-GitHub buttons use fixed same-origin routes. Nginx records each route and returns a
302 to an allowlisted profile or repository URL. The allowlist currently covers the profile,
ecc-init, Eval42, GroundedSeek, NovelFlow, Guarded Agent Pipeline and PhoneMall; it does not accept a
caller-provided redirect URL.

## Monthly report

Run the report for the previous month:

```bash
/var/www/personal-website/bin/monthly-traffic-report
```

Or select a month:

```bash
/var/www/personal-website/bin/monthly-traffic-report 2026-07
```

Reports are written to `/var/www/personal-website/reports/YYYY-MM.md`. The installed monthly cron
job runs on the first day of each month. Nginx log rotation remains responsible for retention; keep
no more than 90 days of raw analytics logs.

The dedicated `/var/log/personal-website` directory keeps these files outside Nginx's default
`/var/log/nginx/*.log` rotation rule, so only the repository's retention policy handles them.

The repository includes the matching cron and logrotate definitions under `ops/cron` and
`ops/logrotate`. They are installed by an administrator because the deploy account intentionally
cannot write to `/etc`.

## Reporting boundary

Reports may describe aggregate page views, requested paths, 404 counts, referrers and fixed GitHub
CTA redirects. They must not describe visitors, users, sessions, retention or conversion rates
because the log format deliberately contains no stable visitor identifier.

The first scheduled content-and-traffic review is tracked by
[`CONTENT-104`](https://github.com/yuyukosama2004/Personal-Website/issues/61) in the August 2026
post-launch milestone. Until a complete calendar month is available, the analytics installation
should be described as operational rather than as evidence of audience growth.
