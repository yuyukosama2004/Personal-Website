#!/usr/bin/env bash
set -euo pipefail

month="${1:-$(date -d 'last month' +%Y-%m)}"
analytics_log="${ANALYTICS_LOG:-/var/log/personal-website/analytics.log}"
github_log="${GITHUB_LOG:-/var/log/personal-website/github.log}"
output="${OUTPUT:-/var/www/personal-website/reports/${month}.md}"

[[ "$month" =~ ^[0-9]{4}-[0-9]{2}$ ]] || { echo "Month must be YYYY-MM" >&2; exit 2; }
mkdir -p "$(dirname "$output")"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

if [[ -r "$analytics_log" ]]; then
  awk -F '\t' -v month="$month" '$1 ~ "^" month { print }' "$analytics_log" > "$tmp/analytics"
else
  : > "$tmp/analytics"
fi

if [[ -r "$github_log" ]]; then
  awk -F '\t' -v month="$month" '$1 ~ "^" month { print }' "$github_log" > "$tmp/github"
else
  : > "$tmp/github"
fi

requests="$(wc -l < "$tmp/analytics" | tr -d ' ')"
pageviews="$(awk -F '\t' '$2 ~ /^(200|304)$/ && $3 == "GET" && $4 !~ /\.(css|js|png|jpe?g|webp|gif|ico|xml|json|woff2?)(\?|$)/ { count++ } END { print count + 0 }' "$tmp/analytics")"
not_found="$(awk -F '\t' '$2 == 404 { count++ } END { print count + 0 }' "$tmp/analytics")"
github_clicks="$(wc -l < "$tmp/github" | tr -d ' ')"

{
  printf '# execute42 月度流量报告：%s\n\n' "$month"
  printf '> 数据来自不含 IP、Cookie 和 User-Agent 的 Nginx 聚合日志。无法也不会识别独立访客。\n\n'
  printf '| 指标 | 数值 |\n| --- | ---: |\n'
  printf '| HTTP 请求 | %s |\n' "$requests"
  printf '| 页面浏览 | %s |\n' "$pageviews"
  printf '| GitHub CTA 点击 | %s |\n' "$github_clicks"
  printf '| 404 响应 | %s |\n\n' "$not_found"
  printf '## 热门页面\n\n'
  printf '| 路径 | 浏览量 |\n| --- | ---: |\n'
  awk -F '\t' '$2 ~ /^(200|304)$/ && $3 == "GET" && $4 !~ /\.(css|js|png|jpe?g|webp|gif|ico|xml|json|woff2?)(\?|$)/ { count[$4]++ } END { for (path in count) print count[path] "\t" path }' "$tmp/analytics" \
    | sort -rn | head -10 | awk -F '\t' '{ printf "| `%s` | %s |\n", $2, $1 }'
  printf '\n## GitHub CTA\n\n'
  printf '| 目标 | 点击 |\n| --- | ---: |\n'
  awk -F '\t' '{ count[$3]++ } END { for (target in count) print count[target] "\t" target }' "$tmp/github" \
    | sort -rn | awk -F '\t' '{ printf "| `%s` | %s |\n", $2, $1 }'
} > "$output"

echo "Wrote $output"
