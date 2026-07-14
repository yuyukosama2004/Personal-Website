# Launch audit

Audit date: 2026-07-14 (Asia/Shanghai)

Status: **candidate build passed; public DNS, automated certificate renewal and compliance confirmation remain launch gates.**

## Automated quality gates

- `pnpm verify`: formatting, ESLint, Astro type/content checks, 6 unit tests, production build,
  Pagefind indexing and built-site link/SEO audit all pass.
- Production output: 20 HTML pages, 19 indexed pages and 12 required system outputs.
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

## Production-origin smoke test

The origin was tested with `www.execute42.top` resolved directly to localhost on the server while
public DNS is pending:

- `/`, `/projects/`, `/blog/`, `/search/`, `/about/`, `/rss.xml` and `/sitemap-index.xml`: HTTP 200.
- Unknown path: HTTP 404 with the custom page.
- `/go/github` and `/go/github/ecc-init`: fixed HTTP 302 redirects to their allowlisted GitHub URLs.
- HTTP virtual host: redirects to HTTPS.
- Nginx configuration test and reload: pass.
- Existing `execute42.top` and `mall.execute42.top` services remained HTTP 200 after the new virtual
  host was installed.

The real GitHub Actions deploy workflow and rollback input were exercised before this audit. The
active symlink moved from the current release to the previous release and back without changing the
other virtual hosts. The audited candidate was then deployed automatically at commit
`53c39856e4ae2b9ef02bc1a2406f83b95b42b6d3`; the active symlink and deployment ledger both match.

## Security and privacy

- TLS certificate SAN includes `execute42.top` and `www.execute42.top`; certificate validity at audit
  time is 2026-05-12 through 2026-08-09.
- TLS protocols are restricted to 1.2 and 1.3.
- Responses include CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and a restrictive
  `Permissions-Policy`.
- Deploy SSH uses a dedicated `webdeploy` account without sudo or write access to Nginx configuration.
- Releases are uploaded to an incoming directory, verified, atomically switched and retained for
  rollback.
- Analytics logs omit IP address, Cookie and User-Agent. GitHub redirects accept no caller-provided
  destination. Raw logs rotate after approximately 90 days.
- The repository contains Dependabot configuration and no frontend secret or private GitHub token.
- `pnpm audit --prod` reports no known vulnerabilities; a tracked-file private-key/token pattern scan
  reports no matches.

## Remaining launch gates

1. Publish the `www` A record to `8.153.98.251` in the authoritative Alibaba Cloud DNS zone.
   Alibaba Cloud's authoritative `dns29.hichina.com` server still returned NXDOMAIN at the end of
   this audit.
2. Replace the currently valid shared certificate with an ACME-managed certificate and prove renewal
   with a dry run after DNS resolves.
3. Confirm the required mainland-China ICP/compliance status before treating the hostname as public.
4. Rerun the resolver-independent public smoke suite after DNS and the final deployment.
