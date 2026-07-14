# Privacy-friendly analytics

The production Nginx virtual host writes two tab-separated logs:

- `personal-website.analytics.log`: timestamp, status, method, path and referrer.
- `personal-website-github.log`: timestamp, tracked GitHub target and referrer.

Neither log contains an IP address, Cookie header or User-Agent. The design can count page views,
404 responses and GitHub CTA clicks, but intentionally cannot identify unique or returning visitors.

All website-to-GitHub buttons use a fixed same-origin route. Nginx records that route and returns a
302 to an allowlisted GitHub URL. It does not accept a caller-provided redirect URL.

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

The repository includes the matching cron and logrotate definitions under `ops/cron` and
`ops/logrotate`. They are installed by an administrator because the deploy account intentionally
cannot write to `/etc`.
