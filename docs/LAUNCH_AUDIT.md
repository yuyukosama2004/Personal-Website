# Launch audit

Initial audit date: 2026-07-15 (Asia/Shanghai)

Latest verification: 2026-07-16 (Asia/Shanghai)

Status: **all v1.0.0 launch gates and v1.1.0 release gates passed.**

## v1.1.0 release verification

- Release: [`v1.1.0 — Bilingual portfolio redesign`](https://github.com/yuyukosama2004/Personal-Website/releases/tag/v1.1.0)
- Production commit: `ef39e864f9427d5e6817d128d08768193aa9d05e`
- Pull request CI: formatting, lint, Astro diagnostics, 13 unit tests, production build and 10
  Chromium browser scenarios passed.
- Production workflow: build, immutable SSH deployment and resolver-independent public smoke test
  passed in [run 29490194637](https://github.com/yuyukosama2004/Personal-Website/actions/runs/29490194637).
- Current build output: 40 HTML pages, 37 Pagefind-indexed pages across Chinese and English, 13 unit
  tests and 20 required system outputs.
- Public checks return HTTP 200 for the Chinese home, projects and blog routes and the English home
  route.
- The M7 portfolio redesign milestone is closed. The remaining five open issues are P1 post-launch
  content or project-evidence work and do not block production.

## Automated quality gates

- The original v1.0.0 `pnpm verify`: formatting, ESLint, Astro type/content checks, 6 unit tests, production build,
  Pagefind indexing and built-site link/SEO audit all pass.
- Original v1.0.0 production output: 20 HTML pages, 19 indexed pages and 12 required system outputs.
- `pnpm test:e2e`: 7 Chromium scenarios pass. Coverage includes core routes, project detail,
  Pagefind search, theme persistence, keyboard skip link, fixed GitHub CTA routes, 390 px layout,
  JavaScript-disabled content and custom 404 behavior.
- Image pipeline: the shared 868 KB source identity image becomes a sub-1 KB 64×64 WebP favicon;
  the About-page variant is approximately 6 KB with explicit dimensions.

## Lighthouse

Mobile Lighthouse 13.4.0 against the optimized local production build:

| Category / metric |                  Result |                      Budget |
| ----------------- | ----------------------: | --------------------------: |
| Performance       |                      97 |                        ≥ 95 |
| Accessibility     |                     100 |                        ≥ 95 |
| SEO               |                     100 |                        ≥ 95 |
| Best Practices    | 62 (recorded exception) |                        ≥ 95 |
| FCP               |                   2.0 s |               informational |
| LCP               |                   2.1 s |                     < 2.5 s |
| CLS               |                       0 |                       < 0.1 |
| TBT               |                    0 ms | proxy for lab interactivity |

The Best Practices exception is measurement-environment contamination, not shipped site code.
Endpoint security injects resources from `gc.kis.v2.scr.kaspersky-labs.com` into every tested Chrome
profile, even with extensions disabled. Lighthouse attributes the deprecated unload handler,
unminified JavaScript, unused JavaScript and bfcache failures to that injected resource. The local
HTTP audit also necessarily fails the HTTPS audit. A production-origin run before image optimization
scored Performance 68 / Accessibility 100 / Best Practices 81 / SEO 100 and explicitly contained
the same Kaspersky resources. The optimized isolated comparison raised Performance to 97 and cut
LCP from 7.7 s to 2.1 s.

After deployment, a second HTTPS origin run scored Performance 84 / Accessibility 100 / Best
Practices 81 / SEO 100 with LCP 3.5 s, CLS 0 and TBT 40 ms. Its request ledger attributes 22,516
transferred bytes to the site and 375,172 bytes to the injected Kaspersky stylesheet and script. The
deployed favicon itself is 728 bytes. This confirms the remaining score gap is dominated by the
measurement host rather than the deployed bundle.

INP is not produced by a one-load lab run. The site ships no application runtime on the homepage,
and the measured TBT is 0 ms; real-user INP can only be evaluated after sufficient public traffic.

## Public production smoke test

Alibaba Cloud's authoritative DNS and a public recursive resolver return `8.153.98.251` for
`www.execute42.top`. GitHub Actions run `29381556893` deployed commit
`5bf74a0e5d39b657f993a098641bc78190e8e248` and then ran the public smoke suite from an independent
GitHub-hosted runner:

- `/`, project pages, blog pages, search, About, RSS, Sitemap and robots.txt: HTTP 200.
- Unknown path: HTTP 404 with the custom page.
- `/go/github` and `/go/github/ecc-init`: fixed HTTP 302 redirects to their allowlisted GitHub URLs.
- HTTP virtual host: redirects to HTTPS.
- HTTPS certificate validation and required security headers: pass.
- Optimized WebP favicon: HTTP 200, correct content type and 728 bytes.
- Nginx configuration test and reload: pass.
- Existing `execute42.top` and `mall.execute42.top` services remained HTTP 200 after the new virtual
  host was installed.

The legacy root-domain upstream at `127.0.0.1:6081` later became unavailable before the DNS and ACME
work on 2026-07-15. No matching service or container definition was present on the host, so it was
not restarted speculatively. This is independent of the `www` virtual host and deployment.

The real GitHub Actions deploy workflow and rollback input were exercised before launch. The active
symlink moved from the current release to the previous release and back without changing the other
virtual hosts. The final deployment, active symlink and deployment ledger match the merged commit.

## Security and privacy

- `www.execute42.top` uses its own Let's Encrypt certificate, valid from 2026-07-15 through
  2026-10-13. `certbot.timer` is enabled and active, and the renewal dry run succeeded.
- The Certbot deploy hook runs `nginx -t` and reloads Nginx after successful renewal.
- TLS protocols are restricted to 1.2 and 1.3.
- Responses include HSTS, CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and a
  restrictive `Permissions-Policy`.
- Deploy SSH uses a dedicated `webdeploy` account without sudo or write access to Nginx configuration.
- Releases are uploaded to an incoming directory, verified, atomically switched and retained for
  rollback.
- Analytics logs omit IP address, Cookie and User-Agent. GitHub redirects accept no caller-provided
  destination. Raw logs rotate after approximately 90 days.
- The dedicated analytics rotation rule passes a full system `logrotate` run, and the monthly report
  succeeds while preserving the pre-launch records.
- The repository contains Dependabot configuration and no frontend secret or private GitHub token.
- `pnpm audit --prod` reports no known vulnerabilities; a tracked-file private-key/token pattern scan
  reports no matches.

## Completed launch gates

1. Authoritative DNS publishes `www.execute42.top A 8.153.98.251` with a 600-second TTL.
2. A dedicated ACME certificate is active; timer, dry run and Nginx reload hook are verified.
3. The site owner confirmed the mainland-China ICP filing status on 2026-07-15.
4. GitHub Profile Website points to `https://www.execute42.top`.
5. Resolver-independent GitHub Actions public smoke passes after production deployment.

## Known non-blocking follow-up

- PhoneMall remains below the first featured position until real sanitized screenshots, an
  architecture diagram and a dated reproducible test summary are available.
- Monthly traffic conclusions wait for a complete reporting period.
- Comments, newsletter, CMS, dynamic GitHub widgets and an online playground remain intentionally
  out of scope.
